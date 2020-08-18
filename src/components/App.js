import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
// eslint-disable-next-line import/no-named-as-default
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";
// eslint-disable-next-line import/no-named-as-default
import CoursesPage from "./courses/CoursesPage";
import MangeCoursePage from "./courses/MangeCoursePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="container-fluid">
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={MangeCoursePage} />
        <Route path="/course" component={MangeCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default App;
