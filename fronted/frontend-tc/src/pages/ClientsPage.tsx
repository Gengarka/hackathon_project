import { useEffect, useState } from 'react';
import { getClients, createClient, deleteClient } from '../api/endpoints';
import { ClientsTable } from '../components/ClientsTable';
import type { Client } from '../types';

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const loadClients = () => {
    setLoading(true);
    getClients()
      .then(setClients)
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadClients();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;
    try {
      await createClient({ full_name: newName, email: newEmail });
      setNewName('');
      setNewEmail('');
      loadClients(); 
    } catch (err) {
      alert("Ошибка при добавлении. Проверь, запущен ли бэкенд.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Удалить клиента?")) return;
    try {
      await deleteClient(id);
      loadClients(); 
    } catch (err) {
      alert("Ошибка при удалении.");
    }
  };

  return (
    <div>
      <h1>Все клиенты ТЦ</h1>
      <p style={{ color: '#666' }}>
        Единый профиль гостя — собран из CRM, касс и программ лояльности арендаторов.
      </p>

      <form onSubmit={handleAdd} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Имя клиента" 
          value={newName} 
          onChange={e => setNewName(e.target.value)} 
          style={{ padding: '5px' }}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={newEmail} 
          onChange={e => setNewEmail(e.target.value)} 
          style={{ padding: '5px' }}
        />
        <button type="submit" style={{ padding: '5px 15px', cursor: 'pointer' }}>Добавить</button>
      </form>

      {loading ? <p>Загрузка...</p> : (
        <ClientsTable clients={clients} onDelete={handleDelete} />
      )}
    </div>
  );
}