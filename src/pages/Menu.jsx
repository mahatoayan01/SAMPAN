import { useState, useMemo } from 'react';
import { Search, Filter, Plus, Minus, Leaf, Drumstick } from 'lucide-react';
import { menuCategories } from '../data/restaurant';
import { useCart } from '../context/CartContext';
import LazyImage from '../components/LazyImage';
import { formatCurrency } from '../utils';

export default function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [vegFilter, setVegFilter] = useState('all'); // 'all', 'veg', 'nonveg'
  const { cart, addItem, updateQuantity } = useCart();

  const getCartQty = (id) => {
    const item = cart.find((c) => c.id === id);
    return item ? item.quantity : 0;
  };

  const filteredCategories = useMemo(() => {
    return menuCategories
      .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        items: cat.items.filter((item) => {
          const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.description.toLowerCase().includes(search.toLowerCase());
          const matchVeg = vegFilter === 'all' || (vegFilter === 'veg' ? item.veg : !item.veg);
          return matchSearch && matchVeg;
        }),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search, activeCategory, vegFilter]);

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Hero */}
      <div className="bg-dark-900 py-10 px-4">
        <div className="container-max text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">Our Menu</h1>
          <p className="text-dark-400">Bold flavours, generous portions, great prices</p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-20 bg-dark-950/95 backdrop-blur-md border-b border-dark-800">
        <div className="container-max px-4 py-3">
          {/* Search + Veg filter */}
          <div className="flex gap-3 mb-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
              <input
                type="text"
                placeholder="Search dishes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-dark-800 text-white pl-10 pr-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500"
              />
            </div>
            <div className="flex gap-1 bg-dark-800 rounded-lg p-1">
              <button
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${vegFilter === 'all' ? 'bg-primary-500 text-dark-900' : 'text-dark-300 hover:text-white'}`}
              >
                All
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${vegFilter === 'veg' ? 'bg-green-600 text-white' : 'text-dark-300 hover:text-white'}`}
              >
                <Leaf size={12} /> Veg
              </button>
              <button
                onClick={() => setVegFilter('nonveg')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1 ${vegFilter === 'nonveg' ? 'bg-red-600 text-white' : 'text-dark-300 hover:text-white'}`}
              >
                <Drumstick size={12} /> Non-Veg
              </button>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary-500 text-dark-900' : 'bg-dark-800 text-dark-300 hover:text-white'}`}
            >
              All
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary-500 text-dark-900' : 'bg-dark-800 text-dark-300 hover:text-white'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="container-max px-4 py-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-dark-400 text-lg">No dishes found</p>
            <button onClick={() => { setSearch(''); setVegFilter('all'); setActiveCategory('all'); }} className="text-primary-500 hover:underline mt-2">
              Clear filters
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => (
            <div key={cat.id} className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-white mb-5">{cat.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item) => {
                  const qty = getCartQty(item.id);
                  return (
                    <div key={item.id} className="bg-dark-900 rounded-xl overflow-hidden flex flex-col">
                      <div className="relative">
                        <LazyImage
                          src={item.image}
                          alt={item.name}
                          imageSource={item.imageSource}
                          className="w-full h-40 object-cover"
                        />
                        <span className={`absolute top-2 right-2 w-4 h-4 rounded-sm border-2 ${item.veg ? 'border-green-500' : 'border-red-500'}`}>
                          <span className={`block w-2 h-2 rounded-full mx-auto mt-0.5 ${item.veg ? 'bg-green-500' : 'bg-red-500'}`} />
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                        <p className="text-dark-400 text-xs mt-1 flex-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-primary-500 font-bold">{formatCurrency(item.price)}</span>
                          {qty === 0 ? (
                            <button
                              onClick={() => addItem({ id: item.id, name: item.name, price: item.price, image: item.image })}
                              className="bg-primary-500 hover:bg-primary-600 text-dark-900 text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <Plus size={14} /> Add
                            </button>
                          ) : (
                            <div className="flex items-center gap-2 bg-dark-800 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, qty - 1)}
                                className="p-1.5 text-primary-500 hover:bg-dark-700 rounded-l-lg transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="text-white font-semibold text-sm w-6 text-center">{qty}</span>
                              <button
                                onClick={() => updateQuantity(item.id, qty + 1)}
                                className="p-1.5 text-primary-500 hover:bg-dark-700 rounded-r-lg transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
