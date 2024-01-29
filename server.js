const dotenv = require("dotenv");
require("./src/database");
const express = require("express")
const app = express();
const routes = require("./routes")
const path = require("path")
const {middlewareGlobal} = require("./src/middlewares/middleware")

const session = require("express-session");
const flash = require("connect-flash")


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'src', "views")));

const sessionOptions = session({
    secret: "wicb0023u90wc 8u3209u2edj564+3.46d3+*-edfc5.w4cwexoch",
    resave: false,
    saveUninitialized:false,
    cookie:{
        maxAge:100*60*60*24,
        httpOnly:true
    }
})
app.use(sessionOptions);
app.use(flash());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);


app.listen(3001, () => {
    console.log("http://localhost:3001")
})