import GrainOverlay from "@/components/GrainOverlay";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import MobileCallButton from "@/components/MobileCallButton";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
      <SmoothScroll />
      <MobileCallButton />
      <Navigation />

      <main className="pb-[72px] md:pb-0">
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <CaseStudies />
        <About />
        <Testimonials />
        <CTA />
      </main>

      <Footer />
    </>
  );
}
