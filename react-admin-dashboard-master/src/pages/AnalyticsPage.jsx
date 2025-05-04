import React, { useState, useEffect } from 'react';

function App() {
  const [formData, setFormData] = useState({
    type: '',
    ph: '',
    nitrogen: '',
    phosphore: '',
    potassium: ''
  });

  const [plants, setPlants] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/plants')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, type: data[0] }));
        }
      })
      .catch(err => console.error("Erreur lors du chargement des plantes :", err));
  }, []);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.prediction) {
        setResult(`✅ Engrais recommandé : ${data.prediction}`);
      } else {
        setResult(`❌ Erreur : ${data.error}`);
      }
    } catch (error) {
      setResult('❌ Erreur de connexion au serveur.');
    }
  };

  return (
    <div style={{
      backgroundColor: '#f4f4f4',
      minHeight: '100vh',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>🌿 Prédiction d’engrais</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Type de plante :
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">--Choisir une plante--</option>
              {plants.map((p, i) => (
                <option key={i} value={p}>{p}</option>
              ))}
            </select>
          </label><br /><br />

          <label>pH du sol :
            <input
              type="number"
              step="0.01"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label><br /><br />

          <label>Niveau de Nitrogène :
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label><br /><br />

          <label>Niveau de Phosphore :
            <input
              type="number"
              name="phosphore"
              value={formData.phosphore}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label><br /><br />

          <label>Niveau de Potassium :
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </label><br /><br />

          <button type="submit" style={buttonStyle}>Prédire</button>
        </form>

        {result && (
          <h3 style={{ marginTop: '20px', textAlign: 'center', color: '#27ae60' }}>{result}</h3>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxSizing: 'border-box'
};

const buttonStyle = {
  backgroundColor: '#3498db',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  fontWeight: 'bold',
  fontSize: '16px'
};

export default App;
