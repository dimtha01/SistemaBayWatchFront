import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { RestaurantDetailsView } from "./ModalViews/RestaurantDetailsView";
import { ReservationFormView } from "./ModalViews/ReservationFormView";
import { SuccessView } from "./ModalViews/SuccessView";

interface ScheduleModalProps {
  selectedOutlet: any;
  selectedSchedule: any;
  reservationStep: string;
  formData: any;
  formErrors: any;
  onClose: () => void;
  onReservation: (outlet: any, schedule: any) => void;
  onStepChange: (step: string) => void;
  onFormChange: (field: string, value: any) => void;
  onConfirm: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  selectedOutlet,
  selectedSchedule,
  reservationStep,
  formData,
  formErrors,
  onClose,
  onReservation,
  onStepChange,
  onFormChange,
  onConfirm
}) => {
  return (
    <AnimatePresence>
      {selectedOutlet && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 bg-white shadow-md"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {/* Modal Content */}
            {reservationStep === 'view' && (
              <RestaurantDetailsView
                selectedOutlet={selectedOutlet}
                onReservation={onReservation}
              />
            )}

            {reservationStep === 'reserve' && (
              <ReservationFormView
                selectedOutlet={selectedOutlet}
                selectedSchedule={selectedSchedule}
                formData={formData}
                formErrors={formErrors}
                onFormChange={onFormChange}
                onBack={() => onStepChange('view')}
                onConfirm={onConfirm}
              />
            )}

            {reservationStep === 'success' && (
              <SuccessView
                selectedOutlet={selectedOutlet}
                selectedSchedule={selectedSchedule}
                formData={formData}
                onClose={onClose}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
