import React, { useContext, useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import StyledLink from "../ui/links/StyledLink";
import { setSideBarIsOpen, setSnackbar, Store } from "../store";
import axios from "axios";
import { getError } from "../utils";

export default function MyDrawer() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { sideBarIsOpen } = state;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        ctxDispatch(setSnackbar(true, "error", getError(err)));
      }
    };
    fetchCategories();
  }, []);

  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      open={sideBarIsOpen}
    >
      <Box
        onClick={() => ctxDispatch(setSideBarIsOpen(false))}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <strong>Categories</strong>
        <ChevronLeftIcon className="custom-icons" />
      </Box>
      <Divider></Divider>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <ListItemButton>
              <StyledLink
                to={`/search?category=${category}`}
                onClick={() => ctxDispatch(setSideBarIsOpen(false))}
              ></StyledLink>
              <ListItemText primary={category}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
