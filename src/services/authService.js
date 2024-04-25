import { ref } from 'vue';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export function useAuthentication() {
    const user = ref(null);
    const subscribe = () =>
        auth.onAuthStateChanged((newUser) => {
            user.value = newUser;
        });

    return { user, subscribe };
}

export function useSignIn() {
    const signIn = () => {
        signInWithPopup(auth, new GoogleAuthProvider()).catch((error) => {
            console.error('Error signing in:', error);
        });
    };
    return { signIn };
}

export function useSignOut() {
    const signOutUser = () => {
        signOut(auth).catch((error) => {
            console.error('Error signing out:', error);
        });
    };
    return { signOutUser };
}
