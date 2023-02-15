import { initializeApp, cert, getApps  } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import  { service_account }  from "./secrets.js";

export default function dbConnect() {
    
    const isInitialized = getApps.length > 0
    if (!isInitialized) {
        initializeApp({
            credential: cert(service_account)
        })
        return getFirestore()
    }
}

