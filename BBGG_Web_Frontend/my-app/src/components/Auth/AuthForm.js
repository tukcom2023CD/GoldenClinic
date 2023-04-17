import { useState, useEffect } from "react";
import axios from "axios";
import { RiLoginBoxLine } from "react-icons/ri";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  //isLogin true=로그인창 false=회원가입창
  const [isLogin, setIsLogin] = useState(true);
  const [Name, SetName] = useState("");
  const [userId, SetUserId] = useState("");
  const [password, SetPassword] = useState("");
  //const [isLoading, SetIsLoading] = useState(false);
  const [nameValid, SetNameValid] = useState(false); // 유효성 검사
  const [idValid, SetIdValid] = useState(false);
  const [passwordValid, SetPasswordValid] = useState(false);
  const [notAllValid, SetNotAllValid] = useState(true); // 최종 유효성
  

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const handleName = (e) => {
    const currentName = e.target.value;
    SetName(currentName);
    if (currentName.length < 2 || currentName.length > 5) {
      SetNameValid(false);
    } else {
      SetNameValid(true);
    }
  };
  
  const handleUserId = (e) => {
    SetUserId(e.target.value);
    const regex = /^[a-zA-z0-9]{4,12}$/;
    if(regex.test(userId)) {
      SetIdValid(true);
    } else {
      SetIdValid(false);
    }   
  }
  
  const handlePassword = (e) => {
    SetPassword(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{7,20}$/;
    if(regex.test(password)) {
      SetPasswordValid(true);
    } else {
      SetPasswordValid(false);
    }
  }

  useEffect(() => {
		if (isLogin ? idValid && passwordValid : nameValid && idValid && passwordValid) {
			SetNotAllValid(false);
      return;
		}
			SetNotAllValid(true);
	}, [nameValid, idValid, passwordValid, isLogin]);



  //회원가입
  const SignUpRegister = () => {
    axios.post("http://localhost:8080/bbgg/signup", {
        userId: userId,
        password: password,
        userName: Name
    }).then(function () {
        alert("환영합니다. " + Name + "님!");
        window.location.reload();
    }).catch(function (error) {
        console.log(error);
    });
}

  //로그인
  const SignInRegister = async () => {
    axios.post("http://localhost:8080/bbgg/login", {
        userId: userId,
        password: password,
      })
      .then(function (response) {
        alert("로그인 성공");
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("userName", response.data.userName);
        return window.location.replace('/CurrentLocation');
      })
      .catch(function (error) {
        alert("아이디와 비밀번호를 확인해주세요.");
        switchAuthModeHandler();
        console.log(error);
      });
  }


  return (
    <div className={classes.background}>
    <br/>
    <section className={classes.auth}>
      <h1><RiLoginBoxLine/>
      <br/>
      <p class="wideLineGeight"/>
      {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form>
        <div className={isLogin ? classes.nameDiv : classes.control}>
          <label htmlFor="Name">Your Name</label>
          <input type="text" id="Name" required value={Name} onChange={
            handleName
          } />
        </div>
        <div className={classes.errorMessage} id="NameMessage">
          {!nameValid && Name.length > 0 &&(
            <div>이름은 2글자 이상 5글자 이하로 입력해주세요.</div>
          )}
        </div>
        <div className={classes.control}>
          <label htmlFor="userId">Your id</label>
          <input type="text" id="userId" required value={userId} onChange={
            handleUserId
          } />
        </div>
        <div className={classes.errorMessage}>
        {!idValid && userId.length > 0 &&(
          <div>4-12사이 대소문자 또는 숫자만 입력해 주세요.</div>
        )}
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required value={password} onChange={
            handlePassword
          } />
        </div>
        <div className={classes.errorMessage}>
        {!passwordValid && password.length > 0 && (
          <div>영문, 숫자, 특수문자 포함 8자 이상 20자 이하로 입력해주세요.</div>
        )}
        </div>
        <div className={classes.actions}>
          <button
            disabled={notAllValid}
            type="button"
            onClick={() => {
              (isLogin ? SignInRegister() : SignUpRegister())
            }}
          >{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={() => {
              switchAuthModeHandler();
            }
            }
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
          <br />
        </div>
      </form>
    </section>
    </div>
  );
};

export default AuthForm;
