import Features from "@/components/home/Features";
import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Newsletter from "@/components/home/Newsletter";
import UpcomingSection from "@/components/home/UpcomingSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <UpcomingSection />
      <Gallery />
      <Newsletter />
    </>
  );
}
