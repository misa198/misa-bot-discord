import { lazy, Suspense } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { AppWrapper } from "./styled";

import Header from "./components/Header";

const Home = lazy(() => import("./containers/Home"));

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper>
        <Header />
        <Suspense fallback={<></>}>
          <Route exact path="/" component={Home} />
        </Suspense>
      </AppWrapper>
    </BrowserRouter>
  );
};

export default App;
