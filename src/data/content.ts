import { Plan, Feature, PainPoint, SampleArticle } from '../types';

export const PAIN_POINTS: PainPoint[] = [
  { id: 'pain-1', text: '毎日ネタ探しで2時間消える…' },
  { id: 'pain-2', text: 'トレンドに乗り遅れて再生数が…' },
  { id: 'pain-3', text: 'タイトルが思いつかない…' },
];

export const FEATURES: Feature[] = [
  {
    icon: '🔍',
    title: '12以上のニュースソースを毎日自動巡回',
    description: '国内外の主要メディアからSNSまで、幅広い情報源を常に監視。'
  },
  {
    icon: '📰',
    title: 'スキャンダル特化のAIスコアリングで厳選',
    description: 'Shortsで伸びやすい「炎上・スキャンダル」要素をAIが自動判定。'
  },
  {
    icon: '✍️',
    title: 'Shorts最適化タイトル案を最大3案添付',
    description: 'そのまま使えるキャッチーなタイトル案を複数ご提案。'
  }
];

export const PLANS: Plan[] = [
  {
    id: 'ume',
    name: '梅プラン',
    price: 100,
    description: 'まずはお試しに！',
    features: ['1日2記事', 'タイトル各1案'],
  },
  {
    id: 'take',
    name: '竹プラン',
    price: 300,
    description: 'ネタ選び放題！',
    features: ['1日4記事', 'タイトル各3案'],
    recommended: true,
  },
  {
    id: 'matsu',
    name: '松プラン',
    price: 500,
    description: '全弾装填！',
    features: ['1日6記事以上', 'タイトル各3案'],
  }
];

export const LINKS = {
  form: '#GOOGLE_FORM_URL',
  xDm: 'https://x.com/keku723306'
};

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    title: '記事①',
    url: 'https://example.com/article1',
    summary: '〇〇容疑者が...',
    titleOptions: [
      '〇〇の今の様子がヤバい',
      '〇〇が語った本音',
      '〇〇の裏に何があったのか'
    ]
  }
];
