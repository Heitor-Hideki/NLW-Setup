import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = [
    "D",
    "S",
    "T",
    "Q",
    "Q",
    "S",
    "S",
]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = Array<{
    id: string, 
    date: string,
    amount: number,
    completed: number,
}>

export function SummaryTable() {
    const [summary, setSummary] = useState<Summary>([])

    useEffect(() => {   
        api.get('summary').then(response => {
            setSummary(response.data)
        })
    }, [])

    return (
        <div className="w-full flex">
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekDays.map((weekDay, i) => {
                        return (
                            <div 
                                key={`${weekDay}-${i}`} 
                                className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
                            >
                                {weekDay}
                            </div>
                        )
                    })
                }
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {
                    summary.length > 0 && (
                        summaryDates.map(date => {
                            const dayInSummary = summary.find(day => {
                                return dayjs(date).isSame(day.date, 'day')
                            })
    
                            return (
                                <HabitDay 
                                    key={date.toString()} 
                                    date={date}
                                    amount={dayInSummary?.amount} 
                                    defaultCompleted={dayInSummary?.completed}
                                />
                            )
                        })
                    )
                }
                {
                    amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
                        return (
                            <div className="bg-zinc-900 w-10 h-10 text-white rounded flex justify-center items-center text-center opacity-40 cursor-not-allowed" key={i}>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}