interface ServiceHeroImageProps {
  src: string;
  alt: string;
}

export default function ServiceHeroImage({ src, alt }: ServiceHeroImageProps) {
  return (
    <section className="pb-14 bg-background">
      <div className="container px-4 mx-auto">
        <div className="overflow-hidden rounded-2xl shadow-lg border border-gray-200">
          <img
            src={src}
            alt={alt}
            className="w-full h-[320px] md:h-[420px] object-cover"
          />
        </div>
      </div>
    </section>
  );
}
