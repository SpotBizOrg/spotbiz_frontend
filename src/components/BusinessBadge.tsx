import BadgeImg from '../assets/badge.png';

interface BusinessBadgeProps {
    year: string;
    month: string;
}


const BusinessBadge: React.FC<BusinessBadgeProps> = ({ year, month }) => {
    return (
        <div className="bg-white border border-gray-300 p-2 rounded-md shadow-md space-y-2 mb-5">
            <div className="flex  items-center justify-center flex-row gap-4">
                <img src={BadgeImg} alt="badge" className="h-12 w-12 justify-center" />

                <div className="flex flex-col">
                    <p className="text-gray-800 text-bodysmall">Top Business</p>
                    <p className="text-gray-500 text-bodysmall">{year} {month}</p>
                    </div>
            </div>
        </div>
    );
};

export default BusinessBadge;