import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


export function CreateUser() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            name: null as null | string,
            username: null as null | string,
            email: null as null | string,
            profileImageUrl: null as null | string,
            coverImageUrl: null as null | string,
        },
        criteriaMode: 'all'
    });

    const formErrors = {
        name: {
            required: "Name is required",
            pattern: {
                value: /[a-zA-Z ]+/,
                message: "Name should only contain lower and upper case alphabets"
            }
        },
        username: {
            required: "Username is required",
            pattern: {
                value: /[a-z]+/,
                message: "Username should only contain lower case alphabets"
            }
        },
        email: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Email entered is not in the right format"
            }
        },
        profileImage: {
            required: "Profile image url is required",
            pattern: {
                value: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                message: "Profile Image URL entered is not in the right format"
            }
        },
        coverImage: {
            required: "Cover image url is required",
            pattern: {
                value: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                message: "Cover Image URL entered is not in the right format"
            }
        }
    }


    const onSubmit = (data) => {
        submitUser(data);
    };
    
    const submitUser = (data) => {
       console.log(data);
        try {
            fetch(`http://localhost:3001/users/create`,
                {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify({ name: data.name, username: data.username, email: data.email, coverImageUrl: data.coverImageUrl, profileImageUrl: data.profileImageUrl })
                })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        alert("User Created");
                    }
                });
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <h2 className="createPost">Create New User</h2>
            <form method="post" action="/users/create" onSubmit={handleSubmit(onSubmit)}>
                <label className="createUserLabel"></label>
                <p id="name">Name:</p>
                <input className="nameInput" type="text" placeholder="Enter name here" {...register('name', formErrors.name)} />
                {errors.name && <span className="error">{errors.name.message}</span>}


                <label className="createUserLabel"></label>
                <p id="userName">Username:</p>
                <input className="userNameInput" type="text" placeholder="Enter a user name" {...register('username', formErrors.username)} />
                {errors.username && <span className="error">{errors.username.message}</span>}

                <label className="createUserLabel"></label>
                <p id="email">Email:</p>
                <input className="emailInput" type="email" placeholder="Enter your email" {...register('email', formErrors.email)} />
                {errors.email && <span className="error">{errors.email.message}</span>}

                <label className="createUserLabel"></label>
                <p id="profileImageUrl">Profile Image Url:</p>
                <input className="profileImageUrlInput" type="url" placeholder="Enter URL of your profile image" {...register('profileImageUrl', formErrors.profileImage)} />
                {errors.profileImageUrl && <span className="error">{errors.profileImageUrl.message}</span>}

                <label className="createUserLabel"></label>
                <p id="coverImageUrl">Cover Image Url:</p>
                <input className="coverImageUrlInput" type="url" placeholder="Enter URL of your cover image"  {...register('coverImageUrl', formErrors.coverImage)} />
                {errors.coverImageUrl && <span className="error">{errors.coverImageUrl.message}</span>}

                <button className="createUserButton" type="submit">Submit</button>
            </form>
        </div>
    );
}
