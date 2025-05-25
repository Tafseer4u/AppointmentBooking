import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    name: 'Hair Cut',
    description: 'Professional hair cutting service tailored to your preferences.',
    duration: 30,
    price: 35,
    category: 'Hair',
    image: 'https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '2',
    name: 'Hair Coloring',
    description: 'Transform your look with our premium hair coloring services.',
    duration: 120,
    price: 120,
    category: 'Hair',
    image: 'https://images.pexels.com/photos/3993453/pexels-photo-3993453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '3',
    name: 'Facial Treatment',
    description: 'Rejuvenating facial to cleanse, exfoliate and nourish your skin.',
    duration: 60,
    price: 85,
    category: 'Skin',
    image: 'https://images.pexels.com/photos/3985338/pexels-photo-3985338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '4',
    name: 'Massage Therapy',
    description: 'Relaxing massage to reduce stress and relieve muscle tension.',
    duration: 60,
    price: 90,
    category: 'Wellness',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '5',
    name: 'Manicure',
    description: 'Professional nail care and polish application.',
    duration: 45,
    price: 40,
    category: 'Nails',
    image: 'https://images.pexels.com/photos/4210341/pexels-photo-4210341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: '6',
    name: 'Pedicure',
    description: 'Luxurious foot treatment including scrub, massage and polish.',
    duration: 60,
    price: 50,
    category: 'Nails',
    image: 'https://images.pexels.com/photos/3997979/pexels-photo-3997979.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  }
];

export const getServiceById = (id: string): Service | undefined => {
  return services.find(service => service.id === id);
};

export const getServiceCategories = (): string[] => {
  const categories = new Set(services.map(service => service.category));
  return Array.from(categories);
};

export const getServicesByCategory = (category: string): Service[] => {
  return services.filter(service => service.category === category);
};