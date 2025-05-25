import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardImage, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { services, getServiceById, getServiceCategories } from '../data/services';
import { formatCurrency } from '../utils/dates';
import { Service } from '../types';
import { useAppointments } from '../context/AppointmentContext';

export const Services: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedService } = useAppointments();
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [filteredServices, setFilteredServices] = useState<Service[]>(services);
  const categories = getServiceCategories();
  
  // Extract category from URL query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get('category');
    if (category && categories.includes(category)) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory('');
    }
  }, [location.search, categories]);
  
  // Filter services by category
  useEffect(() => {
    if (selectedCategory) {
      setFilteredServices(services.filter(service => service.category === selectedCategory));
    } else {
      setFilteredServices(services);
    }
  }, [selectedCategory]);
  
  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      // Clear filter if same category is clicked
      setSelectedCategory('');
      navigate('/services');
    } else {
      setSelectedCategory(category);
      navigate(`/services?category=${category}`);
    }
  };
  
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    navigate('/booking');
  };
  
  return (
    <div className="container mx-auto px-4 md:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose from our range of professional services tailored to meet your needs
        </p>
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <Button
          variant={selectedCategory === '' ? 'primary' : 'outline'}
          onClick={() => handleCategoryClick('')}
        >
          All Services
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline'}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <Card key={service.id} interactive>
            <CardImage src={service.image} alt={service.name} />
            <CardContent className="pt-6">
              <CardTitle>{service.name}</CardTitle>
              <CardDescription className="mt-2">{service.description}</CardDescription>
              
              <div className="flex items-center mt-4 text-gray-600">
                <Clock size={18} className="mr-1" />
                <span className="text-sm">{service.duration} minutes</span>
                <DollarSign size={18} className="ml-4 mr-1" />
                <span className="text-sm font-medium">{formatCurrency(service.price)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button fullWidth onClick={() => handleServiceSelect(service)}>
                Book Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No services found in this category.</p>
        </div>
      )}
    </div>
  );
};