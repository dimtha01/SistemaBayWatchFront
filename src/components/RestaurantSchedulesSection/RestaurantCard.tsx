import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { RestaurantImage } from "./CardComponents/RestaurantImage";
import { RestaurantInfo } from "./CardComponents/RestaurantInfo";
import { ScheduleList } from "./CardComponents/ScheduleList";
import { ActionButton } from "./CardComponents/ActionButton";

interface RestaurantCardProps {
  outlet: any;
  index: number;
  onSelect: (outlet: any) => void;
}

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  outlet,
  index,
  onSelect
}) => {
  const hasAvailableSlots = (outlet: any) => {
    return outlet.schedule.some((item: any) => item.available && outlet.isOpen && !outlet.maintenanceMode);
  };
  const isAvailable = hasAvailableSlots(outlet);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="w-full h-full"
    >
      <Card className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 cursor-pointer h-full flex flex-col">
        <RestaurantImage outlet={outlet} isAvailable={isAvailable} />

        <CardContent className="p-4 sm:p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <RestaurantInfo outlet={outlet} />
            <ScheduleList outlet={outlet} />
          </div>

          <ActionButton
            outlet={outlet}
            isAvailable={isAvailable}
            onSelect={onSelect}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

