import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { Colors, Spacings } from "../consts";

type WidgetWindowProps = {
  sx?: SxProps<Theme>;
  title: string;
  children: React.ReactNode;
  additionalOptions?: React.ReactNode;
};

export function WidgetWindow({
  children,
  sx,
  title,
  additionalOptions,
}: WidgetWindowProps): JSX.Element {
  return (
    <Box
      sx={{
        ...sx,
        borderWidth: Spacings.MIN,
        borderColor: Colors.PURPLE,
        borderStyle: "solid",
        borderRadius: Spacings.SMALL,
      }}
    >
      <Box
        sx={{
          textTransform: "uppercase",
          borderTopLeftRadius: Spacings.SMALL,
          borderTopRightRadius: Spacings.SMALL,
          paddingY: Spacings.SMALL,
          paddingX: Spacings.LARGE,
          fontWeight: "bold",
          color: Colors.PURPLE,
          background: Colors.YELLOW,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {title}
        {additionalOptions}
      </Box>
      <Box sx={{ padding: Spacings.MEDIUM }}>{children}</Box>
    </Box>
  );
}
