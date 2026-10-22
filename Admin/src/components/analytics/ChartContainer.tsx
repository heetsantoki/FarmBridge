import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { cn } from '../../lib/utils';

interface ChartContainerProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  title,
  className,
  children,
  action
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-500 ease-in-out", 
      className,
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
    )}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="pb-4 pt-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartContainer;