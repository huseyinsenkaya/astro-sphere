// hooks
import { useCollection } from "../../hooks/useCollection";

// components
import Avatar from "../Avatar/Avatar";

export default function OnlineUsers() {
  const { documents, error } = useCollection("users");
  return (
    <div className="w-[250px] min-w-[250px] bg-[#fbfbfb] p-7 text-heading-color">
      <h2 className="mb-10 border-b border-solid border-[#eee] pb-2 text-right text-lg">
        All Users
      </h2>
      {error && <div className="error">{error}</div>}
      {documents &&
        documents.map((user) => (
          <div
            className="mx-auto my-5 flex items-center justify-end"
            key={user.id}
          >
            {user.online && (
              <span className="mr-2 h-3 w-3 rounded-full bg-green-800"></span>
            )}
            {!user.online && (
              <span className="mr-2 h-3 w-3 rounded-full bg-gray-400"></span>
            )}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} customClass={"ml-2 h-10 w-10"} />
          </div>
        ))}
    </div>
  );
}
