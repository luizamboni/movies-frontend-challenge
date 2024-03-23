import React from "react";
import "./Card.css";

const Card: React.FC<any> = ({ children }) => {
  return <div className='card'>{children}</div>;
};

export default Card;