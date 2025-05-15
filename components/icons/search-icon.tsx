import * as React from "react"
import { SVGProps } from "react"

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.84 115.83" {...props}>
      <defs>
        <linearGradient id="linear-gradient" x1="-526.62" y1="3736.81" x2="-559.98" y2="3704.84" gradientTransform="translate(564 3815.9) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a09f9f" />
          <stop offset="1" stopColor="#3a3a3a" />
        </linearGradient>
        <linearGradient id="linear-gradient-2" x1="-462.38" y1="3801.68" x2="-527.33" y2="3736.73" gradientTransform="translate(564 3815.9) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b3e1eb" />
          <stop offset=".22" stopColor="#acdfeb" />
          <stop offset=".53" stopColor="#9ddbed" />
          <stop offset=".89" stopColor="#7ed3f1" />
          <stop offset="1" stopColor="#70d0f4" />
        </linearGradient>
        <radialGradient id="radial-gradient" cx="-2865.43" cy="2310.21" fx="-2865.43" fy="2310.21" r="1" gradientTransform="translate(-92180.21 -317492.41) rotate(-145.08) scale(89.85 -89.85)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#666766" />
          <stop offset="1" stopColor="#a09f9f" />
        </radialGradient>
      </defs>
      <g>
        <path fill="url(#linear-gradient)" d="M43.32 82.75l-10.24-10.24L.43 105.17c-.57.56-.57 1.48 0 2.05l8.19 8.19c.56.56 1.48.56 2.04 0l32.66-32.65Z" />
        <path fill="url(#linear-gradient-2)" stroke="url(#radial-gradient)" strokeWidth={11.12} d="M110.28 46.33c0 22.52-18.26 40.77-40.78 40.77-22.51 0-40.77-18.26-40.77-40.77S46.99 5.56 69.5 5.56s40.78 18.25 40.78 40.77Z" />
      </g>
    </svg>
  )
}
