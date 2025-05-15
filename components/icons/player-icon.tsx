import * as React from "react"
import { SVGProps } from "react"

export function PlayerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115.46 139.23" {...props}>
      <defs>
        <linearGradient id="linear-gradient" x1="-553.81" y1="3723.51" x2="-562.39" y2="3723.51" gradientTransform="translate(564 3810.1) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#606161" />
          <stop offset="1" stopColor="#a09f9f" />
        </linearGradient>
        <radialGradient id="radial-gradient" cx="-2543.27" cy="2354.69" fx="-2543.27" fy="2354.69" r="1" gradientTransform="translate(150301.85 139173.76) scale(59.07 -59.07)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8a8a8a" />
          <stop offset="1" stopColor="#a09f9f" />
        </radialGradient>
        <radialGradient id="radial-gradient-2" cx="-2553.32" cy="2338.89" fx="-2553.32" fy="2338.89" r="1" gradientTransform="translate(370812 339666.92) scale(145.22 -145.22)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9e4e68" />
          <stop offset="1" stopColor="#59152b" />
        </radialGradient>
      </defs>
      <g>
        <path fill="url(#linear-gradient)" d="M10.2 71.31h3.39v30.56h-4.53c-3.31 0-6.14-2.39-6.7-5.65L.15 83.21c-1.06-6.22 3.74-11.9 10.05-11.9Z" />
        <path fill="url(#radial-gradient)" d="M61.13 6.79c-25.14 0-50.94 10.19-50.94 64.52v24.75c0 19.4 30.56 43.17 50.94 43.17s50.94-23.77 50.94-43.17v-24.75c0-54.33-25.8-64.52-50.94-64.52Z" />
        <path fill="url(#radial-gradient-2)" d="M61.13 0C34.02 0 27.17 10.19 27.17 10.19 16.15 11.81 3.4 25.69 3.4 44.15c0 10.3 2.22 15.07 6.79 40.75 3.4-40.75 6.79-54.33 13.59-54.33 10.18 0 10.18 6.79 39.99 6.79 17.06 0 24.53-6.79 31.32-6.79 16.98 0 16.98 47.91 16.98 54.33 2.73-25.15 3.39-31.75 3.39-40.75C115.46 22.79 99.78 0 61.13 0Z" />
      </g>
    </svg>
  )
}
