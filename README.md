# pcg
https://adeliae1316.github.io/pcg-site/

## Purposes
- practice html5, js and css.
- provide easy way to throw coins for pcg.

## How to Use
- `Field`または`Bench`の数値を、クリックまたはタップすると、`0~300`のSelect-Optionが出るので、ダメカンに利用してください。
- `GX`と書かれたマーカをクリックまたはタップすると、グレー色のフィルタが掛かります。GXマーカとして利用してください。ダブルクリックまたはダブルタップで元に戻ります。
- `Status`の画像をクリックまたはタップすると、Modalが出てその状態へ変更するか問われます。`OK`を押すとグレー色のフィルタが外れて現在の状態が判断できます。`ねむり` `マヒ` `こんらん` 状態は重ならないので、いずれかの状態に変更したのちに、他の状態へ変更しようとすると変更するか問われます。
- すでになっている状態をクリックまたはタップすると、Modalが出て、その状態の説明閲覧と回復がおこなえます。
- `どく` `やけど` `こんらん` 状態は、ポケモンチェックの際にダメカンを載せることがあります。ダブルクリックまたはダブルタップすると、固定ダメージが`Field`の数値に加算されます。
- `Coins`に配置されている数値の書かれたボタンをクリックまたはタップすると、2種類のサークルによって、コイントスの結果を表示します。`Coins: `の横に示される数値は、同じコイントスを何度おこなったかを示しています。他のコイントスをおこなうか、数値をクリックまたはタップするとリセットされます。
- タイトルの`POKECA FIELD`を長押しすると、いま読んでいるGitHubのREADME.mdを新しいタブで開きます。

## Technical Matter
- コイントスに用いられる数値は[Math.floor((Math.random() * 1000)) % 2](https://github.com/adeliae1316/pcg-site/blob/7f01890d60aad596b21c1f17cbc4ad88e387c8bb/pokeca.js#L208)と定義されています。Math.randomは 0.0 <= x < 1.0 の値を返します。サンプル数を増やすため、その数値を1000倍します。また、Math.randomは小数を返すので、Math.floorで最大の整数を返します。こうして求められたランダムな数値の2による剰余を求めます。おそらく偏りなくコイントスの結果が出力できると考えています。
- js詳しくないので詳細はわからないのですが、`click`イベントと`dblclick`イベントを同じスクリプト内で判定できないらしいです。single clickイベントが先に発火してしまう所為みたいです。なので[この関数](https://github.com/adeliae1316/pcg-site/blob/7f01890d60aad596b21c1f17cbc4ad88e387c8bb/pokeca.js#L244)を実装・利用しています。1度クリックまたはタップされた時から300ms秒待ち、300ms秒以内に何度クリックまたはタップがあったかを判定しています。
- [Media Queries](https://developer.mozilla.org/ja/docs/Web/CSS/Media_Queries/Using_media_queries)を利用して、画面幅でレイアウト4種類用意し、調整しています。開発のほとんどをGoogle Chrome(72.0.3626.109（Official Build）（64 ビット）)を用いて行なったため、FirefoxやSafari、EdgeやIEなどではレイアウトが崩れる可能性があります。

## Materialize
- This site uses CSS Framework: [Materialize](https://materializecss.com/).
  - GitHub is [here](https://github.com/Dogfalo/materialize).

```
copyright 2014-2019 Materialize, All rights reserved.
Released under the MIT license
https://opensource.org/licenses/mit-license.php
```

## References
- [開発者向けのウェブ技術](https://developer.mozilla.org/ja/docs/Web)
- [Webクリエイターボックス](https://www.webcreatorbox.com/)
- [日本語対応！CSS Flexboxのチートシートを作ったので配布します](https://www.webcreatorbox.com/tech/css-flexbox-cheat-sheet)
- [レスポンシブの基本、メディアクエリの書き方](https://sole-color-blog.com/blog/71/)
- [CSS GridとFlexboxを使ってメディアクエリなしでレスポンシブにレイアウトする方法](https://parashuto.com/rriver/development/responsive-layout-with-css-grid-and-flexbox)
- [HTMLSelectElement.selectedIndex](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex)
