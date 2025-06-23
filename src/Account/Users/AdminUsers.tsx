// table of all users for admin
// see CH 6.2.6.2 - 6.2.6.4 for details

import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import * as usersClient from "../client.ts";
import {FaPlus} from "react-icons/fa";
import {FormControl} from "react-bootstrap";
import PeopleTable from "./Table.tsx";

export default function AdminUsers() {
    const [users, setUsers] = useState<any[]>([]);
    const { uid } = useParams();
    const [role, setRole] = useState("");
    const [, setName] = useState("");
    const fetchUsers = async () => {
        const users = await usersClient.findAllUsers();
        setUsers(users);
    };
    const filterUsersByName = async (name: string) => {
        setName(name);
        if (name) {
            const users = await usersClient.findUsersByPartialName(name);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    const filterUsersByRole = async (role: string) => {
        setRole(role);
        if (role) {
            const users = await usersClient.findUsersByRole(role);
            setUsers(users);
        } else {
            fetchUsers();
        }
    };
    useEffect(() => {
        fetchUsers();
    }, [uid]);
    return (
        <div id={"sn-admin-user-view"} className={"sn-margin-right-left"}>
            <h3>
                Users
                <button className={"btn sn-bg-tan"} id={"sn-add-people"}>
                    <FaPlus className={"me-2"}/>
                    Users
                </button>
            </h3>
            <FormControl onChange={(e) => filterUsersByName(e.target.value)}
                         id={"sn-filter-by-name"} className={"float-start w-25 me-2"} placeholder={"Search People"}/>
            <select value={role} onChange={(e) => filterUsersByRole(e.target.value)}
                className={"form-select float-start w-25"} id={"sn-select-role"}>
                <option value={""}>All Roles</option>
                <option value={"READER"}>Reader</option>
                <option value={"AUTHOR"}>Author</option>
                <option value={"ADMIN"}>Admin</option>
            </select>
            <PeopleTable users={users}/>
        </div>
    );
}