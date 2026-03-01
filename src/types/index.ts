export interface Plan {
  id: string;
  name: string;
  price: number;        // ゲーム内通貨 (G)
  priceYen: number;    // 実価格 (円/月)
  description: string;
  features: string[];
  recommended?: boolean;
  level?: number;
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
