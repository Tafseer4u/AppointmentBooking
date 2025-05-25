import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { getServiceCategories } from '../data/services';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const categories = getServiceCategories();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-500 to-teal-700 pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Book Your Appointments With Ease
            </h1>
            <p className="text-xl mb-8 text-teal-100">
              Simple, fast, and convenient scheduling for all your service needs.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate('/services')}
              className="animate-pulse"
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Choose a Service</h3>
              <p className="text-gray-600">
                Browse through our range of services and select the one that meets your needs.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pick a Time Slot</h3>
              <p className="text-gray-600">
                Select from available time slots that work with your schedule.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 text-center transition-transform hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Confirm Booking</h3>
              <p className="text-gray-600">
                Fill in your details and confirm your appointment with just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div
                key={category}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer"
                onClick={() => navigate(`/services?category=${category}`)}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  <p className="text-gray-600 mb-4">
                    Explore our range of {category.toLowerCase()} services
                  </p>
                  <Button variant="outline" size="sm">
                    View Services
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The booking process was so simple and fast. I was able to schedule my appointment in under a minute!"
              </p>
              <p className="font-medium">- Sarah Johnson</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "I love being able to see all available time slots at once. Makes finding the perfect appointment time easy."
              </p>
              <p className="font-medium">- Michael Chen</p>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-1 mb-4 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "The reminder feature is amazing. I never miss an appointment now thanks to this system!"
              </p>
              <p className="font-medium">- Jessica Williams</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-indigo-600">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Book Your Appointment?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Experience the easiest way to schedule services with your favorite providers.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/services')}
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            Book Now
          </Button>
        </div>
      </section>
    </div>
  );
};