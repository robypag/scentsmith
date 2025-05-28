import { create } from "zustand";

export interface AIContextEntity {
    id: string;
    type: "formula" | "ingredient" | "document";
    name: string;
    description?: string;
    metadata?: Record<string, unknown>;
}

export interface AIContextItem {
    id: string;
    entity: AIContextEntity;
    addedAt: Date;
    source?: string;
}

interface AIContextStore {
    items: AIContextItem[];
    maxItems: number;

    // Actions
    addContext: (entity: AIContextEntity, source?: string) => void;
    removeContext: (itemId: string) => void;
    clearContext: () => void;
    hasEntity: (entityId: string) => boolean;
    getContextSummary: () => string;
}

export const useAIContextStore = create<AIContextStore>((set, get) => ({
    items: [],
    maxItems: 15,

    addContext: (entity, source) => {
        set((state) => {
            // Check if entity already exists
            const existingIndex = state.items.findIndex((item) => item.entity.id === entity.id);

            if (existingIndex !== -1) {
                // Update existing item
                const updatedItems = [...state.items];
                updatedItems[existingIndex] = {
                    ...updatedItems[existingIndex],
                    addedAt: new Date(),
                    source: source || updatedItems[existingIndex].source,
                };
                return { items: updatedItems };
            }

            // Add new item
            const newItem: AIContextItem = {
                id: `${entity.id}-${Date.now()}`,
                entity,
                addedAt: new Date(),
                source,
            };

            const newItems = [newItem, ...state.items];

            // Enforce max items limit
            if (newItems.length > state.maxItems) {
                newItems.splice(state.maxItems);
            }

            return { items: newItems };
        });
    },

    removeContext: (itemId) => {
        set((state) => ({
            items: state.items.filter((item) => item.id !== itemId),
        }));
    },

    clearContext: () => {
        set({ items: [] });
    },

    hasEntity: (entityId) => {
        return get().items.some((item) => item.entity.id === entityId);
    },

    getContextSummary: () => {
        const items = get().items;
        if (items.length === 0) return "No context items selected";

        const typeGroups = items.reduce(
            (acc, item) => {
                const type = item.entity.type;
                acc[type] = (acc[type] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        const summary = Object.entries(typeGroups)
            .map(([type, count]) => `${count} ${type}${count > 1 ? "s" : ""}`)
            .join(", ");

        return `Context: ${summary}`;
    },
}));

// Helper function to convert formula to AI context entity
export function formulaToAIContext(formula: {
    id: string;
    name: string;
    description?: string;
    status?: string;
    version: number;
    createdAt: string;
    ingredients?: unknown[];
}): AIContextEntity {
    return {
        id: formula.id,
        type: "formula",
        name: formula.name,
        description: formula.description,
        metadata: {
            status: formula.status,
            version: formula.version,
            createdAt: formula.createdAt,
            ingredients: formula.ingredients?.length || 0,
        },
    };
}
