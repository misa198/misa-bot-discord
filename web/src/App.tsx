import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AppWrapper } from "./styled";

import Header from "./components/Header";

const Home = lazy(() => import("./containers/Home"));
const Docs = lazy(() => import("./containers/Docs"));

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <Suspense fallback={<></>}>
          <Route exact path="/" component={Home} />
          <Route exact path="/docs" component={Docs} />
        </Suspense>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;
