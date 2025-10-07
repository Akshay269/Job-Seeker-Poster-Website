
import {
  Award,
  Search,
  MapPin,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import JobCard from "../components/JobCard";
import CompanyCard from "../components/CompanyCard";
import Anvaya2 from "../assets/Anvaya2.png";
import { useNavigate } from "react-router-dom";



const input =
  "w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black text-base";

const Home = () => {
  const navigate = useNavigate();

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
      <section className="bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-orange-50/50 py-20 lg:py-28 overflow-hidden relative">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full blur-3xl delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-pulse">
          <div className="flex justify-center mb-1">
            <div className="w-80 h-80 justify-center bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-full shadow-2xl flex items-center border-2 border-purple-200">
              <img
                src={Anvaya2}
                alt="Anvaya Lotus"
                className="w-70 h-70 object-cover drop-shadow-xl "
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

    
      </section>

     
    </>
  );
};

export default Home;
