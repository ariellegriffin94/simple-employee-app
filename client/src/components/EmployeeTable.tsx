import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getEmployees, IEmployee } from "../services/employee";
import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import EmplyeeTableFilter from "./EmployeeTableFilter";
import EmployeeTableSearch from "./EmployeeTableSearch";

interface ITableHeader {
  id: number;
  title: string;
  sorted: boolean;
  sortedAsc: boolean;
  property: keyof IEmployee;
}

export interface IFilter {
  title: string;
  department: string;
  search: string;
}

const defaultTableHeaders: ITableHeader[] = [
  { id: 1, title: "ID", sorted: true, sortedAsc: true, property: "id" },
  {
    id: 2,
    title: "First Name",
    sorted: false,
    sortedAsc: false,
    property: "firstName",
  },
  {
    id: 3,
    title: "Last Name",
    sorted: false,
    sortedAsc: false,
    property: "lastName",
  },
  { id: 4, title: "Email", sorted: false, sortedAsc: false, property: "email" },
  {
    id: 5,
    title: "Department",
    sorted: false,
    sortedAsc: false,
    property: "department",
  },
  { id: 6, title: "Title", sorted: false, sortedAsc: false, property: "title" },
];

const StyledTableCell = styled(TableCell)<TableCellProps>(() => ({
  color: "#eae9fc",
  textAlign: "center",
}));
export default function EmployeeTable() {
  const [employees, setEmployees] = React.useState<IEmployee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = React.useState<IEmployee[]>(
    [],
  );
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [tableHeaders, setTableHeaders] =
    React.useState<ITableHeader[]>(defaultTableHeaders);
  const [departmentOptions, setDepartmentOptions] = React.useState<string[]>(
    [],
  );
  const [titleOptions, setTitleOptions] = React.useState<string[]>([]);

  const [filterText, setFilterText] = React.useState<IFilter>({
    title: "",
    department: "",
    search: "",
  });
  const [filterTextArr, setFilterTextArr] = React.useState<string[]>([]);

  const screenSizeMd = useMediaQuery("(max-width:600px)");

  const updateEmployees = (filter: IFilter) => {
    const updatedEmployees = employees.filter((employee) => {
      const cleanedId = employee.id.toString();
      const cleanedFirstName = employee.firstName.toLowerCase();
      const cleanedLastName = employee.lastName.toLowerCase();
      const cleanedEmail = employee.email.toLowerCase();
      const cleanedDepartment = employee.department.toLowerCase();
      const cleanedTitle = employee.title.toLowerCase();
      const cleanedSearch = filter.search
        .replace("TEXT SEARCH: ", "")
        .toLowerCase();

      const selectedDepartment = filter.department.replace("DEPARTMENT: ", "");
      const selectedTitle = filter.title.replace("TITLE: ", "");

      return (
        (cleanedId.includes(cleanedSearch) ||
          cleanedFirstName.includes(cleanedSearch) ||
          cleanedLastName.includes(cleanedSearch) ||
          cleanedEmail.includes(cleanedSearch) ||
          cleanedDepartment.includes(cleanedSearch) ||
          cleanedTitle.includes(cleanedSearch)) &&
        (!selectedDepartment?.length ||
          employee.department === selectedDepartment) &&
        (!selectedTitle?.length || employee.title === selectedTitle)
      );
    });

    setFilteredEmployees(updatedEmployees);
  };

  const addFilterText = (filter: IFilter) => {
    setFilterText(filter);
    let clearedFilterTextArra = [];

    if (filter?.title.length) clearedFilterTextArra.push(filter?.title);
    if (filter?.department.length)
      clearedFilterTextArra.push(filter?.department);
    if (filter?.search.length) clearedFilterTextArra.push(filter?.search);
    setFilterTextArr(clearedFilterTextArra);
  };
  const handleSortClick = (id: number) => {
    const updatedHeaders = tableHeaders.map((header) => {
      if (id === header.id) {
        header.sorted = true;
        header.sortedAsc = !header.sortedAsc;
      } else {
        header.sorted = false;
        header.sortedAsc = false;
      }
      return header;
    });

    let updatedSort: IEmployee[] = [];
    const currentSort = updatedHeaders.find((header) => header.sorted === true);
    const currentProp = currentSort?.property ?? "id";
    if (currentSort?.sortedAsc && currentProp !== "id") {
      updatedSort = employees.sort((a, b) =>
        a[currentProp].localeCompare(b[currentProp]),
      );
    } else if (!currentSort?.sortedAsc && currentProp !== "id") {
      updatedSort = employees.sort((a, b) =>
        b[currentProp].localeCompare(a[currentProp]),
      );
    } else if (currentSort?.sortedAsc) {
      updatedSort = employees.sort((a, b) => a.id - b.id);
    } else if (!currentSort?.sortedAsc) {
      updatedSort = employees.sort((a, b) => b.id - a.id);
    }

    setFilteredEmployees(updatedSort);
    setTableHeaders(updatedHeaders);
  };

  React.useEffect(() => {
    getEmployees().then((res) => {
      if (res.isSuccessful) {
        const resData = res.data as IEmployee[];

        let departments: string[] = [];
        let titles: string[] = [];
        resData.forEach((employee) => {
          if (!departments.includes(employee.department)) {
            departments.push(employee.department);
          }
          if (!titles.includes(employee.title)) {
            titles.push(employee.title);
          }
        });
        setDepartmentOptions(departments);
        setTitleOptions(titles);
        setEmployees(resData);
        setFilteredEmployees(resData);
      } else {
        setErrorMessage((res.data as { message: string }).message);
      }
    });
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: screenSizeMd ? "column" : "row",
            justifyContent: "space-between",
            padding: screenSizeMd ? "50px" : "50px 0",
          }}
        >
          <EmplyeeTableFilter
            options={departmentOptions}
            updateEmployees={updateEmployees}
            ariaLabelList="Filter By Departments"
            ariaLabelListItemButton="Department Options"
            listItemText="Filter By Departments"
            prop="department"
            addFilterText={addFilterText}
            filterText={filterText}
          />

          <EmplyeeTableFilter
            options={titleOptions}
            updateEmployees={updateEmployees}
            ariaLabelList="Filter By Titles"
            ariaLabelListItemButton="Title Options"
            listItemText="Filter By Titles"
            prop="title"
            addFilterText={addFilterText}
            filterText={filterText}
          />

          <EmployeeTableSearch
            employees={filteredEmployees}
            updateEmployees={updateEmployees}
            addFilterText={addFilterText}
            filterText={filterText}
          />
          <Button
            variant="outlined"
            sx={{
              bgcolor: "#3a31d8",
              color: "#eae9fc",
              border: "2px solid #eae9fc",
              width: "154px",
              borderRadius: "5px",
            }}
            onClick={() => {
              setFilterText({ search: "", department: "", title: "" });
              updateEmployees({ search: "", department: "", title: "" });
              setFilterTextArr([]);
            }}
          >
            Clear Filters
          </Button>
        </Box>

        <Box sx={{ padding: "50px 0" }}>
          <Typography sx={{ color: "#eae9fc" }} variant="h6">
            Filters Set:
          </Typography>
          <Typography sx={{ color: "#eae9fc" }}>
            {!filterTextArr?.length ? "None" : filterTextArr.join(" + ")}
          </Typography>
        </Box>

        {errorMessage?.length ? (
          <Typography>{errorMessage}</Typography>
        ) : (
          <TableContainer
            component={Paper}
            sx={{ background: "#3a31d8", maxWidth: "800px" }}
          >
            <Table
              sx={{ minWidth: 300, border: "2px solid #eae9fc" }}
              aria-label="employee table"
            >
              <TableHead>
                <TableRow>
                  {tableHeaders.map((header) => (
                    <StyledTableCell
                      key={header.id}
                      onClick={() => handleSortClick(header.id)}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {header.title}{" "}
                        {header.sorted && header.sortedAsc ? (
                          <ArrowDownwardIcon sx={{ height: "15px" }} />
                        ) : header.sorted && !header.sortedAsc ? (
                          <ArrowUpwardIcon sx={{ height: "15px" }} />
                        ) : (
                          <span></span>
                        )}
                      </Box>
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((row) => (
                  <TableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell>{row.firstName}</StyledTableCell>
                    <StyledTableCell>{row.lastName}</StyledTableCell>
                    <StyledTableCell>{row.email}</StyledTableCell>
                    <StyledTableCell>{row.department}</StyledTableCell>
                    <StyledTableCell>{row.title}</StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
}
