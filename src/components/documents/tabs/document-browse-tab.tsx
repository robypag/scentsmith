import { DocumentsSearch } from "@/components/documents/documents-search";
import { DocumentsList } from "@/components/documents/documents-list";
import { DocumentDTO } from "@/types/document";

interface DocumentBrowseTabProps {
    documents: DocumentDTO[];
}

export function DocumentBrowseTab({ documents }: DocumentBrowseTabProps) {
    return (
        <div className="space-y-4">
            <DocumentsSearch />
            <DocumentsList documents={documents} />
        </div>
    );
}
