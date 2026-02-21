export interface LoginData {
  login: string;
  password: string;
};

export interface NewTodoData {
  title: string;
  description: string;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  createdBy: string;
}

interface NewTodoProps {
  isNew: true;
  todo?: never;
}

interface EditTodoProps {
  isNew: false;
  todo: Todo;
}

export type TodoCardProps = NewTodoProps | EditTodoProps;