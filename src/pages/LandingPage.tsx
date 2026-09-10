import { Link } from 'react-router-dom';
import { useState } from 'react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import {
  ArrowRight, Recycle, Truck, Leaf, Users, BarChart3,
  MapPin, Award, Smartphone, Shield, Zap, CheckCircle2,
  Factory,
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stats = [
    { value: '12K+', label: 'Pickups Completed' },
    { value: '850+', label: 'Tons Recycled' },
    { value: '3.2K', label: 'Active Citizens' },
    { value: '450', label: 'Tons CO₂ Saved' },
  ];

  const howItWorks = [
    {
      icon: Smartphone,
      title: 'Request Pickup',
      description: 'Citizens schedule a waste pickup in seconds — choose waste type, weight, and a convenient time slot.',
      step: '01',
    },
    {
      icon: Truck,
      title: 'Collector Collects',
      description: 'Nearby kabadiwalas get notified instantly. They accept the request and arrive at your doorstep.',
      step: '02',
    },
    {
      icon: Factory,
      title: 'Waste Gets Recycled',
      description: 'Collected waste is delivered to certified recyclers who process it into raw materials.',
      step: '03',
    },
  ];

  const features = [
    { icon: MapPin, title: 'Real-Time Tracking', description: 'Track your pickup from request to completion with live status updates.' },
    { icon: Award, title: 'Reward Points', description: 'Earn points for every pickup and unlock eco-friendly rewards and badges.' },
    { icon: BarChart3, title: 'Impact Analytics', description: 'See your CO₂ savings and contribution to a greener planet.' },
    { icon: Shield, title: 'Verified Collectors', description: 'Every kabadiwala is verified and rated by the community.' },
    { icon: Zap, title: 'Instant Matching', description: 'Smart matching connects you with the nearest available collector.' },
    { icon: Leaf, title: 'Eco Impact', description: 'Every pickup contributes to reducing landfill waste and carbon emissions.' },
  ];

  const whyEcoNex = [
    'Direct door-to-door pickup service',
    'Transparent pricing and fair payments',
    'Earn rewards while saving the planet',
    'Support local waste collectors',
    'Track your environmental impact',
    'Verified and trusted network',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-eco-600 transition-colors">How It Works</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-eco-600 transition-colors">Features</a>
            <a href="#why" className="text-sm font-medium text-slate-600 hover:text-eco-600 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
            <Link to="/signup"><Button size="sm">Get Started <ArrowRight className="w-4 h-4" /></Button></Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden gradient-hero">
        <div className="absolute top-20 right-10 w-72 h-72 bg-eco-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-ocean-200/20 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-100 text-eco-700 text-xs font-semibold mb-5">
                <Leaf className="w-3.5 h-3.5" />
                Connecting Waste to Worth
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight font-display">
                Turn Your <span className="text-gradient-eco">Waste</span> Into <span className="text-gradient-eco">Worth.</span>
              </h1>
              <p className="text-lg text-slate-500 mt-5 leading-relaxed max-w-xl">
                EcoNex connects citizens, waste collectors (kabadiwalas), and recyclers in one seamless platform. Schedule pickups, track collections, earn rewards, and make a real environmental impact.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/login"><Button size="lg">Book a Pickup <ArrowRight className="w-5 h-5" /></Button></Link>
                <a href="#how-it-works"><Button variant="outline" size="lg">Explore EcoNex</Button></a>
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <div className="relative rounded-3xl overflow-hidden card-shadow-lg">
                <img
                  src="https://images.pexels.com/photos/12530983/pexels-photo-12530983.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Waste collection on a green street"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-eco-900/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl card-shadow-lg p-4 flex items-center gap-3 animate-float">
                <div className="w-12 h-12 rounded-xl bg-eco-100 flex items-center justify-center text-eco-600">
                  <Recycle className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 font-display">850+</p>
                  <p className="text-xs text-slate-400">Tons Recycled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-extrabold text-gradient-eco font-display">{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-100 text-eco-700 text-xs font-semibold mb-4">
              <Zap className="w-3.5 h-3.5" /> Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display">How It Works</h2>
            <p className="text-slate-500 mt-3">Three simple steps from waste to worth — it's that easy.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, idx) => (
              <div key={step.title} className="relative">
                {idx < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-eco-300 to-transparent" />
                )}
                <div className="bg-white rounded-2xl p-6 card-shadow border border-slate-100 relative z-10 hover:card-shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl gradient-eco flex items-center justify-center text-white shadow-lg shadow-eco-500/20">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <span className="text-4xl font-extrabold text-slate-100 font-display">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ocean-100 text-ocean-700 text-xs font-semibold mb-4">
              <BarChart3 className="w-3.5 h-3.5" /> Powerful Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display">Everything You Need</h2>
            <p className="text-slate-500 mt-3">A complete platform built for a circular economy.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="group bg-white rounded-2xl p-6 border border-slate-100 hover:border-eco-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-eco-50 text-eco-600 flex items-center justify-center group-hover:bg-eco-500 group-hover:text-white transition-all duration-300">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-800 mt-4">{feature.title}</h3>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why EcoNex */}
      <section id="why" className="py-20 sm:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-eco-100 text-eco-700 text-xs font-semibold mb-4">
                <Leaf className="w-3.5 h-3.5" /> Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 font-display">Why EcoNex?</h2>
              <p className="text-slate-500 mt-3 mb-6">
                We're not just a pickup service. We're building India's largest waste-to-resource network, empowering citizens, collectors, and recyclers alike.
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {whyEcoNex.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-eco-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
              <Link to="/signup" className="inline-block mt-8">
                <Button size="lg">Join EcoNex Today <ArrowRight className="w-5 h-5" /></Button>
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden card-shadow-lg">
                <img
                  src="https://images.pexels.com/photos/17869493/pexels-photo-17869493.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                  alt="Recycling bins"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -top-5 -right-5 bg-white rounded-2xl card-shadow-lg p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-ocean-100 flex items-center justify-center text-ocean-600">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800 font-display">3.2K+</p>
                    <p className="text-xs text-slate-400">Active Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-3xl gradient-eco p-10 sm:p-14 text-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">Ready to Make an Impact?</h2>
              <p className="text-eco-50 mt-3 max-w-xl mx-auto">Join thousands of citizens already turning their waste into worth. Every pickup counts.</p>
              <div className="flex flex-wrap gap-3 justify-center mt-8">
                <Link to="/signup"><Button variant="outline" size="lg" className="bg-white border-white text-eco-700 hover:bg-eco-50">Get Started Free <ArrowRight className="w-5 h-5" /></Button></Link>
                <Link to="/login"><Button size="lg" className="bg-eco-700 hover:bg-eco-800 text-white">Login</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-xl gradient-eco flex items-center justify-center text-white">
                  <Recycle className="w-5 h-5" />
                </div>
                <span className="font-display font-extrabold text-xl text-white">Eco<span className="text-eco-400">Nex</span></span>
              </div>
              <p className="text-sm leading-relaxed">Connecting Waste to Worth. Building a sustainable future for India.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Platform</p>
              <ul className="space-y-2 text-sm">
                <li><a href="#how-it-works" className="hover:text-eco-400 transition-colors">How It Works</a></li>
                <li><a href="#features" className="hover:text-eco-400 transition-colors">Features</a></li>
                <li><Link to="/signup" className="hover:text-eco-400 transition-colors">Get Started</Link></li>
                <li><Link to="/login" className="hover:text-eco-400 transition-colors">Login</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Roles</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2"><Users className="w-4 h-4" /> Citizen</li>
                <li className="flex items-center gap-2"><Truck className="w-4 h-4" /> Kabadiwala</li>
                <li className="flex items-center gap-2"><Factory className="w-4 h-4" /> Recycler</li>
                <li className="flex items-center gap-2"><Shield className="w-4 h-4" /> Admin</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-3">Contact</p>
              <ul className="space-y-2 text-sm">
                <li>support@econex.in</li>
                <li>+91 1800 ECO NEX</li>
                <li>EcoNex HQ, Gurugram, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
            <p>© 2025 EcoNex. Connecting Waste to Worth. Built for a hackathon presentation.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
