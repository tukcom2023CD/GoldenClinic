import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';


const Wrapper = styled.div`
        padding: 16px,
        width: calc(100% - 32px);
        display: flex ,
        flex-direction: column,
        align-items: center,
        justify-content: center;
        padding-left:20px;
        `;

const Container = styled.div`
    
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
    //컴포넌트 말고 navigate쓸 경우 코드
    // const {} = props; 
    // const navigate = useNavigate();

    // const navigateToSignIn = () =>{

    //     navigate("/SignIn");
    
    // };
    //  const navigateToSignUp = () =>{

    //     navigate("/SignUp");
    
    // };

    return(
        // <div>
        // <button tittle = "button" onClick={navigateToSignIn}
        // >로그인</button>
        // <button classname="SignUpbtn" onClick={navigateToSignUp} 
        //     >회원가입</button>

            <div>
          
            <div style={styled.wrapper}>
            </div>

        <Wrapper>
        <h1>방방곡곡</h1>
        <h2>BangBangGokGok</h2>
            <Container>
            <Link to={"SignIn"}>
                <Button>로그인</Button>
            </Link>
            <Link to={"SignUp"}>
                <Button>회원가입</Button>
            </Link>
            </Container>
            
        </Wrapper>
         </div>
            
            

        
        
    )
 }



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
// }

export default HomePage;