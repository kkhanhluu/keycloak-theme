import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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

type KcContext_UpdatePassword = Extract<
  KcContext,
  { pageId: 'login-update-password.ftl' }
>;

export const UpdatePassword = memo(
  ({
    kcContext,
    ...props
  }: { kcContext: KcContext_UpdatePassword } & KcProps) => {
    const { url, username } = kcContext;

    const [showPassword, setShowPassword] = useState(false);

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
      (kcUsername as HTMLDivElement).textContent = 'Update password';
    }

    return (
      <Template
        {...{ kcContext, ...props }}
        kcHeaderWrapperClass='header-wrapper'
        kcLoginClass='update-password-page'
        displayWide={true}
        doFetchDefaultThemeResources={false}
        kcFeedbackErrorIcon='chakra-alert__icon'
        kcFeedbackSuccessIcon='chakra-alert__icon'
        headerNode={<FormHeader title='Update password' />}
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
                  id='kc-register-form'
                  className={cx(props.kcFormClass)}
                  action={url.loginAction}
                  method='post'
                >
                  <Input
                    type='text'
                    id='username'
                    name='username'
                    autoComplete='username'
                    value={username}
                    readOnly
                    display='none'
                  />
                  <Stack spacing={4} w='100%'>
                    <FormControl
                      id='password'
                      isRequired
                      className={cx(props.kcFormGroupClass)}
                    >
                      <FormLabel
                        className={cx(props.kcLabelClass)}
                        htmlFor='password'
                      >
                        Current password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id='password'
                          className={cx(props.kcInputClass)}
                          name='password'
                          autoComplete='current-password'
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl
                      id='password-new'
                      isRequired
                      className={cx(props.kcFormGroupClass)}
                    >
                      <FormLabel
                        className={cx(props.kcLabelClass)}
                        htmlFor='password-new'
                      >
                        New password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id='password-new'
                          className={cx(props.kcInputClass)}
                          name='password-new'
                          autoComplete='new-password'
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <FormControl
                      id='password-confirm'
                      isRequired
                      className={cx(props.kcFormGroupClass)}
                    >
                      <FormLabel
                        className={cx(props.kcLabelClass)}
                        htmlFor='password-confirm'
                      >
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id='password-confirm'
                          className={cx(props.kcInputClass)}
                          name='password-confirm'
                          autoComplete='new-password'
                        />
                        <InputRightElement h={'full'}>
                          <Button
                            variant={'ghost'}
                            onClick={() =>
                              setShowPassword((showPassword) => !showPassword)
                            }
                          >
                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </FormControl>

                    <Button
                      loadingText='Submitting'
                      size='lg'
                      bg={'blue.400'}
                      color={'white'}
                      _hover={{
                        bg: 'blue.500',
                      }}
                      type='submit'
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
