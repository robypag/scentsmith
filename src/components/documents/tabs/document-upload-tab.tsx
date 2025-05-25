import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Upload } from "lucide-react";

export function DocumentUploadTab() {
    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Upload Document</CardTitle>
                    <CardDescription>
                        Add new regulatory documents, safety data sheets, or research materials
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Document Title</Label>
                            <Input id="title" placeholder="Enter document title" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Document Type</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select document type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="legal">Legal/Regulatory</SelectItem>
                                    <SelectItem value="sds">Safety Data Sheet</SelectItem>
                                    <SelectItem value="formula">Formula Documentation</SelectItem>
                                    <SelectItem value="research">Research Paper</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">File Upload</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                <FileUp className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                                <p className="text-xs text-gray-500 mt-1">Supports PDF, DOC, DOCX up to 10MB</p>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tags">Tags (comma-separated)</Label>
                            <Input id="tags" placeholder="ifra, eu, regulations, allergens" />
                        </div>
                    </div>
                    <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Document
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
