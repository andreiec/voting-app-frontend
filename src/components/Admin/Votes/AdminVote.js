import AdminVoteNumbers from "./AdminVoteNumbers";
import AdminVoteTitle from "./AdminVoteTitle";

function AdminVote(props) {
    return (
        <>
            <AdminVoteTitle data={props.data.vote}/>
            <AdminVoteNumbers data={{vote: props.data.vote, users: props.data.users, userVotes: props.data.userVotes}} />
        </>
    )
}

export default AdminVote;