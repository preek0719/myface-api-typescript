import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

type formData = {
    firstLastname: string;
    userName: string;
    email: string;
    profileImage: string;
    coverImage: string;
}

export function CreateUser() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        defaultValues: {
            firstLastname: "",
            username: "",
            email: "",
            profileImageUrl: "",
            coverImageUrl: ""
        },
        criteriaMode: 'all'
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("firstLastname", {
            type: 'required', message: ''});
    };
    
    useEffect(() => {
        setError("firstLastname", {
            type: 'required', message: ''});
        setError("firstLastname", {
            type: 'pattern', message: ''}) ;   
    }, [setError])  


    const onSubmit = () => {
        submitUser();
    };
    const submitUser = () => {
        try {
            fetch(`http://localhost:3001/users/create`,
                {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: register("firstLastname"), username: register("username"), email: register("email"), coverImageUrl: register("coverImageUrl"), profileImageUrl: register("profileImageUrl") })
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
                <input className="nameInput" type="text" placeholder="Enter name here" {...register('firstLastname', {required: true, pattern:/[a-zA-Z ]+/ })} /> 
                {errors.firstLastname && <span className="error">Name is required and should only contain alphabets</span>}
                {/* {errors.firstLastname && errors.firstLastname.type[required] && <span className="error">{errors.firstLastname.type.required}</span>}
                {errors.firstLastname && errors.firstLastname.type["pattern"] && <span className="error">{errors.firstLastname.type.pattern}</span>} */}
                 
                <label className="createUserLabel"></label>
                <p id="userName">Username:</p>
                <input className="userNameInput" type="text" placeholder="Enter a user name" {...register('username', {required: true, pattern: /[a-z]+/})} />
                {errors.username && <span className="error">Username is required and should only contain lower case alphabets</span>}

                <label className="createUserLabel"></label>
                <p id="email">Email:</p>
                <input className="emailInput" type="email" placeholder="Enter your email" {...register('email', { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ })} />
                {errors.email && <span className="error">Email is required and should be in the right format</span>}

                <label className="createUserLabel"></label>
                <p id="profileImageUrl">Profile Image Url:</p>
                <input className="profileImageUrlInput" type="url" placeholder="Enter URL of your profile image" {...register('profileImageUrl', { required: true, pattern: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/ })} />
                {errors.profileImageUrl && <span className="error">ProfileImage URL is required and should be in the right format</span>}

                <label className="createUserLabel"></label>
                <p id="coverImageUrl">Cover Image Url:</p>
                <input className="coverImageUrlInput" type="url" placeholder="Enter URL of your cover image"  {...register('coverImageUrl', { required: true, pattern: /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/ })} />
                {errors.coverImageUrl && <span className="error">CoverImage URL is required and should be in the right format</span>}

                <button className="createUserButton" type="submit">Submit</button>
            </form>
        </div>
    );
}
