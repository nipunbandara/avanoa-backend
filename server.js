const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();

//Import Routes
const reminderRoutes = require('./routes/reminderRoutes');
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const emailRoutes = require("./routes/emailRoutes");

const port = process.env.PORT || 8000
// db
mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("db connected");
    app.listen(port, () => {
      console.log("server is active");
      console.log(`listening on port ${port}`);
    });
  }
);

// mw
app.use(express.json());
express.urlencoded({ extended: true });
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(cors({ origin: true, credentials: true }));

// routes
app.use(userRoutes);
app.use(uploadRoutes);
app.use(reminderRoutes);
app.use(emailRoutes);
