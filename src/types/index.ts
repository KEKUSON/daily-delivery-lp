export interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface PainPoint {
  id: string;
  text: string;
}

export interface SampleArticle {
  title: string;
  url: string;
  summary: string;
  titleOptions: string[];
}
