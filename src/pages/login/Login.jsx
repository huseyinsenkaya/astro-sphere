import { useState } from "react";

// hooks
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto my-14 max-w-[360px] rounded-lg border border-solid border-[#ddd] bg-white p-10 shadow-md"
    >
      <h2>Login</h2>
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

      {isPending && (
        <button className="btn" disabled>
          Loading...
        </button>
      )}
      {!isPending && <button className="btn">Login</button>}
      {error && <div className="error">{error}</div>}
    </form>
  );
}
