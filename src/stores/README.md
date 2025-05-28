# AI Context Store

This directory contains the simplified Zustand-based state management for the AI Assistant context system in SmellSmith.

## Overview

The AI context system allows users to select formulas, ingredients, and other entities to provide contextual information to the AI Assistant. This implementation uses Zustand for simple, straightforward global state management.

## Architecture

### Store: `ai-context.ts`

The main store manages:
- **Context Items**: Array of selected entities with metadata
- **Entity Types**: Support for formulas, ingredients, and documents
- **Auto-limiting**: Configurable maximum items (default: 15)
- **Type Safety**: Full TypeScript support

### Key Features

- **Simple API**: Direct store access without complex providers
- **Automatic Deduplication**: Adding the same entity updates the existing item
- **Metadata Support**: Extensible entity metadata for AI enhancement
- **Source Tracking**: Track where entities were added from

## Usage Examples

### Basic Usage

```typescript
import { useAIContextStore } from '@/stores/ai-context';

function MyComponent() {
  const { items, addContext, removeContext, clearContext } = useAIContextStore();
  
  // Add a formula to context
  const handleAddFormula = (formula) => {
    const entity = formulaToAIContext(formula);
    addContext(entity, 'formula-list');
  };
  
  // Check if entity is in context
  const isInContext = hasEntity(formula.id);
}
```

### Adding Different Entity Types

```typescript
// Formula
const formulaEntity = formulaToAIContext(formula);
addContext(formulaEntity, 'formula-card');

// Custom entity
const customEntity = {
  id: 'ingredient-123',
  type: 'ingredient',
  name: 'Rose Oil',
  description: 'Bulgarian rose essential oil',
  metadata: {
    concentration: '2%',
    allergens: ['Citronellol', 'Geraniol']
  }
};
addContext(customEntity, 'ingredient-selector');
```

### Context Summary

```typescript
const { getContextSummary } = useAIContextStore();
const summary = getContextSummary(); // "Context: 3 formulas, 2 ingredients"
```

## Integration Points

### Components Using AI Context

1. **FormulaCard** (`/components/formulae/formula-card.tsx`)
   - "Ask AI" button adds formula to context
   - Visual indication when formula is in context

2. **FormulaeList** (`/components/formulae/formulae-list.tsx`)
   - Multi-select mode for batch context addition
   - Context-aware action buttons

3. **ContextPanel** (`/components/ai/context-panel.tsx`)
   - Displays current context items
   - Remove individual items or clear all

4. **QuickActions** (`/components/ai/quick-actions.tsx`)
   - Context-aware suggested prompts
   - Different actions based on selected entity types

## Store API Reference

### State

```typescript
interface AIContextStore {
  items: AIContextItem[];           // Current context items
  maxItems: number;                 // Maximum allowed items (15)
}
```

### Actions

```typescript
// Add entity to context (with deduplication)
addContext: (entity: AIContextEntity, source?: string) => void;

// Remove specific item from context
removeContext: (itemId: string) => void;

// Clear all context items
clearContext: () => void;

// Check if entity exists in context
hasEntity: (entityId: string) => boolean;

// Get human-readable context summary
getContextSummary: () => string;
```

### Types

```typescript
interface AIContextEntity {
  id: string;
  type: 'formula' | 'ingredient' | 'document';
  name: string;
  description?: string;
  metadata?: Record<string, unknown>;
}

interface AIContextItem {
  id: string;                       // Unique item ID
  entity: AIContextEntity;          // The entity data
  addedAt: Date;                    // When it was added
  source?: string;                  // Where it was added from
}
```

## Benefits Over Previous Implementation

1. **Simplicity**: No complex React Context providers or wrapper components
2. **Performance**: Direct store access without context re-renders
3. **Type Safety**: Full TypeScript support throughout
4. **Debugging**: Easy to inspect state with Zustand DevTools
5. **Extensibility**: Simple to add new entity types and features

## Future Enhancements

### Planned Features

1. **Persistence**: Save context state to localStorage
2. **History**: Track context changes over time
3. **Templates**: Save and load common context configurations
4. **Bulk Operations**: Enhanced multi-entity management

### Adding New Entity Types

To add support for a new entity type (e.g., 'batch'):

1. Update the `type` union in `AIContextEntity`:
   ```typescript
   type: 'formula' | 'ingredient' | 'document' | 'batch';
   ```

2. Create a helper function:
   ```typescript
   export function batchToAIContext(batch: BatchData): AIContextEntity {
     return {
       id: batch.id,
       type: 'batch',
       name: batch.name,
       description: batch.description,
       metadata: {
         size: batch.size,
         status: batch.status
       }
     };
   }
   ```

3. Update components to handle the new type in icons, colors, etc.

## Migration Notes

This implementation replaces the previous React Context-based system. Key changes:

- **Removed**: `AIContextProvider`, `useAIContext` hook, complex wrapper components
- **Added**: Simple Zustand store with direct access
- **Improved**: Better TypeScript support, simpler component integration
- **Maintained**: All existing functionality with better performance

The migration maintains the same user-facing functionality while significantly simplifying the codebase.