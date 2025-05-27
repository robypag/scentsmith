"use client";

import { useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { createFormulaSchema, CreateFormulaFormData } from "@/lib/validations/formula";
import { createFormula } from "@/lib/actions/formulae";
import { Ingredient } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateFormulaFormProps {
    ingredients: Ingredient[];
    onSuccess?: () => void;
}

export function CreateFormulaForm({ ingredients, onSuccess }: CreateFormulaFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm<CreateFormulaFormData>({
        resolver: zodResolver(createFormulaSchema),
        defaultValues: {
            name: "",
            version: "1.0",
            description: "",
            status: "draft",
            totalConcentration: "",
            batchSize: "",
            notes: "",
            expirationDate: "",
            isCompliant: true,
            ingredients: [{ ingredientId: "", percentage: "", notes: "" }],
            tests: [],
        },
    });

    const {
        fields: ingredientFields,
        append: appendIngredient,
        remove: removeIngredient,
    } = useFieldArray({
        control,
        name: "ingredients",
    });

    const {
        fields: testFields,
        append: appendTest,
        remove: removeTest,
    } = useFieldArray({
        control,
        name: "tests",
    });

    const onSubmit: SubmitHandler<CreateFormulaFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            const result = await createFormula(data);

            if (result.success) {
                toast.success("Formula created successfully!");
                onSuccess?.();
                router.push("/formulae");
            } else {
                toast.error(result.error || "Failed to create formula");
            }
        } catch (err) {
            toast.error("An unexpected error occurred");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Essential details about your formula</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Formula Name *</Label>
                            <Input id="name" {...register("name")} placeholder="Enter formula name" />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="version">Version *</Label>
                            <Input id="version" {...register("version")} placeholder="1.0" />
                            {errors.version && <p className="text-sm text-red-500 mt-1">{errors.version.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...register("description")}
                            placeholder="Describe the scent profile, inspiration, or intended use for this formula"
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select
                                value={watch("status")}
                                onValueChange={(value) =>
                                    setValue("status", value as "draft" | "testing" | "approved" | "archived")
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="testing">Testing</SelectItem>
                                    <SelectItem value="approved">Approved</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="totalConcentration">Total Concentration (%)</Label>
                            <Input
                                id="totalConcentration"
                                {...register("totalConcentration")}
                                placeholder="e.g., 15.00"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                            />
                            {errors.totalConcentration && (
                                <p className="text-sm text-red-500 mt-1">{errors.totalConcentration.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="batchSize">Batch Size (ml)</Label>
                            <Input
                                id="batchSize"
                                {...register("batchSize")}
                                placeholder="e.g., 1000"
                                type="number"
                                step="0.01"
                                min="0"
                            />
                            {errors.batchSize && (
                                <p className="text-sm text-red-500 mt-1">{errors.batchSize.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expirationDate">Expiration Date</Label>
                            <Input id="expirationDate" {...register("expirationDate")} type="date" />
                        </div>

                        <div className="flex items-center space-x-2 pt-8">
                            <input type="checkbox" id="isCompliant" {...register("isCompliant")} className="h-4 w-4" />
                            <Label htmlFor="isCompliant">Formula is compliant</Label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            {...register("notes")}
                            placeholder="Manufacturing notes, storage instructions, or other important information"
                            rows={2}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Ingredients */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Ingredients</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Add and configure the ingredients for your formula
                        </p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => appendIngredient({ ingredientId: "", percentage: "", notes: "" })}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Ingredient
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {ingredientFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg items-end"
                        >
                            <div className="space-y-2">
                                <Label>Ingredient *</Label>
                                <Select
                                    value={watch(`ingredients.${index}.ingredientId`)}
                                    onValueChange={(value) => setValue(`ingredients.${index}.ingredientId`, value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select ingredient" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ingredients.map((ingredient) => (
                                            <SelectItem key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.ingredients?.[index]?.ingredientId && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.ingredients[index]?.ingredientId?.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Percentage *</Label>
                                <Input
                                    {...register(`ingredients.${index}.percentage`)}
                                    placeholder="0.00"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    max="100"
                                />
                                {errors.ingredients?.[index]?.percentage && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.ingredients[index]?.percentage?.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Input {...register(`ingredients.${index}.notes`)} placeholder="Optional notes" />
                            </div>

                            <div className="flex justify-center pb-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeIngredient(index)}
                                    disabled={ingredientFields.length === 1}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {errors.ingredients && <p className="text-sm text-red-500">{errors.ingredients.message}</p>}
                </CardContent>
            </Card>

            {/* Tests */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Tests</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">Record quality tests and compliance checks</p>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                            appendTest({ testType: "", results: null, passed: undefined, testDate: "", notes: "" })
                        }
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Test
                    </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {testFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg items-end"
                        >
                            <div className="space-y-2">
                                <Label>Test Type *</Label>
                                <Input
                                    {...register(`tests.${index}.testType`)}
                                    placeholder="e.g., Stability, Allergen, IFRA"
                                />
                                {errors.tests?.[index]?.testType && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.tests[index]?.testType?.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Test Date *</Label>
                                <Input {...register(`tests.${index}.testDate`)} type="date" />
                                {errors.tests?.[index]?.testDate && (
                                    <p className="text-sm text-red-500 mt-1">
                                        {errors.tests[index]?.testDate?.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Passed</Label>
                                <Select
                                    value={watch(`tests.${index}.passed`)?.toString() || ""}
                                    onValueChange={(value) =>
                                        setValue(`tests.${index}.passed`, value === "" ? undefined : value === "true")
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select result" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="unspecified">Not specified</SelectItem>
                                        <SelectItem value="true">Passed</SelectItem>
                                        <SelectItem value="false">Failed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Input
                                    {...register(`tests.${index}.notes`)}
                                    placeholder="Test conditions, observations, or remarks"
                                />
                            </div>

                            <div className="flex justify-center pb-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => removeTest(index)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}

                    {testFields.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                            <div className="mb-4">
                                <Plus className="mx-auto h-12 w-12 text-muted-foreground/50" />
                            </div>
                            <p className="text-sm">No tests recorded yet</p>
                            <p className="text-xs mt-1">Add tests to track quality and compliance</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Formula
                </Button>
            </div>
        </form>
    );
}
