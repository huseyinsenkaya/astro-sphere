import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

// hooks
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// firebase
import { timestamp } from "../../firebase/config";

const categories = [
  { value: "development", label: "Development" },
  { value: "fashion&music", label: "Fashion & Music" },
  { value: "design", label: "Design" },
  { value: "production", label: "Production" },
  { value: "philanthropy&sports", label: "Philanthropy & Sports" },
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
];

export default function Create() {
  const navigate = useNavigate();

  const { addDocument, response } = useFirestore("projects");
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);
  const { documents } = useCollection("users");

  // form fields values
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => ({
        value: user,
        label: user.displayName,
      }));

      setUsers(options);
    }
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError(null);

    if (!category) {
      setFormError("Please Select a project category");
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user");
      return;
    }

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const assignedUsersList = assignedUsers.map((item) => ({
      displayName: item.value.displayName,
      photoURL: item.value.photoURL,
      id: item.value.id,
    }));

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    console.log(project);

    // add project to firebase
    await addDocument(project);
    if (!response.error) {
      navigate("/");
    } else {
      setFormError(
        "Unable to add project: Please ensure all required information is provided and formatted correctly."
      );
    }
  };

  return (
    <div className="max-w-[600px]">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Details:</span>
          <textarea
            type="text"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></textarea>
        </label>
        <label>
          <span>Due date:</span>
          <input
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
            menuPlacement="auto"
          />
        </label>
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
            menuPlacement="auto"
          />
        </label>
        <button className="btn">Add Project</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
}
