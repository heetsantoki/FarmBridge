import { cn } from '../../lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  className?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, className }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className={cn("chart-tooltip", className)}>
      <p className="font-medium mb-1">{`${label}`}</p>
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          className="flex items-center justify-between gap-4"
        >
          <div 
            className="flex items-center gap-1"
            style={{ color: entry.color }}
          >
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
          </div>
          <span className="font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;