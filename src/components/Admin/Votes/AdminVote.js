import { useNavigate } from "react-router-dom";
import Titlebar from "../../../layout/Titlebar";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVote(props) {
    const navigate = useNavigate();

    return (
        <>

            <AdminVoteTitle data={props.data.vote}/>
        </>
    )
}

export default AdminVote;