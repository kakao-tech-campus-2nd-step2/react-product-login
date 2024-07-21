import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type AlertProps = {
  message: string;
  isOpen: boolean;
  onClose: () => void;
};

export const Alert = ({ message, isOpen, onClose }: AlertProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>카카오 선물하기</AlertDialogHeader>
        <AlertDialogBody>{message}</AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="yellow" ref={cancelRef} onClick={onClose}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
