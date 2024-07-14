const cors = require("cors");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/task");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tasks", taskRoutes);
app.get("/tasks/:id", taskRoutes);
app.post("/tasks", taskRoutes);
app.delete("/tasks/:id", taskRoutes);
app.put("/tasks/:id", taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
