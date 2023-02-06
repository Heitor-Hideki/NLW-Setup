import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

const availableWeekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feria",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

export function NewHabitForm() {
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    async function createNewHabit(event: FormEvent) {
        event.preventDefault()

        if(!title || weekDays.length === 0) {
            return alert('bruh')
        }

        await api.post('habits', {
            title,
            weekDays
        })

        setTitle('')
        setWeekDays([])

        alert('joia')
    }

    function handleToggleWeekDay(weekDay: number) {
        if(weekDays.includes(weekDay)){
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
            weekDaysWithRemovedOne.sort()

            setWeekDays(weekDaysWithRemovedOne)
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            weekDaysWithAddedOne.sort()

            setWeekDays(weekDaysWithAddedOne)
        }
    }

    return (
        <form className="w-full flex flex-col mt-6" onSubmit={createNewHabit}>
            <label htmlFor='title' className="font-semibold leading-tight">
                Qual o seu comprometimento?
            </label>

            <input 
                type='text'
                id='title'
                placeholder="ex.: Exercícios, dormir bem, etc..."
                autoFocus 
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                value={title}
                onChange={event => setTitle(event.target.value)}
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className='mt-3 flex flex-col gap-2'>
                {
                    availableWeekDays.map((weekDay, index) => {
                        return (
                            <Checkbox.Root 
                                className='flex items-center gap-3 group focus:outline-none'
                                key={weekDay}
                                checked={weekDays.includes(index)}
                                onCheckedChange={() => handleToggleWeekDay(index)}
                            >
                                <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-violet-600 group-data-[state=checked]:border-violet-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900'>
                                    <Checkbox.Indicator>
                                        <Check size={20} className='text-white'/>
                                    </Checkbox.Indicator>
                                </div>

                                <span className='text-white leading-tight'>
                                    {weekDay}
                                </span>
                            </Checkbox.Root>
                        )
                    })
                }
            </div>

            <button 
                type="submit" 
                className="mt-6 rounded-lg p-4 gap-3 flex items-center justify-center font-semibold bg-violet-600 hover:bg-violet-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            >
                <Check size={28} weight='bold'/>
                Confirmar
            </button>
        </form>
    )
}