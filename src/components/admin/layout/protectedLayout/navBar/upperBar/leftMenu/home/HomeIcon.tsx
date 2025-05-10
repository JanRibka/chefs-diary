import Link from 'next/link';
import { FiHome } from 'react-icons/fi';

import Icon from '@/components/shared/icon/Icon';
import adminRoutes from '@/lib/routes/adminRoutes';

const HomeIcon = () => {
  return (
    <Link href={adminRoutes.Dashboard}>
      <Icon>
        <FiHome fontSize="x-large" />
      </Icon>
    </Link>
  );
};

export default HomeIcon;
