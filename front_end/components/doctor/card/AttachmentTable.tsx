import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { useAuth } from "../../../utils/useAuth";
import { TablePagination } from "@mui/material";

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
    price: number
) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
            },
        ],
    };
}
const createRow = ({ id, patient, doctor, createdAt, attachments }) => {
    return {
        id: id,
        patient: patient.name,
        doctor: doctor.name,
        createdAt: dayjs(createdAt).format("YYYY-MM-DD HH:mm"),
        attachments: attachments,
    };
};

function Row(props: { row: ReturnType<typeof createRow> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row" align="center">
                    {row.id}
                </TableCell>
                <TableCell align="center">{row.patient}</TableCell>
                <TableCell align="center">{row.doctor}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Đính kèm
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Tên file</TableCell>
                                        <TableCell align="center">
                                            Người tải lên
                                        </TableCell>
                                        <TableCell align="center">
                                            Hành động
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.attachments.map((historyRow) => (
                                        <TableRow key={historyRow.id}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.id}
                                            </TableCell>
                                            <TableCell>
                                                {historyRow.filename}
                                            </TableCell>
                                            <TableCell align="center">
                                                {historyRow.uploader}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton>
                                                    <DownloadIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const rowss = [
    createRow({
        id: 1,
        patient: {
            name: "Nguyễn Văn A",
        },
        doctor: {
            name: "Nguyễn Văn B",
        },
        createdAt: "2022-06-16T16:44:39+02:00",
        attachments: [
            { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
            {
                id: 3,
                filename: "abcd.pdf",
                uploader: "Nguyễn Văn C",
            },
        ],
    }),
    createRow({
        id: 2,
        patient: {
            name: "Nguyễn Văn A",
        },
        doctor: {
            name: "Nguyễn Văn B",
        },
        createdAt: "2022-06-16T16:44:39+02:00",
        attachments: [
            { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
            {
                id: 3,
                filename: "abcd.pdf",
                uploader: "Nguyễn Văn C",
            },
        ],
    }),
    createRow({
        id: 3,
        patient: {
            name: "Nguyễn Văn A",
        },
        doctor: {
            name: "Nguyễn Văn B",
        },
        createdAt: "2022-06-16T16:44:39+02:00",
        attachments: [
            { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
            {
                id: 3,
                filename: "abcd.pdf",
                uploader: "Nguyễn Văn C",
            },
        ],
    }),
    createRow({
      id: 4,
      patient: {
          name: "Nguyễn Văn A",
      },
      doctor: {
          name: "Nguyễn Văn B",
      },
      createdAt: "2022-06-16T16:44:39+02:00",
      attachments: [
          { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
          {
              id: 3,
              filename: "abcd.pdf",
              uploader: "Nguyễn Văn C",
          },
      ],
  }),
  createRow({
    id: 5,
    patient: {
        name: "Nguyễn Văn A",
    },
    doctor: {
        name: "Nguyễn Văn B",
    },
    createdAt: "2022-06-16T16:44:39+02:00",
    attachments: [
        { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
        {
            id: 3,
            filename: "abcd.pdf",
            uploader: "Nguyễn Văn C",
        },
    ],
}),
createRow({
  id: 6,
  patient: {
      name: "Nguyễn Văn A",
  },
  doctor: {
      name: "Nguyễn Văn B",
  },
  createdAt: "2022-06-16T16:44:39+02:00",
  attachments: [
      { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
      {
          id: 3,
          filename: "abcd.pdf",
          uploader: "Nguyễn Văn C",
      },
  ],
}),
createRow({
  id: 7,
  patient: {
      name: "Nguyễn Văn A",
  },
  doctor: {
      name: "Nguyễn Văn B",
  },
  createdAt: "2022-06-16T16:44:39+02:00",
  attachments: [
      { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
      {
          id: 3,
          filename: "abcd.pdf",
          uploader: "Nguyễn Văn C",
      },
  ],
}),
createRow({
  id: 8,
  patient: {
      name: "Nguyễn Văn A",
  },
  doctor: {
      name: "Nguyễn Văn B",
  },
  createdAt: "2022-06-16T16:44:39+02:00",
  attachments: [
      { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
      {
          id: 3,
          filename: "abcd.pdf",
          uploader: "Nguyễn Văn C",
      },
  ],
}),
createRow({
  id: 9,
  patient: {
      name: "Nguyễn Văn A",
  },
  doctor: {
      name: "Nguyễn Văn B",
  },
  createdAt: "2022-06-16T16:44:39+02:00",
  attachments: [
      { id: 1, filename: "abc.doc", uploader: "Nguyễn Văn B" },
      {
          id: 3,
          filename: "abcd.pdf",
          uploader: "Nguyễn Văn C",
      },
  ],
}),
];

const rows = [
    createData("Fr", 159, 6.0, 24, 4.0, 3.99),
    createData("Ic", 237, 9.0, 37, 4.3, 4.99),
    createData("Ec", 262, 16.0, 24, 6.0, 3.79),
    createData("Cu", 305, 3.7, 67, 4.3, 2.5),
    createData("Gi", 356, 16.0, 49, 3.9, 1.5),
];

export default function AttachmentTable() {
    const [rows, setRows] = useState<any>([]);
    const { accessToken } = useAuth();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchData = async () => {
        setRows(rowss);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
      <>
        <TableContainer component={Paper} sx={{maxHeight: 350}}>
            <Table stickyHeader aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            ID
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Người khám
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Bác sĩ
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Ngày tạo
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">
                            Hành động
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                            <Row key={row.id} row={row} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
}
