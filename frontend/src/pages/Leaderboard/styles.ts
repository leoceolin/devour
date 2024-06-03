import styled from "styled-components";

export const Image = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 8px;
`

export const Row = styled.div`
  @media screen and (max-width: 825px) {
   display:flex;
   flex-direction: column;
  }

  &:after{
    content: "";
    clear: both;
    display: table;
  }
`;

export const Column = styled.div`
  float: left;
  width: 50%;
  padding: 5px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
`;

export const TableHead = styled.th`
  text-align: left;
  padding: 16px;
`;

export const TableDescription = styled.td`
  text-align: left;
  padding: 16px;
`;

export const TableRow = styled.tr`
  &:nth-child(even){
    background-color: #949494;
  }
`;

export const GoBackButton = styled.button`
   background-color: #61dafbaa;

  &:hover {
    background-color: #646cffaa;
  }
`;
