import { Modal, Card } from "flowbite-react";
import { MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import {
  FaYoutube,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useAuth } from "../utils/AuthProvider";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";

type SocialLinks = {
  facebook?: string;
  youtube?: string;
  instagram?: string;
  linkedin?: string;
  x?: string;
};

interface SocialLinksCardProps {
  openSocialModal: boolean;
  setOpenSocialModal: (open: boolean) => void;
}

const SocialLinksCard: React.FC<SocialLinksCardProps> = ({
  openSocialModal,
  setOpenSocialModal,
}) => {
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    youtube: "",
    instagram: "",
    linkedin: "",
    x: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof SocialLinks, string>>
  >({});

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/social_links/${user?.email}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch social links");
        }
        const data = await response.json();
        const updatedLinks: SocialLinks = {};

        data.forEach((link: { type: string; link: string }) => {
          updatedLinks[link.type.toLowerCase() as keyof SocialLinks] =
            link.link;
        });

        setSocialLinks(updatedLinks);
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    if (user?.email) {
      fetchSocialLinks();
    }
  }, [user?.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setSocialLinks((prevLinks) => ({
      ...prevLinks,
      [id as keyof SocialLinks]: value,
    }));

    // Clear error for the field being edited
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id as keyof SocialLinks]: "",
    }));
  };

  const validateLinks = (): boolean => {
    const newErrors: Partial<Record<keyof SocialLinks, string>> = {};
    let isValid = true;

    // Facebook validation
    if (
      socialLinks.facebook &&
      !/^https?:\/\/(www\.)?(facebook\.com|web\.facebook\.com)\/(profile\.php\?id=\d+|.+)$/.test(
        socialLinks.facebook
      )
    ) {
      newErrors.facebook =
        "Invalid Facebook URL. Example: https://facebook.com/yourpage";
      isValid = false;
    }

    // YouTube validation
    if (
      socialLinks.youtube &&
      !/^https?:\/\/(www\.)?youtube\.com\/(@[a-zA-Z0-9_]+|user\/[a-zA-Z0-9_]+|channel\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_-]+)$/.test(
        socialLinks.youtube
      )
    ) {
      newErrors.youtube =
        "Invalid YouTube URL. Example: https://youtube.com/user/yourchannel";
      isValid = false;
    }

    // Instagram validation
    if (
      socialLinks.instagram &&
      !/^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._-]+\/?$/.test(
        socialLinks.instagram
      )
    ) {
      newErrors.instagram =
        "Invalid Instagram URL. Example: https://instagram.com/yourprofile";
      isValid = false;
    }

    // LinkedIn validation
    if (
      socialLinks.linkedin &&
      !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/.test(
        socialLinks.linkedin
      )
    ) {
      newErrors.linkedin =
        "Invalid LinkedIn URL. Example: https://linkedin.com/in/yourprofile";
      isValid = false;
    }

    // X (Twitter) validation
    if (
      socialLinks.x &&
      !/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/(i\/\S+|([A-Za-z0-9_]{1,15}))\/?$/.test(
        socialLinks.x
      )
    ) {
      newErrors.x =
        "Invalid URL. Please provide a valid X profile URL. Example: https://x.com/yourprofile";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateLinks()) {
      return;
    }

    const formattedLinks = Object.entries(socialLinks).map(([key, value]) => ({
      type: key.toUpperCase(),
      link: value,
    }));

    console.log("Submitting social links:", formattedLinks);

    try {
      const response = await fetch(
        `${BACKEND_URL}/social_links/${user?.email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedLinks), // Send directly as socialLinks
        }
      );
      const responseData = await response.json();
      console.log("Response:", responseData);

      if (!response.ok) {
        throw new Error("Failed to save social links");
      }

      toast.success("Social links updated successfully!");
      setOpenSocialModal(false);
    } catch (error) {
      toast.error("Error updating social links: " + error);
      console.error("Error updating social links:", error);
    }
  };

  return (
    <Card className="bg-white shadow-md border border-gray-200 flex-1 pb-15 ">
      <div className="flex justify-between pb-1">
        <p className="text-black text-sm font-medium p-2">Social Links</p>
        <div className="fixed bottom-11 -right-12 m-8 w-24 h-24">
          <div className="relative w-full h-full">
            <div
              className="bg-bluedark absolute w-12 h-12 rounded-full text-white flex items-center justify-center shadow-lg cursor-pointer transition-transform duration-300"
              onClick={() => setOpenSocialModal(true)}
            >
              <MdOutlineModeEdit className="text-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              className="group relative text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-[#1877F2] text-2xl" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                Facebook
              </div>
            </a>
          )}
          {socialLinks.x && (
            <a
              href={socialLinks.x}
              className="group relative text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter className="text-[#000] text-2xl" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                Twitter
              </div>
            </a>
          )}
          {socialLinks.linkedin && (
            <a
              href={socialLinks.linkedin}
              className="group relative text-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="text-[#0077b5] text-2xl" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                LinkedIn
              </div>
            </a>
          )}
          {socialLinks.instagram && (
            <a
              href={socialLinks.instagram}
              className="group relative text-pink-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-pink-500 text-2xl" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                Instagram
              </div>
            </a>
          )}
          {socialLinks.youtube && (
            <a
              href={socialLinks.youtube}
              className="group relative text-red-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="text-red-600 text-2xl" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:bg-sky-600 text-white text-xs font-semibold p-1 rounded-lg transition-opacity duration-500">
                YouTube
              </div>
            </a>
          )}
        </div>
      </div>

      <Modal
        show={openSocialModal}
        onClose={() => setOpenSocialModal(false)}
        theme={{
          content: {
            base: "bg-white w-3/4 rounded-lg",
            inner: "p-6 rounded-lg shadow-lg",
          },
        }}
      >
        <Modal.Header>Update - Social Links</Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="facebook"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Facebook
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaFacebookF className="text-[#1877F2] text-xl m-1" />
                  </div>
                  <input
                    type="text"
                    id="facebook"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://facebook.com/yourprofile"
                    value={socialLinks.facebook}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.facebook && (
                  <p className="text-red-500 text-xs">{errors.facebook}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="youtube"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Youtube
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaYoutube className="text-red-600 text-xl m-1" />
                  </div>
                  <input
                    type="text"
                    id="youtube"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://youtube.com/yourprofile"
                    value={socialLinks.youtube}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.youtube && (
                  <p className="text-red-500 text-xs">{errors.youtube}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="instagram"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Instagram
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaInstagram className="text-pink-500 text-xl m-1" />
                  </div>
                  <input
                    type="text"
                    id="instagram"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://instagram.com/yourprofile"
                    value={socialLinks.instagram}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.instagram && (
                  <p className="text-red-500 text-xs">{errors.instagram}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  LinkedIn
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaLinkedinIn className="text-[#0077b5] text-xl m-1" />
                  </div>
                  <input
                    type="text"
                    id="linkedin"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://linkedin.com/yourprofile"
                    value={socialLinks.linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.linkedin && (
                  <p className="text-red-500 text-xs">{errors.linkedin}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="x"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  X
                </label>
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <FaSquareXTwitter className="text-[#000] text-xl m-1" />
                  </div>
                  <input
                    type="text"
                    id="x"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="https://twitter.com/yourprofile"
                    value={socialLinks.x}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              {errors.x && <p className="text-red-500 text-xs">{errors.x}</p>}
            </div>
            <button
              type="submit"
              className="text-white bg-bluedark hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Save
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </Card>
  );
};

export default SocialLinksCard;
