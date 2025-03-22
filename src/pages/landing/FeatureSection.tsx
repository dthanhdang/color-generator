import React from "react"
import { FeatureCard } from "./FeatureCard"
import {
  PaintBucket,
  PaletteIcon,
  Image,
  Shuffle,
  Sparkles,
  Plus,
} from "lucide-react"

export const FeatureSection = () => {
  return (
    <section id="features" className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Color Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create stunning color palettes for your
            design projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Scale Generator"
            description="Create perfect color scales and gradients with fine-tuned control over hue, saturation, and brightness."
            icon={<PaintBucket size={48} />}
            color="red"
            delay={100}
          />

          <FeatureCard
            title="Harmony Generator"
            description="Generate harmonious color combinations using color theory principles like complementary, analogous, and triadic."
            icon={<PaletteIcon size={48} />}
            color="orange"
            delay={200}
          />

          <FeatureCard
            title="Image Color Picker"
            description="Extract beautiful color palettes from your favorite images and photos with a single click."
            icon={<Image size={48} />}
            color="green"
            delay={300}
          />

          <FeatureCard
            title="Color Listing"
            description="Browse and search through thousands of named colors, from web standards to brand-specific collections."
            icon={<Sparkles size={48} />}
            color="blue"
            delay={400}
          />

          <FeatureCard
            title="Random Palette Generator"
            description="Discover unexpected color combinations with our intelligent randomization algorithm."
            icon={<Shuffle size={48} />}
            color="purple"
            delay={500}
          />

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
            <div className="w-full h-64 rounded-t-xl bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-white shadow-md text-black group-hover:scale-110 transition-transform">
                <Plus size={28} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">More Coming Soon</h3>
              <p className="text-gray-600">
                We're constantly adding new tools to help with your color
                workflow.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
