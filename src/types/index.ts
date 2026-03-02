export interface Product {
  id: string;
  name: string;
  icon: string;
  price: number;         // 円
  unit: string;          // '日' or '件'
  description: string;
  features: string[];
  highlight?: boolean;  // 強調表示
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface PainPoint {
  id: string;
  text: string;
}

export interface SampleArticle {
  id: string;
  title: string;
  url: string;
  summary: string;
  titleOptions: string[];
}
