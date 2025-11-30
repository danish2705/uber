import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";

function UserSignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) return; 

    setErrorMsg("");
    setLoading(true);

    const newUser = {
      firstName,
      lastName,
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (res?.status === 201 || res?.status === 200) {
        const data = res.data;
        setUser(data.user ?? data);

        // clear form
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        localStorage.setItem("token", data.token)
        navigate("/home");
      } else {
        setErrorMsg("Signup failed - unexpected response");
      }
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (Array.isArray(errors)) {
        setErrorMsg(errors.map((x) => x.msg).join(". "));
      } else {
        setErrorMsg(
          err?.response?.data?.message || err?.message || "Signup failed"
        );
      }
    } finally {
      setLoading(false);
    }
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

          {errorMsg && <p className="text-sm text-red-600 mb-3">{errorMsg}</p>}

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-3 w-full cursor-pointer disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center">
          Already have account?{" "}
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>

      <div>
        <div>
          <p className="text-xs">
            By proceeding, you consent to receive calls, WhatsApp messages, or
            SMS (including automated messages) from Uber and its affiliates to
            the number provided.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignUp;
