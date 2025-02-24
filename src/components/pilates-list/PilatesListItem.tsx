import { format } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { getTrainerName } from "~/lib/trainers";

type Props = {
  id: string;
  startAt: string;
  endAt: string;
  employeeId?: string;
};

export function PilatesListItem({ id, startAt, endAt, employeeId }: Props) {
  return (
    <div
      key={id}
      className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="font-medium">
        {startAt && format(new Date(startAt), "EEEE, MMMM d")}
      </div>
      <div className="text-gray-600">
        {startAt &&
          formatInTimeZone(new Date(startAt), "Europe/Sofia", "HH:mm")}{" "}
        - {endAt && formatInTimeZone(new Date(endAt), "Europe/Sofia", "HH:mm")}
      </div>

      <div className="text-sm text-gray-500">
        Coach: {employeeId && getTrainerName(employeeId)}
      </div>
    </div>
  );
}
