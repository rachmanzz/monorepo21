import { userSchema, UserSchemaType } from "@repo/schema/src/user";
import { useAppDispatch } from "@/store/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { useAuthToken } from "./AuthResolverProvider";
import { createUser } from "@/store/actions/userCreateAction";

type props = {
    open: boolean
    onClose: () => void
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #eee',
    boxShadow: 5,
    p: 2,
};
export default function ModalCreateUser({ open, onClose }: props) {
    const dispatch = useAppDispatch();
    const token = useAuthToken();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UserSchemaType>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit = (data: UserSchemaType) => {
        dispatch(createUser(token ?? "", data))
        reset()
        onClose()
    }
    return (
        <Modal
            aria-labelledby="modal-create-user"
            aria-describedby="modal-create-user-description"
            open={open} onClose={onClose}>
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create User
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mt: 2, display: "flex" }} flexDirection={"column"} gap={2}>
                        <TextField error={errors.firstName !== undefined} helperText={errors.firstName?.message ?? ""} fullWidth id="firstName-input" label="First Name" variant="outlined" {...register('firstName')} />
                        <TextField error={errors.lastName !== undefined} helperText={errors.lastName?.message ?? ""} fullWidth id="lastName-input" label="Last Name" variant="outlined" {...register('lastName')} />
                        <TextField error={errors.email !== undefined} helperText={errors.email?.message ?? ""} fullWidth id="email-input" label="Email" variant="outlined" {...register('email')} />
                        <TextField error={errors.phone !== undefined} helperText={errors.phone?.message ?? ""} fullWidth id="phone-input" label="Phone" variant="outlined" {...register('phone')} />
                        <FormControl fullWidth>
                            <InputLabel id="input-gender">Gender</InputLabel>
                            <Select
                                labelId="input-gender"
                                id="input-gender-select"
                                label="Gender"
                                defaultValue={"male"}
                                {...register('gender')}
                            >
                                <MenuItem value={"male"}>Male</MenuItem>
                                <MenuItem value={"female"}>Female</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained">Create User</Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    )
}