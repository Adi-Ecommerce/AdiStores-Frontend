import React from 'react'

function Heading(props) {
  return (
    <div>
        <h1 className="text-center font-semibold text-2xl sm:text-3xl ">
            {props.title}
        </h1>
    </div>
  )
}

export default Heading
