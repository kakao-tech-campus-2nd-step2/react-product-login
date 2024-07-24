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
  onConfirm?: () => void;
  onCancel?: () => void;
};

export const Confirm = ({
  message,
  isOpen,
  onClose,
  onConfirm,
  onCancel,
}: AlertProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const onClickConfirm = onConfirm || onClose;
  const onClickCancel = onCancel || onClose;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>카카오 선물하기</AlertDialogHeader>
        <AlertDialogBody style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
          {message}
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onClickCancel}>
            취소
          </Button>
          <Button colorScheme="yellow" onClick={onClickConfirm} ml={3}>
            확인
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
