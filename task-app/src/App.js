import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import PrivateRoute from './Auth/privateRoutes'
import { createBrowserHistory } from "history";

import { Home, NotFound } from "./pages";

import Login from "./Auth/login";
import Signup from "./Auth/signup";
import PrivateRoute from "./Auth/privateRoutes";
import PublicRoutes from "./Auth/publicRoutes";
import SubscriptionsPage from "./pages/subscription";
import Paymentunsucessful from "./pages/paymentunsucessful";
function App() {
  const history = createBrowserHistory();

  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" elememnt={<NotFound />} />
          <Route path="/subscription" element={<SubscriptionsPage />} />
          <Route path="/PaymentError" element={<Paymentunsucessful />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/news-details"
            element={
              <PrivateRoute>
                <NewsDetails />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
