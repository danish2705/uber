import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function CaptainLogout() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token") 
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status == 200 || res.status == 201) {
                localStorage.removeItem("token")
                navigate("/captain-home") 
            }
        }).catch(err => {
            console.log(err)

        }).finally(() => {
            localStorage.removeItem("token")
            navigate("/captain-home")
        })
},[navigate] )
    return (
        <div>
            Logout...
        </div>
    )
}

export default CaptainLogout
