import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import heroImage from '../../assets/hipp9.jpg'; 

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [capacityInputs, setCapacityInputs] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { logout } = useAdminAuth();

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    // Initialize capacity inputs with current values
    const initialCapacities = {};
    rooms.forEach(room => {
      initialCapacities[room._id] = room.availablePlaces;
    });
    setCapacityInputs(initialCapacities);
  }, [rooms]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setError('No authentication token found');
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const formattedDate = selectedDate.split('T')[0]; // Ensure we only send the date part

      const [reservationsRes, roomsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/admin/reservations?date=${formattedDate}`, { headers }),
        axios.get(`http://localhost:5000/api/rooms?date=${formattedDate}`, { headers })
      ]);

      if (Array.isArray(reservationsRes.data)) {
        // Sort reservations by arrival time
        const sortedReservations = reservationsRes.data.sort((a, b) => {
          return a.arrivalTime.localeCompare(b.arrivalTime);
        });
        setReservations(sortedReservations);
      } else {
        console.error('Invalid reservations data:', reservationsRes.data);
        setError('Error: Invalid reservations data received');
      }

      if (Array.isArray(roomsRes.data)) {
        setRooms(roomsRes.data);
      } else {
        console.error('Invalid rooms data:', roomsRes.data);
        setError('Error: Invalid rooms data received');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCapacityInputChange = (roomId, value) => {
    setCapacityInputs(prev => ({
      ...prev,
      [roomId]: value
    }));
  };

  const handleUpdateCapacity = async (roomId) => {
    try {
      const newCapacity = parseInt(capacityInputs[roomId]);
      const room = rooms.find(r => r._id === roomId);
      
      if (isNaN(newCapacity) || newCapacity < 0 || newCapacity > room.capacity) {
        setError(`La capacité doit être comprise entre 0 et ${room.capacity}`);
        return;
      }

      const token = localStorage.getItem('adminToken');
      await axios.patch(
        `http://localhost:5000/api/admin/rooms/${roomId}/availability`,
        { 
          availablePlaces: newCapacity,
          date: selectedDate
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the rooms state with the new data
      setRooms(rooms.map(room => 
        room._id === roomId ? { ...room, availablePlaces: newCapacity } : room
      ));
      
      setError(''); // Clear any previous errors
    } catch (error) {
      console.error('Error updating capacity:', error);
      setError(error.response?.data?.message || 'Erreur lors de la mise à jour de la capacité');
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(reservations.filter(r => r._id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError(error.response?.data?.message || 'Error deleting reservation');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1F8287]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative bg-gray-900 mb-8">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src={heroImage} 
          alt="Medical space" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Dashboard Administrateur</h1>
            <p className="text-xl text-gray-200">Gérez vos réservations et disponibilités</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="border rounded px-3 py-2"
            />
            <h2 className="text-xl font-semibold">
              Réservations du {format(parseISO(selectedDate), 'dd MMMM yyyy', { locale: fr })}
            </h2>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Déconnexion
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Capacity Management */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Gestion des places</h2>
            </div>
            <div className="space-y-4">
              {rooms.map((room) => (
                <div key={room._id} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{room.name}</h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <input
                      type="number"
                      min="0"
                      max={room.capacity}
                      value={capacityInputs[room._id] || ''}
                      onChange={(e) => handleCapacityInputChange(room._id, e.target.value)}
                      className="border rounded px-3 py-2 w-24"
                    />
                    <span className="text-gray-600">
                      / {room.capacity} places totales
                    </span>
                    <button
                      onClick={() => handleUpdateCapacity(room._id)}
                      className="bg-[#1F8287] text-white px-4 py-2 rounded hover:bg-[#186266] transition-colors"
                    >
                      Modifier
                    </button>
                  </div>
                </div>
              ))}
              {rooms.length === 0 && (
                <p className="text-gray-500 text-center">Aucune salle trouvée</p>
              )}
            </div>
          </div>

          {/* Reservations List */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Réservations</h2>
            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div 
                  key={reservation._id} 
                  className="border rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-semibold text-lg">
                        {reservation.firstName} {reservation.lastName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Heure d'arrivée: {reservation.arrivalTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        {reservation.room?.name || 'Salle non spécifiée'}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">Email:</span>{' '}
                          <a href={`mailto:${reservation.email}`} className="text-blue-600 hover:underline">
                            {reservation.email}
                          </a>
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Téléphone:</span>{' '}
                          <a href={`tel:${reservation.phone}`} className="text-blue-600 hover:underline">
                            {reservation.phone}
                          </a>
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteReservation(reservation._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
              {reservations.length === 0 && (
                <p className="text-gray-500 text-center">Aucune réservation pour cette date</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 