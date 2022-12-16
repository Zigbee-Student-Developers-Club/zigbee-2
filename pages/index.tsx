import Footer from "components/footer/Footer";
import FAQ from "components/home/FAQ";
import Hero from "components/home/Hero";
import Section1 from "components/home/Section1";
import Section2 from "components/home/Section2";
import Section3 from "components/home/Section3";
import Navbar from "components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <main>
        <Navbar />
        <Hero />
        <Section1 />
        <Section2 />
        <Section3 />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
