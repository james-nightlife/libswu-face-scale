import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [signInError, setSignInError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setSignInError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post("https://libportal.swu.ac.th/user/login", formData)
      .then((response) => {
        const newUser = {
          username: formData.username,
          fullname: response.data.fullname,
          token: response.data.token,
        };

        //dispatch(signInSuccess(newUser));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        navigate("/service");
      })
      .catch((error) => {
        if (error.response) {
          setSignInError(true);
          console.log(error.response);
        }
      });
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Buasri ID"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-slate-100"
          onChange={handleChange}
        />
        <button className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90">
          Sign In
        </button>
      </form>
      <p className="mt-5 text-red-700">
        {signInError ? "Username or password is incorrect." : ""}
      </p>
    </div>
  );
};

export default SignIn;
