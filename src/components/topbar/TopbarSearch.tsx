// src/components/topbar/TopbarSearch.tsx
// import { useState } from 'react';
// import debounce from 'lodash.debounce';

const TopbarSearch: React.FC = () => {
  // const [searchTerm, setSearchTerm] = useState('');

  // const handleSearch = debounce((term: string) => {
  //   // Call API or update context with search term
  //   console.log('Search:', term);
  // }, 300);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm(e.target.value);
  //   handleSearch(e.target.value);
  // };

  return (
    <input
      type="text"
      // value={searchTerm}
      // onChange={onChange}
      placeholder="Search..."
      className="px-4 py-2 rounded-lg shadow-inner bg-[#F5F5F5] w-full"
    />
  );
};

export default TopbarSearch;
