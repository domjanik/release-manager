import React from "react";
import { Container } from "@mui/system";
import { NavigationButton } from "./NavigationButton";
import { Colors, Spacings } from "../consts";
import StyledImage from "./StyledImage";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Navigation(): JSX.Element {
  const navigate = useNavigate();
  const goTo = (route: string): void => {
    navigate(route);
  };

  const isActive = (route: string): boolean => {
    return window.location.pathname === route;
  };

  return (
    <Container
      sx={{
        height: "100%",
        paddingY: Spacings.MEDIUM,
        background: Colors.PURPLE,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <StyledImage src="Fandom_heart-logo.svg (1).png" alt="logo" />
        <NavigationButton
          text="Release list"
          onClick={() => goTo("/")}
          styles={{
            color: isActive("/") ? Colors.PINK : Colors.WHITE,
          }}
        />
        <NavigationButton
          text="Feature Flags"
          onClick={() => goTo("/feature-flags")}
          styles={{
            color: isActive("/feature-flags") ? Colors.PINK : Colors.WHITE,
          }}
        />
      </Box>
      <Box
        sx={{
          fontSize: "10px",
          color: Colors.WHITE,
          textAlign: "center",
          fontFamily: "American Typewriter",
        }}
      >
        WITH LOVE FROM 🌮
      </Box>
    </Container>
  );
}
