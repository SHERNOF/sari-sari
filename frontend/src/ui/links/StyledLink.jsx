/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import Link from "@mui/material/Link";

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink
    ref={ref}
    to="/material-ui/getting-started/installation/"
    {...props}
  />
));

function Router(props) {
  const { children } = props;
  if (typeof window === "undefined") {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

Router.propTypes = {
  children: PropTypes.node,
};

export default function StyledLink(props) {
  return (
    <Link
      component={RouterLink}
      to={props.to}
      style={{ textDecoration: "none", fontSize: ".3em" }}
    >
      {props.children}
    </Link>
  );
}
