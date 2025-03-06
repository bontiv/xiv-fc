'use client'

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid';
import listGridPlugin from '@fullcalendar/list';
import frLocale from '@fullcalendar/core/locales/fr';
import { useDataApiMany } from "@src/lib/data";
import { useLayoutEffect, useMemo, useRef } from "react";
import { EventSourceInput, EventInput, Calendar, CalendarApi } from "@fullcalendar/core";
import dayjs from "dayjs";

const PlanningComponent: React.FC = () => {
    const { data } = useDataApiMany('events', { fields: ['title', 'duration', 'next_start', 'description'] })
    const calendar = useRef<FullCalendar>(null)

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

    function getView() {
        if (window != undefined && window.innerWidth < 750) {
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