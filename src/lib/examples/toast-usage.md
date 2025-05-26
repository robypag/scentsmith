# Toast Usage Examples

This document shows how to use the toast notifications in SmellSmith.

## Basic Usage

```tsx
"use client";

import { useToast } from "@/hooks/use-toast";

export function ExampleComponent() {
  const { toast, success, error, warning, info, loading } = useToast();

  return (
    <div className="space-y-4">
      <button onClick={() => toast("Hello World!")}>
        Basic Toast
      </button>

      <button onClick={() => success("Operation completed successfully!")}>
        Success Toast
      </button>

      <button onClick={() => error("Something went wrong!")}>
        Error Toast
      </button>

      <button onClick={() => warning("Please be careful!")}>
        Warning Toast
      </button>

      <button onClick={() => info("Here's some information")}>
        Info Toast
      </button>

      <button onClick={() => loading("Processing...")}>
        Loading Toast
      </button>
    </div>
  );
}
```

## Advanced Usage with Options

```tsx
import { useToast } from "@/hooks/use-toast";

export function AdvancedExample() {
  const { toast, success, promise } = useToast();

  const handleAdvancedToast = () => {
    toast("Custom toast", {
      description: "This toast has a description",
      duration: 5000,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    });
  };

  const handlePromiseToast = async () => {
    promise(
      new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.5 ? resolve("Success!") : reject("Failed!");
        }, 2000);
      }),
      {
        loading: "Processing...",
        success: "Operation completed!",
        error: "Operation failed!",
      }
    );
  };

  return (
    <div className="space-y-4">
      <button onClick={handleAdvancedToast}>
        Toast with Description & Action
      </button>

      <button onClick={handlePromiseToast}>
        Promise Toast
      </button>
    </div>
  );
}
```

## Real-world Examples

### Form Submission
```tsx
const handleSubmit = async (data: FormData) => {
  const loadingToast = loading("Saving fragrance...");
  
  try {
    await saveFragrance(data);
    dismiss(loadingToast);
    success("Fragrance saved successfully!");
  } catch (error) {
    dismiss(loadingToast);
    error("Failed to save fragrance");
  }
};
```

### File Upload
```tsx
const handleFileUpload = async (file: File) => {
  promise(
    uploadFile(file),
    {
      loading: "Uploading file...",
      success: "File uploaded successfully!",
      error: "Failed to upload file",
    }
  );
};
```

### API Actions
```tsx
const handleDeleteFragrance = async (id: string) => {
  try {
    await deleteFragrance(id);
    success("Fragrance deleted successfully!");
  } catch (error) {
    error("Failed to delete fragrance");
  }
};
```