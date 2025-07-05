import { useEffect, useState } from "react";
import { ArrowRight, Star, Shield, Clock, TrendingUp } from "lucide-react";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";
import DirectServices from "../components/DirectServices";
import Spinner from "../components/Spinner";
import Anvaya from "../assets/Anvaya.png";

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate data loading (you can replace this with an API call later)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const featuredJobs = [
    {
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $150k",
      postedTime: "2 days ago",
      tags: ["React", "TypeScript", "Remote"],
    },
    {
      title: "Product Manager",
      company: "InnovateLabs",
      location: "New York, NY",
      type: "Full-time",
      salary: "$130k - $160k",
      postedTime: "1 week ago",
      tags: ["Strategy", "Analytics", "Leadership"],
    },
    {
      title: "UX Designer",
      company: "DesignStudio",
      location: "Austin, TX",
      type: "Contract",
      salary: "$80k - $100k",
      postedTime: "3 days ago",
      tags: ["Figma", "User Research", "Prototyping"],
    },
  ];

  const topCompanies = [
    {
      name: "TechCorp",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: "1,000 - 5,000",
      openJobs: 15,
      description:
        "Leading technology company focused on innovative solutions for the modern world.",
    },
    {
      name: "InnovateLabs",
      industry: "Software Development",
      location: "New York, NY",
      employees: "500 - 1,000",
      openJobs: 8,
      description:
        "Cutting-edge software development company building the future of digital experiences.",
    },
    {
      name: "GreenTech Solutions",
      industry: "Clean Energy",
      location: "Seattle, WA",
      employees: "200 - 500",
      openJobs: 12,
      description: "Sustainable technology solutions for a greener tomorrow.",
    },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50">
        <Spinner className="w-8 h-8 text-black" />
      </div>
    );
  }

  return (
    <>
      <section className="py-16 bg-white">
        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src={Anvaya}
            alt="Anvaya Logo"
            className="h-100 w-auto object-contain"
          />
          <h1 className="text-5xl font-bold text-black">Welcome to Anvaya</h1>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DirectServices />
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Featured Jobs
            </h2>
            <p className="text-xl text-gray-600">
              Discover opportunities from top companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {featuredJobs.map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
          </div>

          <div className="text-center">
            <button className="text-lg px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
              View Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Top Companies Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Top Companies
            </h2>
            <p className="text-xl text-gray-600">
              Join industry leaders and innovative startups
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {topCompanies.map((company, index) => (
              <CompanyCard key={index} {...company} />
            ))}
          </div>

          <div className="text-center">
            <button className="text-lg px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800">
              Browse Companies
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-gray-600">
              The most trusted platform for job seekers and employers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Quality Jobs
              </h3>
              <p className="text-gray-600">
                Hand-picked opportunities from verified companies
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Fast Matching
              </h3>
              <p className="text-gray-600">
                AI-powered matching connects you with relevant opportunities
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Career Growth
              </h3>
              <p className="text-gray-600">
                Tools and resources to advance your career
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
