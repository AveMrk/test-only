export type Event = {
  id: number;
  year: number;
  text: string;
};

export type Slide = {
  id: number;
  name: string;
  events: Event[];
};

export type Slides = Slide[];