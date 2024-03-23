import React, { ReactNode } from "react";
import classNames from "classnames";

import { IoCaretBackSharp } from "@react-icons/all-files/io5/IoCaretBackSharp";
import { IoPlaySkipForwardSharp } from "@react-icons/all-files/io5/IoPlaySkipForwardSharp";
import { IoCaretForwardSharp } from "@react-icons/all-files/io5/IoCaretForwardSharp";
import { IoPlaySkipBackSharp } from "@react-icons/all-files/io5/IoPlaySkipBackSharp";

import style from "./Navigation.module.css";

function LabeledPageNav({ label, enabled = true, onClick } : { label: string | ReactNode, enabled?: boolean, onClick?: () => {} }) {
  return <span className={classNames(style.pageNavigation, {[style.pageNavigationDisabled]: !enabled})} onClick={enabled ? onClick : () => {}}>{label}</span>;
}

function NumberedPageNav({ n, active, onClick } : { n: number, active?: boolean, onClick?: () => {} }) {
  return <span className={classNames(style.pageNavigation, {[style.pageNavigationActive]: active })} onClick={onClick}>{n}</span>;
}

type rangeLimits = {
  limit: number;
  minValue: number | null;
  maxValue: number | null,
}

function range(start: number, end: number, limits: rangeLimits): number[] {
  const range = [];
  const { limit, minValue, maxValue } = limits;
  for (let i = start; i < end; i++) {
  
    if (minValue && i < minValue) {
      continue;
    }
  
    if (maxValue && i > maxValue) {
      continue;
    }
  
    range.push(i);
    if (range.length === limit) {
      return range;
    }
  }
  return range;
}

interface NavitationParams {
  current: number;
  pages: number;
  onNavigate: (page: number) => any;
}

function Navigation({ current, pages, onNavigate }: NavitationParams) {
    
  return <div className={style.pagination}>
    <LabeledPageNav enabled={current > 1} onClick={() => onNavigate(1)} label={<IoPlaySkipBackSharp />} />
    <LabeledPageNav enabled={current > 1} onClick={() => onNavigate(current - 1)} label={<IoCaretBackSharp />}  />
    {range(current - 2, current, { limit: 2, minValue: 1, maxValue: current }).map(page => <NumberedPageNav key={page} n={page} onClick={() => onNavigate(page)}/>)}
    <NumberedPageNav active={true} n={current} />
    {range(current + 1, current + 3, { limit: 2, minValue: 0, maxValue: pages }).map(page => <NumberedPageNav key={page} n={page} onClick={() => onNavigate(page)}/>)}
    <LabeledPageNav enabled={current < pages} onClick={() => onNavigate(current + 1)} label={<IoCaretForwardSharp />}  />
    <LabeledPageNav enabled={current < pages} onClick={() => onNavigate(pages)} label={<IoPlaySkipForwardSharp/>}  />
  </div>;
}

export default Navigation;
