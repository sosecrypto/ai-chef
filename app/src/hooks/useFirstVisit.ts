'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'ai-chef-visited'

export function useFirstVisit() {
  const [isFirstVisit, setIsFirstVisit] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const visited = localStorage.getItem(STORAGE_KEY)
    if (!visited) {
      setIsFirstVisit(true)
    }
    setIsLoading(false)
  }, [])

  const markAsVisited = () => {
    localStorage.setItem(STORAGE_KEY, 'true')
    setIsFirstVisit(false)
  }

  const resetVisit = () => {
    localStorage.removeItem(STORAGE_KEY)
    setIsFirstVisit(true)
  }

  return {
    isFirstVisit,
    isLoading,
    markAsVisited,
    resetVisit,
  }
}
