import { Comment, Location } from "../data/items";

export interface Seller {
    id: string;
    name: string;
    photo: string;
    rating: number;
    comments: Comment[];
    location: Location;
}

export const sellers: Seller[] = [
    {
        id: "1",
        name: "Luara Lima",
        photo: "https://media.gettyimages.com/id/1317804578/pt/foto/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=IcBzSV04zCeMVk3kty-1RtusxibnF2pxD32QgBMzVu8=",
        rating: 4.2,
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
    {
        id: "2",
        name: "Maria Oliveira",
        photo: "https://media.gettyimages.com/id/1317804578/pt/foto/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=gi&k=20&c=IcBzSV04zCeMVk3kty-1RtusxibnF2pxD32QgBMzVu8=",
        rating: 4.3,
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
    {
        id: "3",
        name: "Ricardo Santos",
        photo: "https://media.gettyimages.com/id/1317804580/pt/foto/male-businessman-smiling-in-an-office.jpg?s=612x612&w=gi&k=20&c=pLhO3pPoY7GJW8lDgZwG5PhCWGoOU8G4O9Sh4R9zd3o=",
        rating: 4.5,
        comments: [
            {
                user: "Fernanda",
                comment: "Produto de alta qualidade, recomendo!",
                date: "2024-09-12",
                time: "10:45:00",
                rating: 5,
            },
            {
                user: "Gustavo",
                comment: "Excelente atendimento e rapidez na entrega.",
                date: "2024-09-14",
                time: "16:20:10",
                rating: 5,
            },
        ],
        location: {
            state: "Rio de Janeiro",
            city: "Rio de Janeiro",
            neighborhood: "Copacabana",
        },
    },
    {
        id: "4",
        name: "Ana Costa",
        photo: "https://media.gettyimages.com/id/1317804581/pt/foto/female-businesswoman-in-the-office.jpg?s=612x612&w=gi&k=20&c=ZkmIJjSnETCgl4US9hb-nyG0rD0QlG-XD7k_Cy-G72U=",
        rating: 4.7,
        comments: [
            {
                user: "Marcelo",
                comment: "Adorei o produto, voltarei a comprar!",
                date: "2024-09-13",
                time: "11:30:00",
                rating: 5,
            },
            {
                user: "Patrícia",
                comment: "A qualidade do produto é surpreendente!",
                date: "2024-09-15",
                time: "15:00:00",
                rating: 5,
            },
        ],
        location: {
            state: "Minas Gerais",
            city: "Belo Horizonte",
            neighborhood: "Savassi",
        },
    },
    {
        id: "5",
        name: "Felipe Almeida",
        photo: "https://media.gettyimages.com/id/1317804582/pt/foto/male-businessman-at-his-office.jpg?s=612x612&w=gi&k=20&c=Pi1W72gLZuh6t5Y1v9U1sMLHG8wOcNp-fI_HOaj2lhM=",
        rating: 4.6,
        comments: [
            {
                user: "Juliana",
                comment: "Entregou antes do prazo e o produto é excelente!",
                date: "2024-09-16",
                time: "09:00:00",
                rating: 5,
            },
            {
                user: "Rafael",
                comment: "Muito bom, mas poderia ter mais opções de pagamento.",
                date: "2024-09-17",
                time: "14:15:00",
                rating: 4,
            },
        ],
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Itaim Bibi",
        },
    },
];
