export interface IAssignee {
  id: string;
  firstName: string;
  lastName?: string;
  jobRole?: string;
  isAdmin?: boolean;
}

export interface ITask {
  id: string;
  title: string;
  assignee: IAssignee | undefined;
  secondaryAssignee?: IAssignee[] | undefined;
  isCompleted: boolean;
  category?: string;
  percentageCompleted?: number;
  priority?: number;
}

const JANE: IAssignee = { id: "jane", firstName: "Jane" };
const BOB: IAssignee = { id: "bob", firstName: "Bob" };

const TASKS: ITask[] = [
  {
    id: "1",
    title: "Walk the dog",
    assignee: undefined,
    isCompleted: false,
  },
  {
    id: "2",
    title: "Buy groceries",
    assignee: JANE,
    isCompleted: true,
  },
  {
    id: "3",
    title: "Mow the lawn",
    assignee: JANE,
    isCompleted: false,
  },
  {
    id: "4",
    title: "Bake cookies",
    assignee: BOB,
    isCompleted: true,
  },
  {
    id: "5",
    title: "Vacuum",
    assignee: JANE,
    isCompleted: false,
  },
  {
    id: "6",
    title: "Take out the recycling",
    assignee: JANE,
    isCompleted: false,
  },
  {
    id: "7",
    title: "Call the plumber",
    assignee: BOB,
    isCompleted: false,
  },
  {
    id: "8",
    title: "Fix cabinet door",
    assignee: BOB,
    isCompleted: false,
  },
  {
    id: "9",
    title: "Plant tulip bulbs",
    assignee: BOB,
    isCompleted: false,
  },
  {
    id: "10",
    title: "Rake leaves",
    assignee: undefined,
    isCompleted: false,
  },
];

export async function getData(): Promise<ITask[]> {
  return new Promise((resolve) => setTimeout(() => resolve(TASKS), 1000));
}