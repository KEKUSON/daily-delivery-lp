# Daily Delivery LP — 全面改修指示書

> **Purpose**: claude-mm (MiniMax M2.5) への実行指示書
> Opus 4.6 (Dr. Vegapunk) によるレビューを経て作成
> **作業ディレクトリ**: `C:\Users\kekus\daily-delivery-lp\`

---

## 0. 事前準備

```bash
cd /c/Users/kekus/daily-delivery-lp
git checkout -b feat/lp-overhaul
```

**厳守事項:**
- 8ビット・ファミコン美学を絶対に崩さない
- GSAP アニメーションは `steps()` イージングを基本にする
- 既存のUIコンポーネント（RPGWindow, SpeechBalloon, PrepPointBox, ShopCard 等）を最大限再利用する
- 新コンポーネントはすべて `src/components/` に配置
- 新UIコンポーネントは `src/components/ui/` に配置
- 既存の Tailwind テーマ変数 (`--color-accent`, `--color-accent-gold`, `--color-accent-cyan` 等) を使う
- 実装前に必ず既存コードを読み、既存パターンに合わせる

---

## Phase 1: 売上直結の修正（最優先）

### 1-1. 料金体系に実価格を追加

**ファイル:** `src/types/index.ts`

Plan型に `priceYen` フィールドを追加:
```typescript
export interface Plan {
  id: string;
  name: string;
  price: number;        // ゲーム内通貨 (G)
  priceYen: number;     // 実価格 (円/月)
  description: string;
  features: string[];
  recommended?: boolean;
  level?: number;
}
```

**ファイル:** `src/data/content.ts`

各プランに `priceYen` を追加（仮の価格。ユーザーが後で調整する前提）:
```
梅プラン: priceYen: 2980
竹プラン: priceYen: 4980
松プラン: priceYen: 9800
```

**ファイル:** `src/components/ui/ShopCard.tsx`

価格表示を修正。`200G/日` の下に `月額¥2,980（税込）` を小さく表示:
```tsx
<div className="text-accent-gold text-xl">
  <NumberTicker value={plan.price} delay={0.3} />G
  <span className="text-sm text-text-muted">/日</span>
</div>
<div className="text-sm text-text-muted mt-1">
  月額 ¥{plan.priceYen.toLocaleString()}（税込）
</div>
```

### 1-2. サンプル記事をリアルデータに差し替え

**ファイル:** `src/data/content.ts`

`SAMPLE_ARTICLES` を以下のようなリアルなサンプルに差し替え（5件に増量）。
URLは `#` にしてプレビュー用とし、実際のscandal_huntの出力を参考にリアルな記事タイトル・要約を作成する。

```typescript
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
  // ... 計5件
];
```

注意: 実在の人物名は使わず、リアルな雰囲気だけ再現する。

### 1-3. Trust セクション強化

**ファイル:** `src/components/Trust.tsx`

現在のStatusBarだけの信頼性証明を以下に拡張:

1. **数値実績**（CountUpコンポーネント活用）:
   - 「累計配信日数: 90日+」
   - 「配信記事総数: 500記事+」
   - 「利用チャンネル数: 5+」

2. **ユーザーの声**（SpeechBalloonコンポーネント再利用）:
   - 2-3件の利用者コメント（匿名OK）
   - 例: 「毎朝Chatworkに届くからネタ探しの時間がゼロに」
   - 例: 「タイトル案がそのまま使えるレベルで助かる」

既存のStatusBar（収集力、速度、精度）は残し、その下にこれらを追加する。

### 1-4. CTA リンク修正

**ファイル:** `src/data/content.ts`

```typescript
export const LINKS = {
  form: 'https://forms.gle/XXXXX',  // ← 実際のGoogle FormURLに変更（ユーザーが後で設定）
  xDm: 'https://x.com/keku723306'
};
```

注意: formのURLはプレースホルダーを `https://forms.gle/PLACEHOLDER` に変更し、コメントで「要差替え」と明記する。

---

## Phase 2: コンテンツ拡充

### 2-1. Pain Points 追加

**ファイル:** `src/data/content.ts`

`PAIN_POINTS` を3件→5件に拡張:
```typescript
export const PAIN_POINTS: PainPoint[] = [
  { id: 'pain-1', text: '毎日ネタ探しで2時間消える…' },
  { id: 'pain-2', text: 'トレンドに乗り遅れて再生数が…' },
  { id: 'pain-3', text: 'タイトルが思いつかない…' },
  { id: 'pain-4', text: '他のチャンネルとネタが被る…' },
  { id: 'pain-5', text: '情報が古くてコメ欄で突っ込まれる…' },
];
```

### 2-2. FAQ 追加

**ファイル:** `src/components/FaqAccordion.tsx`

