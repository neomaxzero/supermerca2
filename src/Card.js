import React from "react";
import { Box, Image, Badge } from "@chakra-ui/core";
import Products from "./Objects/Products";

const Card = ({ item, onItem }) => {
  const product = Products[item.id];

  if (!product) {
    console.error("No product definition found");
    return null;
  }
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" cursor="pointer" _hover={{
        border: 'teal.800'
    }} onClick={() => onItem({ id: item.id, name: product.name })}>
      <Image src={product.image} alt={product.name} objectFit="cover" h="40" />
      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {item.stock} units
          </Badge>          
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {product.name}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
