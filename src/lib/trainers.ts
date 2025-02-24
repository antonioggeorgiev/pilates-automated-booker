const MAGDALENA_EMPLOYEE_ID = "2634";
const SANDRA_EMPLOYEE_ID = "2591";
const DANIELA_EMPLOYEE_ID = "2635";

export function getTrainerName(employeeId: string) {
  if (employeeId === MAGDALENA_EMPLOYEE_ID) {
    return "Magdalena";
  }
  if (employeeId === SANDRA_EMPLOYEE_ID) {
    return "Sandra";
  }
  if (employeeId === DANIELA_EMPLOYEE_ID) {
    return "Daniela";
  }
  return "Unknown";
}
