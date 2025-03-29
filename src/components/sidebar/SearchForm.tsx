import React from "react";
import { TextField, InputAdornment } from "../../components/styled";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFormProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  value = "", 
  onChange, 
  placeholder = "Search categories..." 
}) => {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      onChange={onChange}
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
