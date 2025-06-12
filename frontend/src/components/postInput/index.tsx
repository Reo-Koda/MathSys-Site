import { Dispatch, JSX, SetStateAction } from 'react'

type Props = {
  title: string
  setValue: Dispatch<SetStateAction<string>>
  isRequired: boolean
}

const PostInput = ({ title, setValue, isRequired }: Props): JSX.Element => {
    return (
      <>
        <p>{ title }</p>
          <input
          type="text"
          placeholder={ title }
          // value={ title }
          onChange={(e) => setValue(e.target.value)}
          required={ isRequired } />
      </>
    )
}

export default PostInput;