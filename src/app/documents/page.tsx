import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function UploadPage() {
    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-gold">Upload Documents</h1>
            </div>

            <Tabs defaultValue="file" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="file">File Upload</TabsTrigger>
                    <TabsTrigger value="text">Text Input</TabsTrigger>
                    <TabsTrigger value="history">Upload History</TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload Formula Documents</CardTitle>
                            <CardDescription>
                                Upload perfume formula documents to create embeddings in the vector database
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gold/30 p-12">
                                <div className="flex flex-col items-center justify-center space-y-2 text-center">
                                    <div className="rounded-full bg-gold/10 p-3">
                                        <FileUp className="h-6 w-6 text-gold" />
                                    </div>
                                    <h3 className="text-lg font-semibold">Drag & drop files</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Supported formats: PDF, DOCX, TXT, CSV
                                    </p>
                                    <p className="text-xs text-muted-foreground">Max file size: 10MB</p>
                                    <Button className="mt-2 bg-gold text-gold-foreground hover:bg-gold/90">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Browse Files
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-sm font-medium">Upload Options</h3>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="collection">Collection Name</Label>
                                        <Input
                                            id="collection"
                                            placeholder="e.g., Spring 2023 Formulae"
                                            className="border-gold/30 focus-visible:ring-gold/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tags">Tags (comma separated)</Label>
                                        <Input
                                            id="tags"
                                            placeholder="e.g., floral, amber, new"
                                            className="border-gold/30 focus-visible:ring-gold/30"
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="text" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Input Formula Text</CardTitle>
                            <CardDescription>Paste or type perfume formula text to create embeddings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="formula-name">Formula Name</Label>
                                <Input
                                    id="formula-name"
                                    placeholder="e.g., Floral Amber #247"
                                    className="border-gold/30 focus-visible:ring-gold/30"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="formula-text">Formula Text</Label>
                                <Textarea
                                    id="formula-text"
                                    placeholder="Paste your formula details here..."
                                    className="min-h-[200px] border-gold/30 focus-visible:ring-gold/30"
                                />
                            </div>
                            <Button className="bg-gold text-gold-foreground hover:bg-gold/90">Process Text</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Upload History</CardTitle>
                            <CardDescription>Recent document uploads and their processing status</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Spring Collection 2023.pdf</p>
                                            <p className="text-xs text-muted-foreground">
                                                Uploaded 2 hours ago • 15 formulae extracted
                                            </p>
                                        </div>
                                        <Badge className="bg-green-500">Completed</Badge>
                                    </div>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Amber Variations.docx</p>
                                            <p className="text-xs text-muted-foreground">
                                                Uploaded 5 hours ago • 8 formulae extracted
                                            </p>
                                        </div>
                                        <Badge className="bg-green-500">Completed</Badge>
                                    </div>
                                </div>
                                <div className="rounded-lg border p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">Experimental Blends.csv</p>
                                            <p className="text-xs text-muted-foreground">
                                                Uploaded 1 day ago • 24 formulae extracted
                                            </p>
                                        </div>
                                        <Badge className="bg-green-500">Completed</Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
