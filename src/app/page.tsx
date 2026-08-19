import GrainOverlay from "@/components/GrainOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import MobileCallButton from "@/components/MobileCallButton";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GrainOverlay />
      <SmoothScroll />
      <MobileCallButton />
      <Navigation />

      <main className="pb-[72px] md:pb-0">
        <Hero />
        <TrustBar />
        {/* Order is deliberate: proof before pitch. A local buyer decides on
            "who is this person" and "have they done it before" — so About and
            the case studies come first; the services menu and process follow. */}
        <About />
        <CaseStudies />
        <Testimonials />
        <Services />
        <Process />

        <CTA />
      </main>

      <Footer />
    </>
  );
}
