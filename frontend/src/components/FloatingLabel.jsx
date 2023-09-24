import * as React from "react";

import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  ListItem,
  Menu,
  MenuItem,
  TextareaAutosize,
} from "@mui/material";

export default function FloatingLabel() {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <FormControl>
      {/* <FormControlLabel>Your comment</FormControlLabel> */}
      <TextareaAutosize
        placeholder="Type something here…"
        minRows={3}
        endDecorator={
          <Box
            sx={{
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}
          >
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ "--ListItemDecorator-size": "24px" }}
            >
              {["200", "normal", "bold"].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItem>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItem>
                  {weight === "200" ? "lighter" : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? "soft" : "plain"}
              color={italic ? "primary" : "neutral"}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: "auto" }}>Send</Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? "italic" : "initial",
        }}
      />
    </FormControl>
  );
}
