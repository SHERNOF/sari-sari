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

<!-- ------------------------------------------------------------------------- -->

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

<!--    The SignIn Page      -->

7.  Sign In Page

        this will continue the functionality of the Proceed to Check Out button in the <CartPage /> to re-direct to <SignInPage /> if the user is not yet signed in. This will check the auth of the user.

        Plan

        7a. Create the sign in form at <SignInPage />

        7a1. <Link to={`/signup?redirect=${redirect}`}>Create your account</Link> >>> redirect is a mvariable that will fetch its value from the url. the redirect value here is /shipping from <CartPage/> >>> navigate("/api/signin?redirect=/shipping");

        to get this value, use, useLocation(). this is a hook from react-router-dom and store its value as { search }

        instantiate const redirectInUrl = new URLSearchParams(search).get('redirect')

        and get the value of 'redirect' from the query string. store the value of the found data in const redirect = redirectInUrl ? redirectInUrl : '/'

        7a1. add email and password buttons
        7a2. add sign in button
        7a3. add the link for customers that is not yet registered
        7a4. Implement <SignInPage /> in <App />
        7a5. Implement the form validation

        7b. Connection to mongoDB
        7b1. create atlas mongoDB account

             - create cluster for new account >>> setup the password and ip address 0.0.0.0/0

             - create database inside the existing cluster

             - create the connection URI
                 - click connect and copy the cponnection string. Supply the password
                 - mongodb+srv://
                 -shernof:{PW}}@cluster0.ilwymnp.mongodb.net/
                 - create and paste the MONGODB_URI in .env

        7b2. npm i mongoose
        7b3. npm i dotenv
        7b4. connect to mongoDB

            - import the mongoose and dotenv in the server.js
            - run dotenv.config() to fetch the variables insisde the .env
            - mongoose.connect(process.env.MONGODB_URI).then(() => {console.log('connected to db)}).catch(()=>{console.log(err.message)}) >>>> will connect to db

            optional mongoDB local.download the GUI at https://www.mongodb.com/try/download/compass
            change the MONGODB_URI to MONGODB_URI=mongodb://localhost/sari-sari

            encountered connection issue with compass ECONNREFUSED 127.0.0.1:27017
            solved by : https://www.mongodb.com/try/download/community
            install the community server
            remain unsolved

        7C. Generate sample products by creating the seedRoute and replace the BE api to db connection

            7c1. create Product model Schema

                - create productModel.js in backend/models folder
                - const productSchema = new mongoose.Schema(
                    {
                        name: { type: String, required: true, unique: true },
                        desc: { type: String, required: true, unique: true },
                        image: { type: String, required: true },
                        brand: { type: String, required: true },
                        category: { type: String, required: true },
                        detailedDescription: { type: String, required: true },
                        category: { type: Number, required: true },
                        rating: { type: Number, required: true },
                        countInStock: { type: Number, required: true },
                        numReviews: { type: Number, required: true },
                    },
                    {
                        timestamps: true,
                    }
                    );

                    const Product = monggose.model("Product", productSchema);
                    export default Product;

                - this will bring the type of data specified in data.js

            7c2. create seedRoute

                 - create a routes folder inside the backend folder and create seedRoutes.js
                 - import express from "express";
                    import Product from "../models/productModels.js";
                    import data from "../data.js";

                    const seedRouter = express.Router();

                    seedRouter.get("/", async (req, res) => {
                    await Product.remove();
                    const createdProducts = await Product.insertMany(data.products);
                    res.send({ createdProducts });
                    });
                    export default seedRouter
                 - seedRouter is ab object from express.Router()
                 - above will remove first all the data in db and replace with the latest data from data.js
                 - use the seedRouter in server.js
                 - remove _id in data.js as taht will be assign by mongoDB
                 - issue encountered using remove(). replace it with deleteMany()

            7c3. Fetch the products from database

                - create the productRouter.js and define the route

                - import express, { application } from "express";
                    import Product from "../../frontend/src/components/Product";

                    const productRouter = express.Router();
                    application.get("/", async (req, res) => {
                    const products = await Product.find();
                    res.send(products);
                    });

                - use the prductRouter.js in the server.js

                - replace

                app.get("/api/products", (req, res) => {
                    res.send(data.products);
                    });
                by

                app.use('/api/products', productRouter)

                - move the
                    app.get("/api/products/desc/:desc", (req, res) => {
                    const product = data.products.find((x) => x.desc === req.params.desc);
                        if (product) {
                            res.send(product);
                        } else {
                            res.status(404).send({ message: "Product not found..." });
                        }
                    });

                    app.get("/api/products/:id", (req, res) => {
                    const product = await Product.findById(req.params.id);
                        if (product) {
                            res.send(product);
                        } else {
                            res.status(404).send({ message: "Product not found..." });
                        }
                    });

                    to productRouter.js and recode by

                    productRouter.get("/", async (req, res) => {
                    const product = await Product.findOne({ desc: req.params.desc });
                        if (product) {
                            res.send(product);
                        } else {
                            res.status(404).send({ message: "Product not found..." });
                        }
                    });

                    productRouter.get("/", async (req, res) => {
                    const product = await Product.find((x) => x._id === req.params.id);
                        if (product) {
                            res.send(product);
                        } else {
                            res.status(404).send({ message: "Product not found..." });
                        }
                    });

                    app.use productRouter in the server.js by

                    app.use("/api/products/desc/:desc", productRouter);
                    app.use("/api/products/_id", productRouter);


                    delete data.js and now the data is being fetch from db
                    findOne and findById are mongoDB commands

        7d. Create Sample user

            7d1. Create User model and create two types of user. 1 is admin and 1 is normal user
            7d2. Create the userMoldels.js in the backend/models
            7d3. in the seedRouter.js,
                  await User.deleteMany();
                const createdUsers = await User.insertMany(data.users);
                res.send({ createdProducts, createdUsers });

            7d4. create the users array in the data.js
                - for the password use the utility bcrypt to encrypt the
                password
                - password: bcrypt.hasySync('123456)
                - npm i bcrypt.js in backend
                - open https://localhost:5000/seed to load the users in db

        7e. Implement Signin API

            7e1. create a sign in api via Postman. this post api will
                use   to send the email and password of the user. if it exist in db then the server will send back the user information together with the JSON web token

            7e2. create userRoutes.js in backend. use the npm i express-async-handler
                 in BE. this package will enable to catch the error in the async function

            7e3. define the error handler in server.js
                app.use((err, req, res, next) => {
                    res.status(500).send({ message: err.message });
                });

                err is an object that will be coming from the server

            7e4. npm i jsonwebtoken. this is an authentication given by server if the
                email and password is supplied correctly.

            7e5. To use the jsonwebtoken create the utils.js in be
                export const generateToken = (user) =>{
                    return jwt.sign(user, process.env.JWT_SECRET,
                    {expires:'30d'}
                    )
                }

                DEFINE THE JWT_SECRET IN .ENV = JWT_SECRET=something secret

            7e6. go back to userRoute.js and use the generateToken(user)

                    userRouter.post(
                    "/signin",
                    expressAsyncHandler(async (req, res) => {
                        const user = await User.findOne({ email: req.body.email });
                        if (user) {
                            if (bcrypt.compareSync(req.body.password, user.password)) {
                                res.send({
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                                isAdmin: user.isAdmin,
                                token: generateToken(user),
                                });
                                return;
                            }
                        }
                        res.status(401).send({ message: "Invalid email or password" });
                    })
                );

            7e7. define the user object in the generateToken at the utils.js instead of just user

                import jwt from "jsonwebtoken";

                export const generateToken = (user) => {
                return jwt.sign(
                    {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET,
                    { expiresIn: "30d" }
                );
                };


            7e8. implement app.use("/api/users", userRouter); imn server.js

            7e9. add
                app.use(express.json())
                app.use(express.urlencoded({ extended: true }))

                in the server.js. this will convert the post request from BE to json object

            7e10. test the API in postman. See postman.jpeg from '../public/postman.jpg

            7e11. the App can now do an authenticated request from the server

    7f. Complete the <SignInPage />

        7f1. this is to impleement the SignIn function. it will start from the <CardPage /> when the user
            click the Proceed to Check Out button. the user will be directed to <SignInPage /> and be able to click the Sign In Button

        7f2. it will display the user name and the log out button in the header

        7f3. in the <SignInPage />, create the onSubmit={submitHandler}. this will be an async function

            const [email, setemail] = useState("");
            const [password, setpassword] = useState("");

            const submitHandler = async (e) => {
                e.preventDefault();

                try {
                const { data } = await axios.post("/api/users/signin", {
                    email,
                    password,
                });
                } catch (err) {}
            };

            use useState to define the email and password and use it to capture the alue from <input />
            onChange={(e) => setemail(e.target.value)}
            onChange={(e) => setpassword(e.target.value)}

        7f4. Access the context to store the user information to store

            const { state, dispatch: ctxDispatch } = useContext(Store)
            ctxDispatch({ type: type: 'USER_SIGNIN', payload: data})

            the payload will be the result of the information of the user sent by server from db

            create the USER_SIGNIN in the store.js
              case "USER_SIGNIN":{
                return {...state, userInfo: action.payload}
                }

            save the userInfo in the
            localStorage,setItem('userInfo', JSON.stringify(data))

            use useNavigate() by using the redirect variable to redirect the user
            navigate(redirect || '') to the shipping page if signed in succesfully.

        7f5. Show the user name if there's a successful sign in in the header

            - pick up the userInfo from the store
            - in the <App />, { cart, userInfo } = state
            - check if login using the userInfo
            {
                userInfo ? (
                    <Dropdown>{userInfo.name}</Dropdown>
                ) : (
                    <Link to='/signin>
                )
            }

            - add a divider in the <Dropdown/> to add the Sign Out and assign onClick={signOutHandler}

              const signOutHandler = () => {
                    ctxDispatch({ type: "USER_SIGNOUT" });
                    localStorage.removeItem('userInfo')
                };

            create USER_SIGNOUT in the store
            case ctxDispatch({ type: "USER_SIGNOUT}):
            return { ...state, userInfo: null }

            - set the value of userInfo in thw Store. which is similar to the checking of the cartItems

             userInfo: localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null,

            - implement

             useEffect(() => {
            if (userInfo) {
                navigate(redirect);
                }
            }, [navigate, redirect, userInfo]);

            this is to solve the issue of the <SignInPage /> appearing even if the user is signed in.

        7f6. replace the  alert("Invalid email or password"); of a toast
            - it took 3 days for the snack bar to be implemented in a reusable manner and not scalable as it was designed by MUI as single component implementation.

            - Done to make it reusable
                - put the state in the useContext to be accessible app wide
                - Learned here to use the action
                    export const setSnackbar = (
                        snackbarOpen,
                        snackbarType = "success",
                        snackbarMessage = ""
                            ) => ({
                            type: "SET_SNACKBAR",
                            snackbarOpen,
                            snackbarType,
                            snackbarMessage,
                        });
                and then implemented in the
                    try{}catch(err){ctxDispatch(setSnackbar(true, "error", "Not Nice"));}
                of the <SignInPage />

                - then the <Snackbar /> is implemented in the global <App /> and visibility was called by the dispatch in each needed component

                - credit below:

                https://codesandbox.io/s/distracted-gauss-thc9b?file=/src/Snackbar.jsx:134-177

                https://www.youtube.com/watch?v=CVnSrLZ_HaQ&t=928s

8.  Checkout wizard

    Features

           - Create a <ShippingPage /> that a user will be redirected upon succesful login.
           - After filling up the shipping information, the customer will be re-directed to <PaymentPage />
           - Create a feature to save the shipping address in the local storage. this will enable to retain
           the shipping address even after a refresh
           - The cartItems and the shippingAddress will be cleared after sign out to reset data for new user

    8a. Create <ShippingPage />

           - create form inputs
           - handle the save shipping address
           - add checkout wizard bar

           8a1. Create the <ShippingPage />
               - assign the title via <Helmet><title>Shipping Address</title></Helmet>
               - define the form

                   - https://mui.com/material-ui/api/form-control/
                   - https://mui.com/material-ui/react-text-field/#components

           8a2. Implement the submitHandler

               - ctxDispatch({
                   type: 'SAVE_SHIPPING_ADDRESS',
                   payload: {
                        fullname,
                        address,
                        city,
                        postalCode,
                        country
                        }
                    })
                    localStorage.setItem('shippingAddress',
                    JSON.stringify({
                    fullname,
                    address,
                    city,
                    postalCode,
                    country
                    })
                    )
                      navigate('/payment)


            8a3. Define 'SAVE_SHIPPING_ADDRESS' in the Store.js

                    case 'SAVE_SHIPPING_ADDRESS':
                    return {
                        ...state,
                        cart: {
                            ...state.cart,
                            shippingAddress: action.payload
                        }
                    }

                    this reducer will only change the shippingAddress from the cart and capture the payload, add the shippingAddress in the cart

                    shippingAddress: localStorage.getItem('shippingAddress')
                    ? JSON.parse(localStorage.getItem('shippingAddress'))
                    : {},

                    At this stage the information from the form was captured but was not displayed in the form when refresh us done.

                    to solve this get the const { cart: shippingAddress } = state
                    then assign the value of each field from the data captured:

                     const [fullname, setFullname] = useState(shippingAddress.fullName || ");
                    const [address, setAddress] = useState(shippingAddress.address || ");
                    const [city, setCity] = useState(shippingAddress.city || ");
                    const [postalCode, setPostalCode] = useStateshippingAddress.postalCode || ");
                    const [country, setCountry] = useStatecountry);

            8a4. useEffect(() => {
                if(!userInfo){
                    navigate('/signin?redirect=shipping)
                }
            },[userInfo, navigate])

                - this will ensure to redirect the user to <SignInPage /> if not logged on


            8a5. In the <Dropdown/>, add

                localStorage.removeItem('shippingAddress') in

                 const signOutHandler = () => {
                    ctxDispatch({ type: "USER_SIGNOUT" });
                    localStorage.removeItem("userInfo");
                };

                so that the shipping address will be clear upon logout

            8a6. in the Store.js, add the shippingAddress to the state of USER_SIGNOUT

                case "USER_SIGNOUT":
                return { ...state, userInfo: null };

                case "USER_SIGNOUT":
                return { ...state, userInfo: null,
                cart:{
                    cartItems:[],
                    shippingAddress:{}
                }
                 };

                this will make the cart and <ShippingPage /> are empty


            8a7. Create the <CheckoutSteps />

    8b. Create the <SignUpPage /> by utilizing the "Create your Acccount" link
    from the <SignUpPage />. if the user already has some items in his cart, the user will be redirected to <ShippingPage />. can reuse the <SignInPage />

        8b1. Create the input form
        8b2. Create the submitHandler
        8b3. Create the backend api

            - in the userRouter.js, create the api for the Sign Up
            - create another instance of a user
            - userRouter.post('/signup', expressAsyncHandler(async (req, res) => {
                const new user = new User
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashync(req.body.password)
            })
                const user = await new User.save()
                    res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user),
                    });
            )

                8b3a. implement the <SignUpPage /> in the <App />

                8b3b. Create a check for the similairty of the password and confirmPassword before sending it to the database

                if(password !== confirmPassword){
                    ctxDispatch(setSnackBar(true, 'error', 'Password did not match' ))
                    return
                }

                - the return is to stop the code from executing if the password is not the same

        - Encountered problem during SignUp as the route is looking for the isAdmin. IsAdmin:false was added to the route to default user as not admin

    8c. Implement <PaymentMethodPage />

        - create input form
        - create the submitHandler()
            - get the state and dispatch from the context
            - get the

            const { {cart: shippingAddress, paymentMethod} } = state
            useEffect(() => {
                if(!shippingAddress.address){
                    navigate('/shipping')
                }
            }, [shippingAddress, navigate])

            - define the payment method state

            - dispatch the ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: action.payload})

            - save payment method to
            localStorage.setItem('paymentMethod', paymentMethodName )
            navigate('/placeorder')

            define the 'SAVE_PAYMENT_METHOD' in the Store.js
             case "SAVE_PAYMENT_METHOD":
                return {
                    ...state,
                    cart: {
                    ...state.cart,
                    paymentMethod: action.payload,
                    },
                };

            - Implement the <PaymentMethodPage /> in the <App />

            - in the signOutHandler in the <Dropdown /> >>>
            localStorage.removeItem('paymentMethod')

            - add paymentMethod: '', to USER_SIGNOUT

            - define gettting the paymentMethod from the localStorage at the cart.

            paymentMethod ; localStorage.getItem('paymentMethod')
            ? localStorage.getItem('paymentMethod')
            : ''

            - test the <PaymentMethodPage />. At this point the <CheckoutSteps /> should be indicating orange at the Payment.

            - encountered issue during the implementation of the radio buttons because of the {} used instead of [] in

             correct >>> const [paymentMethodName, setpaymentMethod] = useState(paymentMethod || "Paypal")

            - this has the functionality to retain the paymentMethod even after a refresh as it will be save to the store and will be retrieve from the localStorage.

    8d. Implement the <PreviewOrderPage />

        Plans:
        show cartItems, payment and address

        Define the math and logics

        - define the round2, this will round the number to 2 decimal points

        const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100

        - use round to calculate the cart.itemPrice
        cart.itemsPrice = round2(
        cart.cartItems.reduce((a, c) => a + c.quantity + c.price, 0));

        cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);

        cart.taxPrice = round2(0.15 * cart.itemsPrice);

        cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

        - check if there's a payment method:
        useEffect(()=>{
            if(!cart.paymentMethod){
                navigate('/payment')
            }
        },[cart, navigate])

    8e. Implement Place Order Action

    - this will create a new order record upon click of the Place Order button

    - create a reducer to execute the loading and cath the error

    const reducer = (state, action) =>{
    switch(action.type){
    case 'CREATE_REQUEST':
    return { ...state, loading: true};
    case 'CREATE_SUCCESS':
    return { ...state, loading: false};
    case 'CREATE_FAIL':
    return { ...state, loading: false};
    default:
    return state
    }
    }

    const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    })

    - use the dispatch from the

    create the const placeOrderHandle = () => {
    try{
    dispatch({ type: 'CREATE_REQUEST' })
    const { data } = await axios.get('/api/orders',{
    orderItems: cart.cartItems,
    shippingAddress: cart.shippingAddress,
    itemsPrice: cart.itemsPrice,
    shippingPrice: cart.shippingPrice,
    taxPrice: cart.taxPrice,
    totalPrice: cart.totalPrice
    },
    {
    headers:{
    authorization: `Bearer ${userInfo.token}`,
    }
    })
    ctxDispatch({ type: 'CART_CLEAR' })
    dispatch({ type: 'CREATE_SUCCESS })
    localStorage.removeItem('cartItems')
    navigate('/order/${data.order.\_id}')

        }catch (err) {
            dispacth({ type: CREATE_FAIL})
            ctxDispatch(setSnackBar(true, "error", getError(err) ))
        }
        }

        - after the Place Order button,
        { loading && <LoadingBox />}

        - define the CART_CLEAR in the store
        case 'CART_CLEAR':
        return {...state, cart: { ...state.cart, cartItems : []}}

        - posting the payload ( orderItems, shippingAddrress, shippingPrice, taxPrice and totalPrice)

        - THE MATH HERE IS QUITE COMPLEX AND NEEDS TO BE REVIEWED. POWERFUL AND LEARNT A LOT

        - create the orderModel.js. in the backend. can reuse the userModel.js

    - Create the placeorder API

      - create the orderModel.js

      - create the orderRoutes.js

        orderRouter.post('/api/placeorder', isAuth, expressAsyncHandler( async () => {
        const order = new Order({
        orderItems: req.body.orderItems.map((x) => ({
        ...x, product: x.\_id
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user:req.user.id
        })
        }))

        map was used to give id to each item of the orderItems
        define a middle ware (isAuth) to define the user because it was not posted and will be taken from the token

        define the isAuth in the utils.js

        export const isAuth = (req, res, next) => {
        const uthorization = req.headers.authorization
        if(authorization){
        const token = authorization.slice(7, authorization.length) // Bearer xxxxxx <<<>>> to get only the toke not included the Bearer, then verify it with jwt

            jwt.verify(
                token,
                process.env.JWT_SECRET,
                (err, decode) => {
                    if(err){
                        res.status(401.send({ message: 'Invalid Token' })} else {
                            req.user = decode
                            next()
                        }
                    }
                }
            )} else{
                res.status(401).send({ message: 'No Token' })
            }

        }

            decode is a decrypted version of the tokem.
            the next() will call the execution of the expressAsyncHandler()

            then save the new order by:

            orderRouter.post('/api/placeorder', isAuth, expressAsyncHandler( async () => {

        const newOrder = new Order({
        orderItems: req.body.orderItems.map((x) => ({
        ...x, product: x.\_id
        })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user:req.user.id
        })
        const order = await newOrder.save()
        res.status(401).send({ message: 'New order created', order })
        }))

        use the orderRouter.js in the server.js

            - Encountered problem during PlaceOrder as the route is looking for the user. its because of the typo error user: req.user.id. it should be user: req.user._id,
            - encountered problem of req.user not defined. It's because the parameters req, res were not input in the expresssAsyncHandler((req, res) =>) of the orderRouter.js


            - below is the result of the order

            {message: "New order create", order: {orderItems: [,…],…}}
            message: "New order create"
            order:
            {orderItems: [,…],…}
            createdAt: "2023-08-23T06:39:53.621Z"
            isDelvered: false
            isPaid:
            false
            itemsPrice: 250
            orderItems: [,…]0:
            {desc: "adidas-fit-shirt", name: "Adidas Fit Shirt", quantity: 1, image: "/images/p2.jpg", price: 250,…}
            paymentMethod: "Stripe"
            shippingAddress: {fullName: "Sherwin", address: "26 Angove St ", city: "Cr", postalCode: "3081", country: "Au"}
            address:
            "26 Angove St "
            city: "Cr"
            country: "Au"
            fullName: "Sherwin"
            postalCode: "3081"
            shippingPrice: 0
            taxPrice: 37.5
            totalPrice: 287.5
            updatedAt: "2023-08-23T06:39:53.621Z"
            user: "64d8b55667d1463d22d25b5f"
            __v: 0
            _id: "64e5a9b971736f6be4f7f322"

8f. Create the <OrderPage />

    - Show the Order details with an id created by the mongo db and is reflected in the address bar such as >>> 64e5ab7671736f6be4f7f32c

    Plans
        - create be api for order/:id
        - fetch order api in fe
        - show order information in 2 columns

    - Create the <OrdrPage />
        - start the page with the loading state and use the <Loading /> and <MessageBox /> to display its status
        loading ? <Loading /> : error ? <MessageBox>{error}</MessageBox> : <div />

        - define the reducer to handle the state

        - use useEffect(()=>{

        }, [])

        to get the order. check first of the user is signed in. if not redirect to login

        const navigate = useNavigate()
        useEffect(()=>{
            if(!userInfo){
                return navigate('/login')
            }
        }, [])

        - get the userInfo from useContext{}

        to get the order

        - use the useParams to get the order/:id from the url parameters

        const params = useParams()
        const { id: orderId } = params

        - check for order. if order don't exist then fetchOrder()

         useEffect(() => {
            const fetchOrder = async () => {
            try {
                dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
                });
                dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }};
                if (!userInfo) {
                return navigate("/login");
            }
                if (!order._id || (order._id && order._id !== orderId)) {
                fetchOrder();
            }

        }, [order, userInfo, navigate, orderId]);


        - for the <div> part
            - show the orderId in the title of the page. 1st <Card> shows the shipping information
            <Helmet>
                <title>Order {orderId}</title>
            </Helmet>
            <h1>{Order {orderId}}</h1>
            <Grid container>
                <Grid item>
                    <Card>
                        <CardHeader title="Shipping" />
                    </Card>
                </Grid>

            </Grid>

            - 2nd Card shows the payment information

            - 3rd Card is for the Order Items

        implement <OrderPage /> in <App />

        - in orderRoute.js implement the backend part. Get the data from backend and send it to frontend

        const order = await Order.findById(req.oarams.id)
        if(order){
            res.send(order)
        } else {
            res.status(401).send){ message: 'Order not found' }
        }

         <<>> will look for the id from the url

    8g. Pay by Paypal

        8g1. Generate payoal client id

            - developer.paypal.com/home
            - log in to dashboar, then go to dashboard
            - clgo to Apps and Credentials, sandbox and create App
            - copy the client id AND PUT IT IN .ENV
            - PAYPAL_CLIENT_ID=AZiD7BlVeOAjcjLQT4ixQmiobKbHGYYox7QFV3fYTWW2WtXPF_7VT_5fB8scdSftXeiaq1cYm8niatfK

        8g2. create api to return client id

            - in server.js
                app.get('/api/keys/paypal, (req, res)=>{
                    res.send(process.env.PAYPAL_CLIENT_ID || 'sb' )
                })

            - in FE npm install @paypal/react-paypal-js

        8g3. use use PayPalScriptProvider in index.js

            -   <PaypalScriptProvider deferLoading={true}>
                    <App />
                </PaypalScriptProvider>

        8g4. use PayPalScriptReducer in <OrderPage />

            - import { PaypalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
            - add the loadPaypalScript in useEffect

                 if (!order._id || (order._id && order._id !== orderId)) {
                    fetchOrder();
                    } else {
                        const loadPaypalScript = async () => {
                            const { data: clientId } = await axios.get('/api/keys/paypal', {
                                headers: { authorization: `Bearer ${userInfo.token}`}
                            })
                        }
                        loadPaypalScript()
                    }
                }, [order, userInfo, navigate, orderId]);

            - before the useEffect, define the
            const [{ isPending }, paypalDispatch ] = usePayPalScriptReducer()

            - then add the following to the useEffect to get the clientId
                paypalDispatch({
                    type: 'resetOptions,
                    value: {
                        'client-id: clientId,
                        currency: 'USD'
                    }
                })
                - currency can be change to the preferred country

            - aftersetting up the options,
            paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })

            - add paypalDispatch to the useEffect dependency
            [order, userInfo, navigate, orderId, paypalDispatch]);

        - render paypal button
            - after the Order Total field, impelment a conditional rendering of Paypal buttons

                {
                    !order.isPaid && (
                        <ListItem>
                            {
                                isPending ? (<LoadingBox />) : <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                >
                            }
                        </ListItem>
                    )
                }

                - isPending is coming from react-paypal-js
                - define the functions createOrder

                const createOrder = (data, actions) => {
                    return (actions.order)
                    .create({
                        purchase_units: [
                            {
                                amount: { value: order.totalPrice }
                            }
                        ]
                    })
                    .then((orderID) => {
                        return orderID
                    })
                }



                const onApprove = (data, actions) => {
                    return actions.order.capture().then(async function (details){
                        try{
                            dispatch({ type: 'PAY_REQUEST' })
                            const { data } = await axios.put(`api/orders/${order._id}/pay`, details),
                            {
                                header: { authorization: `Bearer ${userInfo.token}`}
                            }
                            dispatch({ type: 'PAY_SUCCESS', payload: data })
                            ctxDispatch(setSnackBar(true, 'success', 'Order is Paid'))
                        }catch (err) {
                            dispatch({ type: 'PAY_FAIL', payload: getError(err)}
                            ctxDispatch(setSnackBar(true,'error',getError(err)))
                            )
                        }
                    })
                }

                - details contains the user and payment information from the PayPal side

                - create the api for api/orders/${order._id}/pay
                - implement the PAY_REQUEST, PAY_SUCCESS and PAY_FAIL in the reducer inside the <OrderPage />
                case "PAY_REQUEST":
                    return { ...state, loadingPay: true };
                case "PAY_SUCCESS":
                    return { ...state, loadingPay: false, successPay: true };
                case "PAY_FAIL":
                    return { ...state, loadingPay: false };
                case "PAY_RESET":
                return { ...state, loadingPay: false, successPay: false };

                - implement the const onError = (err) => {
                    ctxDispatch(setSnackBar(true, 'error', getError(err)))
                }

                add the successPay and loadingPay in the  state
                 const [{ loading, error, order, loadingPay, successPay }, dispatch] = useReducer(reducer, {
                successPay: false,
                loadingPay: false,
                loading: true,
                error: "",
                order: {},
                });

                add the successPay in the useEffect as a condition
                if (!order._id || successPay || (order._id && order._id !== orderId)) {fetchOrder();

                if (successPay) {dispatch({ type: "PAY_RESET" });
                }

                add the successPay in the dependency array of the useEffect


                add { loadingPay && <Loading />}



        - implement onApprove payment function
        - create pay order api in backend at orderRoute.js

        orderRouter.put(
            "/:id/pay",
            isAuth,
            expressAsyncHandler(async (req, res) => {
            const order = await Order.findById(req.params.id);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                mail_address: req.body.email_address,
            };
            const updateOrder = await order.save();
            res.send({ message: "Order Paid", order: updateOrder });
            } else {
            res.status(404).send({ message: "Order Not Found" });}}));

        When placing an order I noticed the count in stock does not go down at all? Does anyone have any tips on how to implement this?



        - simulate the payment. login to sandbox, then test account, get the sandbox info and use the credit card details
            4239538684643756
            VISA
            09/2028
            123

        - encountered error 404 in payment simulation:
        found out that missing / in `api/orders/${order._id}/pay`, should be `/api/orders/${order._id}/pay`,

        - encountered issue in payment simulation : No Token
            found missing s in the header: { authorization: `Bearer ${userInfo.token}` }, should be headers: { authorization: `Bearer ${userInfo.token}` },

