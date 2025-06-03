import { Link ,useNavigate} from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import "./nav-bar.css";

export const Navbar = () => {
  const { authUser,logoutUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
     try{
       const result = await logoutUser();
      if(result.status === 200){
        navigate('/')
      }
     }catch(error){
      return error;
     }
  }

  //console.log("authUser----",authUser)

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">RoomMateFinder</Link>
      </div>

      <div className="nav-center">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/listings">Listings</Link>
          </li>
          <li>
            <Link to="/about-us">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/how it works">How It Works</Link>
          </li>
        </ul>
      </div>

      <div className="nav-right">
        <ul className="nav-links">
          {authUser.name ? (
            
         <>
            <li>
               <Link onClick={handleLogout}>Logout</Link>
            </li>
         </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
