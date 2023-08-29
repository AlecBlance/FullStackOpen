export interface HeaderProps {
  name: string;
}

interface Part {
  name: string;
  exerciseCount: number;
}

export interface ContentProps {
  parts: Part[];
}
