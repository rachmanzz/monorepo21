"use client";

import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { auth } from "@/config/firebaseConfig"
import { signInWithEmailAndPassword, browserSessionPersistence, setPersistence } from "firebase/auth";
import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const schema = z.object({
    email: z.string().email("email invalid"),
    password: z.string().min(6, "password length must be or more then 6"),
});

export default function LoginFrom() {
    const route = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: z.infer<typeof schema>) => {
        setErrorMessage(null)
        setLoading(true)
        setPersistence(auth, browserSessionPersistence)
            .then(() => signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
                setLoading(false)
                route.replace("/")
            }))
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_) => {
                setErrorMessage("Email or password invalid.")
                setLoading(false)
            })
    }

    return (
        <Stack sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper elevation={0} sx={{
                width: {
                    xs: "100%",
                    md: "600px"
                },
                minHeight: {
                    xs: "100%",
                    md: "300px"
                }
            }}>
                <Box sx={{ p: 2, }}>
                    <Typography variant="h3" sx={{ textAlign: "center" }}>Welcome Back</Typography>
                    <Typography sx={{ textAlign: "center" }}>Log in to your account</Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{ mt: 2, display: "flex" }} flexDirection={"column"} gap={2}>
                            <TextField autoComplete="off" error={errors.email !== undefined} helperText={errors.email?.message ?? ""} fullWidth id="email-input" label="Email" variant="outlined" {...register('email')} />
                            <TextField autoComplete="new-password" type="password" error={errors.password !== undefined} helperText={errors.password?.message ?? ""} fullWidth id="password-input" label="Password" variant="outlined" {...register('password')} />
                            {errorMessage && <Alert icon={<ErrorOutlineIcon fontSize="inherit" />} severity="error">
                               {errorMessage}
                            </Alert>}
                            <Button type="submit" variant="contained">{isLoading ? "Loading . . ." : "LOGIN"}</Button>
                        </Box>
                    </form>
                </Box>
            </Paper>
        </Stack>
    )
}