import { Button, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { FunctionComponent } from 'react';
import { Logo } from '../Logo';

interface FormHeaderProps {
  title: string;
  subTitle?: string;
  link?: string;
  linkText?: string;
}
export const FormHeader: FunctionComponent<FormHeaderProps> = ({
  title,
  subTitle,
  link,
  linkText,
}) => {
  return (
    <Stack spacing='6'>
      <Logo />
      <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
        <Heading size='lg'>{title}</Heading>
        {subTitle != null || link != null ? (
          <HStack spacing='1' justify='center'>
            {subTitle != null ? <Text color='muted'>{subTitle}</Text> : null}
            {link != null ? (
              <Link
                textDecoration='underline'
                textUnderlineOffset={2}
                href={link}
              >
                <Button variant='link' colorScheme='blue'>
                  {linkText}
                </Button>
              </Link>
            ) : null}
          </HStack>
        ) : null}
      </Stack>
    </Stack>
  );
};
