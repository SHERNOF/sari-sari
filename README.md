# MERN sari-sari

1.  App birth
    a. npx create-react-app frontend
    b. all frontend codes here and later on server side will be put in the backend folder
    c. third folder will be store to manage the state
    d. clean up. remove unnecessary files and imports in App.js
    e. plan to use material-ui as a back up for UI
    f. framer for animation
    g. react-icons
    h. Maybe react-spring
    i. initially use index.css for styling
    j. create the header

2.  put the project to github
    a. remove .git in frontend >>> rm -rf .git
    b. put the .gitignore to sari-sari
    c. remove the / in node_modules and build
    d. in source control, initialize repository
    e. create the README.md in root

3.  create the HomePaage and list the products
    A. create the data.js inside the src. data.js
    a1. 679px x 829px - img size
    a2. export dfault data
    a3. code the App.js / <main>. use map to itirate the {data.js}. style the <main>

    B. Routing
    b1. npm i react-router-dom >>> https://reactrouter.com/en/main/start/tutorial
    b1a. basic elements of react-router-dom >>> <BrowserRouter/>, <Routes/>, <Route/>, useRouteError,
    b2. create the route for HomePage

    b3. import as a name import the <BrowserRouter /> and Wrap the whole App by <BrowserRouter>
    b4. Wrap the <Home /> by <Routes/> then <Route />

    b5. create the route for Product page
    b5a. use the { useParams } function from react-router-dom and deconstruct { desc } = params
    b5b. destructure the product object and get the desc key value pair from params. It came from the App.js '/product/:dec'.
    b5c. At this stage, the page is refreshing every image click. Address this by changing the <a /> to <Link /> from react-router-dom. change the href to to

    C. Setting up the node js backend api
    c1. create the backend folder in the root and run npm init inside the backend folder
    c2. update the package.json and et type: module; module is to be use
    instead of require in importing packages
    c3. Add .js to imports
    c4. npm i express
    c5. create server.js

    const app = express()

    app.get('/api/products', (req, res)=>{
    res.send(data.products)
    })

    '/api/products' = the api
    (req, res) => {} = is the function that will execute when the api is navigated

    access the data from the backend by copying the data.js from fe and transfer it to be

    define the port
    const port = process.env.PORT || 5000
    app.listen(port, console.log(`serve at http://localhost:${port}`))
    app.listen returns two parameters, 1. port 2. is the callback

    c6. npm i nodemon --save-dev add in package.json start: "nodemon serer.js". npm start to start the server

    D. Fetch the products from backend
    d1. set proxy in the FE package.json >>> "proxy":"http://localhost:5000"
    d2. npm i axios in FE >>> https://axios-http.com/
    Axios is a simple promise based HTTP client for the browser and node.js. Axios provides a simple to use library in a small package with a very extensible interface.
    d3. use of React hooks (useState, useEffect and useReducer) initally in <Home />
    d4. can remove now import data from "../data"; as the data is now coming from BE. change data to products

    E. Improve data management using the useReducer in <Home /> useEffect
    e1. define reducer
    e2. update fetch data
    e3. get state from useReducer instead of useState
    const reducer = (state, action) => {
    switch (action.type) {
    case "FETCH_REQUEST":
    return { ...state, loading: true };
    case "FETCH_SUCCESS":
    return { ...state, loading: false, products: action.payload };
    case "FETCH_FAIL":
    return { ...state, loading: false, error: action.payload };
    default:
    return state;
    }
    };

    e4. remove the const [products, setproducts] = useState([]); and use dispatch

    const [{loading, error, products}, dispatch] = useReducer(reducer, {
    loading: true,
    error:''
    })

    useReducer has two parameters; the reducer and the initial state {}

    e5. use the dispatch to update the state in useEffect. Use the
    try{

    }catch(){}

    to get the error from ajax request

    e6. create the <Loading />. use loading component from MUI

4.  Create Product Component
    4a. utilize the Material UI for the responsiveness and UI components 4. create the rating component to define it conditionally

