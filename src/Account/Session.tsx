import * as usersClient from "../Account/client.ts";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setCurrentUser} from "./reducer.ts";

export default function Session({children}: {children: any}) {
    const [pending, setPending] = useState(true);
    const dispatch = useDispatch();
    const fetchProfile = async () => {
        try {
            const currentUser = await usersClient.profile();
            dispatch(setCurrentUser(currentUser));
        } catch (err: any) {
            console.error(err);
        }
        setPending(false);
    };
    useEffect(() => {
        fetchProfile();
    }, []);
    if (!pending) {
        return children;
    }
}