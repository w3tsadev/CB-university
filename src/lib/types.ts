export interface Lesson {
  id: string;
  title: string;
  description: string;
  tags: string[];
  level: string;
  assets: { id: string; url: string; type: string }[];
}

export interface Course {
  id: string;
  title: string;
  category: string;
  priority: number;
  lessons: Lesson[];
}
