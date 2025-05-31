"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { deleteDocument } from "@/lib/actions/documents";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface DocumentDeleteButtonProps {
    documentId: string;
}

export function DocumentDeleteButton({ documentId }: DocumentDeleteButtonProps) {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { success, error: showError } = useToast();

    const handleDelete = () => {
        if (!confirm("Are you sure you want to delete this document? This action cannot be undone.")) {
            return;
        }

        startTransition(async () => {
            try {
                await deleteDocument(documentId);
                success("Document deleted successfully");
                router.refresh();
            } catch (err) {
                showError(err instanceof Error ? err.message : "Failed to delete document");
            }
        });
    };

    return (
        <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isPending}>
            <Trash2 className="w-3 h-3 mr-1" />
        </Button>
    );
}
