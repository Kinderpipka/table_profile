import React, { useState } from "react";
import '../sort/Sort.css'

function Sort({ onSort }) {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === "column") {
      setSortColumn(value);
      onSort(value, sortOrder);
    } else if (name === "order") {
      setSortOrder(value);
      onSort(sortColumn, value);
    }
  };

  return (
    <div className="sort_container">
      <select className="sort_select" name="column" value={sortColumn} onChange={handleSortChange}>
        <option value="">Без сортировки</option>
        <option value="name">ФИО</option>
        <option value="age">Возраст</option>
        <option value="city">Город</option>
      </select>
      <select className="sort_select" name="order" value={sortOrder} onChange={handleSortChange} disabled={!sortColumn}>
        <option value="asc">По возрастанию</option>
        <option value="desc">По убыванию</option>
      </select>
    </div>
  );
}

export default Sort;
