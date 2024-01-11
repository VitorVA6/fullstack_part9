import { DiaryEntry } from "../types"

interface Props{
  diary: DiaryEntry
}

const Diary = ({ diary }: Props) => {
  return (
    <div className="diary-container">
      <h3>{diary.date}</h3>
      <p>visibility: {diary.visibility}</p>
      <p>weather: {diary.weather}</p>
    </div>
  )
}

export default Diary