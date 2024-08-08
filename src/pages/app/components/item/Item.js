import React from "react";
import "../item/Item.css";
function Item({ item, onClick }) {
  return (
    <tr onClick={onClick}>
      <td>
        {item.lastName} {item.firstName} {item.maidenName}
      </td>
      <td>{item.age}</td>
      <td>{item.gender}</td>
      <td>{item.phone}</td>
      <td>
        {item.address.city}, {item.address.address}
      </td>
    </tr>
  );
}

export default Item;
