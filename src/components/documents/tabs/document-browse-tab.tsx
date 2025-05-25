import { DocumentsSearch } from "@/components/documents/documents-search";
import { DocumentsList } from "@/components/documents/documents-list";
import { Document } from "@/types/document";

interface DocumentBrowseTabProps {
    filteredDocuments: Document[];
    getDocumentTypeBadge: (type: string) => React.ReactElement;
    onSearch: (search: string, type: string) => void;
}

export function DocumentBrowseTab({ filteredDocuments, getDocumentTypeBadge, onSearch }: DocumentBrowseTabProps) {
    return (
        <div className="space-y-4">
            <DocumentsSearch onSearch={onSearch} />
            <DocumentsList documents={filteredDocuments} getDocumentTypeBadge={getDocumentTypeBadge} />
        </div>
    );
}
