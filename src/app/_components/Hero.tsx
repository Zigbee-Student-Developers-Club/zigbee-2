import Image from 'next/image';

const Hero = () => {
  return (
    <div className='container mx-auto my-16 max-w-[1200px]'>
      <div className='flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-10'>
        <div className='flex-1 space-y-5 md:space-y-10'>
          <h2 className='text-3xl sm:text-4xl lg:text-6xl font-black'>
            Learn . Apply . Grow
          </h2>
          <p className='text-lg text-gray-700'>
            Yes, if you love to code, you’re family already! Come join the cult
            and open yourself to a whole new world of technological bliss.
          </p>
        </div>
        <div className='flex flex-1 justify-center items-center'>
          <Image
            alt='zigbee hero'
            src='/person-with-vr.png'
            width={500}
            height={200}
            className='object-cover'
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
