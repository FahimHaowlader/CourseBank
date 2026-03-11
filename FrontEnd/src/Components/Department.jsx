import { IoIosArrowDown } from "react-icons/io";

const Department = ({ value, onChange }) => {
  return (
    <label className="flex flex-col gap-1.5 w-full md:col-span-2">
      <span className="text-sm font-semibold text-text-secondary dark:text-gray-400">
        Department
      </span>
      <div className="relative w-full border border-border-light dark:border-border-dark rounded-lg focus-within:border-primary transition-colors">
        <select
          className="w-full h-11 pl-3 pr-10 rounded-lg bg-white dark:bg-background-dark border-0 focus:outline-none focus:ring-0 text-sm appearance-none cursor-pointer"
          name="department"
          value={value}
          onChange={onChange}
        >
          <option value="">All Departments</option>
          
          <optgroup label="Applied Sciences & Technology">
            <option value="arc">Architecture</option>
            <option value="cep">Chemical Engineering & Polymer Science</option>
            <option value="cee">Civil & Environmental Engineering</option>
            <option value="cse">Computer Science & Engineering</option>
            <option value="eee">Electrical & Electronic Engineering</option>
            <option value="fet">Food Engineering & Tea Technology</option>
            <option value="ipe">Industrial & Production Engineering</option>
            <option value="mee">Mechanical Engineering</option>
            <option value="pme">Petroleum & Mining Engineering</option>
            <option value="swe">Software Engineering</option>
          </optgroup>

          <optgroup label="Physical Sciences">
            <option value="che">Chemistry</option>
            <option value="gee">Geography and Environment</option>
            <option value="mat">Mathematics</option>
            <option value="ocg">Oceanography</option>
            <option value="phy">Physics</option>
            <option value="sta">Statistics</option>
          </optgroup>

          <optgroup label="Life Sciences">
            <option value="bmb">Biochemistry and Molecular Biology</option>
            <option value="fes">Forestry and Environmental Science</option>
            <option value="geb">Genetic Engineering and Biotechnology</option>
          </optgroup>

          <optgroup label="Social Sciences">
            <option value="anp">Anthropology</option>
            <option value="bng">Bangla</option>
            <option value="eco">Economics</option>
            <option value="eng">English</option>
            <option value="pss">Political Studies</option>
            <option value="pad">Public Administration</option>
            <option value="scw">Social Work</option>
            <option value="soc">Sociology</option>
          </optgroup>

          <optgroup label="Management">
            <option value="ban">Business Administration</option>
          </optgroup>
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary text-[20px]">
          <IoIosArrowDown />
        </span>
      </div>
    </label>
  );
};

export default Department;