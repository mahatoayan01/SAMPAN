import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, IndianRupee, Clock, CalendarDays, Search, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sampleOrders, samplePayments, sampleBookings } from '../data/restaurant';
import { getFromStorage, saveToStorage, formatDate, formatTime, formatCurrency } from '../utils';

const ORDER_STATUSES = ['New', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
const STATUS_COLORS = {
  New: 'bg-blue-500/20 text-blue-400',
  Preparing: 'bg-yellow-500/20 text-yellow-400',
  Ready: 'bg-green-500/20 text-green-400',
  Delivered: 'bg-dark-600/30 text-dark-300',
  Cancelled: 'bg-red-500/20 text-red-400',
};
const PAYMENT_COLORS = {
  Paid: 'text-green-400',
  Pending: 'text-yellow-400',
  Refunded: 'text-red-400',
};

function mergeData(sampleData, storageKey, idField = 'id') {
  const stored = getFromStorage(storageKey, []);
  const storedIds = new Set(stored.map((d) => d[idField]));
  const merged = [...stored];
  for (const s of sampleData) {
    if (!storedIds.has(s[idField])) {
      merged.push({ ...s, sample: true });
    }
  }
  return merged;
}

export default function OwnerDashboard() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState('orders');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoggedIn) navigate('/owner-login', { replace: true });
  }, [isLoggedIn, navigate]);

  // Merge sample + real data
  const [allOrders, setAllOrders] = useState(() => mergeData(sampleOrders, 'sampan-orders'));
  const allPayments = useMemo(() => mergeData(samplePayments, 'sampan-payments'), []);
  const allBookings = useMemo(() => {
    const stored = getFromStorage('sampan-bookings', []);
    return [...stored, ...sampleBookings.map((b) => ({ ...b, sample: true }))];
  }, []);

  // Stats
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.filter((o) => o.status !== 'Cancelled').reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = allOrders.filter((o) => ['New', 'Preparing'].includes(o.status)).length;
  const today = new Date().toDateString();
  const todayOrders = allOrders.filter((o) => new Date(o.date).toDateString() === today).length;

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return allOrders
      .filter((o) => statusFilter === 'all' || o.status === statusFilter)
      .filter((o) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          o.id.toLowerCase().includes(q) ||
          o.customer.toLowerCase().includes(q) ||
          o.items.some((it) => it.name.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [allOrders, statusFilter, searchQuery]);

  const updateOrderStatus = (orderId, newStatus) => {
    setAllOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      // Save to localStorage (non-sample)
      const toStore = updated.filter((o) => !o.sample);
      saveToStorage('sampan-orders', toStore);
      return updated;
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <div className="bg-dark-900 border-b border-dark-800 px-4 py-4">
        <div className="container-max flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold text-white">Owner Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-dark-400 text-xs hidden sm:inline">Demo Mode</span>
            <button onClick={() => { logout(); navigate('/'); }} className="flex items-center gap-1 text-sm text-dark-300 hover:text-red-400 transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container-max px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-dark-900 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Package size={20} className="text-primary-500" />
              <span className="text-dark-400 text-sm">Total Orders</span>
            </div>
            <p className="text-white text-2xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-dark-900 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <IndianRupee size={20} className="text-green-500" />
              <span className="text-dark-400 text-sm">Total Revenue</span>
            </div>
            <p className="text-white text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
          <div className="bg-dark-900 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Clock size={20} className="text-yellow-500" />
              <span className="text-dark-400 text-sm">Pending</span>
            </div>
            <p className="text-white text-2xl font-bold">{pendingOrders}</p>
          </div>
          <div className="bg-dark-900 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays size={20} className="text-blue-500" />
              <span className="text-dark-400 text-sm">Today</span>
            </div>
            <p className="text-white text-2xl font-bold">{todayOrders}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-dark-900 rounded-xl p-1 mb-6 max-w-md">
          {['orders', 'payments', 'bookings'].map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${tab === t ? 'bg-primary-500 text-dark-900' : 'text-dark-300 hover:text-white'}`}>
              {t}
            </button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
                <input type="text" placeholder="Search orders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-dark-900 text-white pl-9 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                <button onClick={() => setStatusFilter('all')} className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium ${statusFilter === 'all' ? 'bg-primary-500 text-dark-900' : 'bg-dark-900 text-dark-300'}`}>All</button>
                {ORDER_STATUSES.map((s) => (
                  <button key={s} onClick={() => setStatusFilter(s)} className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs font-medium ${statusFilter === s ? 'bg-primary-500 text-dark-900' : 'bg-dark-900 text-dark-300'}`}>{s}</button>
                ))}
              </div>
            </div>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-800">
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Order ID</th>
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Date</th>
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Customer</th>
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Items</th>
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Type</th>
                    <th className="text-right text-dark-400 font-medium py-3 px-3">Amount</th>
                    <th className="text-left text-dark-400 font-medium py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-dark-800/50 hover:bg-dark-900/50">
                      <td className="py-3 px-3">
                        <span className="text-primary-500 font-mono text-xs">{order.id}</span>
                        {order.sample && <span className="text-[9px] text-dark-600 block">Sample</span>}
                      </td>
                      <td className="py-3 px-3 text-dark-300">{formatDate(order.date)} {formatTime(order.date)}</td>
                      <td className="py-3 px-3 text-white">{order.customer}</td>
                      <td className="py-3 px-3 text-dark-300 max-w-[200px]">
                        <span className="truncate block">{order.items.map((it) => `${it.qty}x ${it.name}`).join(', ')}</span>
                      </td>
                      <td className="py-3 px-3 text-dark-300 capitalize">{order.orderType}</td>
                      <td className="py-3 px-3 text-white font-semibold text-right">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-3">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          className={`text-xs font-semibold px-2 py-1 rounded-lg bg-dark-800 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 ${STATUS_COLORS[order.status] || ''}`}
                        >
                          {ORDER_STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-3">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-dark-900 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-primary-500 font-mono text-xs">{order.id}</span>
                      {order.sample && <span className="text-[9px] text-dark-600 ml-2">Sample</span>}
                      <p className="text-white font-semibold mt-1">{order.customer}</p>
                    </div>
                    <span className="text-primary-500 font-bold">{formatCurrency(order.total)}</span>
                  </div>
                  <p className="text-dark-400 text-xs">{formatDate(order.date)} {formatTime(order.date)} • {order.orderType}</p>
                  <p className="text-dark-300 text-xs">{order.items.map((it) => `${it.qty}x ${it.name}`).join(', ')}</p>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg bg-dark-800 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 w-full ${STATUS_COLORS[order.status] || ''}`}
                  >
                    {ORDER_STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {filteredOrders.length === 0 && (
              <p className="text-dark-400 text-center py-10">No orders match your filters.</p>
            )}
          </>
        )}

        {/* PAYMENTS TAB */}
        {tab === 'payments' && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left text-dark-400 font-medium py-3 px-3">Payment ID</th>
                  <th className="text-left text-dark-400 font-medium py-3 px-3">Order ID</th>
                  <th className="text-left text-dark-400 font-medium py-3 px-3">Method</th>
                  <th className="text-right text-dark-400 font-medium py-3 px-3">Amount</th>
                  <th className="text-left text-dark-400 font-medium py-3 px-3">Status</th>
                  <th className="text-left text-dark-400 font-medium py-3 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {allPayments.sort((a, b) => new Date(b.date) - new Date(a.date)).map((p) => (
                  <tr key={p.id} className="border-b border-dark-800/50 hover:bg-dark-900/50">
                    <td className="py-3 px-3 text-primary-500 font-mono text-xs">{p.id}</td>
                    <td className="py-3 px-3 text-dark-300 font-mono text-xs">{p.orderId}</td>
                    <td className="py-3 px-3 text-white">{p.method}</td>
                    <td className="py-3 px-3 text-white font-semibold text-right">{formatCurrency(p.amount)}</td>
                    <td className={`py-3 px-3 font-semibold ${PAYMENT_COLORS[p.status] || 'text-dark-300'}`}>{p.status}</td>
                    <td className="py-3 px-3 text-dark-300">{formatDate(p.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* BOOKINGS TAB */}
        {tab === 'bookings' && (
          <div className="space-y-3">
            {allBookings.length === 0 ? (
              <p className="text-dark-400 text-center py-10">No bookings yet.</p>
            ) : (
              allBookings.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)).map((b) => (
                <div key={b.id} className="bg-dark-900 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-primary-500 font-mono text-xs">{b.id}</span>
                      {b.sample && <span className="text-[9px] text-dark-600">Sample</span>}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${b.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{b.status}</span>
                    </div>
                    <p className="text-white font-semibold">{b.name}</p>
                    <p className="text-dark-400 text-sm">{b.phone}</p>
                  </div>
                  <div className="text-sm text-dark-300">
                    <p>📅 {b.date} at {b.time}</p>
                    <p>👥 {b.guests} guests</p>
                    {b.notes && <p>📝 {b.notes}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <p className="text-dark-600 text-xs text-center mt-10">Sample data is labelled. Real orders placed through the demo checkout appear here too.</p>
      </div>
    </div>
  );
}
