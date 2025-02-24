import { NextResponse } from "next/server";
import {
  PilatesSlotSchema,
  type PilatesSlotsResponse,
} from "~/lib/validators/external-website-response.schema";

const BASE_URL = "https://json-api.reservation.studio/v1c/appointments/classes";

// Define the response schema to match the JSON:API format

// Infer the type from the schema

export async function GET(request: Request) {
  try {
    // Default query parameters
    const defaultParams = {
      "filter[location_id]": "pl-physiotherapy-pilates-reformer-studio",
      "filter[upcoming]": "1",
      "page[size]": "24",
      sort: "start_at",
      include:
        "clients.client,services.employees,services.servicePrice.service.firstMedia,currency,location.firstMedia,location.city,location.neighborhood,location.country,location.settings",
    };

    // Get the URL object from the request
    const { searchParams } = new URL(request.url);
    const selectedDate = searchParams.get("start_at_date");

    // Combine default params with any additional params from the request
    const params = new URLSearchParams(defaultParams);
    if (selectedDate) {
      params.set("filter[start_at_date]", selectedDate);
    }
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });

    // Make the request to the external API with the correct headers
    const response = await fetch(`${BASE_URL}?${params.toString()}`, {
      headers: {
        accept: "application/vnd.api+json",
        "content-type": "application/vnd.api+json",
        "accept-language": "en",
        "app-build": "aa06030e",
        "app-name": "studio.reservation.clients",
        "app-version": "0.9.2",
      },
      method: "GET",
      mode: "cors",
      credentials: "omit",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(
        `API responded with status: ${response.status}. Error: ${errorText}`,
      );
    }
    const pilatesSlots = PilatesSlotSchema.parse(await response.json());

    const parsedPilatesSlots = pilatesSlots.included
      .filter(
        (slot) =>
          slot.attributes.start_at &&
          slot.attributes.end_at &&
          slot.attributes.duration &&
          slot.attributes.price &&
          slot.attributes.price_type,
      )
      .map((slot) => {
        let employeeId = "";
        if (
          Array.isArray(slot.relationships?.employees) &&
          slot.relationships.employees[0]?.id
        ) {
          employeeId = slot.relationships.employees[0].id;
        } else if (
          !Array.isArray(slot.relationships?.employees) &&
          slot.relationships?.employees &&
          "data" in slot.relationships?.employees &&
          slot.relationships?.employees?.data[0]?.id
        ) {
          employeeId = slot.relationships?.employees?.data[0]?.id;
        }
        return {
          id: slot.id,
          startAt: slot.attributes.start_at!,
          endAt: slot.attributes.end_at!.toString(),
          duration: Number(slot.attributes.duration!),
          price: Number(slot.attributes.price!),
          priceType: slot.attributes.price_type!,
          employeeId,
        } satisfies PilatesSlotsResponse;
      });
    return NextResponse.json(parsedPilatesSlots);

    // Comment out validation for now
    // const data = PilatesSlotSchema.parse(jsonData);
    // return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching pilates slots:", error);
    return NextResponse.json(
      { error: "Failed to fetch pilates slots" },
      { status: 500 },
    );
  }
}
