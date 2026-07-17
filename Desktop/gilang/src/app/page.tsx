import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBand from "@/components/TrustBand";
import AboutNarrative from "@/components/AboutNarrative";
import SalesProfile from "@/components/SalesProfile";
import VehicleShowcase from "@/components/VehicleShowcase";
import VehicleLineup from "@/components/VehicleLineup";
import CompareTool from "@/components/CompareTool";
import BannerCarousel from "@/components/BannerCarousel";
import VideoShowcase from "@/components/VideoShowcase";
import LifestyleGallery from "@/components/LifestyleGallery";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import CreditSimulator from "@/components/CreditSimulator";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MobileActionBar from "@/components/MobileActionBar";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <TrustBand />
        <AboutNarrative />
        <SalesProfile />
        <VehicleShowcase />
        <VehicleLineup />
        <CompareTool />
        <BannerCarousel />
        <VideoShowcase />
        <LifestyleGallery />
        <Gallery />
        <Testimonials />
        <BookingForm />
        <CreditSimulator />
        <Faq />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileActionBar />
    </>
  );
}
