import { 
    ClipboardIcon, 
    InboxIcon, 
    ShoppingCartIcon, 
    ChartBarIcon, 
    CogIcon 
  } from "lucide-react";
  
  // A static menu getter that doesn't require translation hooks
  // Useful for server components or where hooks can't be used
  export const getStaticMenu = (t: (key: string) => string) => {
    return [
      {
        catalog: 'main',
        listItems: [
          {
            isLink: true,
            url: '/home',
            icon: ClipboardIcon,
            label: t('menu.addProducts'),
            role: 'farmer', // Only for farmers
          },
          {
            isLink: true,
            url: '/view-products',
            icon: CogIcon,
            label: t('menu.manageProducts'),
            role: 'farmer', // Only for farmers
          },
          {
            isLink: true,
            url: '/requests',
            icon: InboxIcon,
            label: t('menu.requests'),
            role: 'farmer', // Only for farmers
          },
          {
            isLink: true,
            url: '/sold-products',
            icon: ShoppingCartIcon,
            label: t('menu.soldProducts'),
            role: 'farmer', // Only for farmers
          },
          {
            isLink: true,
            url: '/analytics',
            icon: ChartBarIcon,
            label: t('menu.analytics'),
            role: 'farmer', // Only for farmers
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
        ],
      },
    ];
  };
  