"use client"
import { useState, useEffect, useRef } from "react"

export default function PriceRangeSlider({ min, max, onChange }) {
  const [minVal, setMinVal] = useState(min)
  const [maxVal, setMaxVal] = useState(max)
  const minValRef = useRef(min)
  const maxValRef = useRef(max)
  const range = useRef(null)

  // Convert to percentage
  const getPercent = (value) => {
    return Math.round(((value - min) / (max - min)) * 100)
  }

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, min, max])

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, min, max])

  // Get min and max values when their state changes
  useEffect(() => {
    // Use a debounce to prevent too many updates
    const timer = setTimeout(() => {
      onChange({ min: minVal, max: maxVal })
    }, 100)

    return () => clearTimeout(timer)
  }, [minVal, maxVal, onChange])

  return (
    <div className="relative h-7">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxVal - 1)
          setMinVal(value)
          minValRef.current = value
        }}
        className="absolute pointer-events-none appearance-none z-30 h-2 w-full opacity-0 cursor-pointer"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minVal + 1)
          setMaxVal(value)
          maxValRef.current = value
        }}
        className="absolute pointer-events-none appearance-none z-30 h-2 w-full opacity-0 cursor-pointer"
      />

      <div className="relative z-10 h-2">
        {/* Base line */}
        <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

        {/* Range line */}
        <div ref={range} className="absolute z-20 top-0 bottom-0 rounded-md bg-orange-500"></div>

        {/* Min thumb */}
        <div
          className="absolute z-30 w-5 h-5 top-1/2 -mt-2.5 -ml-2.5 rounded-full bg-orange-500 shadow cursor-grab"
          style={{ left: `${getPercent(minVal)}%` }}
        ></div>

        {/* Max thumb */}
        <div
          className="absolute z-30 w-5 h-5 top-1/2 -mt-2.5 -ml-2.5 rounded-full bg-orange-500 shadow cursor-grab"
          style={{ left: `${getPercent(maxVal)}%` }}
        ></div>
      </div>
    </div>
  )
}
