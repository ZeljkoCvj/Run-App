export interface running {
  id: string;
  title: string;
  duration: number;
  calories: number;
  date?: Date;
  status?: 'completed' | 'stopped' | null;
  runningId?: string;
  historyId?: string;
}
