import React from "react"


/**
 * Component representing the preview of a podcast show description.
 */
export default function ShowDescription (showId) {

    const [isExpanded, setIsExpaned] = React.useState(false)
    
    // Shortens the description to the specified limit
    const readMore = showId.text.length > showId.limit ? `${showId.text.slice(0, showId.limit)}...` : showId.text

    /**
     * Toggles the display of the full description.
     */
    function toggleReadMore() {
        setIsExpaned((prevIsExpanded) => !prevIsExpanded)
    }

    return (
        <div className="show--preview">
            
            <div className="show--content">

                <img className="preview--image" src={showId.image} alt={showId.title} />
                
                <p className="preview--season">Seasons: {showId.seasons}</p>

                <p className="preview--description">{isExpanded ? showId.text : readMore}</p>

                <div className="bottom--buttons">
                    {!showId.isExpanded && (
                        <button className="preview--read-=more" onClick={toggleReadMore}>
                            Read More
                        </button>
                    )}

                    <button onClick={showId.onClose} className="preview--close" >
                        Close
                    </button>

                    <button  onClick={showId.showSeasons} className="preview--seasons">Seasons</button>
                </div>
            </div>
        </div>
    )
}