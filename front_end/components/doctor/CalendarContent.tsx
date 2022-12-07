import { Paper } from "@mui/material";
import TimeTable from "../time/TimeTable";
import { useEffect } from 'react';

interface CalendarContentProps {
    calendar?;
    onSaveData?;
}

export default function CalendarContent(props: CalendarContentProps) {
    return (
        <Paper sx={{ width: "100%", overflow: "auto" }}>
            <TimeTable calendar={props.calendar} onSaveData={props.onSaveData}/>
        </Paper>
    )
}