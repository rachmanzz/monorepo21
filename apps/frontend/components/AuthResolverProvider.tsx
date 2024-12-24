"use client";

import { onIdTokenChanged } from "firebase/auth";

import { auth } from "@/config/firebaseConfig";
import { useEffect, useContext, createContext, useState } from "react";
import { useRouter } from 'next/navigation';
import MainPageLoadingSkeleton from "./MainPageLoadingSkeleton";

const TokenContext = createContext<string|null>(null)

export const useAuthToken = ()=> useContext(TokenContext)

export default function AuthResolverProvider ({children}: {children: React.ReactNode}) {
    const route = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [token, setToken] = useState<string>(null!)
    useEffect(()=> {
        const unsubscribe = onIdTokenChanged(auth, (user) => {
            if (!user) {
                route.replace("/login")
                return
            }
            user.getIdToken(true)
            .then(setToken)
        })

        return unsubscribe;
    }, [route])
    return (<TokenContext.Provider value={token}>{token ? children : <MainPageLoadingSkeleton />}</TokenContext.Provider>)
}