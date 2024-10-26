import { AuthContext } from "../Components/Shared/AuthContext/AuthProvider"

const useAdmin=()=>{
    const {user,loading} = useContext(AuthContext);
    
    return(
        <div>

        </div>
    )
}
export default useAdmin;