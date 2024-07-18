import React, { useState } from "react";

interface YearMonthSelectorProps {
  onMonthYearChange: (monthYear: string) => void;
}

const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
  onMonthYearChange,
}) => {
  const [date, setDate] = useState<Date>(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(date.setMonth(date.getMonth() - 1));
    setDate(new Date(prevMonth));
    onMonthYearChange(formatMonthYear(new Date(prevMonth)));
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
    setDate(new Date(nextMonth));
    onMonthYearChange(formatMonthYear(new Date(nextMonth)));
  };

  const formatMonthYear = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      style={{ minWidth: "500px", width: "512px" }}
      className="bg-white  overflow-hidden rounded-lg mx-auto mt-8 text-gray-900 font-semibold text-center"
    >
      <div className="flex items-center justify-around px-4 py-6">
        <button
          onClick={handlePrevMonth}
          className="p-4 rounded-md bg-indigo-200 text-indigo-600"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <div className="text-lg">{formatMonthYear(date)}</div>
        <button
          onClick={handleNextMonth}
          className="p-4 rounded-md bg-indigo-200 text-indigo-600"
        >
          <svg
            className="w-4 h-4 stroke-current"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default YearMonthSelector;
