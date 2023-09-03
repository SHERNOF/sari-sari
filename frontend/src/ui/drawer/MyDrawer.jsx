import React, { useContext, useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { setSnackbar, Store } from "../../store";
import axios from "axios";
import { getError } from "../../utils";
import { Link } from "react-router-dom";

export default function MyDrawer() {
  const { dispatch: ctxDispatch } = useContext(Store);
  const [categories, setCategories, sidebarIsOpen] = useState([]);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

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
      open={sidebarIsOpen}
    >
      <div
        onClick={() => setSideBarIsOpen(false)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        Categories
        <ChevronLeftIcon className="custom-icons" />
      </div>
      <Divider></Divider>
      <List>
        {categories.map((category) => (
          <ListItem key={category} disablePadding>
            <Divider></Divider>
            <ListItemButton>
              <Link
                to={`/search?category=${category}`}
                onClick={() => setSideBarIsOpen(false)}
              ></Link>
              <ListItemText primary={category}></ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
