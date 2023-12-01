import React from "react";

/**
 * Component to display a preview of a podcast, including an option to expand the description.
 * @param {Object} showId - The data object containing information about the podcast.
 * @param {string} showId.image - The URL of the podcast image.
 * @param {string} showId.title - The title of the podcast.
 * @param {string} showId.seasons - The number of seasons of the podcast.
 * @param {string} showId.text - The full description of the podcast.
 * @param {number} showId.limit - The character limit for the shortened description.
 * @param {boolean} showId.isExpanded - Flag indicating whether the description is expanded.
 * @param {Function} showId.onClose - Callback function to close the description.
 * @param {Function} showId.showSeasons - Callback function to display the seasons of the podcast.
 * @returns {JSX.Element} The rendered Description component.
 */
export default function Description(showId) {
  // State variable to track whether the description is expanded
  const [isOpen, setIsOpen] = React.useState(false);

  // Shortens the description to the specified limit
  const readMore = showId.text.length > showId.limit ? `${showId.text.slice(0, showId.limit)}...` : showId.text;

  /**
   * Toggles the display of the full description.
   */
  function toggleReadMore() {
    setIsOpen((prevIsExpanded) => !prevIsExpanded);
  }

  // Rendered component
  return (
    <div className="preview">
      <div>
        {/* Podcast image */}
        <img className="preview-image" src={showId.image} alt={showId.title} />

        {/* Number of seasons */}
        <p className="preview-season">Seasons: {showId.seasons}</p>

        {/* Podcast description, truncated or expanded based on isOpen state */}
        <p className="preview-description">{isOpen ? showId.text : readMore}</p>

        {/* Buttons for Read More, Close, and Seasons */}
        <div className="bottom-buttons">
          {!showId.isExpanded && (
            <button className="read-more--btn" onClick={toggleReadMore}>
              Read More
            </button>
          )}

          <button onClick={showId.onClose} className="close--btn">
            Close
          </button>

          <button onClick={showId.showSeasons} className="seasons--btn">
            Seasons
          </button>
        </div>
      </div>
    </div>
  );
}