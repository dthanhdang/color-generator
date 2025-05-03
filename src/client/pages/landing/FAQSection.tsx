import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How do I generate a color palette?",
    answer:
      "You can generate a palette by selecting a base color, using an image for inspiration, or generating a random palette just by one click. The app then provides scale palettes, matching colors (e.g., monochromatic, analogous, or triadic schemes).",
  },
  {
    question: "Can I extract colors from an image?",
    answer:
      "Yes! Upload an image, and the app will analyze it to extract dominant colors, creating a palette that reflects the image's mood and style.",
  },
  {
    question: "How do I save or export my palette?",
    answer:
      "After creating a palette, you can save it to your profile, copy HEX/RGB codes, or CSS codes for use.",
  },
  {
    question: "What's the difference between HEX, RGB, HSL and OKLCH codes?",
    answer:
      "HEX: A 6-digit code representing colors in web design (e.g., #FF5733).\n\nRGB: Defines colors by Red, Green, and Blue values (e.g., rgb(255, 87, 51)).\n\nHSL: Uses Hue, Saturation, and Lightness for more intuitive adjustments (e.g., hsl(12, 100%, 60%)).\n\nOKLCH: OKLCH Codes are a way to represent colors based on human vision. They stand for OK (a perceptual color space), Lightness, Chroma (color intensity), and Hue (color angle) (e.g., oklch(0.627 0.257 29.2))",
  },
  {
    question: "Can I adjust the contrast or brightness of my color?",
    answer:
      "Yes! Use sliders when you are on scale palette generator mode to adjust lightness, hue or chroma.",
  },
  {
    question: "Is there a premium version with more features?",
    answer:
      "All of the features are free to use. The free version includes all features with ads, while premium option offers all features without ads.",
  },
  {
    question: "Why are there often 5 colors in a generated palette?",
    answer:
      "This number is a common design standard - it's enough to include key roles like primary, secondary, accent, background and text colors without overwhelming you. It also works well with popular color harmony rules and fits neatly into most UI layouts.",
  },
]

const colorPalette = [
  "#f4bf44", // Casablanca
  "#fc69b8", // Hot Pink
  "#05e8a2", // Caribbean
  "#f48752", // Jaffa
  "#b384fd", // Heliotrope
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(index === openIndex ? null : index)
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = index === openIndex
          const borderColor = colorPalette[index % colorPalette.length]

          return (
            <div
              key={index}
              className={`transition-all duration-300 ease-out rounded-md shadow-sm p-4 ${
                isOpen ? "border-l-4" : "border-l-4 opacity-90"
              }`}
              style={{
                backgroundColor: "white", // Fond blanc comme demandé
                borderColor: borderColor,
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between text-left group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-2.5 h-2.5 mt-1 rounded-full shrink-0"
                    style={{ backgroundColor: borderColor }} // Points bullets avec les nouvelles couleurs
                  />
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 mt-1 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: borderColor }} // Couleur de l'icône correspondant à la bordure
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm whitespace-pre-line text-black">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
