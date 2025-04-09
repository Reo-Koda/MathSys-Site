import styles from "./styles.module.css";

type Props = {
    showModal: boolean
    toggleModal: () => void;
}

const DetailModal = ({ showModal, toggleModal }: Props) => {
  return (
    <>
    { showModal && (
        <div className={ styles.overlay } onClick={ toggleModal }>
            <div className={ styles.modal }></div>
        </div>
    ) }
    </>
  )
}

export default DetailModal;