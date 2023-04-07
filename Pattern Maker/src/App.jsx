import React, { useState } from "react";
import Section from "./Section";
import Row from "./Row";

function CrochetPatternGenerator() {
  const [sections, setSections] = useState([{ title: "", rows: [{ stitches: "" }] }]);
  const [editingRow, setEditingRow] = useState(null);

  const handleAddSectionClick = () => {
    setSections([...sections, { title: "", rows: [{ stitches: "" }] }]);
  };

  const handleRemoveSectionClick = (indexToRemove) => {
    setSections(sections.filter((section, index) => index !== indexToRemove));
    if (editingRow?.section === indexToRemove) {
      setEditingRow(null);
    }
  };

  const handleAddRowClick = (sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].rows.push({ stitches: "" });
    setSections(newSections);
  };

  const handleRemoveRowClick = (sectionIndex, rowIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].rows = newSections[sectionIndex].rows.filter((row, index) => index !== rowIndex);
    if (editingRow?.section === sectionIndex && editingRow?.row === rowIndex) {
      setEditingRow(null);
    }
    setSections(newSections);
  };

  const handleEditRowClick = (sectionIndex, rowIndex) => {
    setEditingRow({ section: sectionIndex, row: rowIndex });
  };

  const handleRowInputChange = (event, sectionIndex, rowIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].rows[rowIndex].stitches = event.target.value;
    setSections(newSections);
  };

  const handleSaveRowClick = () => {
    const newSections = [...sections];
    const { section: sectionIndex, row: rowIndex } = editingRow;
    const row = newSections[sectionIndex].rows[rowIndex];
  
    // Split the stitches string into an array
    const splitStitches = Array.isArray(row.stitches) ? row.stitches.join(",") : row.stitches;

  
    // Replace the stitches string with the new array
    row.stitches = splitStitches;
  
    setSections(newSections);
    setEditingRow(null);
  };
  
  
  

  const handleSectionTitleChange = (event, sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].title = event.target.value;
    setSections(newSections);
  };

  // Generate the output JSON by mapping over the sections and rows.
  const outputJson = JSON.stringify({
    sections: sections.map(({ title, rows }) => ({
      title,
      rows: rows.map(({ stitches }) => {
        const stitchArray = [];
        const splitStitches = stitches.split(",");
        splitStitches.forEach((stitch) => {
          const splitStitch = stitch.split("*");
          const stitchType = splitStitch[0];
          const stitchCount = parseInt(splitStitch[1], 10);
          for (let i = 0; i < stitchCount; i++) {
            stitchArray.push(stitchType);
          }
        });
        return { stitches: stitchArray };
      }),
    })),
  });
  

  return (
    <div>
      {sections.map((section, index) => (
        <Section
          key={index}
          section={section}
          sectionIndex={index}
          handleSectionTitleChange={handleSectionTitleChange}
          handleAddRowClick={handleAddRowClick}
          handleRemoveSectionClick={handleRemoveSectionClick}
          handleRemoveRowClick={handleRemoveRowClick}
          handleEditRowClick={handleEditRowClick}
          handleRowInputChange={handleRowInputChange}
          handleSaveRowClick={handleSaveRowClick}
          editingRow={editingRow}
        />
      ))}
      <button onClick={handleAddSectionClick}>Add Section</button>
      <div style={{ marginTop: "20px" }}>
        <h2>Output JSON Preview:</h2>
        <pre>{outputJson}</pre>
      </div>
    </div>
  );
}

export default CrochetPatternGenerator;
