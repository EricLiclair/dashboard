import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';
const db = getFirestore();

// create a user in the db with the passed payload
// the payload must be of a fixed format
const _createUser = (uid, data) => {
    // const data = {
    //     role: 'ADMIN' || 'USER'
    // }
    const userRef = doc(db, "users", uid,);
    return setDoc(userRef, data,
        { merge: true }
    );
}


// returns the docsnap of the document
const _getUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        alert("ERROR GETTING USER: User does not exists");
        return null;
    }
}


export { _createUser, _getUser };