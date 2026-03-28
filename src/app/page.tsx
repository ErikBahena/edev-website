import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Marquee from "@/components/Marquee";
import Problem from "@/components/Problem";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <SmoothScroll />
      <Navigation />

      <main>
        <Hero />
        <Manifesto />
        <Marquee />
        <Problem />
        <Process />
        <CaseStudies />
        <Testimonials />
        <Stats />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
