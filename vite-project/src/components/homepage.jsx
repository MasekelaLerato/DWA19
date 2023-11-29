// import React from "react"
// import Loading from "./loading"
// import ShowDescription from "./showDescription"
// import Carousel from "./carousel"
// import ShowSeasonsModal from "./showSeasonsModal"
// //import Sort from "./sort"
// //import Search from "./search"
// //import Navbar from "./navbar"



// /**
//  * Component representing a list of podcasts.
//  * @returns {JSX.Element} JSX element representing the PodcastList component.
//  */
// export default function PodcastList() {

//     const [shows, setShows] = React.useState([]) // Stores list of shows
//     const [isLoading, setIsLoading] = React.useState(true) // Indicates whether data is loading
//     const [showPreview, setShowPreview] = React.useState(false) // Tracks the currently shown podcast preview
//     const [seasonButton, setSeasonButton] = React.useState(null) // Holds the selected season ID for the dialog
//     const [openDialog, setOpenDialog] = React.useState(false) // Tracks whether the dialog is open or not


//     // Fetches the list of shows when the component mounts using useEffect
//     React.useEffect(() => {
//         fetchShows()
//     }, [])

//     const fetchShows = async () => {
//         const response = await fetch("https://podcast-api.netlify.app/shows")
//         const data = await response.json()
//         setShows(data)
//         setIsLoading((prevIsLoading => !prevIsLoading)) // Sets isLoading to false once data is fetched
//     }


//     // Function to toggle the display of the podcast preview
//     function togglePreview(show) {
//         setShowPreview(show)
//     }

//     // Function to close the podcast preview
//     function handleClose() {
//         setShowPreview(null)
//     }

//     // Function to set the selected season ID and open the dialog
//     function toggleSeasonId(item) {
//         setSeasonButton(item)
//         setOpenDialog(true)
//     }

//     function onCloseDialog() {
//         // console.log("closing dialog") // must fix
//         setOpenDialog(false)
//     }

//     // Function to handle sorting of the shows 
//     function handleSortChange(selectedSortOrder) {
//         const sortedShows = [...shows];
//         sortedShows.sort((a, b) => {
//             if (selectedSortOrder === "asc") {
//                 return a.title.localeCompare(b.title);
//             }
//             else if (selectedSortOrder === "desc") {
//                 return b.title.localeCompare(a.title);
//             }
//             else if (selectedSortOrder === "Date (Ascending)") {
//                 return new Date(b.updated) - new Date(a.updated)
//             }
//             else if (selectedSortOrder === "Date (Descending)") {
//                 return new Date(a.updated) - new Date(b.updated)
//             }

//         });
//         setShows(sortedShows);
//     }

//     /**
//    * Callback function to handle search results and update the shows state.
//    * @param {Array} results - An array of podcast shows as search results.
//    */
//     // const handleSearchResults = (results) => {
//     //     setShows(results);
//     //   };

//     return (
//         <div>
            
//             {/* <Navbar /> */}

//             <div>
//                 <Carousel />
//             </div>

//             <h4 className="podcast-title">Podcast Chronicles</h4>

//             <div className="sort">
//                 {/* <Sort onSortChange={handleSortChange} /> */}
//             </div>

//             <div className="">
//                 {/* <Search onSearch={handleSearchResults}/> */}
//             </div>
 

//             <div className="podcasts">

//                 {!isLoading ? <Loading /> : (shows.map(show => (
//                     <div key={show.id} className="show--item">
//                         <img src={show.image} className="podcast--image"onClick={() => togglePreview(show)} />
//                         <h6>{show.title}</h6>
//                     </div>))
//                 )}

//                 {/* Render the podcast preview if showPreview is not null */}
//                 {showPreview &&
//                     (<ShowDescription
//                         image={showPreview.image}
//                         description={showPreview.description}
//                         text={showPreview.description}
//                         limit={200}
//                         seasons={showPreview.seasons}
//                         onClose={handleClose}
//                         showSeasons={() => toggleSeasonId(showPreview.id)}
//                     />)}


//                 {openDialog && (
//                     <ShowSeasonsModal
//                         seasonId={seasonButton}
//                         openDialog={openDialog}
//                         onClose={onCloseDialog}
//                     />
//                 )}

//             </div>
//         </div>

//     )
// }