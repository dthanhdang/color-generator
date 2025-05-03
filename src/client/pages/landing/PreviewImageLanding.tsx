import { useState } from "react"

export const PreviewImageLanding = () => {
  // Déclaration de l'état pour la couleur sélectionnée
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div className="mt-16 rounded-xl overflow-hidden shadow-2xl max-w-4xl mx-auto animate-fade-in-delay">
      <div className="aspect-[16/9] bg-gradient-to-r from-gray-100 to-gray-50 flex items-center justify-center p-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 w-full">
          {[
            { color: "#f4bf44", name: "Casablanca" },
            { color: "#fc69b8", name: "Hot Pink" },
            { color: "#05e8a2", name: "Caribbean" },
            { color: "#f48752", name: "Jaffa" },
            { color: "#b384fd", name: "Heliotrope" },
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
