import React from "react";
import { FormControl } from "react-bootstrap";
import { Button, InputGroup } from "reactstrap";

const FilterComponent = ({ filterText, onFilter, onClear }: any) => (
  <>
    <InputGroup className="mb-3">
      <FormControl
        id="search"
        type="text"
        placeholder="Search records"
        value={filterText}
        onChange={onFilter}
        aria-label="Search records"
        aria-describedby="Search-records"
        className="m-0"
      />
      <Button variant="outline-primary" id="filter-btn" onClick={onClear}>
        Clear
      </Button>
    </InputGroup>
  </>
);

export default FilterComponent;
