// Utility to safely read/write localStorage
export function getFromStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable
  }
}

export function generateOrderId() {
  return 'ORD-' + Date.now().toString(36).toUpperCase();
}

export function generatePaymentId() {
  return 'PAY-' + Date.now().toString(36).toUpperCase();
}

export function generateBookingId() {
  return 'BK-' + Date.now().toString(36).toUpperCase();
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatCurrency(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}
