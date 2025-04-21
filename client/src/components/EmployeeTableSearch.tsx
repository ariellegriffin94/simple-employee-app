import * as React from "react";

import { TextField } from "@mui/material";
import { IEmployee } from "../services/employee";

interface IEmployeeTableSearch {
  employees: IEmployee[];
  updateEmployees: (filterText: {
    title: string;
    department: string;
    search: string;
  }) => void;
  addFilterText: (filter: {
    title: string;
    department: string;
    search: string;
  }) => void;
  filterText: { title: string; department: string; search: string };
}

const EmployeeTableSearch = ({
  updateEmployees,
  addFilterText,
  filterText,
}: IEmployeeTableSearch) => {
  const [textValue, setTextValue] = React.useState<string>("");

  const handleTextSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
    const updatedFilter = {
      ...filterText,
      search: event.target.value?.length
        ? `TEXT SEARCH: ${event.target.value}`
        : "",
    };
    addFilterText(updatedFilter);
    updateEmployees(updatedFilter);
  };

  React.useEffect(()=>{
    if (filterText.search===""){
        setTextValue("")
    }

  },[filterText])

  return (
    <TextField
      id="outlined-controlled"
      placeholder="Type to Filter"
      value={textValue}
      onChange={handleTextSearch}
      sx={{
        border: "2px solid #eae9fc",
        width: "150px",
        background: "#3a31d8",
        color: "#eae9fc",
        borderRadius: "5px",
      }}
    />
  );
};

export default EmployeeTableSearch;
