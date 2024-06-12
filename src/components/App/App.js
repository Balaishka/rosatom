import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import PageNotFound from "../PageNotFound/PageNotFound";
import Preloader from "../Preloader/Preloader";
import mainApi from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  errors,
  errorsRegister,
  errorsLogin,
  errorsUpdate,
} from "../../configs/errors";
import Main from "../Main/Main";
import Header from "../Header/Header";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  // Ошибки
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Загрузка
  const [isLoading, setIsLoading] = useState(false);

  // Пользователь
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") ? localStorage.getItem("loggedIn") : false
  );
  const [currentUser, setCurrentUser] = useState({
    role: "",
    login: "",
  });

  // Опорные точки
  const [navPoints, setNavPoints] = useState(localStorage.getItem("navPoints") ? JSON.parse(localStorage.getItem("navPoints")):[]);

  // Количество заявок Пользователя
  const [applicationsPoints, setApplicationsPoints] = useState(
    localStorage.getItem("applicationsPoints")
      ? JSON.parse(localStorage.getItem("applicationsPoints"))
      : [0, 0, 0]
  );
  const [applicationsInProcess, setApplicationsInProcess] = useState(
    localStorage.getItem("applicationsInProcess")
      ? JSON.parse(localStorage.getItem("applicationsInProcess"))
      : []
  );

  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      loggedIn &&
      (pathname === "/icebreaker/signin" || pathname === "/icebreaker/signup")
    ) {
      history.push("/icebreaker/");
    }
    setIsError(false);
  }, [loggedIn, history, pathname]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
      getUserInfo();
    }

    //handleLogout();
  }, [loggedIn]);

  function createError(errorsList, err) {
    if (errorsList[err] !== undefined) {
      setErrorMessage(errorsList[err]);
    } else {
      setErrorMessage(errors[500]);
    }
    setIsError(true);
  }

  function handleLogin({ login, password }) {
    setIsLoading(true);
    mainApi
      .authorize({ login, password })
      .then((res) => {
        if (res.result === "SUCCESS") {
          window.location.reload();
          localStorage.setItem("loggedIn", true);
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        createError(errorsLogin, err.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister({ role, login, password }) {
    setIsLoading(true);
    mainApi
      .register({ role, login, password })
      .then((res) => {
        if (res === "SUCCESS") {
          handleLogin({ login, password });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        createError(errorsRegister, err.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogout() {
    setIsLoading(true);
    mainApi
      .logout()
      .then((res) => {
        localStorage.clear();
        setCurrentUser({
          role: "",
          login: "",
        });
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
        createError(errorsRegister, err.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getUserInfo() {
    setIsLoading(true);
    mainApi
      .getUserInfo()
      .then((res) => {
        setLoggedIn(true);
        setCurrentUser(res);
      })
      .catch((err) => {
        //handleLogout();
        console.log(err);
        console.log(`Ошибка: ${err}`);
        createError(errorsLogin, err.status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Опорные точки
  function getNavigationPoints() {
    setIsLoading(true);
    mainApi
      .getNavigationPoints()
      .then((res) => {
        setNavPoints(res);
        localStorage.setItem("navPoints", JSON.stringify(res));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Список кораблей
  function getShips() {
    setIsLoading(true);
    mainApi
      .getShips()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Заявки пользователя (вроме согласованных)
  function getRouteRequests() {
    setIsLoading(true);
    mainApi
      .getRouteRequests()
      .then((res) => {
        //console.log(res.requests);

        setApplicationsInProcess(res.requests);
        localStorage.setItem(
          "applicationsInProcess",
          JSON.stringify(res.requests)
        );

        const points = [
          applicationsPoints[0],
          res.requests.length,
          applicationsPoints[2],
        ];
        localStorage.setItem("applicationsPoints", JSON.stringify(points));
        setApplicationsPoints(points);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {}

  function changeOption(index, name, setSelected) {
    if (index === 0) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, JSON.stringify(index));
    }
    setSelected(index);
  }

  return (
    <>
      <CurrentUserContext.Provider value={{ currentUser }}>
        <div className="page">
          <Header loggedIn={loggedIn} handleLogout={handleLogout} />
          <main className="content">
            <Switch>
              <ProtectedRoute exact path="/icebreaker/" loggedIn={loggedIn}>
                <Main
                  getNavigationPoints={getNavigationPoints}
                  navPoints={navPoints}
                  getShips={getShips}
                  getRouteRequests={getRouteRequests}
                  applicationsPoints={applicationsPoints}
                  applicationsInProcess={applicationsInProcess}
                />
              </ProtectedRoute>

              <Route path="/icebreaker/signin">
                <Login
                  onSubmit={handleLogin}
                  isError={isError}
                  errorMessage={errorMessage}
                />
              </Route>

              <Route path="/icebreaker/signup">
                <Register
                  onSubmit={handleRegister}
                  isError={isError}
                  errorMessage={errorMessage}
                  changeOption={changeOption}
                />
              </Route>

              <Route path="*">
                <PageNotFound history={history} />
              </Route>
            </Switch>
          </main>

          <Preloader isLoading={isLoading} />
        </div>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
