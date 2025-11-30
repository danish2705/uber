import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UserLogout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const logout = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/login`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200 || res.status == 201) {
        localStorage.removeItems("token");
        navigate("/login");
      }
    };
    logout();
  }, []);

  return <div>logiout ...</div>;
}

export default UserLogout;
