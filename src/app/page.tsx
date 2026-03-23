'use client'

import { useState, useEffect } from 'react'
import { Clock, MapPin, MessageCircle, Sun, Moon, Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTheme } from 'next-themes'
import { DatePickerPopover } from '@/components/date-picker-popover'
import { CountdownTimer } from '@/components/countdown-timer'
import EmptySchedule from '@/components/empty-schedule'
import { format } from 'date-fns'

// Mock schedule data - day-based
const scheduleData = {
  Monday: [
    {
      id: 1,
      time: '08:00',
      endTime: '10:30',
      timeRange: '08:00 - 10:30',
      course: 'Web Development Fundamentals',
      lecturer: 'Dr. Ahmad Wijaya',
      room: 'Room 502',
    },
    {
      id: 2,
      time: '10:30',
      endTime: '12:00',
      timeRange: '10:30 - 12:00',
      course: 'Database Systems',
      lecturer: 'Prof. Rina Sutrisna',
      room: 'Lab 301',
    },
    {
      id: 4,
      time: '13:00',
      endTime: '14:30',
      timeRange: '13:00 - 14:30',
      course: 'Software Engineering',
      lecturer: 'Dr. Budi Santoso',
      room: 'Room 405',
    },
  ],
  Tuesday: [
    {
      id: 5,
      time: '09:00',
      endTime: '10:30',
      timeRange: '09:00 - 10:30',
      course: 'Mobile App Development',
      lecturer: 'Ir. Siti Nurhaliza',
      room: 'Lab 201',
    },
    {
      id: 6,
      time: '10:30',
      endTime: '12:00',
      timeRange: '10:30 - 12:00',
      course: 'UI/UX Design',
      lecturer: 'Nur Hidayat, M.Kom',
      room: 'Room 301',
    },
  ],
  Wednesday: [
    {
      id: 7,
      time: '08:00',
      endTime: '09:30',
      timeRange: '08:00 - 09:30',
      course: 'Artificial Intelligence',
      lecturer: 'Dr. Haryo Wicaksono',
      room: 'Room 502',
    },
    {
      id: 8,
      time: '09:30',
      endTime: '11:00',
      timeRange: '09:30 - 11:00',
      course: 'Cloud Computing',
      lecturer: 'Prof. Eka Prasetiyo',
      room: 'Lab 401',
    },
    {
      id: 9,
      time: '11:00',
      endTime: '12:30',
      timeRange: '11:00 - 12:30',
      course: 'Cybersecurity',
      lecturer: 'Drs. Handoko',
      room: 'Room 304',
    },
  ],
  Thursday: [
    {
      id: 10,
      time: '10:00',
      endTime: '11:30',
      timeRange: '10:00 - 11:30',
      course: 'Data Science',
      lecturer: 'Dr. Prihadi Utomo',
      room: 'Lab 302',
    },
    {
      id: 11,
      time: '11:30',
      endTime: '13:00',
      timeRange: '11:30 - 13:00',
      course: 'Machine Learning',
      lecturer: 'Prof. Bambang Irawan',
      room: 'Room 405',
    },
  ],
  Friday: [
    {
      id: 12,
      time: '08:00',
      endTime: '10:00',
      timeRange: '08:00 - 10:00',
      course: 'Project Management',
      lecturer: 'Ir. Suryanto',
      room: 'Room 501',
    },
    {
      id: 13,
      time: '10:00',
      endTime: '12:00',
      timeRange: '10:00 - 12:00',
      course: 'Capstone Project',
      lecturer: 'Dr. Agus Susilo',
      room: 'Lab 501',
    },
  ],
  Saturday: [],
}

