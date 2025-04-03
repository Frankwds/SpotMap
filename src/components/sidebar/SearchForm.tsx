import React from "react";
import { TextField, InputAdornment } from "../../components/styled";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
  value: string;
  onChange: (term: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  value = "", 
  onChange, 
}) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      placeholder={"Search for a spot..."}
      value={value}
      onChange={handleChange}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchForm;
