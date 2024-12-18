"use client";
import Title from "@/components/ui/title";
import ContributorCard from "./_components/ContributorCard";
import InfoSection from "@/components/common/InfoSection";
import { useFetchContributors } from "@/lib/SWRhooks/useSWR"; 
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function ContributorsPage() {
  const { contributors, isLoading, error } = useFetchContributors();
//   const contributors = [

//   {
//     name: "Mia Walker",
//     profileImage: "/images/mia.jpg",
//     linkedinURL: "https://linkedin.com/in/mia",
//     batch: "2025",
//   },
//   {
//     name: "Quinn Walker",
//     profileImage: "/images/quinn.jpg",
//     linkedinURL: "https://linkedin.com/in/quinn",
//     batch: "2024",
//   },
//   {
//     name: "Riley Scott",
//     profileImage: "/images/riley.jpg",
//     linkedinURL: "https://linkedin.com/in/riley",
//     batch: "2023",
//   },
//   {
//     name: "Sophia Clark",
//     profileImage: "/images/sophia.jpg",
//     linkedinURL: "https://linkedin.com/in/sophia",
//     batch: "2025",
//   },
// ];

  // Handle loading state
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl h-[80dvh] flex justify-center items-center">
        <LoadingSpinner/>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 text-center">
        <p>Error loading contributors: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4">
      <InfoSection
        imageSrc="/about-us.png"
        heading="Our Team"
        text="We’re designers, developers, strategists, basically coding maniacs. We’re funny, innovative, presumably procrastinators and mostly awkward dancers. Yes, we’re Zigbee OUTR, a dynamic developers and coding community, aimed at raising the bar of the coding culture in and around us. We’re here by the students and we’re here for the students, with our base located in the premises of the Odisha University of Technology and Research, Bhubaneswar."
        background="bg-emerald-100"
        darkBackground="dark:bg-emerald-900"
        placedImage={true}
      />
      <Title size="medium" className="mb-10 text-center text-3xl font-bold">Our Contributors</Title>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {contributors.map((contributor, index : number) => (
          <ContributorCard
            key={index}
            name={contributor.name}
            profileImage={contributor.profileImage || "/default-avatar.jpg"} // Fallback for missing images
            linkedinURL={contributor.linkedinUrl || "#"} // Fallback for missing LinkedIn URLs
            batch={contributor.batch || "N/A"} // Fallback for missing batch
          />
        ))}
      </div>
    </div>
  );
}
