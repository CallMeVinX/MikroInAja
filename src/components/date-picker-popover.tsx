'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, X } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerPopoverProps {
  date: Date | null
  onDateChange: (date: Date | null) => void
}

export function DatePickerPopover({ date, onDateChange }: DatePickerPopoverProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const isToday = date && date.getTime() === today.getTime()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full md:w-auto justify-start text-left font-normal gap-2',
            !date && 'text-muted-foreground',
            isToday && 'bg-accent/10 border-accent'
          )}
        >
          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:inline">
            {isToday ? 'Today' : date ? format(date, 'MMM dd, yyyy') : 'Pick a date'}
          </span>
          <span className="sm:hidden">
            {isToday ? 'Today' : date ? format(date, 'MMM dd') : 'Date'}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={(selectedDate) => onDateChange(selectedDate ?? null)}
          disabled={(d) => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            return d < yesterday
          }}
          initialFocus
        />
        {date && !isToday && (
          <div className="border-t p-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDateChange(today)}
              className="w-full"
            >
              <X className="h-4 w-4 mr-2" />
              Return to Today
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
