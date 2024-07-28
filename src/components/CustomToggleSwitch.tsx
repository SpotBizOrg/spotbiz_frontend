import React from "react";

// Define the type for the props
interface CustomToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

const CustomToggleSwitch: React.FC<CustomToggleSwitchProps> = ({
  checked,
  onChange,
  label,
}) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
      />
      <div
        className={`relative w-9 h-5 rounded-full peer-focus:outline-none peer-focus:ring-4 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 ${
          checked ? "bg-bluedark" : "bg-gray-200"
        }`}
      />
      {label && (
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default CustomToggleSwitch;
