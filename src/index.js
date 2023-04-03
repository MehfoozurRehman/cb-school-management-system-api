const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const fileUpload = require("express-fileupload");
const auth = require("./middleware/auth");
const School = require("./routes/school");

// api config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.enable("trust proxy");
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(express.static("public"));

// db config

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch((error) => {
    console.log("database connection failed. exiting now...");
    console.error(error);
  });

// api endpoints

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api",
  });
});

app.use("/", School);

app.post("/upload", (req, res) => {
  console.log(req.files.foo);
  //   <input name="foo" type="file" />
});

app.get("*", auth, (req, res) =>
  res.status(404).json({ message: "404 page not found" })
);

// listners
app.listen(port, () => console.log(`Server is running on port ${port}`));
