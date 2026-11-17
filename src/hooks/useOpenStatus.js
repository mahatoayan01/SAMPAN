import { restaurant } from '../data/restaurant';

export function useOpenStatus() {
  const now = new Date();
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = days[now.getDay()];
  const todayHours = restaurant.hours.find((h) => h.day === todayName);

  if (!todayHours) return { isOpen: false, text: 'Hours unavailable' };

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);

  let openMinutes = openH * 60 + openM;
  let closeMinutes = closeH * 60 + closeM;

  // If close is midnight (0:00), treat as 24:00
  if (closeMinutes === 0) closeMinutes = 24 * 60;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  return {
    isOpen,
    text: isOpen ? 'Open Now' : 'Closed',
    todayHours: `${todayHours.open} – ${todayHours.close === '00:00' ? 'Midnight' : todayHours.close}`,
  };
}
