import React from "react";
import { Box, Image, Badge } from "@chakra-ui/core";
import Products from "./Objects/Products";

const Card = ({ order, onItem }) => {
  const product = Products[order.id];

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      _hover={{
        border: "teal.800",
      }}
      onClick={() => onItem({ id: order.id, name: product.name })}
    >
      <Box p="4">
        <Box d="flex" alignItems="baseline">
          {order.id}
        </Box>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {order.items.map((item) => (
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {Products[item.id].name}-{item.quantity}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
