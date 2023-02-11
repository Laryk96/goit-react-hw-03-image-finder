import React from 'react';

import SearchForm from 'components/SearchForm';

const Searchbar = ({ ...otherProp }) => {
  return (
    <header className="Searchbar">
      <SearchForm {...otherProp} />
    </header>
  );
};

export default Searchbar;
