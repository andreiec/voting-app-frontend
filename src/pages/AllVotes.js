import { useSelector } from "react-redux";
import Votes from "../components/Votes/Votes";


function AllVotes() {
    const authSelector = useSelector(selector => selector.auth);
    console.log(authSelector.token);
    console.log(authSelector.isLoggedIn);
    return (
        <Votes />
    )
}


export default AllVotes;