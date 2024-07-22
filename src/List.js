import React from 'react';

const List = ({ data, updateItem, deleteItem, setItemToEdit }) => {
  const handleIncrement = (item) => {
    const updatedItem = { ...item, killsPerMatch: item.killsPerMatch + 1 };
    console.log('Incrementando kills para:', updatedItem);
    updateItem(updatedItem);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Arma Favorita</th>
            <th>Skin Favorita</th>
            <th>Modo Favorito</th>
            <th>Mapas Favoritos</th>
            <th>Kills por Partida</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td><strong>{item.name}</strong></td>
              <td>{item.role}</td>
              <td>{item.weapon}</td>
              <td>{item.favoriteSkin}</td>
              <td>{item.favoriteMode}</td>
              <td>{item.favoriteMaps.join(', ')}</td>
              <td>{item.killsPerMatch}</td>
              <td>
                <button className="btn btn-warning btn-sm" onClick={() => setItemToEdit(item)}>Editar</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item.id)} style={{ marginLeft: '10px' }}>Eliminar</button>
                <button className="btn btn-success btn-sm" onClick={() => handleIncrement(item)} style={{ marginLeft: '10px' }}>+1 Kill</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
