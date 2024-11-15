import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">
        Login <span>Enter your credentials</span>
      </div>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
        placeholder="abc@gmail.com"
        required
        className="input"
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
        placeholder="password"
        required
        className="input"
      />
      <button className="button-confirm"  style={{ backgroundColor: '#A77BCA', color: '#fff' }}
      disabled={isLoading}>
        Log In
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
