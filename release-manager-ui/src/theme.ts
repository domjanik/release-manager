import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Colors } from "./consts";

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: { default: Colors.LIGHT_GRAY, paper: Colors.LIGHT_GRAY },
  },
});

export default theme;
