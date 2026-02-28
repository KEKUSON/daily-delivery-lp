# Step 5: animated-component-libraries 指示書

## 重要: 作業方法について

この指示書のコードブロックは **シェルで実行するものではない**。
シェルで実行するコマンドは `npm install` と `npm run build` の2つだけ。
それ以外のコードブロックは全て **ファイルへの書き込み（Write/Edit）** で扱うこと。

## 概要

Magic UI と React Bits の2つのアニメーションコンポーネントライブラリから、NES/ファミコンの8bitピクセルアート美学に適合するコンポーネントを厳選して導入する。既存のGSAP ScrollTrigger・PixiJS WebGLと競合しない領域に限定し、マイクロインタラクションとコンポーネントレベルの演出を強化する。

## 制約事項（必ず守ること）

1. NES美学の維持: 導入するコンポーネントは全て steps() タイミング、NESカラーパレット（#E40058, #F8B800, #00E8D8）に適合させる。スムーズなイージングは使わない
2. 既存アニメーションとの共存: GSAP ScrollTrigger（スクロールアニメーション担当）、PixiJS（パーティクル担当）と競合させない。導入コンポーネントはそれらが担当していない領域のみ
3. Tailwind CSS v4: @theme ブロックでCSS変数定義。tailwind.config.js は使わない。@theme inline でカスタムアニメーション変数を追加
4. verbatimModuleSyntax: 型のみのimportには import type を使うこと
5. 絵文字禁止: テキストシンボル（◆ ▶ ◇ ★）のみ使用
6. コピペ方式: Magic UI / React Bits のコンポーネントは src/components/ui/ にコピペで追加。npm CLIインストーラは使わない

---

## A. 依存関係のセットアップ

### A1. パッケージインストール（シェルで実行）

```bash
npm install motion clsx tailwind-merge
```

- motion: Magic UI コンポーネントが依存する Framer Motion（v12+ は motion/react からimport）
- clsx + tailwind-merge: Magic UI の cn() ユーティリティに必要

### A2. cn() ユーティリティ作成

新規ファイル: src/lib/utils.ts

以下の内容でファイルを新規作成する（Writeで書き込み）:

```typescript
import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

---

## B. Marquee — Sample セクション横スクロール置き換え

対象ファイル: src/components/Sample.tsx
目的: 手動の overflow-x-auto 横スクロールを、無限ループのMarqueeに置き換える。レトロゲームのスコアボード・ニューステロップ風。

### B1. Marquee コンポーネント作成

新規ファイル: src/components/ui/Marquee.tsx

Magic UI の Marquee コンポーネントを公式サイトから取得してコピペする。
ソース: https://magicui.design/docs/components/marquee

基本的なインターフェース:

```typescript
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  vertical?: boolean;
  repeat?: number;
  className?: string;
  children: React.ReactNode;
}
```

cn() は "../../lib/utils" からimportすること。

### B2. index.css にキーフレーム追加

src/index.css の @theme ブロック内に以下の1行を追加する（Editで修正）:

```
--animate-marquee: marquee var(--duration, 40s) linear infinite;
```

@theme ブロックの外（他のキーフレーム定義の近く）に以下を追加する:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(calc(-100% - var(--gap))); }
}
```

### B3. Sample.tsx の修正（Editで修正）

変更点:
- Marquee を import に追加
- overflow-x-auto snap-x snap-mandatory scrollbar-hide の div を Marquee コンポーネントに置き換え
- pauseOnHover={true} でホバー時停止
- className に [--duration:30s] [--gap:1.5rem] を指定してスピードとギャップ調整
- カードの snap-center クラスを削除
- GSAP の .sample-card スタガーアニメーションはそのまま維持（初回表示時のslide-in）

変更後のマークアップイメージ:

```
<Marquee pauseOnHover className="[--duration:30s] [--gap:1.5rem]">
  {SAMPLE_ARTICLES.map で既存のカードをそのままレンダリング}
</Marquee>
```

---

## C. CountUp — Trust セクションのレベル数値アニメーション

対象ファイル: src/components/ui/StatusBar.tsx, src/components/Trust.tsx
目的: StatusBar の Lv.XX の数値がスクロールで表示されると0からカウントアップする。レトロゲームのスコア加算風。

### C1. CountUp コンポーネント作成

新規ファイル: src/components/ui/CountUp.tsx

React Bits の CountUp コンポーネントを公式サイトから取得してコピペ。
ソース: https://reactbits.dev/docs/components/count-up

カスタマイズポイント:
- duration: 1.5秒程度
- スクロールで表示された時にトリガー（IntersectionObserver）
- アニメーション: Math.floor() で整数表示（小数点なし＝ゲームっぽく）

### C2. StatusBar.tsx に CountUp 統合（Editで修正）

現在の静的テキスト Lv.{level} を CountUp コンポーネントで置き換える。

変更前:
```
<div className="w-16 text-left ml-2 text-accent-gold">Lv.{level}</div>
```

変更後:
```
<div className="w-16 text-left ml-2 text-accent-gold">
  Lv.<CountUp end={level} duration={1.5} />
</div>
```

注意: CountUp 自体にスクロールトリガーが内蔵されている場合、既存のGSAP useGSAP の clipPath アニメーションと同時に発火するようタイミングを合わせること。CountUp に IntersectionObserver がない場合は、GSAP の onStart コールバックで state を変更してトリガーする方式も可。

---

## D. BorderBeam — 推奨 ShopCard の光線エフェクト

対象ファイル: src/components/ui/ShopCard.tsx
目的: 竹プラン（recommended）カードの枠に沿って光が走るエフェクト。border-pulse の上位互換。

### D1. BorderBeam コンポーネント作成

新規ファイル: src/components/ui/BorderBeam.tsx

