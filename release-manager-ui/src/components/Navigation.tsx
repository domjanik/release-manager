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
        height: { md: "100%", xs: "100px" },
        width: { md: "auto", xs: "100vw" },
        flexDirection: { md: "column", xs: "row" },
        paddingY: Spacings.MEDIUM,
        background: Colors.PURPLE,
        display: "flex",
        flex: "1 1 auto",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <StyledImage src="Fandom_heart-logo.svg (1).png" alt="logo" />
        <NavigationButton
          text="Dashboard"
          onClick={() => goTo("/")}
          styles={{
            color: isActive("/") ? Colors.PINK : Colors.WHITE,
          }}
        />
        <NavigationButton
          text="Release list"
          onClick={() => goTo("/releases")}
          styles={{
            color: isActive("/releases") ? Colors.PINK : Colors.WHITE,
          }}
        />
        <NavigationButton
          text="Version List"
          onClick={() => goTo("/versions")}
          styles={{
            color: isActive("/versions") ? Colors.PINK : Colors.WHITE,
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
          display: { md: "initial", xs: "none" },
        }}
      >
        WITH LOVE FROM 🌮
      </Box>
    </Container>
  );
}
