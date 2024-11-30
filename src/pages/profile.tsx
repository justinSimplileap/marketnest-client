// src/pages/profile.tsx
import Footer from '@/components/home/Footer';
import MainLayout from '@/components/layout/MainLayout';
import React from 'react';

const Profile: React.FC = () => {
  return (
    <MainLayout>
      <div className="customWidth  mx-auto px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-medium mb-4">Your Information</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-medium">Name:</span>
              <span>John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email:</span>
              <span>johndoe@example.com</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone:</span>
              <span>+1 123 456 7890</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </MainLayout>
  );
};

export default Profile;
