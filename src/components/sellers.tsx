import { Comment, Location } from "./items";

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
        location: {
            state: "São Paulo",
            city: "São Paulo",
            neighborhood: "Casa Verde",
        },
    },
];
