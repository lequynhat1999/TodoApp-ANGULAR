export class Todo {
  id!: number; // timestamp
  content!: string;
  isCompleted!: boolean;
  constructor(id:number,content:string)
  {
    this.id = id;
    this.content = content;
    this.isCompleted = false;
  }
}

