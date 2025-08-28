// src/pages/Dashboard/Settings/Settings.jsx
import React, { useState } from "react";
import Input from "../../../components/ui/Input/Input";
import Button from "../../../components/ui/Button/Button";
import { useAuth } from "../../../hooks/useAuth";
import './Settings.css';
export default function Settings() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    address: "",
    city: "",
    country: "Morocco"
  });

  const [notifications, setNotifications] = useState({
    emailBookings: true,
    emailReviews: true,
    emailPayments: true,
    emailMarketing: false,
    pushBookings: true,
    pushReviews: false,
    pushPayments: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotifications(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Saving profile:", formData);
    setIsLoading(false);
    
    // Afficher un message de succès (tu peux ajouter un toast ici)
    alert("Profile updated successfully!");
  };

  const handleNotificationsSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Saving notifications:", notifications);
    setIsLoading(false);
    
    alert("Notification preferences updated!");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Changing password");
    setIsLoading(false);
    setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    
    alert("Password changed successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      console.log("Deleting account");
      logout();
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-lg text-gray-600">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
                
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                
                <Input
                  label="Company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name"
                />
              </div>

              <Input
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
                
                <Input
                  label="Country"
                  select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  options={[
                    { value: "Morocco", label: "Morocco" },
                    { value: "France", label: "France" },
                    { value: "Spain", label: "Spain" },
                    { value: "UK", label: "United Kingdom" },
                    { value: "US", label: "United States" },
                    { value: "Canada", label: "Canada" }
                  ]}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
            
            <form onSubmit={handleNotificationsSubmit}>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailBookings"
                        checked={notifications.emailBookings}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">New bookings</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailReviews"
                        checked={notifications.emailReviews}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">New reviews</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailPayments"
                        checked={notifications.emailPayments}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">Payment updates</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="emailMarketing"
                        checked={notifications.emailMarketing}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">Marketing emails</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pushBookings"
                        checked={notifications.pushBookings}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">New bookings</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pushReviews"
                        checked={notifications.pushReviews}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">New reviews</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="pushPayments"
                        checked={notifications.pushPayments}
                        onChange={handleNotificationChange}
                        className="w-4 h-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded"
                      />
                      <span className="ml-3 text-sm text-gray-700">Payment updates</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your current password"
                required
              />
              
              <Input
                label="New Password"
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter your new password"
                required
              />
              
              <Input
                label="Confirm New Password"
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm your new password"
                required
              />

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? "Changing..." : "Change Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Actions</h2>
            
            <div className="space-y-4">
              <Button 
                size="md" 
                className="w-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                onClick={() => window.print()}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v4h3a2 2 0 012 2v5a2 2 0 01-2 2H2a2 2 0 01-2-2V10a2 2 0 012-2h3V4zM4 10h12v5H4v-5zM9 4v4h2V4H9z" clipRule="evenodd" />
                </svg>
                Export Data
              </Button>
              
              <Button 
                size="md" 
                className="w-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                onClick={() => alert("Two-factor authentication setup would open here")}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Setup 2FA
              </Button>
              
              <Button 
                size="md" 
                className="w-full bg-red-100 text-red-700 hover:bg-red-200"
                onClick={handleDeleteAccount}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Delete Account
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Info</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Member since</span>
                <span className="text-sm font-medium text-gray-900">January 2024</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Account type</span>
                <span className="text-sm font-medium text-gray-900">Premium</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Properties</span>
                <span className="text-sm font-medium text-gray-900">8 active</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total bookings</span>
                <span className="text-sm font-medium text-gray-900">124</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Support</h2>
            
            <div className="space-y-3">
              <a 
                href="mailto:support@ajiapp.com"
                className="block p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                📧 Email Support
              </a>
              
              <a 
                href="tel:+212-XXX-XXXX"
                className="block p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                📞 Phone Support
              </a>
              
              <a 
                href="#"
                className="block p-3 text-sm text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Help center would open here");
                }}
              >
                📚 Help Center
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}