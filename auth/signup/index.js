import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { CreateUser } from "../../utils/db";
const auth = getAuth();

export const CreateUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            CreateUser(user.uid, {
                role: 'USER'
            })
            console.log('created account with role: `USER`');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({
                errorCode,
                errorMessage
            })
        });
}