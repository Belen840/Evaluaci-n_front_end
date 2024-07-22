import React, { useEffect, useState } from 'react';
import Header from './Header';
import Form from './Form';
import List from './List';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    // Cargar datos desde localStorage al montar el componente
    const storedData = JSON.parse(localStorage.getItem('valorantData'));
    console.log('Datos cargados desde localStorage:', storedData);
    if (storedData) setData(storedData);
  }, []);

  useEffect(() => {
    // Guardar datos en localStorage cada vez que los datos cambian
    console.log('Guardando datos en localStorage:', data);
    localStorage.setItem('valorantData', JSON.stringify(data));
  }, [data]);

  const addItem = (item) => {
    setData([...data, item]);
  };

  const updateItem = (updatedItem) => {
    const newData = data.map(item => item.id === updatedItem.id ? updatedItem : item);
    setData(newData);
    setItemToEdit(null);
  };

  const deleteItem = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="content">
        <div className="form-image-container">
          <div className="form-container">
            <h2>{itemToEdit ? 'Editar tu arma favorita' : 'Elige tu arma favorita'}</h2>
            <p>Usa la imagen de la derecha para guiarte en la elección de tu arma favorita.</p>
            <Form addItem={addItem} editItem={updateItem} itemToEdit={itemToEdit} />
          </div>
          <div className="image-container">
            <img src="/BuyMenu.png" alt="Buy Menu" className="buy-menu-image" />
          </div>
        </div>
        <div className="list-container">
          <List data={data} updateItem={updateItem} deleteItem={deleteItem} setItemToEdit={setItemToEdit} />
        </div>
      </div>
    </div>
  );
};

export default App;
