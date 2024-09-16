export interface Comment {
    user: string;
    comment: string;
    date: string;
    time: string;
    rating: number;
}
export interface Seller {
    name: string;
    products: ItemData[];
    photo: string;
    rating: number;
    comments: Comment[]
    location: Location;
}

export interface Location {
    state: string,
    city: string,
    neighborhood: string,
}

export interface ItemData {
    id: string;
    images: string[];
    title: string;
    originalPrice: string;
    discountedPrice?: string;
    rate?: string;
    seller: Seller;
    location: Location;
    description: string;
    comments?: Comment[];
    category?: string;
    favorited?: boolean;
    ratingsCount?: number;
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
        ratingsCount: 10,
        seller: {
            name: "Luara Lima",
            photo: "https://media.gettyimages.com/id/1317804578/pt/foto/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=IcBzSV04zCeMVk3kty-1RtusxibnF2pxD32QgBMzVu8=",
            rating: 4.2,
            products: [],
            comments: [
                {
                    user: "Ana",
                    comment: "Ótimo custo-benefício!",
                    date: "2024-09-10",
                    time: "14:35:22",
                    rating: 4,
                },
                {
                    user: "Carlos",
                    comment: "Chegou em perfeito estado.",
                    date: "2024-09-11",
                    time: "09:12:47",
                    rating: 4,
                },
            ],
            location: {
                state: "São Paulo",
                city: "São Paulo",
                neighborhood: "Casa Verde",
            },
        },
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "Smartphones",
        description: "O Smartphone EcoSmart Recondicionado é a escolha perfeita...",
        favorited: true,
        comments: [
            {
                user: "Ana",
                comment: "Ótimo custo-benefício!",
                date: "2024-09-10",
                time: "14:35:22",
                rating: 4,
            },
            {
                user: "Carlos",
                comment: "Chegou em perfeito estado.",
                date: "2024-09-11",
                time: "09:12:47",
                rating: 4,
            },
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
        ratingsCount: 10,
        seller: {
            name: "Maria Oliveira",
            photo: "",
            rating: 4.3,
            products: [],
            comments: [
                {
                    user: "João",
                    comment: "Muito bom, recomendo.",
                    date: "2024-09-09",
                    time: "10:25:35",
                    rating: 4,
                },
                {
                    user: "Laura",
                    comment: "Excelente qualidade!",
                    date: "2024-09-11",
                    time: "17:08:29",
                    rating: 4,
                },
            ],
            location: {
                state: "São Paulo",
                city: "São Paulo",
                neighborhood: "Casa Verde",
            },
        },
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "Smartphones",
        description: "O modelo 2023 do EcoSmart, com as mais recentes inovações tecnológicas.",
        favorited: false,
        comments: [
            {
                user: "João",
                comment: "Muito bom, recomendo.",
                date: "2024-09-09",
                time: "10:25:35",
                rating: 4,
            },
            {
                user: "Laura",
                comment: "Excelente qualidade!",
                date: "2024-09-11",
                time: "17:08:29",
                rating: 4,
            },
        ],
    },
];

