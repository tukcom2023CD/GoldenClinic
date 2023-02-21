import { listClasses } from "@mui/material";
import styled from "styled-components";

const Ul = styled.ul`
  list-style: none;
  justify-content: center;
  margin: 10px auto;
  padding: 0;
  border: 0;
`;
const Li = styled.li`
  float: left;
  margin: 40;
  padding: 0;
  border: 0;
  color: white;
  text-align: center;
  text-decoration: none;
  width: 150px;
`;
export default function Gnb() {
  return (
    <div>
      <Ul className="gnb">
        <Li>
          <a href="destination" className="destianation">
            여행지
          </a>
        </Li>
        <Li>
          <a href="restaurant" className="restaurant">
            맛집
          </a>
        </Li>
        <Li>
          <a href="travel record" className="travelRecord">
            여행기록
          </a>
        </Li>
      </Ul>
    </div>
  );
}
