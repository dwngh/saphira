import { Button, Divider, Paper, Typography } from "@mui/material";

interface ShiftLabelProps {
    shift;
    status;
    onShiftChoose: (e) => {};
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
            variant={variant}
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
    onChooseShift: (e) => void;
}

export default function ShiftList(props: ShiftListProps) {
    return (
        <Paper elevation={1} sx={{ marginTop: 3 }}>
            <Typography variant="subtitle1" component="div">
                {shiftList.map((shift, index) => {
                    const rows = [];
                    let status = 0;
                    if (index == props.choosedShift) status = 1;
                    if (index == 0) rows.push(<Divider />);
                    if (index == 4) rows.push(<Divider />);
                    rows.push(
                        <ShiftLabel
                            shift={index}
                            status={status}
                            onShiftChoose={props.enable ? props.onChooseShift : (() => alert("Editing is disabled!"))}
                        />
                    );
                    return rows;
                })}
            </Typography>
        </Paper>
    );
}
