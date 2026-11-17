import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Smartphone, Banknote, AlertTriangle, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurant } from '../data/restaurant';
import { formatCurrency, generateOrderId, generatePaymentId, saveToStorage, getFromStorage } from '../utils';

const TAX_RATE = 0.05; // 5% GST

export default function Cart() {
  const { cart, updateQuantity, removeItem, clearCart, subtotal } = useCart();
  const [step, setStep] = useState('cart'); // cart, details, payment, success
  const [orderType, setOrderType] = useState('delivery');
  const [customer, setCustomer] = useState({ name: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [errors, setErrors] = useState({});
  const [completedOrder, setCompletedOrder] = useState(null);

  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  const validateDetails = () => {
    const errs = {};
    if (!customer.name.trim()) errs.name = 'Name is required';
    if (!customer.phone.trim() || customer.phone.length < 10) errs.phone = 'Valid phone required';
    if (orderType === 'delivery' && !customer.address.trim()) errs.address = 'Delivery address required';
    return errs;
  };

  const handleProceedToPayment = () => {
    const errs = validateDetails();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    const orderId = generateOrderId();
    const payId = generatePaymentId();
    const now = new Date().toISOString();

    const order = {
      id: orderId,
      date: now,
      customer: customer.name,
      phone: customer.phone,
      address: orderType === 'delivery' ? customer.address : '',
      items: cart.map((item) => ({ name: item.name, qty: item.quantity, price: item.price })),
      orderType,
      status: 'New',
      total,
      sample: false,
    };

    const payment = {
      id: payId,
      orderId,
      method: paymentMethod === 'upi' ? 'UPI' : paymentMethod === 'card' ? 'Card' : 'Cash',
      amount: total,
      status: paymentMethod === 'cod' ? 'Pending' : 'Paid',
      date: now,
      sample: false,
    };

    const orders = getFromStorage('sampan-orders', []);
    saveToStorage('sampan-orders', [order, ...orders]);

    const payments = getFromStorage('sampan-payments', []);
    saveToStorage('sampan-payments', [payment, ...payments]);

    setCompletedOrder({ order, payment });
    clearCart();
    setStep('success');
  };

  if (step === 'success' && completedOrder) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="bg-dark-900 rounded-2xl p-8 max-w-md w-full text-center">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Order Placed!</h1>
          <p className="text-dark-300 mb-6">Your order has been placed successfully.</p>
          <div className="bg-dark-800 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm"><span className="text-dark-400">Order ID</span><span className="text-primary-500 font-mono">{completedOrder.order.id}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dark-400">Type</span><span className="text-white capitalize">{completedOrder.order.orderType}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dark-400">Payment</span><span className="text-white">{completedOrder.payment.method}</span></div>
            <div className="flex justify-between text-sm"><span className="text-dark-400">Total</span><span className="text-primary-500 font-bold">{formatCurrency(completedOrder.order.total)}</span></div>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/menu" className="btn-primary text-center">Order More</Link>
            <Link to="/" className="text-primary-500 hover:underline text-sm">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
        <div className="text-center">
          <ShoppingBag size={56} className="text-dark-600 mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-dark-400 mb-6">Add some delicious dishes from our menu!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950">
      <div className="bg-dark-900 py-10 px-4">
        <div className="container-max text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-2">
            {step === 'cart' ? 'Your Cart' : step === 'details' ? 'Your Details' : 'Payment'}
          </h1>
        </div>
      </div>

      <div className="container-max section-padding max-w-3xl mx-auto">
        {/* Demo banner */}
        <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-yellow-300 text-sm">
            <strong>Demo only</strong> — No real payment is processed. No real food will be delivered. This is a demonstration website.
          </p>
        </div>

        {step === 'cart' && (
          <>
            <div className="space-y-3 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="bg-dark-900 rounded-xl p-4 flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg shrink-0" onError={(e) => { e.target.style.display = 'none'; }} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm truncate">{item.name}</h3>
                    <p className="text-primary-500 text-sm font-medium">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 bg-dark-800 rounded-lg hover:bg-dark-700 text-primary-500" aria-label="Decrease"><Minus size={14} /></button>
                    <span className="text-white font-semibold text-sm w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 bg-dark-800 rounded-lg hover:bg-dark-700 text-primary-500" aria-label="Increase"><Plus size={14} /></button>
                  </div>
                  <p className="text-white font-bold text-sm w-16 text-right">{formatCurrency(item.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.id)} className="p-1.5 text-dark-500 hover:text-red-500 transition-colors" aria-label="Remove"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>

            <div className="bg-dark-900 rounded-xl p-6 space-y-3">
              <div className="flex justify-between text-sm"><span className="text-dark-400">Subtotal</span><span className="text-white">{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-dark-400">GST (5%)</span><span className="text-white">{formatCurrency(tax)}</span></div>
              <div className="flex justify-between text-lg font-bold border-t border-dark-800 pt-3"><span className="text-white">Total</span><span className="text-primary-500">{formatCurrency(total)}</span></div>
              <button onClick={() => setStep('details')} className="btn-primary w-full mt-4">Proceed to Checkout</button>
            </div>
          </>
        )}

        {step === 'details' && (
          <div className="bg-dark-900 rounded-xl p-6 space-y-5">
            <button onClick={() => setStep('cart')} className="text-primary-500 hover:underline text-sm flex items-center gap-1"><ArrowLeft size={14} /> Back to Cart</button>
            
            {/* Order type */}
            <div>
              <label className="text-white font-semibold text-sm block mb-2">Order Type</label>
              <div className="flex gap-2">
                {['delivery', 'pickup', 'dine-in'].map((type) => (
                  <button key={type} onClick={() => setOrderType(type)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${orderType === type ? 'bg-primary-500 text-dark-900' : 'bg-dark-800 text-dark-300 hover:text-white'}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <input type="text" placeholder="Full Name *" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Phone Number *" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
              {orderType === 'delivery' && (
                <div>
                  <textarea placeholder="Delivery Address *" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} rows={2} className="w-full bg-dark-800 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500 resize-none" />
                  {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                </div>
              )}
            </div>

            <div className="bg-dark-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-white font-bold">Total</span>
              <span className="text-primary-500 font-bold text-lg">{formatCurrency(total)}</span>
            </div>

            <button onClick={handleProceedToPayment} className="btn-primary w-full">Continue to Payment</button>
          </div>
        )}

        {step === 'payment' && (
          <div className="bg-dark-900 rounded-xl p-6 space-y-5">
            <button onClick={() => setStep('details')} className="text-primary-500 hover:underline text-sm flex items-center gap-1"><ArrowLeft size={14} /> Back</button>
            
            <h3 className="text-white font-semibold text-lg">Select Payment Method</h3>
            <div className="grid grid-cols-3 gap-3">
              <button onClick={() => setPaymentMethod('upi')} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${paymentMethod === 'upi' ? 'bg-primary-500/10 ring-2 ring-primary-500' : 'bg-dark-800 hover:bg-dark-700'}`}>
                <Smartphone size={24} className={paymentMethod === 'upi' ? 'text-primary-500' : 'text-dark-400'} />
                <span className={`text-sm font-medium ${paymentMethod === 'upi' ? 'text-primary-500' : 'text-dark-300'}`}>UPI</span>
              </button>
              <button onClick={() => setPaymentMethod('card')} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${paymentMethod === 'card' ? 'bg-primary-500/10 ring-2 ring-primary-500' : 'bg-dark-800 hover:bg-dark-700'}`}>
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-primary-500' : 'text-dark-400'} />
                <span className={`text-sm font-medium ${paymentMethod === 'card' ? 'text-primary-500' : 'text-dark-300'}`}>Card</span>
              </button>
              <button onClick={() => setPaymentMethod('cod')} className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${paymentMethod === 'cod' ? 'bg-primary-500/10 ring-2 ring-primary-500' : 'bg-dark-800 hover:bg-dark-700'}`}>
                <Banknote size={24} className={paymentMethod === 'cod' ? 'text-primary-500' : 'text-dark-400'} />
                <span className={`text-sm font-medium ${paymentMethod === 'cod' ? 'text-primary-500' : 'text-dark-300'}`}>Cash</span>
              </button>
            </div>

            {paymentMethod === 'upi' && (
              <div className="bg-dark-800 rounded-xl p-4 space-y-3">
                <input type="text" placeholder="UPI ID (e.g. name@upi)" className="w-full bg-dark-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" defaultValue="demo@upi" />
                <p className="text-dark-500 text-xs">Demo — no UPI payment will be processed</p>
              </div>
            )}
            {paymentMethod === 'card' && (
              <div className="bg-dark-800 rounded-xl p-4 space-y-3">
                <input type="text" placeholder="Card Number" className="w-full bg-dark-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" defaultValue="4111 1111 1111 1111" />
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="MM/YY" className="w-full bg-dark-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" defaultValue="12/28" />
                  <input type="text" placeholder="CVV" className="w-full bg-dark-700 text-white px-4 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 placeholder:text-dark-500" defaultValue="***" />
                </div>
                <p className="text-dark-500 text-xs">Demo — card numbers are NOT stored or processed</p>
              </div>
            )}
            {paymentMethod === 'cod' && (
              <div className="bg-dark-800 rounded-xl p-4">
                <p className="text-dark-300 text-sm">Pay with cash when your order is {orderType === 'delivery' ? 'delivered' : 'ready'}.</p>
              </div>
            )}

            <div className="bg-dark-800 rounded-xl p-4 flex justify-between items-center">
              <span className="text-white font-bold">Total to Pay</span>
              <span className="text-primary-500 font-bold text-lg">{formatCurrency(total)}</span>
            </div>

            <button onClick={handlePlaceOrder} className="btn-primary w-full text-lg py-4">
              Place Order — {formatCurrency(total)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
