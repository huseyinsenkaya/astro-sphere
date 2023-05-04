import { useState } from "react";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
// components
import ProjectList from "../../components/ProjectList/ProjectList";
import ProjectFilter from "./ProjectFilter";

export default function Dashboard() {
  const { user } = useAuthContext();
  const [currentFilter, setCurrentFilter] = useState("All");
  const { documents, error } = useCollection("projects");

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  const projects = documents?.filter((doc) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "mine":
        let assignedToMe = false;
        doc.assignedUsersList?.forEach((u) => {
          if (user.uid === u.id) {
            assignedToMe = true;
          }
        });
        return assignedToMe;
      case "development":
      case "fashion&music":
      case "design":
      case "production":
      case "philanthropy&sports":
      case "sales":
      case "marketing":
        return doc.category === currentFilter;
      default:
        return true;
    }
  });
  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {documents && (
        <ProjectList currentFilter={currentFilter} projects={projects} />
      )}
    </div>
  );
}
