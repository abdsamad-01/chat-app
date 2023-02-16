import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC_34gUPo0GVCduaqUik4AU9Ugpf8QnPz0",
    authDomain: "chat-app-a3fea.firebaseapp.com",
    projectId: "chat-app-a3fea",
    storageBucket: "chat-app-a3fea.appspot.com",
    messagingSenderId: "811218322329",
    appId: "1:811218322329:web:1a7852ffcfe4fa95fa4908"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;

        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err: any) {
        console.error(err);
        alert(err.message);
    }
}

