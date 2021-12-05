import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Dropdown, ButtonGroup, InputGroup } from "react-bootstrap";

const FilterComponent = ({ filterText,
  fromDate,
  toDate,
  onFilter,
  onFilterByDateRange,
  onClear,
  onClick }: any) => {
  const [searchText, setSearchText] = useState("Search");

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="basic-addon1" onClick={onClear} style={{ cursor: "pointer" }}>x</InputGroup.Text>
      {searchText !== "Search by date range" ? <FormControl
        id="search"
        type={searchText !== "SEARCH_BY_DATE" ? "text" : "date"}
        placeholder={searchText !== "SEARCH_BY_DATE" ? "Enter search text" : "Enter tnx. date to search"}
        value={filterText}
        onChange={onFilter}
        aria-label={searchText !== "SEARCH_BY_DATE" ? "Enter search text" : "Enter tnx. date to search"}
        aria-describedby="Search-records"
        className="m-0"
      /> : <> <FormControl
        id="fromDate"
        type="date"
        placeholder="Enter from date"
        value={fromDate}
        onChange={onFilterByDateRange}
        aria-label="Enter search text"
        aria-describedby="Search-records"
        className="m-0"
      /><FormControl
          id="toDate"
          type="date"
          placeholder="Enter to date"
          value={toDate}
          onChange={onFilterByDateRange}
          aria-label="Enter search text"
          aria-describedby="Search-records"
          className="m-0"
        /></>}
      <Dropdown alignRight as={ButtonGroup} onSelect={onClick}>
        <Dropdown.Toggle id="dropdown-basic" className="bg-primary" style={{ borderLeft: "0", marginLeft: "-10px", zIndex: 1000 }}>
          {searchText}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="SEARCH_BY_ALL_FIELDS" onClick={() => setSearchText("Search")}>By all fields</Dropdown.Item>
          <Dropdown.Item eventKey="SEARCH_BY_DATE" onClick={() => setSearchText("Search by tnx. date")}>By Tnx. date</Dropdown.Item>
          <Dropdown.Item eventKey="SEARCH_BY_REFERENCE" onClick={() => setSearchText("Search by Tnx. ref")}>By Tnx. ref</Dropdown.Item>
          <Dropdown.Item eventKey="SEARCH_BY_METERNO" onClick={() => setSearchText("Search by meter no.")}>By Meter no. </Dropdown.Item>
          <Dropdown.Item eventKey="SEARCH_BY_RECEIPTNO" onClick={() => setSearchText("Search by receipt no.")}>By Receipt no.</Dropdown.Item>
          <Dropdown.Item eventKey="SEARCH_BY_DATERANGE" onClick={() => setSearchText("Search by date range")}>By Date range</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </InputGroup>
  )
}

export default FilterComponent;
