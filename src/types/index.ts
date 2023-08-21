export interface TaskProps {
  id: number;
  created_at: string;
  title: string;
  description: string;
  tasks: string[];
  completed: boolean;
}

export interface TasksProps {
  id: string;
  text: string;
}
