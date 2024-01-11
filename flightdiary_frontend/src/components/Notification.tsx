interface Props {
  message: string | null
}

const Notification = ({ message }: Props) => {
  if(message === null) return null
  return (
    <p className="notification">{ message }</p>
  )
}

export default Notification