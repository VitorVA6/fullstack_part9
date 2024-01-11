import { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"
import diariesService from "./services/diaries"
import DiariesList from "./components/DiariesList"
import './App.css'
import DiaryForm from "./components/DiaryForm"
import axios from "axios"
import Notification from "./components/Notification"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    diariesService.getAll()
      .then(data => {
        setDiaries(data)
      })
  }, [])

  const handleNotification = (text: string, time: number) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, time * 1000)
  }

  const addDiary = (diaryData: NewDiaryEntry): void => {
    diariesService.create(diaryData)
      .then(data => {
        setDiaries(diaries.concat(data))})
      .catch(error => {
        if(axios.isAxiosError(error) && error.response){
          handleNotification(error.response.data, 5)
        }
        else console.log(error)
      })
  }

  return (
    <>
      <h2>Add new entry</h2>
      <Notification message={message}/>
      <DiaryForm addDiary={addDiary}/>
      <h1>Diary entries</h1>
      <DiariesList diaries={diaries}/>
    </>
  )
}

export default App
