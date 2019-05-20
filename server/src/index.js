const express = require("express");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true
  });
});

app.listen(3001, () => {
  console.log("server running");
});
