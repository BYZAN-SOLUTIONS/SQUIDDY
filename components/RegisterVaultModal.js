import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import RegisterVaultForm from "../components/RegisterVaultForm";

const RegisterVaultModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Deploy ERC4626 Vault Contract</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterVaultForm onClose={onClose} />
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

export default RegisterVaultModal;
