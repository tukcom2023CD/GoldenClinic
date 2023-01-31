import * as React from 'react';
import Footer from '../base/Footer'
import Gnb from '../base/Gnb';
import {Component} from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
const MainPage =() => {
    const[posts, setPosts] = useState([]);

    useEffect(() => {
        axios({
            method: 'GET',
            url:'http://localhost:8080/bbgg/login'
        }).then(response => setPosts(response.data))
    })

    return(
        <div>
            {posts.length}

            <Gnb/>
        </div>
        // <ul>
        //     {posts.map(post => (
        //         <li key = {post.Id}>{post.Name}</li>
        //     ))}
        // </ul>
    )
// function MainPage() {
//     return (
//         <div>
//             MainPage##

//             <Gnb/>
//             <Footer/>
//         </div>
//     );
// }
}

export default MainPage;