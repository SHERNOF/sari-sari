import {
  Box,
  Grid,
  Table,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { setSnackbar, Store } from "../store";
import { getError } from "../utils";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import StyledButton from "../ui/button/Button";
import StyledH1 from "../ui/pageTitle/PageTitle";
import CreateIcon from "@mui/icons-material/Create";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };

    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ProductListPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [
    {
      loading,
      error,
      products,
      pages,
      loadingCreate,
      loadingDelete,
      successDelete,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const page = sp.get("page") || 1;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/products/admin?page=${page}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    // fetchData();
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [page, userInfo, successDelete]);

  const createHandler = async () => {
    if (window.confirm("Are you sure you want to create?")) {
      try {
        dispatch({ type: "CREATE_REQUEST " });
        const { data } = await axios.post(
          "/api/products",
          {},
          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        ctxDispatch(
          setSnackbar(true, "success", "Product Created Successfully")
        );
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        ctxDispatch(setSnackbar(true, "error", getError(err)));
        dispatch({ type: "CREATE_FAIL" });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(`/api/products/${product._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        ctxDispatch(setSnackbar(true, "error", "Product Successfully deleted"));

        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        ctxDispatch(setSnackbar(true, "success", getError(err)));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Grid
        container
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <StyledH1>Product</StyledH1>
        </Grid>
        <Grid item sx={{ marginRight: "1rem", marginBottom: "1rem" }}>
          <Box
            sx={{
              // width: "8rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CreateIcon
              onClick={createHandler}
              sx={{ cursor: "pointer" }}
            ></CreateIcon>
          </Box>
        </Grid>
      </Grid>
      {loadingCreate && <Loading />}
      {loadingDelete && <Loading />}

      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>ID</StyledTableCell>
                  <StyledTableCell>NAME</StyledTableCell>
                  <StyledTableCell>PRICE</StyledTableCell>
                  <StyledTableCell>CATEGORY</StyledTableCell>
                  <StyledTableCell>BRAND</StyledTableCell>
                  <StyledTableCell>ACTIONS</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <StyledTableRow key={product._id}>
                    <StyledTableCell>{product._id}</StyledTableCell>
                    <StyledTableCell>{product.name}</StyledTableCell>
                    <StyledTableCell>{product.price}</StyledTableCell>
                    <StyledTableCell>{product.category}</StyledTableCell>
                    <StyledTableCell>{product.brand}</StyledTableCell>
                    <StyledTableCell>
                      <StyledButton
                        type="button"
                        onClick={() =>
                          navigate(`/admin/product/${product._id}`)
                        }
                        sx={{ width: "100%" }}
                      >
                        {" "}
                        Edit
                      </StyledButton>
                      &nbsp; &nbsp;
                      <StyledButton
                        type="button"
                        onClick={() => deleteHandler(product)}
                      >
                        Delete
                      </StyledButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="paginationHolder">
            {[...Array(pages).keys()].map((x) => (
              <Link
                to={`/admin/products/?page=${x + 1}`}
                key={x + 1}
                className={x + 1 === Number(page) ? "btn text-bold" : "btn"}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </>
      )}
    </Box>
  );
}
