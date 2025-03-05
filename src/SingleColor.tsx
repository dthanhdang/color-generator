import React from "react"

type SingleColorProps = {
  color: string
  index: number
  name: string
  weight: number
}

export const SingleColor = ({
  color,
  //index,
  name,
  weight,
}: SingleColorProps): React.JSX.Element => {
  //const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100
  return (
    <div
      className="h-64 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
      style={{ backgroundColor: color }}
    >
      <div className="text-center">
        <p className="font-bold">{color}</p>
        <p className="text-xs">{weight}</p>
        {name && <p className="text-sm">{name}</p>}
      </div>
    </div>
  )
}
