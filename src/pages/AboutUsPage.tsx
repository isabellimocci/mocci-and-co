import { ABOUT_CONTENT } from '../data/aboutUsPage.data';
import Seo from '../components/common/Seo';

const TITLE_CLASS = 'font-cardo text-2xl md:text-3xl lg:text-4xl font-black text-primary m-6 lg:m-10 uppercase text-center';
const INTRO_TEXT_CLASS = 'text-text/80 text-xs md:text-sm lg:text-lg text-center mb-8 md:max-w-lg md:mx-auto lg:max-w-3xl';
const BANNER_CLASS = 'relative w-full h-[180px] sm:h-[240px] md:h-[260px] lg:h-[600px] flex justify-center items-center mb-8';
const SQUARES_WRAPPER_CLASS = 'absolute top-1/2 left-1/2 flex gap-4 md:gap-8 lg:gap-16 -translate-x-1/2 -translate-y-1/2 z-10';
const MAIN_CONTAINER_CLASS = 'relative container mx-auto px-2 sm:px-4 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col mb-0 lg:py-20';
const MAIN_TEXT_CLASS = 'flex flex-col gap-4 text-justify indent-4 sm:indent-6';
const HANDMADE_IMG_CLASS = 'hidden lg:block w-44 absolute lg:-bottom-4 lg:-right-32 pointer-events-none select-none opacity-90 animate-[spin-reverse_12s_linear_infinite]';
const SQUARE_IMAGE_CLASS = 'w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 bg-background flex items-center justify-center transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-lg group';
const SQUARE_IMAGE_IMG_CLASS = 'max-w-[70%] max-h-[70%] object-contain transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:opacity-90';

interface SquareImageProps {
  src: string;
  alt: string;
}

const SquareImage: React.FC<SquareImageProps> = ({ src, alt }) => (
  <div className={SQUARE_IMAGE_CLASS}>
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={SQUARE_IMAGE_IMG_CLASS}
    />
  </div>
);

const AboutUsPage: React.FC = () => (
  <article className='' aria-label='Our Story'>
    <Seo
      title="About Us"
      description="The story behind Mocci & Co. — handcrafted plush toys made with love."
      path="/about"
    />
    <div className='pt-8 container mx-auto px-4 max-w-4xl flex flex-col'>
      <h1 className={TITLE_CLASS}>{ABOUT_CONTENT.title}</h1>
      <p className={INTRO_TEXT_CLASS}>{ABOUT_CONTENT.intro}</p>
    </div>

    <div
      className={BANNER_CLASS}
      style={{
        backgroundImage: `url(${ABOUT_CONTENT.parallaxBanner.src})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={SQUARES_WRAPPER_CLASS}>
        {ABOUT_CONTENT.squares.map((item) => (
          <SquareImage key={item.alt} src={item.src} alt={item.alt} />
        ))}
      </div>
      <span className='sr-only'>{ABOUT_CONTENT.parallaxBanner.alt}</span>
    </div>

    <div className={MAIN_CONTAINER_CLASS}>
      <div className={MAIN_TEXT_CLASS}>
        {ABOUT_CONTENT.mainText.map((text, i) => (
          <p
            key={i}
            className='text-text/80 text-xs sm:text-sm lg:text-lg whitespace-pre-line'
          >
            {text}
          </p>
        ))}
      </div>
      <img
        src={ABOUT_CONTENT.handmade.src}
        alt={ABOUT_CONTENT.handmade.alt}
        loading="lazy"
        className={HANDMADE_IMG_CLASS}
      />
    </div>
  </article>
);

export default AboutUsPage;
