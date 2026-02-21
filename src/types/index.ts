// Type definitions for various models

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
};


type Project = {
    id: string;
    title: string;
    description: string;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
};


type ContentItem = {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
};


type BookQueueItem = {
    id: string;
    userId: string;
    bookId: string;
    addedAt: Date;
};


type Export = {
    id: string;
    userId: string;
    exportDate: Date;
    status: 'pending' | 'completed' | 'failed';
};


type Payment = {
    id: string;
    userId: string;
    amount: number;
    paymentDate: Date;
    status: 'pending' | 'completed' | 'refunded';
};

export type { User, Project, ContentItem, BookQueueItem, Export, Payment };