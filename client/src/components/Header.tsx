import React, { useState } from 'react';
import { 
  Container, 
  Group, 
  Title, 
  Button
} from "@mantine/core";
import '@mantine/core/styles.css';

const Header: React.FC = () => {
  return (
    <header>
    <Container size="md" fluid className="header">
      <Group gap={10}>
        <Button h={50} style={{ backgroundColor: 'black', justifyContent: 'center', alignItems: 'center'}} >
          <Title order={1} c="white">
              VandyHacks
          </Title>
        </Button>
        <Title order={1} >
            Inventory Tracker
        </Title>
      </Group>
    </Container>
    </header>
    
  );
}

export default Header;
