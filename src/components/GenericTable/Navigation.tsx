import React, { ReactNode } from 'react';

import { IoCaretBackSharp } from "@react-icons/all-files/io5/IoCaretBackSharp";
import { IoPlaySkipForwardSharp } from "@react-icons/all-files/io5/IoPlaySkipForwardSharp";
import { IoCaretForwardSharp } from "@react-icons/all-files/io5/IoCaretForwardSharp";
import { IoPlaySkipBackSharp } from "@react-icons/all-files/io5/IoPlaySkipBackSharp";

import "./Navigation.css";

type rangeLimits = {
    limit: number;
    minValue: number | null;
    maxValue: number | null,
}

type Pagination = {
    current: number;
    pages: number;
}

interface NavitationParams extends Pagination {
    onNavigate: (page: number) => any;
}

function LabeledPageNav({ n, label, enabled = true, onClick } : { n: number, label: string | ReactNode, enabled?: boolean, onClick?: () => {} }) {
    return <span className={`page-navegation ${enabled ? "enabled" : "disabled"}`} onClick={onClick}>{label}</span>
}

function NumberedPageNav({ n, active, onClick } : { n: number, active?: boolean, onClick?: () => {} }) {
    return <span className={`page-navegation ${active ? "active": ""}`} onClick={onClick}>{n}</span>
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

function Navigation({ current, pages, onNavigate }: NavitationParams) {
    
    return <div className='pagination'>
        <LabeledPageNav enabled={current > 2} n={0} onClick={() => onNavigate(1)} label={<IoPlaySkipBackSharp />} />
        <LabeledPageNav enabled={current > 0} n={current} onClick={() => onNavigate(current)} label={<IoCaretBackSharp />}  />
        {range(current - 1, current + 1, { limit: 2, minValue: 1, maxValue: current }).map(page => <NumberedPageNav key={page} n={page} onClick={() => onNavigate(page)}/>)}
        <NumberedPageNav active={true} n={current + 1} />
        {range(current + 2, current + 4, { limit: 2, minValue: 0, maxValue: pages }).map(page => <NumberedPageNav key={page} n={page} onClick={() => onNavigate(page)}/>)}
        <LabeledPageNav enabled={current + 1 < pages} n={current + 2} onClick={() => onNavigate(current + 2)} label={<IoCaretForwardSharp />}  />
        <LabeledPageNav enabled={current + 1 < pages} n={pages} onClick={() => onNavigate(pages)} label={<IoPlaySkipForwardSharp/>}  />
    </div>;
}

export default Navigation;