// Map schedule by date (repeating weekly)
function getScheduleForDate(date: Date) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[date.getDay()]
  
  if (dayName === 'Sunday') {
    return []
  }
  
  return scheduleData[dayName as keyof typeof scheduleData] || []
}

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [activeDay, setActiveDay] = useState('Monday')
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  // Determine if we're in Case A (Today) or Case B (Future Date)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const isViewingToday = !selectedDate || selectedDate.getTime() === today.getTime()
  
  // Get schedule for the selected/current date
  const getScheduleForSelectedDate = () => {
    const dateToUse = selectedDate || today
    return getScheduleForDate(dateToUse)
  }

  const getNextClass = () => {
    for (const day of days) {
      const classes = scheduleData[day as keyof typeof scheduleData]
      if (classes.length > 0) {
        return { ...classes[0], day }
      }
    }
    return null
  }

  const formatDateDisplay = (date: Date) => {
    return format(date, 'EEEE, MMMM d, yyyy')
  }

  const nextClass = isViewingToday ? getNextClass() : null
  const selectedDayClasses = getScheduleForSelectedDate()
  const currentDayClasses = scheduleData[activeDay as keyof typeof scheduleData]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-4xl mx-auto px-4 py-4 md:px-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">K</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-balance">KulSkill</h1>
                <p className="text-xs text-muted-foreground">Mikroskil Schedule</p>
              </div>
            </div>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card p-2 hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-accent" />
                ) : (
                  <Moon className="h-5 w-5 text-primary" />
                ))}
            </button>
          </div>

          {/* Date Picker Row */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:block">Select Date:</span>
            <div className="flex-1 sm:flex-initial">
              <DatePickerPopover 
                date={selectedDate} 
                onDateChange={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 space-y-6 pb-24">
          {/* CASE A: Today's View - Show Next Class and Weekly Tabs */}
          {isViewingToday ? (
            <>
              {/* Next Class Card */}
              {nextClass && (
                <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-primary/10 to-accent/10 border-l-4 border-l-accent">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">
                          Next Class
                        </Badge>
                        <h2 className="text-2xl font-bold text-balance">{nextClass.course}</h2>
                      </div>
                      <Clock className="h-6 w-6 text-accent" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Time</p>
                        <p className="font-semibold text-sm">{nextClass.timeRange}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Day</p>
                        <p className="font-semibold text-sm">{nextClass.day}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-muted-foreground mb-1">Lecturer</p>
                        <p className="font-semibold text-sm">{nextClass.lecturer}</p>
                      </div>
                      {nextClass.time && (
                        <div className="col-span-2 flex justify-between items-center pt-2 border-t border-border">
                          <div className="flex items-center gap-2 bg-background/50 rounded-lg p-3 flex-1 mr-2">
                            <MapPin className="h-4 w-4 text-accent" />
                            <span className="font-medium text-sm">{nextClass.room}</span>
                          </div>
                          <CountdownTimer startTime={nextClass.time} />
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              )}

              {/* Weekly Schedule Tabs */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                  Weekly Schedule
                </h3>
                <Tabs value={activeDay} onValueChange={setActiveDay} className="w-full">
                  <ScrollArea className="w-full rounded-lg border border-border">
                    <TabsList className="inline-flex w-full rounded-none border-0 bg-muted p-0">
                      {days.map((day) => (
                        <TabsTrigger
                          key={day}
                          value={day}
                          className="flex-1 rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-accent data-[state=active]:bg-background transition-all"
                        >
                          {day.substring(0, 3)}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </ScrollArea>

                  {days.map((day) => (
                    <TabsContent key={day} value={day} className="mt-6 space-y-3">
                      {currentDayClasses.length === 0 && (
                        <EmptySchedule day={day} />
                      )}
                      {currentDayClasses.map((cls) => (
                        <Card
                          key={cls.id}
                          className="overflow-hidden hover:shadow-md transition-shadow hover:border-accent/50"
                        >
                          <div className="p-4 md:p-5">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                                  {cls.timeRange}
                                </p>
                                <h3 className="text-lg font-bold mb-2 text-balance">{cls.course}</h3>
                                <div className="space-y-1">
                                  <p className="text-sm text-muted-foreground">
                                    👨‍🏫 {cls.lecturer}
                                  </p>
                                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4 text-accent" />
                                    <span>{cls.room}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                                <Clock className="h-6 w-6 text-accent" />
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </>
          ) : (
            <>
              {/* CASE B: Future Date View - Show "Schedule for [Date]" header with Return Button */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">Schedule for</p>
                  <h2 className="text-2xl font-bold text-balance">
                    {selectedDate && formatDateDisplay(selectedDate)}
                  </h2>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(null)}
                  className="whitespace-nowrap"
                >
                  Return to Today
                </Button>
              </div>

              {/* Schedule List for Selected Date */}
              <div className="space-y-3">
                {selectedDayClasses.length === 0 && (
                  <EmptySchedule 
                    day={selectedDate ? format(selectedDate, 'EEEE') : 'This day'}
                  />
                )}
                {selectedDayClasses.map((cls) => (
                  <Card
                    key={cls.id}
                    className="overflow-hidden hover:shadow-md transition-shadow hover:border-accent/50"
                  >
                    <div className="p-4 md:p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                            {cls.timeRange}
                          </p>
                          <h3 className="text-lg font-bold mb-2 text-balance">{cls.course}</h3>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              👨‍🏫 {cls.lecturer}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4 text-accent" />
                              <span>{cls.room}</span>
                            </div>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10">
                          <Clock className="h-6 w-6 text-accent" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      {/* Floating Action Button - Share to WhatsApp */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => {
            const scheduledClasses = isViewingToday ? 
              scheduleData[activeDay as keyof typeof scheduleData] : 
              selectedDayClasses
            
            const dateLabel = isViewingToday ? 
              activeDay : 
              (selectedDate ? format(selectedDate, 'EEEE, MMMM d') : 'selected date')
            
            const scheduleText = scheduledClasses
              .map((cls) => `📚 ${cls.course}\n⏰ ${cls.timeRange}\n👨‍🏫 ${cls.lecturer}\n📍 ${cls.room}`)
              .join('\n\n')

            const message = `My KulSkill Schedule for ${dateLabel}:\n\n${scheduleText || 'No classes scheduled'}`
            const encodedMessage = encodeURIComponent(message)
            window.open(`https://wa.me/?text=${encodedMessage}`, '_blank')
          }}
          className="rounded-full shadow-lg hover:shadow-xl transition-all h-14 w-14 md:h-auto md:w-auto md:px-6 md:py-3 bg-gradient-to-r from-accent to-emerald-600 hover:from-accent/90 hover:to-emerald-700"
        >
          <MessageCircle className="h-6 w-6 md:mr-2" />
          <span className="hidden md:inline">Share to WhatsApp</span>
        </Button>
      </div>
    </div>
  )
}
