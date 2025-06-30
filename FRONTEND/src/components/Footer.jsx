import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Socials */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
              JP
            </div>
            <span className="text-xl font-bold">Job<span className="text-white font-extrabold">Port</span>al</span>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Connecting talent with opportunity. Building careers, building futures.
          </p>
          <div className="flex space-x-4">
            <div className="bg-gray-700 p-2 rounded-full"><Facebook size={16} /></div>
            <div className="bg-gray-700 p-2 rounded-full"><Twitter size={16} /></div>
            <div className="bg-gray-700 p-2 rounded-full"><Linkedin size={16} /></div>
          </div>
        </div>

        {/* For Job Seekers */}
        <div>
          <h4 className="font-semibold mb-4">For Job Seekers</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Browse Jobs</li>
            <li>Career Advice</li>
            <li>Resume Builder</li>
            <li>Salary Tools</li>
            <li>Job Alerts</li>
          </ul>
        </div>

        {/* For Employers */}
        <div>
          <h4 className="font-semibold mb-4">For Employers</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Post Jobs</li>
            <li>Browse Resumes</li>
            <li>Recruitment Solutions</li>
            <li>Pricing</li>
            <li>Employer Branding</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-center space-x-2">
              <Mail size={16} />
              <span>hello@jobportal.com</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>San Francisco, CA</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
        <p>© 2024 JobPortal. All rights reserved.</p>
        <div className="flex space-x-6 mt-2 md:mt-0">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
