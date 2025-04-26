"use client";
import React, { useState, useEffect } from 'react';

export default function PriceRangeSlider({ min, max, onChange }) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const getPercent = (value) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
  }, [min, max]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-5">
        <div className="relative">
          <input
            type="number"
            value={minVal}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMinVal(Math.min(value, maxVal - 1));
            }}
            className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span className="absolute left-2 -top-6 text-xs text-gray-500">Min</span>
        </div>
        <div className="relative">
          <input
            type="number"
            value={maxVal}
            onChange={(e) => {
              const value = Number(e.target.value);
              setMaxVal(Math.max(value, minVal + 1));
            }}
            className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span className="absolute right-2 -top-6 text-xs text-gray-500">Max</span>
        </div>
      </div>

      <div className="relative h-1 bg-gray-200 rounded-md w-full">
        <div
          className="absolute h-1 bg-orange-500 rounded-md"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={1}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(value);
          }}
          className="absolute w-full h-1 appearance-none pointer-events-none bg-transparent"
          style={{
            WebkitAppearance: 'none',
            zIndex: 3,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step={1}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(value);
          }}
          className="absolute w-full h-1 appearance-none pointer-events-none bg-transparent"
          style={{
            WebkitAppearance: 'none',
            zIndex: 4,
          }}
        />

        {/* Custom styling for the range inputs */}
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            pointer-events: all;
            width: 18px;
            height: 18px;
            background-color: white;
            border: 2px solid #FF8C00;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }

          input[type="range"]::-moz-range-thumb {
            pointer-events: all;
            width: 18px;
            height: 18px;
            background-color: white;
            border: 2px solid #FF8C00;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 1px 3px rgba(0,0,0,0.2);
          }

          input[type="range"]:focus::-webkit-slider-thumb {
            background-color: white;
            border: 2px solid #FF8C00;
            box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.2);
          }

          input[type="range"]:focus::-moz-range-thumb {
            background-color: white;
            border: 2px solid #FF8C00;
            box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.2);
          }
        `}</style>
      </div>

      <div className="flex justify-between mt-3">
        <span className="text-xs text-gray-500">{min.toFixed(0)}€</span>
        <span className="text-xs text-gray-500">{max.toFixed(0)}€</span>
      </div>
    </div>
  );
}
