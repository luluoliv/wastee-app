export interface Category {
    id: string;
    name: string;
    description?: string;
}

export const categories: Category[] = [
    {
        id: "1",
        name: "Smartphones",
        description: "Dispositivos móveis com funcionalidades avançadas.",
    },
    {
        id: "2",
        name: "Tablets",
        description: "Dispositivos portáteis com tela sensível ao toque.",
    },
    {
        id: "3",
        name: "Computadores",
        description: "Computadores de mesa e portáteis para diversas necessidades.",
    },
    {
        id: "4",
        name: "Monitores",
        description: "Tela externa para computadores e dispositivos móveis.",
    },
    {
        id: "5",
        name: "Impressoras",
        description: "Dispositivos para impressão de documentos e fotos.",
    },
    {
        id: "6",
        name: "Periféricos",
        description: "Acessórios e dispositivos auxiliares para computadores.",
    },
    {
        id: "7",
        name: "Câmeras",
        description: "Dispositivos para captura de imagens e vídeos.",
    },
    {
        id: "8",
        name: "Videogames",
        description: "Consoles e jogos para entretenimento interativo.",
    },
];
