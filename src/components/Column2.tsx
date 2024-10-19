// src/components/Column2.tsx
import React, { useEffect } from 'react';
import { BACKEND_URL } from '../../config';

interface Column2Props {
  businessEmail: string;
}

interface ImageProps {
  img: string;
  endDate: string;
  startDate: string;
  description: string;
}

interface AdProps {
  adsId: string;
  data:ImageProps;
  status: boolean;
}

const Column2: React.FC<Column2Props> = ({ businessEmail }) => {

  const [AdsData, setAdsData] = React.useState<AdProps[]>([]);

  const handleClick = (keyword: string) => {
    console.log(`Clicked on ${keyword}`);
  };

  const fetchData = async (email: string) => {
    const url = `${BACKEND_URL}/business_owner/advertisements/${email}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      // Parse the 'data' field in each ad
      const parsedAdsData = data.map((ad: AdProps) => ({
        ...ad,
        data: JSON.parse(ad.data as unknown as string),
      }));

      parsedAdsData.filter((ad: AdProps) => {
        ad.status
      });

      setAdsData(parsedAdsData);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  fetchData(businessEmail);
}, []);

const checkActive = (startDate: Date, endDate: Date) => {
  const now = new Date();
  return now > startDate && now < endDate;
}

  // const images = [
  //   { src: prom1, date: new Date('2024-07-30'), aspectRatio: '100%', title: "Mega Stock Clearance Sale!" },
  //   { src: prom2, date: new Date('2024-07-27'), aspectRatio: '100%', title: "Abans Home Kitchen Baking Champion" },
  //   { src: prom3, date: new Date('2024-07-25'), aspectRatio: '100%', title: "Newest Arrival!" },
  // ];

  const calculateTimePassed = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="p-2 border border-gray-400 rounded text-center mb-10">
          <p className="font-bold text-bluedark text-bodymedium">Latest Promotions</p>
        </div>
        <div className="space-y-4">
          {AdsData.map((image, index) => (
            checkActive(new Date(image.data.startDate), new Date(image.data.endDate)) && (
              <div key={index} className="space-y-2 bg-white shadow-md border border-gray-300 rounded-lg p-8">
              <p className='text-subsubheading'>{image.data.description}</p>
              <p className="text-end text-gray-600 text-bodysmall">{calculateTimePassed(new Date(image.data.startDate))}</p>
         
              <div
                className="relative bg-cover rounded-md mb-2"
                style={{
                  backgroundImage: `url(${image.data.img})`,
                  paddingBottom: '100%',
                  height: 0,
                }}
              ></div>
            </div>
            )
  
          ))}
        </div>
      </div>
      <div className="mt-10">
      <div className="p-2 border border-gray-400 rounded text-center mb-4">
                <p className="font-bold text-bluedark text-bodymedium">Keywords</p>
            </div>
        <div className="flex flex-wrap gap-4 text-blue-900 text-bodysmall font-semibold">
          {['Electronics', 'Computer', 'Keyboard', 'Phone', 'Laptops', 'Apple'].map((keyword) => (
            <div
              key={keyword}
              className="bg-blue9 text-wrap p-2 rounded-full cursor-pointer flex-auto text-center"
              onClick={() => handleClick(keyword)}
            >
              {keyword}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column2;
