
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
        discountedPrice: "R$549,90",
        rate: "4.2",
        seller: "1",
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "1",
        description:
            "O Smartphone EcoSmart Recondicionado é a escolha perfeita para quem quer tecnologia de ponta a um preço acessível. O modelo conta com tela HD de 6.5 polegadas, 64GB de armazenamento interno, câmera traseira de 12MP e processador octa-core. Ideal para quem busca desempenho e economia de forma sustentável. Além disso, o produto passou por uma inspeção rigorosa para garantir a qualidade e durabilidade.",
        favorited: true,
        comments: [
            {
                user: "Ana",
                comment:
                    "Ótimo custo-benefício! Eu tinha um desse, mas quebrou e o conserto era muito caro. Decidi comprar este recondicionado e estou muito satisfeita! Funciona perfeitamente.",
                date: "2024-09-10",
                time: "14:35:22",
                rating: 4,
            },
            {
                user: "Carlos",
                comment:
                    "Chegou em perfeito estado, sem sinais de uso. Parece novo e até agora não tive nenhum problema. Recomendo para quem quer economizar sem perder qualidade.",
                date: "2024-09-11",
                time: "09:12:47",
                rating: 5,
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
        discountedPrice: "R$659,90",
        rate: "4.3",
        seller: "1",
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
        category: "1",
        description:
            "O modelo 2023 do EcoSmart traz as mais recentes inovações tecnológicas, incluindo uma tela OLED de 6.7 polegadas, 128GB de armazenamento, câmera tripla de 48MP e bateria de 5000mAh com carregamento rápido. Perfeito para quem busca uma experiência fluida e moderna no uso diário. Além disso, o EcoSmart 2023 é compatível com a rede 5G, proporcionando maior velocidade de navegação.",
        favorited: false,
        comments: [
            {
                user: "João",
                comment:
                    "Muito bom, recomendo para quem quer um smartphone rápido e com bom custo-benefício. A bateria dura bastante e o carregamento é realmente rápido.",
                date: "2024-09-09",
                time: "10:25:35",
                rating: 4,
            },
            {
                user: "Laura",
                comment:
                    "Excelente qualidade! A câmera é incrível, principalmente as fotos noturnas. A tela é muito nítida e as cores são vibrantes. Vale a pena o investimento.",
                date: "2024-09-11",
                time: "17:08:29",
                rating: 5,
            },
        ],
    },
    {
        id: "3",
        images: [
            "https://via.placeholder.com/400x300?text=Imagem+1",
            "https://via.placeholder.com/400x300?text=Imagem+2",
        ],
        title: "Notebook EcoLaptop 2022",
        originalPrice: "R$2.999,90",
        discountedPrice: "R$2.799,90",
        rate: "4.5",
        seller: "2",
        location: {
            state: "Minas Gerais",
            city: "Belo Horizonte",
            neighborhood: "Savassi",
        },
        category: "3",
        description:
            "O EcoLaptop 2022 é um notebook versátil e potente, ideal para uso profissional e acadêmico. Com um processador Intel i7 de 10ª geração, 16GB de RAM, 512GB SSD e tela Full HD de 15.6 polegadas, oferece excelente desempenho para multitarefas e programas pesados. Além disso, sua estrutura fina e leve facilita o transporte, sendo ideal para quem está sempre em movimento.",
        favorited: true,
        comments: [
            {
                user: "Mariana",
                comment:
                    "Ótimo para trabalho e estudos. O desempenho é incrível, consigo abrir vários programas ao mesmo tempo sem travar.",
                date: "2024-09-12",
                time: "13:45:00",
                rating: 5,
            },
            {
                user: "Pedro",
                comment:
                    "Muito satisfeito com o produto. É leve e a bateria dura o dia todo, mesmo com uso intenso. Recomendo.",
                date: "2024-09-13",
                time: "09:30:00",
                rating: 5,
            },
        ],
    },
    {
        id: "4",
        images: [
            "https://via.placeholder.com/400x300?text=Imagem+1",
            "https://via.placeholder.com/400x300?text=Imagem+2",
        ],
        title: "Smartwatch EcoWatch Series 5",
        originalPrice: "R$1.299,90",
        discountedPrice: "R$1.149,90",
        rate: "4.7",
        seller: "3",
        location: {
            state: "Rio de Janeiro",
            city: "Rio de Janeiro",
            neighborhood: "Copacabana",
        },
        category: "1",
        description:
            "O EcoWatch Series 5 é o acessório perfeito para quem busca tecnologia e estilo em um só produto. Equipado com monitoramento de frequência cardíaca, GPS, e resistência à água, este smartwatch é ideal para acompanhar suas atividades diárias e manter-se conectado com o mundo.",
        favorited: false,
        comments: [
            {
                user: "Guilherme",
                comment:
                    "Funciona muito bem, a bateria dura bastante e as funcionalidades são bem úteis para o dia a dia. Recomendo!",
                date: "2024-09-10",
                time: "11:00:00",
                rating: 4,
            },
            {
                user: "Beatriz",
                comment:
                    "Superou minhas expectativas! Uso para academia e corridas, e ele registra tudo com precisão.",
                date: "2024-09-11",
                time: "14:20:00",
                rating: 5,
            },
        ],
    },
    {
        id: "5",
        images: [
            "https://via.placeholder.com/400x300?text=Imagem+1",
            "https://via.placeholder.com/400x300?text=Imagem+2",
        ],
        title: "Fone de Ouvido EcoPods Pro",
        originalPrice: "R$799,90",
        discountedPrice: "R$749,90",
        rate: "4.6",
        seller: "4",
        location: {
            state: "Bahia",
            city: "Salvador",
            neighborhood: "Barra",
        },
        category: "6",
        description:
            "Os EcoPods Pro oferecem uma experiência sonora imersiva com cancelamento de ruído ativo e som de alta qualidade. Com bateria de longa duração e um design compacto, eles são perfeitos para o uso diário e viagens.",
        favorited: true,
        comments: [
            {
                user: "Lucas",
                comment:
                    "Excelente qualidade de som e o cancelamento de ruído é muito eficiente. Vale a pena o investimento.",
                date: "2024-09-12",
                time: "16:10:00",
                rating: 5,
            },
            {
                user: "Sofia",
                comment:
                    "Muito confortável e a bateria dura bastante. Uso para trabalhar e ouvir música.",
                date: "2024-09-13",
                time: "08:45:00",
                rating: 4,
            },
        ],
    },
];
