// import type { WishlistData } from "@/types";

import { Box, SimpleGrid, Text } from "@chakra-ui/react"

import { Button } from "@/components/common/Button"

export const Wishlist = () => {

  const handleRemove = () => {
    alert("삭제합니다.")
  }

  return (
    <SimpleGrid>
      <Box>
        <Text>위시리스트입니다.</Text>
        <Button size="small" onClick={handleRemove}>삭제</Button>
      </Box>
    </SimpleGrid>
  )
}