export default function LoadingState({ message = "Loading..." }) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                <p className="text-muted-foreground">{message}</p>
            </div>
        </div>
    );
}
