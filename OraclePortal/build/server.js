"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var controller_1 = require("./controller");
var app = express();
var port = 3000;
app.use("/", controller_1.default);
app.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
