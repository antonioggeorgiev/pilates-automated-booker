"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { PilatesSlotsResponse } from "~/lib/validators/external-website-response.schema";

export default function PilatesList() {
  const {
    data: pilatesSlots,
    isLoading,
    error,
  } = useQuery<PilatesSlotsResponse[]>({
    queryKey: ["pilatesSlots"],
    queryFn: async () => {
      const response = await fetch("/api/pilatesSlots");
      if (!response.ok) {
        return [];
      }
      return response.json() as Promise<PilatesSlotsResponse[]>;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">Loading pilates slots...</div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (!pilatesSlots || pilatesSlots.length === 0) {
    return <div className="p-4 text-center">No pilates slots available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-6 text-2xl font-bold">Available Pilates Sessions</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pilatesSlots.map(
          ({ id, startAt, endAt, duration, price, employeeId }) => (
            <div
              key={id}
              className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="font-medium">
                {startAt && format(new Date(startAt), "EEEE, MMMM d")}
              </div>
              <div className="text-gray-600">
                {startAt && format(new Date(startAt), "h:mm a")} -{" "}
                {endAt && format(new Date(endAt), "h:mm a")}
              </div>
              <div className="mt-2 text-sm text-gray-500">
                Duration: {duration} minutes
              </div>
              <div className="text-sm text-gray-500">Coach: {employeeId}</div>
              <div className="text-sm text-gray-500">Price: {price} BGN</div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
