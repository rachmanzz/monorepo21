"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataResult } from '../dataType';
import { UserSchemaType } from '@repo/schema/src/user';


type actType =  "none" | "create" | "update" | "delete" | "fetch" | "fetch-all"

interface UserState {
    users: DataResult<UserSchemaType>[];
    loading: boolean;
    error: string | null;
    act: actType
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    act: "none"
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<DataResult<UserSchemaType>[]>) => {
            state.users = action.payload;
        },
        setUser: (state, action: PayloadAction<DataResult<UserSchemaType>>) => {
            const nextUser = [...state.users, action.payload]
            state.users = nextUser;
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            const copyUsers = [...state.users]
            const nextUser = copyUsers.filter(it => it.id !== action.payload)
            state.users = nextUser;
        },
        setLoading: (state, action: PayloadAction<[actType, boolean]|boolean>) => {
            if (typeof action.payload === "boolean") {
                state.loading = action.payload
            } else {
                const [act, loading]= action.payload;
                state.act = act
                state.loading = loading
            }   
        },
        setError: (state, action: PayloadAction<string|null>) => {
            state.error = action.payload;
        },
    }
})

export const { setUsers, setUser, deleteUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;