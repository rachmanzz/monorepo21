"use client";

import { Divider, ListItemText, Paper, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemsUser from "../../../components/ListItemUser";
import { ButtonRefreshUsers } from "../../../components/ButtonLoadUser";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import ModalCreateUser from "../../../components/ModalCreateUser";


export default function DashboardComponent() {
    const [wannaCreateUser, setModalCreateUser] = useState(false)
    return (
        <>
            <Paper sx={{ width: { xs: "100%", lg: "50%" } }}>
                <List dense>
                    <ListItem
                        secondaryAction={<ButtonRefreshUsers />}>
                        <Typography variant="h6">USER LIST</Typography>
                    </ListItem>
                    <Divider />
                    <ListItemsUser />
                    <Divider />
                    <ListItemButton onClick={()=> setModalCreateUser(true)} sx={{ mt: 1 }}>
                        <ListItemIcon sx={{ fontSize: 20 }}><AddIcon /></ListItemIcon>
                        <ListItemText
                            sx={{ my: 0 }}
                            primary="Add New User"
                        />
                    </ListItemButton>
                </List>
            </Paper>
            <ModalCreateUser open={wannaCreateUser} onClose={()=> setModalCreateUser(false)} />
        </>
    )
}