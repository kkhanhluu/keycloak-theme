import { KcApp } from 'KcApp';
import { kcContext } from 'KcApp/context';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './index.scss';

// const { kcContext } = getKcContext({
//   mockPageId: 'register.ftl',
// });

// if (kcContext !== undefined) {
//   console.log(kcContext);
// }

// function KcApp() {
//   if (kcContext === undefined) {
//     throw new Error();
//   }

//   const { css } = useCssAndCx();

//   return (
//     <KcAppBase
//       kcContext={kcContext}
//       {...{
//         ...defaultKcProps,
//         kcHeaderWrapperClass: css({ color: 'red', fontFamily: '"Work Sans"' }),
//       }}
//     />
//   );
// }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {kcContext === undefined ? <App /> : <KcApp kcContext={kcContext} />}
  </StrictMode>
);
