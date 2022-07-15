import { defaultKcProps as props } from 'keycloakify';
import { Error } from 'keycloakify/lib/components/Error';
import { Info } from 'keycloakify/lib/components/Info';
import { KcApp as KcAppBase } from 'keycloakify/lib/components/KcApp';
import { memo } from 'react';
import type { KcContext } from './context';
import './kcMessagesExtension';
import { Login } from './Login';
import { Register } from './Register';

export const KcApp = memo(({ kcContext }: { kcContext: KcContext }) => {
  switch (kcContext.pageId) {
    case 'login.ftl':
      return <Login {...{ kcContext, ...props }} />;
    case 'register.ftl':
      return <Register {...{ kcContext, ...props }} />;
    case 'info.ftl':
      return <Info {...{ kcContext, ...props }} />;
    case 'error.ftl':
      return <Error {...{ kcContext, ...props }} />;
    default:
      return <KcAppBase {...{ kcContext, ...props }} />;
  }
});
