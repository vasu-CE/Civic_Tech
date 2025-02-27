  export default function Footer() {
      return (
        <footer className="bg-black text-white py-10 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Contact</h3>
              <p className="text-gray-400">support@civictech.com</p>
              <p className="text-gray-400 mt-1">Emergency: <span className="font-semibold text-white">911</span></p>
            </div>
    
            {/* Resources Section */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Terms & Conditions</a></li>
              </ul>
            </div>
    
            {/* Community Section */}
            <div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition">Forum</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition">Success Stories</a></li>
              </ul>
            </div>
          </div>
    
          {/* Bottom Section */}
          <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-6">
            © {new Date().getFullYear()} CivicTech. All rights reserved.
          </div>
        </footer>
      );
    }
    