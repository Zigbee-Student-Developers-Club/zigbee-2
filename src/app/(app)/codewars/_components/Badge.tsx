import Image from "next/image";

interface BadgeProps {
  name: string;
  rank: string;
  bgColor: string;
  imageUrl: string;
  teamMembers?: string[];
}

export const Badge = ({
  name,
  rank,
  bgColor,
  imageUrl,
  teamMembers,
}: BadgeProps) => {
  const hasTeamMembers = teamMembers && teamMembers.length > 0;

  if (hasTeamMembers) {
    return (
      <div className="flex max-w-sm flex-col items-center space-y-4">
        <div className="relative overflow-hidden rounded-2xl border-4 border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
          <div
            className={`absolute right-3 top-3 z-10 flex items-center justify-center rounded-full px-4 py-2 shadow-lg ${bgColor} border-2 border-white`}
          >
            <span className="text-md whitespace-nowrap font-bold text-white">
              {rank}
            </span>
          </div>

          <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-700">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={`${rank} team`}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Team Info */}
          <div className="space-y-3 p-4">
            <h3 className="text-center text-lg font-bold text-gray-800 dark:text-white">
              {name}
            </h3>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((member, index) => (
                  <div
                    key={index}
                    className="rounded-lg bg-gray-100 px-3 py-2 text-center dark:bg-gray-700"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {member}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      {/* Outer Circle */}
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border-4 border-red-500">
        {/* Image in Circle */}
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={name}
            fill
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
          className={`clip-bend relative flex h-8 w-full items-center justify-center shadow-md ${bgColor}`}
        >
          <span className="overflow-hidden whitespace-nowrap px-4 font-semibold text-white">
            {name}
          </span>
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
