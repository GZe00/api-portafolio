import cors from "cors";
import mongoose from "mongoose";
import { mongoConnection } from "./config";

// const authRouter = require("./api/auth/routers/index.js");

console.log("Comenzando aplicación");
mongoose.connect(mongoConnection);

mongoose.connection.on("error", (error) => {
    console.log("Mongo connection error", error);
});

mongoose.connection.on("connected", (error, response) => {
    console.log("mongoose is connected");
});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fileUpload = require("express-fileupload");
var app = express();

let corsOptions = {
    origin: "*"
};

app.use(express.json());

app.use(fileUpload({
    createParenthPath: true
}));

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors(corsOptions));

console.log("Se ha inicializado simulapro app");

// app.use('/api/auth', authRouter);

app.use(function (request, response, next) {
    next(createError(404));
})

app.use((error, request, response) => {
    response.locals.message = error.message;
    response.locals.error = request.app.get('env') === 'development' ? error : {};

    console.log(error);

    response.status(error.status || 500).send("No encontrado" + request.path);

})

export default app;