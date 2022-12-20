import Footer from 'components/footer/Footer';
import FAQ from 'components/home/FAQ';
import Hero from 'components/home/Hero';
import Navbar from 'components/navbar/Navbar';
import AboutUs from 'components/home/AboutUs';
import OverTheCoffee from 'components/home/OverTheCoffee';
import Infinity from 'components/home/Infinity';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      <OverTheCoffee />
      <Infinity />
      <FAQ />
      <Footer />
    </>
  );
}
