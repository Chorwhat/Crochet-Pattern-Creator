import React from "react";

function Row(props) {
  const { row, sectionIndex, rowIndex, handleRowInputChange, handleEditRowClick, handleSaveRowClick, editingRow } = props;

  return (
    <div>
      <label>
        Stitches:
        <input
          type="text"
          value={row.stitches}
          onChange={(e) => handleRowInputChange(e, sectionIndex, rowIndex)}
          readOnly={editingRow?.section !== sectionIndex || editingRow?.row !== rowIndex}
        />
      </label>
      {editingRow?.section === sectionIndex && editingRow?.row === rowIndex ? (
        <button onClick={handleSaveRowClick}>Save</button>
      ) : (
        <button onClick={() => handleEditRowClick(sectionIndex, rowIndex)}>Edit</button>
      )}
      <button onClick={() => handleRemoveRowClick(sectionIndex, rowIndex)}>Remove</button>
    </div>
  );
}

export default Row;
