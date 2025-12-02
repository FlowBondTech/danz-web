'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiCheck,
} from 'react-icons/fi'

interface DatePickerProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  minDate?: Date
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function DatePicker({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  minDate,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(value)
    return new Date()
  })
  const [tempDate, setTempDate] = useState(value)

  useEffect(() => {
    if (isOpen) {
      setTempDate(value)
      if (value) {
        setViewDate(new Date(value))
      }
    }
  }, [isOpen, value])

  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear()
    const month = viewDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPadding = firstDay.getDay()
    const days: { date: Date; isCurrentMonth: boolean; isDisabled: boolean }[] = []

    for (let i = startPadding - 1; i >= 0; i--) {
      const date = new Date(year, month, -i)
      days.push({
        date,
        isCurrentMonth: false,
        isDisabled: minDate ? date < new Date(minDate.setHours(0, 0, 0, 0)) : false,
      })
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      days.push({
        date,
        isCurrentMonth: true,
        isDisabled: minDate ? date < today : false,
      })
    }

    const remaining = 42 - days.length
    for (let i = 1; i <= remaining; i++) {
      const date = new Date(year, month + 1, i)
      days.push({ date, isCurrentMonth: false, isDisabled: false })
    }

    return days
  }, [viewDate, minDate])

  const handleDateSelect = (date: Date) => {
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    setTempDate(dateStr)
  }

  const handleConfirm = () => {
    if (tempDate) {
      onChange(tempDate)
    }
    setIsOpen(false)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelected = (date: Date) => {
    if (!tempDate) return false
    const selected = new Date(tempDate)
    return date.getDate() === selected.getDate() &&
           date.getMonth() === selected.getMonth() &&
           date.getFullYear() === selected.getFullYear()
  }

  const formatDisplayValue = () => {
    if (!value) return ''
    const date = new Date(value)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-white/5 text-white rounded-xl px-4 py-3 border border-white/10 focus:border-neon-purple/50 focus:outline-none hover:bg-white/10 transition-colors text-left flex items-center gap-3"
      >
        <FiCalendar className="w-5 h-5 text-neon-purple flex-shrink-0" />
        <span className={value ? 'text-white' : 'text-text-secondary'}>
          {formatDisplayValue() || placeholder}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-bg-secondary rounded-t-3xl sm:rounded-2xl border border-white/10 w-full sm:max-w-sm max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{label || 'Select Date'}</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-text-secondary" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  <h4 className="text-lg font-bold text-white">
                    {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                  </h4>
                  <button
                    onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {DAYS.map(day => (
                    <div key={day} className="text-center text-xs text-text-secondary py-2 font-medium">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => !day.isDisabled && handleDateSelect(day.date)}
                      disabled={day.isDisabled}
                      className={`
                        aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                        ${!day.isCurrentMonth ? 'text-text-secondary/30' : ''}
                        ${day.isDisabled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/10'}
                        ${isToday(day.date) && !isSelected(day.date) ? 'ring-2 ring-neon-purple/50' : ''}
                        ${isSelected(day.date) ? 'bg-neon-purple text-white' : ''}
                      `}
                    >
                      {day.date.getDate()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={!tempDate}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl hover:opacity-90 disabled:opacity-50 transition-all font-medium flex items-center justify-center gap-2"
                >
                  <FiCheck className="w-5 h-5" />
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
