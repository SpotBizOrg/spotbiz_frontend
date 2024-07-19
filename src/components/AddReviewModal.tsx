import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";

export function AddReviewModal() {
  const [openModal, setOpenModal] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)} className="bg-bluedark">
        Add Review
      </Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={closeModal}
        initialFocus={titleInputRef}
        className="flex justify-center items-center bg-gray-900 bg-opacity-50"
      >
        <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-lg">
          <Modal.Header>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add a Review
            </h3>
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Review Title" />
                </div>
                <TextInput
                  id="title"
                  ref={titleInputRef}
                  placeholder="Title of your review"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="review" value="Your Review" />
                </div>
                <textarea
                  id="review"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your review here"
                  required
                ></textarea>
              </div>
              <div className="w-full flex justify-between">
                <Button onClick={closeModal} className="bg-bluedark">
                  Cancel
                </Button>
                <Button onClick={closeModal} className="bg-bluedark">
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}

export default AddReviewModal;
