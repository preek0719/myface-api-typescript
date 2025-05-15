import React, { useState, useEffect } from "react"; 
import "./PostsPage.scss";

type postsData = {
    id: number;
    message: string;
    imageUrl: string;
    createdAt: string;
    postedBy: {
        id: number;
        name: string;
    };
}
export  function PostsPage() {

    const [postsData, setPostsData] = useState<postsData[] | null>(null);
    
    useEffect(() => {
       fetch("http://localhost:3001/posts")
       .then(response => response.json())
       .then(response => setPostsData(response.results));
    }, [postsData]);

    if (!postsData) {
        return <div>Waiting for data!</div>
    }   
    return (
    <div>
      <h2>Posts</h2>  
      <ul id='postsContainer'>       
        {postsData.map((post: postsData, i: number)=>
            <li id='postsList' key={i}>
                <img id = 'postImages' src={post.imageUrl} />
                <p id='postMessage'><b>{post.message}</b></p>
                <p id='postedBy'><i>{post.postedBy.name}</i></p>  
                <div id="likes_dislikes">
                    <form id="like-form" method="post" action="/posts/<%= post.id %>/like/"> <button id="like-button" type="submit">Like</button> </form>
                    <form id="dislike-form" method="post" action="/posts/<%= post.id %>/dislike/"> <button id="dislike-button" type="submit">Dislike</button> </form> 
                </div>              
            </li>)}
        </ul>
        /</div>
      
    );
}