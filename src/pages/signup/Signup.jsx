import { useState } from "react";

// hooks
import { useSignup } from "../../hooks/useSignup";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100KB");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-14 max-w-[360px] rounded-lg border border-solid border-[#ddd] bg-white p-10 shadow-md"
    >
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>profile image:</span>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>

      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {!isPending && <button className="btn">Sign up</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
