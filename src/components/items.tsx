export interface ItemData {
  imageUrl: string;
  title: string;
  originalPrice: string;
  discountedPrice?: string;
  rate?: string;
  seller: string;
}

export const items = [
  {
    id: "1",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALQl2ZpY7MusyQ-M-WXgG_LPT95bMivC9jw&s",
    title: "Smartphone EcoSmart Recondicionado",
    originalPrice: "R$599,90",
    discountedPrice: "",
    rate: "4.2",
    seller: "João Silva",
  },
  {
    id: "2",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSGuWGjnjBVG2_nkhMG80QrhKPy8MrqXpLA&s",
    title: "Smartphone EcoSmart 2023",
    originalPrice: "R$699,90",
    discountedPrice: "",
    rate: "4.3",

    seller: "Maria Oliveira",
  },
  {
    id: "3",
    imageUrl: "https://images.samsung.com/is/image/samsung/p6pim/br/2401/gallery/br-galaxy-s24-490026-sm-s921blbkzto-thumb-539372346",
    title: "Smartphone EcoSmart Pro",
    originalPrice: "R$799,90",
    discountedPrice: "",
    rate: "5.0",
    seller: "Pedro Souza",
  },
  {
    id: "4",
    imageUrl: "https://samsungbrshop.vtexassets.com/arquivos/ids/187513/SM-A536_Galaxy-A53-5G_Awesome-Black_Front.jpg?v=637838195729130000",
    title: "Smartphone EcoSmart Pro",
    originalPrice: "R$799,90",
    discountedPrice: "R$649,90",
    rate: "2.2",
    seller: "Pedro Souza",
  },
  {
    id: "5",
    imageUrl: "https://via.placeholder.com/150?text=Item+3",
    title: "Smartphone EcoSmart Pro",
    originalPrice: "R$799,90",
    discountedPrice: "R$649,90",
    seller: "Pedro Souza",
  },
  {
    id: "6",
    imageUrl: "https://via.placeholder.com/150?text=Item+3",
    title: "Smartphone EcoSmart Pro",
    originalPrice: "R$799,90",
    discountedPrice: "R$649,90",
    rate: "1.0",
    seller: "Pedro Souza",
  },
];
