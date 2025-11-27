import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import WhyDonate from "@/components/WhyDonate";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <Hero />
      {/* Why Donate us */}
      <WhyDonate />
      {/* How it works */}
      <HowItWorks />
      {/* Testimonials */}
      <Testimonials />
    </main>
  );
}