import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading == true) return;
    setLoading(true);
    setErrMsg("")
    const newCaptain = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        newCaptain
      );
      if (res.status == 200 || res.status == 201) {
        const data = res.data;
        setCaptain(data.captain);
        setEmail("");
        setPassword("");
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      } else {
        setErrMsg("Signin failed - unexpected error");
      }
    } catch (err) {
      const error = err?.response?.data?.message;
      if (error) {
        setErrMsg(error);
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
          {errMsg && <p className="text-red-600 mb-3">{errMsg}</p>}
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
