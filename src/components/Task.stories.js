import React from 'react'
import { action } from '@storybook/addon-actions'

import Task, { TaskState } from './Task'

export default {
  component: Task,
  title: 'Task',
  // Our exports that end in "Data" are not stories
  excludeStories: /.*Data$/
}

export const taskData = {
  id: '1',
  title: 'Test Task',
  state: TaskState.inbox,
  updatedAt: new Date(2018, 1, 9, 0)
}

export const actionsData = {
  onPinTask: action('onPinTask'),
  onArchiveTask: action('onArchiveTask')
}

export const Default = () => (
  <Task task={{ ...taskData }} {...actionsData} />
)

export const Pinned = () => (
  <Task task={{ ...taskData, state: TaskState.pinned }} {...actionsData} />
)

export const Archived = () => (
  <Task task={{ ...taskData, state: TaskState.archived }} {...actionsData} />
)
