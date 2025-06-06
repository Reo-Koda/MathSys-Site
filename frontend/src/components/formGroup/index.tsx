import styles from "./styles.module.css";

type Props ={
    labeltitle: string
    nametitle:string 
    value: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) =>void
}
const FormGroup = ({labeltitle,nametitle,value,handleChange}:Props) =>{
    
    return(
        <>
        <div className={styles.formgroup}>
            <label htmlFor={labeltitle}>{nametitle}</label>
            <input id={labeltitle} name={labeltitle} value={value} onChange={handleChange} required />
        </div>
        </>
    )
}
export default FormGroup;