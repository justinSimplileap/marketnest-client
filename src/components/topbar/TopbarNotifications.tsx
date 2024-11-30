// src/components/topbar/TopbarNotifications.tsx
import Image from 'next/image';
import { useAppContext } from '../../context/AppContext';
import NotificationBell from '@/assets/General/bell-small.png';

const TopbarNotifications: React.FC = () => {
  const { notifications } = useAppContext();
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <Image src={NotificationBell} alt="Bell" width={70} />
      {unreadCount > 0 && (
        <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default TopbarNotifications;
