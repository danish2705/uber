import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

function CaptinSignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (loading == true) return;
    setLoading(true);
    if (!vehicleType) {
      setErrMsg("Please select a vehicle type");
      setLoading(false);
      return;
    }
    const newCaptain = {
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newCaptain
      );
      if (res.status == 200 || res.status == 201) {
        const data = res.data;
        setCaptain(data.captain);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setErrMsg("signUp failed - unexpected response");
      }
    } catch (err) {
      const errors = err?.response?.data?.errors;
      if (Array.isArray(errors)) {
        setErrMsg(errors.map((x) => x.msg).join(". "));
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
          <h3 className="text-xl font-medium mb-2">Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              required
              className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              value={color}
              placeholder="Vehicle Color"
              type="text"
              onChange={(e) => setColor(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              placeholder="Vehicle Plate"
              value={plate}
              type="text"
              onChange={(e) => setPlate(e.target.value)}
            />
            <input
              required
              className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              placeholder="Vehicle Capacity"
              value={capacity}
              type="number"
              onChange={(e) => setCapacity(e.target.value)}
            />
            <select
              required
              className="bg-[#eeeeee] border mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
            >
              <option value="" disabled hidden>
                Select Vehicle type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>
          {errMsg && <p className="text-red-600 mb-3">{errMsg}</p>}
          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-3 w-full cursor-pointer"
          >
            {loading ? "Creating..." : "Create Account"}
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
  );
}

export default CaptinSignUp;
