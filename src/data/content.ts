import type { Product, Feature, PainPoint, SampleArticle } from '../types';

export const PAIN_POINTS: PainPoint[] = [
  { id: 'pain-1', text: '毎日ネタ探しで2時間消える…' },
  { id: 'pain-2', text: 'トレンドに乗り遅れて再生数が…' },
  { id: 'pain-3', text: 'タイトルが思いつかない…' },
  { id: 'pain-4', text: '他のチャンネルとネタが被る…' },
  { id: 'pain-5', text: '情報が古くてコメ欄で突っ込まれる…' },
];

export const FEATURES: Feature[] = [
  {
    id: 'feat-1',
    icon: '◆',
    title: '12以上のニュースソースを毎日自動巡回',
    description: '国内外の主要メディアからSNSまで、幅広い情報源を常に監視。'
  },
  {
    id: 'feat-2',
    icon: '▶',
    title: 'スキャンダル特化のAIスコアリングで厳選',
    description: 'Shortsで伸びやすい「炎上・スキャンダル」要素をAIが自動判定。'
  },
  {
    id: 'feat-3',
    icon: '◇',
    title: 'Shorts最適化タイトル案を最大3案添付',
    description: 'そのまま使えるキャッチーなタイトル案を複数ご提案。'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'link-bundle',
    name: 'リンク束配信',
    icon: '📜',
    price: 300,
    unit: '日',
    description: 'まずは情報収集の自動化から！',
    features: [
      'パーソナライズ済み30件/日',
      'ジャンル別フィルター対応',
      'Chatwork / LINE でお届け',
    ],
  },
  {
    id: 'curated-article',
    name: '厳選ネタ配信',
    icon: '⚔️',
    price: 100,
    unit: '件',
    description: '選ぶだけで即動画化！',
    features: [
      '厳選1記事 + タイトル案3つ',
      'YouTube Shorts特化の切り口',
      'そのまま台本に使える品質',
    ],
    highlight: true,
  },
];

export const LINKS = {
  form: 'https://forms.gle/PLACEHOLDER',  // 要差替え: 実際のGoogle Form URLに設定
  xDm: 'https://x.com/keku723306'
};

export const PRICING_DESCRIPTION = "缶コーヒー1本分で、あなたの2時間を買い戻す。";

export const SAMPLE_ARTICLES: SampleArticle[] = [
  {
    id: 'sample-1',
    title: '記事①：芸能人の不倫報道',
    url: '#',
    summary: '人気俳優Xの不倫が週刊誌でスクープ。所属事務所は「事実確認中」とコメント。SNSではトレンド入りし...',
    titleOptions: [
      '人気俳優Xの衝撃不倫の真相',
      'まさかのXが不倫で大炎上',
      'Xの不倫相手が判明した結果...'
    ]
  },
  {
    id: 'sample-2',
    title: '記事②：ワイドショー出演NGの真相',
    url: '#',
    summary: '某有名声優が突然の謹慎を発表。所属事務所は「私人としての発言」と説明しているが...',
    titleOptions: [
      '声優Xが謹慎に至った理由',
      'Xの発言が物議を醸している',
      '所属事務所がやっと重い腰を上げた'
    ]
  },
  {
    id: 'sample-3',
    title: '記事③：アイドルの衝撃卒業発表',
    url: '#',
    summary: '大人気アイドルグループのセンターを務めていたXが、突如卒業を発表。ファンからは悲鳴と期待の声が殺到...',
    titleOptions: [
      'X卒業の真相が発覚',
      'メンバーが明かした卒業の理由',
      'センターの抜けた穴をどう埋めるのか'
    ]
  },
  {
    id: 'sample-4',
    title: '記事④：企業トップの不祥事',
    url: '#',
    summary: '上場企業のCEOが、海外出張中に若い女性との関係をスクープされた。株価への影響は...',
    titleOptions: [
      'CEOの不祥事が発覚した結果',
      '企業の対応が、逆に炎上した理由',
      '株価に影響大！今後の展開は'
    ]
  },
  {
    id: 'sample-5',
    title: '記事⑤：インフルエンサーの薬物疑惑',
    url: '#',
    summary: 'SNSで億単位の収益を上げている人気インフルエンサーが、法執行機関による調査対象になっている可能性が浮上...',
    titleOptions: [
      'インフルエンサーXに重大疑惑',
      'なぜ今、調査対象になっているのか',
      '関与の可能性を示した証拠とは'
    ]
  }
];
