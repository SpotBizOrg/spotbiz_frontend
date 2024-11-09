import React, { useState, useEffect } from "react";
import { Button, Card, Modal } from "flowbite-react";
import CustomToggleSwitch from "../components/CustomToggleSwitch";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAuth } from "../utils/AuthProvider";
import { toast } from "react-toastify";

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

const OpeningHoursPage: React.FC = () => {
  const [openDays, setOpenDays] = useState<OpenDays | null>(null);
  const [openHoursModal, setOpenHoursModal] = useState(false);
  const { user } = useAuth();
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const validateOpeningHours = (): boolean => {
    const errors: { [key: string]: string } = {};

    Object.keys(openDays!).forEach((day) => {
      const { startTime, endTime, isOpen } = openDays![day as Day];

      if (isOpen && startTime > endTime) {
        errors[day] = "Start time must be earlier than end time.";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/businessOpening/${user?.email}`
        );

        if (!response.ok) {
          console.error("Failed to fetch opening hours: ", response.statusText);
          return;
        }

        const text = await response.text();

        if (text.trim() === "" || text === "null") {
          console.warn("Response is empty or null. Using default values.");
          const defaultValues: OpenDays = {
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
          };
          setOpenDays(defaultValues);
          return;
        }

        const data = JSON.parse(text);

        const sanitizeDayData = (dayData: any) => ({
          isOpen: typeof dayData.isOpen === "boolean" ? dayData.isOpen : false,
          startTime: dayData.startTime || "00:00",
          endTime: dayData.endTime || "00:00",
          specialNote: dayData.specialNote || "",
        });

        const days: Day[] = [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ];

        const mergedData: OpenDays = days.reduce((acc, day) => {
          acc[day] = sanitizeDayData(data[day] || {});
          return acc;
        }, {} as OpenDays);

        setOpenDays(mergedData);
      } catch (error) {
        console.error("Error occurred while fetching opening hours", error);
      }
    };

    fetchOpeningHours();
  }, [user?.email]);

  const handleToggle = (day: Day) => {
    setOpenDays((prev) => {
      if (!prev) return prev;

      const isCurrentlyOpen = prev[day].isOpen;

      return {
        ...prev,
        [day]: {
          ...prev[day],
          isOpen: !isCurrentlyOpen,
          startTime: !isCurrentlyOpen ? prev[day].startTime : "00:00",
          endTime: !isCurrentlyOpen ? prev[day].endTime : "00:00",
        },
      };
    });
  };

  const handleTimeChange = (
    day: Day,
    field: "startTime" | "endTime",
    value: string
  ) => {
    if (!openDays) return;
    setOpenDays((prev) => ({
      ...prev,
      [day]: { ...prev![day], [field]: value },
    }));
  };

  const handleSpecialNoteChange = (day: Day, value: string) => {
    if (!openDays) return;
    setOpenDays((prev) => ({
      ...prev,
      [day]: { ...prev![day], specialNote: value },
    }));
  };

  const handleUpdateOpeningHours = async () => {
    if (!openDays) return;

    if (!validateOpeningHours()) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/businessOpening/${user?.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(openDays),
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setOpenDays(updatedData);
        setOpenHoursModal(false);
        toast.success("Business opening hours updated successfully!");
      } else {
        toast.error("Failed to update opening hours");
      }
    } catch (error) {
      toast.error(`Error occurred while updating opening hours: ${error}`);
    }
  };

  if (!openDays) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Card className="bg-white p-6 shadow-md border border-gray-200 overflow-y-auto max-h-screen">
        <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="table-header text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "100px" }}
                >
                  Day
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Open Hours</div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3"
                  style={{ minWidth: "150px" }}
                >
                  <div className="flex items-center">Special Note</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(openDays).map((day) => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {day}
                  </th>
                  <td className="px-6 py-4">
                    {openDays[day as Day].isOpen ? (
                      <>
                        {openDays[day as Day].startTime} -{" "}
                        {openDays[day as Day].endTime}
                      </>
                    ) : (
                      "Opening hours not set yet"
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {openDays[day as Day].specialNote}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="fixed bottom-40 right-8 w-12 h-12">
          <div className="relative w-full h-full">
            <div
              className="bg-bluedark absolute w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300"
              onClick={() => setOpenHoursModal(true)}
            >
              <MdOutlineModeEdit className="text-lg" />
            </div>
          </div>
        </div>
      </Card>

      <Modal
        show={openHoursModal}
        size="3xl"
        onClose={() => setOpenHoursModal(false)}
        theme={{
          content: {
            base: "bg-white w-3/4 mx-auto rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header>Update Opening Hours</Modal.Header>
        <Modal.Body>
          <form className="space-y-2">
            {Object.keys(openDays).map((day) => (
              <div key={day} className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <label className="text-sm font-medium text-gray-900 w-20">
                    {day}
                  </label>
                  <CustomToggleSwitch
                    checked={openDays[day as Day].isOpen}
                    onChange={() => handleToggle(day as Day)}
                  />
                  {openDays[day as Day].isOpen && (
                    <div className="flex items-center space-x-1 ml-4">
                      <input
                        type="time"
                        value={openDays[day as Day].startTime}
                        onChange={(e) =>
                          handleTimeChange(
                            day as Day,
                            "startTime",
                            e.target.value
                          )
                        }
                        className="w-28 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                      <span className="text-xs">TO</span>
                      <input
                        type="time"
                        value={openDays[day as Day].endTime}
                        onChange={(e) =>
                          handleTimeChange(
                            day as Day,
                            "endTime",
                            e.target.value
                          )
                        }
                        className="w-28 text-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Note"
                    value={openDays[day as Day].specialNote}
                    onChange={(e) =>
                      handleSpecialNoteChange(day as Day, e.target.value)
                    }
                    className="ml-2 text-xs flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleUpdateOpeningHours}
            className="bg-bluedark text-white rounded-md flex items-center"
          >
            Update
          </Button>
          <Button color="gray" onClick={() => setOpenHoursModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OpeningHoursPage;
