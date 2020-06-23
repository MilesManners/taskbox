import React from 'react'
import PropTypes from 'prop-types'

import Task, { TaskState } from './Task'
import { connect } from 'react-redux'
import { archiveTask, pinTask } from '../lib/redux'

export function PureTaskList ({ loading, tasks, onPinTask, onArchiveTask }) {
  const events = {
    onPinTask,
    onArchiveTask
  }

  const LoadingRow = (
    <div className='loading-item'>
      <span className='glow-checkbox' />
      <span className='glow-text'>
        <span>Loading</span> <span>cool</span> <span>state</span>
      </span>
    </div>
  )

  if (loading) {
    return (
      <div className='list-items'>
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
        {LoadingRow}
      </div>
    )
  }

  if (!tasks.length) {
    return (
      <div className='list-items'>
        <div classNames='wrapper-message'>
          <span className='icon-check' />
          <div className='title-message'>You have no tasks</div>
          <div className='subtitle-message'>Sit back and relax</div>
        </div>
      </div>
    )
  }

  const tasksInOrder = [
    ...tasks.filter(t => t.state === TaskState.pinned),
    ...tasks.filter(t => t.state !== TaskState.pinned)
  ]

  return (
    <div className='list-items'>
      {tasksInOrder.map(task => (
        <Task key={task.id} task={task} {...events} />
      ))}
    </div>
  )
}

PureTaskList.propTypes = {
  loading: PropTypes.bool,
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  onPinTask: PropTypes.func.isRequired,
  onArchiveTask: PropTypes.func.isRequired
}

PureTaskList.defaultProps = {
  loading: false
}

export default connect(
  ({ tasks }) => ({
    tasks: tasks.filter(t => t.state === TaskState.inbox || t.state === TaskState.pinned)
  }),
  dispatch => ({
    onArchiveTask: id => dispatch(archiveTask(id)),
    onPinTask: id => dispatch(pinTask(id))
  })
)(PureTaskList)
