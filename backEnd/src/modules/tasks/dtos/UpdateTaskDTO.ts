import { Priority } from './TaskPriorityEnumerationDTO';

export interface UpdateTaskDTO {
  id: number;
  title?: string;
  description?: string;
  createdAt:Date;
  dueDate?: Date;
  priority?: Priority;
}

