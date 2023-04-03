const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const School = require("../model/school");

// Register
router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get School input
    const { schoolName, phone, address, logo, email, password } = req.body;

    // Validate School input
    if (!(email && password && schoolName && phone && address)) {
      res.status(400).json({
        message: "All input is required",
      });
    }

    // check if School already exist
    // Validate if School exist in our database
    const oldSchool = await School.findOne({ email });

    if (oldSchool) {
      return res.status(409).json({
        message: "School Already Exist. Please Login",
      });
    }

    //Encrypt School password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create School in our database
    const School = await School.create({
      schoolName,
      phone,
      address,
      logo,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { School_id: School._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save School token
    School.token = token;

    // return new School
    res.status(201).json(School);
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
  // Our register logic ends here
});

// Login
router.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get School input
    const { email, password } = req.body;

    // Validate School input
    if (!(email && password)) {
      res.status(400).json({
        message: "All input is required",
      });
    }
    // Validate if School exist in our database
    const School = await School.findOne({ email });

    if (School && bcrypt.compare(password, School.password)) {
      // Create token
      const token = jwt.sign(
        { School_id: School._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save School token
      School.token = token;

      // School
      res.status(200).json({
        message: "Login successful",
        data: School,
      });
    }
    res.status(400).json({
      message: "Invalid credentials",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
  // Our login logic ends here
});

// Get Schools
router.get("/", async (req, res) => {
  try {
    const Schools = await School.find();
    res.status(200).json({
      message: "Schools fetched successfully",
      data: Schools,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
});

// Get School
router.get("/:id", async (req, res) => {
  try {
    const School = await School.findById(req.params.id);
    res.status(200).json({
      message: "School fetched successfully",
      data: School,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
});

// Update School
router.put("/:id", async (req, res) => {
  try {
    const newSchool = await School.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      message: "School updated successfully",
      data: newSchool,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
});

// Delete School
router.delete("/:id", async (req, res) => {
  try {
    const School = await School.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "School deleted successfully",
      data: School,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
    });
    console.log(err);
  }
});

module.exports = router;
