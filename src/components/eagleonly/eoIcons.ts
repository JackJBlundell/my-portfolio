import {
  BellRing,
  CalendarClock,
  CreditCard,
  Headphones,
  LayoutDashboard,
  LucideIcon,
  Megaphone,
  ShoppingBag,
  Smartphone,
  Store,
  Trophy,
  Users,
} from 'lucide-react';

// One icon per EagleOnly feature, keyed by the slug in src/data/eagleonly.ts
export const EO_FEATURE_ICONS: Record<string, LucideIcon> = {
  'member-app': Smartphone,
  'admin-crm': LayoutDashboard,
  'tee-sheet': CalendarClock,
  opentee: Users,
  competitions: Trophy,
  marketplace: ShoppingBag,
  advertising: Megaphone,
  retention: BellRing,
  payments: CreditCard,
  support: Headphones,
  albatross: Store,
};

export const eoIcon = (slug: string): LucideIcon => EO_FEATURE_ICONS[slug] ?? Smartphone;
