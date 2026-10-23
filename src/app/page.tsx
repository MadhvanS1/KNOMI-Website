import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import SenseCore from "@/components/home/SenseCore";
import Manifesto from "@/components/home/Manifesto";
import MenuChapter from "@/components/home/MenuChapter";
import HostChapter from "@/components/home/HostChapter";
import UpsellJourney from "@/components/home/UpsellJourney";
import OwnersChapter from "@/components/home/OwnersChapter";
import Audience from "@/components/home/Audience";
import Worth from "@/components/home/Worth";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import Booking from "@/components/home/Booking";

/* The homepage tells one story: the owner's problem, Knomi Sense as the system that
   solves it, then three chapters that follow the tagline (Know me · Remember me ·
   Grow with me), ending in what it could be worth to the owner and how to begin.
   KNOMI's pricing is shared on the walkthrough call, never on the site.
   FAQ structured data is emitted by <FAQ /> from the same copy it renders. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <SenseCore />
        <Manifesto />
        <MenuChapter />
        <HostChapter />
        <UpsellJourney />
        <OwnersChapter />
        <Audience />
        <Worth />
        <Process />
        <FAQ />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
