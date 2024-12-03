import React from "react";
import { Modal, Button } from "flowbite-react";

interface AllAvatar{
  picId: number;
  imageUrl: string;
}

interface AvatarModalProps {
  isOpen: boolean;
  onClose: () => void;
  avatars: AllAvatar[];
  selectedAvatar: AllAvatar | null;
  onSelectAvatar: (avatar: AllAvatar) => void;
  onUpdate: () => void;
}

const AvatarModal: React.FC<AvatarModalProps> = ({
  isOpen,
  onClose,
  avatars,
  selectedAvatar,
  onSelectAvatar,
  onUpdate,
}) => {
  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="md"
      theme={{
        content: {
          base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
          inner: "p-6 rounded-lg shadow-lg",
        },
      }}
    >
      <Modal.Header className="text-center">Choose Your Avatar</Modal.Header>
      <Modal.Body className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className="relative cursor-pointer"
              onClick={() => onSelectAvatar(avatar)}
            >
              <img
                src={avatar.imageUrl}
                alt={`Avatar ${index}`}
                className={`w-16 h-16 object-cover rounded-full ${
                  avatar === selectedAvatar ? "border-2 border-primary" : ""
                }`}
              />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-between">
        <Button color="gray" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={onUpdate}
          className="text-white bg-bluedark hover:bg-bluedark/90 focus:ring-4 focus:outline-none focus:ring-bluedark/50 font-medium rounded-lg inline-flex items-center transition duration-200"
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AvatarModal;
