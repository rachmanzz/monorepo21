"use client";
import { AppDispatch } from '../store';
import {deleteUser, setError, setLoading} from "../features/userReducer"

export const deleteUserData = (token: string, doc_id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(["delete",true]))
    dispatch(setError(null))

    try {
        const url = new URL("/user/" + doc_id, process.env.NEXT_PUBLIC_FIREBASE_URL_APIS ?? "http://localhost:5000")
        const response = await fetch(url, {
            cache: "no-cache",
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (response.ok) {
            // respon ok should be deleted
            await response.json()
            dispatch(deleteUser(doc_id))
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

