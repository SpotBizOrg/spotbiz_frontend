import React, { useState } from "react";
import { Button } from "flowbite-react";
import CustomToggleSwitch from "../components/CustomToggleSwitch";
import useOpeningHoursModel from "../hooks/UseOpeningHoursModel"; // Assume you import the custom hook

// Define the OpenDays type
interface OpenDay {
    isOpen: boolean;
    startTime: string;
    endTime: string;
    specialNote: string;
  }
  
  interface OpenDays {
    [key: string]: OpenDay;
  }

  interface OpeningHoursModalProps {
    onSetOpeningHours: (openDays: OpenDays) => void;
    businessEmail: string
  }


const OpeningHoursModal: React.FC<OpeningHoursModalProps> = ({ onSetOpeningHours, businessEmail }) => {
//   const [openHoursModal, setOpenHoursModal] = useState(false);
  const { openDays, setOpenDays, validationErrors, handleUpdateOpeningHours } =
    useOpeningHoursModel();

  // This state will store the final JSON object of opening hours
  const [finalOpeningHours, setFinalOpeningHours] = useState<OpenDays | null>(null);

  const handleToggle = (day: keyof typeof openDays) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
        startTime: !prev[day].isOpen ? prev[day].startTime : "00:00",
        endTime: !prev[day].isOpen ? prev[day].endTime : "00:00",
      },
    }));
  };

  const handleTimeChange = (
    day: keyof typeof openDays,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleSpecialNoteChange = (day: keyof typeof openDays, value: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        specialNote: value,
      },
    }));
  };

  const handleSubmit = () => {
    handleUpdateOpeningHours();
    // Store the current openDays into finalOpeningHours state
    console.log("from the component: ",openDays);
    
    setFinalOpeningHours(openDays);
    // console.log(finalOpeningHours);
    onSetOpeningHours(openDays)

    
  };

  return (
    <>
          <form className="space-y-4">
            {Object.keys(openDays).map((day) => (
              <div key={day} className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-sm font-medium text-gray-900 w-20">
                    {day}
                  </label>
                  <CustomToggleSwitch
                    checked={openDays[day as keyof typeof openDays].isOpen}
                    onChange={() => handleToggle(day as keyof typeof openDays)}
                  />
                  {openDays[day as keyof typeof openDays].isOpen && (
                    <div className="flex items-center space-x-1 ml-4">
                      <input
                        type="time"
                        value={openDays[day as keyof typeof openDays].startTime}
                        onChange={(e) =>
                          handleTimeChange(day as keyof typeof openDays, "startTime", e.target.value)
                        }
                        className="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                      />
                      <span className="text-xs">TO</span>
                      <input
                        type="time"
                        value={openDays[day as keyof typeof openDays].endTime}
                        onChange={(e) =>
                          handleTimeChange(day as keyof typeof openDays, "endTime", e.target.value)
                        }
                        className="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Note"
                    value={openDays[day as keyof typeof openDays].specialNote}
                    onChange={(e) =>
                      handleSpecialNoteChange(day as keyof typeof openDays, e.target.value)
                    }
                    className="ml-2 text-xs flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg"
                  />
                </div>
                {validationErrors[day] && (
                  <p className="text-red-600 text-xs ml-20">
                    {validationErrors[day]}
                  </p>
                )}
              </div>
            ))}
          </form>
          <div className="flex justify-end">
          <Button size="sm" color="dark" onClick={handleSubmit}>
                    Set All
                </Button>
          </div>
          

      {/* This section can be used to display the final opening hours JSON */}
      {/* {finalOpeningHours && (
        <pre>{JSON.stringify(finalOpeningHours, null, 2)}</pre>
      )} */}
    </>
  );
};

export default OpeningHoursModal;
