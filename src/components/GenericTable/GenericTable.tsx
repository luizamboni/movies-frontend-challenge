import React from "react";

import Navitation from "./Navigation";
import style from "./GenericTable.module.css";
import classNames from "classnames";

type ColumnsType = {
  [key: string]: string;
};

type Pagination = {
  current: number;
  pages: number;
}

type Filter = {
  type: "text" | "select"
  placeholder: string;
  value: string | number
  options?: string[];
  onFilter: (...args: any[]) => void;
}

export type Filters = {
  [key: string]: Filter;
}

type GenericTableProps = {
  title?: string | null;
  centerHeaders?: boolean;
  columns: ColumnsType;
  data: any[] | null;
  pagination?: Pagination;
  filters?: Filters;
  onNavigate?: (page: number) => void;
};

function FilterComponent({ type, placeholder, options, value, onFilter}: Filter) {

  return <div className={style.tableThColumnFilter} >
    {type === "text" &&
      <input className={style.textFilter} type="text" value={value} onChange={(event) => onFilter(event.target.value)} placeholder={placeholder} />
    }
    {type === "select" &&
      <select className={style.selectFilter} defaultValue={placeholder} onChange={(event) => onFilter(event.target.value) }>
        <option value="">{placeholder}</option>
        {options?.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    }
  </div>;
}

const GenericTable: React.FC<GenericTableProps> = ({ title, columns, data, pagination, filters = {}, centerHeaders = false, onNavigate }) => {
  return (
    <div className={style.genericTableContainer}>
      {title && <h2 className={style.genericTableContainerH2}>{title}</h2>}
      <table className={style.table}>
        <thead className={style.tableThead}>
          <tr>
            {Object.entries(columns).map(([key, displayName]) => (
              <th className={style.tableThTd} key={key} style={{textAlign: centerHeaders ? "center" : "left"}}>
                <p className={style.tableThP}>{displayName}</p>
                {filters[key] && <FilterComponent key={key} {...filters[key]} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index} className={classNames({[style.tableTrNthChildOdd]: index % 2 !== 0})}>
              {Object.keys(columns).map((columnKey) => (
                <td key={columnKey} className={style.tableTd} >{item[columnKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {(pagination && onNavigate) && <Navitation {...pagination} onNavigate={onNavigate} />}
    </div>
  );
};

export default GenericTable;
