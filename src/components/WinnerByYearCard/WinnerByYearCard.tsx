import Card from "../Cards/Card";
import GenericTable from "../GenericTable/GenericTable";
import style from "./WinnerByYearCard.module.css";

import { IoSearch } from "@react-icons/all-files/io5/IoSearch";

type onChange = (...args: any[]) => void;

function WinnerByYearCard({ data, value, onChange } : {data: any[], value: number, onChange: onChange }) {
  return <Card>
    <h2>List Movie winners by year</h2>
    <div className={style.inputGroup}>
      <input className={style.searchField} type='number' value={value} onChange={onChange} />
      <span className={style.searchIcon} >
        <IoSearch/>
      </span>
    </div>
    <GenericTable 
      columns={{id: "Id", year: "Year", title: "Title"}} 
      data={data} 
    />
  </Card>;
}

export default WinnerByYearCard;
