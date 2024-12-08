import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import { sumShipmentsCodByStatus } from "./sumShipmentsCodByStatus";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const cooperationPeriods = {
  Daily: "Yesterday",
  Yesterday: "Daily",
  "This week": "Last week",
  "Last week": "This week",
  "This month": "Last month",
  "Last month": "This month",
};

export const filterShipmentsByPeriod = (shipments, period) => {
  const now = dayjs();
  let startDate, endDate;

  if (Array.isArray(period) && period.length === 2) {
    startDate = dayjs(period[0]);
    endDate = dayjs(period[1]);
    return shipments.filter((shipment) =>
      dayjs(shipment.updatedAt).isBetween(startDate, endDate, null, "[]")
    );
  }

  switch (period) {
    case "Daily":
      startDate = now.startOf("day");
      endDate = now.endOf("day");
      break;
    case "Yesterday":
      startDate = now.subtract(1, "day").startOf("day");
      endDate = now.subtract(1, "day").endOf("day");
      break;
    case "This week":
      startDate = now.startOf("week");
      endDate = now.endOf("week");
      break;
    case "Last week":
      startDate = now.subtract(1, "week").startOf("week");
      endDate = now.subtract(1, "week").endOf("week");
      break;
    case "This month":
      startDate = now.startOf("month");
      endDate = now.endOf("month");
      break;
    case "Last month":
      startDate = now.subtract(1, "month").startOf("month");
      endDate = now.subtract(1, "month").endOf("month");
      break;
    case "All time":
      return shipments; // No filtering for all time
    default:
      return []; // Return empty if the period is invalid
  }

  return shipments.filter((shipment) =>
    dayjs(shipment.updatedAt).isBetween(startDate, endDate, null, "[]")
  );
};

export const makePeriodReadable = (value) => {
  if (Array.isArray(value) && value.length === 2) {
    const startDate = dayjs(value[0]);
    const endDate = dayjs(value[1]);

    const diffInDays = endDate.diff(startDate, "day");
    const diffInMonths = endDate.diff(startDate, "month");
    const diffInYears = endDate.diff(startDate, "year");

    if (diffInYears > 0) {
      return `${diffInYears} year${diffInYears > 1 ? "s" : ""}`;
    }
    if (diffInMonths > 0) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""}`;
    }
    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""}`;
    }
    return "Less than a day";
  }

  return "Invalid period";
};

export const createMonthBasedOnDate = ({ updatedAt }) => {
  const date = new Date(updatedAt);
  return months[date.getMonth()];
};

export function uniqueData(data) {
  const seen = new Set();
  return data.filter((item) => {
    const month = createMonthBasedOnDate(item);
    if (!seen.has(month)) {
      seen.add(month);
      return true;
    }
    return false;
  });
}

export const returnPercentageOfSales = (
  currentPeriodCod,
  currentPeriod,
  allData,
  key
) => {
  if (typeof currentPeriod !== "string") {
    const totalSales = sumShipmentsCodByStatus(allData, key);
    console.log({ totalSales });

    const toReturn = (currentPeriodCod / totalSales) * 100;
    console.log({ toReturn });

    return toReturn.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  console.log({ currentPeriodCod, currentPeriod, allData, key });

  const periodToCompare = cooperationPeriods[currentPeriod];
  const periodToCompareFiltered = filterShipmentsByPeriod(
    allData,
    periodToCompare
  );

  const periodToCompareFilteredCod = periodToCompareFiltered.length
    ? sumShipmentsCodByStatus(periodToCompareFiltered, key)
    : 1;

  console.log({ currentPeriodCod, periodToCompareFilteredCod });

  const toReturn =
    ((currentPeriodCod - periodToCompareFilteredCod) /
      periodToCompareFilteredCod) *
    100;

  // Format the result to 2 decimal places first, then add commas
  return toReturn.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
