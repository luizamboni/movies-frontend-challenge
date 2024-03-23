import React from "react";
import style from "./Loading.module.css";

function Spinner() {
  return <div className={style.loader}></div>;
}

function Loading() {
  return <div className={style.posCenter}>
    <Spinner />
  </div>;
}

export default Loading;
