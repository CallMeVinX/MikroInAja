'use client'

import { Calendar, Smile } from 'lucide-react'

interface EmptyScheduleProps {
  day: string
}

export default function EmptySchedule({ day }: EmptyScheduleProps) {
  const messages = [
    "Go Skill Up!",
    "Time to focus on projects!",
    "Perfect time for self-study!",
    "Relax and recharge!",
    "Work on your passion project!",
  ]
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-4 flex-shrink-0">
        <Smile className="h-10 w-10 text-accent" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">No Classes on {day}</h3>
      <p className="text-base text-muted-foreground text-center mb-1">
        You have a free day!
      </p>
      <p className="text-sm font-medium text-accent">
        {randomMessage}
      </p>
    </div>
  )
}
