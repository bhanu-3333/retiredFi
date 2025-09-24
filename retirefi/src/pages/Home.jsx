import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';
import { DollarSign, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Hero Section Animation
    const heroElements = document.querySelectorAll('.hero-animate');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, index * 100);
    });

    // Feature cards animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) translateX(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header */}
      <header className="bg-blue-900/95 backdrop-blur-md border-b border-gray-800/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RetireFi
              </h1>
            </div>
            <WalletConnect /> {/* Dynamic wallet button */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900/20 to-green-900/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,78,59,0.1),transparent)] pointer-events-none"></div>
        <div className="max-w-6xl mx-auto text-center px-6 py-20 relative z-10">
          <div className="hero-animate opacity-0 transform translate-y-8 transition-all duration-700">
            <h2 className="text-6xl md:text-7xl font-black mb-8 leading-tight">
              Secure Your Future with
              <span className="block bg-gradient-to-r from-blue-600 via-green-700 to-blue-400 bg-clip-text text-transparent">
                DeFi Retirement
              </span>
            </h2>
          </div>
          <div className="hero-animate opacity-0 transform translate-y-8 transition-all duration-700">
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto">
              RetireFi is a decentralized platform that revolutionizes pension planning. Deposit your crypto, earn automated yields, and enjoy a stress-free retirement with blockchain security.
            </p>
          </div>
          <div className="hero-animate opacity-0 transform translate-y-8 transition-all duration-700 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-green-700 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Get Started Today</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Why Choose RetireFi?
            </h3>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Experience the future of retirement planning with cutting-edge DeFi technology
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'TrendingUp', // Placeholder, replace with actual icon import if needed
                title: "Automated Yield",
                description: "Deposit assets into smart vaults that auto-allocate to DeFi protocols like Aave for optimized returns",
                color: "from-green-400 to-blue-600"
              },
              {
                icon: 'Shield', // Placeholder
                title: "Secure Payouts",
                description: "Lock funds until retirement with automated, transparent monthly payouts via blockchain technology",
                color: "from-blue-600 to-green-700"
              },
              {
                icon: 'Users', // Placeholder
                title: "Inheritance Planning",
                description: "Set heir rules for secure asset transfer with blockchain-verified trust and transparency",
                color: "from-green-600 to-blue-400"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 transform translate-x-8 transition-all duration-700 p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-600/50 hover:shadow-2xl hover:shadow-blue-500/10 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {/* Replace with actual icon if imported */}
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>
                <h4 className="text-2xl font-bold mb-4 text-white">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/20 to-green-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "$50M+", label: "Total Value Locked" },
              { value: "10K+", label: "Active Users" },
              { value: "15%", label: "Average APY" },
              { value: "99.9%", label: "Uptime" }
            ].map((stat, index) => (
              <div key={index} className="animate-on-scroll opacity-0 transform translate-y-4 transition-all duration-700 text-center">
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "RetireFi made retirement planning so easy! The yield automation is a game-changer.",
                author: "John D., 45"
              },
              {
                quote: "I love the security and transparency. My heirs are set with this platform!",
                author: "Sarah K., 52"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 transform translate-y-8 transition-all duration-700 p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-green-600/50 hover:shadow-2xl hover:shadow-green-500/10"
              >
                <p className="text-gray-300 text-lg italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-white">{testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h3>
          <div className="space-y-6">
            {[
              {
                question: "How do I connect my wallet?",
                answer: "Click 'Connect MetaMask' in the header. Install MetaMask and switch to Sepolia network."
              },
              {
                question: "Is my money safe?",
                answer: "Yes, your funds are secured with audited smart contracts on the blockchain."
              },
              {
                question: "Can I withdraw anytime?",
                answer: "Withdrawals are available after the lock-in period for retirement stability."
              },
              {
                question: "What returns can I expect?",
                answer: "Historical returns average 15% APY, varying with market conditions."
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 transform translate-x-8 transition-all duration-700 p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-blue-600/50"
              >
                <h4 className="text-xl font-bold mb-3 text-white">{faq.question}</h4>
                <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900/40 to-green-900/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(6,78,59,0.2),transparent)]"></div>
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <div className="animate-on-scroll opacity-0 transform scale-95 transition-all duration-700">
            <h3 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
              Start Building Your Retirement Today
              <span className="block bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Journey Today
              </span>
            </h3>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
              Join thousands of users securing their financial future with RetireFi. Connect your wallet and take the first step towards a prosperous retirement.
            </p>
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-md flex items-center justify-center space-x-2"
            >
              <span>Connect Wallet Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                RetireFi
              </span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400 mb-2">&copy; 2025 RetireFi. All rights reserved.</p>
              <p className="text-sm text-gray-500">Powered by xAI and Decentralized Finance</p>
            </div>
          </div>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
};

export default Home;