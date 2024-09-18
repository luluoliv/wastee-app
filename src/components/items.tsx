
export interface Comment {
    user: string;
    comment: string;
    date: string;
    time: string;
    rating: number;
}

export interface Location {
    state: string;
    city: string;
    neighborhood: string;
}

export interface ItemData {
    id: string;
    images: string[];
    title: string;
    originalPrice: string;
    discountedPrice?: string;
    rate?: string;
    seller: string;
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
        seller: "1",
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "Smartphones",
        description:
            "O Smartphone EcoSmart Recondicionado é a escolha perfeita.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat lacus. Vestibulum lacus mauris, tincidunt eu pellentesque at, posuere sit amet lorem. Suspendisse cursus leo cursus velit tempus, sed eleifend leo convallis. Integer feugiat erat leo, non consequat erat maximus sed. Donec lectus diam, imperdiet id vestibulum a, interdum et est. Maecenas facilisis massa sed tortor ultrices tincidunt. Integer lobortis neque est, posuere sodales erat auctor in. Pellentesque id massa tellus. Donec ex lacus, auctor in nibh nec, congue hendrerit augue",
        favorited: true,
        comments: [
            {
                user: "Ana",
                comment:
                    "Ótimo custo-benefício! Eu tinha um desse, mas quebrou e o conserto era muito caro, então ou eu comprava outro ou eu pagava, decidi comprar outro no melhor aplicativo possível!",
                date: "2024-09-10",
                time: "14:35:22",
                rating: 4,
            },
            {
                user: "Carlos",
                comment:
                    "Chegou em perfeito estado. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat lacus. Vestibulum lacus mauris, tincidunt eu pellentesque at, posuere sit amet lorem. Suspendisse cursus leo cursus velit tempus, sed eleifend leo convallis. Integer feugiat erat leo, non consequat erat maximus sed. Donec lectus diam, imperdiet id vestibulum a, interdum et est. Maecenas facilisis massa sed tortor ultrices tincidunt. Integer lobortis neque est, posuere sodales erat auctor in. Pellentesque id massa tellus. Donec ex lacus, auctor in nibh nec, congue hendrerit augue",
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
        seller: "1",
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "Smartphones",
        description:
            "O modelo 2023 do EcoSmart, com as mais recentes inovações tecnológicas. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat lacus. Vestibulum lacus mauris, tincidunt eu pellentesque at, posuere sit amet lorem. Suspendisse cursus leo cursus velit tempus, sed eleifend leo convallis. Integer feugiat erat leo, non consequat erat maximus sed. Donec lectus diam, imperdiet id vestibulum a, interdum et est. Maecenas facilisis massa sed tortor ultrices tincidunt. Integer lobortis neque est, posuere sodales erat auctor in. Pellentesque id massa tellus. Donec ex lacus, auctor in nibh nec, congue hendrerit augue.",
        favorited: false,
        comments: [
            {
                user: "João",
                comment:
                    "Muito bom, recomendo. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                date: "2024-09-09",
                time: "10:25:35",
                rating: 4,
            },
            {
                user: "Laura",
                comment:
                    "Excelente qualidade! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut consequat lacus. Vestibulum lacus mauris, tincidunt eu pellentesque at, posuere sit amet lorem. Suspendisse cursus leo cursus velit tempus, sed eleifend leo convallis. Integer feugiat erat leo, non consequat erat maximus sed. Donec lectus diam, imperdiet id vestibulum a, interdum et est. Maecenas facilisis massa sed tortor ultrices tincidunt. Integer lobortis neque est, posuere sodales erat auctor in. Pellentesque id massa tellus.",
                date: "2024-09-11",
                time: "17:08:29",
                rating: 4,
            },
        ],
    },
];
