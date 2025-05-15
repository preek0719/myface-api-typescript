import React, { useState, useEffect } from "react";
// import "./PostsPage.scss";

export function CreatePost() {

    const [postMessage, setPostMessage] = useState<string>("");
    const [postURL, setPostURL] = useState<string>("");

    
    const handleSubmit = (event: any) => {
        console.log(postMessage);
        console.log(postURL);
        event.preventDefault();
        submitPost();
    }

    const submitPost =() => {
         try {
         fetch(`http://localhost:3001/posts/create`, 
            {method: 'POST', headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'},
            body: JSON.stringify({message: postMessage, imageUrl: postURL})})
            .then(response => {
                console.log(response)
            if (response.status===200){
                 alert("Post Created");
                setPostMessage("");
                setPostURL("");
            }
            });
            
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h2 className="createPost">Create New Post</h2>
            <form method="post" action="/create/post" onSubmit={handleSubmit}>
                <label className="createNewPost">
                    <p id="postMessage">Post Message:</p>
                    <input id="postMessageInput" type="text" name="message" value={postMessage} placeholder="Enter post message" required onChange={(e) => setPostMessage(e.target.value)} />
                </label>
                <label className="createNewPost">
                    <p id="imageUrl">Image URL:</p>
                    <input id="imageUrlInput" type="url" value={postURL} name="imageUrl" placeholder="Enter post URL" required onChange={(e) => setPostURL(e.target.value)} />
                </label>

                <button type="submit" >Submit</button>
            </form>
        </div>
    );
}