import React, { useState, useEffect } from 'react';

const Form = ({ addItem, editItem, itemToEdit }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    weapon: '',
    favoriteSkin: '',
    favoriteMode: '',
    killsPerMatch: 0,
    favoriteMaps: []
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData(itemToEdit);
    } else {
      setFormData({
        id: '',
        name: '',
        role: '',
        weapon: '',
        favoriteSkin: '',
        favoriteMode: '',
        killsPerMatch: 0,
        favoriteMaps: []
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'favoriteMaps') {
      setFormData((prevState) => ({
        ...prevState,
        favoriteMaps: checked
          ? [...prevState.favoriteMaps, value]
          : prevState.favoriteMaps.filter((map) => map !== value)
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemToEdit) {
      console.log('Editando ítem:', formData);
      editItem(formData);
    } else {
      console.log('Agregando ítem:', formData);
      addItem({ ...formData, id: Date.now() });
    }
    setFormData({
      id: '',
      name: '',
      role: '',
      weapon: '',
      favoriteSkin: '',
      favoriteMode: '',
      killsPerMatch: 0,
      favoriteMaps: []
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <div className="form-group">
        <label htmlFor="name">Nombre de usuario: </label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Rol: </label>
        <select className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required>
          <option value="">Selecciona un rol: </option>
          <option value="duelista">Duelista</option>
          <option value="centinela">Centinela</option>
          <option value="iniciador">Iniciador</option>
          <option value="controlador">Controlador</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="weapon">Arma favorita: </label>
        <input type="text" className="form-control" id="weapon" name="weapon" value={formData.weapon} onChange={handleChange} placeholder="Arma favorita" required />
      </div>
      <div className="form-group">
        <label htmlFor="favoriteSkin">Skin Favorita: </label>
        <input type="text" className="form-control" id="favoriteSkin" name="favoriteSkin" value={formData.favoriteSkin} onChange={handleChange} placeholder="Skin Favorita" required />
      </div>
      <div className="form-group">
        <label htmlFor="favoriteMode">Modo de Juego Favorito: </label>
        <input type="text" className="form-control" id="favoriteMode" name="favoriteMode" value={formData.favoriteMode} onChange={handleChange} placeholder="Modo de Juego Favorito" required />
      </div>
      <div className="form-group">
        <label htmlFor="favoriteMaps">Mapas Favoritos: </label>
        <div>
          {['SUNSET', 'LOTUS', 'PEARL', 'FRACTURE', 'BREEZE', 'ICEBOX', 'BIND', 'HAVEN', 'SPLIT', 'ASCENT'].map((map) => (
            <div key={map}>
              <input
                type="checkbox"
                id={map}
                name="favoriteMaps"
                value={map}
                checked={formData.favoriteMaps.includes(map)}
                onChange={handleChange}
              />
              <label htmlFor={map}>{map}</label>
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
};

export default Form;
