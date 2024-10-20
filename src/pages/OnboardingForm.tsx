import { act, useEffect, useRef, useState } from "react";
import Businessnavbar from "../components/Businessnavbar";
import Businesssidebar from "../components/Businesssidebar";
import Container from "../components/Container"
import { Modal } from "flowbite-react/components/Modal";
import { Button, Label, Select, TextInput } from "flowbite-react";
import OpeningHoursModal from "../components/OpeningHoursModel";
import { Bounce, toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import axios from "axios";

interface Tags {
    keywords: string[];
  }
  
  // Interface for category data
  interface CategoryData {
    categoryId: number;
    categoryName: string;
    tags: Tags;
  }

interface OpenDays {
    [key: string]: {
      isOpen: boolean;
      startTime: string;
      endTime: string;
      specialNote: string;
    };
  }

  interface BusinessDetails {
    name: string;
    businessRegNo: string;
    logo: string;
    description: string;
    phone: string;
    address: string;
}

const businessCategories = [
    "Hotel",
    "Computer",
    "Electronic",
    "Food",
    "Stationary"
]

const hotelKeywords = [
    "Luxury",
    "Budget",
    "Family",
    "Business",
    "Boutique",
    "Spa",
    "Resort",
    "Suite",
    "Hostel",
    "Villa",
    "Conference",
    "Penthouse",
    "Staycation",
    "Motel",
    "Bungalow"
]

const foodKeywords = [
    "Fruits",
    "Vegetables",
    "Meats",
    "Snacks",
    "cake",
    "breakfast",
    "lunch",
    "Desserts",
    "Bakery",
    "Beverages",
    "Spices",
    "Grains",
    "Dairy"
]

const OnboardingForm: React.FC<BusinessDetails> = () => {
    const [busninessName, setBusinessName] = useState("")
    const [regNo, setRegNo] = useState("")
    const [activeTab, setActiveTab] = useState('BusinessDetails');
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [imageName, setImageName] = useState(''); // Store image file name
    const [imageFile, setImageFile] = useState<File | null>(null); // Store image file
    // const [openDays, setOpenDays] = useState<OpenDays | null>(null);
    const [businessOpeningHours, setBusinessOpeningHours] = useState<OpenDays>({
        Monday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Tuesday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Wednesday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Thursday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Friday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Saturday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
        Sunday: { isOpen: false, startTime: "00:00", endTime: "00:00", specialNote: "" },
    });
    const [selectedCategory, setSelectedCategory] = useState("")
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
        name: "",
        businessRegNo: "",
        logo: "",
        description: "",
        phone: "",
        address: ""
    });
    const [openModal, setOpenModal] = useState(false);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);


    const storedEmail = "yuhanga2001@gmail.com" // need to fetch from the local storage
    
    

    const handleSetOpeningHours = (openDays: OpenDays) => {
        console.log("inside handle open hours");
        setBusinessOpeningHours(openDays); // update state with opening hours
        
        
        
    };

    const isTagSelected = (tag: string) => selectedTags.includes(tag);

    const handleTagChange = (tag: string) => {
        setSelectedTags((prevSelectedTags) => {
          if (isTagSelected(tag)) {
            setErrorMessage(null);
            return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
          } else if (prevSelectedTags.length < 5) {
            setErrorMessage(null);
            return [...prevSelectedTags, tag];
          } else {
            setErrorMessage("You can only select up to 3 tags.");
            return prevSelectedTags;
          }
        });
      };
      

        // Handle file upload
        const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                setImageFile(file); // Store the file in the state
                setImageName(file.name); // Store the name of the uploaded file
            }
            
            setBusinessDetails({...businessDetails, logo: file ? file.name : ''});
        };


    const handleNextBusinessCategories = () => {
        setActiveTab("Subscription")
        console.log("selected category is: ", selectedCategory);
        console.log(selectedTags);
        
        
    }
    
    
    const handleNextOpeningHours = () =>{
        setActiveTab("BusinessCategory")
    }

    const handleNextBusinessDetails = () => {
        setActiveTab('OpeningHours');
        businessDetails.name = busninessName;
        businessDetails.businessRegNo = regNo;
        console.log(businessDetails);

        toast('Toggle button indicates whether your busienss is open or closed. You can enter open and closing times for each day and add a special note that you want your customers to know about the availability of your shop. Change anytime!', {
            position: "top-center",
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
            className: "text-sm bg-bluedark text-white"
            });
        
    }

    const fetchCategories = async() => {
        const url = `${BACKEND_URL}/category/all`

        try{
            const response = await axios.get(url);
            const data = response.data;

            const parsedCategoryData = data.map((item: any) => {
                return {
                  categoryId: item.categoryId,
                  categoryName: item.categoryName,
                  tags: JSON.parse(item.tags) // Convert the string to a proper object
                };
              });
              setCategoryData(parsedCategoryData)
              console.log(categoryData);
              
            
        } catch (e){
            console.error("Error fetching data:", e)
        }
    }

    const loadData = async (email: string) => {
        const url = `${BACKEND_URL}/business_owner/business/${email}`

        try{
            const response = await axios.get(url);
            
            const item = response.data;
            
            if (item.address == null || item.contactNo == null || item.description == null) {
                setOpenModal(true)
                console.log("hi");
                setBusinessName(item.name)
                setRegNo(item.businessRegNo)
                
            }
            
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }


    useEffect(() => {
        loadData(storedEmail)
    },[])
    
    return (
        <>
            <Container>
                <Businessnavbar />
                <Businesssidebar selectedTile="dashboard"/>
                <div className="px-12 sm:ml-64 mt-20">
                    <div className="w-fit mb-10 border-b-gray-900">
                        <h1 className="text-subsubheading text-bluedark">user onboarding</h1>
                    </div>
                    <div className="relative  overflow-x-auto overflow-y-auto sm:rounded-lg border border-gray-200">
                        <p>hello</p>
                    </div>
                </div>
            </Container>

            <Modal size="5xl" position="center" show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                Welcome to SpotBiz
                <div className="flex text-sm text-gray-500 text mb-4 mt-2">
                <p>To get the best experience we recommend you to follow these process</p>
                </div>
            </Modal.Header>
            <Modal.Body>
            <div className="p-3 flex flex-col items-center mb-6 space-y-6 overflow-y-auto">
                
                <div className="flex items-center space-x-6 mb-10 border-b border-gray-200">
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'BusinessDetails' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('BusinessDetails')}
                    >
                    Business Details
                    </button>
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'OpeningHours' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('OpeningHours')}
                    >
                    Opening Hours
                    </button>
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'BusinessCategory' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => {
                        setActiveTab('BusinessCategory');
                        fetchCategories();
                    }}
                    >
                    Business Category
                    </button>
                    <button
                    className={`px-0 py-2 pb-[calc(0.5rem - 4px)] rounded focus:outline-none ${activeTab === 'Subscription' ? 'text-black border-b-4 border-black' : 'bg-transparent text-gray-500 border-b-4 border-transparent hover:border-b-4 hover:border-gray-300'}`}
                    onClick={() => setActiveTab('Subscription')}
                    >
                    Subscription
                    </button>
                </div>

                {/* Handle business details */}
                {activeTab == "BusinessDetails" && <div className="flex flex-col flex-start w-2/3">

                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Business Name" />
                        </div>
                        <TextInput
                            value={busninessName}
                            onChange={(e) => setBusinessDetails({...businessDetails, name: e.target.value})}
                            id="name" ref={emailInputRef} disabled />
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="regno" value="Business Registration number" />
                        </div>
                        <TextInput 
                            value={regNo}
                            onChange={(e) => setBusinessDetails({...businessDetails, businessRegNo: e.target.value})}
                            id="regno" disabled />
                    </div>
                    {/* Business logo upload */}
                    <div className="mb-8">
                            <div className="mb-2 block">
                                <Label htmlFor="logo" value="Business logo/related image" />
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <label htmlFor="logo-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input
                                        onChange={handleImageUpload}
                                        id="logo-upload"
                                        type="file"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {imageName && <p className="mt-2 text-sm text-gray-600">Uploaded: {imageName}</p>}
                        </div>
                        {/* <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input 
                                    onChange={(e) => setBusinessDetails({...businessDetails, logo: e.target.value})}
                                    id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>  */}
                        {/* <TextInput id="name" ref={emailInputRef} placeholder="name@company.com" required /> */}
                    
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Description" />
                        </div>
                        <textarea 
                            onChange={(e) => setBusinessDetails({...businessDetails, description: e.target.value})}
                            id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tell something about your business..."></textarea>
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="phone" value="Business Contact No" />
                        </div>
                        <TextInput 
                            onChange={(e) => setBusinessDetails({...businessDetails, phone: e.target.value})}
                            id="phone" placeholder="+94xxxxxxxxx" required />
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Business Address" />
                        </div>
                        <TextInput 
                            onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})}
                            id="address"  placeholder="Your business address" required />
                    </div>
                    
                </div>}

                {/* handle business hours */}
               {activeTab == "OpeningHours" && <div className="flex flex-col flex-start w-2/3">
                    <OpeningHoursModal onSetOpeningHours={handleSetOpeningHours} businessEmail={storedEmail}/>
                </div>}

                {
                    activeTab == "BusinessCategory" && <div className="flex flex-col flex-start w-2/3">
                       <div className="mb-8">
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Choose the category that your busienss would fit into" />
                            </div>
                            <Select
                                id="category"
                                required={true}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                <option value="">Select an option</option>
                                {categoryData.map((category, index) => (
                                    <option key={index} value={category.categoryName}>
                                        {category.categoryName}
                                    </option>
        ))}
                            </Select>
                        </div>
                        {
                            selectedCategory != "" && <div className="mb-8">
                                <div className="mb-2 block">
                                    <Label htmlFor="tags" value="Select upto five tags" />
                                </div>
                                    <ul className="grid w-full gap-2 md:grid-cols-3">
                            {categoryData.map((item: any, index) => (
                              item.categoryName === selectedCategory && item.tags.keywords.map((tag: string) => (
                                <li key={tag}>
                                  <input
                                    type="checkbox"
                                    id={`${tag}-option`}
                                    value={tag}
                                    checked={isTagSelected(tag)}
                                    onChange={() => handleTagChange(tag)}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor={`${tag}-option`}
                                    className={`inline-flex items-center justify-between w-full p-2 border rounded-lg cursor-pointer 
                                      ${
                                        isTagSelected(tag)
                                          ? "border-bluedark bg-bluegray text-blue-600 dark:bg-blue-600 dark:text-white"
                                          : "border-gray-200 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                                      }
                                      hover:bg-gray-50 dark:hover:bg-gray-700`}
                                  >
                                    <div className="block">
                                      <div className="w-full text-xs font-semibold">
                                        {tag}
                                      </div>
                                    </div>
                                  </label>
                                </li>
                              ))
                            ))}
                                  </ul>
                                
                            </div>
                        }
                    </div>
                }
                    
            </div>
            </Modal.Body>
            <Modal.Footer className="flex flex-row justify-end">

                {/* handle business details */}
                {activeTab == "BusinessDetails" && <Button color="dark" onClick={handleNextBusinessDetails}>
                    Next
                </Button>}
                {/* handle opening hours */}
                {activeTab == "OpeningHours" && <Button color="dark" onClick={handleNextOpeningHours}>
                    Next
                </Button>}
                {/* handle categories and tags */}
                {activeTab == "BusinessCategory" && <Button color="dark" onClick={handleNextBusinessCategories}>
                    Next
                </Button>}
                
            {/* <Button color="gray" onClick={() => setOpenModal(false)}>
                Decline
            </Button> */}
            </Modal.Footer>
            
            </Modal>
        </>
        
    );
};

export default OnboardingForm;