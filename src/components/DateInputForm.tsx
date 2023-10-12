"use client";

import { useState } from "react";

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
  const [datetime, setDatetime] = useState(
    expiredDate ? convertToDateTimeLocalString(expiredDate) : ""
  );
  const [utcDatetime, setUtcDatetime] = useState(
    expiredDate ? getUtcDate(convertToDateTimeLocalString(expiredDate)) : ""
  );

  return (
    <>
      <div className="flex flex-col">
        <label className={` text-lg`} htmlFor="expiredDate">
          Expired Date
        </label>
        <input
          onChange={(e) => {
            setDatetime(e.target.value);
            // console.log(convertToDateTimeLocalString(new Date(e.target.value)));
            setUtcDatetime(getUtcDate(e.target.value));
          }}
          value={datetime}
          className="form-input"
          type="datetime-local"
          id="expiredDate"
        />
      </div>
      <div className="flex flex-col">
        <label className={` text-lg`} htmlFor="expiredDate">
          Expired Date
        </label>
        <input
          name="expiredDate"
          className="form-input"
          type="datetime-local"
          id="expiredDate"
          value={utcDatetime}
          readOnly
          required
        />
      </div>
    </>
  );
}
