import React from "react";
import {
  Shield,
  ShieldAlert,
  Map,
  MessageCircle,
  CreditCard,
  Sparkles,
  Bell,
  Lock,
  Mic,
  MapPin,
  Cpu,
  Calendar,
  Route,
  Users,
  Star,
  Zap,
  CheckCircle,
  Radio,
  Newspaper,
  Pill,
  Phone,
  Activity,
  Navigation,
  DollarSign,
  Smartphone,
  Globe,
  Settings,
  TrendingUp,
  Award,
  Database,
  Server,
  Cloud,
  Code,
  Eye,
  Image,
  Video,
  Headphones,
} from "lucide-react";

const iconKeywords: Record<string, React.ComponentType<any>> = {
  // Safety & Emergency
  sos: ShieldAlert,
  emergency: ShieldAlert,
  shield: Shield,
  alertsafe: ShieldAlert,
  safety: Shield,
  security: Lock,

  // Navigation & Location
  map: Map,
  navigation: Navigation,
  route: Route,
  location: MapPin,
  directions: Navigation,
  locationtracking: MapPin,

  // Communication
  chat: MessageCircle,
  message: MessageCircle,
  messaging: MessageCircle,
  communication: MessageCircle,

  // Payments & Finance
  payment: CreditCard,
  billing: CreditCard,
  subscription: CreditCard,
  payout: DollarSign,
  financial: DollarSign,
  stripe: CreditCard,
  voucher: Award,
  savings: TrendingUp,

  // AI & Intelligence
  ai: Sparkles,
  "machine learning": Sparkles,
  intelligent: Sparkles,
  moderation: Eye,
  automated: Zap,

  // Notifications & Reminders
  reminder: Bell,
  notification: Bell,
  alert: Bell,

  // Voice & Audio
  voice: Mic,
  audio: Headphones,
  radio: Radio,
  speaker: Headphones,
  conversation: MessageCircle,

  // Hardware & Technical
  hardware: Cpu,
  device: Smartphone,
  sensor: Activity,
  "raspberry pi": Cpu,
  python: Code,

  // Calendar & Events
  calendar: Calendar,
  event: Calendar,
  booking: Calendar,
  schedule: Calendar,

  // Users & Community
  user: Users,
  community: Users,
  social: Users,
  feed: Globe,
  profile: Users,

  // Rating & Feedback
  rating: Star,
  review: Star,
  feedback: MessageCircle,

  // Data & Backend
  database: Database,
  backend: Server,
  api: Server,
  cloud: Cloud,
  infrastructure: Server,
  dispatch: Zap,

  // Media
  image: Image,
  photo: Image,
  video: Video,
  media: Image,

  // Health & Medical
  medical: Pill,
  medication: Pill,
  health: Activity,
  wellbeing: Activity,

  // News & Information
  news: Newspaper,
  information: Globe,

  // General Actions
  check: CheckCircle,
  verification: CheckCircle,
  validate: CheckCircle,
  setup: Settings,
  configuration: Settings,
  management: Settings,
  control: Settings,
  monitor: Eye,
  dashboard: TrendingUp,
  analytics: TrendingUp,
  tracking: Activity,
  history: Calendar,
  trip: Route,
  ride: Navigation,
  driver: Users,
  customer: Users,
  admin: Settings,
  crisis: Phone,
  "999": Phone,
  vehicle: Navigation,
  pricing: DollarSign,
  discount: Award,
  game: Sparkles,
  progress: TrendingUp,
  quiz: CheckCircle,
  tutorial: Globe,
  onboarding: CheckCircle,
  authentication: Lock,
  login: Lock,
};

export const getFeatureIcon = (
  featureText: string
): React.ComponentType<any> => {
  const lowerText = featureText.toLowerCase();

  // Check for keyword matches
  for (const [keyword, IconComponent] of Object.entries(iconKeywords)) {
    if (lowerText.includes(keyword)) {
      return IconComponent;
    }
  }

  // Default icon
  return CheckCircle;
};

export const getTechIcon = (techName: string): React.ComponentType<any> => {
  const lowerTech = techName.toLowerCase();

  const techIcons: Record<string, React.ComponentType<any>> = {
    react: Code,
    swift: Code,
    kotlin: Code,
    python: Code,
    node: Server,
    firebase: Database,
    aws: Cloud,
    stripe: CreditCard,
    mapbox: Map,
    revenue: TrendingUp,
    mycroft: Mic,
  };

  for (const [key, IconComponent] of Object.entries(techIcons)) {
    if (lowerTech.includes(key)) {
      return IconComponent;
    }
  }

  return Code;
};
