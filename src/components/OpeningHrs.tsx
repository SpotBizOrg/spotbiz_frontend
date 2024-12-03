interface WeeklySchedule {
  startTime: string;
  endTime: string;
  specialNote: string;
  isOpen: boolean;
}

interface WeekDays {
  Monday: WeeklySchedule;
  Tuesday: WeeklySchedule;
  Wednesday: WeeklySchedule;
  Thursday: WeeklySchedule;
  Friday: WeeklySchedule;
  Saturday: WeeklySchedule;
  Sunday: WeeklySchedule;
}

const OpeningHrs: React.FC<WeekDays> = (weekDays) => {
  const days = Object.entries(weekDays);
  const formatTimeToAMPM = (time: { split: (arg0: string) => [any, any] }) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-md mb-10 border border-gray-300">
      <div className="p-2 border border-gray-400 rounded text-center">
        <p className="font-bold text-bluedark text-bodymedium">Opening Hours</p>
      </div>
      <div className="p-4 text-gray-800 text-bodysmall">
        {days.map(([day, schedule]) => (
          <div className="mb-2" key={day}>
            <p className="inline font-bold">{day}: </p>
            {schedule.isOpen ? (
              <p className="inline ml-2">
                {formatTimeToAMPM(schedule.startTime)} -{" "}
                {formatTimeToAMPM(schedule.endTime)}
              </p>
            ) : (
              <p className="inline text-red-500 ml-2">Closed</p>
            )}
            {schedule.specialNote && (
              <p className="block ml-8 text-gray-500">
                Note: {schedule.specialNote}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpeningHrs;
