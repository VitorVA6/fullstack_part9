import { CoursePart } from "../types"

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.kind) {
    case 'basic':
      return(
        <div className="course-container">  
          <p>{course.name} {course.exerciseCount}</p>
          <em>{course.description}</em>
        </div>
      )
    case 'group':
      return(
        <div className="course-container">  
          <p>{course.name} {course.exerciseCount}</p>
          <p>project exercises {course.groupProjectCount}</p>
        </div>
      )
    case 'background':
      return (
        <div className="course-container">  
          <p>{course.name} {course.exerciseCount}</p>
          <em>{course.description}</em>
          <p>submit to {course.backgroundMaterial}</p>
        </div>
      )
    case 'special':
      return (
        <div className="course-container">  
          <p>{course.name} {course.exerciseCount}</p>
          <em>{course.description}</em>
          <p>required skills: {course.requirements.reduce<string>((acum, cur, index)=> {
            if(index === 0) return `${acum}${cur}`
            return `${acum}, ${cur}`
          }, '')}</p>
        </div>
      )
  }
}

export default Part