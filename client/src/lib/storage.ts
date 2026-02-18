import { nanoid } from 'nanoid';

export interface Item {
  id: string;
  type: 'lost' | 'found';
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  contact: string;
  status: 'open' | 'claimed';
  createdAt: number;
  imageUrl?: string;
}

const STORAGE_KEY = 'campus-lost-and-found-items';

// Initialize with some dummy data if empty
const DUMMY_DATA: Item[] = [
  {
    id: '1',
    type: 'lost',
    title: 'Blue Hydro Flask',
    description: 'Left it in the library quiet study area. Has a "Save the Bees" sticker.',
    category: 'Water Bottle',
    date: '2023-10-25',
    location: 'Main Library, 2nd Floor',
    contact: 'student@example.com',
    status: 'open',
    createdAt: Date.now() - 10000000
  },
  {
    id: '2',
    type: 'found',
    title: 'AirPods Pro Case',
    description: 'Found on a bench near the Science Center fountain.',
    category: 'Electronics',
    date: '2023-10-26',
    location: 'Science Center Quad',
    contact: 'finder@example.com',
    status: 'open',
    createdAt: Date.now() - 5000000
  },
  {
    id: '3',
    type: 'lost',
    title: 'Calculus Textbook',
    description: 'Stewart Calculus, 8th Edition. Left in Room 304.',
    category: 'Books',
    date: '2023-10-24',
    location: 'Engineering Hall',
    contact: 'math_student@example.com',
    status: 'claimed',
    createdAt: Date.now() - 15000000
  }
];

export const storage = {
  getItems: (): Item[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Seed with dummy data for first visit so it looks good
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DUMMY_DATA));
      return DUMMY_DATA;
    }
    return JSON.parse(stored);
  },

  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'status'>) => {
    const items = storage.getItems();
    const newItem: Item = {
      ...item,
      id: nanoid(),
      createdAt: Date.now(),
      status: 'open'
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([newItem, ...items]));
    return newItem;
  },

  updateItemStatus: (id: string, status: 'open' | 'claimed') => {
    const items = storage.getItems();
    const updated = items.map(item => 
      item.id === id ? { ...item, status } : item
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteItem: (id: string) => {
    const items = storage.getItems();
    const filtered = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};
