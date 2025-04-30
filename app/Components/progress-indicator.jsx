"use client"

import React from "react"
import { motion } from "framer-motion"
import { FileText, Camera, MapPin, Check } from "lucide-react"

export default function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { name: "Informations", icon: FileText },
    { name: "Photos", icon: Camera },
    { name: "Localisation & Prix", icon: MapPin },
  ]

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 border border-gray-100">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const StepIcon = step.icon
          const isActive = currentStep >= index + 1
          const isComplete = currentStep > index + 1

          return (
            <React.Fragment key={index}>
              {/* Step indicator */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 z-10 shadow-sm
                    ${isActive ? "bg-orange-500 text-white" : "bg-gray-100 text-gray-400"}`}
                >
                  {isComplete ? <Check className="h-5 w-5" /> : <StepIcon className="h-5 w-5" />}
                </div>
                <span
                  className={`mt-2 text-xs font-medium transition-colors duration-200
                    ${isActive ? "text-orange-500" : "text-gray-400"}`}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 h-0.5 relative">
                  <div className="absolute inset-0 bg-gray-200"></div>
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: isActive && index < currentStep - 1 ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-orange-500"
                  />
                </div>
              )}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}