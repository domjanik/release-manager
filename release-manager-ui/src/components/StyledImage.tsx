import { styled } from "@mui/material";
import { Spacings } from "../consts";

export default styled("img")({
  width: "50%",
  padding: Spacings.XLARGE,
  minWidth: "150px",
  minHeight: "150px",

  "@media screen and (max-width: 600px)": {
    height: "100%",
    display: "none",
    width: "auto",
    padding: 0,
  },
});
