import { 
  ClipboardIcon, 
  InboxIcon, 
  ShoppingCartIcon, 
  ChartBarIcon, 
  CogIcon,
  HelpCircleIcon,
  UsersIcon,
  AlertTriangleIcon,
  Building2
} from "lucide-react";
import { useTranslation } from "../../hooks/useTranslation";

// Create a function to get the translated menu
export const getMenu = () => {
  const { t } = useTranslation();
  
  return [
    {
      catalog: 'Navigation',
      listItems: [
        {
          isLink: true,
          url: '/home',
          icon: ChartBarIcon,
          label: 'Dashboard Overview',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/apmc-prices',
          icon: Building2,
          label: 'APMC Mandi Bhav',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/view-products',
          icon: ClipboardIcon,
          label: 'Upload New Crop',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/manageProduct',
          icon: CogIcon,
          label: 'My Uploaded Crops',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/sold-products',
          icon: ShoppingCartIcon,
          label: 'Buyer Orders & Sales',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/requests',
          icon: InboxIcon,
          label: 'Price Negotiations',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/analytics',
          icon: ChartBarIcon,
          label: 'Sales Analytics',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/help',
          icon: HelpCircleIcon,
          label: 'Farming Advisory',
          role: 'farmer',
        },
        {
          isLink: true,
          url: '/buyer-products',
          icon: ClipboardIcon,
          label: t('menu.products'),
          role: 'buyer', // Only for buyers
        },
        {
          isLink: true,
          url: '/apmc-prices',
          icon: Building2,
          label: 'APMC Mandi Bhav',
          role: 'buyer',
        },
        {
          isLink: true,
          url: '/history',
          icon: InboxIcon,
          label: t('menu.orders'),
          role: 'buyer', // Only for buyers
        },
        {
          isLink: true,
          url: '/buyer-analytics',
          icon: ChartBarIcon,
          label: t('menu.analytics'),
          role: 'buyer', // Only for buyers
        },
        {
          isLink: true,
          url: '/buyer-help',
          icon: HelpCircleIcon, // Unique icon for Help
          label: t('menu.Help'),
          role: 'buyer', // Only for farmers
        },
        {
          isLink: true,
          url: '/farmers',
          icon: UsersIcon, // Changed icon for farmers management
          label: 'farmers',
          role: 'admin', // Only for admin
        },
        {
          isLink: true,
          url: '/buyers',
          icon: UsersIcon, // Changed icon for buyers management
          label: 'buyers',
          role: 'admin', // Only for admin
        },
        {
          isLink: true,
          url: '/issues',
          icon: AlertTriangleIcon, // Changed icon for issues
          label: 'issues',
          role: 'admin', // Only for admin
        },
        {
          isLink: true,
          url: '/admin-analytics',
          icon: ChartBarIcon, // This icon is already appropriate for analytics
          label: 'analytics',
          role: 'admin', // Only for admin
        },
       
      ],
    },
  ];
};

// Export a non-translated version for static usage
export const menu = [
  {
    catalog: 'main',
    listItems: [
      {
        isLink: true,
        url: '/home',
        icon: ClipboardIcon,
        label: 'Dashboard Overview',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/apmc-prices',
        icon: Building2,
        label: 'APMC Mandi Bhav',
        role: 'farmer',
      },
      {
        isLink: true,
        url: '/view-products',
        icon: CogIcon,
        label: 'Manage Products',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/requests',
        icon: InboxIcon,
        label: 'Requests',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/sold-products',
        icon: ShoppingCartIcon,
        label: 'Sold Products',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/analytics',
        icon: ChartBarIcon,
        label: 'Analytics',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/help',
        icon: HelpCircleIcon, // Unique icon for Help
        label: 'Help',
        role: 'farmer', // Only for farmers
      },
      {
        isLink: true,
        url: '/buyer-products',
        icon: ClipboardIcon,
        label: 'Products',
        role: 'buyer', // Only for buyers
      },
      {
        isLink: true,
        url: '/apmc-prices',
        icon: Building2,
        label: 'APMC Mandi Bhav',
        role: 'buyer',
      },
      {
        isLink: true,
        url: '/history',
        icon: InboxIcon,
        label: 'Orders',
        role: 'buyer', // Only for buyers
      },
      {
        isLink: true,
        url: '/buyer-analytics',
        icon: ChartBarIcon,
        label: 'Analytics',
        role: 'buyer', // Only for buyers
      },
      {
        isLink: true,
        url: '/buyer-help',
        icon: HelpCircleIcon, // Unique icon for Help
        label: 'Help',
        role: 'buyer', // Only for buyers
      },
      {
        isLink: true,
        url: '/farmers',
        icon: UsersIcon, // Changed icon for farmers management
        label: 'farmers',
        role: 'admin', // Only for admin
      },
      {
        isLink: true,
        url: '/buyers',
        icon: UsersIcon, // Changed icon for buyers management
        label: 'buyers',
        role: 'admin', // Only for admin
      },
      {
        isLink: true,
        url: '/issues',
        icon: AlertTriangleIcon, // Changed icon for issues
        label: 'issues',
        role: 'admin', // Only for admin
      },
      {
        isLink: true,
        url: '/admin-analytics',
        icon: ChartBarIcon, // This icon is already appropriate for analytics
        label: 'analytics',
        role: 'admin', // Only for admin
      },
      
    ],
  },
];