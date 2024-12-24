"use client";
import { AppDispatch } from '../store';
import {setError, setLoading, setUsers} from "../features/userReducer"
import { DataResult, JSONResponseResultType } from '../dataType';
import { UserSchemaType } from '@repo/schema/src/user';

export const fetchUsers = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(["fetch-all",true]))
    dispatch(setError(null))

    try {
        const url = new URL("/users", process.env.NEXT_PUBLIC_FIREBASE_URL_APIS ?? "http://localhost:5000")
        const response = await fetch(url, {
            cache: "no-cache",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
        if (response.ok) {
            const data: JSONResponseResultType<DataResult<UserSchemaType>[]> = await response.json()
            dispatch(setUsers(data.data!))
        } else {
            if (response.status === 400) {
                dispatch(setError("bad request"))
            } else if (response.status === 404) {
                dispatch(setError("not found"))
            } else {
                dispatch(setError("api request error"))
            }
        }
        dispatch(setLoading(false))
    } catch (error) {
        dispatch(setError(error instanceof Error ? error.message : "unknown error fetch users"))
        dispatch(setLoading(false))
    }
}

