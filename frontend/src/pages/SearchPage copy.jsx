import axios from "axios";
import { useContext, useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import { setSnackbar, Store } from "../store";
import MessageBox from "../components/MessageBox";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import Product from '../components/Product'
import Loading from '../components/Loading'
import { Button, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import RatingComponent from "../components/RatingComponent";

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
        countProducts: action.payload.countProducts,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function SearchPage() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search); // /search?category=Shirts
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const price = sp.get("price") || "all";
  const rating = sp.get("rating") || "all";
  const order = sp.get("order") || "newest";
  const page = sp.get("page") || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, {
      loading: true,
      // products,
      error: "",
      // countProducts,
      // pages,
    });
  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const { data } = await axios.get(
          `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [category, error, order, page, price, query, rating]);

  const [categories, setCategories] = useState([])
  useEffect(()=>{
    const fetchCategories = async (req, res)=>{
      try{
        const {data} = await axios.get(`/api/products/categories`,
        setCategories(data)
        ) 
      }catch(err){
        ctxDispatch(setSnackbar(true, 'error', getError(err)))
      }
    }
    fetchCategories()
  }, [ctxDispatch])

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page
    const filterCategory = filter.category || category
    const filterQuery = filter.query || query
    const filterRating = filter.rating || rating
    const filterPrice = filter.price || price
    const sortOrder = filter.order || order
    return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${sortOrder}&page=${filterPage}`
}
  return <div>
    <Helmet>
      <title>Search Products</title>
      <Grid container >
        <Grid item md={3}>
          <h3>Department</h3>
          <div>
            <ul>
              <li>
                <Link to={getFilterUrl({ category: 'all'})} className={'all' === category ? 'text-bold' : ''}>Any
                </Link>
              </li>
              { categories.map((c) => {
                  <li key={c}>
                    <Link className={c === category ? 'text-bold' : ''} to={getFilterUrl({ category: c})}>{c}</Link>
                  </li>
              })}
            </ul>
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              <li>
                <Link to={getFilterUrl({ price: 'all'})} className={'all' === price ? 'text-bold' : ''}>Any
                </Link>
              </li>
              {/* { price.map((p) => {
                <li key={p.value}>
                  <Link to={getFilterUrl({ price: p.value})} className={p.value === price ? 'text-bold' : ''}>{p.name}
                </Link>
                </li>
              })} */}
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    to={getFilterUrl({ price: p.value })}
                    className={p.value === price ? 'text-bold' : ''}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Average Customers Review</h3>
            <ul>
              { rating.map((r) => {
                <li key={r.name}>
                  <Link to={getFilterUrl({ rating: r.rating})} className={ `${r.rating}` === `${rating}` ? 'text-bold' : ''}><RatingComponent caption={' & up'} rating={r.rating}></RatingComponent>
                </Link>
                </li>
              })}
              <li>
              <Link to={getFilterUrl({ rating: 'all'})} className={ rating === 'all' ? 'text-bold' : ''}><RatingComponent caption={' & up'} rating={0}></RatingComponent>
                </Link>
              </li>
            </ul>
          </div>
        </Grid>
        <Grid item md={9}>
          { loading ? (
          <Loading></Loading>
          ) : error ? (
            <MessageBox severity='danger'>{error}</MessageBox>
          ) : (
            <>
              <Grid container>
                <Grid item md={6}>
                  <div>
                    { countProducts === 0 ? 'No' : countProducts } Results
                    { query !== 'all' && ' : ' + query } 
                    { category !== 'all' && ' : ' + category } 
                    { price !== 'all' && ' : Price ' + price } 
                    { rating !== 'all' && ' : Rating ' + rating + ' & up' } 
                    { query !== 'all'  || 
                      category !== 'all'  ||
                      rating !== 'all'  ||
                      price !== 'all'  
                      ? (
                        <Button variant='light' onClick={()=> navigate('/search')}><TripOriginIcon></TripOriginIcon></Button>
                      ) : null
                    }

                  </div>
                </Grid>
                <Grid item>
                  Sort by {' '}
                  <select value={order}
                  onChange={(e)=>{
                    navigate(getFilterUrl({ order: e.target.value }))
                  }}
                  >
                    <option value='newest'>Newest Arrival</option>
                    <option value='lowest'>Price: Low to High</option>
                    <option value='highest'>Price: High to Low</option>
                    <option value='toprated'>Avg Customer reviews</option>
                  </select>
                </Grid>
              </Grid>
              { products.length === 0 && (<MessageBox>No Product Found</MessageBox>)}
              <Grid container>
                { products.map((product)=>{
                  <Grid item sm={6} lg={4} key={product._id}>
                    <Product priduct={product}></Product>
                  </Grid>
                })}
              </Grid>
              <div>
                {[ ...Array(pages).keys()].map((x)=>{
                  <Link key={x + 1} to={ getFilterUrl({ page: x + 1 }) }>
                    <Button className={Number(page) === x + 1 ? 'text-bold' : ''} variant='light'>{ x + 1}</Button>
                  </Link>
                })}
              </div>
            </>
          )
        
        }
        </Grid>
      </Grid>
    </Helmet>
  </div>;
}
