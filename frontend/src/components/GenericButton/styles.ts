import styled from "styled-components";

interface IButton {
  bgColor: string
}

export const Button = styled.button<IButton>`
  background-color: ${(props) => props.bgColor};
  color: white;
  margin: 10px;

  &:disabled {
    background-color: grey;
    color: white;
    margin: 10px;
  }
`;
