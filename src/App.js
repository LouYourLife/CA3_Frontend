import "./bootstyle.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
  Prompt,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import Login from "./Login";
import facade from "./apiFacade";
import LoggedIn from "./LoggedIn";
import LoginForm from "./loginForm";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [errorMes, setErrorMes] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)

      .then((res) => setLoggedIn(true))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorMes(err.message);
        });
      });
  };

  const setLoginStatus = (status) => {
    setLoggedIn(status);
    history.push("/");
  };

  return (
    <div>
      <Header loginMsg={loggedIn ? "Logout" : "Login"} loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/page1">
          <FetchDefault />
        </Route>
        <Route path="/page2">
          <FetchAllMovies />
        </Route>
        <Route path="/page3">
          <User />
        </Route>
        <Route path="/page4">
          <Admin />
        </Route>
        <Route path="/login">
          {!loggedIn ? (
            <LoginForm
              errorMes={errorMes}
              setErrorMes={setErrorMes}
              login={login}
            />
          ) : (
            <div>
              <LoggedIn />
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </div>
  );
}
{
  /* <Login
            loginMsg={loggedIn ? "Logout" : "Login"}
            loggedIn={loggedIn}
            setLoginStatus={setLoginStatus}
          /> */
}

function FetchDefault() {
  const [array, setArray] = useState({});

  useEffect(() => {
    facade.fetchDefault(setArray);
    const characterList = array.characters;
  }, []);

  return (
    <Container>
      <Row>
        <Col><h3>The developer's personal favourite</h3><br/></Col>
      </Row>
      <Row>
        <Col><p>Data fetched from API: {array.url}</p></Col>
      </Row>
      <Row>
        <Col><p>Title: {array.title}</p></Col>
        <Col><p>Episode ID: {array.episode_id}</p></Col>
        <Col><p>Release Date: {array.release_date}</p></Col>
      </Row>
      <Row>
        <Col><p>Director: {array.director}</p></Col>
        <Col></Col>
        <Col><p>Producer: {array.producer}</p></Col>
      </Row>
      <Row>
        <Col><p>Opening Crawl: {array.opening_crawl}</p></Col>
      </Row>
    </Container>
  );
}

function FetchAllMovies() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    facade.fetchAllMovies(setArray);
  }, []);

  return (
    <div>
      <Container>
        <Row>
          <Col><h3>Star Wars movies</h3></Col>
        </Row>
      </Container>
      <Container>
        {array.map((data) => {
          return (
            <>
              <Row className="block-row border border-bottom-0 border-dark">
                <Col className="center"><p>Fetched from {data.URL}</p></Col>
              </Row>
              <Row className="block-row border border-bottom-0 border-dark">
                <Col><p>Title: {data.title}</p></Col>
                <Col><p>Episode: {data.episode_id}</p></Col>
                <Col><p>Release date: {data.release_date}</p></Col>
              </Row>
              <Row className="block-row border border-dark">
                <Col><p>Director: {data.director}</p></Col>
                <Col><p>Producer: {data.producer}</p></Col>
              </Row>
              <Row className="block-row border border-top-0 border-dark">
                <Col><p>{data.opening_crawl}</p></Col>
              </Row>
              <br />
            </>
          );
        })}
      </Container>
    </div>
  );
}

function FetchPitchedMovies() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    facade.fetchPitchedMovies(setArray);
  }, []);

  return (
    <div>
        <Row>
          <Col><h3>Star Wars movie pitches from users:</h3></Col>
        </Row>
        <br/>
        {array.map((data) => {
          return (
          <>
          <Row className="block-row border border-bottom-0 border-dark">
            <Col><p>Title: {data.title}</p></Col>
            <Col><p>Episode: {data.episode_id}</p></Col>
            <Col><p>Release date: {data.release_date}</p></Col>
          </Row>
          <Row className="block-row border border-dark">
                <Col><p>Director: {data.director}</p></Col>
                <Col><p>Producer: {data.producer}</p></Col>
          </Row>
          <Row className="block-row border border-top-0 border-dark">
            <Col><p>Opening: {data.opening_crawl}</p></Col>
          </Row>
          <br/>
          </>
          )
        })}
    </div>
  );
}

