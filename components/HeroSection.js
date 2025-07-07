import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-0 md:px-0 bg-white -mt-14">
      {/* Image Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0">
        <Image
          src="/img/Home_QK.jpeg" // Modern format
          alt="Quick Kitchen"
          width={600}
          height={350}
          className="rounded-lg object-cover mx-auto md:mx-0"
          priority // Ensures fast loading for LCP improvement
          fetchPriority="high"
          quality={75} // Compressed quality for smaller file size
          placeholder="blur" // Blur effect for better UX during load
          blurDataURL="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBgAAAAwAQCdASoEAAQAAkA4JYwCdAD0oAAA/vv7uAAAA" // Base64 placeholder (low-quality blur)
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw" // Responsive sizing

        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2 text-left px-0 md:px-1 md:pl-6"> {/* Added md:pl-6 for desktop padding  */}
      <h3 className="font-nunito break-words mb-[15px]">
        <span className="text-[#1f1f1f] text-[30px] md:text-4xl font-bold">
          Let’s make cooking faster, easier, and
        </span>
        <span className="ml-2 text-[#2D810D] text-[30px] md:text-4xl font-bold">
          absolutely delicious.
        </span>
      </h3>

      <div
        className="break-words text-left text-[#4a4a4a] font-normal text-[16px] leading-[24px] md:text-xl md:leading-normal"
      >
        Are you always on the go but still crave home-cooked meals?
        You’re in the right place. Here we believe that cooking shouldn’t be complicated or time-consuming.
      </div>

      </div>
    </section>
  );
};

export default HeroSection;
