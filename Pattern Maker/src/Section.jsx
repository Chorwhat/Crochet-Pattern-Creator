import React from "react";
import Row from "./Row";

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
          <Row
            key={rowIndex}
            row={row}
            sectionIndex={sectionIndex}
            rowIndex={rowIndex}
            editingRow={editingRow}
            handleRowInputChange={handleRowInputChange}
            handleSaveRowClick={handleSaveRowClick}
            handleEditRowClick={handleEditRowClick}
            handleRemoveRowClick={handleRemoveRowClick}
          />
        ))}
      </form>
      <button onClick={() => handleAddRowClick(sectionIndex)}>Add Row</button>
      <button onClick={() => handleRemoveSectionClick(sectionIndex)}>Remove Section</button>
    </div>
  );
}

export default Section;
