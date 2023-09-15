import { CardContent, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { Store } from "../store";
import { getError } from "../utils";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Chart from "react-google-charts";
import StyledH1 from "../ui/pageTitle/PageTitle";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default function DashboardPage() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  console.log(summary);

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div>
      <StyledH1>Dashboard</StyledH1>
      {loading ? (
        <Loading />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <Card>
                <CardHeader title="Users" />
                <CardContent>
                  {summary.users && summary.users[0]
                    ? summary.users[0].numUsers
                    : 0}
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card>
                <CardHeader title="Orders" />
                <CardContent>
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].numOrders
                    : 0}
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              <Card>
                <CardHeader title="Total Sales" />
                <CardContent>
                  ${" "}
                  {summary.orders && summary.users[0]
                    ? summary.orders[0].totalSales.toFixed(2)
                    : 0}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <div>
            <h2>Sales</h2>
            {summary.dailyOrders.length === 0 ? (
              <MessageBox>No Sale</MessageBox>
            ) : (
              <Card>
                <Chart
                  width="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Date", "Sales"],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                ></Chart>
              </Card>
            )}
          </div>

          <div>
            <h2>Categories</h2>
            {summary.productCategories.length === 0 ? (
              <MessageBox>No Category</MessageBox>
            ) : (
              <Paper sx={{ marginBottom: "2rem" }}>
                <Chart
                  width="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart...</div>}
                  data={[
                    ["Category", "Products"],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                ></Chart>
              </Paper>
            )}
          </div>
        </>
      )}
    </div>
  );
}
