import { SyntheticEvent, useState } from "react"
import { NewDiaryEntry } from "../types"
import RadioGroup from "./RadioGroup"

interface Props {
  addDiary: (diaryData: NewDiaryEntry) => void
}

const DiaryForm = ({ addDiary }: Props) => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('great')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    addDiary({
      date,
      visibility,
      weather,
      comment
    } as NewDiaryEntry)
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>date</label>
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          name="visibility"
        />
      </div>
      <RadioGroup 
        options={['great', 'good', 'ok', 'poor']}
        radioName='visibility'
        state={visibility}
        setState={setVisibility}
      />
      <RadioGroup 
        options={['sunny', 'rainy', 'cloudy', 'stormy', 'windy']}
        radioName='weather'
        state={weather}
        setState={setWeather}
      />
      <div>
        <label>comment</label>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default DiaryForm