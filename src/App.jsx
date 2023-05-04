import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// context
import { useAuthContext } from "./hooks/useAuthContext";

// pages
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";

// components
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import OnlineUsers from "./components/OnlineUsers/OnlineUsers";

function App() {
  const { user, authIsReady } = useAuthContext();
  return (
    <>
      {authIsReady && (
        <Router>
          <div className="flex">
            {user && <Sidebar />}
            <div className="flex-grow px-14 py-0">
              <Navbar />
              <Routes>
                <Route
                  index
                  element={
                    user ? <Dashboard /> : <Navigate to="/login" replace />
                  }
                />

                <Route
                  path="create"
                  element={user ? <Create /> : <Navigate to="/login" replace />}
                />
                <Route
                  path="project/:id"
                  element={
                    user ? <Project /> : <Navigate to="/login" replace />
                  }
                />

                <Route
                  path="login"
                  element={user ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                  path="signup"
                  element={user ? <Navigate to="/" replace /> : <Signup />}
                />
              </Routes>
            </div>
            {user && <OnlineUsers />}
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
