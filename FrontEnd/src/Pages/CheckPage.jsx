import React from 'react'
// import SelectBox from '../Components/SelectBox'
// import InputBox from '../Components/InputBox'

const CheckPage = () => {
  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center' >
      <h1 className='text-primary border p-6 rounded-xl'>Hello world </h1>
      {/* <SelectBox
  label="Year"
  options={["All Years", "2025", "2024", "2023"]}
  value={['All Years']}
  onChange={(v) => setFilters({ ...filters, year: v })}
/> */}
{/* <InputBox
  label="Course Title"
  icon="search"
  placeholder="e.g. Intro to Computer Science"
//   value={filters.title}
  onChange={(e) =>
    setFilters({ ...filters, title: e.target.value })
  }
/> */}
    </div>
  )
}

export default CheckPage
