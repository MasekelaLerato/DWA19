import  { useEffect, useState } from 'react';

export default function Homepage() {
  const [shows, setShows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(null);

  useEffect(() => {
    getData();
  }, []);

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

  // Function to toggle the display of the podcast preview
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
