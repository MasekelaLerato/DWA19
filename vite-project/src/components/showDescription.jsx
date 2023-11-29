// import React from "react"


// /**
//  * Component representing the preview of a podcast show description.
//  * @param {Object} showId - The data of the podcast show.
//  * @param {string} showId.image - The URL of the show's image.
//  * @param {string} showId.title - The title of the show.
//  * @param {string} showId.text - The full description of the show.
//  * @param {number} showId.limit - The character limit for the preview description.
//  * @param {number} showId.seasons - The number of seasons of the show.
//  * @param {function} showId.onClose - Callback function to close the preview.
//  * @param {function} showId.showSeasons - Callback function to show the seasons.
//  * @returns {JSX.Element} JSX element representing the ShowDescription component.
//  */
// export default function ShowDescription (showId) {

//     const [isExpanded, setIsExpaned] = React.useState(false)
    
//     // Shortens the description to the specified limit
//     const readMore = showId.text.length > showId.limit ? `${showId.text.slice(0, showId.limit)}...` : showId.text

//     /**
//      * Toggles the display of the full description.
//      */
//     function toggleReadMore() {
//         setIsExpaned((prevIsExpanded) => !prevIsExpanded)
//     }

//     return (
//         <div className="show-preview">
            
//             <div className="show-content">

//                 <img className="preview-image" src={showId.image} alt={showId.title} />
                
//                 <p className="preview-season">Seasons: {showId.seasons}</p>

//                 <p className="preview-description">{isExpanded ? showId.text : readMore}</p>

//                 <div className="bottom-buttons">
//                     {!showId.isExpanded && (
//                         <button className="preview-read-more" onClick={toggleReadMore}>
//                             Read More
//                         </button>
//                     )}

//                     <button onClick={showId.onClose} className="preview-close" >
//                         Close
//                     </button>

//                     <button  onClick={showId.showSeasons} className="preview-seasons">Seasons</button>
//                 </div>
//             </div>
//         </div>
//     )
// }