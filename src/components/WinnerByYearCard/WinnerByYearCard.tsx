import { FC as FunctionalComponent } from "react";
import Card from "../Cards/Card";
import GenericTable from "../GenericTable/GenericTable";
import Loading from "../Loading/Loading";
import style from "./WinnerByYearCard.module.css";

import { IoSearch } from "@react-icons/all-files/io5/IoSearch";

type onChange = (value: any) => void;

interface winnerByYearParams {
  data: any[] | null, 
  isLoading?: boolean, 
  value: number,
  onChange: onChange,
}

const WinnerByYearCard: FunctionalComponent<winnerByYearParams> = ({data, isLoading, value, onChange }) => {
  return <Card title="List Movie winners by year">
    <div className={style.inputGroup}>
      <input className={style.searchField} type='number' value={value} onChange={(e): void => onChange(e.target.value)} />
      <span className={style.searchIcon} >
        <IoSearch/>
      </span>
    </div>
    {isLoading ? <Loading/> : <GenericTable 
      columns={{id: "Id", year: "Year", title: "Title"}} 
      data={data} 
    />}
  </Card>;
};

export default WinnerByYearCard;
