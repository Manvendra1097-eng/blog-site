import { PenLineIcon } from "lucide-react";

export default function PublicFooter() {
    return (
        <footer className="border-t border-border py-8 px-4">
            <div className="container mx-auto text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                        <PenLineIcon className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <span className="font-semibold">BlogSite</span>
                </div>
                <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} BlogSite. All rights reserved.
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    Created by Manvendra
                </p>
            </div>
        </footer>
    );
}
