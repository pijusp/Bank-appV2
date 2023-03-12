const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const md5 = require("md5");
const express = require("express");

const app = express();
const port = 3003;

app.listen(3003, () => {
    console.log(`Server running on port ${port}`);
});
