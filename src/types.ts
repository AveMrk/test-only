export type Event = {
  id: number;
  year: number;
  text: string;
};

export type SlideType = {
  id: number;
  name: string;
  events: Event[];
};

export type Slides = SlideType[];