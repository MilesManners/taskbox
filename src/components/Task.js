import React from 'react'
import PropTypes from 'prop-types'

export const TaskState = {
  inbox: 'TASK_INBOX',
  pinned: 'TASK_PINNED',
  archived: 'TASK_ARCHIVED'
}

export default function Task ({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className='checkbox'>
        <input
          type='checkbox'
          defaultChecked={state === TaskState.archived}
          disabled
          name='checked'
        />
        <span className='checkbox-custom' onClick={() => onArchiveTask(id)} />
      </label>

      <div className='title'>
        <input type='text' value={title} readOnly placeholder='Input title' />
      </div>

      <div className='actions' onClick={event => event.stopPropagation()}>
        {state !== TaskState.archived && (
          <button onClick={() => onPinTask(id)}>
            <span className='icon-star' />
          </button>
        )}
      </div>
    </div>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  }),
  onArchiveTask: PropTypes.func,
  onPinTask: PropTypes.func
}
