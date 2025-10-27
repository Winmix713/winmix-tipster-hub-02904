import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import MatchSelection from "@/components/MatchSelection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="relative">
        <HeroSection />
        <MatchSelection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