function Header({ loggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li>
        <NavLink exact activeClassName="active" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page1">
          SW Fav
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName="active" to="/page2">
          SW List
        </NavLink>
      </li>
      {loggedIn && (
        <>
          <li>
            <NavLink activeClassName="active" to="/page3">
              User page
            </NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="active" to="/page4">
              Admin page
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink exact activeClassName="active" to="/login">
          {loginMsg}
        </NavLink>
      </li>
    </ul>
  );
}

function NoMatch() {
  let location = useLocation();
  return (
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  );
}

function Home() {
  return (
    <Container>
      <Row>
        <Col><h3>Welcome!</h3></Col>
      </Row>
      <Row>
        <Col><p>Jeg satte backend op først:<br/>
        Tilføjede Movie klassen og MovieDTO. Fik sat databasen op og ændret 
        persistence.yml til at bruge den nye database.<br/>
        SetupTestUsers.java blev brugt til at fylde databasen med et par brugere.<br/>
        Der blev tilføjet fetch metoder til HttpUtils og FetchFacade.<br/>
        Endpoints, mest GET og en enkelt POST, blev tilføjet til DefaultRessource.
        </p></Col>
      </Row>
      <Row>
        <Col><p>Derefter blev frontend sat op:<br/>
        Placeholder blev udskiftet med funktioner der udfyldte SW Fav og 
        SW List. 
        Login blev ikke rørt, da den virkede i den givne startcode fra 
        forrige lektioner. 
        User og Admin siderne blev udfyldt.<br/>
        User har en form der kan tilføje en film til databasen.<br/>
        Admin kan se listen af film der er blevet tilføjet.<br/>
        Flere div tags blev udskiftet med Container, Row og Col for pænere
        layout.</p></Col>
      </Row>
    </Container>
  );
}

function Placeholder() {
  return <h3>TODO</h3>;
}

function User() {
  const [errorUser, setErrorUser] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error");
  const body = {
    title: "",
    episode_id: "",
    opening_crawl: "",
    director: "",
    producer: "",
    release_date: ""
  };
  const [reservation, setReservation] = useState(body);

  useEffect(() => {
    facade
      .fetchDataUser()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorUser(err.message);
        });
      });
  }, []);

  const handleChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setReservation({...reservation, [name]: value});
  }

  const handleSubmit = event => {
    event.preventDefault();
    document.getElementById("addMovie").addEventListener("click", facade.addMovie(reservation));
  }

  return (
    <Container>
      <h2>{dataFromServer}</h2>
      <h3>Pitch a Star Wars movie!</h3>
      <form onSubmit={handleSubmit}>
        <input
        name="title"
        value={reservation.title}
        onChange={handleChange}
        placeholder="Title"
        />
        <br/>
        <input
        name="episode_id"
        type="number"
        value={reservation.episode_id}
        onChange={handleChange}
        placeholder="Episode ID"
        />
        <br/>
        <input
        name="opening_crawl"
        value={reservation.opening_crawl}
        onChange={handleChange}
        placeholder="Opening text"
        />
        <br/>
        <input
        name="director"
        value={reservation.director}
        onChange={handleChange}
        placeholder="Director"
        />
        <br/>
        <input
        name="producer"
        value={reservation.producer}
        onChange={handleChange}
        placeholder="Producer"
        />
        <br/>
        <input
        name="release_date"
        value={reservation.release_date}
        onChange={handleChange}
        placeholder="Release Date"
        />
        <br/>
        <Button id="addMovie" type="submit">Pitch it</Button>
      </form>
      <div id="succesAdd"></div>
      <p>{errorUser}</p>
    </Container>
  );
}

function Admin() {
  const [errorAdmin, setErrorAdmin] = useState("");
  const [dataFromServer, setDataFromServer] = useState("Error!");

  useEffect(() => {
    facade
      .fetchDataAdmin()
      .then((data) => setDataFromServer(data.msg))
      .catch((err) => {
        err.fullError.then((err) => {
          setErrorAdmin(err.message);
        });
      });
  }, []);

  return (
      <Container>
        <Row>
          <Col><h2>{dataFromServer}</h2></Col>
        </Row>
        <Row>
          <Col><FetchPitchedMovies /></Col>
        </Row>
        <Row>
          <Col><p>{errorAdmin}</p></Col>
        </Row>
      </Container>
  );
}

export default App;
