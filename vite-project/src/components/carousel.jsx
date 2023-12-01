import React from "react";
import Description from "./Description";
import Seasons from "./Seasons";

/**
 * Functional component for displaying a carousel of shows.
 * @returns {JSX.Element} The rendered component.
 */
export default function Carousel() {
  // State variables
  const [carousel, setCarousel] = React.useState([]);
  const [selectedShow, setSelectedShow] = React.useState(null);
  const [seasonButton, setSeasonButton] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} The shuffled array.
   */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Shuffled and displayed carousel
  const shuffledCarousel = shuffleArray(carousel);
  const maxImages = 15;
  const displayedCarousel = shuffledCarousel.slice(0, maxImages);

  /**
   * Fetches the list of shows from the API and updates the state.
   */
  React.useEffect(() => {
    fetchShows();
  }, []);

  /**
   * Fetches shows from the API and updates the carousel state.
   */
  const fetchShows = async () => {
    try {
      const response = await fetch("https://podcast-api.netlify.app/shows");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCarousel(data);
    } catch (error) {
      console.error("Error fetching shows:", error.message);
    }
  };

  /**
   * Sets the selected show for preview.
   * @param {object} show - The selected show object.
   */
  function togglePreview(show) {
    setSelectedShow(show);
  }

  /**
   * Closes the selected show preview.
   */
  function handleClose() {
    setSelectedShow(null);
  }

  /**
   * Toggles the display of seasons for a show.
   * @param {number} item - The ID of the show for which to display seasons.
   */
  function toggleSeasonId(item) {
    setSeasonButton(item);
    setOpenDialog(true);
  }

  /**
   * Closes the seasons dialog.
   */
  function onCloseDialog() {
    setOpenDialog(false);
  }

  // Rendered component
  return (
    <div className="carousel-box">
      {/* Render the images in the carousel */}
      {displayedCarousel.map((show) => (
        <div key={show.id} className="carousel">
          <img
            src={show.image}
            className="carousel-images"
            alt={show.title}
            onClick={() => togglePreview(show)}
          />
        </div>
      ))}

      {/* Render selected show description */}
      {selectedShow && (
        <Description
          image={selectedShow.image}
          description={selectedShow.description}
          text={selectedShow.description}
          limit={200}
          seasons={selectedShow.seasons}
          onClose={handleClose}
          showSeasons={() => toggleSeasonId(selectedShow.id)}
        />
      )}

      {/* Render modal for show seasons */}
      {openDialog && (
        <Seasons
          seasonId={seasonButton}
          openDialog={openDialog}
          onClose={onCloseDialog}
        />
      )}
    </div>
  );
}
