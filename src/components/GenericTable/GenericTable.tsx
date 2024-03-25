import { FC as FunctionalComponent } from "react";
import classNames from "classnames";

import Navitation from "./Navigation";
import style from "./GenericTable.module.css";

type ColumnsType = {
  [key: string]: string;
};

interface Pagination {
  current: number,
  pages: number,
}

type onFilter = (value: any) => void

interface Filter {
  type: "text" | "select"
  placeholder: string
  value: string | number
  options?: string[]
  field?: string
  onFilter: onFilter
}

export interface Filters {
  [key: string]: Filter;
}

const FilterComponent: FunctionalComponent<Filter> = ({ field, type, placeholder, options, value, onFilter}) => {

  return <div className={style.tableThColumnFilter} >
    {type === "text" &&
      <input data-testid={field} className={style.textFilter} type="text" value={value} onChange={(event): void => onFilter(event.target.value)} placeholder={placeholder} />
    }
    {type === "select" &&
      <select data-testid={field} className={style.selectFilter} defaultValue={placeholder} onChange={(event): void => onFilter(event.target.value) }>
        <option value="">{placeholder}</option>
        {options?.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    }
  </div>;
};

type onNavigate = (page: number) => void;

interface GenericTableProps {
  title?: string | null;
  centerHeaders?: boolean;
  columns: ColumnsType;
  data: any[] | null;
  pagination?: Pagination;
  filters?: Filters;
  onNavigate?: onNavigate
};

const GenericTable: FunctionalComponent<GenericTableProps> = ({ title, columns, data, pagination, filters = {}, centerHeaders = false, onNavigate }) => {
  return (
    <div className={style.genericTableContainer}>
      {title && <h2 className={style.genericTableContainerH2}>{title}</h2>}
      <table className={style.table}>
        <thead className={style.tableThead}>
          <tr>
            {Object.entries(columns).map(([key, displayName]) => (
              <th className={style.tableThTd} key={key} style={{textAlign: centerHeaders ? "center" : "left"}}>
                <p className={style.tableThP}>{displayName}</p>
                {filters[key] && <FilterComponent field={key} {...filters[key]} />}
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
