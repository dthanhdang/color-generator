import { useEffect } from "react"

import { ArrowRight, Palette, PaintBucket, Heart, Sparkles } from "lucide-react"

import { HeroSection } from "./HeroSection"
//import { Header } from "./Header"
import { FeatureSection } from "./FeatureSection"
import { CTAButton } from "./CTAButton"
import { Footer } from "./Footer"
import { SeoTags } from "#client/components/seo_tags"
//import {Pricing}
import { PricingSection } from "./PricingSection"
import { FAQSection } from "./FAQSection"
import { Divider } from "@mantine/core"

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
  //const customColor = "#503AF7";

  return (
    <div className="min-h-screen overflow-hidden">
      <SeoTags />
      {/*<Header />*/}
      <HeroSection />

      <FeatureSection />

      {/* Workflow Section */}
      <section id="how-it-works" className="py-20 px-6 md:px-12  ">
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
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-[#503AF7] text-white flex items-center justify-center font-bold text-xl z-20">
                1
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-[#503AF7] text-white rounded-lg flex items-center justify-center mb-4">
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
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-[#503AF7] text-white flex items-center justify-center font-bold text-xl z-20">
                2
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-[#503AF7] text-white rounded-lg flex items-center justify-center mb-4">
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
              <div className="absolute -left-4 -top-4 w-12 h-12 rounded-full bg-[#503AF7] text-white flex items-center justify-center font-bold text-xl z-20">
                3
              </div>
              <div className="glass-card p-6 rounded-xl h-full">
                <div className="w-12 h-12 bg-[#503AF7] text-white rounded-lg flex items-center justify-center mb-4">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-semibold mb-2">Save & use</h3>
                <p className="text-gray-600">
                  Save your favorite color palettes and use them for your
                  design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo/Preview Section */}
      <section className="py-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#503AF7] rounded-3xl p-8 md:p-16 relative">
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
                Join designers who use ucolorr to create stunning color palettes
                that elevate their designs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <CTAButton
                  href="/scale-palette"
                  variant="primary"
                  className="!bg-white !hover:bg-gray-100 !text-[#503AF7]"
                >
                  Start It Free
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
              What our beta testers say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Early feedback from our community of design enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                <div className="ml-3">
                  <div className="font-medium">Beta Tester #1</div>
                  <div className="text-sm text-gray-500">Product Designer</div>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been testing Ucolorr's beta and I'm already impressed with
                how intuitive the scale generator is. Can't wait to use this in
                my production workflow!"
              </p>
              <div className="flex mt-4 text-indigo-700">
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
                  <div className="font-medium">Beta Tester #2</div>
                  <div className="text-sm text-gray-500">
                    Frontend Developer
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "As a developer, I love how Ucolorr makes it easy to generate
                CSS variables and Tailwind themes. It's saved me countless hours
                of tweaking colors."
              </p>
              <div className="flex mt-4 text-indigo-700">
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
                  <div className="font-medium">Beta Tester #3</div>
                  <div className="text-sm text-gray-500">Art Director</div>
                </div>
              </div>
              <p className="text-gray-600">
                "The harmony color palette is genius! I can extract beautiful
                palettes with a large choice of harmony mode to fit my brand
                guidelines. Absolutely love it."
              </p>
              <div className="flex mt-4 text-indigo-700">
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
      <PricingSection />

      {/* Final CTA */}
      <section className="py-20 px-6 md:px-12 text-[#503AF7] bg-[#F5F5FF]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to elevate your color game?
          </h2>
          <p className="text-xl text-[#503AF7]/80 max-w-2xl mx-auto mb-8">
            Join thousands of designers and developers creating beautiful color
            palettes with Ucolorr.
          </p>
          <CTAButton
            href="/random-palette"
            variant="primary"
            className="bg-white text-black hover:bg-gray-100"
          >
            Start It Free
          </CTAButton>
        </div>
      </section>
      <FAQSection />
      <Divider />

      <Footer />
    </div>
  )
}
