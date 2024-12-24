import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Box, keyframes, Typography } from "@mui/material";
import ButtonLoadUser from "./ButtonLoadUser";
import { deleteUserData } from "@/store/actions/userDeleteAction";
import { useAuthToken } from "./AuthResolverProvider";

const pulse = keyframes`
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    `;
export default function ListItemsUser() {

    const { users, loading, error } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    const token = useAuthToken();
    if (loading) {
        return (<Box display={"flex"} p={2} justifyContent={"center"}>
            <Typography sx={{ animation: `${pulse} 1.5s infinite` }}>LOADING . . .</Typography>
        </Box>)
    }
    if (error) {
        return (<Box display={"flex"} p={2} justifyContent={"center"}>
            <Typography sx={{color: "red"}} >{error}</Typography>
        </Box>)
    }
    if (users.length === 0) {
        return <ButtonLoadUser />
    }
    return (
        <>
            {
                users.map(
                    (it, index) => (
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={()=> dispatch(deleteUserData(token ?? "", it.id))} edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                            key={index}>
                            <ListItemAvatar>
                                <Avatar alt={it.firstName} src={`https://i.pravatar.cc/150?u=${it.id}`} />
                            </ListItemAvatar>
                            <ListItemText primary={it.firstName} />
                        </ListItem>
                        
                    )
                )
            }
        </>
    )
}