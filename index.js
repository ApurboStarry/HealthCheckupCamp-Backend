const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./src/startup/cors")(app);
require("./src/startup/routes")(app);
require("./src/startup/db")();
require("./src/startup/config")();
require("./src/startup/prod")(app);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Listening on port", port));
