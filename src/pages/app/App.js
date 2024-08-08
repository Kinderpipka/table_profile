import React, { useState, useEffect } from "react";
import List from "./components/list/List";
import Search from "../../additional-components/searchinput/SearchInput";
import Sort from "./components/sort/Sort";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedItems, setSortedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        setItems(data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error);
        setItems([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setSortedItems(items);
  }, [items]);

  if (loading) {
    return <p>Загрузка данных...</p>;
  } else if (error) {
    return <p>Ошибка при загрузке данных: {error.message}</p>;
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (column, order) => {
    let sorted = [...items];
    if (column) {
      sorted.sort((a, b) => {
        let aValue, bValue;
        switch (column) {
          case "name":
            aValue = `${a.lastName} ${a.firstName} ${a.maidenName}`;
            bValue = `${b.lastName} ${b.firstName} ${b.maidenName}`;
            break;
          case "age":
            aValue = a.age;
            bValue = b.age;
            break;
          case "city":
            aValue = a.address.city;
            bValue = b.address.city;
            break;
          default:
            return 0;
        }
        if (order === "asc") {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
    }
    setSortedItems(sorted);
  };

  const filteredItems = sortedItems.filter((item) => {
    const words = searchQuery.toLowerCase().split(" ").filter(Boolean);
    return words.every(
      (word) =>
        item.firstName.toLowerCase().includes(word) ||
        item.lastName.toLowerCase().includes(word) ||
        item.maidenName.toLowerCase().includes(word) ||
        item.age.toString().includes(word) ||
        item.gender.toLowerCase().includes(word) ||
        item.phone.includes(word) ||
        item.address.city.toLowerCase().includes(word) ||
        item.address.address.toLowerCase().includes(word)
    );
  });

  return (
    <main>
      <Search onSearch={handleSearch} />
      <Sort onSort={handleSort} />
      <List items={filteredItems} />
    </main>
  );
}

export default App;