9.  Customer Area

    9a. Display the order history - This will display th eorder istory of the user. Each order is clicable and can view the details of each order

        9a1. create the <OrderHistoryPage />. conditionally load the
            { loading
            ? <Loading />
            : eroor
            ? <MessageBox variant='danger' >{error}</MessageBox>
            : <table>
                <thead>
                    <th>ID<th/>
                    <th>Date<th/>
                    <th>Total<th/>
                    <th>Paid<th/>
                    <th>Delivered<th/>
                    <th>Actions<th/>
                <thead/>
                <tbody></tbody>
            <table/> }

        9a2. define the reducer for loading, error and orders

        const [{ loading, error, orders }, dispacth] = seReducer(reducer, {
            loading: true,
            error:' ',
            orders: []
        })

        9a3. define the
            useEffect(()=>{
                const fetchData = async () =>{
                    dispatch({ type: 'FETCH_REQUEST' })
                    try{

                    }catch(err){
                        const { data }  = await axios.get(`/api/orders/mine`,
                        header: { authorization: `Bearer ${userInfo.token}` }
                        )
                        dispatch({ type: 'FETCH_FAIL',
                        payload: getError(err)
                         })
                    }
                }
                fetchData()
            }, [userInfo])

            - what happened here is to send an ajax request to `/api/orders/mine` to get the orders of the current user by getting its token from the backend and return it to the frontend as well as the users orders

            headers: { Authorization: `Bearer ${userInfo.token}` }, is to get the user info

            use map in
                <tbody>
            { orders.map(order) => (
                <tr key={order._id}></tr>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPice.toFiced(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No' }</td>
                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'No' }</td>
                <td>
                    <Button
                    type={button}
                    variant={primary}
                    onClick={() => {
                         navigate(`/order/${order._id}`)
                    }}
                    >Details</Button>
                </td>
            )}
            </tbody>

        9a4. Implement the api fro /api/orders/mine at the orderRouter.js

            orderRouter.get('/mine',
            isAuth,
            expressAsyncHandler(async (req, res) => {
                const orders = await Order.find({ user: req.user._id
                res.send(orders)
                })
            })
            )

            this returns the orders of the current user

        9a5. Implement in <App />

    9b. <ProfilePage /> - this can update the user information

        9b1. create the <ProfilePage />. This is similar to <SignUp />

            - implement in tha <App />
            - get the userInfo from the useContext

        9b2. implement the submitHandler
            - create a reducer to show the <Loading />
            const reducer = (state, action) => {
                switch (action.type) {
                    case 'UPDATE_REQUEST':
                    return { ...state, loadingUpdate: true }
                    case 'UPDATE_SUCCESS':
                    return { ...state, loadingUpdate: false }
                    case 'UPDATE_FAIL':
                    return { ...state, loadingUpdate: false }
                    default
                    return state
                }
            }
            const [{ loadingUpdate }, dispatch] = userReducer(reduecr, {
                loadingUpdate: false
            })

            - send an ajax request to get the user info from the backend

            const submitHandler = async (e)=>{
                e.preventDefault()
                try{
                    const { data } = wait axios.put('/api/users/profile', {
                        name,
                        email,
                        password
                    },
                    { headers: { Authorization: `Bearer ${userInfo.token}` }
                    }
                    )
                    dispatch({ type: 'UPDATE_SUCCESS' })
                    ctxDispatch({ type: 'USER_SIGNIN', payload: data })
                    localSotrage.setItem('userInfo', JSON.stringify(data))
                    ctxDispatch(setSnackbar(true, 'success', 'User updated successfully')
                }catch(err){
                    dispatch({ type: 'UPDATE_FAIL'})
                    <!-- use ctxDispacth to activate the toast -->
                    ctxDispatch(setSnackbar(true, 'error', getError(err)))

                }
            }
        9b3. create user upate api at the userRoute.js

            userRouter.put('/profile',
            isAuth,
            expressAsyncHandler(async (req, res)=>{
                <!-- get the user from db -->
                onst user = await User.findById(req.user._id)
                if(user){
                    <!-- || means, if the field is empty use the old data -->
                    user.name = req.body.name || user.name
                    user.email = req.body.email || user.email

                    if(req.body.password){
                        user.password = bcrypt.hashSync(req.body.password, 8)
                    }
                    const updatedUser = wait user.save()
                    res.send({
                        _id: updatedUser._id,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        isAdmin: updatedUser.isAdmin,
                        token: generateToken(updatedUser)
                    })
                } else {
                    res.status(404).send({ message: 'User not found' })
                }
            })
            )

        9b4. update user info

            - in the <Dropdown />, add window.location.href = '/signin' to redirect the page to sign in upon sign out

    9c. Publish to Heroku

        9c1. create and config node project
            - npm init in the root folder
            - in package.json, at scripts,
                - "build": "cd backend && npm install && cd ../frontend && npm install && npm run build"
                - "start": "node backend/server.js"

            - in the server.js
                - const _dirname = path.resolve() <<< before the err this returns the current directory>>>
                - import path from path
                - remove the import data from "./data.js";
                - add the app.use(express.static(path.join(_dirname, '/frontend/build'))) <<< what this does is to serve all the file inside the /frontend/build as a static files and will beserve by http://localhost:${port} >>>


            9c2. serve build folder in frontend folder
                - add app.get('*', (req, res)=>{
                    res.sendFile(path.join(_dirname, '/frontend/build/index.html'))
                }) << this means that everything that user enter will be serve by localhost"${port} will be serve by the index.html>>

                - run npm run build


        9c3. Create Heroku account
            - sign up for heroku if no account yet
            - create anew app
            - click the github icon to connect the app to github
            - click onnect to github
            - authorize heroku
            - in the search for repository part, select the repo which is sari-sari. click afterwards
            - Click enable automatic deploys
            - in settings, reveal config vars
                - copy thev value of the JWT_SECRET, PAYPAL AND MONGODB from .env
            - stop the fronend and backend and copy the .env from backend to root
            - in the root directory npm start
            - run localhost:5000/api/seed if the products are not displayed
            - if github is not configured and working on other pc, configure the github acct
                $ git config --global user.name "John Doe"
                $ git config --global user.email johndoe@example.com

        9c4. connect it to github
        9c5. create mongodb atlas database
        9c6. set database connection in heroku from the .env variables
        9c7. commit and push

            - issue encountered here is it was discovered that its master branch has a name of jolrct and not master. need to take a look at this

    9d. Connect to render

        9d1. go to render.com and create an account

            - click get started, github and authorize render
            - click new service
            - select a repo to connect. connect to sari-sari
            - enter the name for web service "mern sari-sari"
            - environment is node
            - select most of the default
            - selcet npm run build in build command
            - start command = npm start
            - select the free type account
            - click advance
                - click environmental variables
                    - add the JWT_SECRET, MONGODB_URI
            - scroll down and click create web app

    9e. Create sidebar and search box

        9e1. add the sidebar = https://mui.com/material-ui/react-drawer/

            - in <App />, define an open state for sidebar const [ sidebarIsOpen, setSidebarIsOpen ] = useState(false)
            - in the index.css, at sidebar section, style the navbar to accomodate the drawer component
            - const [categories, setCategories] = useState([])
            <<< this will define the categories of the sidebar>>>
            -  sdefeine the useEffet. make an ajax request to get the '/api/product/categories' to get the categories from { data }.
                useEffect(() => {
                    const fetchCategories = async () => {
                    try {
                        const { data } = await axios.get("/api/product/categories");
                        setCategories(data);
                    } catch (err) {
                        ctxDispatch(setSnackbar("true", "error", getError(err)));
                    }
                    };
                    fetchCategories()
                }, []);

                - in productRputer.js, define the '/api/product/categories'

               productRouter.get(
                "/categories",
                expressAsyncHandler(async (req, res) => {
                    const categories = await Product.find().distinct("category");
                    res.send(categories);
                })
                );

                - Product.find() was used to get all products and only get the category of the product by using distinct function to return unique categories and not duplicates

                distinct('category')

                - the store it in

                const categories

                - then send it to frontend

                res.send(categories)

        - at this point the Pants and Shirt links are not yet working. need to implement the search? function


        - Create the <SearchBox />

            - set the submitHandler =

                 const submitHandler = (e) => {
                    e.preventDefault();
                    navigate(query ? `/search/?query=${query}` : "/search");
                };

    9f. create <SearchPage />

        - this page is the result of the search in the search bar. It will also show the details of the result products. it can also sort the product base from the price

        - get the search from URL by const { search } = useLocation(); then store it in const sp = new URLSearchParams(search);
        - once const sp is captured, get the following details:

         const { search } = useLocation();
        const sp = new URLSearchParams(search); // /search?category=Shirts
        const category = sp.get("category") || "all";
        const query = sp.get("query") || "all";
        const price = sp.get("price") || "all";
        const rating = sp.get("rating") || "all";
        const order = sp.get("order") || "newest";
        const page = sp.get("page") || 1;


        - define the reducer
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

        - define the useEffect. send an ajax request from BE and get the page, query, category, price, rating and order information. use these variables as the dependency
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

        - define and get the categories by using useState and useEffect

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
            }, [dispatch])

        - define the urlGetFilter

            const getFilterUrl = (filter) => {
                const filterPage = filter.page || page
                const filterCategory = filter.category || category
                const filterQuery = filter.query || query
                const filterRating = filter.rating || rating
                const filterPrice = filter.price || price
                const sortOrder = filter.order || order
                return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`
            }


        - define some sample prices
            export const prices = [
                {
                    name: '$1 -  $50',
                    value: '1-50'
                },
                {
                    name: '$51 -  $200',
                    value: '51-200'
                },
                {
                    name: '$201 -  $1000',
                    value: '201-100'
                }
            ]
        
        - define the ratigs reference

            export const ratings = [
                {
                    name: '4stars & up',
                    rating: 4
                },
                {
                    name: '3stars & up',
                    rating: 3
                },
                {
                    name: '2stars & up',
                    rating: 2
                },
                {
                    name: '1stars & up',
                    rating: 1
                },
            ]

        - implement the <SearchPage /> in <App />

        - implement the api for 
        `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}` in productRouter.js

        - encounterd an error of "react-dom.development.js:86 Warning: validateDOMNesting(...): <form> cannot appear as a descendant of <form>." because of the <form> and <Paper component='form'> declaration





        9f1. show filters
        9f2. create api for earching products
        9f3. display results

-
-
-
-
-
-
-
-
-
-
-
-

-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-
-

=========================================================================

Create a function that decrement product.countInStock:
1.) addOrderItems: backend/controllers/orderController.js
Insert the following code on addOrderItem after, newOrder.save()

req.body.orderItems.map(async (item) => {
const product = await Product.findById(item.\_id);
product.countInStock -= item.quantity;
await product.save();
});
Base on that code, once user click the PlaceOrder button:

It save the new order
Iterate to each Item on that Order
Find item.\_id on the Product model
decrement the item.quantity to the product.countInStock
then save to apply the changes
Things to think about:
1.) That's the code that we can use in order to decrement product, but we have to think we're is the best way implementing that, whether in PlaceOrder or once the OrderPaid?

2.) Another thing, now that you have an idea how to decrement the product, probably you may to think also how increment the product once the order was being cancelled by the customer.