FAQを3件→7件に拡張:
```typescript
const FAQS: FAQItem[] = [
  // 既存3件を維持 +
  {
    id: 'q4',
    question: '支払い方法は？',
    answer: '銀行振込、またはPayPalでのお支払いに対応しています。'
  },
  {
    id: 'q5',
    question: '届くのは何時ごろ？',
    answer: '毎朝9時までにChatworkまたはLINEでお届けします。'
  },
  {
    id: 'q6',
    question: 'スマホでも確認できる？',
    answer: 'はい。ChatworkアプリまたはLINEアプリでスマートフォンからも確認できます。'
  },
  {
    id: 'q7',
    question: 'エンタメ以外のジャンルにも対応？',
    answer: '現在はエンタメ・芸能スキャンダルに特化していますが、ご要望に応じてカスタマイズも可能です。お気軽にご相談ください。'
  }
];
```

FAQデータは `content.ts` に移動するのが望ましい（他のデータと統一するため）。

### 2-3. 新規コンポーネント: HowItWorks.tsx

**ファイル:** `src/components/HowItWorks.tsx` (新規作成)

3ステップの利用フロー図:
1. 「▶ STEP 1: プランを選んで登録」
2. 「▶ STEP 2: 毎朝AIが厳選した記事が届く」
3. 「▶ STEP 3: タイトル案を選んで動画にするだけ」

デザイン要件:
- PrepPointBoxを3つ横並び（モバイルは縦並び）
- ステップ間を `→` や `▶` のピクセルアート矢印で繋ぐ
- GSAPで左からステップごとにstaggerアニメーション
- 各ステップにアイコン（`📋`, `📬`, `🎬` または8bitアイコン文字）

**配置:** App.tsx の `<Solution />` と `<ComparisonTable />` の間

### 2-4. 中間CTA コンポーネント

**ファイル:** `src/components/MidCTA.tsx` (新規作成)

Solutionセクション直後に表示する軽量CTA:
```tsx
<div className="text-center py-12 px-4">
  <p className="text-xl text-text-muted mb-6">
    気になったら、まずは無料お試しから。
  </p>
  <PixelButton
    as="a"
    href={LINKS.form}
    target="_blank"
    rel="noopener noreferrer"
    className="text-lg px-6 py-3"
  >
    <span aria-hidden="true">▶</span> 無料で試してみる
  </PixelButton>
</div>
```

デザイン: シンプルに。背景グラデーションなし。PixelButtonのみ。
**配置:** App.tsx の `<HowItWorks />` の直後

---

## Phase 3: デザイン・演出強化

### 3-1. Sticky ナビバー

**ファイル:** `src/components/Navbar.tsx` (新規作成)

スクロール時に上部に固定されるナビゲーションバー:
- 左側: ロゴまたは「Daily Delivery」テキスト（font-retro）
- 右側: セクションアンカーリンク（料金、FAQ、お問い合わせ）
- 背景: `bg-bg-primary/90 backdrop-blur-sm` + 下ボーダー `border-b-2 border-accent/50`
- 小さく控えめに。8bit風ドット枠線
- 初期状態: 非表示。スクロール100px以上でフェードイン

各セクションに `id` 属性を追加（既存セクションで未設定のもの）:
- Pain: `id="pain-section"` (既存)
- Solution: `id="solution-section"`
- HowItWorks: `id="how-section"`
- ComparisonTable: `id="comparison-section"`
- Sample: `id="sample-section"`
- Trust: `id="trust-section"`
- Pricing: `id="pricing-section"`
- FAQ: `id="faq-section"`
- CTA: `id="cta-section"`

**配置:** App.tsx の `<main>` の直下、`<Hero />` の前

### 3-2. フッター

**ファイル:** `src/components/Footer.tsx` (新規作成)

```tsx
<footer className="py-8 px-4 bg-black border-t-4 border-accent/30 text-center font-retro">
  <div className="max-w-3xl mx-auto space-y-4">
    <div className="text-text-muted text-sm space-x-4">
      <a href="#" className="hover:text-white">特定商取引法に基づく表記</a>
      <span>|</span>
      <a href="#" className="hover:text-white">プライバシーポリシー</a>
    </div>
    <div className="text-text-muted text-xs">
      © 2026 Daily Delivery. All rights reserved.
    </div>
    <div className="text-xs text-gray-600">
      — THANK YOU FOR PLAYING —
    </div>
  </div>
</footer>
```

**配置:** App.tsx の `<CTA />` の後

### 3-3. DeveloperStory モバイルアニメーション追加

**ファイル:** `src/components/DeveloperStory.tsx`

既存の `useGSAP` 内に `mm.add("(max-width: 767px)", ...)` ブロックを追加:
```typescript
mm.add("(max-width: 767px)", () => {
  const lines = gsap.utils.toArray('.story-line') as HTMLElement[];
  gsap.set(lines, { opacity: 0 });
  gsap.to(lines, {
    opacity: 1,
    stagger: { each: 0.4 },
    duration: 0.1,
    ease: "steps(1)",
    scrollTrigger: {
      trigger: textRef.current,
      start: "top 75%",
      toggleActions: "play none none none"
    }
  });
});
```

