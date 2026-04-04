export const parseUserId = (fullCode) => {

    const dept = fullCode.match(/[a-zA-Z]+/g)[0];

  // 1. Get only the numbers (e.g., "20230111")
  const numbers = fullCode.replace(/[a-zA-Z]/g, "");

  // 2. Extract 5th and 6th digits (Index 4 and 5 in JS)
  // .substring(start, end) -> end is exclusive
  const degreeCode = numbers.substring(4, 6); 

  // 3. Determine Degree Type
  let degreeType = "";
  if (degreeCode === "01") {
    degreeType = "bachelors";
  } else if (degreeCode === "02") {
    degreeType = "masters";
  } else if (degreeCode === "03") {
    degreeType = "phd";
  } else {
    degreeType = "";
  }

  // 4. Extract last two numbers as Semester
  const semester = numbers.slice(-2);

  return {
    dept: dept,
    degree: degreeType,
    semester: semester,
    year: Number(numbers.substring(0, 4)) // Optional: first 4 digits usually mean Year
  };
};

// --- Test Case ---
// const result = parseUserId("cse20230111");
// console.log(result); 
// Output: { degree: "bachelors", semester: 11, year: "2023" }