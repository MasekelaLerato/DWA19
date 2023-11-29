import React from "react"
import Fuse from "fuse.js"
import PropTypes from "prop-types"

/**
 * Component representing a search bar for podcasts.
 * @param {Object} props - The component props.
 * @param {function} props.onSearch - Callback function to handle search results.
 * @returns {JSX.Element} JSX element representing the Search component.
 */
export default function Search({ onSearch }) {
    const [searchQuery, setSearchQuery] = React.useState("") // Store users search input
    const [searchResults, setSearchResults] = React.useState([]); // Store results of search
    const [podcasts, setPodcasts] = React.useState([]); // Store podcast data
    const [fuse, setFuse] = React.useState(null); // Store initialized Fuse instance

    React.useEffect(() => {
        fetchPodcasts()
    }, [])


    /**
     * Fetches the list of podcasts from the API.
     */
    const fetchPodcasts = async () => {
        try {
            const res = await fetch("https://podcast-api.netlify.app/shows");
            const data = await res.json();
            setPodcasts(data);
        } catch (error) {
            console.error("Error fetching podcasts:", error);
        }
    };

    React.useEffect(() => {
        if (podcasts.length > 0) {
            // Initialize the Fuse instance with the podcast data
            setFuse(new Fuse(podcasts, { keys: ["title"], includeScore: true, threshold: 0.4 }));

        }
    }, [podcasts])


    /**
     * Handles the change of the search input.
     * @param {Object} event - The input change event.
     */
    const handleInputChange = (event) => {  // Updates searchQuery state with users input
        setSearchQuery(event.target.value);
    };


    /**
     * Handles the search click event.
     * Checks if the search query is empty and either sets the searchResults state to an empty array
     * or performs a search using the Fuse instance and updates the searchResults state.
     */
    const handleSearchClick = () => {
        // Checks if search query is empty, if it is, sets the searchResults state to empty array
        if (searchQuery.trim() === "") {  
            setSearchResults([]);
            onSearch(podcasts)
            console.log('Search query:', searchQuery);
        } else { 
            // otherwise use the fuse instance to do the search and updates searchResult state 
            const results = fuse.search(searchQuery).map((result) => result.item);  //with the search results
            setSearchResults(results);
            onSearch(results)
        }
    };
    

    return (
        <div className="group">
            <svg className="icon" 
            aria-hidden="true"
            viewBox="0 0 24 24">

            <g>
            <path  onClick={handleSearchClick} d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
            </svg>
            
            <input className="input"
                type="search"
                id="input"
                value={searchQuery}
                onChange={handleInputChange}
                placeholder="Search"
            />
            <button onClick={handleSearchClick} className="search-button">Search</button>


        </div>
    )
}

