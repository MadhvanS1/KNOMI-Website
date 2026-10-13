import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Ribbon from "@/components/home/Ribbon";
import Problem from "@/components/home/Problem";
import SenseCore from "@/components/home/SenseCore";
import Manifesto from "@/components/home/Manifesto";
import MenuChapter from "@/components/home/MenuChapter";
import HostChapter from "@/components/home/HostChapter";
import UpsellJourney from "@/components/home/UpsellJourney";
import OwnersChapter from "@/components/home/OwnersChapter";
import Audience from "@/components/home/Audience";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import Booking from "@/components/home/Booking";

/* The homepage tells one story: the owner's problem, Knomi Sense as the system that
   solves it, then three chapters that follow the tagline (Know me · Remember me ·
   Grow with me), ending in what it costs and how to begin.
   FAQ structured data is emitted by <FAQ /> from the same copy it renders. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ribbon />
        <Problem />
        <SenseCore />
        <Manifesto />
        <MenuChapter />
        <HostChapter />
        <UpsellJourney />
        <OwnersChapter />
        <Audience />
        <Pricing />
        <Process />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
