import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { storage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarIcon, MapPin, Type, Tag, User, ImagePlus, X } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(5, "Please provide a description"),
  category: z.string().min(1, "Please select a category"),
  date: z.string().min(1, "Date is required"),
  location: z.string().min(2, "Location is required"),
  contact: z.string().min(5, "Contact info is required"),
  imageUrl: z.string().optional(),
});

interface ItemFormProps {
  type: 'lost' | 'found';
}

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Keys",
  "Wallet/ID",
  "Water Bottle",
  "Other"
];

import { Label } from "@/components/ui/label";

export default function ItemForm({ type }: ItemFormProps) {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      date: new Date().toISOString().split('T')[0],
      location: "",
      contact: "",
      imageUrl: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        form.setValue('imageUrl', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue('imageUrl', '');
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    storage.addItem({
      ...values,
      type,
    });

    toast({
      title: "Report Submitted",
      description: `Your ${type} item report has been posted successfully.`,
    });

    setLocation("/items");
  }

  return (
    <Card className="w-full max-w-xl mx-auto shadow-lg border-border/60">
      <CardHeader className={type === 'lost' ? "bg-rose-50/50" : "bg-emerald-50/50"}>
        <CardTitle className="font-display text-2xl">
          Report {type === 'lost' ? 'Lost' : 'Found'} Item
        </CardTitle>
        <CardDescription>
          Fill in the details to help {type === 'lost' ? 'find your item' : 'return the item to its owner'}.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Item Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Type className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Blue Hydro Flask" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2">
                <Label>Upload Image (Optional)</Label>
                <div className="mt-2 flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border group">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          type="button" 
                          variant="destructive" 
                          size="sm" 
                          onClick={removeImage}
                          className="flex items-center gap-2"
                        >
                          <X className="w-4 h-4" /> Remove Image
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full">
                      <label 
                        htmlFor="image-upload" 
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/5 hover:bg-muted/10 transition-colors"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <ImagePlus className="w-8 h-8 text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload image</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                        <input 
                          id="image-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                         <div className="relative">
                          <SelectTrigger className="pl-9">
                             <Tag className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                         </div>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="date" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Location {type === 'lost' ? 'Last Seen' : 'Found'}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="e.g. Main Library, 2nd Floor" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Contact Info (Email or Phone)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="How can people reach you?" className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Provide details like color, size, distinct marks..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className={cn(
              "w-full font-semibold text-lg h-12",
              type === 'lost' 
                ? "bg-rose-600 hover:bg-rose-700" 
                : "bg-emerald-600 hover:bg-emerald-700"
            )}>
              Submit {type === 'lost' ? 'Lost' : 'Found'} Report
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
