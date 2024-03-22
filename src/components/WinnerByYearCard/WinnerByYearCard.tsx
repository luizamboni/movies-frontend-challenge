import Card from "../Cards/Card";
import GenericTable from "../GenericTable/GenericTable";
import "./WinnerByYearCard.css";

import { IoSearch } from "@react-icons/all-files/io5/IoSearch";

type onChange = (...args: any[]) => void;

function WinnerByYearCard({ data, value, onChange } : {data: any[], value: number, onChange: onChange }) {
    return <Card>
        <h2>List Movie winners by year</h2>
        <div className="input-group">
            <input className="search-field" type='number' value={value} onChange={onChange} />
            <span className="search-icon">
                <IoSearch/>
            </span>
        </div>
        <GenericTable 
            columns={{id: "Id", year: "Year", title: "Title"}} 
            data={data} 
        />
    </Card>
}

export default WinnerByYearCard;
