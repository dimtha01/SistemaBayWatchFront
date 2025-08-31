interface RoomDescriptionProps {
  description: string;
  details: string;
}

export const RoomDescription = ({
  description,
  details,
}: RoomDescriptionProps) => {
  return (
    <>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Descripción</h2>
      <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
        {description}
      </p>
      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
        {details}
      </p>
    </>
  );
};
