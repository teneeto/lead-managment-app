import React from "react";
import styled from "styled-components";

const TextButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  font-size: 16px;
  cursor: pointer;
  padding: 0;
  margin: 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    outline: none;
  }
`;

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, className }) => {
  return (
    <TextButton onClick={onClick} className={className}>
      {text}
    </TextButton>
  );
};

export default Button;
