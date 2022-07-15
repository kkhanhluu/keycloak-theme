import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
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

type KcContext_Login = Extract<KcContext, { pageId: 'login.ftl' }>;

export const Login = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Login } & KcProps) => {
    const { url, login } = kcContext;

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

    return (
      <Template
        {...{ kcContext, ...props }}
        kcHeaderWrapperClass='header-wrapper'
        kcLoginClass='login-page'
        displayWide={true}
        doFetchDefaultThemeResources={false}
        kcFeedbackErrorIcon='chakra-alert__icon'
        kcFeedbackSuccessIcon='chakra-alert__icon'
        headerNode={
          <FormHeader
            title='Sign in to your account'
            subTitle="Don't have an account?"
            link={url.registrationUrl}
            linkText='Sign up'
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
                  id='kc-register-form'
                  className={cx(props.kcFormClass)}
                  action={url.loginAction}
                  method='post'
                >
                  <Stack spacing={4} w='100%'>
                    <FormControl id='email' isRequired>
                      <FormLabel
                        className={cx(props.kcFormGroupClass)}
                        htmlFor='email'
                      >
                        Email address
                      </FormLabel>
                      <Input
                        type='text'
                        id='email'
                        className={cx(props.kcInputClass)}
                        name='username'
                        autoComplete='email'
                        defaultValue={login.username}
                      />
                    </FormControl>

                    <FormControl
                      id='password'
                      isRequired
                      className={cx(props.kcFormGroupClass)}
                    >
                      <FormLabel
                        className={cx(props.kcLabelClass)}
                        htmlFor='password'
                      >
                        Password
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id='password'
                          className={cx(props.kcInputClass)}
                          name='password'
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

                    <Stack spacing={10} pt={2}>
                      <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}
                      >
                        <Checkbox
                          name='rememberMe'
                          defaultValue={login.rememberMe}
                        >
                          Remember me
                        </Checkbox>
                        <Link
                          href={url.loginResetCredentialsUrl}
                          color={'blue.400'}
                          textDecoration='underline'
                          textUnderlineOffset={2}
                        >
                          <Button variant='link'>Forgot password?</Button>
                        </Link>
                      </Stack>
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
