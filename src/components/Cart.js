import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Image,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';

// mock fruits
const fruits = [
  {
    id: 1,
    name: 'Apple',
    price: 0.5,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Banana',
    price: 0.25,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Orange',
    price: 0.75,
    image: 'https://via.placeholder.com/150',
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = fruit => {
    const existingFruit = cart.find(item => item.id === fruit.id);
    if (existingFruit) {
      setCart(
        cart.map(item =>
          item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...fruit, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = fruit => {
    const existingFruit = cart.find(item => item.id === fruit.id);
    if (existingFruit.quantity === 1) {
      setCart(cart.filter(item => item.id !== fruit.id));
    } else {
      setCart(
        cart.map(item =>
          item.id === fruit.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box maxW="800px" mx="auto" p="4">
      <Heading as="h1" size="xl" mb="4">
        Fruits
      </Heading>
      <List spacing="4">
        {fruits.map(fruit => (
          <ListItem key={fruit.id} display="flex" alignItems="center">
            <Image src={fruit.image} alt={fruit.name} boxSize="150px" mr="4" />
            <Box>
              <Heading as="h2" size="md">
                {fruit.name}
              </Heading>
              <Text>${fruit.price}</Text>
              <Button onClick={() => handleAddToCart(fruit)} mt="2">
                Add to Cart
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Heading as="h1" size="xl" my="4">
        Shopping Cart
      </Heading>
      <List spacing="4">
        {cart.map(item => (
          <ListItem key={item.id} display="flex" alignItems="center">
            <Image src={item.image} alt={item.name} boxSize="150px" mr="4" />
            <Box>
              <Heading as="h2" size="md">
                {item.name}
              </Heading>
              <Text>${item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
              <Button onClick={() => handleRemoveFromCart(item)} mt="2">
                Remove
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
      <Text fontSize="xl" fontWeight="bold" mt="4">
        Total Price: ${totalPrice}
      </Text>
    </Box>
  );
}

export default App;
