import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserDataContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading) true;
    setLoading(true);

    const user = {
      email,
      password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        user
      );

      if (res?.status == 200 || res?.status == 201) {
        const data = res.data;
        setUser(data.user ?? data);

        setEmail("");
        setPassword("");
        localStorage.setItem("token", data.token)
        navigate("/home");
      } else {
        setErrMsg("login failed - unexpected resopnse");
      }
    } catch (error) {
      const errors = error?.response?.data?.error;
      if (Array.isArray(errors)) {
        setErrMsg(errors.map((x) => x.msg).join(". "));
      } else {
        setErrMsg(
          error?.response?.data?.error || error?.message || "Signin Failed"
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
          New here?
          <Link to="/signup" className="text-blue-600 mb-3">
            {" "}
            Create new Account
          </Link>
        </p>
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

export default UserLogin;
