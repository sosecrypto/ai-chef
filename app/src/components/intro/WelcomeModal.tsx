'use client'

import { useState, useCallback } from 'react'
import { useFirstVisit } from '@/hooks/useFirstVisit'
import { IntroVideoPlayer } from './IntroVideoPlayer'

export function WelcomeModal() {
  const { isFirstVisit, isLoading, markAsVisited } = useFirstVisit()
  const [showModal, setShowModal] = useState(true)
  const [videoCompleted, setVideoCompleted] = useState(false)

  const handleSkip = useCallback(() => {
    markAsVisited()
    setShowModal(false)
  }, [markAsVisited])

  const handleStart = useCallback(() => {
    markAsVisited()
    setShowModal(false)
  }, [markAsVisited])

  const handleVideoComplete = useCallback(() => {
    setVideoCompleted(true)
  }, [])

  if (isLoading || !isFirstVisit || !showModal) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <IntroVideoPlayer onComplete={handleVideoComplete} autoPlay={true} />
        </div>

        <div className="flex items-center justify-between px-6 pb-6 gap-4">
          <button
            onClick={handleSkip}
            className="px-6 py-3 text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            건너뛰기
          </button>

          <button
            onClick={handleStart}
            className={`
              px-8 py-3 rounded-xl font-semibold text-white transition-all
              ${videoCompleted
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl scale-105'
                : 'bg-gray-300 cursor-not-allowed'
              }
            `}
            disabled={!videoCompleted}
          >
            🚀 시작하기
          </button>
        </div>
      </div>
    </div>
  )
}
