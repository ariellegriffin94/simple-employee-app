import { Typography, useMediaQuery } from "@mui/material";

const Header = () => {
  const screenSizeMd = useMediaQuery("(max-width:600px)");
  return (
    <Typography
      sx={{ color: "#eae9fc", fontSize: screenSizeMd ? "4rem" : "6rem" }}
      variant="h1"
    >
      Employees
    </Typography>
  );
};

export default Header;
