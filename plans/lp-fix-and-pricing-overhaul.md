# Daily Delivery LP — 修正 & 料金改修 指示書

> **Purpose**: claude-mm (MiniMax M2.5) への実行指示書
> Opus 4.6 (Dr. Vegapunk) レビューに基づく
> **作業ディレクトリ**: `C:\Users\kekus\daily-delivery-lp\`
> **ブランチ**: `feat/lp-overhaul` で作業を続行

---

## 厳守事項

- 8ビット・ファミコン美学を絶対に崩さない
- GSAP アニメーションは `steps()` イージングを基本にする
- 既存のUIコンポーネントを最大限再利用する
- 既存の Tailwind テーマ変数を使う
- **日本語テキストに外国語（中国語・韓国語・ロシア語等）を絶対に混入させない**
- **修正後のテキスト全文を出力して確認すること**

---

## Phase 1: 表示切れ修正（最優先・全体に影響）

### 1-1. RPGWindow の clip-path がタイトルを切る問題

**ファイル:** `src/components/ui/RPGWindow.tsx`

**原因:** `clip-path:polygon(4px_0,...)` の上辺が要素上端(0)から始まるが、
タイトルラベルは `absolute -top-4` で上に16pxはみ出すため、clip-path でカットされる。

**修正方針:** コンポーネントを2層構造に変更。外側にタイトル、内側に clip-path。

```tsx
export const RPGWindow: FC<RPGWindowProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`relative ${title ? 'pt-4' : ''}`}>
      {title && (
        <div className="absolute top-0 left-4 z-10 bg-bg-primary px-2 border-2 border-white text-text font-retro">
          {title}
        </div>
      )}
      <div className={`relative bg-bg-card border-4 border-white p-4 font-retro text-text [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)] ${className}`}>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  );
};
```

**影響範囲:** この修正で以下が同時に治る:
- Sample セクション "ITEM GET!" の切れ
- ComparisonTable "ステータス比較" の上半分切れ
- CTA の PrepPointBox "最後に" ラベル

### 1-2. PixelContainer の同じ clip-path 問題

**ファイル:** `src/components/ui/PixelContainer.tsx`

**原因:** RPGWindow と同じ。`PrepPointBox` がこのコンポーネントを使用しており、
`absolute -top-4` のタイトルラベルが clip-path で切られる。

**修正方針:** PixelContainer 自体は汎用なので clip-path はそのまま残す。
代わりに `PrepPointBox.tsx` 側で外側ラッパーを追加する。

**ファイル:** `src/components/ui/PrepPointBox.tsx`

```tsx
export const PrepPointBox: FC<PrepPointBoxProps> = ({
    children,
    title = "POINT",
    icon = "◆",
    className,
    variant = 'primary'
}) => {
    return (
        <div className="relative pt-4 mb-6">
            <div
                className={cn(
                    "absolute top-0 left-4 z-10 px-3 py-1 text-sm border-2 font-bold flex items-center gap-2 font-retro",
                    variant === 'primary'
                        ? "bg-black text-white border-white"
                        : "bg-accent-gold text-black border-accent-gold"
                )}
            >
                <span aria-hidden="true" className="animate-pulse">{icon}</span>
                {title}
            </div>
            <PixelContainer
                className={cn(
                    "p-6 border-2",
                    variant === 'primary' ? "bg-bg-card border-white" : "bg-bg-secondary border-accent-gold",
                    className
                )}
            >
                <div className="text-text leading-relaxed mt-2">
                    {children}
                </div>
            </PixelContainer>
        </div>
    );
};
```

**影響範囲:** この修正で以下が同時に治る:
- HowItWorks の Step1, Step2, Step3 の上半分切れ

### 1-3. ShopCard の「★ おすすめ」バッジ切れ

**ファイル:** `src/components/ui/ShopCard.tsx`

`absolute -top-5` のバッジも clip-path で切られている可能性がある。
Phase 2 で ShopCard を作り替えるため、ここでは対応不要。

---

## Phase 2: 料金プラン改修

### 2-1. 料金体系の変更

**旧:** 梅竹松の月額サブスク制（¥2,980 / ¥4,980 / ¥9,800）
**新:** 2商品の従量制

| 商品 | 内容 | 価格 |
|------|------|------|
| 📜 リンク束 | パーソナライズ済み厳選ニュースリンク 30件/日 | 300円/日 |
| ⚔️ 厳選ネタ | 厳選1記事 + タイトル案3つ | 100円/件 |

**月額表示は一切しない。** 日額・件数単位のみ。

### 2-2. 型定義の変更

**ファイル:** `src/types/index.ts`

Plan 型を廃止し、新しい Product 型を定義:

```typescript
export interface Product {
  id: string;
  name: string;
  icon: string;
  price: number;         // 円
  unit: string;          // '日' or '件'
  description: string;
  features: string[];
  highlight?: boolean;   // 強調表示
}
```

既存の Plan 型は Product 型に差し替える。Plan 型への参照がある箇所もすべて更新すること。

### 2-3. データの変更

**ファイル:** `src/data/content.ts`

`PLANS` 配列を `PRODUCTS` に変更:

```typescript
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
      'そのまま台本に使えるクオリティ',
    ],
    highlight: true,
  },
];
```

`PRICING_DESCRIPTION` も変更:
```typescript
export const PRICING_DESCRIPTION = "缶コーヒー1本分で、あなたの2時間を買い戻す。";
```

### 2-4. ShopCard の作り替え

**ファイル:** `src/components/ui/ShopCard.tsx`

新しい Product 型に対応する。clip-path 問題も同時に修正。

```tsx
import type { FC } from 'react';
import type { Product } from '../../types';
import { cn } from '../../lib/utils';
import { BorderBeam } from './BorderBeam';

