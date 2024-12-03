import ContributorCard from "./_components/ContributorCard";
import InfoSection from "@/components/common/InfoSection";

export default function ContributorsPage() {
  const contributors = [
    {
      name: "Alice Johnson",
      expertise: "Frontend Development",
      image: "/images/alice.jpg",
      linkedin: "https://linkedin.com/in/alice",
    },
    {
      name: "Bob Smith",
      expertise: "Backend Engineering",
      image: "/images/bob.jpg",
      linkedin: "https://linkedin.com/in/bob",
    },
    {
      name: "Charlie Brown",
      expertise: "UI/UX Design",
      image: "/images/charlie.jpg",
      linkedin: "https://linkedin.com/in/charlie",
    },
    {
      name: "Charlie Brown",
      expertise: "UI/UX Design",
      image: "/images/charlie.jpg",
      linkedin: "https://linkedin.com/in/charlie",
    },
    {
      name: "Charlie Brown",
      expertise: "UI/UX Design",
      image: "/images/charlie.jpg",
      linkedin: "https://linkedin.com/in/charlie",
    },
  ];

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
      <h1 className="mb-10 text-center text-3xl font-bold">Our Contributors</h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {contributors.map((contributor, index) => (
          <ContributorCard key={index} {...contributor} />
        ))}
      </div>
    </div>
  );
}
