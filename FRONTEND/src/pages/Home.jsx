
import {
  Award,
  Users,
  Briefcase,
} from "lucide-react";
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
    <div className="bg-black min-h-screen">
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
            Find Your Dream Job
          </h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Connect with top companies and opportunities that match your skills and aspirations
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate("/jobs")}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition font-medium border border-gray-700"
            >
              Sign Up Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <Briefcase className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Browse Jobs</h3>
              <p className="text-gray-400 text-sm">Explore thousands of job opportunities from leading companies</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <Users className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Connect</h3>
              <p className="text-gray-400 text-sm">Network with professionals and grow your career</p>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <Award className="w-10 h-10 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-white mb-2">Get Hired</h3>
              <p className="text-gray-400 text-sm">Apply and track your applications in one place</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
