import React from 'react';

const semesterTransformer = (code) => {
  if (!code || typeof code !== 'number') return "Invalid Code";

  const yearMap = {
    1: "First",
    2: "Second",
    3: "Third",
    4: "Fourth",
    5: "Fifth",
    6: "Sixth"
  };

  const semesterMap = {
    1: "1st Semester",
    2: "2nd Semester"
  };

  const yearDigit = Math.floor(code / 10);
  const semesterDigit = code % 10;

  const yearText = yearMap[yearDigit] || `${yearDigit}th Year`;
  
  // If the code is 10, 20, 30 etc., return just the Year
  if (semesterDigit === 0) {
    return `${yearText} Year`;
  }

  // If the code is 11, 12, 21 etc., return Year + Semester
  const semesterText = semesterMap[semesterDigit] || `${semesterDigit}th Semester`;
  
  return `${yearText} Year ${semesterText}`;
};

// Usage in a React Component
const SemesterDisplay = ({ code }) => {
  return (
    <div className="semester-text">
      {semesterTransformer(code)}
    </div>
  );
};

export default SemesterDisplay;
