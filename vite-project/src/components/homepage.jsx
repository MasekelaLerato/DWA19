import  { useEffect, useState } from 'react';
import Sort from "./sort"
import Search from "./search"

/**
 * Homepage component displaying a list of podcast shows
 * @returns {JSX.Element} - The rendered Hompage component
 */
export default function Homepage() {
  const [shows, setShows] = useState([]); //State hook to manage the list of podcast shows.
  const [isLoading, setIsLoading] = useState(true);// State hook to track the loading status of the component
  const [showPreview, setShowPreview] = useState(null); // State hook to manage the currently previewed show.

  useEffect(() => {
    getData();
  }, []);

  
  /**
   * Fetches podcast show data from the API 
   * @async
   * @function
   * @returns {promise<void>} - A promise that resolves once the data is fetched and processed
   */
  const getData = async () => {
    try {
      const response = await fetch('https://podcast-api.netlify.app/shows');
      const data = await response.json();
      setShows(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching shows:', error);
      setIsLoading(false);
    }
  };

  /**
   * Toggle the display if the podcast preview
   * @param {object} show- The podcast show object
   * @returns {void}
   */
  const togglePreview = (show) => {
    setShowPreview(show);
  };

/**
 * Sorts the podcast shows based on the selected sort order.
 *
 * @param {string} selectedSortOrder - The selected sort order ("asc", "desc", "Date (Ascending)", or "Date (Descending)").
 * @returns {void}
 */
function handleSortChange(selectedSortOrder) {
        const sortedShows = [...shows];
        sortedShows.sort((a, b) => {
            if (selectedSortOrder === "asc") {
                return a.title.localeCompare(b.title);
            }
            else if (selectedSortOrder === "desc") {
                return b.title.localeCompare(a.title);
            }
            else if (selectedSortOrder === "Date (Ascending)") {
                return new Date(b.updated) - new Date(a.updated)
            }
            else if (selectedSortOrder === "Date (Descending)") {
                return new Date(a.updated) - new Date(b.updated)
            }

        });
        setShows(sortedShows);
    }
/**
 * Callback function to handle search results and update the list of podcast shows.
 *
 * @param {Array} results - An array of podcast shows as search results.
 * @returns {void}
 */
const handleSearchResults = (results) => {
        setShows(results);
      };

  return (
<div>
    <h1 className="main--heading">Podcast Chronicles</h1>

    <div className="sort">
                <Sort onSortChange={handleSortChange} />
            </div>

            
            <div className="">
                <Search onSearch={handleSearchResults}/>
            </div>
    
    <div className="podcasts">
      {shows.map((show) => (
        <div key={show.id} className="show--item">
         <h4 className="podcast--title">{show.title} </h4>
         <img src={show.image}  onClick={() => togglePreview(show)} />
      </div>
      ))}

      {showPreview && (
        <div className="show--preview">
                   <h3 className="preview--title">{showPreview.title}</h3>
          <img src={showPreview.image} className="preview--image"/>

          <h3>seasons:{showPreview.seasons} </h3>
           <p className="preview--description">{showPreview.description}</p>
          <button  className= 'preview--button' onClick={() => setShowPreview(null)}>Close Preview</button>
        </div>
      )}
    </div>
    </div>
  );
}
