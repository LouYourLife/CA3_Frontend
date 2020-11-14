import {
    mainURL,
    userInfoEndpoint,
    adminInfoEndpoint,
    defaultEndpoint,
    loginEndpoint,
    allMoviesEndpoint,
    pitchedMoviesEndpoint} from "./settings";

 
function handleHttpErrors(res) {
 if (!res.ok) {
   return Promise.reject({ status: res.status, fullError: res.json() })
 }
 return res.json();
}
 
function apiFacade() {
 /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
 
 const setToken = (token) => {
    localStorage.setItem('jwtToken', token)
  }
const getToken = () => {
  return localStorage.getItem('jwtToken')
}
const loggedIn = () => {
  const loggedIn = getToken() != null;
  return loggedIn;
}
const logout = () => {
  localStorage.removeItem("jwtToken");
}


const login = (user, password) => {
    const options = makeOptions("POST", true,{username: user, password: password });
    return fetch(mainURL + loginEndpoint, options)
      .then(handleHttpErrors)
      .then(res => {setToken(res.token) })
      
      
}
const fetchDataUser = () => {
    const options = makeOptions("GET",true); //True add's the token
   return fetch(mainURL + userInfoEndpoint, options).then(handleHttpErrors);
}
const fetchDataAdmin = () => {
    const options = makeOptions("GET",true); //True add's the token
   return fetch(mainURL + adminInfoEndpoint, options).then(handleHttpErrors);
}

const fetchDefault = (callback) => {
    const options = makeOptions("GET"); 
   return fetch(mainURL + defaultEndpoint, options)
   .then(handleHttpErrors)
   .then(data => {callback(data)})
}

const fetchAllMovies = (callback) => {
  const options = makeOptions("GET");
  return fetch(mainURL + allMoviesEndpoint, options)
  .then(handleHttpErrors)
  .then(data => {callback(data)});
}

const fetchPitchedMovies = (callback) => {
  const options = makeOptions("GET", true);
  return fetch(mainURL + pitchedMoviesEndpoint, options)
  .then(handleHttpErrors)
  .then(data => {callback(data)});
}

function addMovie(res) {
  const url = mainURL + defaultEndpoint;
  const optionsPost = makeOptions("POST", true, {
    title: res.title,
    episode_id: res.episode_id,
    opening_crawl: res.opening_crawl,
    director: res.director,
    producer: res.producer,
    release_date: res.release_date,
  });

  console.log(optionsPost);
  fetch(url, optionsPost)
  .then(handleHttpErrors)
  .then((data) => {
    document.getElementById("succesAdd").innerHTML = "Succes!";
  });
}

const makeOptions= (method,addToken,body) =>{
   var opts = {
     method: method,
     headers: {
       "Content-type": "application/json",
       'Accept': 'application/json',
     }
   }
   if (addToken && loggedIn()) {
     opts.headers["x-access-token"] = getToken();
   }
   if (body) {
     opts.body = JSON.stringify(body);
   }
   return opts;
 }

 return {
     makeOptions,
     setToken,
     getToken,
     loggedIn,
     login,
     logout,
     fetchDataUser,
     fetchDataAdmin,
     fetchDefault,
     fetchAllMovies,
     fetchPitchedMovies,
     addMovie
 }
}
const facade = apiFacade();
export default facade;
