import chroma from "chroma-js";

export function hexToHsl(hex: string) : {h: number, s: number, l: number}  {
    const color = chroma(hex);
    const hsl = color.hsl();
    return {
        h: hsl[0] || 0, 
        s: hsl[1] || 0, 
        l: hsl[2] || 0,
    }

}

 export function hexToOklch(hex: string) : {l: number, c: number, h: number} {
    const color = chroma(hex);
    const oklch = color.oklch();
    return {
        l: oklch[0],
        c: oklch[1],
        h: oklch[2]
    }
}

