window.YOUTUBE_TO_EBOOK_LIBRARY = {
  "generatedAt": "2026-05-07T00:48:47.471474+00:00",
  "sourceRepo": "https://github.com/zarazhangrui/youtube-to-ebook",
  "upstream": {
    "name": "zarazhangrui/youtube-to-ebook",
    "repo": "https://github.com/zarazhangrui/youtube-to-ebook",
    "commit": "7f67fd6b55a272012df3767cf6d8c54bd2d7a9f3",
    "commitLabel": "7f67fd6",
    "licenseNote": {
      "en": "The upstream README declares MIT usage, but the inspected snapshot does not include a standalone LICENSE file.",
      "zh": "上游 README 标注为 MIT 使用方式，但当前快照没有独立 LICENSE 文件。",
      "ja": "上流 README では MIT とされていますが、確認したスナップショットには独立した LICENSE ファイルはありません。"
    }
  },
  "lastRun": {
    "id": "20260507_094847",
    "generatedAt": "2026-05-07T00:48:47.471474+00:00",
    "mode": "real-video-transcript-import",
    "note": "Fetched a real YouTube video and transcript, created an EPUB via upstream send_email.create_epub, and exported a curated homepage article record.",
    "upstreamPath": "/tmp/youtube-to-ebook-upstream",
    "upstreamCommit": "7f67fd6b55a272012df3767cf6d8c54bd2d7a9f3",
    "upstreamCommitLabel": "7f67fd6",
    "video": {
      "id": "x9BNBcP_C7Q",
      "title": "Why We Switched From Claude Code to Codex",
      "url": "https://www.youtube.com/watch?v=x9BNBcP_C7Q",
      "channel": "Every",
      "transcriptWords": 11259
    },
    "epub": "/youtube-to-ebook/assets/ebooks/20260507_094847_why-we-switched-from-claude-code-to-codex.epub"
  },
  "sources": {
    "channels": [
      "Every"
    ],
    "pipeline": [
      {
        "name": "yt-dlp",
        "url": "https://github.com/yt-dlp/yt-dlp"
      },
      {
        "name": "youtube-transcript-api",
        "url": "https://github.com/jdepoix/youtube-transcript-api"
      },
      {
        "name": "youtube-to-ebook EPUB writer",
        "url": "https://github.com/zarazhangrui/youtube-to-ebook"
      }
    ],
    "outputs": [
      "Homepage article",
      "EPUB"
    ],
    "modules": [
      "run_youtube_to_ebook_import.py",
      "send_email.py#create_epub"
    ]
  },
  "articles": [
    {
      "id": "real-why-we-switched-from-claude-code-to-codex",
      "type": "ebook",
      "source": "Every",
      "date": "2026-05-06",
      "minutes": 8,
      "video": {
        "id": "x9BNBcP_C7Q",
        "title": "Why We Switched From Claude Code to Codex",
        "url": "https://www.youtube.com/watch?v=x9BNBcP_C7Q",
        "channel": "Every",
        "transcriptWords": 11259
      },
      "asset": {
        "epub": "/youtube-to-ebook/assets/ebooks/20260507_094847_why-we-switched-from-claude-code-to-codex.epub"
      },
      "title": {
        "en": "Why a production team switched from Claude Code to Codex",
        "zh": "为什么一个生产团队从 Claude Code 转向 Codex",
        "ja": "なぜある開発チームは Claude Code から Codex へ移ったのか"
      },
      "dek": {
        "en": "A real YouTube-to-Ebook import from Every's episode on switching coding agents. The article turns the transcript into a structured long read for review on the homepage.",
        "zh": "这是一篇由 Every 关于切换编码智能体的视频真实导入生成的 YouTube-to-Ebook 文章。它把字幕整理成适合在主页中复读的结构化长文。",
        "ja": "Every の coding agent 移行に関する動画から実際に取り込んだ YouTube-to-Ebook 記事です。字幕を、homepage で読み返せる構造化された長文に変換しています。"
      },
      "tags": [
        {
          "en": "Coding agent",
          "zh": "编码智能体",
          "ja": "coding agent"
        },
        {
          "en": "Codex",
          "zh": "Codex",
          "ja": "Codex"
        },
        {
          "en": "Claude Code",
          "zh": "Claude Code",
          "ja": "Claude Code"
        },
        {
          "en": "Real transcript import",
          "zh": "真实字幕导入",
          "ja": "実字幕インポート"
        }
      ],
      "sections": [
        {
          "kind": "paragraph",
          "label": {
            "en": "The switch is really about workflow fit",
            "zh": "这次切换真正讨论的是工作流适配",
            "ja": "この移行の本質は workflow fit にある"
          },
          "text": {
            "en": "The episode is not just a simple preference ranking between two tools. The transcript shows a team comparing coding agents in the place where the difference matters most: a real development workflow. The important question is not which model sounds more impressive in a demo, but which agent can stay useful while reading a repository, changing files, responding to feedback, and helping a human keep momentum.",
            "zh": "这期内容不是简单地给两个工具排座次。真实字幕显示，团队比较编码智能体的场景是最能看出差异的真实开发工作流。关键问题不是哪个模型在演示中听起来更厉害，而是谁能在阅读仓库、修改文件、响应反馈、帮助人类保持推进节奏时持续有用。",
            "ja": "この episode は、二つの tool を単純に順位付けする話ではありません。実際の transcript が示しているのは、差が最も出る場所、つまり本物の開発 workflow で coding agent を比較しているということです。重要なのは demo でどちらが強そうに見えるかではなく、repository を読み、file を変更し、feedback に応答し、人間の作業 momentum を保つ中で、どちらが使い続けられるかです。"
          }
        },
        {
          "kind": "paragraph",
          "label": {
            "en": "The lesson is that agents age quickly",
            "zh": "一个重要教训是，智能体能力变化很快",
            "ja": "重要な教訓は、agent の評価がすぐ古くなること"
          },
          "text": {
            "en": "One striking part of the conversation is how much the team's opinion changed over a short period. A coding agent that felt unreliable a few months earlier can become practical after improvements in execution, context handling, and tool use. That means tool choice should be treated as a recurring evaluation problem rather than a one-time identity choice.",
            "zh": "对话中很值得注意的一点，是团队对工具的判断在很短时间里发生了明显变化。几个月前还显得不可靠的编码智能体，在执行能力、上下文处理和工具调用改进后，可能突然变得实用。因此，工具选择不应被当成一次性的身份选择，而应被当成需要定期复查的评估问题。",
            "ja": "会話の中で印象的なのは、短期間で team の評価が大きく変わっている点です。数か月前には信頼しにくかった coding agent でも、実行能力、context handling、tool use が改善されると、急に実用的になります。つまり tool choice は一度きりの identity choice ではなく、定期的に見直す evaluation problem として扱うべきです。"
          }
        },
        {
          "kind": "steps",
          "label": {
            "en": "What to evaluate before switching",
            "zh": "切换工具前应评估什么",
            "ja": "切り替え前に評価すべきこと"
          },
          "steps": [
            {
              "title": {
                "en": "Repository awareness",
                "zh": "仓库理解能力",
                "ja": "repository awareness"
              },
              "body": {
                "en": "The agent has to understand existing files, conventions, and constraints. A tool that writes plausible code but misses local patterns still creates review cost.",
                "zh": "智能体必须理解已有文件、约定和约束。一个能写出看似合理代码却忽略本地模式的工具，仍然会制造审查成本。",
                "ja": "agent は既存 file、convention、constraint を理解する必要があります。もっともらしい code を書けても local pattern を外す tool は、review cost を増やします。"
              }
            },
            {
              "title": {
                "en": "Edit discipline",
                "zh": "编辑纪律",
                "ja": "edit discipline"
              },
              "body": {
                "en": "The useful agent changes the right files, keeps the diff small enough to inspect, and does not destabilize unrelated parts of the project.",
                "zh": "真正有用的智能体会改正确的文件，让 diff 保持可审查，并且不会扰动项目中无关的部分。",
                "ja": "有用な agent は正しい file を変更し、diff を確認しやすい大きさに保ち、無関係な部分を不安定にしません。"
              }
            },
            {
              "title": {
                "en": "Recovery behavior",
                "zh": "错误恢复能力",
                "ja": "recovery behavior"
              },
              "body": {
                "en": "The decisive test is what happens after a command fails or a reviewer pushes back. A good agent can diagnose, revise, and continue without forcing the human to restart the task.",
                "zh": "决定性测试是命令失败或审查者提出异议之后会发生什么。好的智能体能诊断、修正并继续推进，而不是让人类从头收拾残局。",
                "ja": "決定的な test は、command が失敗した後、あるいは reviewer が指摘した後に何が起きるかです。良い agent は診断し、修正し、人間に task の再開始を強いずに続けられます。"
              }
            }
          ]
        },
        {
          "kind": "paragraph",
          "label": {
            "en": "Why this belongs in the homepage reader",
            "zh": "为什么它适合进入主页阅读器",
            "ja": "なぜ homepage reader に入れるべきか"
          },
          "text": {
            "en": "As a video, the episode is a timely conversation. As an ebook article, it becomes a reusable study object: searchable, linkable, and easier to revisit on a phone. This is exactly the role of the YouTube-to-Ebook workspace in the homepage: not to describe the automation, but to absorb its real output into a clean article library.",
            "zh": "作为视频，它是一场及时的对话；作为 ebook 文章，它变成了可复用的学习对象：可以搜索、可以链接，也更适合在手机上反复阅读。这正是主页中 YouTube-to-Ebook 工作区的意义：不是介绍自动化流程本身，而是把它的真实产出吸收进干净的文章库。",
            "ja": "動画としては時宜を得た conversation ですが、ebook 記事としては再利用できる study object になります。検索でき、link でき、mobile で読み返しやすいからです。これこそ homepage の YouTube-to-Ebook workspace の役割です。automation 自体を説明するのではなく、その実出力を clean article library に取り込むことです。"
          }
        }
      ],
      "links": [
        {
          "label": "Original YouTube video",
          "href": "https://www.youtube.com/watch?v=x9BNBcP_C7Q"
        },
        {
          "label": "Generated EPUB",
          "href": "/youtube-to-ebook/assets/ebooks/20260507_094847_why-we-switched-from-claude-code-to-codex.epub"
        },
        {
          "label": "Upstream project",
          "href": "https://github.com/zarazhangrui/youtube-to-ebook"
        }
      ]
    }
  ]
};
