import { styled } from "@mui/material";
import { Spacings } from "../consts";

export default styled("img")({
  width: "50%",
  padding: Spacings.XLARGE,

  "@media screen and (max-width: 600px)": {
    height: "100%",
    width: "auto",
    padding: 0,
  },
});
