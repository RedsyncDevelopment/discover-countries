import React, { useContext } from "react";
import { ThemeContext } from "../../states/context/ThemeContext";

interface CardProps {
  children: object;
}

const Card: React.FC<CardProps> = ({ children }) => {
  const { dark } = useContext(ThemeContext);

  return (
    <div
      className={`${"drop-shadow-md flex flex-col gap-4 pb-6 rounded"} ${
        dark ? "bg-darkBlueDarkMode" : "bg-white"
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
