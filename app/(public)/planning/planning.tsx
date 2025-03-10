'use client'

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { useDataApiMany } from "@src/lib/data";
import { useLayoutEffect, useMemo, useRef } from "react";
import { EventSourceInput, EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";
import objectSupport from 'dayjs/plugin/objectSupport';

dayjs.extend(objectSupport)

const PlanningComponent: React.FC = () => {
    const { data } = useDataApiMany('events', { fields: ['title', 'duration', 'next_start', 'description', 'schedule'] })
    const calendar = useRef<FullCalendar>(null)

    const events: EventSourceInput = useMemo(() => {
        const evts: Array<EventInput> = [];
        if (data) {
            const monday = dayjs().day(1)
            for (const event of data.data) {
                if (event.schedule) {
                    const [min, hours, dayOfMonth, mounth, dayOfWeek] = event.schedule.split(' ')
                    const start = dayjs({ minute: Number(min), hour: Number(hours) })
                    evts.push({
                        title: event.title,
                        startRecur: monday.toDate(),
                        startTime: start.format('HH:mm:ss'),
                        endTime: start.add(event.duration, 'm').format('HH:mm:ss'),
                        daysOfWeek: dayOfWeek == '*' ? [0, 1, 2, 3, 4, 5, 6] : dayOfWeek.split(',').map((x: string) => Number(x) % 7)
                    })

                } else {
                    evts.push({
                        start: event.next_start,
                        title: event.title,
                        end: dayjs(event.next_start).add(event.duration, 'm').toDate(),
                    })
                }
            }
        }
        return evts;
    },
        [data])

    function getView() {
        if (typeof window != 'undefined' && window.innerWidth < 750) {
            return 'listMonth'
        } else {
            return 'timeGridWeek'
        }
    }

    useLayoutEffect(() => {
        if (typeof window == 'undefined')
            return
        function onResize() {
            calendar.current?.getApi().changeView(getView())
        }
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return <FullCalendar
        ref={calendar}
        plugins={[timeGridPlugin, listGridPlugin]}
        initialView={getView()}
        locale={frLocale}
        allDaySlot={false}
        slotMinTime={"12:00:00"}
        events={events}
    />
}

export default PlanningComponent