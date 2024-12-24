"use client";
import { AppDispatch } from '../store';
import {setError, setLoading, setUser} from "../features/userReducer"
import { DataResult, JSONResponseResultType } from '../dataType';
import { UserSchemaType } from '@repo/schema/src/user';

export const createUser = (token: string, payload: UserSchemaType) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(["create",true]))
    dispatch(setError(null))

    try {
        const url = new URL("/user", process.env.NEXT_PUBLIC_FIREBASE_URL_APIS ?? "http://localhost:5000")
        const response = await fetch(url, {
            cache: "no-cache",
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const data: JSONResponseResultType<DataResult<UserSchemaType>> = await response.json()
            dispatch(setUser(data.data!))
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
        dispatch(setError(error instanceof Error ? error.message : "unknown error create users"))
        dispatch(setLoading(false))
    }
}

