import React from "react";
import PropTypes from "prop-types";

/**
 * Sort component for selecting and updating the sorting order.
 * @param {Object} props - The component props.
 * @param {Function} props.onSortChange - Callback function for handling sort changes.
 * @returns {JSX.Element} The rendered Sort component.
 */
export default function Sort({ onSortChange }) {
  // State for managing the selected sort order
  const [sortOrder, setSortOrder] = React.useState("asc");

  /**
   * Handles the change in the selected sort order.
   * Updates the state and invokes the callback to inform the parent component.
   * @param {Object} event - The change event from the select input.
   */
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    onSortChange(selectedSortOrder);
  };

  // Rendered component
  return (
    <div>
      {/* Label for the sort select input */}
      {<label className="sort" htmlFor="sortOrder">Sort by:</label>}
      
      {/* Select input for choosing the sort order */}
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange} className="searchbtn">
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
        <option value="Date (Ascending)">latest</option>
        <option value="Date (Descending)">earliest</option>
      </select>
    </div>
  );
}

// PropTypes for type-checking the component's props
Sort.propTypes = {
  onSortChange: PropTypes.func.isRequired,
};
