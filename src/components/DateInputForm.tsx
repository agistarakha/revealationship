"use client";

import { useState } from "react";

import { oxygen } from "@/fonts";
type DateInputFormProps = {
  expiredDate?: Date;
};
const getUtcDate = (dateStr: string) => {
  return new Date(dateStr).toISOString().replace(":00.000Z", "");
};
const convertToDateTimeLocalString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
export default function DateInputForm({ expiredDate }: DateInputFormProps) {
  const dateNowLocal = convertToDateTimeLocalString(new Date());
  const localDatetimeInit = expiredDate
    ? convertToDateTimeLocalString(expiredDate)
    : dateNowLocal;
  const utcDatetimeInit = expiredDate
    ? getUtcDate(localDatetimeInit)
    : getUtcDate(dateNowLocal);
  const [datetime, setDatetime] = useState(localDatetimeInit);
  const [utcDatetime, setUtcDatetime] = useState(utcDatetimeInit);

  return (
    <>
      <div className="flex flex-col">
        <label className={`${oxygen.className} text-lg`} htmlFor="expiredDate">
          Expired Date
        </label>
        <input
          onChange={(e) => {
            setDatetime(e.target.value);
            // console.log(convertToDateTimeLocalString(new Date(e.target.value)));
            setUtcDatetime(getUtcDate(e.target.value));
          }}
          value={datetime}
          min={dateNowLocal}
          className="form-input"
          type="datetime-local"
          id="expiredDate"
        />
      </div>
      <input
        name="expiredDate"
        type="hidden"
        id="expiredDate"
        value={utcDatetime}
        readOnly
        required
      />
    </>
  );
}
