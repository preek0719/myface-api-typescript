import React, { useState, useEffect } from "react";
import {useForm } from "react-hook-form";
// import "./PostsPage.scss";

type formData = {
    uname: string;
    userName: string;
    email: string;
    profileImage: string;
    coverImage: string;
}

export function CreateUser2() {
       
    // const [formData, setFormData] = useState<formData>({ uname: "", userName: "" , email: "", profileImage: "", coverImage: ""});
    // const[uname, setName] = useState<string>("");
    // const[userName, setUserName] = useState<string>("");
    // const[email, setEmail] = useState<string>("");
    // const[profileImage, setProfileImage] = useState<string>("");
    // const[coverImage, setCoverImage] = useState<string>("");

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            uname: "",
            username: "",
            email: "",
            profileImageUrl: "",
            coverImageUrl: ""
        }
    });

          
  

//    const validate = (data: formData) => {
//   const errors = {};
//   if (!data.name) errors.name = 'Name is required';
//   if (!data.email) errors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
//   return errors;
// };

//    const handleChange = (e: any) => {
//     // validate(formData);
//     const { name, value } = e.target;
//     console.log(name+' '+value);
//     setFormData({ ...formData, [name]: value });
//   };


 const onSubmit = (e: any) => {
    //e.preventDefault();
    // Perform validation and submission here
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
                    body: JSON.stringify({ name: register("uname"), username: register("username"), email: register("email"),  coverImageUrl: register("coverImageUrl"), profileImageUrl: register("") })
                })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        alert("User Created");
                    
                       }});
                    
            
        }
        catch(err) {
            console.log(err)
        }
    }

      
    return (
        <div>
            <h2 className="createPost">Create New User</h2>
            <form method="post" action="/users/create" onSubmit={handleSubmit(onSubmit)}>
            {/* <form method="post" action="/users/create" onSubmit={handleSubmit(onSubmit)}>
                <label className="createUserLabel">
                    <p id="name">Name:</p>
                    <input id="nameInput" type="text" placeholder="Enter name here" value={uname} required  {...register('name', {
                        required: 'Name is required',
            pattern: {
              value: /[a-zA-Z ]+/,
              message: 'Name is invalid'
            }
          })}  onChange={(e) => setName(e.target.value)} />
          {errors.name && <span>{errors.email.message}</span>} */}

          <label className="createUserLabel">
                    <p id="name">Name:</p>
                    <input id="nameInput" type="text" placeholder="Enter name here" required {...register('uname', {
            required: 'Name is required',
            pattern: {
              value: /[a-zA-Z ]+/,
              message: 'Name is invalid'
            }
          })}
        />
        {errors.uname && <span>{errors.uname.message}</span>} </label>
       
                <label className="createUserLabel">
                    <p id="userName">Username:</p>
                    <input id="userNameInput" type="text" placeholder="Enter a user name" required {...register('username', {
            required: 'UserName is required',
            pattern: {
              value: /[a-z]+/,
              message: 'UserName is invalid'
            }
          })}
        />
        {errors.username && <span>{errors.username.message}</span>} </label>
        
                <label className="createUserLabel">
                    <p id="email">Email:</p>
                    <input id="emailInput" type="email" name="email" placeholder="Enter your email"/>
                </label>
                <label className="createUserLabel">
                    <p id="profileImageUrl">Profile Image Url:</p>
                    <input id="profileImageUrlInput" type="url" name="profileImageUrl" placeholder="Enter URL of your profile image"  />
                </label>
                <label className="createUserLabel">
                    <p id="coverImageUrl">Cover Image Url:</p>
                    <input id="coverImageUrlInput" type="url" name="coverImageUrl" placeholder="Enter URL of your cover image"/>
                </label>
                <button className="createUserButton" type="submit" >Submit</button>
            </form>
        </div>
    );
}