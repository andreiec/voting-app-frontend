import VotingCard from "./components/VotingCard";

function App() {
    const dateVote = new Date(2012, 11, 13);

    return (
        <div>
            <VotingCard title="Macanache" date={dateVote} desc="Macalan desc" />
            <VotingCard title="Macanache" date={dateVote} desc="Macalan desc" />
            <VotingCard title="Macanache" date={dateVote} desc="Macalan desc" />
        </div>
    );
}

export default App;
