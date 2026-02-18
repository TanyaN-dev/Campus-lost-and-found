import { useState, useEffect } from "react";
import { storage, Item } from "@/lib/storage";
import ItemCard from "@/components/item-card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck } from "lucide-react";

export default function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const { toast } = useToast();

  const loadItems = () => {
    const loadedItems = storage.getItems();
    setItems(loadedItems.sort((a, b) => b.createdAt - a.createdAt));
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      storage.deleteItem(id);
      loadItems();
      toast({
        title: "Item Deleted",
        description: "The item has been removed from the database.",
        variant: "destructive"
      });
    }
  };

  const handleStatusUpdate = (id: string) => {
    storage.updateItemStatus(id, 'claimed');
    loadItems();
    toast({
      title: "Status Updated",
      description: "Item marked as claimed.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <ShieldCheck className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage lost and found reports.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Recent Reports ({items.length})</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(item => (
            <ItemCard 
              key={item.id} 
              item={item} 
              isAdmin 
              onDelete={handleDelete}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
          {items.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground py-12">No reports to manage.</p>
          )}
        </div>
      </div>
    </div>
  );
}
