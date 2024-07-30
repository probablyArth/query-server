import type { Request } from "express";
import { FIELDS, RESERVED_KEYS } from "../constants/query";
import { DataRecord } from "../schemas";

const filterByField = (
  item: DataRecord,
  key: keyof DataRecord,
  value: string,
  case_insensitive: boolean = false
) => {
  if (typeof item[key] === "number") {
    if (item[key] !== parseInt(value as unknown as string)) {
      return false;
    }
  } else if (case_insensitive) {
    if (!item[key]) return false;
    if (item[key].toLowerCase() !== value.toLowerCase()) {
      return false;
    }
  } else if (item[key] !== value) {
    return false;
  }
  return true;
};

export const executeQueries = (data: DataRecord[], query: Request["query"]) => {
  const sortBy = query.sortBy;
  const order = query.order;
  const limit = query.limit;
  const offset = query.offset;
  const case_insensitive = query.case_insensitive;

  let resData = [...data];

  for (const stringKey in query) {
    if (RESERVED_KEYS.includes(stringKey) || !FIELDS.includes(stringKey)) {
      continue;
    }
    const key = stringKey as keyof DataRecord;
    const field_value = query[key];
    if (typeof field_value === "string") {
      resData = resData.filter((item) => {
        return filterByField(
          item,
          key,
          field_value,
          case_insensitive === "true"
        );
      });
    } else if (field_value instanceof Array) {
      resData = resData.filter((item) => {
        field_value.forEach((f) => {
          const value = f as string;
          if (!filterByField(item, key, value, case_insensitive === "true")) {
            return false;
          }
        });
        return true;
      });
    }
  }

  if (typeof sortBy === "string" && FIELDS.includes(sortBy)) {
    const typedSortBy = sortBy as keyof DataRecord;
    resData.sort((a, b) => {
      if (typeof a[typedSortBy] === "string") {
        return a[typedSortBy].localeCompare(b[typedSortBy] as string);
      } else {
        return (a[typedSortBy] as number) - (b[typedSortBy] as number);
      }
    });
  }

  if (typeof order === "string") {
    if (order === "desc") {
      resData.reverse();
    }
  }

  if (typeof offset === "string") {
    const numberOffset = parseInt(offset);
    if (!Number.isNaN(numberOffset)) resData = resData.slice(numberOffset);
  }

  if (typeof limit === "string") {
    const numberLimit = parseInt(limit);
    if (!Number.isNaN(numberLimit)) resData = resData.slice(0, numberLimit);
  }

  return resData;
};
