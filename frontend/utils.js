
export const Root = styled("div")(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down("md")]: {
      backgroundColor: red[500],
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: blue[500],
    },
    [theme.breakpoints.up("lg")]: {
      backgroundColor: green[500],
    },
  }));