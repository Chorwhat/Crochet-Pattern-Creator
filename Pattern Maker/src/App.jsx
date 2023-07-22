import React, { useState } from "react";
import Section from "./Section";


function CrochetPatternGenerator() {
  const [sections, setSections] = useState([{ title: "", rows: [{ stitches: "" }] }]);
  const [editingRow, setEditingRow] = useState(null);
  const [savedJson, setSavedJson] = useState(null);

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

  setSavedJson(JSON.stringify(
    {
      sections: sections.map(({ title, rows }) => ({
        title,
        rows: rows.map(({ stitches }) => {
          const stitchArray = [];
          const splitStitches = stitches.split(",");
  
          splitStitches.forEach((stitch) => {
            const splitStitch = stitch.split("*");
            const stitchType = splitStitch[0];
            let stitchCount = 1; // Default to 1 if no stitch count is provided
            let instruction = "";
  
            if (splitStitch.length > 1) {
              // Check for presence of instruction in square brackets
              const instructionStart = splitStitch[1].indexOf("[");
              if (instructionStart !== -1) {
                stitchCount = parseInt(splitStitch[1].substring(0, instructionStart), 10);
                const instructionEnd = splitStitch[1].indexOf("]");
                instruction = splitStitch[1].substring(instructionStart + 1, instructionEnd);
              } else {
                stitchCount = parseInt(splitStitch[1], 10);
              }
            }
  
            for (let i = 0; i < stitchCount; i++) {
              stitchArray.push({ name: stitchType, value: 1, instruction, complete: false });
            }
          });
          return stitchArray;
        }),
      })),
    },
    null,
    2
  ));

  setSections(newSections);
  setEditingRow(null);
};
  
  
  

  const handleSectionTitleChange = (event, sectionIndex) => {
    const newSections = [...sections];
    newSections[sectionIndex].title = event.target.value;
    setSections(newSections);
  };





  

  const outputJson = savedJson || JSON.stringify({ sections: [] }, null, 2);
  const outputFormatted = outputJson.replace(/},/g, "},\n").replace(/],/g, "],\n");


  

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
        <textarea style={{ width: "100%", height: "200px" }} value={outputFormatted} readOnly />
      </div>
    </div>
  );
}

export default CrochetPatternGenerator;