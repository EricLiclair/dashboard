import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

const auth = getAuth();

const SignInWithEmailAndPassword = async (email, password) => {
    let user = null;
    let error = false;
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return { user: userCredential.user, error }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { user, error: { errorCode, errorMessage } }
        });
}


export { SignInWithEmailAndPassword };
