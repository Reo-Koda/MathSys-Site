import styles from "./styles.module.css";

type Props ={
    type: string
    labeltitle: string
    nametitle:string 
    value: string
    handleChange: ( event: React.ChangeEvent<HTMLInputElement> ) =>void
    isRequired: boolean;
}
const FormGroup = ( { type,labeltitle,nametitle,value,handleChange,isRequired }:Props ) =>{
    
    return(
        <>
        <div className={ styles.formgroup }>
            <label htmlFor={ labeltitle }>{ nametitle }</label>
            <input type={ type } id={ labeltitle } name={ nametitle } value={ value } onChange={ handleChange } required={ isRequired }/>
        </div>
        </>
    )
}
export default FormGroup;