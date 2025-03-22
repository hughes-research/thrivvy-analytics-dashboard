import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart3, 
  Map,
  CalendarRange, 
  Users, 
  Settings, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isSidebarCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ 
  href, 
  icon, 
  label, 
  isActive,
  isSidebarCollapsed
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 transition-colors',
        isActive 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      )}
    >
      <span className="text-xl">{icon}</span>
      {!isSidebarCollapsed && (
        <span className="font-medium">{label}</span>
      )}
    </Link>
  );
};

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const navItems = [
    {
      href: '/',
      icon: <LayoutDashboard size={20} />,
      label: 'Dashboard',
    },
    {
      href: '/products',
      icon: <ShoppingCart size={20} />,
      label: 'Products',
    },
    {
      href: '/analytics',
      icon: <BarChart3 size={20} />,
      label: 'Analytics',
    },
    {
      href: '/advanced-analytics',
      icon: <BarChart3 size={20} className="text-indigo-600" />,
      label: 'Advanced Analytics',
    },
    {
      href: '/distribution',
      icon: <Map size={20} />,
      label: 'Distribution',
    },
    {
      href: '/promotions',
      icon: <CalendarRange size={20} />,
      label: 'Promotions',
    },
    {
      href: '/customers',
      icon: <Users size={20} />,
      label: 'Customers',
    },
    {
      href: '/settings',
      icon: <Settings size={20} />,
      label: 'Settings',
    },
  ];

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 z-20 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300',
        isSidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-primary-600"></div>
            <span className="text-xl font-bold text-gray-900">Thrivvy</span>
          </div>
        )}
        <button
          className="rounded p-1 hover:bg-gray-100"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        >
          {isSidebarCollapsed ? (
            <Menu size={20} className="text-gray-500" />
          ) : (
            <X size={20} className="text-gray-500" />
          )}
        </button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => (
          <NavItem
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={pathname === item.href}
            isSidebarCollapsed={isSidebarCollapsed}
          />
        ))}
      </nav>

      <div className="border-t border-gray-200 p-4">
        <NavItem
          href="/help"
          icon={<HelpCircle size={20} />}
          label="Help & Support"
          isActive={pathname === '/help'}
          isSidebarCollapsed={isSidebarCollapsed}
        />
      </div>
    </aside>
  );
};
