import { listClasses } from "@mui/material";
import styled from "styled-components";
import { Link, Link as RouterLink } from "react-router-dom";

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
          <Link component={RouterLink} to="/TravelMap">
            여행지
          </Link>
        </Li>
        <Li>
          <Link component={RouterLink} to="/TravelMap">
            맛집
          </Link>
        </Li>
        <Li>
          <Link component={RouterLink} to="/TravelMap">
            여행기록
          </Link>
        </Li>
      </Ul>
    </div>
  );
}
