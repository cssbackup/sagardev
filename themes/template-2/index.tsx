import type { CSSProperties } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import Header from "@/themes/template-2/Header";
import Footer from "@/themes/template-2/Footer";
import Hero from "@/themes/template-2/sections/Hero";
import FeaturedProperties from "@/themes/template-2/sections/FeaturedProperties";
import About from "@/themes/template-2/sections/About";
import WhyChooseUs from "@/themes/template-2/sections/WhyChooseUs";
import Services from "@/themes/template-2/sections/Services";
import HowItWorks from "@/themes/template-2/sections/HowItWorks";
import CitiesWeServe from "@/themes/template-2/sections/CitiesWeServe";
import Investment from "@/themes/template-2/sections/Investment";
import Awards from "@/themes/template-2/sections/Awards";
import Testimonials from "@/themes/template-2/sections/Testimonials";
import Partners from "@/themes/template-2/sections/Partners";
import Blog from "@/themes/template-2/sections/Blog";
import FAQ from "@/themes/template-2/sections/FAQ";
import ContactSection from "@/themes/template-2/sections/Contact";

export default function Template2({ data }: { data: ResolvedSiteData }) {
  return (
    <div
      className="theme-t2 min-h-screen overflow-x-clip bg-white text-[#141414]"
      style={data.variables as CSSProperties}
    >
      <Header data={data} />
      <main>
        <Hero data={data} />
        <FeaturedProperties data={data} />
        <About data={data} />
        <WhyChooseUs data={data} />
        <Services data={data} />
        <HowItWorks data={data} />
        <CitiesWeServe data={data} />
        <Investment data={data} />
        <Awards data={data} />
        <Testimonials data={data} />
        <Partners data={data} />
        <Blog data={data} />
        <FAQ data={data} />
        <ContactSection data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
