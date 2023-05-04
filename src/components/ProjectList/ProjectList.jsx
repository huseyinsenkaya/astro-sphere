import { Link } from "react-router-dom";
// components
import Avatar from "../Avatar/Avatar";

export default function ProjectList({ projects }) {
  return (
    <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map((project) => (
        <Link
          className="rounded-md bg-white p-4 shadow-md"
          key={project.id}
          to={`/project/${project.id}`}
        >
          <h4 className="text-sm text-heading-color">{project.name}</h4>
          <p className="text-sm text-text-color">
            Due by {project.dueDate.toDate().toDateString()}
          </p>
          <div className="mt-5 border-t border-solid border-[#eee] pt-2">
            <ul className="mx-0 mt-2 flex">
              {project.assignedUsersList.map((user) => (
                <li className="mr-2" key={user.id}>
                  <Avatar src={user.photoURL} customClass={"w-10 h-10"} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
}
