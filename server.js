const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const config = require('./config');
const app = express();
const googleloginroute = require('./routes/googleloginroute');
const ideaSubmitroute = require('./routes/ideasubmitroute');
const subscriberoute = require('./routes/subscriberoute');


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


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// })
app.use("/api", googleloginroute);
app.use("/api", ideaSubmitroute);
app.use("/api", subscriberoute);
// app.use(express.static(path.join(__dirname, '../client/build')));




// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
app.listen(config.port || 5000, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
