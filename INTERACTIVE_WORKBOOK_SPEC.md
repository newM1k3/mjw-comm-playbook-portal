# Interactive Workbook & PDF Export Spec

This document captures the architectural concepts, schema definitions, and PDF generation logic harvested from the deprecated `mjw-inter-book-embed-module` repository. These concepts should be used when implementing the "Interactive Workbook" feature in the main Communication Playbook Portal.

## 1. Core Architecture

The interactive workbook acts as a persistent, multi-step form embedded throughout the playbook chapters.

*   **Data Structure:** A `WorkbookEntry` maps a `step_index` (representing a specific chapter or exercise) to a flexible JSON object containing the user's answers.
*   **State Management:** Answers are auto-saved to a backend database (e.g., PocketBase) or `localStorage` to ensure persistence across sessions.
*   **Schema-Driven UI:** Each worksheet is defined by a JSON schema that dictates the title, step index, and the specific fields (textareas, inputs) required.

### Data Types

```typescript
// Represents a single user's answer set for a specific step
export interface WorkbookEntry {
  id: string;
  user_id: string;
  step_index: number; // e.g., 1 for Chapter 1, 2 for Chapter 2
  data: Record<string, string>; // Key-value pairs of field IDs to user answers
  updated_at: string;
}

// Defines the structure of a worksheet
export interface WorksheetSchema {
  stepIndex: number;
  title: string;
  fields: {
    id: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'textarea';
  }[];
}
```

## 2. Action Plan View (Summary)

The Action Plan view aggregates all `WorkbookEntry` data into a single, cohesive dashboard. It iterates over the predefined `WorksheetSchema` list and matches each schema with the corresponding `WorkbookEntry` based on the `stepIndex`.

*   **Empty States:** If a user hasn't completed a worksheet, the UI explicitly shows an "Not yet completed" state.
*   **Progress Tracking:** The view inherently acts as a progress tracker, showing the user exactly what they've done and what's left.

## 3. PDF Generation Logic (jspdf)

The most valuable asset harvested from the embed module is the precise `jspdf` layout logic used to export the Action Plan into a professional, formatted PDF.

### Required Dependencies

```bash
npm install jspdf
```

### Export Function Implementation

```typescript
import jsPDF from 'jspdf';

export const generateActionPlanPdf = (schemas: WorksheetSchema[], entries: WorkbookEntry[]) => {
  const doc = new jsPDF();
  const margin = 20;
  const contentWidth = 170;
  let y = margin;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.text('Your Action Plan', margin, y);
  y += 10;

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(100, 116, 139); // Slate-500
  doc.text('Generated from The Communication Playbook', margin, y);
  y += 20;

  schemas.forEach((schema) => {
    const entry = entries.find((e) => e.step_index === schema.stepIndex);

    // Chapter Heading Background (Slate-100)
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(margin - 8, y - 14, contentWidth + 16, 26, 4, 4, 'F');

    // Chapter Title
    doc.setTextColor(30, 41, 59); // Slate-800
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text(schema.title, margin, y + 4);
    y += 30;

    schema.fields.forEach((field) => {
      const answer = entry?.data[field.id] ?? '';

      // Field Label
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105); // Slate-600
      doc.text(field.label, margin, y);
      y += 16;

      // User Answer
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      // Dark slate if answered, light slate if empty
      doc.setTextColor(answer ? 30 : 148, answer ? 41 : 163, answer ? 59 : 174);
      
      const lines = doc.splitTextToSize(answer || 'No answer provided', contentWidth);
      doc.text(lines, margin, y);
      y += lines.length * 14 + 8; // Adjust spacing based on line count

      // Thin Separator Line
      doc.setDrawColor(226, 232, 240); // Slate-200
      doc.line(margin, y, margin + contentWidth, y);
      y += 12;

      // Pagination check
      if (y > doc.internal.pageSize.getHeight() - 80) {
        doc.addPage();
        y = margin;
      }
    });

    y += 10; // Extra spacing between chapters
  });

  doc.save('action-plan.pdf');
};
```

## 4. Implementation Strategy for the Portal

When building this into the `mjw-comm-playbook-portal`:

1.  **Schema Definition:** Define the `WorksheetSchema` for each of the 5 chapters (and Introduction/Conclusion if applicable) in a central configuration file.
2.  **Chapter Integration:** Add a "Start This Chapter's Worksheet" button at the bottom of each chapter component (e.g., `Chapter1.tsx`).
3.  **PocketBase Integration:** Create a `workbook_entries` collection in PocketBase with the fields defined in the `WorkbookEntry` type.
4.  **Action Plan Route:** Add a new route/view (e.g., `action-plan`) to `App.tsx` that renders the summary view and includes the "Download PDF" button using the logic above.
