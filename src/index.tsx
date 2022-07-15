/* eslint-disable react-hooks/rules-of-hooks */
import { ChakraProvider } from '@chakra-ui/react';
import { App } from 'App';
import { KcApp } from 'KcApp';
import { kcContext } from 'KcApp/context';
import { createRoot } from 'react-dom/client';
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
  <ChakraProvider>
    {kcContext === undefined ? <App /> : <KcApp kcContext={kcContext} />}
  </ChakraProvider>
);
