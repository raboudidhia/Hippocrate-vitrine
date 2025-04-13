import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';

const Reservation = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [arrivalTime, setArrivalTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Erreur lors du chargement des salles');
      }
    };
    fetchRooms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const reservationData = {
        room: selectedRoom._id,
        date: format(selectedDate, 'yyyy-MM-dd'),
        arrivalTime,
        ...formData,
      };

      const response = await axios.post('http://localhost:5000/api/reservations', reservationData);
      if (response.data.success) {
        setConfirmationData(response.data.reservation);
        setShowConfirmation(true);
        const roomsResponse = await axios.get('http://localhost:5000/api/rooms');
        setRooms(roomsResponse.data);
      } else {
        setError('Une erreur est survenue lors de la réservation.');
      }
    } catch (err) {
      console.error('Reservation error:', err);
      setError(
        err.response?.data.message ||
          'Une erreur est survenue lors de la réservation. Veuillez réessayer plus tard.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold mb-10 text-gray-900 text-center">
          Réserver une salle
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Room Selection */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Salles disponibles</h2>
            <div className="grid grid-cols-1 gap-6">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  className={`p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    selectedRoom?._id === room._id ? 'ring-4 ring-green-500' : ''
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">{room.name}</h3>
                      <p className="text-green-600 font-medium mt-1">
                        Places disponibles: {room.availablePlaces}/{room.capacity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Time Selection */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800">Choisir la date et l’heure</h2>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <DatePicker
                selected={selectedDate}
                onChange={setSelectedDate}
                locale={fr}
                inline
                minDate={new Date()}
                className="w-full"
              />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Heure d’arrivée</h3>
              <input
                type="time"
                value={arrivalTime}
                onChange={(e) => setArrivalTime(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        </div>

        {/* Reservation Form */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Informations personnelles</h2>
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !selectedRoom || !arrivalTime}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${
                loading || !selectedRoom || !arrivalTime
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Traitement en cours...' : 'Confirmer la réservation'}
            </button>
          </form>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && confirmationData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-8 rounded-2xl max-w-md w-full">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Réservation confirmée</h2>
              <div className="space-y-3">
                <p><span className="font-medium">Salle:</span> {confirmationData.room}</p>
                <p><span className="font-medium">Date:</span> {confirmationData.date}</p>
                <p><span className="font-medium">Heure d’arrivée:</span> {confirmationData.arrivalTime}</p>
                <p><span className="font-medium">Nom:</span> {confirmationData.firstName} {confirmationData.lastName}</p>
                <p><span className="font-medium">Email:</span> {confirmationData.email}</p>
                <p><span className="font-medium">Téléphone:</span> {confirmationData.phone}</p>
              </div>
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Un email de confirmation vous sera envoyé prochainement. Si vous ne le recevez pas,
                  votre réservation reste valide et vous pouvez nous contacter pour plus d'informations.
                </p>
                <button
                  onClick={() => {
                    setShowConfirmation(false);
                    setConfirmationData(null);
                    setSelectedRoom(null);
                    setArrivalTime('');
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                    });
                  }}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reservation;