import { Container } from '@mantine/core';

export default function PageLayout({children}) {
  return (
    <Container size="xs">
        {children}
    </Container>
  )
}
