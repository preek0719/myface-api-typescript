import React, { useState, useEffect } from "react";
import "./UsersPage.scss";

type usersData = {
    profileImageUrl: string;
    name: string;
}

export function UsersPage() {

    const [usersData, setUsersData] = useState<usersData[] | null>(null);

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(response => setUsersData(response.results));
    }, [usersData]);

    console.log(usersData);
    if (!usersData) {
        return <div>Waiting for data!</div>
    }
    return (
        <div>
            <h2>Users</h2>
            <ul id='usersContainer'>
                {usersData.map((user: usersData, i: number) =>
                    <li id='userList' key={i}>
                        <p id='username'><b>{user.name}</b></p>
                        <img id='userProfileImage' src={user.profileImageUrl}></img>
                    </li>)}
            </ul>
        </div>
    );
}

