import React from 'react';


type SingleColorProps  = {
    color: string;
    index: number;
}

export const SingleColor = ({color, index} : SingleColorProps) : React.JSX.Element => {
    const weight = 50 + (index * 100);
  return (
    <article style={{ backgroundColor: color}}>
        <p>{weight}</p>
        <p>{color}</p>
    </article>
  )
}
 