import { ReactNode, FC as FunctionalComponent } from "react";
import classNames from "classnames";
import { range } from "./utils";
import { IoCaretBackSharp } from "@react-icons/all-files/io5/IoCaretBackSharp";
import { IoPlaySkipForwardSharp } from "@react-icons/all-files/io5/IoPlaySkipForwardSharp";
import { IoCaretForwardSharp } from "@react-icons/all-files/io5/IoCaretForwardSharp";
import { IoPlaySkipBackSharp } from "@react-icons/all-files/io5/IoPlaySkipBackSharp";

import style from "./Navigation.module.css";

type onClick = (value: any) => void;

interface labeledPageNavParams { 
  label: string | ReactNode,
  enabled?: boolean,
  onClick?: onClick,
}

const LabeledPageNav: FunctionalComponent<labeledPageNavParams> = ({ label, enabled = true, onClick }) => {
  return <span className={classNames(style.pageNavigation, {[style.pageNavigationDisabled]: !enabled})} onClick={enabled ? onClick : (): void => {}}>{label}</span>;
};

interface numberedPageNavParams {
  n: number, 
  active?: boolean, 
  onClick?: onClick,
}

const NumberedPageNav: FunctionalComponent<numberedPageNavParams> = ({ n, active, onClick }) => {
  return <span className={classNames(style.pageNavigation, {[style.pageNavigationActive]: active })} onClick={onClick}>{n}</span>;
};

type onNavigate = (page: number) => void;

interface naviagationParams {
  current: number, 
  pages: number, 
  onNavigate: onNavigate
}

const Navigation: FunctionalComponent<naviagationParams> = ({ current, pages, onNavigate }) => {
    
  return <div className={style.pagination}>
    <LabeledPageNav enabled={current > 1} onClick={(): void => onNavigate(1)} label={<IoPlaySkipBackSharp />} />
    <LabeledPageNav enabled={current > 1} onClick={(): void => onNavigate(current - 1)} label={<IoCaretBackSharp />}  />
    {range(current - 2, current, { limit: 2, minValue: 1, maxValue: current }).map(page => <NumberedPageNav key={page} n={page} onClick={(): void => onNavigate(page)}/>)}
    <NumberedPageNav active={true} n={current} />
    {range(current + 1, current + 3, { limit: 2, minValue: 0, maxValue: pages }).map(page => <NumberedPageNav key={page} n={page} onClick={(): void => onNavigate(page)}/>)}
    <LabeledPageNav enabled={current < pages} onClick={(): void => onNavigate(current + 1)} label={<IoCaretForwardSharp />}  />
    <LabeledPageNav enabled={current < pages} onClick={(): void => onNavigate(pages)} label={<IoPlaySkipForwardSharp/>}  />
  </div>;
};

export default Navigation;
