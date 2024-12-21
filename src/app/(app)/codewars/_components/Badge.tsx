import Image from "next/image";
export const Badge = ({
  name,
  rank,
  bgColor,
  imageUrl,
}: {
  name: string;
  rank: string;
  bgColor: string;
  imageUrl: string;
}) => {
  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      {/* Outer Circle */}
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-red-500">
        {/* Image in Circle */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            layout="fill"
            className="h-full w-full rounded-full object-cover"
          />
        )}

        {/* Ribbon at the Top */}
        <div
          className={`absolute -top-4 flex items-center space-x-2 rounded-full px-4 py-1 shadow-md ${bgColor}`}
        >
          <span className="font-bold text-white">{rank}</span>
        </div>
      </div>

      {/* Curved Text Background */}
      <div className="absolute bottom-0">
        <div
          className={`clip-bend relative flex h-8 w-36 items-center justify-center shadow-md ${bgColor}`}
        >
          <span className="font-semibold text-black">{name}</span>
        </div>
      </div>

      {/* Styling for the curved background */}
      <style jsx>{`
        .clip-bend {
          clip-path: polygon(
            0% 40%,
            10% 0%,
            90% 0%,
            100% 40%,
            100% 100%,
            0% 100%
          );
        }
      `}</style>
    </div>
  );
};
