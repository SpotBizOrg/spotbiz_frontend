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
        popup
        onClose={closeModal}
        initialFocus={titleInputRef}
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg", // Added rounded-lg here
          },
        }}
      >
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2 mb-4">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add a Review
            </h3>
            <button
              aria-label="Close"
              onClick={closeModal}
              className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white p-1.5 rounded-lg"
              type="button"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="space-y-6">
            <div>
              <Label htmlFor="title" value="Review Title" />
              <TextInput
                id="title"
                ref={titleInputRef}
                placeholder="Title of your review"
                required
                className="mt-1 p-2.5 text-sm"
              />
            </div>
            <div>
              <Label htmlFor="review" value="Your Review" />
              <textarea
                id="review"
                rows={4}
                className="block w-full mt-1 p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your review here"
                required
              ></textarea>
            </div>
            <div className="flex justify-between">
              <Button onClick={closeModal} className="bg-bluedark">
                Cancel
              </Button>
              <Button onClick={closeModal} className="bg-bluedark">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AddReviewModal;
