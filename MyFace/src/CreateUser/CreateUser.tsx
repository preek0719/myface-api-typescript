import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./CreatePost.scss";


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
                message: "Incorrect email format"
            }
        },
        profileImage: {
            required: "Profile image url is required",
            pattern: {
                value: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                message: "Incorrect URL format"
            }
        },
        coverImage: {
            required: "Cover image url is required",
            pattern: {
                value: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/,
                message: "Incorrect URL format"
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
        <div >
            <h2 className="createPost">Create New User</h2>
            <form id='createUser' method="post" action="/users/create" onSubmit={handleSubmit(onSubmit)}>
                <label id="name">Name: </label><br />
                {errors.name && <span className="error">{errors.name.message}</span>}
                <input className="nameInput" type="text" placeholder="Enter name here" {...register('name', formErrors.name)} /><br />
                
                

                <label id="userName">Username: </label><br />
                {errors.username && <span className="error">{errors.username.message}</span>}
                <input className="userNameInput" type="text" placeholder="Enter a user name" {...register('username', formErrors.username)} /><br />
                
                

                <label id="email">Email: </label><br />
                {errors.email && <span className="error">{errors.email.message}</span>}
                <input className="emailInput" type="email" placeholder="Enter your email" {...register('email', formErrors.email)} /><br />
                
                

                <label id="profileImage">Profile Image Url: </label><br />
               {errors.profileImageUrl && <span className="error">{errors.profileImageUrl.message}</span>}
                <input className="profileImageUrlInput" type="url" placeholder="Enter URL of your profile image" {...register('profileImageUrl', formErrors.profileImage)} /><br />
                
               

                <label id="coverImage">Cover Image Url: </label><br />
                {errors.coverImageUrl && <span className="error">{errors.coverImageUrl.message}</span>}
                <input className="coverImageUrlInput" type="url" placeholder="Enter URL of your cover image"  {...register('coverImageUrl', formErrors.coverImage)} /><br />
                
                

                <button className="createUserButton" type="submit">Submit</button>
            </form>
        </div>
    );
}
