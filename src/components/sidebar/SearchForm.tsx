import React from "react";
import { TextField } from "../../components/styled";

const SearchForm: React.FC = () => {
  return (
    <TextField
      placeholder="Search categories..."
      // InputProps={{
      //   startAdornment: (
      //     <InputAdornment position="start">
      //       <SearchIcon fontSize="small" />
      //     </InputAdornment>
      //   ),
      // }}
    />
  );
};

export default SearchForm;
