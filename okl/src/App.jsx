import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./pages/Form";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import Service from "./pages/Service";
import SignOut from "./pages/SignOut";
import Result from "./pages/Result";
import PrivateRoute from "./pages/PrivateRoute";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/service" element={<Service />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/result" element={<Result />} />
        <Route element={<PrivateRoute />}>
          <Route path="/sign-out" element={<SignOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
