import { memo } from 'react';

import ClientReplaceGetReturnToUrl from '@/components/shared/clientReplaceGetReturnToUrl/ClientReplaceGetReturnToUrl';
import webRoutes from '@/lib/routes/webRoutes';

/**
 * LogInSuccess component - handles successful login redirect
 * @returns JSX.Element
 */
const LogInSuccess = memo(() => {
  return <ClientReplaceGetReturnToUrl defaultRoute={webRoutes.Home} />;
});

LogInSuccess.displayName = "LogInSuccess";

export default LogInSuccess;