5.  Improve the ProductPage.jsx
    Plans
    5a. display the image, details and action part by using the { desc } = params as reference
    5b. Put the logic of displaying its existence (available or not available)

    Execute
    5c. use similar reducer from the <Home /> and modified it to suit for a single prodcut display

    5d. create the BE api axios.get(`/api/products/desc/${desc}`) using ${desc} again as the reference

    use the find() method to find the existence of { desc } and return product from data.products if found one

    app.get("/api/products/desc/:desc", (req, res) => {
    const product = data.products.find((x) => x.desc === req.params.desc);
    if (product) {
    res.send(data.product);
    } else {
    res.status(404).send.message("Product not found...");
    }
    });

    5c. Again configure properly the reducer to remove the "s" in products as this should only return one product

    const reducer = (state, action) => {
    switch (action.type) {
    case "FETCH_REQUEST":
    return { ...state, loading: true };
    case "FETCH_SUCCESS":
    return { ...state, loading: false, product: action.payload };
    case "FETCH_FAIL":
    return { ...state, loading: false, error: action.payload };
    default:
    return state;
    }
    };

    5d. design the UI of the ProductPage.jsx using the state
    5e. display the product name in the page title by using npm i react-helmet-async. then wrap the whole <HelmetProvider><App /><HelmetProvider /> in the index.js
    5f. wrap the <Helmet><h3>{product.name}</h3></Helmet> and change h3 to title <Helmet><title>{product.name}</title></Helmet>
    5g. in the <Home />; <Helmet><title>sari-sari</title>; this is to display sari-sari upon clicking the header button sari-sari

    5h. Create Loading Component
    5h1. create the spinner Loading.jsx component >>> this is to replace the <Loading... />
    5j. create the message component
    5j1. use the <Alert /> from mui <Alert severity={props.severity}>{props.children}</Alert>; in the <MessageBox>. Set the dynamic variant. Implement in the {error} of the <ProductPage /> and <Home />. Pass the severity as props and props.children to display the error message
    5k. create the utils.js to handle the error message
    5k1. define the function getError() to capture the custom error message from BE. Implement this in BE and pass the (err) as the parameter dispatch({ type: "FETCH_FAIL", payload: err.message }); >>> dispatch({ type: "FETCH_FAIL", payload: getError(err) });

6.  Create the Cart Page

    a. Setup the context >>> this is to save the cart items in the global state and use in the needed components
    a1. create the store.js inside the src
    a2. define the function StoreProvider
    a3. define the initialState which is the cart and its first attribute is the cartItems. cartItems by default is an empty array as it has no item yet in the cart
    a4. define the reducer. first reducer is the CART_ADD_ITEM

    b. define the CART_ADD_ITEM reducer
    b1. return all values in the field and add new item to the cart. return all the previous values in the cart and add the new item to the cartItems
    b2. in the cartItems, retain the previous item in the cart cartItems:[...state.cart.cartItems] and add the new one as the action.payload
    case 'CART_ADD_ITEM':
    // Add to cart
    return {
    ...state,
    cart:{
    ...state.cart,
    cartItems:[...state.cart.cartItems, action.payload],
    },
    }

    c. wrap the <App /> by the <Store.Provider />
    d. In the <ProductPage /> set the onClick={addToCartHandler} to
    the submit <Button />. This is the function that will add item to cart
    d1. dispatch the CART_ADD_ITEM from the contex. With const {state, dispatch: ctxDispatch} = useContext(), there's now an access to the state
    d2. concatanate the product and add 1 to its quantity everytime there's an add to cart action

          ctxDispatch({
             type: 'CART_ADD_ITEM',
             payload: {...product, quanitty : 1}
          })

          e. in the <App />, header, add the badge to display the quantity in the cart. put the context in the <App />. deconstruct { cart } = state. pass the Store as the parameter of useContext(Store)

          f. Complete the add functionality
          f1. Check if there's existing item in the cart
             f11. add _id: "1" to the data.js. this will be the format of _id in mongodb

             f12. in the <ProductPage />, check if there's an existing item in the cart

             const existItem = cart.cartItems.find((x)=>{x._id === product._id})

             const quantity = existItem ? existItem.quantity + 1 : 1

             DESTRUCTURE const { cart } = state. make the function as async



          f2. check stock count in BE

             put a check if the countInStock is < quanity

             if(data.countInStock < quantity)(
                window.alert('{Product not found...')
             )

             at server.js,

             app.get("/api/products/desc/:id", (req, res) => {
             const product = data.products.find((x) => x._id === req.params._id);
             if (product) {
                res.send(product);
             } else {
                res.status(404).send({ message: "Product not found..." });
             }
             });


             at Store.js, the plan is to add items to the cart in terms of quantity if there's a similar item already. and add the item as new if the existItem doesn't exist

             const newItem = action.payload
            const existItem = state.cart.cartItems.find((item) => item._id === newItem._id)

            use map() to update the cart if newItem is already in cart
            const cartItems = existItem ? state.cart.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cart.cartItems, newItem]

            then, display the cart items by
            return {...state, cart:{...state.cart, cartItems}}

            no need for the previous version of adding to cart
            // return {
            //     ...state,
            //     cart:{
            //         ...state.cart,
            //         cartItems:[...state.cart.cartItems, action.payload],
            //     },
            // }

            to display the updated quantity in the cart, in the <App />, use reduce instead of displaying only the length

            <Badge badgeContent={cart.cartItems.length} color="secondary">cart</Badge> >>>
            <Badge badgeContent={cart.cartItems.reduce((a, c) => a + c.quantity, 0)}color="secondary">cart</Badge>

            this will sum up the total quantity by using the accumulator parameter in the reduce(). initial value of accumulator = 0

            in <ProductPage />, revise the quantity : 1 to quantity to display it accurately
            payload: { ...product, quanitty: 1 }, >>> payload: { ...product, quanitty },

            The <ProductPage /> has now the functionality of the following:
            a. check the duplication of items in the cart and only add the quantity if there's a duplicate.

            b. use the reduce() to compute the total quantity in the cart and display it in the badge. used initial accumulator as 0

            c. Check if there's 0 stock of the product and will not able to add it in the cart if 0

    g. Create the <CartPage /> - this is to create the <CartPage /> when the user click the Add to Cart button. it will show the list of items added by the useer. It should have a - + to decrease and increase the quantity of the item as well as to delete the item and the total price of each item. It also featured the "Proceed to Check Out" as well as the total price of all items inside the cart

    Plans:
    g1. Create the <CartPage /> and create two columns. first column is for the list of items. 2nd column is for the Total Price of all the Items and the Proceed to Check Out button
    g1a. Use the state from the context. from state, create the cart, from cart create the cartItems.

        g1b. Set the <Helmet><title>Shopping Cart</title></Helmet>
        g1c. create the first column that will conditionally contain the list of items

    g2. In the <App />, set the <Route path='/cart' element={<CartPage />}/>

    g3. In the <ProductPage />, at the ctxDispatch, add navigate('/cart'). navigate is a method from useNavigate() from react-router-dom to navigate the app to other page

    g4. Add the action part in the 2nd column. This will contain the
    g4a. use reduce() to compute for the total price of the items in the cart

                    <Card>
                    <List>
                    <ListItem>
                        <h3>
                        SubTotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                        {""} items : $
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)})
                        </h3>
                    </ListItem>
                    </List>
                </Card>

        g4b. the above code sums up the quantity in the cart and sum up the total price base from the quantity of the items in the cart

        g4c. add the Proceed to Check Out button that will be disable conditionally if the cartItems.length === 0

