const express = require("express");
const routes = require("./routes");

const app = express();

app.use("/api", routes);

const port = process.env.PORT ?? 3001;
app.listen(port, console.debug(`[⚡ Server]: listening on port ${port}`));
