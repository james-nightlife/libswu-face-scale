import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  //const { currentUser } = useSelector((state) => state.user);
  const currentUser = localStorage.getItem("currentUser");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentService");
    localStorage.removeItem("currentServiceName");
    localStorage.removeItem("currentServiceNameEN");
    navigate(0);
  };
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
        <Link to="/">
          <h1 className="text-2xl font-semibold">Face-Scale</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/result">
            <li>Result</li>
          </Link>
          <button onClick={handleSignOut}>
            {currentUser ? <li>Sign out</li> : <li>Sign in</li>}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
