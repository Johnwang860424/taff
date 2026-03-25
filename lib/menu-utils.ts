export interface FlavorSchedule {
  flavor: string[];
  price: number;
  dates: string[];
}

export interface MenuItem {
  name: string;
  img: string;
  flavorSchedules: FlavorSchedule[];
}

export interface MenuData {
  shippableItems: MenuItem[];
  pickupOnlyItems: MenuItem[];
}

export const isDateExpired = (dateStr: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr) < today;
};

export const getPriceDisplay = (item: MenuItem): string => {
  const prices = item.flavorSchedules
    .map((fs) => fs.price)
    .filter((p) => p > 0);
  if (prices.length === 0) return "$ —";
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return min === max ? `$ ${min}` : `$${min} 起`;
};
