import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) {
      navigate("/sign-in");
    }
  });
  return(
    <>
      <div className="flex justify-center p-4">
        <Link
          className="bg-blue-500 text-white p-4 rounded text-2xl"
          to="/service">
        Start
        </Link>
      </div>
      
    </>
  );
};

export default Home;
