const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const app = express();
var passport = require('passport');
var authenticate = require('./authenticate');


// Routes
const googleLoginRoute = require('./routes/googleloginroute');
const signupRoute = require('./routes/User/signupRoute');
const loginRoute = require('./routes/User/loginRoute');
const logoutRoute = require('./routes/User/logoutRoute');

const ideaSubmitroute = require('./routes/ideasubmitroute');
const subscribeRoute = require('./routes/subscriberoute');
const JobProfilesRouter = require('./routes/jobProfile/jobProfileRouter')
const ProductDetailsRouter = require('./routes/productsDetails/productDetailsRouter')
const resetPasswordRoute = require('./routes/User/resetPasswordRoute');


app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const mongodburl = config.MONGODB_URL;
mongoose.connect(mongodburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(console.log(`Connected to MongoDB`))
.catch(error => {
  console.log(error);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

// to authenticate user
app.use(passport.initialize());
// console.log("passport initialised")

app.use("/api/user", signupRoute);
app.use("/api/user", loginRoute);
app.use("/api/user", logoutRoute);

app.use("/api/user", resetPasswordRoute);
app.use("/api/user", googleLoginRoute);
app.use("/api", ideaSubmitroute);
app.use("/api", subscribeRoute);
app.use('/api/jobprofiles', JobProfilesRouter)
app.use('/api/productdetails', ProductDetailsRouter)
// app.use(express.static(path.join(__dirname, '../client/build')));




// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
const port = config.PORT;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