Magic UI の BorderBeam コンポーネントを公式サイトから取得してコピペ。
ソース: https://magicui.design/docs/components/border-beam

cn() は "../../lib/utils" からimportすること。

カスタマイズ必須ポイント:
- size={80} — ビームの長さ（px）
- duration={4} — 一周の秒数（ゆっくり目＝荘厳な感じ）
- borderWidth={4} — 既存の border-4 に合わせる
- 色: colorFrom="#F8B800" (accent-gold) → colorTo="#00E8D8" (accent-cyan)
- delay={0} — 即座に開始

### D2. ShopCard.tsx に BorderBeam 統合（Editで修正）

推奨プランのカードにのみ BorderBeam を追加する。

既存の animate-[border-pulse_2s_steps(2,end)_infinite] は BorderBeam 導入後に削除して BorderBeam に一本化する。

注意: clip-path: polygon(...) が設定されているため、BorderBeam が正しく表示されるか検証必要。clip-path が BorderBeam の overflow を隠してしまう場合は、BorderBeam を外側のラッパーに配置するか、clip-path を BorderBeam 側にも適用すること。

### D3. index.css にキーフレーム追加

BorderBeam が必要とする CSS アニメーション（コンポーネント内にinline styleで持っている場合は不要）。Magic UI のソースに従って判断。

---

## E. NumberTicker — Pricing セクション価格アニメーション

対象ファイル: src/components/ui/ShopCard.tsx
目的: 価格表示（200G, 300G, 500G）がスクロール表示時に 0 からティッキングアップする。ゲームの所持金が増える演出。

### E1. NumberTicker コンポーネント作成

新規ファイル: src/components/ui/NumberTicker.tsx

Magic UI の NumberTicker コンポーネントを公式サイトから取得してコピペ。
ソース: https://magicui.design/docs/components/number-ticker

cn() は "../../lib/utils" からimportすること。

カスタマイズポイント:
- value={plan.price} — 目標値
- delay={0.3} — 少し遅延して開始
- decimalPlaces={0} — 整数表示
- スクロールで表示された時にトリガー（IntersectionObserver）

### E2. ShopCard.tsx の価格部分を置き換え（Editで修正）

変更前:
```
<div className="text-accent-gold text-xl">{plan.price}G<span className="text-sm text-text-muted">/日</span></div>
```

変更後:
```
<div className="text-accent-gold text-xl">
  <NumberTicker value={plan.price} delay={0.3} />G
  <span className="text-sm text-text-muted">/日</span>
</div>
```

---

## F. AnimatedGridPattern — Solution セクション背景

対象ファイル: src/components/Solution.tsx
目的: Solution セクションの背景にグリッドパターンが点滅するエフェクトを追加。ピクセルグリッドが瞬くようなNES風の演出。

### F1. AnimatedGridPattern コンポーネント作成

新規ファイル: src/components/ui/AnimatedGridPattern.tsx

Magic UI の AnimatedGridPattern を公式サイトから取得してコピペ。
ソース: https://magicui.design/docs/components/animated-grid-pattern

cn() は "../../lib/utils" からimportすること。

### F2. Solution.tsx に背景として配置（Editで修正）

section タグの中、既存の gradient transition div の後に AnimatedGridPattern を追加する。

配置イメージ:
```
<section className="... relative overflow-hidden" ref={containerRef}>
  {/* 既存のgradient transition */}
  <div className="absolute top-0 ..." />

  <AnimatedGridPattern
    numSquares={30}
    maxOpacity={0.15}
    duration={4}
    repeatDelay={1}
    className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] absolute inset-0 z-0 fill-accent-gold/20 stroke-accent-gold/10"
  />

  <div className="max-w-5xl w-full z-10">
    {/* 既存コンテンツそのまま */}
  </div>
</section>
```

カスタマイズ:
- numSquares: デスクトップ30、モバイルは15に減らす（パフォーマンス）
- maxOpacity={0.15} — 控えめに。メインコンテンツを邪魔しない
- fill と stroke: accent-gold/20 で金色のピクセルグリッド感
- mask-image: 中心から外に向かってフェードアウト

---

## G. 全体パフォーマンス対策

### G1. prefers-reduced-motion 対応

全ての新規コンポーネントに対して、prefers-reduced-motion メディアクエリをチェックする:

- Marquee: reduced-motion なら animation: none にしてスクロールのみ
- CountUp / NumberTicker: duration を 0 にして即座に最終値表示
- BorderBeam: display: none
- AnimatedGridPattern: maxOpacity を 0 で非表示

### G2. モバイル軽量化

- AnimatedGridPattern: モバイルでは numSquares を半分以下に
- Marquee: モバイルでは [--duration:50s] にしてゆっくり（CPU負荷軽減）
- BorderBeam: モバイルでも表示OK（CSS animationのため軽量）

### G3. motion のツリーシェイキング

motion パッケージは motion/react からの named import を使用する。これによりツリーシェイキングが効く:

OK: import { motion, useInView } from "motion/react";
NG: import * as motion from "motion";

---

## 作業順序の推奨

1. A (Setup) → 依存関係と cn() ユーティリティ
2. C (CountUp) → 最も軽量で影響範囲が小さい
3. E (NumberTicker) → CountUpと類似、同時に作業可能
4. D (BorderBeam) → ShopCard の clip-path との兼ね合いを検証
5. B (Marquee) → Sample セクションの構造変更を含む
6. F (AnimatedGridPattern) → 背景追加で影響小さいが Framer Motion 依存
7. G (パフォーマンス) → 全コンポーネント導入後にまとめて対策

## ビルド検証（シェルで実行）

全タスク完了後:

```bash
npm run build
```

TypeScript エラーなし、Vite ビルド成功を確認してから報告すること。
