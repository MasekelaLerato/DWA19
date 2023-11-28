import  { useState, useEffect } from 'react';

const ApiCall = () => {
  // State to store API data, loading state, and any potential errors
  const [apiData, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL of the API
  const Url = 'https://podcast-api.netlify.app/shows';

 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the API call
        setIsLoading(true);

        // Fetch data from the API
        const response = await fetch(Url);

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
          throw new Error(`Failed to fetch data, status code: ${response.status}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Set the API data to the state
        setApiData(data);

        // Set loading to false after successfully fetching data
        setIsLoading(false);
      } catch (error) {
        // Set the error state if there's an issue with the API call
        setError(error.message);

        // Set loading to false in case of an error
        setIsLoading(false);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once after the component mounts

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : apiData ? (
        <div>
          {/* Render your API data here */}
 
        </div>
      ) : null}
    </div>
  );
};

export default ApiCall;
