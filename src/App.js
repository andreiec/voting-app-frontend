import Votes from "./components/Votes/Votes";

function App() {
    const votes = [
        {
            id: "c84ea9ba-4f2f-4123-8336-2eae1aba252b",
            created: "2022-02-04T15:33:51.139429Z",
            title: "Jetpack security in the sky",
            description: "Odio aliquam turpis nascetur magnis. Ac diam eu molestie tincidunt fames quam. Malesuada parturient morbi elementum parturient amet. Eget egestas",
            voting_starts_at: "2022-02-04T15:33:42Z",
            voting_ends_at: "2022-02-04T15:33:43Z",
            archived_at: null,
            accepts_votes: true,
            is_active: true,
            is_archived: false,
            number_of_polls: 4,
            owner: "3c0f3144-6056-4bab-8f20-0d7961ef328c",
            groups: [
                "0036e39b-3330-49df-a04f-8c30d4d5e6cf",
                "0274ee7b-884d-454e-88aa-d3259a3de9ff"
            ]
        },
        {
            id: "c84ea9ba-4f2f-4123-8336-2eae1aba252b",
            created: "2022-02-04T15:33:51.139429Z",
            title: "Jetpack security in the sky",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
            voting_starts_at: "2022-02-04T15:33:42Z",
            voting_ends_at: "2022-02-04T15:33:43Z",
            archived_at: null,
            accepts_votes: true,
            is_active: true,
            is_archived: false,
            number_of_polls: 4,
            owner: "3c0f3144-6056-4bab-8f20-0d7961ef328c",
            groups: [
                "0036e39b-3330-49df-a04f-8c30d4d5e6cf",
                "0274ee7b-884d-454e-88aa-d3259a3de9ff"
            ]
        },
        {
            id: "c84ea9ba-4f2f-4123-8336-2eae1aba252b",
            created: "2022-02-04T15:33:51.139429Z",
            title: "Jetpack security in the sky",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
            voting_starts_at: "2022-02-04T15:33:42Z",
            voting_ends_at: "2022-02-04T15:33:43Z",
            archived_at: null,
            accepts_votes: true,
            is_active: true,
            is_archived: false,
            number_of_polls: 4,
            owner: "3c0f3144-6056-4bab-8f20-0d7961ef328c",
            groups: [
                "0036e39b-3330-49df-a04f-8c30d4d5e6cf",
                "0274ee7b-884d-454e-88aa-d3259a3de9ff"
            ]
        },
        {
            id: "c84ea9ba-4f2f-4123-8336-2eae1aba252b",
            created: "2022-02-04T15:33:51.139429Z",
            title: "Jetpack security in the sky",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
            voting_starts_at: "2022-02-04T15:33:42Z",
            voting_ends_at: "2022-02-04T15:33:43Z",
            archived_at: null,
            accepts_votes: true,
            is_active: true,
            is_archived: false,
            number_of_polls: 4,
            owner: "3c0f3144-6056-4bab-8f20-0d7961ef328c",
            groups: [
                "0036e39b-3330-49df-a04f-8c30d4d5e6cf",
                "0274ee7b-884d-454e-88aa-d3259a3de9ff"
            ]
        },
        {
            id: "c84ea9ba-4f2f-4123-8336-2eae1aba252b",
            created: "2022-02-04T15:33:51.139429Z",
            title: "Jetpack security in the sky",
            description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
            voting_starts_at: "2022-02-04T15:33:42Z",
            voting_ends_at: "2022-02-04T15:33:43Z",
            archived_at: null,
            accepts_votes: true,
            is_active: true,
            is_archived: false,
            number_of_polls: 4,
            owner: "3c0f3144-6056-4bab-8f20-0d7961ef328c",
            groups: [
                "0036e39b-3330-49df-a04f-8c30d4d5e6cf",
                "0274ee7b-884d-454e-88aa-d3259a3de9ff"
            ]
        },
    ]

    return (
        <Votes votes={votes}/>
    );
}

export default App;
