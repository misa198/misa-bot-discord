import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AppWrapper } from "./styled";

import Header from "./components/Header";

const Home = lazy(() => import("./containers/Home"));
const Docs = lazy(() => import("./containers/Docs"));
const NotFound = lazy(() => import("./containers/NotFound"));

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <Suspense fallback={<></>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/docs" component={Docs} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;
