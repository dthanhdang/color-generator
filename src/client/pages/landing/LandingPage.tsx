import { useEffect } from "react"

import { ArrowRight, Palette, PaintBucket, Eye, Sparkles } from "lucide-react"

import { HeroSection } from "./HeroSection"
import { Header } from "./Header"
import { FeatureSection } from "./FeatureSection"
import { CTAButton } from "./CTAButton"
import { Footer } from "./Footer"
import { SeoTags } from "#client/components/seo_tags"

export const LandingPage = () => {
  useEffect(() => {
    // Animation on scroll functionality
    const animateElements = () => {
      const elements = document.querySelectorAll(".animate-on-scroll")

      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight

        if (elementTop < windowHeight - 100) {
          element.classList.add("visible")
        }
      })
    }

    // Initial check for elements in view
    animateElements()

    // Add event listener for scroll
    window.addEventListener("scroll", animateElements)

    // Clean up
    return () => {
      window.removeEventListener("scroll", animateElements)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden">
      <SeoTags />
      <Header />
      <HeroSection />

      <FeatureSection />

      {/* Workflow Section */}
      <section
        id="how-it-works"
        className="py-20 px-6 md:px-12 bg-gradient-to-b from-white to-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create beautiful colors in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative animate-on-scroll">
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Palette size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose a tool</h3>
                <p className="text-gray-600">
                  Select from our powerful color tools based on your specific
                  needs.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="text-gray-300" size={24} />
              </div>
            </div>

            <div
              className="relative animate-on-scroll"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-lg flex items-center justify-center mb-4">
                  <PaintBucket size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Generate colors</h3>
                <p className="text-gray-600">
                  Tweak parameters to create the perfect colors for your
                  project.
                </p>
              </div>
              <div className="hidden md:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-10">
                <ArrowRight className="text-gray-300" size={24} />
              </div>
            </div>

            <div
              className="relative animate-on-scroll"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <Eye size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Export & use</h3>
                <p className="text-gray-600">
                  Export to various formats and integrate directly with your
                  design tools.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo/Preview Section */}
      <section className="py-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-16 relative">
            <div className="absolute top-0 right-0 opacity-50 transform translate-x-1/4 -translate-y-1/4">
              <div className="w-64 h-64 rounded-full bg-blue-500/20 blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 opacity-50 transform -translate-x-1/4 translate-y-1/4">
              <div className="w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your design workflow?
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of designers who use ChromaGen to create stunning
                color palettes that elevate their designs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <CTAButton
                  href="#"
                  variant="primary"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Get started for free
                </CTAButton>
                <CTAButton
                  href="#"
                  variant="secondary"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  Book a demo
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonials" className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What our users say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of happy designers and developers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Sarah Johnson</div>
                  <div className="text-sm text-gray-500">Product Designer</div>
                </div>
              </div>
              <p className="text-gray-600">
                "ChromaGen has completely transformed how I approach color in my
                design process. The scale generator has been invaluable for
                creating consistent UI components."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-xl animate-on-scroll"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Michael Chen</div>
                  <div className="text-sm text-gray-500">
                    Frontend Developer
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "As a developer, I love how ChromaGen makes it easy to generate
                CSS variables and Tailwind themes. It's saved me countless hours
                of tweaking colors."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
              </div>
            </div>

            <div
              className="glass-card p-6 rounded-xl animate-on-scroll"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Alex Rivera</div>
                  <div className="text-sm text-gray-500">Art Director</div>
                </div>
              </div>
              <p className="text-gray-600">
                "The image color picker is genius! I can extract beautiful
                palettes from inspiration photos and adjust them to fit my brand
                guidelines. Absolutely love it."
              </p>
              <div className="flex mt-4 text-yellow-400">
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
                <Sparkles size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start for free, upgrade when you need more powerful features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="glass-card p-6 rounded-xl border hover:border-gray-300 transition-all hover:shadow-md animate-on-scroll">
              <div className="mb-4">
                <h3 className="text-xl font-bold">Free</h3>
                <p className="text-gray-600">For individual designers</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Basic color tools</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Limited exports</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>5 saved palettes</span>
                </li>
              </ul>
              <CTAButton
                href="#"
                variant="secondary"
                className="w-full justify-center"
              >
                Get started
              </CTAButton>
            </div>

            <div
              className="glass-card p-6 rounded-xl border-2 border-black relative hover:shadow-xl transition-all animate-on-scroll"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-black text-white text-xs px-3 py-1 rounded-full">
                Popular
              </div>
              <div className="mb-4">
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-gray-600">For professional designers</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$12</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>All free features</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Advanced color tools</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Unlimited exports</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>100 saved palettes</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Plugin integrations</span>
                </li>
              </ul>
              <CTAButton
                href="#"
                variant="primary"
                className="w-full justify-center"
              >
                Start 7-day trial
              </CTAButton>
            </div>

            <div
              className="glass-card p-6 rounded-xl border hover:border-gray-300 transition-all hover:shadow-md animate-on-scroll"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="mb-4">
                <h3 className="text-xl font-bold">Team</h3>
                <p className="text-gray-600">For design teams</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$29</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>All Pro features</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Team collaboration</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Shared libraries</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Team permissions</span>
                </li>
                <li className="flex items-start">
                  <div className="text-green-500 mt-1 mr-2">
                    <Sparkles size={16} />
                  </div>
                  <span>Priority support</span>
                </li>
              </ul>
              <CTAButton
                href="#"
                variant="secondary"
                className="w-full justify-center"
              >
                Contact sales
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-12 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to elevate your color game?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of designers creating beautiful color palettes with
            UColorr.
          </p>
          <CTAButton
            href="#"
            variant="primary"
            className="bg-white text-black hover:bg-gray-100"
          >
            Get started — it's free
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  )
}
