import React from "react";
import styled, { css } from "styled-components";

const StyledCard = styled.div`
  position: relative;
  width: 400px;
`;

const CardImage = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 8px;
`;

const CardImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
`;

const CardContent = styled.div`
  position: absolute;
  width: calc(100% - 65px);
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 50%);
  background-color: white;
  z-index: 1;
  border-radius: 50px;
  padding: 20px;
  bottom: 20px;
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const UserName = styled.span`
  font-weight: 300;
  font-size: 16px;
  color: #333;
`;

const CardUser = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const UserAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100rem;
  object-fit: cover;
  flex-shrink: 0;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: black;
`;

const CardAmount = styled.span`
  font-size: 18px;
  font-weight: bold;
  background: linear-gradient(
    86.88deg,
    #7d6aff 1.38%,
    #ffb86c 64.35%,
    #fc2872 119.91%
  );
  ${(props) =>
    props.secondary &&
    css`
      background: linear-gradient(
        86.88deg,
        #20e3b2 1.38%,
        #2cccff 64.35%,
        #fc2872 119.91%
      );
    `};
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  column-gap: 12px;
`;

const Card = ({ secondary }) => {
  return (
    <StyledCard>
      <CardImage>
        <CardImg
          src="https://cdn.dribbble.com/users/2400293/screenshots/20320748/media/0ce30d2aa1222c487426145c6d46b821.png?compress=1&resize=1000x750&vertical=center"
          alt=""
        />
      </CardImage>
      <CardContent>
        <CardTop>
          <CardUser>
            <UserAvatar
              src="https://cdn.dribbble.com/users/2400293/screenshots/19271835/media/68c947aa286ed6573929bc2655acff49.png?compress=1&resize=1000x750&vertical=center"
              alt=""
            />
            <UserName>@zndron</UserName>
          </CardUser>
          <CardMeta>256</CardMeta>
        </CardTop>
        <CardFooter>
          <CardTitle>Cosmic Perspective</CardTitle>
          <CardAmount secondary={secondary}>12,000 PSL</CardAmount>
        </CardFooter>
      </CardContent>
    </StyledCard>
  );
};

export default Card;
