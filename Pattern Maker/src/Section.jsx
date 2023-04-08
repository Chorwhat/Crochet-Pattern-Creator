import React from "react";

function Section(props) {
  const {
    section,
    sectionIndex,
    handleSectionTitleChange,
    handleAddRowClick,
    handleRemoveSectionClick,
    handleRemoveRowClick,
    handleEditRowClick,
    handleRowInputChange,
    handleSaveRowClick,
    editingRow,
  } = props;

  return (
    <div>
      <label>
        Section Title:
        <input
          type="text"
          value={section.title}
          onChange={(e) => handleSectionTitleChange(e, sectionIndex)}
        />
      </label>
      <form onSubmit={(e) => e.preventDefault()}>
        {section.rows.map((row, rowIndex) => (
          <div key={rowIndex}>
            <label>
              Row {rowIndex + 1}: 
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
        ))}
      </form>
      <button onClick={() => handleAddRowClick(sectionIndex)}>Add Row</button>
      <button onClick={() => handleRemoveSectionClick(sectionIndex)}>Remove Section</button>
    </div>
  );
}

export default Section;
