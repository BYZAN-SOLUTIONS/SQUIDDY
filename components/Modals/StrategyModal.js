import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import StrategyList from "../StrategyList";

const StrategyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Flashloan Strategies</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <StrategyList onClose={onClose} />
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default StrategyModal;
