import { Item, storage } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Phone, Mail, CheckCircle, Tag } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: Item;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
  onStatusUpdate?: (id: string) => void;
}

export default function ItemCard({ item, isAdmin, onDelete, onStatusUpdate }: ItemCardProps) {
  const [showContact, setShowContact] = useState(false);

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50",
      item.status === 'claimed' && "opacity-75 grayscale-[0.5]"
    )}>
      <div className={cn(
        "h-2 w-full",
        item.type === 'lost' ? "bg-rose-500" : "bg-emerald-500"
      )} />
      {item.imageUrl && (
        <div className="relative w-full h-48 bg-muted">
          <img 
            src={item.imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2 mb-1">
              <Badge variant={item.type === 'lost' ? "destructive" : "default"} className={cn(
                "uppercase tracking-wider text-[10px] font-bold",
                item.type === 'found' && "bg-emerald-500 hover:bg-emerald-600"
              )}>
                {item.type}
              </Badge>
              {item.status === 'claimed' && (
                <Badge variant="outline" className="border-green-600 text-green-600 bg-green-50">
                  <CheckCircle className="w-3 h-3 mr-1" /> Claimed
                </Badge>
              )}
            </div>
            <h3 className="font-display font-semibold text-lg leading-tight text-foreground line-clamp-1">
              {item.title}
            </h3>
          </div>
          <Badge variant="secondary" className="shrink-0 flex items-center gap-1 text-xs font-normal">
            <Tag className="w-3 h-3" />
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-3">
        <p className="text-muted-foreground text-sm line-clamp-2 h-10">
          {item.description}
        </p>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 stroke-primary/70" />
            <span className="font-medium text-foreground/80">{item.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 stroke-primary/70" />
            <span>{item.date ? format(new Date(item.date), 'PPP') : 'No date'}</span>
          </div>
        </div>

        {showContact && (
          <div className="mt-4 p-3 bg-muted/50 rounded-lg animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Contact Info</p>
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              {item.contact.includes('@') ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
              {item.contact}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex flex-col gap-2">
        {!isAdmin ? (
          <div className="flex w-full gap-2">
            <Button 
              variant={showContact ? "secondary" : "outline"} 
              className="flex-1 text-xs h-9 font-medium"
              onClick={() => setShowContact(!showContact)}
              disabled={item.status === 'claimed'}
            >
              {showContact ? "Hide Contact" : "Contact Reporter"}
            </Button>
            {item.status === 'open' && (
              <Button 
                variant="outline" 
                className="flex-1 text-xs h-9 font-medium border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                onClick={() => onStatusUpdate?.(item.id)}
              >
                <CheckCircle className="w-3 h-3 mr-1" /> I Found It!
              </Button>
            )}
          </div>
        ) : (
          <div className="flex w-full gap-2">
             {item.status === 'open' && (
              <Button 
                variant="outline" 
                className="flex-1 text-xs h-8 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                onClick={() => onStatusUpdate?.(item.id)}
              >
                Mark Claimed
              </Button>
             )}
            <Button 
              variant="destructive" 
              className="flex-1 text-xs h-8"
              onClick={() => onDelete?.(item.id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
