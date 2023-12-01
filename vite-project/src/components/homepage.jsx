import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Favorites from "./favorites";
import Description from "./Description";
import Carousel from "./Carousel";
import Seasons from "./Seasons";
import Sort from "./Sort";
import Search from "./Search";

/**
 * Main component for the homepage of the Podcast Chronicles app.
 * @returns {JSX.Element} The rendered Homepage component.
 */
export default function Homepage() {
  // State variables
  const [shows, setShows] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [showFavorites, setShowFavorites] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [seasonButton, setSeasonButton] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  // Fetch shows from the API on component mount
  React.useEffect(() => {
    fetchShows();
  }, []);

  // Fetch shows from the API
  const fetchShows = async () => {
    const response = await fetch("https://podcast-api.netlify.app/shows");
    const data = await response.json();
    setShows(data);
  };

  // Show preview of a selected podcast
  function togglePreview(show) {
    setShowPreview(show);
  }

  // Close the preview dialog
  function handleClose() {
    setShowPreview(null);
  }

  // Show seasons dialog for a selected podcast
  function toggleSeasonId(item) {
    setSeasonButton(item);
    setOpenDialog(true);
  }

  // Close the seasons dialog
  function onCloseDialog() {
    setOpenDialog(false);
  }

  // Handle sorting change for the list of podcasts
  function handleSortChange(selectedSortOrder) {
    const sortedShows = [...shows];
    sortedShows.sort((a, b) => {
      if (selectedSortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else if (selectedSortOrder === "desc") {
        return b.title.localeCompare(a.title);
      } else if (selectedSortOrder === "Date (Ascending)") {
        return new Date(b.updated) - new Date(a.updated);
      } else if (selectedSortOrder === "Date (Descending)") {
        return new Date(a.updated) - new Date(b.updated);
      }
    });
    setShows(sortedShows);
  }
  

  // Handle search results to filter the list of podcasts
  const handleSearchResults = (results) => {
    setShows(results);
  };

  // Rendered component
  return (
    <div className="header">
      <h1>Podcast Chronicles</h1>

      {/* Toggle favorites view */}
      <button className='button' onClick={() => setShowFavorites(!showFavorites)}>
        <i className="fas fa-heart" style={{color: '#cb4949',fontSize:'24px'}} ></i>
      </button>

      {/* Display favorites if the toggle is active */}
      {showFavorites && <Favorites favorites={favorites} setFavorites={setFavorites} />}

      {/* Search bar */}
      <div>
        <Search onSearch={handleSearchResults}/>
      </div>

      {/* Sort options */}
      <div className="sort">
        <Sort onSortChange={handleSortChange} />
      </div>

      {/* Carousel of podcast images */}
      <div>
        <Carousel />
      </div>

      {/* List of podcasts */}
      <div className="podcasts">
        {shows.map((show) => (
          <div key={show.id} className="show--item">
            <h4 className="podcast--title">{show.title} </h4>
            <img src={show.image} onClick={() => togglePreview(show)} />
          </div>
        ))}

        {/* Display podcast details in the preview dialog */}
        {showPreview &&
          (<Description
              image={showPreview.image}
              description={showPreview.description}
              text={showPreview.description}
              limit={200}
              seasons={showPreview.seasons}
              onClose={handleClose}
              showSeasons={() => toggleSeasonId(showPreview.id)}
          />)
        }

        {/* Display seasons in a dialog */}
        {openDialog && (
          <Seasons
            seasonId={seasonButton}
            openDialog={openDialog}
            onClose={onCloseDialog}
          />
        )}
      </div>
    </div>
  );
}
