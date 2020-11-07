import React, { useEffect, useState } from "react";
import "./styles.css";
import { Grid, Box, Container, Text } from "@chakra-ui/core";
import Card from "./Card";
// import items from "./samples/items";
import Products from "./Objects/Products";
import OrderIncoming from "./OrderIncoming";

const socket = new WebSocket("ws://2.tcp.ngrok.io:11371/");
console.log(socket);

const MESSAGES = {
  ORDER_LIST: "order_list",
  ITEM_LIST: "item_list",
  NEW_ORDER: "new_order",
  ADD_TO_BASKET: "add_to_basket",
  STOCK_UPDATED: "stock_updated",
};

export default function App() {
  const [bag, setBag] = useState([]);
  const [incoming, setIncoming] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    socket.addEventListener("open", function (event) {
      // socket.send('Hello Server!');
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
      const message = JSON.parse(event.data);

      if (message.type === MESSAGES.ITEM_LIST) {
        setItems(message.items);
      }

      if (message.type === MESSAGES.STOCK_UPDATED) {
        setItems((items) => {
          const { id, stock } = message;

          const bagItem = items.find((e) => e.id === id);

          console.log(bagItem);
          console.log(stock);
          return [
            ...items.filter((e) => e.id !== id),
            { ...bagItem, qty: stock },
          ];
        });
      }

      if (message.type === MESSAGES.ORDER_LIST) {
        setIncoming(Object.values(message.orders));
      }

      if (message.type === MESSAGES.NEW_ORDER) {
        setIncoming((orders) => [...orders, message.order]);
      }

      console.log("Message from server ", JSON.parse(event.data));
    });
  }, [setItems]);

  const addToBag = (item) => {
    // console.log(item);
    setBag((b) => {
      const bagItem = b.find((e) => e.id === item.id);
      if (bagItem) {
        return [
          ...b.filter((e) => e.id !== item.id),
          { ...bagItem, qty: bagItem.qty + 1 },
        ];
      }

      return [...b, { ...item, qty: 1 }];
    });

    socket.send(JSON.stringify({ type: MESSAGES.ADD_TO_BASKET, id: item.id }));
  };

  return (
    <div className="App">
      <Container p="4">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {items.map((item) => (
            <Box w="100%">
              <Card item={item} onItem={addToBag} />
            </Box>
          ))}
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap={2}>
          <Box mt="4">
            <Text fontSize="lg" mb="4">
              Current order
            </Text>
            {bag.map((item) => (
              <Box>
                {item.name}-{item.qty}
              </Box>
            ))}
          </Box>
          <Box mt="4">
            <Text fontSize="lg" mb="4">
              Incoming orders
            </Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={2}>
              {incoming.map((order) => (
                <OrderIncoming order={order} />
              ))}
            </Grid>
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
