const express = require("express");
const connectDb = require("./config/db");

const app = express();

// connect database

connectDb();

// Init Middlewear

app.use(express.json({extended: false}));


app.get("/", (req, res) => res.send("API RUNING"));

//Define ROutes

app.use("/api/users", require("./Routes/API/users"));
app.use("/api/auth", require("./Routes/API/auth"));
app.use("/api/posts", require("./Routes/API/posts"));
app.use("/api/profile", require("./Routes/API/profile"));

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
      