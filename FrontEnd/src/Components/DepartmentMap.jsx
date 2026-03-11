export const DepartmentMap = {
  // Applied Sciences & Technology
  arc: "Architecture",
  cep: "Chemical Engineering & Polymer Science",
  cee: "Civil & Environmental Engineering",
  cse: "Computer Science & Engineering",
  eee: "Electrical & Electronic Engineering",
  fet: "Food Engineering & Tea Technology",
  ipe: "Industrial & Production Engineering",
  mee: "Mechanical Engineering",
  pme: "Petroleum & Mining Engineering",
  swe: "Software Engineering",
  // Physical Sciences
  che: "Chemistry",
  gee: "Geography and Environment",
  mat: "Mathematics",
  ocg: "Oceanography",
  phy: "Physics",
  sta: "Statistics",
  // Life Sciences
  bmb: "Biochemistry and Molecular Biology",
  fes: "Forestry and Environmental Science",
  geb: "Genetic Engineering and Biotechnology",
  // Social Sciences
  anp: "Anthropology",
  bng: "Bangla",
  eco: "Economics",
  eng: "English",
  pss: "Political Studies",
  pad: "Public Administration",
  scw: "Social Work",
  soc: "Sociology",
  // Management
  ban: "Business Administration",
};

// /**
//  * Utility to get full name by key
//  * @param {string} key - The 3-character ID
//  * @returns {string} - Full department name or the key if not found
//  */
export const getDeptName = (key) => {
  return  DepartmentMap[key] || "Unknown Department";
};