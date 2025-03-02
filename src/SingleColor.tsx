import React from "react"

type SingleColorProps = {
  color: string
  index: number
}

export const SingleColor = ({
  color,
  index,
}: SingleColorProps): React.JSX.Element => {
  const weight = 50 + index * 100
  return (
    <article
      style={{ backgroundColor: color }}
      className=" h-48 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
    >
      <div>
        <p>{weight}</p>
      </div>
      <div>
        <p>{color}</p>
      </div>
    </article>
  )
}
