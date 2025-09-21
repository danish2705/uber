import { useState } from "react";
import { Link } from "react-router-dom";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setCaptainData({
      email,
      password,
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-xl font-medium mb-2">Enter password</h3>
          <input
            required
            className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-3 w-full cursor-pointer">
            login
          </button>
        </form>
        <p className="text-center">
          Join a fleet?
          <Link to="/captain-signup" className="text-blue-600 mb-3">
            {" "}
            Register as a Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] block text-center text-white font-semibold mb-7 rounded px-4 py-3 w-full"
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
}

export default CaptainLogin;
