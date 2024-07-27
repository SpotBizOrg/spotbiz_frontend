import React, { useState } from "react";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowCurrentPassword = () =>
    setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
      theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}
    >
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <div className="relative">
            <Label htmlFor="current-password" value="Current Password" />
            <div className="flex items-center">
              <TextInput
                id="current-password"
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter your current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="flex-grow"
              />
              <span
                className="absolute right-4 cursor-pointer"
                onClick={toggleShowCurrentPassword}
                style={{ top: "50%", transform: "translateY(-50%)" }}
              >
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <a
              href="#"
              className="text-sm text-bluedark hover:underline mt-2 block text-right"
            >
              Forgot Password?
            </a>
          </div>
          <div className="relative">
            <Label htmlFor="new-password" value="New Password" />
            <div className="flex items-center">
              <TextInput
                id="new-password"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="flex-grow"
              />
              <span
                className="absolute right-4 cursor-pointer"
                onClick={toggleShowNewPassword}
                style={{ top: "70%", transform: "translateY(-50%)" }}
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="relative">
            <Label htmlFor="confirm-password" value="Confirm Password" />
            <div className="flex items-center">
              <TextInput
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="flex-grow"
              />
              <span
                className="absolute right-4 cursor-pointer"
                onClick={toggleShowConfirmPassword}
                style={{ top: "70%", transform: "translateY(-50%)" }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <Button onClick={onClose} color={"gray"}>
            Cancel
          </Button>
          <Button
            onClick={onClose}
            className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
          >
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
