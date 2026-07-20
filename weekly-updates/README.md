# 每周进展 · Weekly Progress

一个用来发周报的纯静态网站,托管在 GitHub Pages 上。设计参考同事的
[msft-update](https://zhziszz.github.io/msft-update/) 列表模板,重做成中文版、可复用的模板。

- **列表首页**(`index.html`)—— 一行一期的周报索引(就是那个「列表模板」)。
- **单期周报**(`2026-07-19/index.html`)—— 一个填满示例的完整周报,演示了所有组件。
- **空白模板**(`_template/`)—— 每周复制它开新的一期。

没有任何构建步骤、没有框架、没有 node_modules —— 就是 HTML + CSS + 一点点 JS。

---

## 一、每周怎么更新(3 步)

1. **复制模板**:把 `_template/` 整个文件夹复制一份,重命名为本周日期,例如 `2026-07-26/`。
2. **填内容**:打开里面的 `index.html`,按注释改标题、日期、正文。每个组件旁边都有中文注释。
3. **在首页加一张卡片**:打开根目录的 `index.html`,在周报列表最上面复制一张
   `<a class="week"> … </a>`,把链接指向新文件夹(如 `href="2026-07-26/"`),改好日期和摘要。

> 想让某一期先「占位」而不可点:给卡片加 `class="week upcoming"`(见首页里的例子)。

## 二、本地预览

不能直接双击打开 html(相对路径 + 字体会有跨域问题),用一个本地小服务器:

```bash
cd weekly-updates
python3 -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 三、发布到 GitHub Pages

### 方式 A · 分支部署(最简单,推荐先用这个)

```bash
cd weekly-updates
git init && git add -A && git commit -m "init weekly site"
gh repo create weekly-updates --public --source=. --push   # 或手动在 GitHub 建仓库再 push
```

然后在 GitHub 仓库页:**Settings → Pages → Build and deployment → Source 选 "Deploy from a branch"**,
Branch 选 `main` / `(root)`,保存。一两分钟后站点就在
`https://<你的用户名>.github.io/weekly-updates/`。

以后每次更新:`git add -A && git commit -m "week 07-26" && git push` 即可。

### 方式 B · GitHub Actions 自动部署(已内置)

本仓库带了 `.github/workflows/pages.yml`。在 **Settings → Pages → Source 选 "GitHub Actions"**,
之后每次 `push` 到 `main` 会自动构建发布,不用再手动点分支设置。两种方式二选一即可。

> `.nojekyll` 文件已经放好,用来关闭 GitHub 默认的 Jekyll 处理,保证纯静态文件原样发布。

## 四、把它变成你自己的

改动都集中在少数几个地方:

| 想改什么 | 改哪里 |
| --- | --- |
| 站点名 / 署名 / 邮箱 | 各 html 里的 `每周进展` / `Vito` / `vitoliang0601@gmail.com` |
| 配色主题 | `css/style.css` 顶部 `:root` 里的颜色变量(尤其 `--bg` 底色、`--accent` 重点色) |
| 字体 | `css/style.css` 里的 `--serif / --sans / --mono`(见下方说明) |

### 关于字体

- **英文和数字**用 Google Fonts 上的 Fraunces(衬线大标题)/ Urbanist(正文)/ Geist Mono(等宽),
  由每个 html `<head>` 里的那行 `fonts.googleapis.com` 链接加载。
- **中文**自动回退到系统字体(macOS 的苹方 / Windows 的微软雅黑 / 思源系列),**不额外下载中文网页字体**,
  所以加载快、不卡。代价是不同电脑上的中文字形会略有差别 —— 对周报来说完全够用。
- 如果你想让中文在所有设备上长得一模一样,可以把思源(Noto Sans SC / Noto Serif SC)也加进
  Google Fonts 链接,并放到 `--sans / --serif` 的最前面 —— 但中文网页字体通常有几 MB,会明显变慢,
  一般不建议。

## 五、目录结构

```
weekly-updates/
├── index.html                首页:周报列表(列表模板)
├── 2026-07-19/index.html     一期完整示例周报
├── _template/index.html      空白模板(复制它开新一期)
├── css/style.css             设计系统:配色 + 排版 + 所有组件
├── js/main.js                滚动出现动画(无依赖)
├── assets/                   放图片 / 截图 / 图表
├── .github/workflows/pages.yml  可选:Actions 自动部署
├── .nojekyll                 关闭 Jekyll,纯静态发布
└── README.md                 本文件
```

## 六、可用组件速查

在周报正文里可以直接用这些(`_template/index.html` 里都有可复制的样例):

- **三栏状态板** `.cols`(已完成 / 进行中 / 下周)—— 周报的招牌,强烈建议每期保留。
- **关键数字** `.metrics` —— 大字突出本周几个数。
- **数据表** `table.rt` —— 支持重点列 `.col-lite`、涨幅列 `.col-lift`、重点行 `tr.key`。
- **终端 / 代码块** `.term` —— 奶油底上的深色卡片,放命令或代码。
- **重点提示框** `.report-call` / **灰色小注** `.report-note`。
- **图片 / 占位** `.figure` + `.ph`。
- **待补充占位** `.todo`。
