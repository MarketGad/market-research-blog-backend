const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
var JWT = require('jsonwebtoken'); // used to create, sign, and verify tokens

var passport = require('passport');
var authenticate = require('./authenticate');


// Routes
// const googleLoginRoute = require('./routes/googleloginroute');
const signupRoute = require('./routes/User/signupRoute');
const loginRoute = require('./routes/User/loginRoute');
const logoutRoute = require('./routes/User/logoutRoute');
const GoogleLoginRoute = require('./routes/User/GoogleLogin');

// const ideaSubmitroute = require('./routes/ideasubmitroute');
const subscribeRoute = require('./routes/subscriberoute');
const JobProfilesRouter = require('./routes/jobProfile/jobProfileRouter')
const ProductDetailsRouter = require('./routes/productsDetails/productDetailsRouter')
const resetPasswordRoute = require('./routes/User/resetPasswordRoute');
const UserRouter = require('./routes/User/UserRouter');
const MessageRouter = require('./routes/Chats/messages');
const PaymentRouter = require('./routes/Payment/PaymentsRouter');
const HireRouter = require('./routes/jobProfile/hiredRouter')
const JobsRouter = require('./routes/jobProfile/JobsRouter');
const ClubPostsRouter = require('./routes/DisrupterClub/PostsRouter');
const HotProductsRouter = require('./routes/productsDetails/hotProductsRouter');

const { ETXTBSY } = require('constants');


const app = express();
app.use(morgan('combined'))


const port = config.PORT;
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

const io = require('socket.io').listen(server);

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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');



app.use(bodyParser.json({limit: "512kb", extended: true}));
app.use(bodyParser.urlencoded({limit: "512kb", extended: true}));

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cookieParser());
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })

// to authenticate user
app.use(passport.initialize());
// console.log("passport initialised")

app.use( (req, res, next) => {
  req.io = io;
  next();
});


app.use("/api/user", signupRoute);
app.use("/api/user", loginRoute);
app.use("/api/user", logoutRoute);
app.use("/api/user", GoogleLoginRoute);
app.use("/api/user", UserRouter);

app.use("/api/chat/messages", MessageRouter);

app.use("/api/user", resetPasswordRoute);
app.use("/api/subscribe", subscribeRoute);

app.use('/api/jobprofiles', JobProfilesRouter)
app.use('/api/jobprofiles/hire/', HireRouter)
app.use('/api/jobs', JobsRouter)

app.use('/api/productdetails', ProductDetailsRouter)
app.use('/api/hotproducts', HotProductsRouter)

app.use("/api/payment", PaymentRouter);

app.use("/api/disrupterclub/posts", ClubPostsRouter);
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
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.setHeader('Content-Type', 'application/json');
  res.json({err: err.message});
});