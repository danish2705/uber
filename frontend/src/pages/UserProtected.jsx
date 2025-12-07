import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";

function ProtectedPage({ children }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const {setUser} = useContext(UserDataContext)
  useEffect(() => {
    if (!token) {
      return navigate("/login")
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status == 200 || res.status == 201) {
        setUser(res.data.user)
        setLoading(false)
      }
    }).catch(err => {
      console.log(err)
      localStorage.removeItem(token)
      navigate("/login")
    })

  },[token, setUser, navigate])

  if (loading) {
    return <div>loading...</div>
  }

  return <div>{children}</div>;
}

export default ProtectedPage;
