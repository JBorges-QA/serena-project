import ChatWidget from "@/components/chat/ChatWidget";
import Header from "@/components/Header";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import CtaBand from "@/components/sections/CtaBand";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Highlights from "@/components/sections/Highlights";
import HowItWorks from "@/components/sections/HowItWorks";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import { isChat } from "@/config/site";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Highlights />
        <Services />
        <About />
        <HowItWorks />
        <Testimonials />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      {isChat ? <ChatWidget /> : <WhatsAppButton />}
    </>
  );
}
