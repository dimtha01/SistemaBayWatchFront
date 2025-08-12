import { CheckCircle } from "lucide-react";

interface ServiceItemProps {
  title: string;
  description: string;
}

export const ServiceItem = ({ title, description }: ServiceItemProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-gray-200 rounded-full p-3 mb-4">
        <CheckCircle className="w-6 h-6 text-gray-700" />
      </div>
      <h3 className="font-semibold text-gray-800 text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
