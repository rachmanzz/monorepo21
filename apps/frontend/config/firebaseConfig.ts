"use client";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "localhost",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ?? ""
}

export const app = initializeApp(config)
export const auth = getAuth(app);