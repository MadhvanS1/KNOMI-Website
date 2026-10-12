import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/home/Hero";
import Ribbon from "@/components/home/Ribbon";
import Manifesto from "@/components/home/Manifesto";
import MenuChapter from "@/components/home/MenuChapter";
import HostChapter from "@/components/home/HostChapter";
import OwnersChapter from "@/components/home/OwnersChapter";
import Audience from "@/components/home/Audience";
import Pricing from "@/components/home/Pricing";
import Process from "@/components/home/Process";
import FAQ from "@/components/home/FAQ";
import Booking from "@/components/home/Booking";

/* The homepage reads like a tasting menu: an overture, three chapters that
   follow the tagline (Know me · Remember me · Grow with me), then the bill.
   FAQ structured data is emitted by <FAQ /> from the same copy it renders. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ribbon />
        <Manifesto />
        <MenuChapter />
        <HostChapter />
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
