"use client";

import { format } from "date-fns";

const DateDisplay = ({ datetime }: { datetime: string }) => {
  return (
    <div className="text-nowrap underline underline-offset-2 text-fuchsia-950">
      {format(datetime, "PP")}
    </div>
  );
};
export default DateDisplay;
