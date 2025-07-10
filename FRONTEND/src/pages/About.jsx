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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-black mb-6">
              Connecting Talent with Opportunity
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Anvaya was founded with a simple mission: to make job searching and hiring more efficient,
              transparent, and human. We believe that everyone deserves to find work they love and companies
              deserve to find the right talent.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/register" className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition">
                Join Our Mission
              </Link>
              <Link to="/about" className="border border-gray-400 text-gray-800 px-8 py-3 rounded hover:bg-gray-100 transition">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold mb-2">1M+</h3>
              <p className="text-gray-300">Job Seekers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">50K+</h3>
              <p className="text-gray-300">Companies</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">500K+</h3>
              <p className="text-gray-300">Successful Hires</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-2">95%</h3>
              <p className="text-gray-300">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-black mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2020, Anvaya emerged from the frustration of both job seekers and recruiters
                  with existing platforms. Our founders experienced firsthand the challenges of finding the
                  right fit – whether as candidates or hiring managers.
                </p>
                <p>
                  We set out to build something different. A platform that prioritizes quality over quantity,
                  meaningful connections over endless applications, and transparency over black-box algorithms.
                </p>
                <p>
                  Today, we're proud to serve over a million job seekers and 50,000 companies worldwide,
                  facilitating hundreds of thousands of successful career moves.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-2xl p-8 text-center">
              <Award className="w-16 h-16 text-black mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-black mb-4">Award Winning Platform</h3>
              <p className="text-gray-600">
                Recognized as the "Best Job Platform" by TechCrunch and featured in Forbes'
                "Top 10 Startups to Watch" list.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape how we build our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl text-center hover:shadow-lg transition-shadow">
                <value.icon className="w-12 h-12 text-black mx-auto mb-4" />
                <h3 className="text-xl font-bold text-black mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-black mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Anvaya who are dedicated to transforming how the world works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                <p className="text-black font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
