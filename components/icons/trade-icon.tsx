import * as React from "react"
import { SVGProps } from "react"

export function TradeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.81 127.46" {...props}>
      <defs>
        <linearGradient id="linear-gradient" x1="-562.35" y1="3143.82" x2="-526.67" y2="3111.28" gradientTransform="translate(564 3190.7) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4e8bc9" />
          <stop offset="1" stopColor="#3957a7" />
        </linearGradient>
        <linearGradient id="linear-gradient-2" x1="-470.14" y1="3186.73" x2="-441.31" y2="3159.04" gradientTransform="translate(564 3190.7) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4b78bc" />
          <stop offset="1" stopColor="#2e82c5" />
        </linearGradient>
        <linearGradient id="linear-gradient-3" x1="-468.56" y1="3099.26" x2="-435.16" y2="3064.44" gradientTransform="translate(564 3190.7) scale(1 -1)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4858a7" />
          <stop offset="1" stopColor="#394ca0" />
        </linearGradient>
      </defs>
      <g>
        <path fill="#64717c" d="M115.81 24.46l-10.24-8.67-34.89 41.23H23.48v13.42h47.2l34.89 41.23 10.24-8.67-33.23-39.27 33.23-39.27Z" />
        <path fill="url(#linear-gradient)" d="M20.12 83.85c11.11 0 20.12-9.01 20.12-20.12s-9.01-20.12-20.12-20.12S0 52.61 0 63.73s9.01 20.12 20.12 20.12Z" />
        <path fill="url(#linear-gradient-2)" d="M110.69 40.25c11.11 0 20.12-9.01 20.12-20.12S121.8 0 110.69 0s-20.12 9.01-20.12 20.13 9.01 20.12 20.12 20.12Z" />
        <path fill="url(#linear-gradient-3)" d="M110.69 127.46c11.11 0 20.12-9.01 20.12-20.12s-9.01-20.12-20.12-20.12-20.12 9.01-20.12 20.12 9.01 20.12 20.12 20.12Z" />
      </g>
    </svg>
  )
}
