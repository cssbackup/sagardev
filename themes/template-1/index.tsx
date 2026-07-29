import type { CSSProperties } from "react";
import type { ResolvedSiteData } from "@/lib/types";
import Header from "@/themes/template-1/Header";
import Footer from "@/themes/template-1/Footer";
import Hero from "@/themes/template-1/sections/Hero";
import IntroCategories from "@/themes/template-1/sections/IntroCategories";
import FeaturedProperties from "@/themes/template-1/sections/FeaturedProperties";
import LatestProjects from "@/themes/template-1/sections/LatestProjects";
import CitiesWeServe from "@/themes/template-1/sections/CitiesWeServe";
import WhyChooseUs from "@/themes/template-1/sections/WhyChooseUs";
import Investment from "@/themes/template-1/sections/Investment";
import FeaturedDevelopers from "@/themes/template-1/sections/FeaturedDevelopers";
import PropertyProcess from "@/themes/template-1/sections/PropertyProcess";
import Testimonials from "@/themes/template-1/sections/Testimonials";
import Awards from "@/themes/template-1/sections/Awards";
import CompanyStatistics from "@/themes/template-1/sections/CompanyStatistics";
import Blog from "@/themes/template-1/sections/Blog";
import FAQ from "@/themes/template-1/sections/FAQ";
import CTA from "@/themes/template-1/sections/CTA";

export default function Template1({ data }: { data: ResolvedSiteData }) {
  return (
    <div
      className="theme-t1 min-h-screen overflow-x-hidden bg-white text-[#141414]"
      style={data.variables as CSSProperties}
    >
      <Header data={data} variant="solid" />
      <main>
        <Hero data={data} />
        <IntroCategories data={data} />
        <FeaturedProperties data={data} />
        <LatestProjects data={data} />
        <CitiesWeServe data={data} />
        <WhyChooseUs data={data} />
        <Investment data={data} />
        <FeaturedDevelopers data={data} />
        <PropertyProcess data={data} />
        <Testimonials data={data} />
        <Awards data={data} />
        <CompanyStatistics data={data} />
        <Blog data={data} />
        <FAQ data={data} />
        <CTA data={data} />
      </main>
      <Footer data={data} />
    </div>
  );
}
