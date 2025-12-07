import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

function CaptainProtected({ children }) {
  const token = localStorage.getItem("token");
  const { setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate("/captain-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          setCaptain(res.data.captain);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/captain-home");
        setLoading(false);
      });
  }, [token, setCaptain, navigate]);

  if (loading) {
    return <p>loading</p>;
  }

  return <div>{children}</div>;
}

export default CaptainProtected;
