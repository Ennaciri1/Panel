// src/pages/Dashboard/Bookings/Bookings.jsx
import React, { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";

const mockBookings = [
  {
    id: 1,
    guest: "Sarah Johnson",
    property: "Beautiful Villa in Marrakech",
    checkIn: "2024-02-15",
    checkOut: "2024-02-20",
    guests: 4,
    amount: 750,
    status: "confirmed",
    phone: "+1 555-0123",
    email: "sarah.johnson@email.com"
  },
  {
    id: 2,
    guest: "Michael Chen",
    property: "Cozy Apartment in Casablanca",
    checkIn: "2024-02-18",
    checkOut: "2024-02-22",
    guests: 2,
    amount: 320,
    status: "pending",
    phone: "+1 555-0234",
    email: "michael.chen@email.com"
  },
  {
    id: 3,
    guest: "Emma Wilson",
    property: "Luxury Riad in Fes",
    checkIn: "2024-02-25",
    checkOut: "2024-02-28",
    guests: 6,
    amount: 600,
    status: "confirmed",
    phone: "+1 555-0345",
    email: "emma.wilson@email.com"
  },
  {
    id: 4,
    guest: "David Martinez",
    property: "Seaside Villa in Agadir",
    checkIn: "2024-02-12",
    checkOut: "2024-02-14",
    guests: 3,
    amount: 240,
    status: "completed",
    phone: "+1 555-0456",
    email: "david.martinez@email.com"
  },
  {
    id: 5,
    guest: "Lisa Thompson",
    property: "Beautiful Villa in Marrakech",
    checkIn: "2024-02-28",
    checkOut: "2024-03-05",
    guests: 5,
    amount: 1050,
    status: "cancelled",
    phone: "+1 555-0567",
    email: "lisa.thompson@email.com"
  }
];

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800"
};

const StatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[status]}`}>
    {status}
  </span>
);

export default function Bookings() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

  const filteredBookings = mockBookings.filter(booking => {
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    const matchesSearch = 
      booking.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (bookingId, newStatus) => {
    console.log(`Changing booking ${bookingId} status to ${newStatus}`);
    // Ici tu mettrais à jour le statut via ton API
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const stats = {
    total: mockBookings.length,
    pending: mockBookings.filter(b => b.status === "pending").length,
    confirmed: mockBookings.filter(b => b.status === "confirmed").length,
    completed: mockBookings.filter(b => b.status === "completed").length,
    totalRevenue: mockBookings
      .filter(b => b.status !== "cancelled")
      .reduce((sum, b) => sum + b.amount, 0)
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bookings</h1>
        <p className="text-lg text-gray-600">Manage your property bookings</p>
      </div>

      {/* Statistiques des bookings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-blue-600">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-2xl font-bold text-brand-primary">${stats.totalRevenue}</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="search"
            placeholder="Search by guest name, property, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search Bookings"
          />
          
          <Input
            select
            options={[
              { value: "all", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "confirmed", label: "Confirmed" },
              { value: "completed", label: "Completed" },
              { value: "cancelled", label: "Cancelled" }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Filter by Status"
          />
        </div>
      </div>

      {/* Liste des bookings */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Guests
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{booking.guest}</div>
                        <div className="text-sm text-gray-500">{booking.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {booking.property}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(booking.checkIn)} - {formatDate(booking.checkOut)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {calculateNights(booking.checkIn, booking.checkOut)} nights
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {booking.guests}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-brand-primary hover:text-brand-secondary"
                        >
                          View
                        </button>
                        {booking.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleStatusChange(booking.id, "confirmed")}
                              className="text-green-600 hover:text-green-900"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusChange(booking.id, "cancelled")}
                              className="text-red-600 hover:text-red-900"
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4h6m-6 4h6M6 21V3a2 2 0 012-2h8a2 2 0 012 2v18l-4-2-4 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filters."
                : "Your property bookings will appear here."
              }
            </p>
          </div>
        )}
      </div>

      {/* Modal de détails de booking */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Guest Information</h3>
                  <p className="text-gray-700">{selectedBooking.guest}</p>
                  <p className="text-sm text-gray-500">{selectedBooking.email}</p>
                  <p className="text-sm text-gray-500">{selectedBooking.phone}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Property</h3>
                  <p className="text-gray-700">{selectedBooking.property}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Check-in</h3>
                    <p className="text-gray-700">{formatDate(selectedBooking.checkIn)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Check-out</h3>
                    <p className="text-gray-700">{formatDate(selectedBooking.checkOut)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Guests</h3>
                    <p className="text-gray-700">{selectedBooking.guests}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Total Amount</h3>
                    <p className="text-gray-700 font-semibold">${selectedBooking.amount}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">Status</h3>
                  <StatusBadge status={selectedBooking.status} />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  size="md"
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                  onClick={() => setSelectedBooking(null)}
                >
                  Close
                </Button>
                <Button size="md">
                  Contact Guest
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}