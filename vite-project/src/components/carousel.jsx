import React from "react";
 import ShowDescription from "./description";
import ShowSeasons from "./showSeasons";

export default function Carousel() {
    const [carousel, setCarousel] = React.useState([])
    const [selectedShow, setSelectedShow] = React.useState(false)
    const [seasonButton, setSeasonButton] = React.useState(null)
    const [openDialog, setOpenDialog] = React.useState(false)

    const maxImages = 15;
    const displayedCarousel = carousel.slice(0, maxImages)


    React.useEffect(() => {
        fetchShows()
    }, [])


    const fetchShows = async () => {
        const response = await fetch("https://podcast-api.netlify.app/shows")
        const data = await response.json()
        setCarousel(data)
    }

    function togglePreview(show) {
        setSelectedShow(show)
    }

    function handleClose() {
        setSelectedShow(null)
    }

    function toggleSeasonId(item) {
        setSeasonButton(item)
        setOpenDialog(true)
    }

    function onCloseDialog() {
        setOpenDialog(false)
    }

    return (
        <div className="carousel-box">
            <h4></h4> {/* to be decided*/}

            {displayedCarousel.map(show => (
                <div key={show.id} className="carousel">
                    <img
                        src={show.image}
                        className="carousel-images"
                        alt={show.title}
                        onClick={() => togglePreview(show)}
                    />

                </div>))
            }

            {selectedShow && (
                <ShowDescription
                    image={selectedShow.image}
                    description={selectedShow.description}
                    text={selectedShow.description}
                    limit={200}
                    seasons={selectedShow.seasons}
                    onClose={handleClose}
                    showSeasons={() => toggleSeasonId(selectedShow.id)} />

            )}

            {openDialog && (
                <ShowSeasons
                    seasonId={seasonButton}
                    openDialog={openDialog}
                    onClose={onCloseDialog}
                />
            )}

        </div>
    )
}