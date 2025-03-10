import React, { useState, useEffect } from "react";
import Textinput from "@/components/ui/Textinput";
import useDebounce from "../../hooks/useDebounce ";


const GlobalFilter = ({ filter, setFilter }) => {
  const [value, setValue] = useState(filter);
  const debouncedValue = useDebounce(value, 1000); // Adjust the debounce delay as needed

  useEffect(() => {
    // Check if the search term is a date in the format DD/MM/YYYY
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = debouncedValue.match(dateRegex);

    let searchValue = debouncedValue;

    if (match) {
      const [, day, month, year] = match;
      searchValue = new Date(`${year}-${month}-${day}`).toISOString();
    }

    setFilter(searchValue || undefined);
  }, [debouncedValue, setFilter]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Textinput
        value={value || ""}
        onChange={onChange}
        placeholder="search..."
      />
    </div>
  );
};

export default GlobalFilter;


// import React, { useState } from "react";
// import Textinput from "@/components/ui/Textinput";
// const GlobalFilter = ({ filter, setFilter }) => {
//   const [value, setValue] = useState(filter);
//   const onChange = (e) => {
//     setValue(e.target.value);
//     setFilter(e.target.value || undefined);
//   };
//   return (
//     <div>
//       <Textinput
//         value={value || ""}
//         onChange={onChange}
//         placeholder="search..."
//       />
//     </div>
//   );
// };

// export default GlobalFilter;
