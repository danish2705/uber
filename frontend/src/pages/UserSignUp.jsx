import { useState } from "react";
import { Link } from "react-router-dom";

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
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
          <h3 className="text-xl font-medium mb-2">What's your name</h3>
          <div  className="flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="firstname"
            />
            <input
              required
              className="bg-[#eeeeee] mb-5 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              placeholder="lastname"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>

          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-xl font-medium mb-2">Enter password</h3>
          <input
            required
            className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-3 w-full cursor-pointer">
            login
          </button>
        </form>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#10b461] block text-center text-white font-semibold mb-7 rounded px-4 py-3 w-full"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
}

export default UserSignUp;
