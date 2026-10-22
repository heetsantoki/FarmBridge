import * as React from "react";

const Table = React.forwardRef<HTMLTableElement, React.HTMLProps<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <table ref={ref} className={`min-w-full divide-y divide-gray-200 ${className}`} {...props} />
  )
);

Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={`bg-gray-50 ${className}`} {...props} />
  )
);

TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLProps<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={`bg-white divide-y divide-gray-200 ${className}`} {...props} />
  )
);

TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLProps<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={`hover:bg-gray-100 ${className}`} {...props} />
  )
);

TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.HTMLProps<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`} {...props} />
  )
);

TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.HTMLProps<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`} {...props} />
  )
);

TableCell.displayName = "TableCell";

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };