import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signOut } from "../redux/user/userSlice";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(signOut());
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentService");
    localStorage.removeItem("currentServiceName");
    localStorage.removeItem("currentServiceNameEN");
    <Navigate to="/sign-in" />;
  }, [dispatch]);
  return <div>SignOut</div>;
};

export default SignOut;
