import React, { useEffect, useState } from 'react';
import Sort from './sort';
import Search from './search';
import ShowSeasons from './seasons';
import ShowDescription from './preview'; // Make sure to import ShowDescription
import Carousel from './carousel';

export default function Homepage() {
  const [shows, setShows] = useState([]);
  const [showPreview, setShowPreview] = useState(null);
  const [seasonButton, setSeasonButton] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      setShows(data);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
  };

  const togglePreview = (show) => {
    setShowPreview(show);
  };

  const handleSearchResults = (results) => {
    setShows(results);
  };

  const handleSortChange = (selectedSortOrder) => {
    const sortedShows = [...shows];
    sortedShows.sort((a, b) => {
      if (selectedSortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else if (selectedSortOrder === 'desc') {
        return b.title.localeCompare(a.title);
      } else if (selectedSortOrder === 'Date (Ascending)') {
        return new Date(b.updated) - new Date(a.updated);
      } else if (selectedSortOrder === 'Date (Descending)') {
        return new Date(a.updated) - new Date(b.updated);
      }
    });
    setShows(sortedShows);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setShowPreview(null);
  };

  const toggleSeasonId = (item) => {
    setSeasonButton(item)
    setOpenDialog(true)
  };

  return (
    <div>
<Carousel/>

      <h1 className="main--heading">Podcast Chronicles</h1>

      <div>
        <Sort onSortChange={handleSortChange} />
      </div>

      <div>
        <Search onSearch={handleSearchResults} />
      </div>

      <div className="podcasts">
        {shows.map((show) => (
          <div key={show.id} className="show--item">
            <h4 className="podcast--title">{show.title} </h4>
            <img src={show.image} onClick={() => togglePreview(show)} />
          </div>
        ))}

        {showPreview && (
          <ShowDescription
            image={showPreview.image}
            description={showPreview.description}
            text={showPreview.description}
            limit={200}
            seasons={showPreview.seasons}
            onClose={handleClose}
            showSeasons={() => toggleSeasonId(showPreview.id)}
          />
        )}
       

{openDialog && (
          <ShowSeasons
        seasonId={seasonButton}
        openDialog={openDialog}
        onClose={onCloseDialog}
          />
        )}
      </div>
    </div>
  );
}