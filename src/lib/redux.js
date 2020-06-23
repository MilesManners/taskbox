// A simple redux store/actions/reducer implementation.
// A true app would be more complex and seperated into different files
import { createStore } from 'redux'

import { TaskState } from '../components/Task'

// The actions are the "names" of the changes that can happen to the store
export const actions = {
  ARCHIVE_TASK: 'ARCHIVE_TASK',
  PIN_TASK: 'PIN_TASK'
}

// The action creators bundle actions with the data required to execute them
export const archiveTask = id => ({ type: actions.ARCHIVE_TASK, id })
export const pinTask = id => ({ type: actions.PIN_TASK, id })

// All our reducers simply change the state of a single tasks
function taskStateReducer (taskState) {
  return (state, action) => {
    return {
      ...state,
      tasks: state.tasks.map(task =>
        task.id === action.id ? { ...task, state: taskState } : task
      )
    }
  }
}

// The reducer describes how the contents of the store change for each action
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.ARCHIVE_TASK:
      return taskStateReducer(actions.ARCHIVE_TASK)(state, action)
    case actions.PIN_TASK:
      return taskStateReducer(actions.PIN_TASK)(state, action)
    default:
      return state
  }
}

// The initial state of our store when the app loads
const defaultTasks = [
  { id: '1', title: 'Something', state: TaskState.inbox },
  { id: '2', title: 'Something more', state: TaskState.inbox },
  { id: '3', title: 'Something else', state: TaskState.inbox },
  { id: '4', title: 'Something again', state: TaskState.inbox }
]

// We export the constructed redux state
export default createStore(reducer, { tasks: defaultTasks })
