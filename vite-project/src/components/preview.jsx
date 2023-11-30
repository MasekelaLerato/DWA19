import  { useState } from "react";
import ShowSeasons from "./seasons";

export default function Preview(showId) {
  const [open, setOpen] = useState(false);
  const [showSeasons, setShowSeasons] = useState(false);

  const readMore =
    showId.text.length > showId.limit
      ? `${showId.text.slice(0, showId.limit)}...`
      : showId.text;

  function toggleReadMore() {
    setOpen((prevOpen) => !prevOpen);
  }

  function toggleSeasons() {
    setShowSeasons((prevShowSeasons) => !prevShowSeasons);
  }

  return (
    <div className="preview">
      <div className="preview--content">
        <img className="preview--image" src={showId.image} alt={showId.title} />

        <p className="preview--season">Seasons: {showId.seasons}</p>

        {showSeasons && (
          <ShowSeasons showSeasons={showId.seasons} onClose={toggleSeasons} />
        )}

        <p className="preview--description">{open ? showId.text : readMore}</p>

        <div className="preview--btns">
          {!showId.isOpen && (
            <button className="read-more--btn" onClick={toggleReadMore}>
              Read More
            </button>
          )}

          <button onClick={showId.onClose} className="close--btn">
            Close
          </button>

          <button onClick={toggleSeasons} className="seasons--btn">
            Seasons
          </button>
        </div>
      </div>
    </div>
  );
}
