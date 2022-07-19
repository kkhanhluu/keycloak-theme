/* eslint-disable react-hooks/rules-of-hooks */
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  ChakraProvider,
  Flex,
  HStack,
  Input,
  PinInput,
  PinInputField,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FormHeader } from 'KcApp/components/FormHeader';
import { KcProps } from 'keycloakify';
import { Template } from 'keycloakify/lib/components/Template';
import { memo, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useCssAndCx } from 'tss-react';
import type { KcContext } from '../context';
import './style.css';

type KcContext_LoginOTP = Extract<KcContext, { pageId: 'login-otp.ftl' }>;

export const LoginOTP = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_LoginOTP } & KcProps) => {
    const { url, otpLogin } = kcContext;
    const [otp, setOtp] = useState(['', '', '', '', '', '', '']);

    const { cx } = useCssAndCx();

    const [_, setVisible] = useState(false);

    const errorIcon = document.querySelector('.chakra-alert__icon');
    const measuredRef = useCallback((node: HTMLFormElement | null) => {
      if (node !== null) {
        setVisible(true);
      }
    }, []);

    if (errorIcon) {
      const element = document.createElement('div');
      element.id = 'error-icon';
      errorIcon.appendChild(element);
      createRoot(document.getElementById('error-icon')!).render(
        <ChakraProvider>
          <Alert status='error'>
            <AlertIcon />
          </Alert>
        </ChakraProvider>
      );
    }

    const kcUsername = document.getElementById('kc-username');
    if (kcUsername) {
      (kcUsername as HTMLDivElement).textContent =
        'Enter OTP code from Google authenticator to verify your account';
    }

    if (otpLogin.userOtpCredentials.length > 1) {
      return (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>You are having more than 1 OTP codes!</AlertTitle>
          <AlertDescription>
            Please keep only 1 OTP and delete others.
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <Template
        {...{ kcContext, ...props }}
        kcHeaderWrapperClass='header-wrapper'
        kcLoginClass='login-otp-page'
        displayWide={true}
        doFetchDefaultThemeResources={false}
        kcFeedbackErrorIcon='chakra-alert__icon'
        kcFeedbackSuccessIcon='chakra-alert__icon'
        headerNode={
          <FormHeader
            title='Verify your account'
            subTitle='Enter the OTP from authenticator app'
          />
        }
        formNode={
          <Flex
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            w='100%'
          >
            <Stack spacing={5} w='100%'>
              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                py={10}
                px={32}
              >
                <form
                  ref={measuredRef}
                  id='kc-otp-login-form'
                  className={cx(props.kcFormClass)}
                  action={url.loginAction}
                  method='post'
                >
                  <Input
                    name='otp'
                    display='none'
                    type='text'
                    readOnly
                    value={otp.join('')}
                  />
                  <Stack spacing={4} w='100%'>
                    <HStack justifyContent='center' spacing={3}>
                      <PinInput otp size='lg'>
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[0] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[1] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[2] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[3] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[4] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                        <PinInputField
                          onChange={(e) =>
                            setOtp((otp) => {
                              const newOtp = [...otp];
                              newOtp[5] = e.target.value;
                              return newOtp;
                            })
                          }
                        />
                      </PinInput>
                    </HStack>

                    <Button
                      loadingText='Submitting'
                      size='lg'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type='submit'
                      isDisabled={otp.filter(Boolean).length !== 6}
                    >
                      Login
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Flex>
        }
      />
    );
  }
);
