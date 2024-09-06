// itemData.js

export interface ItemData {
    imageUrl: string;
    title: string;
    originalPrice: string;
    discountedPrice: string;
    seller: string;
  }

export const items = [
    {
      id: '1',
      imageUrl: 'https://via.placeholder.com/150?text=Item+1', // Replace with actual image URL
      title: 'Smartphone EcoSmart Recondicionado',
      originalPrice: 'R$599,90',
      discountedPrice: 'R$449,90',
      seller: 'João Silva',
    },
    {
      id: '2',
      imageUrl: 'https://via.placeholder.com/150?text=Item+2',
      title: 'Smartphone EcoSmart 2023',
      originalPrice: 'R$699,90',
      discountedPrice: 'R$549,90',
      seller: 'Maria Oliveira',
    },
    {
      id: '3',
      imageUrl: 'https://via.placeholder.com/150?text=Item+3',
      title: 'Smartphone EcoSmart Pro',
      originalPrice: 'R$799,90',
      discountedPrice: 'R$649,90',
      seller: 'Pedro Souza',
    },
    {
      id: '4',
      imageUrl: 'https://via.placeholder.com/150?text=Item+3',
      title: 'Smartphone EcoSmart Pro',
      originalPrice: 'R$799,90',
      discountedPrice: 'R$649,90',
      seller: 'Pedro Souza',
    },
    {
      id: '3',
      imageUrl: 'https://via.placeholder.com/150?text=Item+3',
      title: 'Smartphone EcoSmart Pro',
      originalPrice: 'R$799,90',
      discountedPrice: 'R$649,90',
      seller: 'Pedro Souza',
    },
    {
      id: '4',
      imageUrl: 'https://via.placeholder.com/150?text=Item+3',
      title: 'Smartphone EcoSmart Pro',
      originalPrice: 'R$799,90',
      discountedPrice: 'R$649,90',
      seller: 'Pedro Souza',
    },
    // Add more items as needed
  ];
  