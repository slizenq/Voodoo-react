import React from "react";
import styleControllerButton from "./styleControllerButton";
import { Link } from "react-router-dom";

const Button = ({
  children,
  colorButton,
  sizeButton,
  linkButton,
  onClick,
}) => {
  colorButton = styleControllerButton.getColor(colorButton);
  sizeButton = styleControllerButton.getSize(sizeButton);
  const rootClass = ["button", colorButton, sizeButton];
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <Link
      href={linkButton}
      className={rootClass.join(" ")}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default Button;
