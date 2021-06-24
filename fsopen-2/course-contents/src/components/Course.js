import React from 'react';


const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((accum, part) => {
    return accum + part.exercises
  }, 0)

  return (
    <h3>total of {total} exercises</h3>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) =>
        <Part part={part} key={part.id} />
      )}
    </div>
  )
}

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)


export default Course
