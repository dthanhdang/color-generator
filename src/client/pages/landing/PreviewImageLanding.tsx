import React, { useState } from "react"

export const PreviewImageLanding = () => {
  // Déclaration de l'état pour la couleur sélectionnée
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mt-16 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-delay">
      <div className="aspect-[16/9] bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center p-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 w-full">
          {[
            { color: "#f2a1c5", name: "Illusion" },
            { color: "#a4d6d4", name: "Sinbad" },
            { color: "#cea1f2", name: "Perfume" },
            { color: "#f4cf3e", name: "Saffron" },
            { color: "#f2a1ee", name: "Lavender" },
          ].map((item) => (
            <div
              key={item.color}
              className="h-96 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center space-y-2 cursor-pointer"
              style={{
                outline:
                  selected === item.color ? `2px solid ${item.color}` : "none",
                outlineOffset: "2px",
              }}
              onClick={() => setSelected(item.color)}
            >
              <div
                className="w-full h-full rounded-md"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-center mt-2">
                <p className="text-sm font-medium text-gray-900">
                  {item.color}
                </p>
                <p className="text-xs text-gray-700">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

{
  /*import React, { useState } from "react"

export const PreviewImageLanding = () => {
  // Déclaration de l'état pour la couleur sélectionnée
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mt-16 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-delay">
      <div className="aspect-[16/9] bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center p-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 w-full">
          {[
            { color: "#404dbf", name: "Indigo" },
            { color: "#8e66cc", name: "Amethyst" },
            { color: "#8cbad9", name: "Half Baked" },
            { color: "#b3b8e5", name: "Spindle" },
            { color: "#e3d9f2", name: "French Lilac" },
          ].map((item) => (
            <div
              key={item.color}
              className={`h-96 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center space-y-2 cursor-pointer ${
                selected === item.color
                  ? "ring-2 ring-offset-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => setSelected(item.color)}
            >
              <div
                className="w-full h-full rounded-md"
                style={{ backgroundColor: item.color }}
              />
              <div className="text-center mt-2">
                <p className="text-sm font-medium text-gray-900">
                  {item.color}
                </p>
                <p className="text-xs text-gray-700">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}*/
}
