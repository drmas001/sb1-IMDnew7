import React from 'react';
import { ArrowLeft, Info, Users, Cog, BarChart, Shield } from 'lucide-react';
import Footer from '../components/Footer';
import Logo from '../components/Logo';

const AboutPage: React.FC = () => {
  const handleBack = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <button
        onClick={handleBack}
        className="absolute top-8 left-8 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-12">
            <Logo size="medium" className="text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-900">About IMD-Care</h1>
          </div>

          <div className="bg-white shadow-sm rounded-xl overflow-hidden">
            {/* Rest of the component remains unchanged */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;