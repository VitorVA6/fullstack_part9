import { DiaryEntry } from '../types'
import Diary from './Diary'

interface Props {
  diaries: DiaryEntry[]
}

const DiariesList = ({ diaries }: Props) => {
  return (
    <div>
      {
        diaries.map(diary => (
          <Diary key={diary.id} diary={diary}/>
        ))
      }
    </div>
  )
}

export default DiariesList