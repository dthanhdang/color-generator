import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is a color palette generator?",
    answer:
      "A color palette generator is a tool that helps you create harmonious color schemes for design projects. It suggests complementary colors based on color theory, allowing you to generate cohesive palettes effortlessly.",
  },
  {
    question: "How do I generate a color palette?",
    answer:
      "You can generate a palette by selecting a base color, using an image for inspiration, or choosing a predefined theme. The app then provides matching colors (e.g., monochromatic, analogous, or triadic schemes).",
  },
  {
    question: "Can I extract colors from an image?",
    answer:
      "Yes! Upload an image, and the app will analyze it to extract dominant colors, creating a palette that reflects the image's mood and style.",
  },
  {
    question: "How do I save or export my palette?",
    answer:
      "After creating a palette, you can save it to your profile, copy HEX/RGB codes, or export it as a PNG/SVG file for use in design software like Photoshop or Figma.",
  },
  {
    question: "What's the difference between HEX, RGB, and HSL codes?",
    answer:
      "HEX: A 6-digit code representing colors in web design (e.g., #FF5733).\n\nRGB: Defines colors by Red, Green, and Blue values (e.g., rgb(255, 87, 51)).\n\nHSL: Uses Hue, Saturation, and Lightness for more intuitive adjustments (e.g., hsl(12, 100%, 60%)).",
  },
  {
    question: "Can I adjust the contrast or brightness of my palette?",
    answer:
      "Yes! Use sliders to tweak brightness, saturation, or contrast. Some apps also check WCAG accessibility standards to ensure readability.",
  },
  {
    question: "Is there a premium version with more features?",
    answer:
      "The free version includes basic palette generation, while premium options may offer advanced tools like gradient creation, unlimited saves, and Adobe/Canva integrations.",
  },
]

const colorPalette = ["#f2a1c5", "#a4d6d4", "#cea1f2", "#f4cf3e", "#f2a1ee"]
const borderColor = "oklch(0.511 0.262 276.966)" // Couleur OKLCH spécifiée

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
          const bgColor = colorPalette[index % colorPalette.length]

          return (
            <div
              key={index}
              className={`transition-all duration-300 ease-out rounded-md shadow-sm p-4 ${
                isOpen ? "border-l-4" : "border-l-4 opacity-90"
              }`}
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor, // Utilisation de la couleur OKLCH pour la bordure
              }}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between text-left group"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="w-2.5 h-2.5 mt-1 rounded-full shrink-0"
                    style={{ backgroundColor: borderColor }} // Utilisation de la couleur OKLCH pour le rond
                  />
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 mt-1 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={{ color: borderColor }} // Utilisation de la couleur OKLCH pour l'icône
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

{
  /*import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "What is a color palette generator?",
    answer:
      "A color palette generator is a tool that helps you create harmonious color schemes for design projects. It suggests complementary colors based on color theory, allowing you to generate cohesive palettes effortlessly.",
  },
  {
    question: "How do I generate a color palette?",
    answer:
      "You can generate a palette by selecting a base color, using an image for inspiration, or choosing a predefined theme. The app then provides matching colors (e.g., monochromatic, analogous, or triadic schemes).",
  },
  {
    question: "Can I extract colors from an image?",
    answer:
      "Yes! Upload an image, and the app will analyze it to extract dominant colors, creating a palette that reflects the image's mood and style.",
  },
  {
    question: "How do I save or export my palette?",
    answer:
      "After creating a palette, you can save it to your profile, copy HEX/RGB codes, or export it as a PNG/SVG file for use in design software like Photoshop or Figma.",
  },
  {
    question: "What's the difference between HEX, RGB, and HSL codes?",
    answer:
      "HEX: A 6-digit code representing colors in web design (e.g., #FF5733).\n\nRGB: Defines colors by Red, Green, and Blue values (e.g., rgb(255, 87, 51)).\n\nHSL: Uses Hue, Saturation, and Lightness for more intuitive adjustments (e.g., hsl(12, 100%, 60%)).",
  },
  {
    question: "Can I adjust the contrast or brightness of my palette?",
    answer:
      "Yes! Use sliders to tweak brightness, saturation, or contrast. Some apps also check WCAG accessibility standards to ensure readability.",
  },
  {
    question: "Is there a premium version with more features?",
    answer:
      "The free version includes basic palette generation, while premium options may offer advanced tools like gradient creation, unlimited saves, and Adobe/Canva integrations.",
  },
]

const colorPalette = ["#f2a1c5", "#a4d6d4", "#cea1f2", "#f4cf3e", "#f2a1ee"]

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
          const bgColor = colorPalette[index % colorPalette.length]
          const borderColor = colorPalette[(index + 2) % colorPalette.length]

          return (
            <div
              key={index}
              className={`transition-all duration-300 ease-out rounded-md shadow-sm p-4 ${
                isOpen ? "border-l-4" : "border-l-4 opacity-90"
              }`}
              style={{
                backgroundColor: bgColor, // Couleur pure sans opacité
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
                    style={{ backgroundColor: borderColor }}
                  />
                  <h3 className="text-lg font-medium text-black group-hover:underline">
                    {faq.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-5 w-5 mt-1 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
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
}*/
}
