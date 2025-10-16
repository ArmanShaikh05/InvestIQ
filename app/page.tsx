import Faq3 from "@/components/mvpblocks/faq-3";
import Features from "@/components/mvpblocks/feature-1";
import Footer4Col from "@/components/mvpblocks/footer-4col";
import GradientHero from "@/components/mvpblocks/gradient-hero";
import Header1 from "@/components/mvpblocks/header-1";
import SimplePricing from "@/components/mvpblocks/simple-pricing";
import Sparkle from "@/components/mvpblocks/sparkles-logo";
import TestimonialsCarousel from "@/components/mvpblocks/testimonials-carousel";

const page = () => {
  return (
    <div>
      <Header1/>
      <GradientHero />
      <Sparkle />
      <Features />
      <SimplePricing />
      <Faq3 />
      <TestimonialsCarousel />
      <Footer4Col />
    </div>
  );
};

export default page;
