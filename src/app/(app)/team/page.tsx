"use client";
import Title from "@/components/ui/title";
import ContributorCard from "./_components/ContributorCard";
import InfoSection from "@/components/common/InfoSection";
import { useFetchContributors } from "@/lib/SWRhooks/useSWR";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import MotionDivProvider from "@/components/provider/MotionDivProvider";
import { Text } from "@/components/ui/text";

export default function ContributorsPage() {
  const { contributors, isLoading, error } = useFetchContributors();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="mx-auto flex h-[80dvh] max-w-7xl items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="container mx-auto py-16">
        <Text variant="small">
          Failed to load contributors. Please try again later.
        </Text>
      </div>
    );
  }

  return (
    <>
    <MotionDivProvider>
      <div className="mx-auto max-w-7xl px-4">
        {/* InfoSection */}
        <InfoSection
          imageSrc="/about-us.webp"
          heading="Our Team"
          text="We’re designers, developers, strategists, basically coding maniacs. We’re funny, innovative, presumably procrastinators and mostly awkward dancers. Yes, we’re Zigbee OUTR, a dynamic developers and coding community, aimed at raising the bar of the coding culture in and around us. We’re here by the students and we’re here for the students, with our base located in the premises of the Odisha University of Technology and Research, Bhubaneswar."
          background="bg-emerald-100"
          darkBackground="dark:bg-emerald-900"
          placedImage={true}
        /></div>
          </MotionDivProvider>

        {/* Title */}
        <Title size="medium" className="mb-10 text-center text-3xl font-bold">
          Our Contributors
        </Title>

        {/* Grid Section */}
        <div className="mx-auto grid max-w-7xl  mb-12 grid-cols-1 gap-8 px-10 sm:grid-cols-2 lg:grid-cols-4">
          {contributors?.map((contributor, index: number) => (
            <ContributorCard
              key={index}
              name={contributor?.name || "Anonymous"} // Fallback for missing names
              profileImage={contributor?.profileImg || "/default-avatar.jpg"} // Fallback for missing profile images
              linkedinURL={contributor?.linkedInUrl || "#"} // Fallback for missing LinkedIn URLs
              batch={contributor?.batch?.toString() || "N/A"} // Fallback for missing batch
            />
          ))}
        </div>
  </>
  );
}
