import type { Plan, Feature, PainPoint, SampleArticle } from '../types';

export const PAIN_POINTS: PainPoint[] = [
  { id: 'pain-1', text: '毎日ネタ探しで2時間消える…' },
  { id: 'pain-2', text: 'トレンドに乗り遅れて再生数が…' },
  { id: 'pain-3', text: 'タイトルが思いつかない…' },
];

export const FEATURES: Feature[] = [
  {
    id: 'feat-1',
    icon: '🔍',
    title: '12以上のニュースソースを毎日自動巡回',
    description: '国内外の主要メディアからSNSまで、幅広い情報源を常に監視。'
  },
  {
    id: 'feat-2',
    icon: '📰',
    title: 'スキャンダル特化のAIスコアリングで厳選',
    description: 'Shortsで伸びやすい「炎上・スキャンダル」要素をAIが自動判定。'
  },
  {
    id: 'feat-3',
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

export const PRICING_DESCRIPTION = "コーヒー1杯より安い、あなただけの武器屋。";

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'sample-1',
    title: '記事①：大物俳優の豪邸売却',
    url: 'https://example.com/news/12345',
    summary: '石田純一が3億円と言われる豪邸を手放したことが発覚。背景には〇〇の事情が...',
    titleOptions: [
      '石田純一が豪邸を手放した理由',
      '石田純一の今の様子がヤバい',
      '3億円豪邸売却の裏に何があったのか'
    ]
  },
  {
    id: 'sample-2',
    title: '記事②：人気アイドルの熱愛発覚',
    url: 'https://example.com/news/67890',
    summary: '超人気アイドルグループのメンバーAと、若手俳優Bのお泊まり愛が週刊誌にスクープされた。',
    titleOptions: [
      '人気アイドル〇〇の熱愛が発覚',
      '〇〇と〇〇の関係がヤバい',
      '熱愛スクープの裏に何があったのか'
    ]
  }
];
