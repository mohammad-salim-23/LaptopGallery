import { useContext } from "react"
import { AuthContext } from "../../Components/Shared/AuthContext/AuthProvider"

const Dashboard=()=>{

    const {user} = useContext(AuthContext);
    return(
        <div>

        </div>
    )
}
export default Dashboard();