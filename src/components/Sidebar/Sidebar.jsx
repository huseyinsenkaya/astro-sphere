import { NavLink } from "react-router-dom";

// hooks
import { useAuthContext } from "../../hooks/useAuthContext";

// icons
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import AddIcon from "@mui/icons-material/Add";

// components
import Avatar from "../Avatar/Avatar";

export default function Sidebar() {
  const { user } = useAuthContext();
  return (
    <div className="relative min-h-screen w-72 min-w-[288px] bg-primary-color text-white">
      <div className="fixed w-[inherit]">
        <div className="border-b border-solid border-border-color px-7 py-10 text-center font-bold tracking-wider">
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </div>
        <nav className="ml-5 mt-20">
          <ul>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex w-full gap-1 p-2 ${
                    isActive
                      ? "rounded-tl-2xl bg-bg-color  text-[#555]"
                      : "text-white"
                  }`
                }
                to="/"
              >
                <SpaceDashboardIcon />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="mt-2">
              <NavLink
                className={({ isActive }) =>
                  `flex w-full gap-1 p-2 ${
                    isActive
                      ? "rounded-tl-2xl bg-bg-color  text-[#555]"
                      : "text-white"
                  }`
                }
                to="/create"
              >
                <AddIcon />
                <span>Create</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
