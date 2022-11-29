import * as React from "react";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import MedicationLiquidTwoToneIcon from "@mui/icons-material/MedicationLiquidTwoTone";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const item = {
    py: "12px",
    px: 3,
    color: "rgba(255, 255, 255, 0.7)",
    "&:hover, &:focus": {
        bgcolor: "rgba(255, 255, 255, 0.08)",
    },
};

const itemCategory = {
    boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
    py: 1.5,
    px: 3,
};

export default function Navigator(props) {
    const { ...other } = props.PaperProps;
    const [categories, setCategories] = useState([...props.categories]);
    const [choosing, setChoosing] = useState(props.choosing);
    const [homePage, setHomepage] = useState(props.home);
    const router = useRouter();

    useEffect(() => {
        let temp = [...categories];
        temp.forEach((category) => {
            category.children.forEach((item) => {
                if (item.id == props.choosing) item.active = true;
                else item.active = false;
            });
        });
        setCategories(temp);
    }, [choosing]);

    return (
        <Drawer variant="permanent" {...other}>
            <List disablePadding>
                <ListItem
                    sx={{
                        ...item,
                        ...itemCategory,
                        fontSize: 22,
                        color: "#fff",
                        fontFamily: "fantasy",
                    }}
                >
                    <MedicationLiquidTwoToneIcon fontSize="large" />
                    &nbsp;&nbsp;Saphira
                </ListItem>
                <ListItem sx={{ ...item, ...itemCategory }} selected={choosing == "home"} onClick={() => router.push(homePage)}>
                    <ListItemButton>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText>Home</ListItemText>
                    </ListItemButton>
                </ListItem>
                {categories.map(({ id, children }) => (
                    <Box key={id} sx={{ bgcolor: "#101F33" }}>
                        <ListItem sx={{ py: 2, px: 3 }}>
                            <ListItemText
                                sx={{ color: "#fff", fontWeight: 500 }}
                            >
                                <b>{id}</b>
                            </ListItemText>
                        </ListItem>
                        {children.map(
                            ({ id: childId, text, icon, active, route }) => (
                                <ListItem disablePadding key={childId}>
                                    <ListItemButton
                                        selected={active}
                                        sx={item}
                                        onClick={() => {
                                            router.push(route ?? "/sample");
                                        }}
                                    >
                                        <ListItemIcon>{icon}</ListItemIcon>
                                        <ListItemText>{text}</ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        )}
                        <Divider sx={{ mt: 2 }} />
                    </Box>
                ))}
            </List>
        </Drawer>
    );
}
