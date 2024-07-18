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
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(17, 24, 39, 0.5)",
        }}
      >
        <div style={{ width: "400px" }}>
          <Modal.Header>
            {/* <h3 className="text-xl font-medium text-gray-900 dark:text-white p-6">
              Add a Review
            </h3> */}
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
              <div className="w-full">
                <Button
                  onClick={closeModal}
                  className="px-4 py-2 font-semibold text-white bg-bluedark rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-100 focus:ring-offset-2"
                >
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
