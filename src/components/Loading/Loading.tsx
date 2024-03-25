import { FC as FunctionalComponent} from "react";
import style from "./Loading.module.css";

const Spinner: FunctionalComponent<any> = () => {
  return <div className={style.loader}></div>;
};

const Loading: FunctionalComponent<any> = () => {
  return <div className={style.posCenter}>
    <Spinner />
  </div>;
};

export default Loading;
