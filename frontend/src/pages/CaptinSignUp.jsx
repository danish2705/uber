import { useState } from "react";
import { Link } from "react-router-dom";

function CaptinSignUp() {
    const [email, setEmail] = useState("");
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [password, setPassword] = useState("");
      const [userData, setUserData] = useState({});
      const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
          fullName: {
            firstName,
            lastName,
          },
          email,
          password,
        });
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
      };
    return (
        <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <form onSubmit={submitHandler}>
          <h3 className="text-xl font-medium mb-2">What's your name</h3>
          <div className="flex gap-4">
            <input
              required
              className="bg-[#eeeeee] w-1/2 mb-5 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              value={firstName}
              placeholder="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] mb-5 w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
              type="text"
              value={lastName}
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
          <input
            required
            className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
            value={email}
            placeholder="email@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-xl font-medium mb-2">Enter password</h3>
          <input
            required
            className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-3 w-full cursor-pointer"
            onClick={submitHandler}
          >
            login
          </button>
        </form>
        <p className="text-center">
          Already have account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>{" "}
        </p>
      </div>
      <div>
        <div>
          <p className="text-xs">
            By proceeding, you consent to get calls, Whatsapp or sms including
            bu automated means, form Uber and its affiliates to the number
            provided
          </p>
        </div>
      </div>
    </div>
    )
}

export default CaptinSignUp
