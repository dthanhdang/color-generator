import { CTAButton } from "./CTAButton"
import { PreviewImageLanding } from "./PreviewImageLanding"

export const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white z-0"></div>

      {/* Animated background elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-indigo-300/20 to-violet-300/20 blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 left-[5%] w-96 h-96 rounded-full bg-gradient-to-r from-purple-300/20 to-pink-300/20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 px-3 py-1 bg-black/5 rounded-full text-sm font-medium animate-fade-in">
            Color tools for designers and developers
          </div>

          <h1
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Generate your perfect{" "}
            <span
              style={{
                //color: '#9D4EDD', // Fallback
                color: "oklch(0.511 0.262 276.966)",
              }}
            >
              color palettes instantly
            </span>
          </h1>

          <p
            className="text-xl text-gray-600 mb-8 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            UColorr is a FREE color palette generator that help you design with
            confidence. You can generate perfect scales, build hamonious
            palettes, get beautiful random palettes, extract colors from images
            and much more{" "}
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <CTAButton
              href="/harmony-palette"
              variant="primary"
              className="animate-fade-in text-lg"
            >
              Get Your Palette
            </CTAButton>
            <CTAButton href="#features" variant="secondary" className="text-lg">
              Explore features
            </CTAButton>
          </div>
        </div>

        {/* Preview image */}

        <PreviewImageLanding />

        {/* Stats or social proof */}
        {/*<div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-3xl mx-auto">
          <div
            className="animate-fade-in-delay"
            style={{ animationDelay: "0.8s" }}
          >
            <div className="text-3xl font-bold">10k+</div>
            <div className="text-gray-600">Designers</div>
          </div>
          <div
            className="animate-fade-in-delay"
            style={{ animationDelay: "1s" }}
          >
            <div className="text-3xl font-bold">5M+</div>
            <div className="text-gray-600">Palettes</div>
          </div>
          <div
            className="animate-fade-in-delay"
            style={{ animationDelay: "1.2s" }}
          >
            <div className="text-3xl font-bold">100k+</div>
            <div className="text-gray-600">Projects</div>
          </div>
          <div
            className="animate-fade-in-delay"
            style={{ animationDelay: "1.4s" }}
          >
            <div className="text-3xl font-bold">4.9</div>
            <div className="text-gray-600">Rating</div>
          </div>
        </div>*/}
      </div>
    </section>
  )
}
