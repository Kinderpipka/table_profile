import React,{useState} from "react";
import Item from "../item/Item";
import "../list/List.css";
import Modal from 'react-modal';
function List({ items }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  if (!items || items.length === 0) {
    return <p>Нет данных для отображения.</p>; 
  }
  return (
    <div className="table_container">
      <table className="resizable_table">
        <thead>
          <tr>
            <th>ФИО</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <Item key={index} item={item} onClick={() => openModal(item)}/>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="User Details"
           className="modal_content"
        >
          <h2>Подробная информация о пользователе</h2>
          <p><strong>ФИО:</strong> {selectedItem.lastName} {selectedItem.firstName} {selectedItem.maidenName}</p>
          
          <p><strong>Возраст:</strong> {selectedItem.age}</p>
          <p><strong>Адрес:</strong> {selectedItem.address.city}, {selectedItem.address.address}</p>
          <p><strong>Рост:</strong> {selectedItem.height}</p>
          <p><strong>Вес:</strong> {selectedItem.weight}</p>
          <p><strong>Номер телефона:</strong> {selectedItem.phone}</p>
          <p><strong>Почта:</strong> {selectedItem.email}</p>
          <button onClick={closeModal}>Закрыть</button>
        </Modal>
      )}
    </div>
  );
}

export default List;
