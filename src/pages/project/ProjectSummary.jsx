import { useNavigate } from "react-router-dom";

// components
import Avatar from "../../components/Avatar/Avatar";
//hooks
import { useFirestore } from "../../hooks/useFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";

export default function ProjectSummary({ project }) {
  const navigate = useNavigate();
  const { deleteDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  const handleClick = (e) => {
    deleteDocument(project.id);
    navigate("/");
  };
  return (
    <div>
      <div className="rounded-md bg-white p-7">
        <h2 className="page-title font-bold">{project.name}</h2>
        <p className="text-sm">By {project.createdBy.displayName}</p>
        <p className="mx-0 my-2 text-sm text-title-color">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="mx-0 my-7 text-sm leading-7 text-text-color">
          {project.details}
        </p>
        <h4 className="text-sm text-text-color">Project is assigned to:</h4>
        <div className="mt-5 flex">
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              <Avatar src={user.photoURL} customClass={"mr-2 h-12 w-12"} />
            </div>
          ))}
        </div>
      </div>
      {user.uid === project.createdBy.id && (
        <button className="btn mt-4" onClick={handleClick}>
          Mark as Complete
        </button>
      )}
    </div>
  );
}
