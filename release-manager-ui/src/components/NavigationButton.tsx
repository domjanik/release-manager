import Button from "@mui/material/Button";
import React from "react";

type NavigationButtonProps = {
  onClick?: () => void;
  text: string;
  styles?: React.CSSProperties;
};

export function NavigationButton({
  onClick,
  text,
  styles,
}: NavigationButtonProps): JSX.Element {
  return (
    <Button variant="text" fullWidth={true} onClick={onClick} sx={styles}>
      {text}
    </Button>
  );
}
