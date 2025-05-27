"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { editIngredientSchema, EditIngredientFormData } from "@/lib/validations/ingredient";
import { updateIngredient } from "@/lib/actions/ingredients";
import { Ingredient } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface EditIngredientFormProps {
    ingredient: Ingredient;
    onSuccess?: () => void;
}

export function EditIngredientForm({ ingredient, onSuccess }: EditIngredientFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<EditIngredientFormData>({
        resolver: zodResolver(editIngredientSchema),
        defaultValues: {
            id: ingredient.id,
            name: ingredient.name,
            casNumber: ingredient.casNumber || "",
            ifraCategory: ingredient.ifraCategory || "",
            maxConcentration: ingredient.maxConcentration || "",
            safetyNotes: ingredient.safetyNotes || "",
            supplier: ingredient.supplier || "",
            cost: ingredient.cost || "",
            odorProfile: ingredient.odorProfile || "",
            volatility: ingredient.volatility as "top" | "middle" | "base" | undefined,
        },
    });

    const onSubmit: SubmitHandler<EditIngredientFormData> = async (data) => {
        setIsSubmitting(true);
        try {
            const result = await updateIngredient(data.id, data);

            if (result.success) {
                toast.success("Ingredient updated successfully!");
                onSuccess?.();
                router.push("/ingredients");
            } else {
                toast.error(result.error || "Failed to update ingredient");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Hidden ID field */}
            <input type="hidden" {...register("id")} />

            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Ingredient Name *</Label>
                            <Input
                                id="name"
                                {...register("name")}
                                placeholder="Enter ingredient name"
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="casNumber">CAS Number</Label>
                            <Input
                                id="casNumber"
                                {...register("casNumber")}
                                placeholder="123-45-6"
                            />
                            {errors.casNumber && (
                                <p className="text-sm text-red-500 mt-1">{errors.casNumber.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="odorProfile">Odor Profile</Label>
                        <Textarea
                            id="odorProfile"
                            {...register("odorProfile")}
                            placeholder="Describe the scent characteristics"
                            rows={3}
                        />
                        {errors.odorProfile && (
                            <p className="text-sm text-red-500 mt-1">{errors.odorProfile.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="volatility">Volatility</Label>
                            <Select
                                value={watch("volatility") || ""}
                                onValueChange={(value) => setValue("volatility", value as "top" | "middle" | "base")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select volatility" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="top">Top Note</SelectItem>
                                    <SelectItem value="middle">Middle Note</SelectItem>
                                    <SelectItem value="base">Base Note</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="ifraCategory">IFRA Category</Label>
                            <Input
                                id="ifraCategory"
                                {...register("ifraCategory")}
                                placeholder="e.g., Category 1"
                            />
                            {errors.ifraCategory && (
                                <p className="text-sm text-red-500 mt-1">{errors.ifraCategory.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="maxConcentration">Max Concentration (%)</Label>
                            <Input
                                id="maxConcentration"
                                {...register("maxConcentration")}
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                min="0"
                                max="100"
                            />
                            {errors.maxConcentration && (
                                <p className="text-sm text-red-500 mt-1">{errors.maxConcentration.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="supplier">Supplier</Label>
                            <Input
                                id="supplier"
                                {...register("supplier")}
                                placeholder="Supplier name"
                            />
                            {errors.supplier && (
                                <p className="text-sm text-red-500 mt-1">{errors.supplier.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="cost">Cost (per kg)</Label>
                            <Input
                                id="cost"
                                {...register("cost")}
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                min="0"
                            />
                            {errors.cost && (
                                <p className="text-sm text-red-500 mt-1">{errors.cost.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="safetyNotes">Safety Notes</Label>
                        <Textarea
                            id="safetyNotes"
                            {...register("safetyNotes")}
                            placeholder="Safety information, restrictions, allergen warnings, etc."
                            rows={3}
                        />
                        {errors.safetyNotes && (
                            <p className="text-sm text-red-500 mt-1">{errors.safetyNotes.message}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Ingredient
                </Button>
            </div>
        </form>
    );
}