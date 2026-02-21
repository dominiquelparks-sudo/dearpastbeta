'use client';
interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function ProjectCard({ id, title, description, onEdit, onDelete, }: ProjectCardProps) {
    return (
        <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <div className="flex gap-2">
                <button onClick={() => onEdit(id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                </button>
                <button onClick={() => onDelete(id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    );
}