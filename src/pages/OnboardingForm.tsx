import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "flowbite-react/components/Modal";
import { Button, Label, Select, TextInput } from "flowbite-react";
import OpeningHoursModal from "../components/OpeningHoursModel";
import { Bounce, toast } from "react-toastify";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import PackageListPage from "./PackageListPageNew";
import { HashLoader } from "react-spinners";

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
    contactNo: string;
    address: string;
}


const OnboardingForm: React.FC = () => {
    const [businessId, setBusinessId] = useState<number>(0);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [userId, setUserId] = useState<number>(0)
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
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [businessDetails, setBusinessDetails] = useState<BusinessDetails>({
        name: "",
        businessRegNo: "",
        logo: "",
        description: "",
        contactNo: "",
        address: ""
    });
    const [openModal, setOpenModal] = useState(false);
    const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
    const [selectedSubPackage, setSeletectedSubPackage] = useState<number>(0)
    const selectedPackageRef = useRef<number>(selectedSubPackage);
    const [loading, setloading] = useState(false);


    const navigate = useNavigate();


    const storedEmail = "yuhanga2001@gmail.com" // need to fetch from the local storage
    // const storedEmail = localStorage.getItem("email")
    

    const handleSetOpeningHours = (openDays: OpenDays) => {
        console.log("inside handle open hours");
        setBusinessOpeningHours(openDays); // update state with opening hours
        fetchCategories();
        
        
    };

    const isTagSelected = (tag: string) => selectedTags.includes(tag);

    // handle tag change
    const handleTagChange = (tag: string) => {
        setSelectedTags((prevSelectedTags) => {
          if (isTagSelected(tag)) {
            setErrorMessage(null);
            return prevSelectedTags.filter((selectedTag) => selectedTag !== tag);
          } else if (prevSelectedTags.length < 5) {
            setErrorMessage(null);
            return [...prevSelectedTags, tag];
          } else {
            setErrorMessage("You can only select up to 5 tags.");
            return prevSelectedTags;
          }
        });
      };

      // Upload image to the server
      const uploadImage = async (imageFile: string | Blob) => {
        const formData = new FormData();
        formData.append("file", imageFile);
    
        try {
          const response = await fetch(`${BACKEND_URL}/upload_image`, {
            method: "POST",
            body: formData,
          });
    
          if (!response.ok) {
            const errorData = await response.json();
            console.error("Error uploading image:", errorData);
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${
                errorData.message || "Unknown error"
              }`
            );
          }
    
          const imageUrl = await response.text();
          console.log("Image URL:", imageUrl);
          return imageUrl;
        } catch (error) {
          console.error("An error occurred during image upload:", error);
          throw error;
        }
      };
      

        // Handle file upload
        const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {

            if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setImageFile(file);
                console.log("Image file:", file);
                
                setImagePreview(URL.createObjectURL(file));

                let imageUrl = "https://iili.io/2zgRy8u.jpg"

                if (file) {
                    console.log("Uploading image...");
                    
                    setImageName(file.name);
                    // imageUrl = await uploadImage(file);
                    console.log("Image URL:", imageUrl);
        
                } else{
                    console.log("No image file found");
                }
                
                setBusinessDetails({...businessDetails, logo: imageUrl=='' ? '' : imageUrl});
              }

              

            
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

        // check null
        if (businessDetails.logo == "" || businessDetails.description == "" || businessDetails.contactNo == "" || businessDetails.address == "") {
            toast.error('Fields cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return;
        }

        //check contactNo no digits
        if (businessDetails.contactNo.length < 10) {
            toast.error('Phone number should have 10 digits', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return;
            
        }

        //check contactNo no format
        if (!businessDetails.contactNo.match(/^\+94\d{9}$/)) {
            toast.error('Phone number should follow the given format', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            return;
            
        }

        // go to the next tab
        setActiveTab('OpeningHours');

        businessDetails.name = busninessName;
        businessDetails.businessRegNo = regNo;
        console.log(businessDetails);

        // a guide to the user
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

    // fetch the categories from the backend
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

    const handleSelectCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        
        setSelectedCategory((e.target.value));
        // console.log(selectedCategory);
    }

    // check whether the user has already entered the business details
    // if not, prompt the user to enter the details - open a modal
    const loadData = async (email: string) => {
        const url = `${BACKEND_URL}/business_owner/business/${email}`

        try{
            const response = await axios.get(url);
            
            const item = response.data;
            
            // new users will have null values for the following fields
            if (item.address == null || item.contactNo == null || item.description == null) {
                setOpenModal(true)
                setBusinessName(item.name)
                setRegNo(item.businessRegNo)
                setUserId(item.userId)
                setBusinessId(item.businessId)
                
            }
            
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }

    const saveOpnHours = async (data: JSON) => {
        console.log(data);
    
        try{
          const url = `${BACKEND_URL}/businessOpening/${storedEmail}`;
    
          const response = await axios.post(url, data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
    
      }

    const saveBusinessData = async (data: JSON, category: string, tags: Array<string>, busienssId:number) => {

        const body = {
          ...data, 
          categoryId: parseInt(category), 
          tags: tags,
          userId: userId,
          profileCover:null,
          locationUrl:null,
          status: "APPROVED",
          businessId: busienssId
        
        }
    
        console.log(body);
        
    
        try{
          const url = `${BACKEND_URL}/business/update/${storedEmail}`;
    
          const response = await axios.put(url, body);
          console.log(response.data);
    
        } catch (error) {
          console.error(error);
        }
    }

    const saveLocalStorageData = async (data: any) => {

        try {
            await saveBusinessData(data.businessDetails, data.category, data.tags, data.businessId); // Wait for this to complete
            await saveOpnHours(data.openHours); // Wait for this to complete
        } catch (error) {
            console.error("Error saving data:", error);
        } 
    };

    const getLocalStorageData = async () => {
        const data = JSON.parse(localStorage.getItem("data")!);
        console.log("from local storage", data);
        saveLocalStorageData(data);
        
      }

    // nagigation upon selecting a package
    const handleClick = async (selectedPlanId: number, subscriptionBillingId:number) => {

        if (selectedPlanId === 0) {
            try{
                setloading(true);
                await getLocalStorageData();
            } catch (e){
                console.error("Error fetching data:", e)
            } finally {
                setloading(false);
                navigate("/business/dashboard");
            }
        } else {
            navigate("/packages/payment", { state: { selectedPlanId, subscriptionBillingId } });
            
        }
    };

    // store all the data in the local storage to be used in the payment page 
    // save there if the payment is success
    const storeAllLocalStorage= () => {

        console.log("businessId", businessId);
        

        const data = {
            selectedSubPackage : selectedPackageRef.current,
            category: selectedCategory,
            tags : selectedTags,
            businessDetails: businessDetails,
            openHours: businessOpeningHours,
            userId: userId,
            businessId: businessId
        }
        localStorage.setItem("data", JSON.stringify(data));
        console.log("Data stored in the local storage: ", data);
        
        
    }

    // get the price of the selected package
    const getPrice = async (packageId: number) => {
        const url = `${BACKEND_URL}/packages/get/${packageId}`

        try{
            const response = await axios.get(url);
            const item = response.data;
            console.log(item);
            return item.price;
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }

    // save the purchase in the database - pending state
    const savePurchase = async (packageId: number) => {

        const price = await getPrice(packageId);
        console.log(price);
        

        const url = `${BACKEND_URL}/subscription-billing/subscription-billing`
        const data = {
            subscriptionBillingId: 0,
            subscriptionId: packageId,
            businessId: businessId,
            billingDate: (new Date()).toISOString(),
            billingStatus: "PENDING",
            amount: price
          }
        console.log(data);
        

        try{
            const response = await axios.post(url, data);
            const item = response.data;
            console.log(item);
            return item.subscriptionBillingId;
        }catch (e){
            console.error("Error fetching data:", e)
        }
    }

    // set the selected subscription package id
    const setSelectedPackageId = async (packageId: number): Promise<void> => {
        
        selectedPackageRef.current = packageId; // Update ref synchronously
        setSeletectedSubPackage(packageId);       // Set state (asynchronously)
        console.log("Updated Package ID (ref):", selectedPackageRef.current);
        console.log(selectedSubPackage);
        
        //set loader
        setloading(true);
    
        // store all the data in the local storage to be used in the payment page
        storeAllLocalStorage()

        // save the purchase in the database
        const billingId = await savePurchase(packageId);
        console.log("Billing ID:", billingId);

        setloading(false);
        
        // navigate to the next page
        handleClick(packageId, billingId);
      };

    

    useEffect(() => {

            // fetch the business details based on the token to check if it's a new user or not
            if (storedEmail) {
                loadData(storedEmail);
            }
        }, [])
    
    return (
        <>
            {/* <Container>
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
            </Container> */}

        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <HashLoader color="#36d7b7" size={50} />
          </div>
        )}
            <Modal size="7xl" position="center" show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                Welcome to SpotBiz
                <div className="flex text-sm text-gray-500 text mb-4 mt-2">
                <p>To get the best experience we recommend you to follow these process</p>
                </div>
            </Modal.Header>

            <Modal.Body>
            <div className="p-3 flex flex-col items-center mb-6 space-y-6 overflow-y-auto">
                
                {/* the tabs */}
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
                            <div className="flex flex-col items-center justify-center w-full">
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
                                        accept="image/*"
                                        className="hidden"
                                    />
                                    
                                </label>
                                <div className="flex flex-row gap-4 items-center">
                                {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="Image Preview"
                                            className="w-24 h-24 object-cover mt-2 border border-gray-300 rounded"
                                        />
                                        )}
                                {imageName && <p className="mt-2 text-sm text-gray-600">Uploaded: {imageName}</p>}

                                </div>
                                
                            </div>
                        </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Description" />
                        </div>
                        <textarea 
                            value={businessDetails.description}
                            onChange={(e) => setBusinessDetails({...businessDetails, description: e.target.value})}
                            id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tell something about your business..."></textarea>
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="contactNo" value="Business Contact No" />
                        </div>
                        <TextInput 
                            value={businessDetails.contactNo}
                            onChange={(e) => setBusinessDetails({...businessDetails, contactNo: e.target.value})}
                            id="contactNo" placeholder="+94xxxxxxxxx" required />
                    </div>
                    <div className="mb-8">
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Business Address" />
                        </div>
                        <TextInput 
                            value={businessDetails.address}
                            onChange={(e) => setBusinessDetails({...businessDetails, address: e.target.value})}
                            id="address"  placeholder="Your business address" required />
                    </div>
                    
                </div>}

                {/* handle business hours */}
               {activeTab == "OpeningHours" && <div className="flex flex-col flex-start w-2/3">
                    <OpeningHoursModal onSetOpeningHours={handleSetOpeningHours} businessEmail={storedEmail || ''}/>
                </div>}

                {/* handle business categories and tags*/}
                {
                    activeTab == "BusinessCategory" && <div className="flex flex-col flex-start w-2/3">

                       {/* previously fetched category list is loaded */}
                       <div className="mb-8">
                            <div className="mb-2 block">
                                <Label htmlFor="category" value="Choose the category that your busienss would fit into" />
                            </div>
                            <Select
                                id="category"
                                required={true}
                                value={selectedCategory}
                                onChange={(e) => handleSelectCategory(e)}
                                // onChange={(e) => setSelectedCategory(Number(e.target.value))}
                                >
                                <option value="">Select an option</option>
                                {categoryData.map((category, index) => (
                                    <option key={index} value={category.categoryId}>
                                        {category.categoryName}
                                    </option>
        ))}
                            </Select>
                        </div>

                        {/* tags are loaded according to the category */}
                        {
                            parseInt(selectedCategory) > 0 && <div className="mb-8">
                                <div className="mb-2 block">
                                    <Label htmlFor="tags" value="Select upto five tags" />
                                </div>
                                    <ul className="grid w-full gap-2 md:grid-cols-3">
                            {categoryData.map((item: any) => (
                              item.categoryId == parseInt(selectedCategory) && item.tags.keywords.map((tag: string) => (
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

                {/* subscription packages tab */}
                {
                    activeTab == "Subscription" && <div className="flex flex-col flex-start">
                        
                        <PackageListPage passId={setSelectedPackageId} />
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
                {/* {activeTab == "Subscription" && <Button color="dark" onClick={handleNextBusinessCategories}>
                    Save all
                </Button>} */}
            </Modal.Footer>
            
            </Modal>

                
        </>
        
    );
};

export default OnboardingForm;