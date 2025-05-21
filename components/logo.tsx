export default function Logo() {
    return (
        <div className="flex items-center">
            <svg
                width="40"
                height="40"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="32" height="32" rx="8" fill="#D9D9D9" />
                <rect x="7" y="7" width="10" height="14" rx="2" fill="#191919" />
                <rect x="19" y="7" width="6" height="6" rx="2" fill="#191919" />
            </svg>
        </div>
    )
}

export function Logo2() {
    return (
        <div className="flex items-center">
            <svg height="40" width="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                <g>
                    <rect width="40" height="40" rx="10" ry="10" fill="#D9D9D9" />
                    <g>
                        <path
                            fill="#181818"
                            d="m14.62,26.94v-5.05c0-.34.28-.62.62-.62h12.18c.34,0,.62-.28.62-.62v-1.23c0-.53.62-.82,1.03-.47,1.97,1.69,3.86,3.31,5.8,4.98.29.25.29.69,0,.94-1.92,1.65-3.81,3.28-5.78,4.97-.4.35-1.03.06-1.03-.47v-1.18c0-.34-.28-.62-.62-.62h-12.21c-.34,0-.62-.28-.62-.62Z"
                        />
                        <path
                            fill="#181818"
                            d="m5.17,14.85c1.81-1.55,3.58-3.07,5.4-4.64.5-.43,1.27-.08,1.27.58v.7c0,.43.35.77.77.77h11.88c.43,0,.77.35.77.77v4.75c0,.43-.35.77-.77.77h-11.85c-.43,0-.77.35-.77.77v.76c0,.66-.77,1.01-1.27.58-1.84-1.57-3.61-3.09-5.43-4.65-.36-.31-.36-.86,0-1.17Z"
                        />
                    </g>
                </g>
            </svg>
        </div>
    )
}
