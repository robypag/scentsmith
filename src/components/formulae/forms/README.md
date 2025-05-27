# Formula CRUD System Documentation

This documentation covers the complete CRUD (Create, Read, Update, Delete) system for managing fragrance formulae in SmellSmith.

## Overview

The formula CRUD system consists of:
- **Validation Schemas**: Zod schemas for form validation
- **Server Actions**: Server-side functions for database operations
- **Form Components**: React Hook Form components with validation
- **Example Pages**: Complete page implementations

## Architecture

### 1. Database Schema

The formula system uses the following tables:
- `formulae`: Main formula information
- `formulaIngredients`: Join table for formula-ingredient relationships
- `formulaTests`: Test results for formulae
- `ingredients`: Available ingredients

### 2. Validation Layer (`src/lib/validations/formula.ts`)

```typescript
// Form validation schemas
- createFormulaSchema: For creating new formulae
- editFormulaSchema: For editing existing formulae
- formulaIngredientSchema: For ingredient entries
- formulaTestSchema: For test entries
```

### 3. Server Actions (`src/lib/actions/formulae/index.ts`)

```typescript
// CRUD operations
- createFormula(data): Create new formula
- updateFormula(data): Update existing formula
- deleteFormula(id): Delete formula
- loadFormulae(): Load all formulae
- loadFormulaById(id): Load single formula
- loadAllIngredients(): Load ingredients for dropdowns
```

### 4. Form Components (`src/app/components/formulae/forms/`)

- `CreateFormulaForm`: Component for creating new formulae
- `EditFormulaForm`: Component for editing existing formulae

## Usage Examples

### Creating a New Formula

```tsx
import { CreateFormulaForm } from '@/app/components/formulae/forms';
import { loadAllIngredients } from '@/lib/actions/formulae';

export default async function CreatePage() {
  const ingredients = await loadAllIngredients();
  
  return (
    <CreateFormulaForm 
      ingredients={ingredients} 
      onSuccess={() => console.log('Created!')}
    />
  );
}
```

### Editing an Existing Formula

```tsx
import { EditFormulaForm } from '@/app/components/formulae/forms';
import { loadFormulaById, loadAllIngredients } from '@/lib/actions/formulae';

export default async function EditPage({ params }: { params: { id: string } }) {
  const [formula, ingredients] = await Promise.all([
    loadFormulaById(params.id),
    loadAllIngredients(),
  ]);
  
  return (
    <EditFormulaForm 
      formula={formula}
      ingredients={ingredients}
      onSuccess={() => console.log('Updated!')}
    />
  );
}
```

### Using Server Actions Directly

```typescript
import { createFormula, updateFormula, deleteFormula } from '@/lib/actions/formulae';

// Create formula
const result = await createFormula({
  name: "Rose Garden",
  version: "1.0",
  description: "A fresh rose fragrance",
  status: "draft",
  isCompliant: true,
  ingredients: [
    { ingredientId: "ingredient-id", percentage: "10.5", notes: "Top note" }
  ],
  tests: []
});

// Update formula
const updateResult = await updateFormula({
  id: "formula-id",
  name: "Rose Garden Updated",
  // ... other fields
});

// Delete formula
const deleteResult = await deleteFormula("formula-id");
```

## Form Features

### Basic Information
- Formula name (required)
- Version (required, defaults to "1.0")
- Description (optional)
- Status (draft, testing, approved, archived)
- Total concentration percentage
- Batch size in ml
- Expiration date
- Compliance status
- Notes

### Dynamic Ingredients
- Add/remove ingredient entries
- Ingredient selection from dropdown
- Percentage input with validation (0.01-100%)
- Individual notes per ingredient
- At least one ingredient required

### Optional Tests
- Add/remove test entries
- Test type (e.g., stability, skin test)
- Test date
- Pass/fail status
- Test notes
- JSON results storage

## Validation Rules

### Formula Level
- Name: 1-255 characters, required
- Version: Required, defaults to "1.0"
- Total concentration: 0-100% if provided
- Batch size: Greater than 0 if provided
- At least one ingredient required

### Ingredient Level
- Ingredient selection: Must be valid UUID
- Percentage: 0.01-100%, required
- Notes: Optional text

### Test Level
- Test type: Required text
- Test date: Required date
- Pass/fail: Optional boolean
- Notes: Optional text

## Error Handling

The system includes comprehensive error handling:
- Form validation errors displayed inline
- Server action errors returned in response objects
- Authentication checks for all mutations
- Permission checks (users can only edit their own formulae)
- Transaction rollback on database errors

## Security Features

- Authentication required for all mutations
- User ownership validation
- SQL injection protection via Drizzle ORM
- Input sanitization via Zod schemas
- Server-side validation for all operations

## Performance Considerations

- Server actions for direct database access (no API overhead)
- Efficient joins for loading complete formula data
- Transaction usage for data consistency
- Optimistic form submissions with loading states
- Path revalidation for cache invalidation

## Dependencies

```json
{
  "react-hook-form": "Form management",
  "@hookform/resolvers": "Zod integration",
  "zod": "Schema validation",
  "drizzle-orm": "Database ORM",
  "sonner": "Toast notifications",
  "lucide-react": "Icons"
}
```

## File Structure

```
src/
├── lib/
│   ├── validations/
│   │   └── formula.ts              # Zod validation schemas
│   └── actions/
│       └── formulae/
│           └── index.ts            # Server actions
├── app/
│   ├── components/
│   │   └── formulae/
│   │       └── forms/
│   │           ├── index.ts        # Exports
│   │           ├── create-formula-form.tsx
│   │           └── edit-formula-form.tsx
│   └── formulae/
│       ├── create/
│       │   └── page.tsx            # Create page example
│       └── [id]/
│           └── edit/
│               └── page.tsx        # Edit page example
└── types/
    └── formula.ts                  # TypeScript types
```

## Best Practices

1. **Always validate on both client and server side**
2. **Use transactions for multi-table operations**
3. **Handle loading states in UI components**
4. **Provide meaningful error messages**
5. **Implement proper authentication checks**
6. **Use TypeScript for type safety**
7. **Follow the existing ShadCN component patterns**
8. **Cache revalidation after mutations**