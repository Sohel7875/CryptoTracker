import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
   
    position={"fixed"}
      variant="ghost"
      color="current"
      onClick={toggleColorMode}
      zIndex={"overlay"}
      top={"4"}
      right={"4"}
      icon={<SwitchIcon />}
      {...props}
    />
  );
};

export default ColorModeSwitcher