"use client";

import { Badge } from "@/components/ui/badge";
import { FileUp, Upload, Eye, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockDocuments } from "@/lib/mock-data/expert-data";
import { DocumentsSearch } from "@/components/documents/documents-search";
import { DocumentsList } from "@/components/documents/documents-list";
import { useState, useMemo } from "react";

export default function DocumentsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");

    const filteredDocuments = useMemo(() => {
        return mockDocuments.filter((doc) => {
            const matchesSearch =
                doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                doc.content.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = typeFilter === "all" || doc.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, typeFilter]);

    const handleSearch = (search: string, type: string) => {
        setSearchTerm(search);
        setTypeFilter(type);
    };
    const getDocumentTypeBadge = (type: string) => {
        switch (type) {
            case "legal":
                return (
                    <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-200">
                        Legal
                    </Badge>
                );
            case "sds":
                return (
                    <Badge className="bg-amber-600 text-white hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-800">
                        SDS
                    </Badge>
                );
            case "formula":
                return <Badge className="bg-gold text-gold-foreground hover:bg-gold/80">Formula</Badge>;
            case "research":
                return (
                    <Badge className="bg-pink-200 text-pink-800 hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200">
                        Research
                    </Badge>
                );
            default:
                return <Badge variant="secondary">{type}</Badge>;
        }
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gold">Document Management</h1>
                    <p className="text-muted-foreground">
                        Manage regulatory documents, safety data sheets, and research materials
                    </p>
                </div>
            </div>

            <Tabs defaultValue="browse" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="browse">Browse Documents</TabsTrigger>
                    <TabsTrigger value="upload">Upload New</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="browse" className="space-y-4">
                    <DocumentsSearch onSearch={handleSearch} />
                    <DocumentsList documents={filteredDocuments} getDocumentTypeBadge={getDocumentTypeBadge} />
                </TabsContent>

                <TabsContent value="upload" className="space-y-4">
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
                                        <p className="text-sm text-gray-600">
                                            Drag and drop files here, or click to browse
                                        </p>
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
                </TabsContent>

                <TabsContent value="analytics" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                                <FileText className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{mockDocuments.length}</div>
                                <p className="text-xs text-muted-foreground">+2 from last month</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Legal Documents</CardTitle>
                                <FileText className="h-4 w-4 text-slate-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {mockDocuments.filter((d) => d.type === "legal").length}
                                </div>
                                <p className="text-xs text-muted-foreground">Regulatory compliance</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Safety Data Sheets</CardTitle>
                                <FileText className="h-4 w-4 text-amber-600" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {mockDocuments.filter((d) => d.type === "sds").length}
                                </div>
                                <p className="text-xs text-muted-foreground">Material safety info</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">5</div>
                                <p className="text-xs text-muted-foreground">This week</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Document Activity</CardTitle>
                            <CardDescription>Recent document views and updates</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockDocuments.slice(0, 5).map((doc) => (
                                    <div key={doc.id} className="flex items-center justify-between py-2 border-b">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-4 h-4 text-muted-foreground" />
                                            <div>
                                                <p className="font-medium text-sm">{doc.title}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Updated {new Date(doc.updatedAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {getDocumentTypeBadge(doc.type)}
                                            <Button variant="ghost" size="sm">
                                                <Eye className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
