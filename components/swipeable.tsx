"use client"

import type React from "react"
import { type ReactNode, useState } from "react"

export interface SwipeableProps {
    children: ReactNode
    onSwipeLeft?: () => void
    onSwipeRight?: () => void
    onSwipeUp?: () => void
    onSwipeDown?: () => void
}

// https://stackoverflow.com/questions/70612769/how-do-i-recognize-swipe-events-in-react
export default function Swipeable(props: SwipeableProps) {
    const [touchStartX, setTouchStartX] = useState<number | null>(null)
    const [touchEndX, setTouchEndX] = useState<number | null>(null)
    const [touchStartY, setTouchStartY] = useState<number | null>(null)
    const [touchEndY, setTouchEndY] = useState<number | null>(null)
    const minSwipeDistance = 50

    function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
        setTouchEndX(null)
        setTouchStartX(e.targetTouches[0].clientX)
        setTouchEndY(null)
        setTouchStartY(e.targetTouches[0].clientY)
    }

    function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
        setTouchEndX(e.targetTouches[0].clientX)
        setTouchEndY(e.targetTouches[0].clientY)
    }

    function onTouchEnd() {
        if (touchStartX !== null && touchEndX !== null) swipeHorizontal()
        if (touchStartY !== null && touchEndY !== null) swipeVertical()
    }

    function swipeHorizontal() {
        const xDistance = (touchStartX ?? 0) - (touchEndX ?? 0)
        const yDistance = (touchStartY ?? 0) - (touchEndY ?? 0)
        if (Math.abs(yDistance) >= Math.abs(xDistance)) {
            return
        }
        const isLeftSwipe = xDistance > minSwipeDistance
        const isRightSwipe = xDistance < -minSwipeDistance
        if (isLeftSwipe && props.onSwipeLeft) {
            props.onSwipeLeft()
        }
        if (isRightSwipe && props.onSwipeRight) {
            props.onSwipeRight()
        }
    }

    function swipeVertical() {
        const xDistance = (touchStartX ?? 0) - (touchEndX ?? 0)
        const yDistance = (touchStartY ?? 0) - (touchEndY ?? 0)
        if (Math.abs(xDistance) >= Math.abs(yDistance)) {
            return
        }
        const isUpSwipe = yDistance > minSwipeDistance
        const isDownSwipe = yDistance < -minSwipeDistance
        if (isDownSwipe && props.onSwipeDown) {
            props.onSwipeDown()
        }
        if (isUpSwipe && props.onSwipeUp) {
            props.onSwipeUp()
        }
    }

    return (
        <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
            {props.children}
        </div>
    )
}
