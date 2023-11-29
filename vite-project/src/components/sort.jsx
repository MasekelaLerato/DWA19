import React from "react"
import PropTypes from "prop-types"


export default function Sort({ onSortChange }) {
    const [sortOrder, setSortOrder] = React.useState("asc")

    const handleSortChange = (event) => {
        const selectedSortOrder = event.target.value
        setSortOrder(selectedSortOrder)
        onSortChange(selectedSortOrder)
    }

    return (
        <div>
            {<label className="sortopt" htmlFor="sortOrder">Sort by:</label>}
            <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="searchbtn">
                <option value="asc">A to Z</option>
                <option value="desc">Z to A</option>
                <option value="Date (Ascending)">Date (Ascending)</option>
                <option value="Date (Descending)">Date (Descending)</option>
            </select>
        </div>
    )
}

Sort.propTypes = {
    onSortChange: PropTypes.func.isRequired,
}