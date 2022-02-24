import { useParams } from 'react-router-dom';

function Vote() {
    const params = useParams();

    return (
        <h1>{params.id}</h1>
    )
};

export default Vote