import { Link } from "react-router-dom";
import { Target, Users, Award, Globe, Heart, Zap } from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "/placeholder.svg",
      description: "Former VP at Google with 15+ years in tech recruitment."
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "/placeholder.svg",
      description: "Ex-Facebook engineer passionate about connecting talent with opportunity."
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Operations",
      image: "/placeholder.svg",
      description: "Operations expert with experience scaling platforms to millions of users."
    },
    {
      name: "David Kim",
      role: "Head of Design",
      image: "/placeholder.svg",
      description: "Award-winning designer focused on creating intuitive user experiences."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "People First",
      description: "We believe that behind every job posting and resume is a real person with dreams and aspirations."
    },
    {
      icon: Target,
      title: "Quality Matches",
      description: "We focus on creating meaningful connections between candidates and companies that truly fit."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We continuously innovate to make the job search and hiring process more efficient and effective."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "We're building a platform that connects talent worldwide, breaking down geographical barriers."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-purple-50">
      {/* Hero Section */}
      <div className="py-20 text-center">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">Connecting Sacred Talent with Divine Opportunity</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Anvaya is on a sacred mission to align seekers with their destiny and builders with their divine vision.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:opacity-90"
          >
            🌸 Begin Sacred Journey
          </Link>
          <Link
            to="/about"
            className="border border-purple-400 text-purple-700 px-6 py-3 rounded-full font-medium hover:bg-purple-50"
          >
            ✨ Learn More
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white text-center py-16">
        <div className="bg-white text-purple-700 py-12">
          <h2 className="text-4xl font-extrabold">10K+</h2>
          <p className="text-lg">Sacred Opportunities</p>
        </div>
        <div className="bg-black text-orange-400 py-12">
          <h2 className="text-4xl font-extrabold">50K+</h2>
          <p className="text-lg">Gifted Souls Recruited</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-20 px-8">
        <div className="bg-white rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Our Sacred Origin</h2>
          <p className="text-gray-700 mb-4">
            Born from purpose in 2020, Anvaya was crafted to transcend conventional job portals.
            Our mission is to realign work with purpose and fulfillment.
          </p>
          <p className="text-gray-700">
            From seekers finding their soul-callings to builders manifesting visions, Anvaya brings clarity,
            connection, and cosmic impact.
          </p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl p-8 shadow-lg text-center">
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold mb-2">Divinely Recognized</h3>
          <p>
            Honored as "Best Spiritual Job Platform" by CosmicTech Awards and praised by souls worldwide.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Our Sacred Values</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            These divine principles shape the essence of Anvaya's existence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition">
              <value.icon className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-purple-800 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">Our Divine Builders</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Meet the enlightened souls manifesting this vision.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-6 text-center shadow-md hover:shadow-xl">
              <div className="w-24 h-24 rounded-full bg-purple-100 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold text-purple-800">{member.name}</h3>
              <p className="text-sm text-purple-600 mb-2">{member.role}</p>
              <p className="text-sm text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
