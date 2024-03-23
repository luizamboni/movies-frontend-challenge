import React from "react";

import Navitation from "./Navigation";
import "./GenericTable.css";

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
  onFilter: (...args: any[]) => any;
}

type Filters = {
  [key: string]: Filter;
}

type GenericTableProps = {
  title?: string | null;
  centerHeaders?: boolean;
  columns: ColumnsType;
  data: any[];
  pagination?: Pagination;
  filters?: Filters;
  onNavigate?: (page: number) => any;
};

function FilterComponent({ type, placeholder, options, value, onFilter}: Filter) {

  return <div>
    {type === "text" &&
      <input type="text" value={value} onChange={(event) => onFilter(event.target.value)} placeholder={placeholder} />
    }
    {type === "select" &&
      <select defaultValue={placeholder} onChange={(event) => onFilter(event.target.value) }>
        <option value="">{placeholder}</option>
        {options?.map(option => <option value={option}>{option}</option>)}
      </select>
    }
  </div>;
}

const GenericTable: React.FC<GenericTableProps> = ({ title, columns, data, pagination, filters = {}, centerHeaders = false, onNavigate }) => {
  return (
    <div className='generic-table-container'>
      {title && <h2>{title}</h2>}
      <table>
        <thead>
          <tr>
            {Object.entries(columns).map(([key, displayName]) => (
              <th key={key} style={{textAlign: centerHeaders ? "center" : "left"}}>
                <p>{displayName}</p>
                {filters[key] && <FilterComponent  key={key} {...filters[key]} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.keys(columns).map((columnKey) => (
                <td key={columnKey}>{item[columnKey]}</td>
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
