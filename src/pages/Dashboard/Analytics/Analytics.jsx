// src/pages/Dashboard/Analytics/Analytics.jsx
import React, { useState } from "react";
import Button from "../../../components/ui/Button/Button";
import Input from "../../../components/ui/Input/Input";
import './Analytics.css';
// Données mock pour les graphiques


const revenueData = [
  { month: "Jan", revenue: 2400, bookings: 12 },
  { month: "Feb", revenue: 3200, bookings: 16 },
  { month: "Mar", revenue: 2800, bookings: 14 },
  { month: "Apr", revenue: 4100, bookings: 22 },
  { month: "May", revenue: 3800, bookings: 19 },
  { month: "Jun", revenue: 4500, bookings: 25 }
];

const propertyPerformance = [
  { name: "Beautiful Villa in Marrakech", bookings: 45, revenue: 6750, rating: 4.8, occupancy: 85 },
  { name: "Cozy Apartment in Casablanca", bookings: 32, revenue: 2560, rating: 4.6, occupancy: 72 },
  { name: "Luxury Riad in Fes", bookings: 28, revenue: 5600, rating: 4.9, occupancy: 68 },
  { name: "Seaside Villa in Agadir", bookings: 38, revenue: 4560, rating: 4.7, occupancy: 79 }
];

const recentActivities = [
  { date: "2024-01-15", type: "booking", description: "New booking received for Villa Marrakech" },
  { date: "2024-01-14", type: "review", description: "5-star review submitted for Riad Fes" },
  { date: "2024-01-13", type: "payment", description: "Payment of $320 processed" },
  { date: "2024-01-12", type: "listing", description: "Villa Agadir listing updated" },
  { date: "2024-01-11", type: "booking", description: "Booking confirmed for Apartment Casablanca" },
  { date: "2024-01-10", type: "review", description: "4-star review submitted for Villa Marrakech" }
];

const activityIcons = {
  booking: "📅",
  review: "⭐",
  payment: "💳",
  listing: "🏠"
};

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalBookings = revenueData.reduce((sum, item) => sum + item.bookings, 0);
  const averageBookingValue = Math.round(totalRevenue / totalBookings);
  const bestPerformingProperty = propertyPerformance.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics</h1>
          <p className="text-lg text-gray-600">Track your business performance</p>
        </div>
        
        <div className="flex gap-3">
          <Input
            select
            options={[
              { value: "1month", label: "Last Month" },
              { value: "3months", label: "Last 3 Months" },
              { value: "6months", label: "Last 6 Months" },
              { value: "1year", label: "Last Year" }
            ]}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          />
          
          <Button size="md" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
              <p className="text-sm text-green-600 mt-1">↑ 12% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
              <p className="text-sm text-green-600 mt-1">↑ 8% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Booking Value</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageBookingValue)}</p>
              <p className="text-sm text-green-600 mt-1">↑ 5% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-gray-900">76%</p>
              <p className="text-sm text-red-600 mt-1">↓ 2% vs last period</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedMetric === 'revenue' 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedMetric('bookings')}
                className={`px-3 py-1 text-sm rounded-lg ${
                  selectedMetric === 'bookings' 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Bookings
              </button>
            </div>
          </div>
          
          <div className="h-64 flex items-end justify-between bg-gray-50 rounded-lg p-4">
            {revenueData.map((data, index) => {
              const value = selectedMetric === 'revenue' ? data.revenue : data.bookings;
              const maxValue = selectedMetric === 'revenue' 
                ? Math.max(...revenueData.map(d => d.revenue))
                : Math.max(...revenueData.map(d => d.bookings));
              const height = (value / maxValue) * 200;
              
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div
                    className="bg-brand-primary rounded-t w-8 transition-all duration-300 hover:bg-brand-secondary"
                    style={{ height: `${height}px` }}
                    title={`${data.month}: ${selectedMetric === 'revenue' ? formatCurrency(value) : value}`}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Property Performance */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Property Performance</h2>
          <div className="space-y-4">
            {propertyPerformance.map((property, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900 text-sm">{property.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm text-gray-600">{property.rating}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Bookings</p>
                    <p className="font-semibold text-gray-900">{property.bookings}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Revenue</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(property.revenue)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Occupancy</p>
                    <p className="font-semibold text-gray-900">{property.occupancy}%</p>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-brand-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${property.occupancy}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Best Performing Property */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Performer</h2>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-2">{bestPerformingProperty.name}</h3>
            <p className="text-2xl font-bold text-brand-primary mb-1">
              {formatCurrency(bestPerformingProperty.revenue)}
            </p>
            <p className="text-sm text-gray-600">Total revenue</p>
            
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-semibold text-gray-900">{bestPerformingProperty.bookings}</p>
                <p className="text-xs text-gray-600">Bookings</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{bestPerformingProperty.occupancy}%</p>
                <p className="text-xs text-gray-600">Occupancy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-lg">{activityIcons[activity.type]}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}