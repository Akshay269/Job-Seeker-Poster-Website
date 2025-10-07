import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Heart,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black"></div>
      <div className="absolute"></div>

      {/* Glow Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 max-w-8xl mx-auto px-3 sm:px-5 lg:px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <div className="flex items-center mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 rounded-2xl blur-md opacity-50 animate-pulse"></div>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Anvaya
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              🚀 Connecting dreams with opportunities. Building careers, transforming futures.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg">
                <span className="text-white font-bold">f</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg">
                <span className="text-white font-bold">t</span>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl flex items-center justify-center hover:scale-110 transition-all cursor-pointer shadow-lg">
                <span className="text-white font-bold">in</span>
              </div>
            </div>
          </div>

          {/* For Job Seekers */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400">For Dreamers</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li>🎯 Browse Dream Jobs</li>
              <li>💡 Career Guidance</li>
              <li>📝 Resume Builder</li>
              <li>💰 Salary Insights</li>
              <li>🔔 Smart Alerts</li>
            </ul>
          </div>

          {/* For Employers */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <Building2 className="w-5 h-5 text-cyan-400 animate-pulse" />
              <h3 className="text-xl font-bold text-white group-hover:text-cyan-400">For Builders</h3>
            </div>
            <ul className="space-y-4 text-gray-300">
              <li>🚀 Post Opportunities</li>
              <li>🔍 Scout Talent</li>
              <li>⚡ Recruitment Suite</li>
              <li>💎 Premium Plans</li>
              <li>🏆 Brand Showcase</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="group">
            <div className="flex items-center space-x-2 mb-6">
              <Heart className="w-5 h-5 text-pink-400 animate-pulse" />
              <h3 className="text-xl font-bold text-white group-hover:text-pink-400">Connect</h3>
            </div>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <span>hello@anvaya.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <span>Nagpur, Maharashtra</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-5 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400">
              <span>© 2025 Anvaya. Made with</span>
              <Heart className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>for dreamers worldwide</span>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <a href="#" className="hover:text-purple-400">🔒 Privacy</a>
              <a href="#" className="hover:text-purple-400">📋 Terms</a>
              <a href="#" className="hover:text-purple-400">🍪 Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
