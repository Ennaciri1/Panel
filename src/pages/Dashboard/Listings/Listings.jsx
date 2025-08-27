// src/pages/Dashboard/Listings/Listings.jsx
import React, { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import Card from "../../../components/ui/Card/Card";

const mockListings = [
  {
    id: 1,
    title: "Beautiful Villa in Marrakech",
    image: { src: "/assets/images/villa1.jpg", alt: "Villa Marrakech" },
    fields: [
      { label: "Location", value: "Marrakech" },
      { label: "Price", value: "$150/night" },
      { label: "Guests", value: "6" },
      { label: "Status", value: "Active" },
      { label: "Bookings", value: "12 this month" },
      { label: "Rating", value: "4.8/5" }
    ]
  },
  {
    id: 2,
    title: "Cozy Apartment in Casablanca",
    image: { src: "/assets/images/apartment1.jpg", alt: "Apartment Casablanca" },
    fields: [
      { label: "Location", value: "Casablanca" },
      { label: "Price", value: "$80/night" },
      { label: "Guests", value: "4" },
      { label: "Status", value: "Active" },
      { label: "Bookings", value: "8 this month" },
      { label: "Rating", value: "4.6/5" }
    ]
  },
  {
    id: 3,
    title: "Luxury Riad in Fes",
    image: { src: "/assets/images/riad1.jpg", alt: "Riad Fes" },
    fields: [
      { label: "Location", value: "Fes" },
      { label: "Price", value: "$200/night" },
      { label: "Guests", value: "8" },
      { label: "Status", value: "Inactive" },
      { label: "Bookings", value: "0 this month" },
      { label: "Rating", value: "4.9/5" }
    ]
  },
  {
    id: 4,
    title: "Seaside Villa in Agadir",
    image: { src: "/assets/images/villa2.jpg", alt: "Villa Agadir" },
    fields: [
      { label: "Location", value: "Agadir" },
      { label: "Price", value: "$120/night" },
      { label: "Guests", value: "5" },
      { label: "Status", value: "Active" },
      { label: "Bookings", value: "15 this month" },
      { label: "Rating", value: "4.7/5" }
    ]
  }
];

export default function Listings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Filtrer les listings
  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
      listing.fields.find(f => f.label === "Status")?.value.toLowerCase() === statusFilter.toLowerCase();
    const matchesLocation = locationFilter === "all" || 
      listing.fields.find(f => f.label === "Location")?.value.toLowerCase() === locationFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const handleEditListing = (listingId) => {
    console.log("Edit listing", listingId);
    // Ici tu peux ouvrir un modal ou naviguer vers une page d'édition
  };

  const handleAddListing = () => {
    console.log("Add new listing");
    // Ici tu peux ouvrir un modal ou naviguer vers une page de création
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Listings</h1>
          <p className="text-lg text-gray-600">Manage your property listings</p>
        </div>
        <Button size="lg" onClick={handleAddListing}>
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Listing
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search listings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            label="Search"
          />
          
          <Input
            select
            options={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" }
            ]}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          />
          
          <Input
            select
            options={[
              { value: "all", label: "All Locations" },
              { value: "marrakech", label: "Marrakech" },
              { value: "casablanca", label: "Casablanca" },
              { value: "fes", label: "Fes" },
              { value: "agadir", label: "Agadir" }
            ]}
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            label="Location"
          />
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Total Listings</p>
          <p className="text-2xl font-bold text-gray-900">{mockListings.length}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {mockListings.filter(l => l.fields.find(f => f.label === "Status")?.value === "Active").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Inactive</p>
          <p className="text-2xl font-bold text-red-600">
            {mockListings.filter(l => l.fields.find(f => f.label === "Status")?.value === "Inactive").length}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow">
          <p className="text-sm text-gray-600">Avg Rating</p>
          <p className="text-2xl font-bold text-yellow-600">4.7</p>
        </div>
      </div>

      {/* Grille des listings */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              title={listing.title}
              image={listing.image}
              fields={listing.fields}
              onEdit={() => handleEditListing(listing.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow p-12 text-center">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No listings found</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || statusFilter !== "all" || locationFilter !== "all" 
              ? "Try adjusting your search or filters."
              : "Get started by adding your first listing."
            }
          </p>
          {!searchTerm && statusFilter === "all" && locationFilter === "all" && (
            <Button onClick={handleAddListing}>
              Add Your First Listing
            </Button>
          )}
        </div>
      )}
    </div>
  );
}