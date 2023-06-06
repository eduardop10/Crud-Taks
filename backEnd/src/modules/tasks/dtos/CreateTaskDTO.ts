import { Priority } from './TaskPriorityEnumerationDTO';

export interface CreateTaskDTO {
  title: string;
  description: string;
  createdAt:Date;
  dueDate: Date;
  priority: Priority;
}
