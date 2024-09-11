export interface Comment {
  user: string;
  comment: string;
  date: string;
}

export interface ItemData {
  id: string;
  images: string[];
  title: string;
  originalPrice: string;
  discountedPrice?: string;
  rate?: string;
  seller: string;
  description: string;
  comments?: Comment[];
  category?: string;
}

export const items: ItemData[] = [
  {
    id: "1",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALQl2ZpY7MusyQ-M-WXgG_LPT95bMivC9jw&s",
      "https://via.placeholder.com/400x300?text=Imagem+2",
    ],
    title: "Smartphone EcoSmart Recondicionado",
    originalPrice: "R$599,90",
    discountedPrice: "",
    rate: "4.2",
    seller: "João Silva",
    category: "Smartphones",
    description: "Um smartphone recondicionado com excelente desempenho e bateria duradoura.",
    comments: [
      { user: "Ana", comment: "Ótimo custo-benefício!", date: "2024-09-10" },
      { user: "Carlos", comment: "Chegou em perfeito estado.", date: "2024-09-11" },
    ],
  },
  {
    id: "2",
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPSGuWGjnjBVG2_nkhMG80QrhKPy8MrqXpLA&s",
      "https://via.placeholder.com/400x300?text=Imagem+2",
    ],
    title: "Smartphone EcoSmart 2023",
    originalPrice: "R$699,90",
    discountedPrice: "",
    rate: "4.3",
    category: "Smartphones",
    seller: "Maria Oliveira",
    description: "O modelo 2023 do EcoSmart, com as mais recentes inovações tecnológicas.",
    comments: [
      { user: "João", comment: "Muito bom, recomendo.", date: "2024-09-09" },
      { user: "Laura", comment: "Excelente qualidade!", date: "2024-09-11" },
    ],
  },
];