interface ShopCardProps {
  product: Product;
}

export const ShopCard: FC<ShopCardProps> = ({ product }) => {
  const isHighlight = product.highlight;

  return (
    <div className="relative pt-6">
      {isHighlight && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-accent-gold text-black px-3 py-1 border-2 border-white font-bold font-retro z-10 motion-safe:animate-[float_3s_ease-in-out_infinite]">
          ★ おすすめ
        </div>
      )}
      <div
        className={cn(
          "relative p-6 font-retro transition-transform duration-200 [transition-timing-function:steps(3,end)]",
          "border-4 [clip-path:polygon(4px_0,calc(100%-4px)_0,100%_4px,100%_calc(100%-4px),calc(100%-4px)_100%,4px_100%,0_calc(100%-4px),0_4px)]",
          isHighlight
            ? "bg-bg-card border-accent-gold transform scale-105 z-10 hover:scale-110 hover:shadow-[8px_8px_0px_0px_#F8B800] motion-reduce:transform-none"
            : "bg-bg-secondary border-white hover:scale-105 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#F8B800] motion-reduce:transform-none"
        )}
      >
        {isHighlight && (
          <BorderBeam className="-inset-1" size={80} duration={4} borderWidth={4} colorFrom="#F8B800" colorTo="#00E8D8" />
        )}

        <div className="text-center mb-4">
          <div className="text-4xl mb-2">{product.icon}</div>
          <h3 className="text-2xl mb-2">{product.name}</h3>
          <div className="text-accent-gold text-3xl font-bold">
            ¥{product.price}
            <span className="text-lg text-text-muted">/{product.unit}</span>
          </div>
        </div>

        <div className="border-t-2 border-dashed border-white my-4" />

        <div className="text-center mb-4 text-base text-accent-cyan">
          「{product.description}」
        </div>

        <ul className="space-y-2 mb-6 text-base">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <span className="text-accent" aria-hidden="true">▶</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
```

### 2-5. Pricing コンポーネントの修正

**ファイル:** `src/components/Pricing.tsx`

- `PLANS` → `PRODUCTS` に変更
- `ShopCard` に `product` prop を渡す
- グリッドを `grid-cols-1 md:grid-cols-2` に変更（2商品なので）
- **スポットお試しの訴求テキストを追加:**

```tsx
<div className="text-center mt-12 text-lg text-text-muted font-retro">
  <p>まずは<span className="text-accent-gold font-bold">厳選ネタ1記事（100円）</span>からお試しください！</p>
</div>
```

### 2-6. CTA テキスト修正

**ファイル:** `src/components/CTA.tsx`

CTA の PrepPointBox 内テキストを従量制に合わせて修正:

```tsx
// 変更前:
"月額たったの数千円で時間が買える！"

// 変更後:
"缶コーヒー1本分で2時間が買える！"
```

---

## Phase 3: Sample セクション改修

### 3-1. Marquee を縦並びに変更

**ファイル:** `src/components/Sample.tsx`

**問題:** Marquee（横スクロール）で右側が見切れ、ITEM GET! のラベルも切れている。
**修正:** Marquee を廃止し、通常の縦並びグリッドに変更。

```tsx
// 変更前: Marquee 横スクロール
<Marquee pauseOnHover className="...">
  {SAMPLE_ARTICLES.map(...)}
</Marquee>

// 変更後: 縦並びグリッド
<div className="grid grid-cols-1 gap-8">
  {SAMPLE_ARTICLES.slice(0, 3).map((article) => (
    <div key={article.id} className="sample-card">
      <RPGWindow title="[!] ITEM GET!" className="p-4 md:p-8">
        {/* 中身はそのまま維持 */}
      </RPGWindow>
    </div>
  ))}
</div>
```

注意:
- `Marquee` の import は削除する
- 5件全部表示すると長すぎるので `slice(0, 3)` で3件に制限
- GSAPアニメーションは `x: 100` → `y: 30` に変更（横からではなく下から出現）
- Phase 1 の RPGWindow 修正で "ITEM GET!" の切れも同時に解決

---

## Phase 4: 文字サイズの全体的な拡大

以下のコンポーネントで文字サイズを1段階アップする。

### 対象と変更内容

| ファイル | 変更箇所 | 変更前 → 変更後 |
|----------|----------|-----------------|
| `Pain.tsx:83` | セクション見出し | `text-2xl md:text-3xl` → `text-3xl md:text-4xl` |
| `Pain.tsx:103` | 吹き出しテキスト | `text-lg md:text-xl` → `text-xl md:text-2xl` |
| `Solution.tsx` | 見出し以外の本文 | `text-sm` → `text-base` に変更（全箇所） |
| `Sample.tsx:80` | セクション見出し | `text-2xl md:text-3xl` → `text-3xl md:text-4xl` |
| `ComparisonTable.tsx:40` | テーブル本文 | テーブルセル内の `text-lg` → `text-xl` |
| `Trust.tsx:130-142` | 数値下の説明テキスト | `text-sm` → `text-base` |
| `FaqAccordion.tsx:105` | 質問テキスト | `text-lg` → `text-xl` |
| `FaqAccordion.tsx:116-117` | 回答テキスト | デフォルト → `text-base md:text-lg` |
| `HowItWorks.tsx:105-106` | ステップ説明 | `text-sm` → `text-base` |
| `DeveloperStory.tsx:72` | ストーリーテキスト | `text-lg md:text-xl` → `text-xl md:text-2xl` |
| `Footer.tsx` | フッターテキスト | `text-sm` / `text-xs` → `text-base` / `text-sm` |

**原則:** `text-xs` → `text-sm`、`text-sm` → `text-base`、`text-lg` → `text-xl` に1段階アップ。
見出し（h2, h3）はそのままか1段階アップ。

---

## Phase 5: 検証

```bash
npm run build
npm run dev
```

確認ポイント:
- [ ] ビルドがエラーなく通る
- [ ] **RPGWindow のタイトルラベルがすべて見切れずに表示される**
- [ ] **PrepPointBox のタイトルラベル（STEP 1, STEP 2 等）が見切れずに表示される**
- [ ] **ComparisonTable の "ステータス比較" が完全に表示される**
- [ ] **Sample セクションが縦並びで表示され、切れていない**
- [ ] 料金セクションに2商品（リンク束 / 厳選ネタ）が表示される
- [ ] 月額表示がどこにも存在しない
- [ ] 文字サイズが全体的に読みやすいサイズになっている
- [ ] CTA のテキストが「缶コーヒー1本分で2時間が買える！」になっている
- [ ] TypeScript の型エラーがない（Plan → Product の変更が全箇所反映されている）
- [ ] モバイル表示（375px幅）でも崩れない

---

## 制約事項

- **8bit美学を崩すな**: `steps()` イージング、ピクセルフォント、RPGウィンドウ
- **外国語混入禁止**: 中国語・韓国語・ロシア語等を絶対に日本語テキストに混ぜるな
- **月額表示禁止**: 円/月、月額、/月 などの月額を匂わせる表現を一切使うな
- **修正後のテキスト確認**: 日本語テキストを変更した場合、修正後の全文を出力して確認すること
- **既存コンポーネントの動作を壊さない**: 追加と修正のみ

---

## 完了報告

全Phase完了後、以下を報告:
1. 修正したファイル一覧
2. `npm run build` の結果
3. 表示切れが解消されたことの確認
4. 料金セクションの表示内容
5. 変更したテキストの全文一覧
