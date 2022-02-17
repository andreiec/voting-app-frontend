import './VotingCard.css';

function VotingCard(props) {
    const cardDate = props.date.toLocaleString('en-US', {year: 'numeric', month: 'numeric', day: 'numeric'}).split('/').join('.');

    return (
        <div className='vote-card'>
            <div className='vote-card-inner'>
                <h3 className='vote-card-title'>{props.title}</h3>
                <p className='vote-card-date'>{cardDate}</p>
                <p className='vote-card-description'>{props.desc}</p>
            </div>
        </div>
    );
}

export default VotingCard;