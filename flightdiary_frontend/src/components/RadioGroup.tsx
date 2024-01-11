import { Dispatch, SetStateAction } from "react"

interface Props {
  options: string[],
  radioName: string,
  state: string,
  setState: Dispatch<SetStateAction<string>>
}

const RadioGroup = ({ options, radioName, state, setState }: Props) => {
  return (
    <div>
      <span className="radio-title">{radioName}</span>
      {
        options.map(option => (
          <label key={option}>
            <input
              type="radio"
              value={option}
              onChange={(event) => setState(event.target.value)}
              name={radioName}
              checked={state==='poor'}
            /> {option}
          </label>
        ))
      }
    </div>
  )
}

export default RadioGroup