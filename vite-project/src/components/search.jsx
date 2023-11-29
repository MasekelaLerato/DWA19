// import React from "react"
// import Fuse from "fuse.js"
// import PropTypes from "prop-types"

// /**
//  * Component representing a search bar for podcasts.
//  * @param {Object} props - The component props.
//  * @param {function} props.onSearch - Callback function to handle search results.
//  * @returns {JSX.Element} JSX element representing the Search component.
//  */
// export default function Search({ onSearch }) {
//     const [searchQuery, setSearchQuery] = React.useState("") // Store users search input
//     const [searchResults, setSearchResults] = React.useState([]); // Store results of search
//     const [podcasts, setPodcasts] = React.useState([]); // Store podcast data
//     const [fuse, setFuse] = React.useState(null); // Store initialized Fuse instance

//     React.useEffect(() => {
//         fetchPodcasts()
//     }, [])


//     /**
//      * Fetches the list of podcasts from the API.
//      */
//     const fetchPodcasts = async () => {
//         try {
//             const res = await fetch("https://podcast-api.netlify.app/shows");
//             const data = await res.json();
//             setPodcasts(data);
//         } catch (error) {
//             console.error("Error fetching podcasts:", error);
//         }
//     };

//     React.useEffect(() => {
//         if (podcasts.length > 0) {
//             // Initialize the Fuse instance with the podcast data
//             setFuse(new Fuse(podcasts, { keys: ["title"], includeScore: true, threshold: 0.4 }));

//         }
//     }, [podcasts])


//     /**
//      * Handles the change of the search input.
//      * @param {Object} event - The input change event.
//      */
//     const handleInputChange = (event) => {  // Updates searchQuery state with users input
//         setSearchQuery(event.target.value);
//     };


//     /**
//      * Handles the search click event.
//      * Checks if the search query is empty and either sets the searchResults state to an empty array
//      * or performs a search using the Fuse instance and updates the searchResults state.
//      */
//     const handleSearchClick = () => {
//         // Checks if search query is empty, if it is, sets the searchResults state to empty array
//         if (searchQuery.trim() === "") {  
//             setSearchResults([]);
//             onSearch(podcasts)
//         } else { 
//             // otherwise use the fuse instance to do the search and updates searchResult state 
//             const results = fuse.search(searchQuery).map((result) => result.item);  //with the search results
//             setSearchResults(results);
//             onSearch(results)
//         }
//     };

//     return (
//         <div className="search-container">
//             <input className="searchbtn"
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleInputChange}
//                 placeholder="Search for podcasts"
//             />
//             <button onClick={handleSearchClick} className="search-button">Search</button>


//         </div>
//     )
// }

// Search.propTypes = {
//     onSearch: PropTypes.func,
// }