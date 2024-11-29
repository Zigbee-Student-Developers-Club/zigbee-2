// import Header from '@/app/_components/Header';
"use client";
import InfoSection from "@/components/common/InfoSection";
import Hero from "./_components/Hero";
import OverTheCoffee from "./_components/OverTheCoffee";
import FAQ from "./_components/FAQ";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <InfoSection
        imageSrc="/about-us.png"
        heading="About Us"
        text="We’re designers, developers, strategists, basically coding maniacs. We’re funny, innovative, presumably procrastinators and mostly awkward dancers. Yes, we’re Zigbee OUTR, a dynamic developers and coding community, aimed at raising the bar of the coding culture in and around us. We’re here by the students and we’re here for the students, with our base located in the premises of the Odisha University of Technology and Research, Bhubaneswar."
        background="bg-emerald-100"
        darkBackground="dark:bg-emerald-900"
        placedImage={true}        
      />
      {/* To Infinity and Beyond! */}
      <OverTheCoffee />
      <InfoSection
        imageSrc="/infinity.png"
        heading="To Infinity and Beyond!"
        text="There was just one goal, one motto and one vision in the minds of the founding team, and that was to converge and propel all those brilliantly sharp, witty and creative minds, who, at some point of time went adrift in this vast technological desert, into one big family. Today Zigbee is heading goalwards with full throttle towards the zenith. Yes, we will only continue to grow in this endeavor to assist and promote students to explore and witness new horizons and make them realize their full potential in the field of development and open-source contribution."
        background="bg-blue-100"
        darkBackground="dark:bg-blue-900"
        placedImage={true}
      />
      <FAQ />
    </div>
  );
}
