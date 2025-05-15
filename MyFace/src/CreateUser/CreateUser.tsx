import React, { useState, useEffect } from "react";
// import {useForm } from "react-hook-form";
// import "./PostsPage.scss";

type formData = {
    uname: string;
    userName: string;
    email: string;
    profileImage: string;
    coverImage: string;
}

export function CreateUser() {
       
    const [formData, setFormData] = useState<formData>({ uname: "test", userName: "" , email: "", profileImage: "", coverImage: ""});
          
   const [errors, setErrors] = useState({});

//    const validate = (data: formData) => {
//   const errors = {};
//   if (!data.name) errors.name = 'Name is required';
//   if (!data.email) errors.email = 'Email is required';
//   else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email address is invalid';
//   return errors;
// };

   const handleChange = (e: any) => {
    // validate(formData);
    const { name, value } = e.target;
    console.log([name]+' '+value);
    setFormData({ ...formData, [name]: value });
    console.log(formData)
  };

    
 const handleSubmit = (e: any) => {
    e.preventDefault();
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
                    body: JSON.stringify({ name: formData.uname, username: formData.userName, email: formData.email,  coverImageUrl: formData.coverImage, profileImageUrl: formData.profileImage })
                })
                .then(response => {
                    console.log(response)
                    if (response.status === 200) {
                        alert("Post Created");
                        setFormData({ ...formData, [formData.uname]: "", [formData.userName]: "", [formData.email]: "", [formData.coverImage]: "", [formData.profileImage]: "" });                      
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
            <form method="post" action="/users/create" onSubmit={handleSubmit}>
                <label className="createUserLabel">
                    <p>this is an error</p>
                    <p id="name">Name:</p>
                    <input id="nameInput" type="text" name="uname" placeholder="Enter name here" value={formData.uname} required onChange={handleChange} />
                   
                </label>
                <label className="createUserLabel">
                    <p id="userName">Username:</p>
                    <input id="userNameInput" type="text" name="userName"  placeholder="Enter a user name" value={formData.userName} required onChange={handleChange}/>
                </label>
                <label className="createUserLabel">
                    <p id="email">Email:</p>
                    <input id="emailInput" type="email" name="email" placeholder="Enter your email" value={formData.email} required onChange={handleChange}/>
                </label>
                <label className="createUserLabel">
                    <p id="profileImageUrl">Profile Image Url:</p>
                    <input id="profileImageUrlInput" type="url" name="profileImage" placeholder="Enter URL of your profile image" value={formData.profileImage} required onChange={handleChange} />
                </label>
                <label className="createUserLabel">
                    <p id="coverImageUrl">Cover Image Url:</p>
                    <input id="coverImageUrlInput" type="url" name="coverImage" placeholder="Enter URL of your cover image" required value={formData.coverImage} onChange={handleChange}/>
                </label>
                <button className="createUserButton" type="submit" >Submit</button>
            </form>
        </div>
    );
}