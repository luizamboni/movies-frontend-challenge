import React from "react";
import style from "./Card.module.css";

const Card: React.FC<any> = ({ children }) => {
  return <div className={style.card}>{children}</div>;
};

export default Card;