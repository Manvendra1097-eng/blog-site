export default function EmptyState({ message, action }) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <p className="text-muted-foreground mb-4">{message}</p>
                {action}
            </div>
        </div>
    );
}
