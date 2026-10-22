import { cn } from "../../lib/utils"; // Utility function for class merging

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-900",
    secondary: "bg-gray-200 text-gray-700",
    destructive: "bg-red-100 text-red-700",
    outline: "border border-gray-300 bg-transparent text-gray-700",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
};