import React, { useState, useEffect } from "react";

const mainURLx = "http://localhost:8080/jpareststarter";
const mainURL = "https://vn41.dk/devops-starter";
const userInfoEndpoint = "/api/info/user";
const adminInfoEndpoint = "/api/info/admin";
const defaultEndpoint = "/api/default";
const loginEndpoint = "/api/login";
const allMoviesEndpoint = "/api/default/movielist";
const pitchedMoviesEndpoint = "/api/default/pitchmovies";

export {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    allMoviesEndpoint,
    pitchedMoviesEndpoint
};
