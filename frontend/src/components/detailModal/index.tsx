import { JSX } from "react";
import styles from "./styles.module.css";

type Props = {
    showModal: boolean
    toggleModal: () => void;
}

const DetailModal = ({ showModal, toggleModal }: Props): JSX.Element => {
  return (
    <>
    { showModal && (
        <div className={ styles.overlay } onClick={ toggleModal }>
            <div className={ styles.modal } onClick={ (e) => e.stopPropagation() }></div>
        </div>
    ) }
    </>
  )
}

export default DetailModal;