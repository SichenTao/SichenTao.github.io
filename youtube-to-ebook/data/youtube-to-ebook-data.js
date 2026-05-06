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
    {
      id: "demo-reliable-video-collection-pipeline",
      type: "workflow",
      source: "youtube-to-ebook",
      date: "2026-05-07",
      minutes: 5,
      title: {
        en: "A reliable collection pipeline starts before the transcript",
        zh: "可靠的视频采集流程，从字幕之前就开始了",
        ja: "信頼できる収集パイプラインは字幕取得の前から始まる",
      },
      dek: {
        en: "This demo article shows how YouTube to Ebook should become a study article: it preserves the operational logic, explains the decision points, and keeps the source boundary visible.",
        zh: "这篇 demo 展示 YouTube to Ebook 如何变成学习文章：保留操作逻辑，解释关键决策点，同时让来源边界保持可见。",
        ja: "この demo 記事は、YouTube to Ebook を学習記事として扱う形を示します。運用ロジックを残し、判断点を説明し、source boundary を見える状態に保ちます。",
      },
      tags: [
        { en: "YouTube API", zh: "YouTube API", ja: "YouTube API" },
        { en: "Shorts filtering", zh: "Shorts 过滤", ja: "Shorts 除外" },
        { en: "Transcript readiness", zh: "字幕可用性", ja: "字幕の可用性" },
        { en: "Private run", zh: "本地私有运行", ja: "ローカル非公開実行" },
      ],
      sections: [
        {
          kind: "paragraph",
          label: {
            en: "The first decision is what counts as a video",
            zh: "第一步是定义什么才算有效视频",
            ja: "最初の判断は、有効な動画とは何かを決めること",
          },
          text: {
            en: "A useful ebook pipeline does not start by asking the model to summarize whatever appears. It first decides which videos are worth turning into reading material. The upstream project resolves channel handles into upload playlists, pulls recent uploads, and then filters out Shorts so the system focuses on long-form material with enough context for a standalone article.",
            zh: "有用的 ebook 流程不是一上来就让模型总结任何出现的视频，而是先判断哪些视频值得变成阅读材料。上游项目会把频道 handle 解析成 uploads playlist，抓取近期上传内容，再过滤 Shorts，让系统集中处理上下文足够的长视频。",
            ja: "有用な ebook パイプラインは、出てきた動画を何でも要約するところから始まりません。まず、どの動画を読む価値のある材料にするかを決めます。上流 project は channel handle を uploads playlist に解決し、最近の upload を取り、Shorts を除外して、単独記事に必要な文脈を持つ長尺動画に集中します。",
          },
        },
        {
          kind: "steps",
          label: {
            en: "Operational sequence",
            zh: "操作顺序",
            ja: "運用手順",
          },
          steps: [
            {
              title: {
                en: "Resolve the source",
                zh: "解析来源",
                ja: "source を解決する",
              },
              body: {
                en: "Handles such as channel names are converted into stable playlist identifiers. This avoids treating a display label as the real data source.",
                zh: "频道名称这样的 handle 会被转换成稳定的 playlist 标识，避免把展示名误当作真实数据源。",
                ja: "channel 名のような handle を安定した playlist identifier に変換します。表示名を実データ source と誤解しないためです。",
              },
            },
            {
              title: {
                en: "Limit the candidate window",
                zh: "限定候选范围",
                ja: "候補範囲を限定する",
              },
              body: {
                en: "The pipeline takes recent uploads and checks whether each video has already been processed, so reruns do not create duplicate articles.",
                zh: "流程会抓取近期上传，并检查每个视频是否已经处理过，所以重复运行不会制造重复文章。",
                ja: "pipeline は最近の upload を取得し、各動画が処理済みかを確認するため、再実行しても重複記事を作りにくくなります。",
              },
            },
            {
              title: {
                en: "Filter by format",
                zh: "按视频形态过滤",
                ja: "形式で絞り込む",
              },
              body: {
                en: "Short-form clips are excluded because the target output is a coherent article, not a short notification.",
                zh: "短视频会被排除，因为目标产物是一篇连贯文章，而不是一条短提醒。",
                ja: "短尺 clip は除外されます。目標出力は短い通知ではなく、まとまった記事だからです。",
              },
            },
          ],
        },
        {
          kind: "paragraph",
          label: {
            en: "Why this matters for the homepage",
            zh: "为什么这对主页重要",
            ja: "homepage にとって重要な理由",
          },
          text: {
            en: "Once the collection layer is explicit, the homepage can show fewer but better articles. Readers should see curated outputs that are traceable to a source video, not a noisy dump of every item the crawler touched.",
            zh: "一旦采集层是明确的，主页就可以展示更少但更好的文章。读者应该看到能追溯到源视频的精选输出，而不是爬虫碰过的所有条目的噪声堆积。",
            ja: "収集層が明示されると、homepage は少数でも質の高い記事を表示できます。読者が見るべきなのは、source video に戻れる curated output であり、crawler が触った全項目の noise dump ではありません。",
          },
        },
      ],
      links: [
        { label: "get_videos.py", href: "https://github.com/zarazhangrui/youtube-to-ebook/blob/main/get_videos.py" },
        { label: "get_transcripts.py", href: "https://github.com/zarazhangrui/youtube-to-ebook/blob/main/get_transcripts.py" },
      ],
    },
    {
      id: "demo-transcript-to-study-article",
      type: "ebook",
      source: "youtube-to-ebook",
      date: "2026-05-07",
      minutes: 7,
      title: {
        en: "From raw transcript to a magazine-style study article",
        zh: "从原始字幕到杂志式学习文章",
        ja: "生字幕から magazine-style の学習記事へ",
      },
      dek: {
        en: "The article step should not be a compressed summary. It should recover names, preserve technical terms, and turn a spoken conversation into a readable long-form piece.",
        zh: "文章生成不应只是压缩摘要，而应恢复人名，保留技术术语，把口语对话转化为可读的长文。",
        ja: "記事化は単なる圧縮要約ではありません。人名を復元し、技術用語を保ち、話し言葉の conversation を読みやすい長文に変換します。",
      },
      tags: [
        { en: "Claude rewrite", zh: "Claude 改写", ja: "Claude rewrite" },
        { en: "Markdown article", zh: "Markdown 文章", ja: "Markdown 記事" },
        { en: "Source context", zh: "来源上下文", ja: "source context" },
        { en: "Study note", zh: "学习笔记", ja: "学習ノート" },
      ],
      sections: [
        {
          kind: "paragraph",
          label: {
            en: "The transcript is not the article",
            zh: "字幕本身不是文章",
            ja: "字幕はそのまま記事ではない",
          },
          text: {
            en: "A transcript records speech order. It often contains unfinished sentences, ambiguous references, missing punctuation, and names that are easy to mistranscribe. YouTube to Ebook is useful because it inserts an editorial transformation between the raw transcript and the final reading artifact.",
            zh: "字幕记录的是说话顺序，经常有没说完的句子、模糊指代、缺失标点，以及容易转错的人名。YouTube to Ebook 有价值，是因为它在原始字幕和最终阅读材料之间加入了编辑转化。",
            ja: "transcript は発話順を記録するものです。未完の文、曖昧な指示、句読点の欠落、誤認識されやすい固有名詞が含まれます。YouTube to Ebook の価値は、raw transcript と最終的な reading artifact の間に editorial transformation を入れることにあります。",
          },
        },
        {
          kind: "paragraph",
          label: {
            en: "The title and description are evidence",
            zh: "标题和描述也是证据",
            ja: "title と description も証拠になる",
          },
          text: {
            en: "The upstream prompt sends the video title, description, URL, and transcript together. That is important: descriptions often contain guest names, project links, company names, and the intended topic framing. Without that context, the rewritten article can sound fluent while silently changing the facts.",
            zh: "上游 prompt 会把视频标题、描述、URL 和字幕一起交给模型。这很重要：描述里经常有人名、项目链接、公司名称和主题定位。缺少这些上下文，改写后的文章可能看起来流畅，却悄悄改错事实。",
            ja: "上流 prompt は video title、description、URL、transcript を一緒に model に渡します。これは重要です。description には guest 名、project link、company 名、topic framing が含まれることが多いからです。この context がないと、記事は流暢でも事実を静かに変えてしまう可能性があります。",
          },
        },
        {
          kind: "markdown",
          label: {
            en: "Demo output shape",
            zh: "Demo 输出形态",
            ja: "Demo 出力形式",
          },
          text: {
            en: "A good generated article should keep the speaker's strongest ideas, but remove the friction of oral delivery.\n\n- It opens with the central problem.\n- It explains why the topic matters now.\n- It separates claims from examples.\n- It preserves source links for verification.\n- It ends with a usable takeaway for later review.",
            zh: "好的生成文章应该保留说话者最强的思想，同时移除口语表达带来的阅读阻力。\n\n- 开头直接指出核心问题。\n- 解释为什么这个主题现在重要。\n- 区分观点和例子。\n- 保留来源链接以便核验。\n- 结尾留下之后复习时能直接使用的结论。",
            ja: "良い生成記事は、話者の最も重要な考えを残しながら、口語表現による読みにくさを取り除きます。\n\n- 冒頭で中心問題を示す。\n- その topic が今なぜ重要かを説明する。\n- claim と example を分ける。\n- 検証用の source link を残す。\n- 後で復習できる takeaway で終える。",
          },
        },
        {
          kind: "paragraph",
          label: {
            en: "How this maps into the reader",
            zh: "它如何进入阅读器",
            ja: "reader への対応",
          },
          text: {
            en: "In this homepage implementation, each generated article becomes a structured record: multilingual title, multilingual dek, tags, sections, and source links. That is the same principle as the language packs elsewhere on the site: content is stored once in a predictable schema, and the UI only decides which language sequence to show.",
            zh: "在这个主页实现中，每篇生成文章都会变成结构化记录：三语标题、三语导语、标签、正文段落和来源链接。这和全站语言包的原则一致：内容按可预测 schema 存一次，UI 只决定显示哪一种语言或哪几种语言。",
            ja: "この homepage 実装では、生成記事は structured record になります。多言語 title、多言語 dek、tag、section、source link です。これは site 全体の language pack と同じ考え方です。content は予測可能な schema に一度保存し、UI は表示する言語 sequence だけを決めます。",
          },
        },
      ],
      links: [
        { label: "write_articles.py", href: "https://github.com/zarazhangrui/youtube-to-ebook/blob/main/write_articles.py" },
        { label: "README", href: "https://github.com/zarazhangrui/youtube-to-ebook/blob/main/README.md" },
      ],
    },
    {
      id: "demo-publish-ebook-output-to-homepage",
      type: "ebook",
      source: "homepage-reader-demo",
      date: "2026-05-07",
      minutes: 6,
      title: {
        en: "Publishing ebook outputs as homepage articles",
        zh: "把 ebook 输出发布成主页文章",
        ja: "ebook 出力を homepage 記事として公開する",
      },
      dek: {
        en: "The public site should show finished learning artifacts, while raw transcripts, credentials, and draft generations remain private.",
        zh: "公开站点应展示完成后的学习材料，而原始字幕、凭证和草稿生成结果应保持私有。",
        ja: "公開 site では完成した学習 artifact を表示し、raw transcript、credentials、draft generation は非公開に保ちます。",
      },
      tags: [
        { en: "Homepage article", zh: "主页文章", ja: "Homepage 記事" },
        { en: "EPUB output", zh: "EPUB 输出", ja: "EPUB 出力" },
        { en: "Rights boundary", zh: "权利边界", ja: "権利境界" },
        { en: "Multilingual reader", zh: "多语阅读器", ja: "多言語 reader" },
      ],
      sections: [
        {
          kind: "paragraph",
          label: {
            en: "The private-public boundary",
            zh: "私有与公开的边界",
            ja: "private と public の境界",
          },
          text: {
            en: "The automation can run locally, download transcripts, call models, and write markdown or EPUB files. That does not mean every intermediate file belongs on GitHub Pages. The public reader should receive only curated article records with cleaned content and source links.",
            zh: "自动化可以在本地运行，下载字幕，调用模型，写出 markdown 或 EPUB 文件。但这不意味着每一个中间文件都应该进入 GitHub Pages。公开阅读器只应接收经过整理的文章记录、清洗后的正文和来源链接。",
            ja: "automation は local で動き、transcript を取得し、model を呼び、markdown や EPUB を書き出せます。しかし、すべての中間 file を GitHub Pages に置くべきではありません。公開 reader が受け取るのは、curated article record、cleaned content、source link のみです。",
          },
        },
        {
          kind: "steps",
          label: {
            en: "Publication path",
            zh: "发布路径",
            ja: "公開経路",
          },
          steps: [
            {
              title: {
                en: "Generate locally",
                zh: "本地生成",
                ja: "local で生成する",
              },
              body: {
                en: "Credentials, API usage, and raw transcript handling stay outside the static site.",
                zh: "凭证、API 调用和原始字幕处理都留在静态站点之外。",
                ja: "credentials、API usage、raw transcript handling は static site の外に置きます。",
              },
            },
            {
              title: {
                en: "Normalize the record",
                zh: "标准化记录",
                ja: "record を正規化する",
              },
              body: {
                en: "Each article becomes a predictable object with id, date, source, multilingual fields, sections, tags, and links.",
                zh: "每篇文章变成一个可预测对象，包含 id、日期、来源、三语字段、正文分段、标签和链接。",
                ja: "各記事は id、date、source、多言語 field、section、tag、link を持つ予測可能な object になります。",
              },
            },
            {
              title: {
                en: "Render in the shared reader",
                zh: "在共享阅读器中渲染",
                ja: "shared reader で描画する",
              },
              body: {
                en: "The card list, search, language sequence, and detail page reuse the same Medium-like reading pattern as Follow Builders.",
                zh: "卡片列表、搜索、语言顺序和详情页复用 Follow Builders 那套 Medium 式阅读模式。",
                ja: "card list、search、language sequence、detail page は Follow Builders と同じ Medium-like reading pattern を再利用します。",
              },
            },
          ],
        },
        {
          kind: "paragraph",
          label: {
            en: "Why demo articles are useful now",
            zh: "为什么现在需要 demo 文章",
            ja: "なぜ今 demo 記事が必要か",
          },
          text: {
            en: "The demo records let us test the final product shape before connecting a full backend. We can verify search density, mobile reading, language switching, and article navigation using realistic content instead of empty placeholders.",
            zh: "demo 记录让我们在接完整后端之前先测试最终产品形态。我们可以用接近真实的内容验证搜索密度、手机阅读、语言切换和文章跳转，而不是用空占位符假装功能已经完成。",
            ja: "demo record により、full backend を接続する前に最終 product shape を検証できます。empty placeholder ではなく実際に近い content で、検索密度、mobile reading、language switching、article navigation を確認できます。",
          },
        },
      ],
      links: [
        { label: "YouTube to Ebook repository", href: "https://github.com/zarazhangrui/youtube-to-ebook" },
        { label: "Sichen Tao GitHub", href: "https://github.com/SichenTao" },
      ],
    },
  ],
};
