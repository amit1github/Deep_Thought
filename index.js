const express = require("express");
const { client } = require("./db_config");

const app = express();
app.use(express.json());

// database connection
client
  .connect()
  .then(() => {
    console.log(`MongoDB connected successfully`);
  })
  .catch((err) => {
    console.log(`Error connecting mongodb ` + err);
  });

// My routes
const eventRoutes = require("./routes/events");

// routes with baseUrl
app.use("/api/v3/app", eventRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
