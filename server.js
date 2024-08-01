const express = require('express');
const app = express();

const path = require("path");
const hbs = require("hbs");

app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));
// app.set("views", path.join(__dirname, "views", "admin"));
// app.set("views", path.join(__dirname, "views", "superAdmin"));
app.set("view engine", "hbs");
app.engine("html", hbs.__express);
hbs.registerPartials(path.join(__dirname, "views", "partials"));
hbs.registerHelper('inc', function (value, options) {
    return parseInt(value) + 1;
});
hbs.registerHelper('eq', function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});
app.get("/", async (req, res) => {
    return res.redirect("/auth/login");
});

const adminAuthRouter = require("./routes/adminRouter.js");

app.use("/admin", adminAuthRouter);


app.listen(8000, () => {
    console.log('Server is running on port 8000');
});