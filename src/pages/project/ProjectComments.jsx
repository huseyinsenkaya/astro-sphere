import { useState } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
//firebase
import { timestamp } from "../../firebase/config";
//hooks
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
//components
import Avatar from "../../components/Avatar/Avatar";

export default function ProjectComments({ project }) {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div>
      <h4 className="text-heading-color">Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment) => (
            <li
              className="mt-5 rounded border border-solid border-[#f2f2f2] bg-white p-4 shadow-sm"
              key={comment.id}
            >
              <div className="flex items-center gap-3 text-title-color">
                <Avatar src={comment.photoURL} customClass={"h-12 w-12"} />
                <p>{comment.displayName}</p>
              </div>
              <div className="m-[4px_0_10px] text-sm text-text-color">
                <p>
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div className="text-sm text-text-color">
                <p>{comment.content}</p>
              </div>
            </li>
          ))}
      </ul>

      <form className="add-comment" onSubmit={handleSubmit}>
        <label>
          <span>Add new comment:</span>
          <textarea
            className="min-h-[40px]"
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></textarea>
        </label>

        <button className="btn">Add Comment</button>
      </form>
    </div>
  );
}
