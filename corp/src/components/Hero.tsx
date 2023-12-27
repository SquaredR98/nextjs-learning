import Image, { StaticImageData } from "next/image";
import React from "react";

interface HeroProps {
  imgData: StaticImageData;
  imgAlt: string;
  title: string;
}

export default function Hero(props: HeroProps) {
  const { imgData, imgAlt, title } = props;
  return (
    <div className="relative h-screen">
      <div className="-z-10 inset-0 absolute">
        <Image
          fill
          className="object-cover"
          src={imgData}
          alt={imgAlt}
        />
      </div>
      <div className="pt-48 flex justify-center items-center">
        <h1 className="text-white text-6xl p-8 bg-black/60">{title}</h1>
      </div>
    </div>
  );
}
