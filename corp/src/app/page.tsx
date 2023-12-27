import Image from "next/image";
import homeImg from "/public/home.jpg";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="">
      <Hero imgData={homeImg} imgAlt="car factory" title="Professional Cloud Hosting" />
    </main>
  );
}
