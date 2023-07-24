# MERN sari-sari

1. App birth
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

2. put the project to github
   a. remove .git in frontend >>> rm -rf .git
   b. put the .gitignore to sari-sari
   c. remove the / in node_modules and build
   d. in source control, initialize repository
   e. create the README.md in root

3. create the HomePaage and list the products
   a. create the data.js inside the src. data.js
   a1. 679px x 829px - img size
   a2. export dfault data
   a3. code the App.js / <main>. use map to itirate the {data.js}. style the <main>

   b. Routing
   b1. npm i react-router-dom >>> https://reactrouter.com/en/main/start/tutorial
   b1a. basic elements of react-router-dom >>> <BrowserRouter/>, <Routes/>, <Route/>, useRouteError,
   b2. create the route for HomePage
   b3. create the route for product page
   b4. import as a name imprt the <BrowserRouter /> and Wrap the whole App by <BrowserRouter>
   b5. Wrap the <Home /> by <routs/> then <Route />
   b6.
