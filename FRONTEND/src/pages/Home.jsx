// Updated Home.jsx with Sacred-Themed Hero and Dual Path UI
import { useEffect, useState } from "react";
import {
  Award,
  Star,
  Shield,
  Clock,
  TrendingUp,
  Search,
  MapPin,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  Target,
  Zap,
} from "lucide-react";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";
import Spinner from "../components/Spinner";
import Anvaya2 from "../assets/Anvaya2.png";
import { useNavigate } from "react-router-dom";

const input =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-base";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const features = [
    {
      emoji: "✨",
      title: "Premium Quality",
      description:
        "Hand-curated opportunities from verified, world-class companies",
      bg: "from-purple-500 to-blue-500",
    },
    {
      emoji: "🔒",
      title: "Ultra Secure",
      description:
        "Military-grade security protecting your personal and professional data",
      bg: "from-green-500 to-blue-500",
    },
    {
      emoji: "🎯",
      title: "Smart Matching",
      description:
        "AI-powered precision matching for perfect career connections",
      bg: "from-orange-500 to-red-500",
    },
    {
      emoji: "📈",
      title: "Career Rocket",
      description:
        "Advanced tools and resources to accelerate your professional journey",
      bg: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <>
      {/* SACRED THEMED HERO SECTION */}
      <section className="bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-orange-50/50 py-20 lg:py-28 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex justify-center mb-12">
            <div className="w-100 h-100 bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-full shadow-2xl flex items-center border-2 border-purple-200">
              <img
                src={Anvaya2}
                alt="Anvaya Lotus"
                className="w-100 h-100 object-cover drop-shadow-xl"
              />
            </div>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
              Anvaya
            </span>
          </h1>

          <h1 className="text-2xl">
            {" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent drop-shadow-sm">
              "The Sacred Link Between Skill and Success"
            </span>
          </h1>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm lg:text-base text-gray-600">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-500 animate-pulse" />
              <span>50K+ Souls Connected</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-pink-200">
              <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
              <span>1000+ Sacred Partnerships</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span>Divine Success Rate</span>
            </div>
          </div>
        </div>

        {/* DUAL PATH PANEL */}
        <div className="mt-20 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8">
          {/* SEEKERS */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-10 border border-purple-200 hover:scale-105 transition-transform">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-3xl font-bold text-purple-700 mb-2">
                For Seekers
              </h2>
              <p className="text-gray-600">
                Find your sacred calling and manifest your destiny 🌸
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What calls to your soul? ✨"
                  className={input + " pl-10"}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where shall your journey begin? 🌟"
                  className={input + " pl-10"}
                />
              </div>
              <button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg font-semibold rounded shadow-md">
                🌸 Begin Sacred Journey
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">10K+</div>
                <div className="text-sm text-gray-600">
                  Sacred Opportunities
                </div>
              </div>
              <div className="bg-pink-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-pink-600">500+</div>
                <div className="text-sm text-gray-600">
                  Enlightened Companies
                </div>
              </div>
            </div>
          </div>

          {/* RECRUITERS */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 lg:p-10 border border-orange-500/20 hover:scale-105 transition-transform">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-orange-400 mb-2">
                For Builders
              </h2>
              <p className="text-gray-300">
                Manifest your vision with exceptional souls 🔥
              </p>
            </div>
            <div className="space-y-4 mb-8">
              <button
                onClick={() => navigate("/post-job")}
                className="w-full h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded shadow-md"
              >
                🔥 Share Your Vision
              </button>
              <button
                onClick={() => navigate("/resumes")}
                className="w-full h-12 border border-orange-400 text-orange-400 text-lg font-semibold rounded"
              >
                🔍 Discover Talent
              </button>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full h-12 border border-orange-400 text-orange-400 text-lg font-semibold rounded"
              >
                📊 Sacred Dashboard
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-orange-500/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400">50K+</div>
                <div className="text-sm text-orange-200">Gifted Souls</div>
              </div>
              <div className="bg-red-500/10 rounded-lg p-4">
                <div className="text-2xl font-bold text-orange-400">Divine</div>
                <div className="text-sm text-orange-200">Harmony Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-blue-800 font-medium">
                Handpicked Opportunities
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              🌟 Featured Jobs
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              Discover{" "}
              <span className="font-semibold text-purple-600">
                extraordinary opportunities
              </span>{" "}
              from the world's most innovative companies
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {featuredJobs.map((job, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <JobCard job={job} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              🚀 Explore All Dreams
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* TOP COMPANIES */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-orange-500/30">
              <Award className="w-5 h-5 text-orange-400 animate-pulse" />
              <span className="text-orange-200 font-medium">
                Industry Leaders
              </span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">
              🏢 Elite Companies
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto">
              Join the ranks of{" "}
              <span className="font-semibold text-orange-400">
                visionary organizations
              </span>{" "}
              shaping tomorrow's world
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {topCompanies.map((company, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CompanyCard company={company} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="border-2 border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-gray-900 text-lg px-10 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              🏆 Browse Elite Circle
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-cyan-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-bounce" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-bounce delay-500" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-blue-800 font-medium">
                Platform Excellence
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-6">
              Why Choose Anvaya?
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto">
              <span className="text-purple-600 dark:text-purple-800 font-semibold">
                Trusted & innovative platform
              </span>{" "}
              for professionals and companies worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800/90 text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-105 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 mb-6 mx-auto rounded-2xl flex items-center justify-center text-3xl bg-gradient-to-br ${feature.bg}`}
                >
                  {feature.emoji}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
