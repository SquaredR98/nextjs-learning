import Hero from "@/components/Hero";

import performanceImg from '/public/performance.jpg'

export default function PerformacePage() {
  return <div>
    <Hero imgData={performanceImg} imgAlt="welding" title="We server high performance application" />
  </div>
}