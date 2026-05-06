window.YOUTUBE_TO_EBOOK_LIBRARY = {
  generatedAt: "2026-05-07",
  sourceRepo: "https://github.com/zarazhangrui/youtube-to-ebook",
  upstream: {
    name: "zarazhangrui/youtube-to-ebook",
    repo: "https://github.com/zarazhangrui/youtube-to-ebook",
    commit: "7f67fd6b55a272012df3767cf6d8c54bd2d7a9f3",
    commitLabel: "7f67fd6",
    licenseNote: {
      en: "The upstream README declares MIT usage, but the inspected snapshot does not include a standalone LICENSE file.",
      zh: "上游 README 标注为 MIT 使用方式，但当前快照没有独立 LICENSE 文件。",
      ja: "上流 README では MIT とされていますが、確認したスナップショットには独立した LICENSE ファイルはありません。",
    },
  },
  sources: {
    channels: [
      "@LatentSpacePod",
      "@ycombinator",
      "@a16z",
      "@RedpointAI",
      "@EveryInc",
      "@DataDrivenNYC",
      "@NoPriorsPodcast",
      "@DwarkeshPatel",
    ],
    pipeline: [
      { name: "YouTube Data API", url: "https://developers.google.com/youtube/v3" },
      { name: "Supadata transcript API", url: "https://supadata.ai/" },
      { name: "Anthropic Claude API", url: "https://docs.anthropic.com/" },
      { name: "Gmail SMTP app password", url: "https://support.google.com/accounts/answer/185833" },
    ],
    outputs: ["Homepage article", "EPUB", "Newsletter archive"],
    modules: [
      "main.py",
      "get_videos.py",
      "get_transcripts.py",
      "write_articles.py",
      "send_email.py",
      "dashboard.py",
      "video_tracker.py",
    ],
  },
  articles: [
    {
      id: "youtube-to-ebook-principle-and-native-flow",
      type: "ebook",
      source: "youtube-to-ebook",
      date: "2026-05-07",
      minutes: 6,
      title: {
        en: "YouTube to Ebook: turning video feeds into adaptive study articles",
        zh: "YouTube to Ebook：把视频流变成适配型学习文章",
        ja: "YouTube to Ebook: 動画フィードを適応型の学習記事へ",
      },
      dek: {
        en: "This first article defines the page format: YouTube-to-Ebook outputs should enter the homepage as curated, source-aware long reads, not as backend task logs.",
        zh: "这第一篇文章定义这个页面的格式：YouTube-to-Ebook 的产出应作为经过精选、可追溯来源的长读文章进入主页，而不是作为后端任务日志出现。",
        ja: "この最初の記事はページ形式を定義します。YouTube-to-Ebook の出力は backend log ではなく、source-aware な長文記事として homepage に入ります。",
      },
      tags: [
        { en: "Adaptive ebook", zh: "适配型 ebook", ja: "適応型 ebook" },
        { en: "Transcript", zh: "字幕", ja: "字幕" },
        { en: "Long read", zh: "长读文章", ja: "長文記事" },
        { en: "Homepage archive", zh: "主页归档", ja: "Homepage archive" },
      ],
      sections: [
        {
          kind: "paragraph",
          label: {
            en: "Why this belongs here",
            zh: "为什么它属于这个页面",
            ja: "なぜこのページに置くのか",
          },
          text: {
            en: "Follow Builders is a feed for tracking people and signals. YouTube to Ebook is the next layer: a digestion loop. A video episode is easy to consume passively; an article is easier to annotate, search, cite, revisit, and connect with research questions.",
            zh: "Follow Builders 更像追踪人物和信号的信息流。YouTube to Ebook 是下一层：一条消化回路。视频很容易被被动消费；文章更容易标注、搜索、引用、复读，也更容易和研究问题连接起来。",
            ja: "Follow Builders は人物と signal を追う feed です。YouTube to Ebook はその次の層であり、消化のための loop です。動画は受動的に消費しやすい一方、記事は annotation、検索、引用、再読、研究課題との接続がしやすくなります。",
          },
        },
        {
          kind: "steps",
          label: {
            en: "Native flow",
            zh: "原生流程",
            ja: "原生フロー",
          },
          steps: [
            {
              title: {
                en: "Collect candidate videos",
                zh: "收集候选视频",
                ja: "候補動画を集める",
              },
              body: {
                en: "The upstream code resolves channel handles into upload playlists, then takes recent long-form videos while filtering Shorts.",
                zh: "上游代码把频道 handle 解析成 uploads playlist，然后抓取近期长视频，同时过滤 Shorts。",
                ja: "上流コードは channel handle を uploads playlist に解決し、Shorts を除外しながら最近の長尺動画を取得します。",
              },
            },
            {
              title: {
                en: "Fetch the transcript",
                zh: "获取字幕",
                ja: "字幕を取得する",
              },
              body: {
                en: "The inspected snapshot uses Supadata for transcript access. This is a private service dependency, not browser-side GitHub Pages logic.",
                zh: "当前快照使用 Supadata 获取字幕。这是私有服务依赖，不是应该放在 GitHub Pages 浏览器端执行的逻辑。",
                ja: "確認した snapshot では Supadata で字幕を取得します。これは private service dependency であり、GitHub Pages の browser logic ではありません。",
              },
            },
            {
              title: {
                en: "Rewrite into a standalone article",
                zh: "改写成独立文章",
                ja: "単独で読める記事に書き換える",
              },
              body: {
                en: "The title, description, source URL, and transcript are passed into the model so names and technical terms can be corrected before the article is written.",
                zh: "标题、描述、原链接和字幕会一起交给模型，让人名和技术术语在写作前被校正。",
                ja: "title、description、source URL、transcript を model に渡し、固有名詞や技術用語を補正してから記事化します。",
              },
            },
            {
              title: {
                en: "Package for slow reading",
                zh: "打包成慢读材料",
                ja: "じっくり読む形式へまとめる",
              },
              body: {
                en: "Markdown can become a homepage article, EPUB chapter, or email newsletter. The same text should be useful on the web and in an ebook reader.",
                zh: "Markdown 可以变成主页文章、EPUB 章节或邮件 newsletter。同一份文本应该既能在网页上读，也能在电子书阅读器里读。",
                ja: "Markdown は homepage 記事、EPUB chapter、email newsletter になります。同じ本文を web と ebook reader の両方で読めるようにします。",
              },
            },
            {
              title: {
                en: "Curate before publishing",
                zh: "发布前精选",
                ja: "公開前に選別する",
              },
              body: {
                en: "Raw transcripts, credentials, and generated archives stay private by default. Only rights-checked, deliberately selected learning articles enter the public site.",
                zh: "原始字幕、密钥和生成归档默认保持私有。只有检查过版权边界、经过主动选择的学习文章才进入公开站点。",
                ja: "raw transcript、credentials、generated archive は既定で非公開にします。権利境界を確認し、意図的に選んだ学習記事だけを公開 site に入れます。",
              },
            },
          ],
        },
        {
          kind: "paragraph",
          label: {
            en: "What the skill contributes",
            zh: "这个 skill 真正贡献了什么",
            ja: "この skill が担うこと",
          },
          text: {
            en: "The useful abstraction is not the Python command alone. It is a repeatable editorial pattern: find a high-signal video, recover the transcript, preserve source context, rewrite it into a coherent long read, and leave enough metadata that the reader can return to the original.",
            zh: "它真正有用的抽象不只是一个 Python 命令，而是一个可重复的编辑模式：找到高信号视频，恢复字幕，保留来源上下文，把它改写成连贯长文，并留下足够元数据让读者能回到原始材料。",
            ja: "有用なのは Python command 単体ではありません。高信号の動画を見つけ、字幕を取得し、source context を保持し、読める長文に変換し、原典へ戻れる metadata を残す反復可能な editorial pattern です。",
          },
        },
        {
          kind: "paragraph",
          label: {
            en: "How future ebook articles enter",
            zh: "未来 ebook 文章如何进入",
            ja: "今後の ebook 記事の入り方",
          },
          text: {
            en: "Future local runs should append sanitized article records to this library. The public page keeps the same Follow Builders style: searchable cards first, then an article reader after the user opens one item.",
            zh: "之后本地运行应把清洗过的文章记录追加到这个 library。公开页面保持和 Follow Builders 一样的形式：先是可搜索的文章卡片，用户打开某一篇后进入文章阅读器。",
            ja: "今後の local run は sanitized article record をこの library に追加します。公開ページは Follow Builders と同じ形を保ち、まず検索可能な card を表示し、開いた後に記事 reader に入ります。",
          },
        },
      ],
      links: [
        { label: "Upstream project", href: "https://github.com/zarazhangrui/youtube-to-ebook" },
        { label: "Source commit 7f67fd6", href: "https://github.com/zarazhangrui/youtube-to-ebook/tree/7f67fd6b55a272012df3767cf6d8c54bd2d7a9f3" },
      ],
    },
  ],
};
