'use client'

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr';
import { useDataApiMany } from "@src/lib/data";
import { useMemo } from "react";
import { EventSourceInput, EventInput } from "@fullcalendar/core";
import dayjs from "dayjs";

const PlanningComponent: React.FC = () => {
    const { data } = useDataApiMany('events', { fields: ['title', 'duration', 'next_start', 'description'] })

    const events: EventSourceInput = useMemo(() => {
        const evts: Array<EventInput> = [];
        if (data) {
            for (const event of data.data) {
                evts.push({
                    start: event.next_start,
                    title: event.title,
                    end: dayjs(event.next_start).add(event.duration, 'm').toDate(),
                })
            }
        }
        return evts;
    },
        [data])

    return <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        locale={frLocale}
        allDaySlot={false}
        slotMinTime={"12:00:00"}
        events={events}
    />
}

export default PlanningComponent