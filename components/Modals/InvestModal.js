import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Container,
  Flex,
  Image,
  Text,
  Box,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import InvestForm from "../Forms/InvestForm";

const InvestModal = ({
  isOpen,
  onClose,
  vaultName,
  tokenIcon,
  botStrategy,
}) => {
  const initialRef = React.useRef(null);
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalHeader>{`${vaultName} Vault`}</ModalHeader> */}
        <ModalHeader>
          <Container paddingLeft={0}>
            <Flex>
              <Box>
                <Image
                  maxWidth="200px"
                  margin="auto"
                  src={tokenIcon}
                  alt="icon"
                />
              </Box>
              <Box paddingLeft={2}>
                <Text color="gray.500" textAlign={"center"}>
                  {`${vaultName} Vault`}
                </Text>
              </Box>
            </Flex>
          </Container>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InvestForm onClose={onClose} botStrategy={botStrategy} />
        </ModalBody>

        {/* <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Deploy
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default InvestModal;
