# Eva's F1 E-commerce website

## 簡介

本專案為 F1 愛好者提供海外周邊產品購買平台，車迷能夠根據喜愛的車隊或車手篩選出自己的目標商品，也能夠自行註冊帳密，若忘記密碼則提供「忘記密碼」功能，且能夠進行第三方金流服務。

## 環境建置

使用 Ｎode.js 的 Express 作為框架； MySQL Workbench 作為資料庫儲存資料。

![Static Badge](https://img.shields.io/badge/Node.js-18.16.1-red.svg)
![Static Badge](https://img.shields.io/badge/connect--flash-0.1.1-red.svg)
![Static Badge](https://img.shields.io/badge/express-4.17.1-red.svg)
![Static Badge](https://img.shields.io/badge/express--handlebars-5.3.3-red.svg)
![Static Badge](https://img.shields.io/badge/express--session-1.17.2-red.svg)
![Static Badge](https://img.shields.io/badge/method--override-3.0.0-red.svg)
![Static Badge](https://img.shields.io/badge/faker-5.5.3-red.svg)
![Static Badge](https://img.shields.io/badge/mysql2-2.3.0-red.svg)
![Static Badge](https://img.shields.io/badge/sequelize-6.6.5-red.svg)
![Static Badge](https://img.shields.io/badge/sequelize--cli-6.2.0-red.svg)
![Static Badge](https://img.shields.io/badge/passport--local-1.0.0-red.svg)
![Static Badge](https://img.shields.io/badge/dotenv-10.0.0-red.svg)

## 主要功能

### 前台使用者

使用者註冊登入後，可將心儀產品加入購物車，查看訂單、購物車，並使用第三方金流結帳。提供了兩組 user 種子資料做使用。

```
使用者：user1
使用者email: user1@example.com
使用者密碼：12345678

使用者：user2
使用者email: user2@example.com
使用者密碼：12345678
```

### 後台管理者

管理者（admin）可以將商品上架或下架，查看顧客訂購記錄。提供了一組 admin 種子資料做使用。
```
管理者：admin
管理者email: admin@example.com
管理者密碼：12345678
```

## 檔案執行

1. 請先確保 local 端有安裝 Node.js、MySQL Workbench 及 npm。

2. 將本專案下載或 git clone 至本地後，將 .env.example 檔案改名成 .env，並根據檔案中使用到的環境變數名稱填入相應的資料。

3. 在終端機輸入以下指令，一次安裝所有套件：

```
npm install
```
4. 設定 config.json 檔，並確認與 MySQL workbench 資料庫連線。

5. 可根據 package.json 中的預設指令執行本檔案。

6. 若出現以下訊息，代表可正式運作本專案：

```
Example app listening on http://localhost:3000
```

7. 若需要使用本專案的種子資料，請依序輸入：

```js
  // 生成種子資料
  npx sequelize db:migrate
  npx sequelize db:seed:all
```

此種子資料將會生成 user 以及產品的假資料供測試使用。

