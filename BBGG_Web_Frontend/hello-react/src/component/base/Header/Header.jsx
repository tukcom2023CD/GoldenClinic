import styled from "styled-components";
import HomePage from "../../page/HomePage";
import { Link } from "react-router-dom";
import oc from "open-color";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useEffect, useState } from "react";

const Head = styled.div`
  text: bold;
  position: absolute;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: bule;
  font-weight: bold;
  cursor: pointer;
  font-size: 50px;
`;
const Positioner = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0px;
  width: 100%;
`;

const WhiteBackground = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
  width: 1200px;
  height: 55px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-right: 1rem;
  padding-left: 1rem;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

//로고 클릭시 HomePage 이동
const Logo = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  font-size: 1.4rem;
  letter-spacing: 2px;
  color: ${oc.teal[7]};
  font-family: "Rajdhani";

  &:active {
    transform: translateY(1px);
  }
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
  height: 3px;
  background: linear-gradient(to right, ${oc.teal[3]}, ${oc.cyan[5]});
`;

const Header = ({ childern }) => {
  const [is_Login, setIsLogin] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userId") !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  if (is_Login) {
    return (
      <Positioner>
        <WhiteBackground>
          <HeaderContents>
            <Logo to="/HomePage">방방곡곡</Logo>
            <Spacer />
            {childern}
            <LogoutButton />
          </HeaderContents>
        </WhiteBackground>
        <GradientBorder />
      </Positioner>
    );
  } else
    return (
      <Positioner>
        <WhiteBackground>
          <HeaderContents>
            <Logo to="/HomePage">방방곡곡</Logo>
            <Spacer />
            {childern}
            <LoginButton />
          </HeaderContents>
        </WhiteBackground>
        <GradientBorder />
      </Positioner>
    );
};

export default Header;
