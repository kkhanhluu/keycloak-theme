import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  ChakraProvider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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

type KcContext_Register = Extract<KcContext, { pageId: 'register.ftl' }>;

export const Register = memo(
  ({ kcContext, ...props }: { kcContext: KcContext_Register } & KcProps) => {
    const { url, messagesPerField, register } = kcContext;
    console.log(url.loginUrl);

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
            title='Sign up an account'
            subTitle='Already have an account?'
            link={url.loginUrl}
            linkText='Login'
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
              {messagesPerField.exists('global') ? (
                <Alert status='error'>
                  <AlertIcon />
                  {messagesPerField.get('global')}
                </Alert>
              ) : null}

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
                  action={url.registrationAction}
                  method='post'
                >
                  <Stack spacing={4} w='100%'>
                    <HStack w='100%' justifyContent='space-between'>
                      <Box>
                        <FormControl
                          id='firstName'
                          className={cx(
                            props.kcFormGroupClass,
                            messagesPerField.printIfExists(
                              'firstName',
                              props.kcFormGroupErrorClass
                            )
                          )}
                          isRequired
                        >
                          <FormLabel>First Name</FormLabel>
                          <Input
                            type='text'
                            id='firstName'
                            className={cx(props.kcInputClass)}
                            name='firstName'
                            defaultValue={register.formData.firstName ?? ''}
                          />
                        </FormControl>
                      </Box>
                      <Box>
                        <FormControl
                          id='lastName'
                          className={cx(
                            props.kcFormGroupClass,
                            messagesPerField.printIfExists(
                              'lastName',
                              props.kcFormGroupErrorClass
                            )
                          )}
                          isRequired
                        >
                          <FormLabel>Last Name</FormLabel>
                          <Input
                            type='text'
                            id='lastName'
                            className={cx(props.kcInputClass)}
                            name='lastName'
                            defaultValue={register.formData.lastName ?? ''}
                          />
                        </FormControl>
                      </Box>
                    </HStack>

                    <FormControl id='email' isRequired>
                      <FormLabel
                        className={cx(
                          props.kcFormGroupClass,
                          messagesPerField.printIfExists(
                            'email',
                            props.kcFormGroupErrorClass
                          )
                        )}
                        htmlFor='email'
                      >
                        Email address
                      </FormLabel>
                      <Input
                        type='text'
                        id='email'
                        className={cx(props.kcInputClass)}
                        name='email'
                        defaultValue={register.formData.email ?? ''}
                        autoComplete='email'
                      />
                      {messagesPerField.printIfExists(
                        'email',
                        props.kcFormGroupErrorClass
                      ) != null ? (
                        <FormErrorMessage>Alooo</FormErrorMessage>
                      ) : null}
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
                      {messagesPerField.printIfExists(
                        'password',
                        props.kcFormGroupErrorClass
                      ) != null ? (
                        <FormErrorMessage>
                          {messagesPerField.printIfExists(
                            'password',
                            props.kcFormGroupErrorClass
                          )}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>

                    <FormControl
                      isRequired
                      className={cx(props.kcFormGroupClass)}
                    >
                      <FormLabel
                        htmlFor='password-confirm'
                        className={cx(props.kcLabelClass)}
                      >
                        Password confirm
                      </FormLabel>
                      <InputGroup>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          id='password-confirm'
                          className={cx(props.kcInputClass)}
                          name='password-confirm'
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
                      {messagesPerField.printIfExists(
                        'password-confirm',
                        props.kcFormGroupErrorClass
                      ) != null ? (
                        <FormErrorMessage>
                          {messagesPerField.printIfExists(
                            'password-confirm',
                            props.kcFormGroupErrorClass
                          )}
                        </FormErrorMessage>
                      ) : null}
                    </FormControl>
                    <Stack spacing={10} pt={2}>
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
                        Sign up
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
