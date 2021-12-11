// other documents in the db will have there own db util folder
import { useEffect, useState } from "react";
import { _createUser, _getUser, } from "./user";

const CreateUser = (uid, data) => {
    _createUser(uid, data)
        .then((res) => {
            console.log(res);
            return res;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            console.log({
                errorCode,
                errorMessage
            });
        });
}

const GetUser = async (uid) => {
    const user = await _getUser(uid);
    if (user) {
        return user;
    } else {
        alert("ERROR GETTING USER: User does not exists");
        return null;
    }
}

export { GetUser, CreateUser };