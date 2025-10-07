import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import gallery1 from "/src/assets/gallery-1.jpg";
import gallery2 from "/src/assets/gallery-2.jpg";
import gallery3 from "/src/assets/gallery-3.jpg";
import gallery4 from "/src/assets/gallery-4.jpg";

const gallerySlides = [
  {
    src: gallery1,
    alt: "Team collaboration",
    title: "Collaborate & Innovate",
    description: "Join dynamic teams where your ideas matter. We connect talented professionals with companies that value creativity and teamwork.",
  },
  {
    src: gallery2,
    alt: "Professional workspace",
    title: "Modern Workspaces",
    description: "Work in state-of-the-art environments designed for productivity. Find companies offering the best facilities and work culture.",
  },
  {
    src: gallery3,
    alt: "Startup meeting",
    title: "Growing Together",
    description: "Be part of something bigger. Discover startups and established companies where you can make a real impact and grow your career.",
  },
  {
    src: gallery4,
    alt: "Job interview",
    title: "Your Next Opportunity",
    description: "Start your journey to success. Connect with recruiters who are actively looking for talent like you.",
  },
];

const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-20 md:py-32 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text text-transparent animate-fade-in">
          Find Your Dream Job
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with top companies and discover opportunities that match your skills
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/jobs" className="btn-primary">
            Browse Jobs
          </Link>
          <Link to="/post-job" className="btn-secondary">
            Post a Job
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Connecting Talent with Opportunity
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            Our platform bridges the gap between talented professionals and innovative companies. 
            Whether you're seeking your next career move or looking to build your dream team, 
            we provide the tools and connections to make it happen seamlessly.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Active Jobs</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Job Seekers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5K+</div>
              <p className="text-muted-foreground">Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 grid md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-xl text-center transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Easy Job Search</h3>
          <p className="text-muted-foreground">Find relevant jobs with our powerful search and filtering</p>
        </div>

        <div className="glass-card p-8 rounded-xl text-center transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Quick Posting</h3>
          <p className="text-muted-foreground">Post job openings and reach qualified candidates</p>
        </div>

        <div className="glass-card p-8 rounded-xl text-center transition-transform hover:scale-105">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Connect</h3>
          <p className="text-muted-foreground">Build connections between employers and job seekers</p>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">
          Where Careers Take Flight
        </h2>

        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex">
              {gallerySlides.map((slide, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <div className="glass-card p-0 rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <div className="relative h-64 md:h-96">
                        <img
                          src={slide.src}
                          alt={slide.alt}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
                      </div>
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                          {slide.title}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-full transition-all hover:scale-110 z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/90 hover:bg-primary text-primary-foreground p-3 rounded-full transition-all hover:scale-110 z-10"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
