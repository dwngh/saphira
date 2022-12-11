import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import Box from "@mui/material/Box";
import CalendarService from "../../service/CalendarService";
import { useAuth } from "../../utils/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function replaceAt(str, id, replacement) {
    return str.substring(0, id) + replacement + str.substring(id + 1);
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

interface TimeTableInterface {
    calendar;
    onSaveData;
}

export default function TimeTable(props: TimeTableInterface) {
    const [rows, setRows] = useState<any>([]);
    const [shiftStr, setShiftStr] = useState(
        "00000000000000000000000000000000000000000000000000000000"
    );
    const [limit, setLimit] = useState(0);
    const [hasChange, setHasChange] = useState(false);
    const [enable, setEnable] = useState(false);
    const { accessToken } = useAuth();
    const { updateCalendar } = CalendarService();

    useEffect(() => {
        setShiftStr(props?.calendar?.avail);
        setLimit(props?.calendar?.limit);
    }, [props.calendar]);

    const handleLimitChange = (e) => {
        let nLimit = +e.target.value
        if (nLimit < 0) toast.error("Giới hạn yêu cầu không thể nhỏ hơn 0");
        else {
            setLimit(nLimit);
        if (nLimit != props?.calendar?.limit) setHasChange(true);
        }
        
    }

    const onCheckShift = (e) => {
        let id = +e.currentTarget.id;
        let nShiftStr = replaceAt(
            shiftStr,
            id,
            shiftStr[id] == "1" ? "0" : "1"
        );
        if (nShiftStr === props.calendar.avail) setHasChange(false);
        else setHasChange(true);
        setShiftStr(nShiftStr);
    };

    const createRow = (shift, sIndex) => {
        let temp = shiftStr;
        if (temp) {
            const shiftList: JSX.Element[] = [];
            for (let i = 0; i < 7; i++) {
                let id = sIndex + i * 8;
                shiftList.push(
                    <Checkbox
                        id={id + ""}
                        checked={temp[id] == "1"}
                        onChange={onCheckShift}
                        key={id + ""}
                    />
                );
            }
            return { shift, shiftList };
        } else return { shift, shiftList: [] };
    };

    const onReset = () => {
        setShiftStr(props.calendar.avail);
        setLimit(props.calendar.limit)
        setHasChange(false);
    };

    const onSave = async () => {
        const obj = { ...props.calendar };
        obj.avail = shiftStr;
        obj.limit = limit;
        let r = await updateCalendar(obj, accessToken);
        if (r?.affected == 1) {
            toast.success("Đã cập nhật lại cài đặt");
            setHasChange(false);
            await props.onSaveData();
        } else toast.warning("Cập nhật chưa thành công");
    };

    useEffect(() => {
        setRows([
            createRow("7h00 - 8h00", 0),
            createRow("8h00 - 9h00", 1),
            createRow("9h00 - 10h00", 2),
            createRow("10h00 - 11h00", 3),
            createRow("13h30 - 14h30", 4),
            createRow("14h30 - 15h30", 5),
            createRow("15h30 - 16h30", 6),
            createRow("16h30 - 17h30", 7),
        ]);
        if (
            shiftStr ===
            "00000000000000000000000000000000000000000000000000000000"
        )
            setEnable(false);
        else setEnable(true);
    }, [shiftStr]);
    // if (
    //     shiftStr === props.calendar.avail
    // )
    //     setHasChange(false);
    // else setHasChange(true);
    return (
        <TableContainer component={Paper}>
            <Grid container>
                <Grid item xs={2}>
                    <FormControlLabel
                        control={
                            <Switch checked={enable} onChange={() => {}} />
                        }
                        label="Lịch cụ thể"
                        sx={{ m: 2 }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <TextField
                        id="outlined-number"
                        label="Giới hạn yêu cầu trong 1 ca"
                        type="number"
                        value={limit}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleLimitChange}
                        sx={{m: 1, height: 2, width: 200}}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Typography variant="caption" sx={{margin: 2}}>Mặc định 0 là tắt giới hạn</Typography>
                </Grid>
                <Grid item xs={3}>
                    <Box
                        m={2}
                        //margin
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                    >
                        <IconButton disabled={!hasChange} onClick={onReset}>
                            <CachedIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            disabled={!hasChange}
                            onClick={onSave}
                        >
                            Lưu
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Table
                sx={{ minWidth: 700 }}
                aria-label="a dense table"
                size="small"
            >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Ca trong ngày</StyledTableCell>
                        <StyledTableCell align="right">Thứ hai</StyledTableCell>
                        <StyledTableCell align="right">Thứ ba</StyledTableCell>
                        <StyledTableCell align="right">Thứ tư</StyledTableCell>
                        <StyledTableCell align="right">Thứ năm</StyledTableCell>
                        <StyledTableCell align="right">Thứ sáu</StyledTableCell>
                        <StyledTableCell align="right">Thứ bảy</StyledTableCell>
                        <StyledTableCell align="right">
                            Chủ nhật
                        </StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.shift}>
                            <StyledTableCell component="th" scope="row">
                                {row.shift}
                            </StyledTableCell>
                            {row.shiftList.map((shift) => (
                                <StyledTableCell align="right">
                                    {shift}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <ToastContainer />
        </TableContainer>
    );
}
