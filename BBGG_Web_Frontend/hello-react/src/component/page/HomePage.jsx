import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import SignIn from './SignInPage';


//  function HomePage() {
//     const navigate = useNavigate();
    
//     const navigateToSignUp = () =>{

//         navigate("/SignUp");
//     };
//     return(
//         <Button onClick={navigateToSignUp}></Button>
//     )
//  }
    // return (
    //     // <Wrapper>
    //     //     <Container>
    //             <Button
    //                 title="로그인"
    //                 onClick={ goToLogin }>로그인</Button>
                
    //             // <Button
    //             //     title="회원가입"
                    // onClick={() => {
                    //     navigate("/SignUp");
                    // }}
                // />
        //     </Container>
        // </Wrapper>
            
    
//     );
// }

// export default App;

// const Wrapper = styled.div`
//         padding: 16px,
//         width: calc(100% - 32px);
//         display: flex ,
//         flex-direction: column,
//         align-items: center,
//         justify-content: center;
//         `;

// const Container = styled.div`
//     width:100%;
//     max-width: 720px;
        
//      & > * {
//         :not(:lash-child){
//             margin-bottom: 16px;
//         }
//     }
// }
// `;

// function HomePage(props) {
// //    const { } = props;

//     const navigate = useNavigate();

//     return (
        // <Wrapper>
        //     <Container>
        //         <Button
        //             title="로그인"
        //             onClick={() => {
        //                 navigate("/SignIn");
        //             }}
        //         />
        //         <Button
        //             title="회원가입"
        //             onClick={() => {
        //                 navigate("/SignUp");
        //             }}
        //         />
        //     </Container>
        // </Wrapper>
//     );
// }

        
//         <div>
//             <h1>방방곡곡</h1>
//             <h2>BangBangGokGok</h2>
//             <div style={styled.wrapper}>

//             </div>

//         </div>
    
//  };


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

// export default HomePage;

