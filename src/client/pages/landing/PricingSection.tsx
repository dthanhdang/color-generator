import { Sparkles } from "lucide-react"
import { CTAButton } from "./CTAButton"

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works for you
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="glass-card p-6 rounded-xl border hover:border-gray-300 transition-all hover:shadow-md animate-on-scroll">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Free</h3>
              <p className="text-gray-600">Full access with ads</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>All features with ads</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Unlimited Palettes</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Scale Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Harmony Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Color Extractor From Image</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Random Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Palette Viewer on UI Elements</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Unlimited saves</span>
              </li>
            </ul>

            <CTAButton
              href="#"
              variant="secondary"
              className="w-full justify-center"
            >
              Get Your Free Palette
            </CTAButton>
          </div>

          {/* Premium Plan */}
          <div
            className="glass-card p-6 rounded-xl relative hover:shadow-xl transition-all animate-on-scroll border-2"
            style={{ borderColor: "oklch(0.511 0.262 276.966)" }}
          >
            <div
              className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 text-white text-xs px-3 py-1 rounded-full"
              style={{ backgroundColor: "oklch(0.511 0.262 276.966)" }}
            >
              Popular
            </div>
            <div className="mb-4">
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-gray-600">Ad-free experience</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold">$2.99</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>All features with NO Ads</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Unlimited Palettes</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Scale Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Harmony Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Color Extractor From Image</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Random Palette Generator</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Palette Viewer on UI Elements</span>
              </li>
              <li className="flex items-start">
                <div className="text-indigo-700 mt-1 mr-2">
                  <Sparkles size={16} />
                </div>
                <span>Unlimited Saves</span>
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
        </div>
      </div>
    </section>
  )
}
