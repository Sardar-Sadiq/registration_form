const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path"); // Add path module to handle file paths

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${username}:${password}@cluster0.2cri3ot.mongodb.net/registrationFormDB`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set static folder for serving static files
app.use(express.static(path.join(__dirname, "pages")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/index.html"));
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await Registration.findOne({ email: email });
    if (!existingUser) {
      const registrationData = new Registration({
        name,
        email,
        password,
      });
      await registrationData.save(); // Fix the typo here, change ',' to '.'
      res.redirect("/success");
    } else {
      console.log("User already exists");
      res.redirect("/error");
    }
  } catch (error) {
    console.log(error);
    res.redirect("/error"); // Add '/' before 'error' to make it an absolute path
  }
});

app.get("/success", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/success.html"));
});

app.get("/error", (req, res) => {
  res.sendFile(path.join(__dirname, "/pages/error.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// const app = express();
// dotenv.config();

// const port = process.env.PORT || 3000;

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD;

// mongoose.connect(
//   `mongodb+srv://${username}:${password}@cluster0.2cri3ot.mongodb.net/registrationFormDB`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

// const registrationSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   password: String,
// });

// const Registration = mongoose.model("Registration", registrationSchema);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/pages/index.html");
// });

// app.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const extingUser = await Registration.findOne({ email: email });
//     if (!extingUser) {
//       const registrationData = new Registration({
//         name,
//         email,
//         password,
//       });
//       await registrationData, save();
//       res.redirect("/success");
//     } else {
//       console.log("User already exist");
//       res.redirect("/error");
//     }
//   } catch (error) {
//     console.log(error);
//     res.redirect("error");
//   }
// });

// app.get("/success", (req, res) => {
//   res.sendFile(__dirname + "/pages/success.html");
// });

// app.get("/error", (req, res) => {
//   res.sendFile(__dirname + "/pages/error.html");
// });

// app.listen(port, () => {
//   console.log(`server is running on port ${port}`);
// });
