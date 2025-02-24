import { usePilatesDate } from "~/providers/PilatesDateProvider";
import { DatePicker } from "../ui/date-picker";

export function PilatesDatePicker() {
  const { selectedDate, setSelectedDate } = usePilatesDate();

  return <DatePicker date={selectedDate} setDate={setSelectedDate} />;
}
