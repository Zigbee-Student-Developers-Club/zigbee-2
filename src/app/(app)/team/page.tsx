import ContributorCard from "./_components/ContributorCard";
import InfoSection from "@/components/common/InfoSection";

export default function ContributorsPage() {
  const contributors = [
  {
    name: "Alice Johnson",
    profileImage: "https://github.com/shadcn.png",
    linkedinURL: "https://linkedin.com/in/alice",
    batch: "2025",
  },
  {
    name: "Bob Smith",
    profileImage: "/images/bob.jpg",
    linkedinURL: "https://linkedin.com/in/bob",
    batch: "2024",
  },
  {
    name: "Charlie Brown",
    profileImage:"https://github.com/shadcn.png",
    linkedinURL: "https://linkedin.com/in/charlie",
    batch: "2023",
  },
  {
    name: "David Lee",
    profileImage: "https://github.com/shadcn.png",
    linkedinURL: "https://linkedin.com/in/david",
    batch: "2023",
  },
  {
    name: "Eva Martinez",
    profileImage: "/images/eva.jpg",
    linkedinURL: "https://linkedin.com/in/eva",
    batch: "2024",
  },
  {
    name: "Frank Wilson",
    profileImage: "/images/frank.jpg",
    linkedinURL: "https://linkedin.com/in/frank",
    batch: "2025",
  },
  {
    name: "Grace Kim",
    profileImage: "/images/grace.jpg",
    linkedinURL: "https://linkedin.com/in/grace",
    batch: "2023",
  },
  {
    name: "Hannah Zhang",
    profileImage: "/images/hannah.jpg",
    linkedinURL: "https://linkedin.com/in/hannah",
    batch: "2024",
  },
  {
    name: "Isaac Lee",
    profileImage: "/images/isaac.jpg",
    linkedinURL: "https://linkedin.com/in/isaac",
    batch: "2023",
  },
  {
    name: "Jackie Davis",
    profileImage: "/images/jackie.jpg",
    linkedinURL: "https://linkedin.com/in/jackie",
    batch: "2025",
  },
  {
    name: "Kevin Turner",
    profileImage: "/images/kevin.jpg",
    linkedinURL: "https://linkedin.com/in/kevin",
    batch: "2024",
  },
  {
    name: "Liam Harris",
    profileImage: "/images/liam.jpg",
    linkedinURL: "https://linkedin.com/in/liam",
    batch: "2023",
  },
  {
    name: "Mia Walker",
    profileImage: "/images/mia.jpg",
    linkedinURL: "https://linkedin.com/in/mia",
    batch: "2025",
  },
  {
    name: "Nina Robinson",
    profileImage: "/images/nina.jpg",
    linkedinURL: "https://linkedin.com/in/nina",
    batch: "2024",
  },
  {
    name: "Oscar Green",
    profileImage: "/images/oscar.jpg",
    linkedinURL: "https://linkedin.com/in/oscar",
    batch: "2023",
  },
  {
    name: "Paul Anderson",
    profileImage: "https://github.com/shadcn.png",
    linkedinURL: "https://linkedin.com/in/paul",
    batch: "2025",
  },
  {
    name: "Quinn Walker",
    profileImage: "/images/quinn.jpg",
    linkedinURL: "https://linkedin.com/in/quinn",
    batch: "2024",
  },
  {
    name: "Riley Scott",
    profileImage: "/images/riley.jpg",
    linkedinURL: "https://linkedin.com/in/riley",
    batch: "2023",
  },
  {
    name: "Sophia Clark",
    profileImage: "/images/sophia.jpg",
    linkedinURL: "https://linkedin.com/in/sophia",
    batch: "2025",
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
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {contributors.map((contributor, index) => (
          <ContributorCard key={index} {...contributor} />
        ))}
      </div>
    </div>
  );
}
