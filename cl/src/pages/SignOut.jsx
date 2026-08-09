import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { signOut } from "../redux/user/userSlice";
import { Navigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
    <Navigate to="/sign-in" />;
  });
  return <div>SignOut</div>;
};

export default SignOut;
