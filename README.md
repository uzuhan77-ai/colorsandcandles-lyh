# PartyBox 派对盒子（演示版）

派对游戏 / 充气城堡出租的移动端 App 演示：React + Vite，用 Capacitor 打包为安卓 APK。
数据是 `src/data.js` 里的演示数据，购物车和订单保存在本机（localStorage），无后台。

## 功能
首页（搜索、分类、热门推荐、派对攻略）· 分类筛选 · 商品详情（租用日期/天数/数量）· 购物车 · 下单表单 · 我的订单 · 中英文切换

## 开发
```
npm install
npm run dev          # 浏览器预览，手机同一 Wi-Fi 下访问终端显示的局域网地址
```

## 打包安卓 APK
需要 JDK 17+ 和 Android SDK（装 Android Studio 最省事），并设置 `ANDROID_HOME`。
```
npm run android:apk
```
产物：`android/app/build/outputs/apk/debug/app-debug.apk`
