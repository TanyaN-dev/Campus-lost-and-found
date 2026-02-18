import ItemForm from "@/components/item-form";

export default function Report({ params }: { params: { type?: string } }) {
  // Default to 'lost' if not specified, though the router should handle this
  const type = params?.type === 'found' ? 'found' : 'lost';

  return (
    <div className="container mx-auto px-4 py-12">
      <ItemForm type={type} />
    </div>
  );
}
