"use client";
import { PilatesDateProvider } from "~/providers/PilatesDateProvider";
import { PilatesDatePicker } from "../pilates-date-picker/PilatesDatePicker";
import PilatesList from "../pilates-list/PilatesList";

export function PilatesHomePage() {
  return (
    <PilatesDateProvider>
      <div className="flex w-full flex-col p-4">
        <div className="mb-6 flex h-12 items-center justify-between">
          <h2 className="text-2xl font-bold">Available Pilates Sessions</h2>
          <PilatesDatePicker />
        </div>
        <div className="h-full overflow-y-auto">
          <PilatesList />
        </div>
      </div>
    </PilatesDateProvider>
  );
}
