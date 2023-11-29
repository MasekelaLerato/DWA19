import  { useEffect, useState } from 'react';


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

  return (
    <div className="podcasts">
      {shows.map((show) => (
        <div key={show.id} className="show--item">
          <img src={show.image}  onClick={() => togglePreview(show)} />
          <h4 className="podcast--title">{show.title} </h4>
        </div>
      ))}

      {showPreview && (
        <div className="show--preview">
          <img src={showPreview.image} className="preview--image"/>
          <h3 className="preview--title">{showPreview.title}</h3>
          <h3>seasons:{showPreview.seasons} </h3>
           <p className="preview--description">{showPreview.description}</p>
          <button  className= 'preview--button' onClick={() => setShowPreview(null)}>Close Preview</button>
        </div>
      )}
    </div>
  );
}
