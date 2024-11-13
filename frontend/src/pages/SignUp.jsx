import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="title">
        Welcome, <span>sign up to continue</span>
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
      <button className="button-confirm" 
      style={{ backgroundColor: '#77dd77', color: '#fff' }}disabled={isLoading}>
        Sign Up
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default SignUp;
