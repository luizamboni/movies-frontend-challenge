import React from "react";
import style from "./Card.module.css";
import Loading from "../Loading/Loading";

interface CardProps {
  isLoading?: boolean;
  children?: React.ReactNode;
  title?: string;
}

const Card: React.FC<CardProps> = ({ title, isLoading = false, children }) => {
  return (
    <div className={style.card}>
      {title && <h2>{title}</h2>}
      {children} {isLoading && <Loading/>}
    </div>
  );
};

export default Card;