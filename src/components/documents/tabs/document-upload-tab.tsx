import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { FileUp, Upload, X, FileText, Check, AlertCircle } from "lucide-react";
import { uploadDocument } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

interface FileItem {
    file: File;
    title: string;
    type: string;
    tags: string;
    progress: number;
    status: "pending" | "uploading" | "completed" | "error";
    errorMessage?: string;
}

interface DocumentUploadTabProps {
    onUploadSuccess?: () => void;
}

export function DocumentUploadTab({ onUploadSuccess }: DocumentUploadTabProps) {
    const [selectedFiles, setSelectedFiles] = useState<FileItem[]>([]);
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const { success, error } = useToast();

    const validateFile = (file: File): boolean => {
        if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
            error(`File type ${file.type} is not supported. Please upload PDF, DOC, or DOCX files.`);
            return false;
        }
        if (file.size > MAX_FILE_SIZE) {
            error(`File size exceeds 15MB limit. Please choose a smaller file.`);
            return false;
        }
        return true;
    };

    const getFileNameWithoutExtension = (fileName: string): string => {
        return fileName.replace(/\.[^/.]+$/, "");
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const validFiles = files.filter(validateFile);

        if (validFiles.length > 0) {
            const newFileItems: FileItem[] = validFiles.map((file) => ({
                file,
                title: getFileNameWithoutExtension(file.name),
                type: "",
                tags: "",
                progress: 0,
                status: "pending",
            }));
            setSelectedFiles((prev) => [...prev, ...newFileItems]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const validFiles = files.filter(validateFile);

        if (validFiles.length > 0) {
            const newFileItems: FileItem[] = validFiles.map((file) => ({
                file,
                title: getFileNameWithoutExtension(file.name),
                type: "",
                tags: "",
                progress: 0,
                status: "pending",
            }));
            setSelectedFiles((prev) => [...prev, ...newFileItems]);
        }
    };

    const removeFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const updateFileItem = (index: number, updates: Partial<FileItem>) => {
        setSelectedFiles((prev) => prev.map((item, i) => (i === index ? { ...item, ...updates } : item)));
    };

    const uploadSingleFile = async (fileItem: FileItem, index: number) => {
        updateFileItem(index, { status: "uploading", progress: 0 });

        try {
            // Simulate progress updates
            const progressInterval = setInterval(() => {
                updateFileItem(index, {
                    progress: Math.min(fileItem.progress + Math.random() * 30, 90),
                });
            }, 200);

            const formData = new FormData();
            formData.append("title", fileItem.title);
            formData.append("type", fileItem.type);
            formData.append("tags", fileItem.tags);
            formData.append("files", fileItem.file);

            await uploadDocument(formData);

            clearInterval(progressInterval);
            updateFileItem(index, {
                status: "completed",
                progress: 100,
            });

            success(`"${fileItem.title}" has been uploaded successfully.`);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Upload failed";
            updateFileItem(index, {
                status: "error",
                progress: 0,
                errorMessage,
            });

            error(`Failed to upload "${fileItem.title}". Please try again.`);
        }
    };

    const handleUploadAll = async () => {
        const pendingFiles = selectedFiles.filter(
            (item) => item.status === "pending" && item.title.trim() && item.type,
        );

        if (pendingFiles.length === 0) {
            error("Please ensure all files have a title and type selected.");
            return;
        }
        setIsUploading(true);
        // Upload files sequentially to avoid overwhelming the server
        for (let i = 0; i < selectedFiles.length; i++) {
            const fileItem = selectedFiles[i];
            if (fileItem.status === "pending" && fileItem.title.trim() && fileItem.type) {
                await uploadSingleFile(fileItem, i);
            }
        }
        setIsUploading(false);
        onUploadSuccess?.();
    };

    const canUpload = selectedFiles.some((item) => item.status === "pending" && item.title.trim() && item.type);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const getStatusIcon = (status: FileItem["status"]) => {
        switch (status) {
            case "completed":
                return <Check className="w-4 h-4 text-green-500" />;
            case "error":
                return <AlertCircle className="w-4 h-4 text-red-500" />;
            default:
                return <FileText className="w-4 h-4 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Documents</CardTitle>
                    <CardDescription>
                        Add regulatory documents, safety data sheets, or research materials. Configure each file
                        individually.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="file">File Upload</Label>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                                isDragOver ? "border-gold bg-gold/10" : "border-gray-300 hover:border-gray-400"
                            }`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => document.getElementById("fileInput")?.click()}
                        >
                            <FileUp className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                            <p className="text-xs text-gray-500 mt-1">Supports PDF, DOC, DOCX up to 15MB</p>
                            <input
                                id="fileInput"
                                type="file"
                                multiple
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Display selected files with individual configuration */}
                    {selectedFiles.length > 0 && (
                        <div className="space-y-4">
                            <Label>Selected Files</Label>
                            <div className="space-y-4">
                                {selectedFiles.map((fileItem, index) => (
                                    <Card key={index} className="p-4">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {getStatusIcon(fileItem.status)}
                                                    <span className="text-sm font-medium">{fileItem.file.name}</span>
                                                    <span className="text-xs text-gray-500">
                                                        ({formatFileSize(fileItem.file.size)})
                                                    </span>
                                                </div>
                                                {fileItem.status === "pending" && (
                                                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            {fileItem.status === "pending" && (
                                                <div className="grid gap-3 md:grid-cols-3">
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Document Title</Label>
                                                        <Input
                                                            value={fileItem.title}
                                                            onChange={(e) =>
                                                                updateFileItem(index, { title: e.target.value })
                                                            }
                                                            placeholder="Enter document title"
                                                            className="h-8"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Document Type</Label>
                                                        <Select
                                                            value={fileItem.type}
                                                            onValueChange={(value) =>
                                                                updateFileItem(index, { type: value })
                                                            }
                                                        >
                                                            <SelectTrigger className="h-8">
                                                                <SelectValue placeholder="Select type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="legal">Legal/Regulatory</SelectItem>
                                                                <SelectItem value="sds">Safety Data Sheet</SelectItem>
                                                                <SelectItem value="formula">
                                                                    Formula Documentation
                                                                </SelectItem>
                                                                <SelectItem value="research">Research Paper</SelectItem>
                                                                <SelectItem value="other">Other</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Label className="text-xs">Tags</Label>
                                                        <Input
                                                            value={fileItem.tags}
                                                            onChange={(e) =>
                                                                updateFileItem(index, { tags: e.target.value })
                                                            }
                                                            placeholder="comma-separated"
                                                            className="h-8"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            {(fileItem.status === "uploading" || fileItem.status === "completed") && (
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-xs">
                                                        <span>Progress</span>
                                                        <span>{Math.round(fileItem.progress)}%</span>
                                                    </div>
                                                    <Progress value={fileItem.progress} className="h-2" />
                                                </div>
                                            )}

                                            {fileItem.status === "error" && fileItem.errorMessage && (
                                                <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                                                    {fileItem.errorMessage}
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedFiles.length > 0 && (
                        <Button
                            className="w-full bg-gold text-gold-foreground hover:bg-gold/90"
                            onClick={handleUploadAll}
                            disabled={!canUpload || isUploading}
                        >
                            <Upload className="w-4 h-4 mr-2" />
                            {isUploading ? "Uploading..." : "Upload All Documents"}
                        </Button>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
