import { NavLink } from "react-router-dom";

// context
import { useAuthContext } from "../../hooks/useAuthContext";

// hooks
import { useLogout } from "../../hooks/useLogout";

// images
import Orb from "../../assets/orb.svg";

export default function Navbar() {
  const { logout, error, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="box-border w-full px-0 py-7">
      <ul className="mx-auto my-0 flex items-center justify-end">
        <li className="mr-auto flex items-center font-bold tracking-wider text-heading-color">
          <img className="mr-2 w-9" src={Orb} alt="AstroSphere Logo" />
          <span>AstroSphere</span>
        </li>

        {!user && (
          <>
            <li>
              <NavLink className="mr-5 text-[#333]" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="mr-5 text-[#333]" to="/signup">
                Signup
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <li>
            {isPending && (
              <button className="btn" disabled>
                Logging out...
              </button>
            )}
            {!isPending && (
              <button className="btn" onClick={logout}>
                Logut
              </button>
            )}
          </li>
        )}
      </ul>
    </div>
  );
}
