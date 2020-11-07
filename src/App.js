import React from "react";
import "./styles.css";
import { Grid, Box } from "@chakra-ui/core";

export default function App() {
  return (
    <div className="App">
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <Box w="100%" h="10" bg="blue.500">
          qiweqoiejoqwi
        </Box>
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
        <Box w="100%" h="10" bg="blue.500" />
      </Grid>
    </div>
  );
}