### 3-4. SEOメタタグ追加

**ファイル:** `index.html`

`<head>` 内に以下を追加:
```html
<meta name="description" content="YouTube Shorts向けスキャンダルニュースを毎朝AIが厳選してお届け。ネタ探しの時間をゼロに。" />
<meta property="og:title" content="Daily Delivery - 毎日のネタ探し、まだ自分でやってんの？" />
<meta property="og:description" content="AIが毎朝スキャンダル記事を厳選。台本タイトル案付きで即動画制作。" />
<meta property="og:type" content="website" />
<meta property="og:image" content="./src/assets/infographics/hero_main.png" />
<meta name="twitter:card" content="summary_large_image" />
<title>Daily Delivery | AI自動ネタ配信サービス</title>
```

### 3-5. PixiJS 遅延読み込み（パフォーマンス）

**ファイル:** `src/components/ui/PixiCanvas.tsx`

PixiCanvasコンポーネントを `React.lazy` で遅延読み込みに変更。
Hero.tsx と CTA.tsx でのPixiCanvas使用箇所を `Suspense` でラップ:

```tsx
import { Suspense, lazy } from 'react';
const PixiCanvas = lazy(() => import('./ui/PixiCanvas').then(m => ({ default: m.PixiCanvas })));

// 使用箇所:
<Suspense fallback={<div className="absolute inset-0 bg-bg-primary" />}>
  <PixiCanvas onInit={initPixi} />
</Suspense>
```

---

## Phase 4: App.tsx 再構成

**ファイル:** `src/App.tsx`

最終的なセクション順序:

```tsx
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Pain } from './components/Pain';
import { Solution } from './components/Solution';
import { HowItWorks } from './components/HowItWorks';
import { MidCTA } from './components/MidCTA';
import { ComparisonTable } from './components/ComparisonTable';
import { Sample } from './components/Sample';
import { DeveloperStory } from './components/DeveloperStory';
import { Trust } from './components/Trust';
import { Pricing } from './components/Pricing';
import { FaqAccordion } from './components/FaqAccordion';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="bg-bg-primary min-h-screen font-sans text-text">
      <Navbar />
      <Hero />
      <Pain />
      <Solution />
      <HowItWorks />     {/* NEW */}
      <MidCTA />          {/* NEW */}
      <ComparisonTable />
      <Sample />
      <DeveloperStory />
      <Trust />           {/* ENHANCED */}
      <Pricing />         {/* ENHANCED */}
      <FaqAccordion />    {/* ENHANCED */}
      <CTA />
      <Footer />          {/* NEW */}
    </main>
  );
}
```

---

## Phase 5: 検証

```bash
# 1. ビルドエラーチェック
npm run build

# 2. 開発サーバー起動して目視確認
npm run dev

# 3. TypeScript型チェック
npx tsc --noEmit

# 4. Lint
npm run lint
```

確認ポイント:
- [ ] ビルドがエラーなく通る
- [ ] 全セクションが正しい順序で表示される
- [ ] 新コンポーネント（Navbar, HowItWorks, MidCTA, Footer）が表示される
- [ ] 料金に円建て価格が表示される
- [ ] FAQが7件表示される
- [ ] Pain Pointsが5件表示される
- [ ] DeveloperStoryがモバイルでもアニメーションする
- [ ] サンプル記事が5件表示される
- [ ] Trust セクションに数値実績とユーザーの声が表示される
- [ ] Navbarがスクロール時に固定表示される
- [ ] 全リンク（CTA、X DM）が正しく動作する
- [ ] レスポンシブ対応（375px幅でも崩れない）

---

## 制約事項

- **8bit美学を崩すな**: 滑らかすぎるモダンなアニメーションは禁止。`steps()` イージングを使え
- **既存UIコンポーネントを再利用せよ**: RPGWindow, SpeechBalloon, PrepPointBox, PixelButton, CheckList 等
- **モバイル対応必須**: 全セクションで `gsap.matchMedia()` のデスクトップ/モバイル分岐を入れる
- **デザイントークン厳守**: `--color-accent` (#E40058), `--color-accent-gold` (#F8B800), `--color-accent-cyan` (#00E8D8)
- **フォント**: 見出し = DotGothic16 (`font-retro`)、本文 = Noto Sans JP (`font-sans`)
- **既存コンポーネントの破壊禁止**: 既存の動作を壊さないこと。追加と修正のみ

---

## 完了報告

全Phase完了後、以下を報告:
1. 新規作成したファイル一覧
2. 修正したファイル一覧
3. `npm run build` の結果
4. 追加したセクション数と概要
