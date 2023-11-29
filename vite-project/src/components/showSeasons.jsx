import React from "react"
import PropTypes from "prop-types"


/**
 * Component representing a modal with details of a podcast show's seasons and episodes.
 * 
 */
export default function ShowSeasons({ seasonId, openDialog, onClose }) {
    const [showSeasons, setShowSeasons] = React.useState(null) // Holds the data of the selected show's seasons and episodes
    const [selectedSeason, setSelectedSeason] = React.useState("") // Tracks the selected season 
    const [error, setError] = React.useState("")
    

    React.useEffect(() => {
        async function getShows() {
            if (!seasonId) return;

            try {
                const res = await fetch(`https://podcast-api.netlify.app/id/${seasonId}`);
                if (!res.ok) {
                    setError('Failed to fetch show details.');
                    return;
                }
                const data = await res.json();
                setShowSeasons(data);
            } catch (err) {
                setError('An error occurred while fetching the show details.');
            }
        }
        getShows();
    }, [seasonId, openDialog]);


    if (error || !showSeasons) {
        return <div>{error && 'Failed to load show details.'}</div>;
    }

    // Function to handle season selection from the dropdown
    const handleSeasonChange = (event) => {
        const selectedSeasonId = event.target.value;
        setSelectedSeason(selectedSeasonId);
    };

    const selectedSeasonData = // Holds the episodes 
        selectedSeason &&
        showSeasons.seasons.find((season) => season.season === Number(selectedSeason))?.episodes

    const dateFormat = new Date(showSeasons.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (

        <div className="season-details">

            <div className="season-image-container">
                <img
                    src={showSeasons.image}
                    alt={showSeasons.title}
                    className="season-image"
                />
            </div>

            <h2 className="season-title">{showSeasons.title}</h2>

            <p className="season-date">Updated: {dateFormat}</p>
            <p className="season-genre">Genre: {showSeasons.genres}</p>
            

            <select className="season-select" value={selectedSeason} onChange={handleSeasonChange}>
                <option value="">Select a Season</option>
                {showSeasons.seasons.map((item) => (
                    <option key={item.season} value={item.season}>
                        Season: {item.season}
                    </option>
                ))}
            </select>

            <button onClick={onClose} className="season-close">
                Close
            </button>
                    
            {selectedSeasonData && selectedSeasonData.length > 0 && (
                <div className="episode-container">
                    
                    <h2 className="episode-title">Episodes: {selectedSeasonData.length} </h2>

                    {selectedSeasonData.map((episode) => (
                        <div key={episode.episode} className="episodes">
                            <img src={showSeasons.image} alt={episode.title} className="episode-image" />
                            <div>
                                <h4>{episode.title}</h4>
                                <h5>Episode: {episode.episode}</h5>
                                <p>{episode.description}</p>
                                <audio controls className="audio">
                                    <source src={episode.file} type="audio/mp3" />
                                </audio>
                            </div>

                        </div>

                    ))}

                </div>
            )}
        </div>
    );
}

ShowSeasons.propTypes = {
    seasonId: PropTypes.string,
    openDialog: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}