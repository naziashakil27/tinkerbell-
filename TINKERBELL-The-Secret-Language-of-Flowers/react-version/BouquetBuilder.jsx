import React, { useState, useEffect } from 'react';

/**
 * Tinkerbell - React Bouquet Builder Component
 * Demonstrates modern React state management, components, and props.
 */
export default function BouquetBuilder() {
  const [selectedFlowers, setSelectedFlowers] = useState([
    { id: 'rose', name: 'Red Rose', meaning: 'Passionate Love', qty: 2 },
    { id: 'baby', name: "Baby's Breath", meaning: 'Everlasting Devotion', qty: 3 }
  ]);
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('Friendship');
  const [message, setMessage] = useState('');
  const [giftCode, setGiftCode] = useState(null);

  const addStem = (id, name, meaning) => {
    setSelectedFlowers(prev => {
      const exists = prev.find(f => f.id === id);
      if (exists) {
        return prev.map(f => f.id === id ? { ...f, qty: f.qty + 1 } : f);
      }
      return [...prev, { id, name, meaning, qty: 1 }];
    });
  };

  const removeStem = (id) => {
    setSelectedFlowers(prev => 
      prev.map(f => f.id === id ? { ...f, qty: f.qty - 1 } : f)
          .filter(f => f.qty > 0)
    );
  };

  const handleGenerateCode = (e) => {
    e.preventDefault();
    if (!recipient || !message) {
      alert('Please fill out recipient and secret note.');
      return;
    }
    const code = 'TINK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setGiftCode(code);
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: '16px', border: '1px solid #E3DDD3', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#203525' }}>Tinkerbell React Atelier 🌸</h2>
      <p style={{ color: '#5C7060', marginBottom: '1.5rem' }}>A demonstration React component for the Tinkerbell Floriography platform.</p>

      {giftCode ? (
        <div style={{ background: '#EAF0EB', padding: '1.5rem', borderRadius: '12px', textAlign: 'center', border: '1px solid #6C8B74' }}>
          <h3 style={{ color: '#203525', marginBottom: '0.5rem' }}>✨ Bouquet Encrypted!</h3>
          <p>Secret Code for {recipient}:</p>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#C59E3F', letterSpacing: '0.1em', margin: '0.5rem 0' }}>{giftCode}</div>
          <button onClick={() => setGiftCode(null)} style={{ background: '#6C8B74', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '20px', cursor: 'pointer' }}>
            Create Another
          </button>
        </div>
      ) : (
        <form onSubmit={handleGenerateCode}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.3rem' }}>Recipient Name</label>
            <input 
              type="text" 
              value={recipient} 
              onChange={e => setRecipient(e.target.value)} 
              placeholder="e.g. Eleanor" 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }}
              required 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.3rem' }}>Selected Blooms ({selectedFlowers.reduce((a, b) => a + b.qty, 0)} stems)</label>
            {selectedFlowers.map(f => (
              <div key={f.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                <span><strong>{f.name}</strong> - <em>{f.meaning}</em></span>
                <div>
                  <button type="button" onClick={() => removeStem(f.id)} style={{ padding: '0.2rem 0.6rem', marginRight: '0.4rem' }}>−</button>
                  <span>{f.qty}</span>
                  <button type="button" onClick={() => addStem(f.id, f.name, f.meaning)} style={{ padding: '0.2rem 0.6rem', marginLeft: '0.4rem' }}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.3rem' }}>Secret Message</label>
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)} 
              placeholder="Write secret letter..." 
              rows="3" 
              style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid #ccc' }} 
              required
            />
          </div>

          <button type="submit" style={{ background: '#6C8B74', color: '#fff', border: 'none', padding: '0.8rem 1.6rem', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
            Generate Gift Code ✨
          </button>
        </form>
      )}
    </div>
  );
}

