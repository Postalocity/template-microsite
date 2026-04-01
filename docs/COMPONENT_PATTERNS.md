# Microsite Component Patterns

## Services Section Grid Layout

### Pattern: Flexbox with Centered Rows

The services section uses a flexbox-based layout that automatically centers items in each row, regardless of how many items are in each row.

```tsx
<div className="flex flex-wrap justify-center gap-6">
  {items.map((item, i) => (
    <div 
      key={item.title}
      className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
    >
      {/* Card content */}
    </div>
  ))}
</div>
```

### Breakpoints

| Screen Size | Width | Columns |
|-------------|-------|---------|
| Mobile (<640px) | w-full | 1 |
| Tablet (640-1024px) | w-[calc(50%-12px)] | 2 |
| Desktop (>1024px) | w-[calc(33.333%-16px)] | 3 |

### Why This Works

- **`flex flex-wrap`**: Allows items to wrap to new rows
- **`justify-center`**: Centers items in each row independently
- **Calc widths**: Subtract gap to get exact fractions (50% = 2 cols, 33.333% = 3 cols)

### Examples by Item Count

| Items | Row 1 | Row 2 | Row 3 |
|-------|-------|-------|--------|
| 3 | 3 centered | - | - |
| 4 | 2 centered | 2 centered | - |
| 5 | 3 centered | 2 centered | - |
| 6 | 3 centered | 3 centered | - |
| 7 | 3 centered | 2 centered | 2 centered |
| 9 | 3 centered | 3 centered | 3 centered |

Each row centers automatically with `justify-center`.

### Key CSS Classes

- `flex flex-wrap justify-center` - Container
- `gap-6` - Space between items
- `w-full` - Mobile (1 column)
- `sm:w-[calc(50%-12px)]` - Tablet (2 columns)
- `lg:w-[calc(33.333%-16px)]` - Desktop (3 columns)

The gap adjustment in calc ensures exact widths without overflow.
