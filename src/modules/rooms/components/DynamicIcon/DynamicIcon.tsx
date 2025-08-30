import type React from "react";
import type { LucideProps } from "lucide-react";
import { iconMap, type IconName } from "../../utils";

interface DynamicIconProps extends LucideProps {
  name: IconName;
  fallback?: React.ReactNode;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  fallback,
  ...props
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return <>{fallback || <div className="w-6 h-6 bg-gray-300 rounded" />}</>;
  }

  return <IconComponent {...props} />;
};
