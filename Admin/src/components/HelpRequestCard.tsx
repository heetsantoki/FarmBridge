import React from 'react';
import { format, parseISO } from 'date-fns';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Mail, MapPin, Phone, Trash2, CheckCircle2 } from 'lucide-react';

interface HelpRequestCardProps {
  id: string;
  name: string;
  address?: string;
  contactNo: string;
  email?: string;
  description: string;
  date?: string;
  photo: string | null;
  status: 'pending' | 'resolved';
  onResolve: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const HelpRequestCard: React.FC<HelpRequestCardProps> = ({
  id,
  name,
  address,
  contactNo,
  email,
  description,
  date,
  photo,
  status,
  onResolve,
  onDelete
}) => {
  // Format date if it exists
  const formattedDate = date ? format(typeof date === 'string' ? parseISO(date) : date, 'PPP') : null;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6 md:flex gap-6">
        {/* Photo section */}
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-secondary/50 flex items-center justify-center border border-border/50">
            {photo ? (
              <img src={photo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl text-muted-foreground">{name.charAt(0)}</span>
            )}
          </div>
        </div>

        {/* Content section */}
        <div className="flex-grow space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{name}</h3>
              <Badge variant={status === 'pending' ? 'default' : 'secondary'} className="mt-1">
                {status === 'pending' ? 'Pending' : 'Resolved'}
              </Badge>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {status === 'pending' ? (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={() => onResolve(id)}
                  className="flex items-center space-x-1"
                >
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  <span>Mark as Resolved</span>
                </Button>
              ) : onDelete ? (
                <Button 
                  variant="destructive" 
                  size="sm" 
                  onClick={() => onDelete(id)}
                  className="flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span>Delete</span>
                </Button>
              ) : null}
            </div>
          </div>

          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {contactNo && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-2 text-primary" />
                <span>{contactNo}</span>
              </div>
            )}
            
            {email && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                <span>{email}</span>
              </div>
            )}
            
            {address && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-primary" />
                <span>{address}</span>
              </div>
            )}
            
            {formattedDate && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 text-primary" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};