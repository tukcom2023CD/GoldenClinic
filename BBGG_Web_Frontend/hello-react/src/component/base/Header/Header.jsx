import styled from "styled-components";
import HomePage from "../../page/HomePage";
import { Link } from 'react-router-dom';
import oc from 'open-color';

const Head = styled.div`
text: bold;
position : absolute;
margin : 50px auto;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
color: bule;
font-weight: bold;
cursor: pointer;
font-size:50px;
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

const Logo = styled.div`
    cursor: pointer;
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[3]}, ${oc.cyan[5]});
`;

const Header = ({children}) => {
    return (
        <Positioner>
            <WhiteBackground>
                <HeaderContents>
                    <Logo>방방곡곡</Logo>
                    <Spacer/>
                    {children}
                </HeaderContents>
            </WhiteBackground>
            <GradientBorder/>
        </Positioner>
    );
};

export default Header;
