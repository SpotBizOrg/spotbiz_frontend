import { useState } from "react";

type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

interface OpenDays {
  [key: string]: {
    isOpen: boolean;
    startTime: string;
    endTime: string;
    specialNote: string;
  };
}

const useOpeningHoursModel = () => {
  const [openDays, setOpenDays] = useState<OpenDays>({
    Monday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Tuesday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Wednesday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Thursday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Friday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Saturday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
    Sunday: {
      isOpen: false,
      startTime: "00:00",
      endTime: "00:00",
      specialNote: "",
    },
  });

  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateOpeningHours = (): boolean => {
    const errors: { [key: string]: string } = {};

    Object.keys(openDays).forEach((day) => {
      const { startTime, endTime, isOpen } = openDays[day as Day];
      if (isOpen && startTime >= endTime) {
        errors[day] = "Start time must be earlier than end time.";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateOpeningHours = () => {
    if (!validateOpeningHours()) {
      return;
    }

    console.log("Opening hours updated successfully:", openDays);
  };

  return {
    openDays,
    setOpenDays,
    validationErrors,
    handleUpdateOpeningHours,
    validateOpeningHours,
  };
};

export default useOpeningHoursModel;
