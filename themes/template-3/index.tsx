import type { CSSProperties } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import Header from "@/themes/template-3/Header";
import Footer from "@/themes/template-3/Footer";
import Hero from "@/themes/template-3/sections/Hero";
import Cities from "@/themes/template-3/sections/Cities";
import Services from "@/themes/template-3/sections/Services";
import Properties from "@/themes/template-3/sections/Properties";
import CTA from "@/themes/template-3/sections/CTA";
import WhyChooseUs from "@/themes/template-3/sections/WhyChooseUs";
import Team from "@/themes/template-3/sections/Team";
import Testimonials from "@/themes/template-3/sections/Testimonials";
import FAQ from "@/themes/template-3/sections/FAQ";
import Newsletter from "@/themes/template-3/sections/Newsletter";
import Awards from "@/themes/template-3/sections/Awards";

/** Template-3 home — Volkhov · red/navy real-estate landing (JSON-driven). */
export default function Template3({ data }: { data: ResolvedSiteData }) {
  return (
    <div
      className="theme-t3 min-h-screen overflow-x-clip bg-white text-[#0b1f33]"
      style={data.variables as CSSProperties}
    >
      <Header data={data} />
      <main>
        <Hero data={data} />
        <Cities data={data} />
        <WhyChooseUs data={data} />
        <Properties data={data} />
        <CTA data={data} />
        <Services data={data} />
        <Team data={data} />
        <Testimonials data={data} />
        <FAQ data={data} />
        <Newsletter data={data} />
        <Awards data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
