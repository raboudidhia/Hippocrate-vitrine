import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import axios from 'axios';
import { Link } from 'react-router-dom';
import roomImage from '../assets/hipp10.jpg'; // You'll need to add this image
import heroImage from '../assets/hipp9.jpg'; // Another image for the hero section

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
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const response = await axios.get('http://localhost:5000/api/rooms', {
          params: { date: formattedDate },
        });
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Erreur lors du chargement des salles');
      }
    };
    fetchRooms();
  }, [selectedDate]);

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
        const roomsResponse = await axios.get('http://localhost:5000/api/rooms', {
          params: { date: format(selectedDate, 'yyyy-MM-dd') },
        });
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

  const handlePhoneChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src={heroImage} 
          alt="Medical space" 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-4xl font-bold text-white mb-4">Réserver une salle</h1>
            <p className="text-xl text-gray-200">Réservez votre espace de travail en toute simplicité</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Room Selection */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Salles disponibles</h2>
              </div>
              <div className="p-6 grid grid-cols-1 gap-6">
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <div
                      key={room._id}
                      className={`p-5 bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                        selectedRoom?._id === room._id 
                          ? 'border-[#1F8287]' 
                          : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedRoom(room)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img 
                            src={roomImage} 
                            alt={room.name} 
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
                          <div className="mt-2 flex items-center">
                            <span className="bg-[#1F8287] text-white text-xs px-2 py-1 rounded-full">
                              {room.capacity} places
                            </span>
                            <span className="ml-2 text-sm text-gray-600">
                              {room.availablePlaces} disponibles
                            </span>
                          </div>
                          <div className="mt-2">
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune salle disponible pour cette date</p>
                  </div>
                )}
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Besoin d&apos;aide ?</h2>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#1F8287] rounded-full p-3 text-white">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Contactez-nous</h3>
                    <p className="text-gray-600 mt-1">+216 98 269 561</p>
                    <Link 
                      to="/contact" 
                      className="inline-block mt-2 text-[#1F8287] hover:underline"
                    >
                      Envoyer un message
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Date Selection */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Choisir la date</h2>
              </div>
              <div className="p-6">
                <DatePicker
                  selected={selectedDate}
                  onChange={setSelectedDate}
                  locale={fr}
                  inline
                  minDate={new Date()}
                  className="border-0 w-full"
                  dayClassName={(date) => 
                    format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                      ? 'bg-[#1F8287] text-white rounded-full'
                      : undefined
                  }
                />
              </div>
            </div>

            {/* Time Selection */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Heure d&apos;arrivée</h2>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1F8287] rounded-full p-3 text-white">
                    <i className="fas fa-clock"></i>
                  </div>
                  <input
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F8287] focus:border-transparent"
                    required
                  />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  Les réservations sont disponibles de 8h à 18h.
                </p>
              </div>
            </div>

            {/* Reservation Form */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-[#1f1f1f] px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Informations personnelles</h2>
              </div>
              <div className="p-6">
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-lg">
                    <div className="flex items-center">
                      <i className="fas fa-exclamation-circle mr-2"></i>
                      <span>{error}</span>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F8287] focus:border-transparent"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F8287] focus:border-transparent"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F8287] focus:border-transparent"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]*"
                      inputMode="numeric"
                      placeholder="Exemple: 98269561"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F8287] focus:border-transparent"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading || !selectedRoom || !arrivalTime}
                    className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors duration-300 ${
                      loading || !selectedRoom || !arrivalTime
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#1F8287] hover:bg-teal-700'
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Traitement en cours...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <i className="far fa-calendar-check mr-2"></i>
                        Confirmer la réservation
                      </span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && confirmationData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full relative">
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
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <i className="fas fa-times"></i>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-500 text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Réservation confirmée</h2>
              <p className="text-gray-600">Un email de confirmation vous a été envoyé</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Salle:</span>
                <span>{confirmationData.room}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Date:</span>
                <span>{confirmationData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Heure:</span>
                <span>{confirmationData.arrivalTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Nom:</span>
                <span>{confirmationData.firstName} {confirmationData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Référence:</span>
                <span className="text-[#1F8287]">
                  {confirmationData?._id ? `#${confirmationData._id.slice(-6).toUpperCase()}` : 'N/A'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600 text-center">
                Vous pouvez modifier ou annuler votre réservation jusqu&apos;à 24h avant la date prévue.
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
                className="w-full bg-[#1F8287] text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors duration-300"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;