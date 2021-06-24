import React from 'react'


const PersonForm = (props) => (
  <form>
    <div>
      name: <input value={props.name} onChange={props.onNameChange} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.onNumberChange} />
    </div>
    <div>
      <button type="submit" onClick={props.onClick}>
        add
      </button>
    </div>
  </form>
)

export default PersonForm