H. Finish off the <CartPage /> and add the followng functionalities

    h1. Functionality of the Add to Cart button in the <App />,

        h1a. reuse the code from <CartPage />

          const addToCartHandler = async (item, quantity) => {
            const { data } = await axios.get(`/api/products/${item._id}`);
                if (data.countInStock < quantity) {
                    window.alert("Product not found...");
                    return;
                }
                ctxDispatch({
                type: "CART_ADD_ITEM",
                payload: { ...item, quantity },
                });

            };

            reuse the

            const existItem = cart.cartItems.find((x) => x._id === product._id);
            const quantity = existItem ? existItem.quantity + 1 : 1;

            from <ProductPage />

            Add to CArt code in <Product />

               const { state, dispatch: ctxDispatch } = useContext(Store);
                const {
                    cart: { cartItems },
                } = state;

                const addToCartHandler = async (item) => {
                    const existItem = cartItems.find((x) => x._id === product._id);
                    const quantity = existItem ? existItem.quantity + 1 : 1;
                    const { data } = await axios.get(`/api/products/${item._id}`);
                    if (data.countInStock < quantity) {
                        window.alert("Product not found...");
                        return;
                    }
                    ctxDispatch({
                        type: "CART_ADD_ITEM",
                        payload: { ...item, quantity },
                    });
                };

                <Button
                    variant="contained"
                    onClick={() => addToCartHandler(product)}
                />ADD TO CART

        h2. Display "Out of Stock in the button if the item = 0 stock

            {product.countInStock === 0 ? (
                <Button variant="outlined" disabled>
                OUT OF STOCK
                </Button>
            ) : (
                <Button variant="contained">ADD TO CART</Button>
            )}

    the updateHandler:

        this will request the { data } of the item._id from the server. this is a reuse of the code from <ProductPage />

        const updateHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert("Product not found...");
            return;
        }
        ctxDispatch({
            type: "CART_ADD_ITEM",
            payload: { ...item, quantity },
        });

    h3. clickHandler for -,
        onClick={()=>updateHandler(item, item.quantity - 1)}

    h4. clickHandler for +
        onClick={()=>updateHandler(item, item.quantity + 1)}

    h5. clickHandler for trash buttons in the <CartPage />

        create the
            const removeItemHandler = (item) => {
            ctxDispatch({
                type: "CART_REMOVE_ITEM",
                payload: item,
            });
        };

        in the store.js, implement the CART_REMOVE_ITEM

        case "CART_REMOVE_ITEM": {
        const cartItems = state.cart.cartItems.filter(
            (item) => item._id !== action.payload._id
        );
        return { ...state, cart: { ...state.cart, cartItems } };
        }

        if the item._id is not equal to action.payload_.id, then return it. otherwise remove it.
        pls note of the bracket/block used after case "CART_REMOVE_ITEM" : {}, it is because the previous cartItems was not used, instead the current item is evaluated

    h6. save the cartItems in the localStorage

        in the store.js, at CART_ADD_ITEM, create a condition before the return

        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        do this with the CART_REMOVE_ITEM as well

        now the cartItems: [], should now be
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],

    h6. Redirect the page to SignInPAge upon click of the Proceed to Check Out Button

        h61. implement the const checkOutHandler = () => {
            navigate('/api/signin?redirect=/shipping)
        }

        navigate('/api/signin?redirect=/shipping), /signin? is a check method if the user is authenticated. if the user is authenticated, the page will be redirected to shipping

7. Sign In Page

   this will continue the functionality of the Proceed to Check Out button to re-direct to <SignInPage />.

   this will have the option to ask the user to register if not yet a registered user
