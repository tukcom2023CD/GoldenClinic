import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../base/Header/Header';
import Footer from '../base/Footer'
import Gnb from '../base/Gnb';
import axios from 'axios';
import { useEffect } from 'react';

const Wrapper = styled.div`
        padding: 100px,
        width: calc(100% - 32px);
        display: flex ,
        flex-direction: column,
        align-items: center,
        justify-content: center;
        padding-left:0;
        
        `;

const Container = styled.div`
    display: flex;
    width:100%;
    max-width: 200px;
        
     & > * {
        :not(:lash-child){
            margin-bottom: 16px;
        }
    }
}
`;

function HomePage(props) {
    useEffect(()=>{
        axios.get('/api/hello')
        .then(response => console.log(response.data))
    },[])
    // const {} = props; 
    // const navigate = useNavigate();

    // const navigateToSignIn = () =>{

    //     navigate("/SignIn");
    
    // };
    //  const navigateToSignUp = () =>{

    //     navigate("/SignUp");
    
    // };

    return(
       
        <div style={{ 
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            width: '100%', height: '100vh', 
            }}>
            <h2>시작 페이지</h2>
            <Gnb/>
            <Footer/>
           </div>
    

    )

}
 {/* // <button tittle = "button" onClick={navigateToSignIn}>로그인</button>
        // <button classname="SignUpbtn" onClick={navigateToSignUp} 
        //     >회원가입</button>

          
            // <div style={styled.wrapper}>

// function LoginButton(props) {
//     const { isLoggedIn, onClickLogin, onClickLogout } = props;

//     return (
//         <div style={styled.wrapper}>
//             {isLoggedIn && <span style={styled.wrapper}>환영합니다!</span>}
//             {isLoggedIn ? (
//                 <button onClick={onClickLogout}>로그아웃</button>
//             ) : (
//                 <button onClick={onClickLogin}>로그인</button>
//             )}
//         </div>
//     );
// } */}

export default HomePage; 