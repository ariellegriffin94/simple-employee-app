import * as React from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { IEmployee } from "../services/employee";
import { IFilter } from "./EmployeeTable";

interface IEmployeeTableFilter {
  options: string[];
  updateEmployees: (filterText: IFilter) => void;
  ariaLabelList: string;
  ariaLabelListItemButton: string;
  listItemText: string;
  prop: keyof IEmployee;
  addFilterText: (filter: {
    title: string;
    department: string;
    search: string;
  }) => void;
  filterText: IFilter;
}

const EmplyeeTableFilter = ({
  options,
  updateEmployees,
  ariaLabelList,
  ariaLabelListItemButton,
  listItemText,
  prop,
  addFilterText,
  filterText,
}: IEmployeeTableFilter) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    _event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    const updatedFilter = {
      ...filterText,
      [prop]: `${prop.toUpperCase()}: ${options[index]}`,
    };

    addFilterText(updatedFilter);
    setSelectedIndex(index);
    updateEmployees(updatedFilter);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <List
        component="nav"
        aria-label={ariaLabelList}
        sx={{
          bgcolor: "#3a31d8",
          color: "#eae9fc",
          border: "2px solid #eae9fc",
          width: "150px",
          borderRadius: "5px",
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label={ariaLabelListItemButton}
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText primary={listItemText} />
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default EmplyeeTableFilter;
