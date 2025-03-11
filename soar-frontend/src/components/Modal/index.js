import React from 'react';
import { Modal } from 'antd';

/**
 * A reusable modal component that displays a modal dialog with the given props.
 * @returns The rendered modal component
 */
const ModalComponent = ({
  title,
  onCancel,
  visible,
  showModal,
  maskClosable,
  style,
  footer,
}) => {
  console.devLog('Modal Props Received', title);
  // const [modalVisible, setModalVisible] = useState(false);

  // const showModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  return (
    <div onClick={showModal}>
      <Modal
        title={title}
        visible={visible}
        onCancel={onCancel}
        maskClosable={maskClosable}
        width={700}
        footer={footer}
        style={style}
      ></Modal>
    </div>
  );
};

export default ModalComponent;
