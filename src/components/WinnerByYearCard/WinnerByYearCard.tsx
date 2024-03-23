import Card from "../Cards/Card";
import GenericTable from "../GenericTable/GenericTable";
import Loading from "../Loading/Loading";
import style from "./WinnerByYearCard.module.css";

import { IoSearch } from "@react-icons/all-files/io5/IoSearch";

type onChange = (...args: any[]) => void;

function WinnerByYearCard({ data, isLoading, value, onChange } : {data: any[] | null, isLoading?: boolean, value: number, onChange: onChange }) {
  return <Card title="List Movie winners by year">
    <div className={style.inputGroup}>
      <input className={style.searchField} type='number' value={value} onChange={onChange} />
      <span className={style.searchIcon} >
        <IoSearch/>
      </span>
    </div>
    {isLoading ? <Loading/> : <GenericTable 
      columns={{id: "Id", year: "Year", title: "Title"}} 
      data={data} 
    />}
  </Card>;
}

export default WinnerByYearCard;
