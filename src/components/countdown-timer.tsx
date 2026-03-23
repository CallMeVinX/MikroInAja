'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface CountdownTimerProps {
  startTime: string // Format: "HH:MM"
}

export function CountdownTimer({ startTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const currentHours = now.getHours()
      const currentMinutes = now.getMinutes()
      const currentSeconds = now.getSeconds()

      const [startHours, startMinutes] = startTime.split(':').map(Number)

      const startDate = new Date()
      startDate.setHours(startHours, startMinutes, 0, 0)

      const diffMs = startDate.getTime() - now.getTime()

      if (diffMs <= 0) {
        setIsActive(false)
        setTimeLeft(null)
        return
      }

      setIsActive(true)
      const diffMins = Math.floor(diffMs / 60000)
      const diffSecs = Math.floor((diffMs % 60000) / 1000)

      if (diffMins > 60) {
        const hours = Math.floor(diffMins / 60)
        const mins = diffMins % 60
        setTimeLeft(`${hours}h ${mins}m`)
      } else {
        setTimeLeft(`${diffMins}m ${diffSecs}s`)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [startTime])

  if (!isActive || !timeLeft) {
    return null
  }

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-accent animate-pulse">
      <Clock className="h-4 w-4" />
      <span>{timeLeft}</span>
    </div>
  )
}
