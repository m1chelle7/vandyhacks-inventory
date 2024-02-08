import React, { useState } from 'react';
import { 
  Container, 
  Group, 
  Title, 
  Button,
  HoverCard,
  Text
} from "@mantine/core";
import '@mantine/core/styles.css';

interface Props {
  colorScheme: string;
  setColorScheme: (color: string) => void;
}

const Header: React.FC<Props> = ({ colorScheme, setColorScheme }) => {
  return (
    <header>
      <Container size="md" fluid className="header">
        <Group gap={10}>
          <HoverCard width="14rem" shadow="md" >
            <HoverCard.Target>
              <Button 
                onClick={() => colorScheme !== 'black' ? setColorScheme('black') : setColorScheme('white')} 
                h={50} 
                style={{ 
                  backgroundColor: colorScheme !== 'black' ? 'black' : 'white', 
                  justifyContent: 'center', 
                  alignItems: 'center'
                }} 
              >
                <Title order={1} c={colorScheme !== 'black' ? 'white' : 'black'} >
                  VandyHacks
                </Title>
              </Button>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Text size="sm" style={{ textAlign: 'center' }}>
                Click to Switch Color Mode
              </Text>
            </HoverCard.Dropdown>
          </HoverCard>
          <Title order={1} c={colorScheme !== 'black' ? 'black' : 'white'}>
              Inventory Tracker
          </Title>
        </Group>
      </Container>
    </header>
    
  );
}

export default Header;
