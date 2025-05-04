import { FeatureCard } from "./FeatureCard"
import {
  PaintBucket,
  PaletteIcon,
  Image,
  Shuffle,
  Sparkles,
  Contrast,
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
            design or developement projects
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Scale Palette Generator"
            description="Create perfect color scales by switching between HEX, HSL and OKLCH modes to fine-tuned hue, saturation, lightness and chroma value."
            icon={<PaintBucket size={48} color="#503AF7" />}
            color="red"
            delay={100}
            to="/scale-palette"
          />

          <FeatureCard
            title="Harmony Generator"
            description="Generate harmonious color combinations using color theory principles like complementary, split-complementary, monochromatic, analogous, triadic and tetradic."
            icon={<PaletteIcon size={48} color="#503AF7" />}
            color="orange"
            delay={200}
            to="/harmony-palette"
          />

          <FeatureCard
            title="Image Color Extractor"
            description="Extract stunning color palettes from any image or photo in just one click. Perfect for designers looking to capture inspiration directly from viduals."
            icon={<Image size={48} color="#503AF7" />}
            color="green"
            delay={300}
            to="/image-picker"
          />

          <FeatureCard
            title="Palette Visualizer"
            description="Preview your generated palette applied to common UI components. Perfect for testing harmony and readability in real-world contexts."
            icon={<Sparkles size={48} color="#503AF7" />}
            color="blue"
            delay={400}
            to="/palette-editor"
          />

          <FeatureCard
            title="Random Palette Generator"
            description="Discover unexpected and unique color combinations generated instantly by our random palette tool."
            icon={<Shuffle size={48} color="#503AF7" />}
            color="purple"
            delay={500}
            to="/random-palette"
          />

          <FeatureCard
            title="Color Contrast Checker"
            description="Ensure your color combinations meet accessibility standards with our contrast checker. Perfect for web and app designers."
            icon={<Contrast size={48} color="#503AF7" />}
            color="red"
            delay={600}
            to="/contrast-checker"
          />
        </div>
      </div>
    </section>
  )
}
