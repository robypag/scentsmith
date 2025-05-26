import { DocumentsSearch } from "@/components/documents/documents-search";
import { DocumentsList } from "@/components/documents/documents-list";
import { DocumentDTO } from "@/types/document";

interface DocumentBrowseTabProps {
    filteredDocuments: DocumentDTO[];
    getDocumentTypeBadge: (type: string) => React.ReactElement;
    onSearch: (search: string, type: string) => void;
    onDelete: (documentId: string) => void;
}

export function DocumentBrowseTab({ filteredDocuments, getDocumentTypeBadge, onSearch, onDelete }: DocumentBrowseTabProps) {
    return (
        <div className="space-y-4">
            <DocumentsSearch onSearch={onSearch} />
            <DocumentsList documents={filteredDocuments} getDocumentTypeBadge={getDocumentTypeBadge} onDelete={onDelete} />
        </div>
    );
}
