import { useParams } from "react-router-dom";
// hooks
import { useDocument } from "../../hooks/useDocument";
// components
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";

export default function Project() {
  const { id } = useParams();
  const { error, document } = useDocument("projects", id);

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-[3fr,2fr] items-start gap-16">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
}
