"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import type { PilatesSlotsResponse } from "~/lib/validators/external-website-response.schema";
import { usePilatesDate } from "~/providers/PilatesDateProvider";
import { PilatesListItem } from "./PilatesListItem";

export default function PilatesList() {
  const { selectedDate } = usePilatesDate();
  const {
    data: pilatesSlots,
    isLoading,
    error,
  } = useQuery<PilatesSlotsResponse[]>({
    queryKey: ["pilatesSlots", selectedDate?.toISOString()],
    queryFn: async () => {
      const dateParam = selectedDate
        ? `&start_at_date=${format(selectedDate, "yyyy-MM-dd")}`
        : "";

      const response = await fetch(`/api/pilatesSlots?${dateParam}`);
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {pilatesSlots.map((slot) => (
        <PilatesListItem key={slot.id} {...slot} />
      ))}
    </div>
  );
}
