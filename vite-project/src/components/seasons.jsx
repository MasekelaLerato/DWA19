import React from "react";
import PropTypes from "prop-types";

export default function Preview({ showId, showSeasons }) {
  const [seasons, setSeasons] = React.useState(null);
  const [selectedSeason, setSelectedSeason] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    async function getShows() {
      if (!showId) return;

      try {
        const res = await fetch(`https://podcast-api.netlify.app/shows/${showId}/seasons`);
        if (!res.ok) {
          setError("Failed to fetch show details.");
          return;
        }
        const data = await res.json();
        setSeasons(data);
      } catch (err) {
        setError("An error occurred while fetching the show details.");
      }
    }

    getShows();
  }, [showId]);

  if (error || !seasons) {
    return <div>{error && "Failed to load show details."}</div>;
  }

  // Function to handle season selection from the dropdown
  const handleSeasonChange = (event) => {
    const selectedSeasonId = event.target.value;
    setSelectedSeason(selectedSeasonId);
  };

  const selectedSeasonData =
    selectedSeason &&
    seasons.find((season) => season.season === Number(selectedSeason))?.episodes;

  return (
    <div className="preview">
      <div className="season-details">
        {/* ... (existing code) */}

        <select className="season-select" value={selectedSeason} onChange={handleSeasonChange}>
          <option value="">Select a Season</option>
          {seasons.map((item) => (
            <option key={item.season} value={item.season}>
              Season: {item.season}
            </option>
          ))}
        </select>

        <button onClick={showId.onClose} className="season-close">
          Close
        </button>

        <button onClick={() => showSeasons()} className="seasons-btn">
          Seasons
        </button>

        {selectedSeasonData && selectedSeasonData.length > 0 && (
          <div className="episode-container">
            {/* ... (existing code for rendering episodes) */}
          </div>
        )}
      </div>
    </div>
  );
}

Preview.propTypes = {
  showId: PropTypes.shape({
    // ... (existing propTypes)
  }),
  showSeasons: PropTypes.func, // Add this line
};
