import { Button, Divider, Paper, Typography, Box, Grid } from "@mui/material";
import { useEffect } from "react";

interface ShiftLabelProps {
    shift;
    status;
    onShiftChoose: (e) => void;
}

const shiftList = [
    "7h00 - 8h00",
    "8h00 - 9h00",
    "9h00 - 10h00",
    "10h00 - 11h00",
    "13h30 - 14h30",
    "14h30 - 15h30",
    "15h30 - 16h30",
    "16h30 - 17h30",
];

// Status Value:
//     Normal: 0
//     Choosed: 1
//     Disable: 2
function ShiftLabel(props: ShiftLabelProps) {
    let shift = shiftList[props.shift];
    let variant = "outlined";
    if (props.status == 1) variant = "contained";
    return (
        <Button
            id={props.shift}
            type="submit"
            color="primary"
            variant={props.status == 1 ? "contained" : "outlined"}
            sx={{
                borderRadius: 28,
                margin: 1,
                paddingLeft: 2,
                paddingRight: 2,
            }}
            onClick={props.onShiftChoose}
            disabled={props.status == 2}
        >
            {shift}
        </Button>
    );
}

interface ShiftListProps {
    choosedShift;
    enable: boolean;
    avail?;
    onChooseShift: (e) => void;
    small?;
}

export default function ShiftList(props: ShiftListProps) {
    return (
        <Paper
            elevation={1}
            sx={
                props.small ? { marginTop: 3, maxWidth: 600 } : { marginTop: 3 }
            }
        >
            <Typography variant="subtitle1" component="div">
                <Grid container>
                    {shiftList.map((shift, index) => {
                        const rows = [<Box key={"box-" + index} />];
                        let df = props.enable ? 0 : 2;
                        let status;
                        if (index == props.choosedShift) status = 1;
                        if (index == 0) rows.push(<Divider />);
                        if (index == 4) rows.push(<Grid xs={2}></Grid>);
                        rows.push(
                            <Grid xs={2.5}>
                                <ShiftLabel
                                    shift={index}
                                    status={
                                        status ??
                                        (props.avail
                                            ? props.avail[index] == "1"
                                                ? df
                                                : 2
                                            : 2)
                                    }
                                    onShiftChoose={
                                        props.enable
                                            ? props.onChooseShift
                                            : () =>
                                                  alert("Editing is disabled!")
                                    }
                                />
                            </Grid>
                        );
                        return rows;
                    })}
                </Grid>
            </Typography>
        </Paper>
    );
}
