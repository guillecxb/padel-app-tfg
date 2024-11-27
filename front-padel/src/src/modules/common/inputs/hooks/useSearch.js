import { useState, useCallback } from "react";

// Función que elimina los espacios de un MSISDN
const stripSpaces = (msisdn) => msisdn.replace(/\s+/g, "");

export const useSearch = ({ tableRows, searchOverFields, setRows }) => {
  const [searchText, setSearchText] = useState("");

  const escapeRegExp = (value) => {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };

  const requestSearch = useCallback(
    (searchValue) => {
      setSearchText(searchValue);
      const searchRegex = new RegExp(escapeRegExp(stripSpaces(searchValue)), "i");
      const filteredRows = tableRows.filter((row) => {
        return Object.keys(row).some((field) => {
          if (!searchOverFields || searchOverFields.indexOf(field) !== -1) {
            return searchRegex.test(stripSpaces(row[field]?.toString()));
          }
        });
      });
      setRows(searchValue ? filteredRows : tableRows);
    },
    [searchOverFields, setRows, tableRows]
  );

  return {
    value: searchText,
    onChange: (event) => requestSearch(event.target.value),
    clearSearch: () => {
      setSearchText("");
      requestSearch("");
    },
  };
};
