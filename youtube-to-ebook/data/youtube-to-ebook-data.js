window.YOUTUBE_TO_EBOOK_LIBRARY = {
  "generatedAt": "2026-05-07T00:48:47.471474+00:00",
  "sourceRepo": "https://github.com/zarazhangrui/youtube-to-ebook",
  "upstream": {
    "name": "zarazhangrui/youtube-to-ebook",
    "repo": "https://github.com/zarazhangrui/youtube-to-ebook",
    "commit": "7f67fd6b55a272012df3767cf6d8c54bd2d7a9f3",
    "commitLabel": "7f67fd6"
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
      "transcriptWords": 11259,
      "duration": 3503
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
        "transcriptWords": 11259,
        "duration": 3503
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
        }
      ],
      "links": [
        {
          "label": "Original YouTube video",
          "href": "https://www.youtube.com/watch?v=x9BNBcP_C7Q"
        }
      ],
      "transcript": {
        "language": "en",
        "segments": [
          {
            "start": 0.08,
            "duration": 3.68,
            "text": {
              "en": "Codex is one of those things where three"
            }
          },
          {
            "start": 2.399,
            "duration": 4.081,
            "text": {
              "en": "months ago, six months ago, it was"
            }
          },
          {
            "start": 3.76,
            "duration": 4.4,
            "text": {
              "en": "trash. If anyone from OpenAI is on the"
            }
          },
          {
            "start": 6.48,
            "duration": 4,
            "text": {
              "en": "call and listening to that, I stand by"
            }
          },
          {
            "start": 8.16,
            "duration": 4.479,
            "text": {
              "en": "that 100%. If you have a great"
            }
          },
          {
            "start": 10.48,
            "duration": 4.159,
            "text": {
              "en": "generalpurpose coding agent on your"
            }
          },
          {
            "start": 12.639,
            "duration": 3.2,
            "text": {
              "en": "computer, it's actually really great for"
            }
          },
          {
            "start": 14.639,
            "duration": 2.72,
            "text": {
              "en": "any kind of knowledge work. If it can"
            }
          },
          {
            "start": 15.839,
            "duration": 2.801,
            "text": {
              "en": "write software on its own, it can do any"
            }
          },
          {
            "start": 17.359,
            "duration": 3.361,
            "text": {
              "en": "kind of knowledge work on its own."
            }
          },
          {
            "start": 18.64,
            "duration": 4.399,
            "text": {
              "en": "When I sign on during the day, Codeex is"
            }
          },
          {
            "start": 20.72,
            "duration": 4.825,
            "text": {
              "en": "the first thing I open. It is pulling in"
            }
          },
          {
            "start": 23.039,
            "duration": 4.881,
            "text": {
              "en": "whatever I need from Gmail, Slack,"
            }
          },
          {
            "start": 25.545,
            "duration": 4.775,
            "text": {
              "en": "[music] Notion, Stripe, all of our data"
            }
          },
          {
            "start": 27.92,
            "duration": 5.28,
            "text": {
              "en": "sources. It's where I spend like 80% of"
            }
          },
          {
            "start": 30.32,
            "duration": 4.56,
            "text": {
              "en": "my time working overwhelmingly because"
            }
          },
          {
            "start": 33.2,
            "duration": 4.16,
            "text": {
              "en": "the app itself is just so good."
            }
          },
          {
            "start": 34.88,
            "duration": 3.6,
            "text": {
              "en": "There's a new operating system for how"
            }
          },
          {
            "start": 37.36,
            "duration": 2.719,
            "text": {
              "en": "and where you're going to get your work"
            }
          },
          {
            "start": 38.48,
            "duration": 5.16,
            "text": {
              "en": "done and it's this kind of agent"
            }
          },
          {
            "start": 40.079,
            "duration": 3.561,
            "text": {
              "en": "management interface."
            }
          },
          {
            "start": 47.815,
            "duration": 2.02,
            "text": {
              "en": "[music]"
            }
          },
          {
            "start": 52.4,
            "duration": 2.02,
            "text": {
              "en": "[music]"
            }
          },
          {
            "start": 56,
            "duration": 7.28,
            "text": {
              "en": "Hello everybody. Welcome to Codeex Camp."
            }
          },
          {
            "start": 61.039,
            "duration": 4.561,
            "text": {
              "en": "Codeex for knowledge work. Psyched to"
            }
          },
          {
            "start": 63.28,
            "duration": 6.72,
            "text": {
              "en": "have you. Psyched to have you on this"
            }
          },
          {
            "start": 65.6,
            "duration": 7.519,
            "text": {
              "en": "auspicious GPT 5.5 day after release"
            }
          },
          {
            "start": 70,
            "duration": 5.68,
            "text": {
              "en": "day. Hope you're doing well. Um I'm here"
            }
          },
          {
            "start": 73.119,
            "duration": 3.601,
            "text": {
              "en": "with our head of growth, Austin. Austin,"
            }
          },
          {
            "start": 75.68,
            "duration": 2.16,
            "text": {
              "en": "say hello."
            }
          },
          {
            "start": 76.72,
            "duration": 2.56,
            "text": {
              "en": "Hello."
            }
          },
          {
            "start": 77.84,
            "duration": 4.16,
            "text": {
              "en": "We're psyched to have you. We are"
            }
          },
          {
            "start": 79.28,
            "duration": 4.8,
            "text": {
              "en": "psyched to do this. Um Codex is one of"
            }
          },
          {
            "start": 82,
            "duration": 3.6,
            "text": {
              "en": "those things where,"
            }
          },
          {
            "start": 84.08,
            "duration": 4.399,
            "text": {
              "en": "you know, three months ago, six months"
            }
          },
          {
            "start": 85.6,
            "duration": 5.12,
            "text": {
              "en": "ago, it was trash. Um, and if anyone"
            }
          },
          {
            "start": 88.479,
            "duration": 6.161,
            "text": {
              "en": "from OpenAI is on the call and listening"
            }
          },
          {
            "start": 90.72,
            "duration": 6.8,
            "text": {
              "en": "to that, I stand by that 100%. Um, and"
            }
          },
          {
            "start": 94.64,
            "duration": 5.28,
            "text": {
              "en": "it was really built for"
            }
          },
          {
            "start": 97.52,
            "duration": 5.919,
            "text": {
              "en": "um, senior engineers uh, doing pair"
            }
          },
          {
            "start": 99.92,
            "duration": 4.72,
            "text": {
              "en": "programming. So, it was um, it would"
            }
          },
          {
            "start": 103.439,
            "duration": 3.121,
            "text": {
              "en": "argue with you, it would make you feel"
            }
          },
          {
            "start": 104.64,
            "duration": 3.6,
            "text": {
              "en": "stupid. It was just it was like a little"
            }
          },
          {
            "start": 106.56,
            "duration": 3.919,
            "text": {
              "en": "autistic like it it didn't have any"
            }
          },
          {
            "start": 108.24,
            "duration": 5.44,
            "text": {
              "en": "emotional intelligence."
            }
          },
          {
            "start": 110.479,
            "duration": 4.881,
            "text": {
              "en": "And I think OpenAI had this interesting"
            }
          },
          {
            "start": 113.68,
            "duration": 4.719,
            "text": {
              "en": "strategy or this interesting theory"
            }
          },
          {
            "start": 115.36,
            "duration": 5.039,
            "text": {
              "en": "starting with GBT5 that your vibe coding"
            }
          },
          {
            "start": 118.399,
            "duration": 3.441,
            "text": {
              "en": "was going to happen in chatbt and that"
            }
          },
          {
            "start": 120.399,
            "duration": 3.36,
            "text": {
              "en": "was where all that stuff was going to"
            }
          },
          {
            "start": 121.84,
            "duration": 3.76,
            "text": {
              "en": "live and then senior engineers are going"
            }
          },
          {
            "start": 123.759,
            "duration": 2.881,
            "text": {
              "en": "to use codecs to like do all their"
            }
          },
          {
            "start": 125.6,
            "duration": 2.879,
            "text": {
              "en": "programming work but we're going to"
            }
          },
          {
            "start": 126.64,
            "duration": 3.44,
            "text": {
              "en": "hobble the model so it doesn't do"
            }
          },
          {
            "start": 128.479,
            "duration": 5.201,
            "text": {
              "en": "anything bad. It's in a sandbox all that"
            }
          },
          {
            "start": 130.08,
            "duration": 5.92,
            "text": {
              "en": "kind of stuff. And I think basically"
            }
          },
          {
            "start": 133.68,
            "duration": 4.16,
            "text": {
              "en": "what happened is Anthropic figured out"
            }
          },
          {
            "start": 136,
            "duration": 4.16,
            "text": {
              "en": "that"
            }
          },
          {
            "start": 137.84,
            "duration": 4.16,
            "text": {
              "en": "having a model that's pretty usable and"
            }
          },
          {
            "start": 140.16,
            "duration": 3.6,
            "text": {
              "en": "fast and smart and also emotionally"
            }
          },
          {
            "start": 142,
            "duration": 4.959,
            "text": {
              "en": "intelligence intelligent on your"
            }
          },
          {
            "start": 143.76,
            "duration": 5.52,
            "text": {
              "en": "computer that can access your computer"
            }
          },
          {
            "start": 146.959,
            "duration": 3.92,
            "text": {
              "en": "um is a really really great experience"
            }
          },
          {
            "start": 149.28,
            "duration": 4.48,
            "text": {
              "en": "for programmers. And it means you could"
            }
          },
          {
            "start": 150.879,
            "duration": 4.64,
            "text": {
              "en": "throw away a lot of the old uh stuff"
            }
          },
          {
            "start": 153.76,
            "duration": 3.52,
            "text": {
              "en": "that you used to have in a in a"
            }
          },
          {
            "start": 155.519,
            "duration": 3.041,
            "text": {
              "en": "programming environment where you it was"
            }
          },
          {
            "start": 157.28,
            "duration": 2.56,
            "text": {
              "en": "built for typing code. You could just"
            }
          },
          {
            "start": 158.56,
            "duration": 3.28,
            "text": {
              "en": "type commands into your terminal and"
            }
          },
          {
            "start": 159.84,
            "duration": 4.08,
            "text": {
              "en": "then it would start working. And then I"
            }
          },
          {
            "start": 161.84,
            "duration": 5.44,
            "text": {
              "en": "think what Anthrobic figured out is if"
            }
          },
          {
            "start": 163.92,
            "duration": 4.8,
            "text": {
              "en": "you have a great general purpose, if you"
            }
          },
          {
            "start": 167.28,
            "duration": 3.36,
            "text": {
              "en": "have a great coding agent on your"
            }
          },
          {
            "start": 168.72,
            "duration": 3.2,
            "text": {
              "en": "computer, it's actually really great for"
            }
          },
          {
            "start": 170.64,
            "duration": 2.8,
            "text": {
              "en": "any kind of knowledge work. If it can"
            }
          },
          {
            "start": 171.92,
            "duration": 3.2,
            "text": {
              "en": "write software on its own, it can do any"
            }
          },
          {
            "start": 173.44,
            "duration": 3.439,
            "text": {
              "en": "kind of knowledge work on its own. And"
            }
          },
          {
            "start": 175.12,
            "duration": 4.8,
            "text": {
              "en": "we started to move from this world where"
            }
          },
          {
            "start": 176.879,
            "duration": 4.321,
            "text": {
              "en": "programmers had been delegating um had"
            }
          },
          {
            "start": 179.92,
            "duration": 2.56,
            "text": {
              "en": "been delegating their tasks starting to"
            }
          },
          {
            "start": 181.2,
            "duration": 4.48,
            "text": {
              "en": "delegate their tasks inside of cloud"
            }
          },
          {
            "start": 182.48,
            "duration": 4.88,
            "text": {
              "en": "code to now any kind of knowledge work"
            }
          },
          {
            "start": 185.68,
            "duration": 2.88,
            "text": {
              "en": "is being delegated inside of cloud code"
            }
          },
          {
            "start": 187.36,
            "duration": 3.44,
            "text": {
              "en": "and cloud co-work and all that kind of"
            }
          },
          {
            "start": 188.56,
            "duration": 3.599,
            "text": {
              "en": "stuff. And I think openai they had this"
            }
          },
          {
            "start": 190.8,
            "duration": 2.48,
            "text": {
              "en": "original split. It's like oh you're"
            }
          },
          {
            "start": 192.159,
            "duration": 4.08,
            "text": {
              "en": "going to do all your vibe coding in"
            }
          },
          {
            "start": 193.28,
            "duration": 4.48,
            "text": {
              "en": "chatbt and I think they saw what was"
            }
          },
          {
            "start": 196.239,
            "duration": 3.92,
            "text": {
              "en": "starting to happen with cloud code and"
            }
          },
          {
            "start": 197.76,
            "duration": 4.479,
            "text": {
              "en": "over the last maybe three months or so"
            }
          },
          {
            "start": 200.159,
            "duration": 3.601,
            "text": {
              "en": "they have done this hard pivot on co"
            }
          },
          {
            "start": 202.239,
            "duration": 4.401,
            "text": {
              "en": "codeex where it has gone from a senior"
            }
          },
          {
            "start": 203.76,
            "duration": 7.6,
            "text": {
              "en": "engineer only tool that is really for"
            }
          },
          {
            "start": 206.64,
            "duration": 7.04,
            "text": {
              "en": "pair programming um to I think like it's"
            }
          },
          {
            "start": 211.36,
            "duration": 6.959,
            "text": {
              "en": "it is my daily driver for this kind of"
            }
          },
          {
            "start": 213.68,
            "duration": 7.279,
            "text": {
              "en": "work um I uh I I use codeex for"
            }
          },
          {
            "start": 218.319,
            "duration": 7.121,
            "text": {
              "en": "everything from deep engineering stuff"
            }
          },
          {
            "start": 220.959,
            "duration": 5.761,
            "text": {
              "en": "to writing to recruiting. I do a lot"
            }
          },
          {
            "start": 225.44,
            "duration": 2.56,
            "text": {
              "en": "actually do a fair amount of recruiting."
            }
          },
          {
            "start": 226.72,
            "duration": 3.842,
            "text": {
              "en": "It's really good for that and I'll give"
            }
          },
          {
            "start": 228,
            "duration": 5.36,
            "text": {
              "en": "you some use cases um later. But they"
            }
          },
          {
            "start": 230.562,
            "duration": 5.518,
            "text": {
              "en": "[snorts] sort of figured out that"
            }
          },
          {
            "start": 233.36,
            "duration": 4.239,
            "text": {
              "en": "um having this general purpose agent on"
            }
          },
          {
            "start": 236.08,
            "duration": 2.879,
            "text": {
              "en": "your computer with the ability to write"
            }
          },
          {
            "start": 237.599,
            "duration": 4.081,
            "text": {
              "en": "code, the ability to access your file"
            }
          },
          {
            "start": 238.959,
            "duration": 4.961,
            "text": {
              "en": "system, the ability to have a browser um"
            }
          },
          {
            "start": 241.68,
            "duration": 4,
            "text": {
              "en": "and wrapping it in a desktop app is like"
            }
          },
          {
            "start": 243.92,
            "duration": 4.319,
            "text": {
              "en": "the ideal"
            }
          },
          {
            "start": 245.68,
            "duration": 4.24,
            "text": {
              "en": "uh ideal next step for knowledge work."
            }
          },
          {
            "start": 248.239,
            "duration": 5.2,
            "text": {
              "en": "And I think that they built the best"
            }
          },
          {
            "start": 249.92,
            "duration": 6.64,
            "text": {
              "en": "current version of that. Um, and it what"
            }
          },
          {
            "start": 253.439,
            "duration": 7.121,
            "text": {
              "en": "it is starting to snap into into focus"
            }
          },
          {
            "start": 256.56,
            "duration": 6.24,
            "text": {
              "en": "now is that there's a new operating"
            }
          },
          {
            "start": 260.56,
            "duration": 3.28,
            "text": {
              "en": "system for how and where surface for how"
            }
          },
          {
            "start": 262.8,
            "duration": 2.72,
            "text": {
              "en": "and where you're going to get your work"
            }
          },
          {
            "start": 263.84,
            "duration": 4.24,
            "text": {
              "en": "done. And it's this kind of agent"
            }
          },
          {
            "start": 265.52,
            "duration": 4.64,
            "text": {
              "en": "management interface. And that's whether"
            }
          },
          {
            "start": 268.08,
            "duration": 4.32,
            "text": {
              "en": "or not you're using cloud code or cloud"
            }
          },
          {
            "start": 270.16,
            "duration": 4.8,
            "text": {
              "en": "co-work in the desktop app or codeex in"
            }
          },
          {
            "start": 272.4,
            "duration": 3.92,
            "text": {
              "en": "the desktop app. It's becoming this race"
            }
          },
          {
            "start": 274.96,
            "duration": 3.04,
            "text": {
              "en": "between the model companies where every"
            }
          },
          {
            "start": 276.32,
            "duration": 3.28,
            "text": {
              "en": "each model company has their own surface"
            }
          },
          {
            "start": 278,
            "duration": 3.68,
            "text": {
              "en": "like this for agent management, a"
            }
          },
          {
            "start": 279.6,
            "duration": 4.08,
            "text": {
              "en": "desktop app for agent management that's"
            }
          },
          {
            "start": 281.68,
            "duration": 4.64,
            "text": {
              "en": "at its core a programming agent that's"
            }
          },
          {
            "start": 283.68,
            "duration": 5.12,
            "text": {
              "en": "used for knowledge work. Um, Anthropic"
            }
          },
          {
            "start": 286.32,
            "duration": 6.159,
            "text": {
              "en": "has cloud code and cloud co-work."
            }
          },
          {
            "start": 288.8,
            "duration": 7.28,
            "text": {
              "en": "OpenAI has codeex. XAI recently um"
            }
          },
          {
            "start": 292.479,
            "duration": 6.801,
            "text": {
              "en": "essentially bought cursor um"
            }
          },
          {
            "start": 296.08,
            "duration": 4.72,
            "text": {
              "en": "and uh and Google is the only one that I"
            }
          },
          {
            "start": 299.28,
            "duration": 3.12,
            "text": {
              "en": "mean they have anti-gravity but I don't"
            }
          },
          {
            "start": 300.8,
            "duration": 4,
            "text": {
              "en": "think no one is seriously using it for"
            }
          },
          {
            "start": 302.4,
            "duration": 4.88,
            "text": {
              "en": "that yet but I I imagine Google will do"
            }
          },
          {
            "start": 304.8,
            "duration": 5.6,
            "text": {
              "en": "this too and that's the race that is the"
            }
          },
          {
            "start": 307.28,
            "duration": 6.24,
            "text": {
              "en": "race that's happening and so I think for"
            }
          },
          {
            "start": 310.4,
            "duration": 5.76,
            "text": {
              "en": "us who gets who get all the benefits of"
            }
          },
          {
            "start": 313.52,
            "duration": 5.76,
            "text": {
              "en": "uh being able to use these tools"
            }
          },
          {
            "start": 316.16,
            "duration": 4.96,
            "text": {
              "en": "uh it's really important to uh be be"
            }
          },
          {
            "start": 319.28,
            "duration": 4.08,
            "text": {
              "en": "bouncing around between these. So like"
            }
          },
          {
            "start": 321.12,
            "duration": 4,
            "text": {
              "en": "using for example using codecs so that"
            }
          },
          {
            "start": 323.36,
            "duration": 4.32,
            "text": {
              "en": "you can feel what it's like to work in"
            }
          },
          {
            "start": 325.12,
            "duration": 4.72,
            "text": {
              "en": "an agent first world because once you"
            }
          },
          {
            "start": 327.68,
            "duration": 3.92,
            "text": {
              "en": "add once you add an agent that is like"
            }
          },
          {
            "start": 329.84,
            "duration": 3.199,
            "text": {
              "en": "the your primary way of accessing and"
            }
          },
          {
            "start": 331.6,
            "duration": 4.08,
            "text": {
              "en": "using software and the internet and all"
            }
          },
          {
            "start": 333.039,
            "duration": 4,
            "text": {
              "en": "that kind of stuff, it opens up all this"
            }
          },
          {
            "start": 335.68,
            "duration": 2.72,
            "text": {
              "en": "interesting stuff that wasn't possible"
            }
          },
          {
            "start": 337.039,
            "duration": 3.041,
            "text": {
              "en": "before because you can send your agent"
            }
          },
          {
            "start": 338.4,
            "duration": 4.96,
            "text": {
              "en": "out to go talk to other pieces of"
            }
          },
          {
            "start": 340.08,
            "duration": 4.64,
            "text": {
              "en": "software and come back and um you know"
            }
          },
          {
            "start": 343.36,
            "duration": 2.48,
            "text": {
              "en": "we can get into into more of the details"
            }
          },
          {
            "start": 344.72,
            "duration": 3.52,
            "text": {
              "en": "there but I want to get into like the"
            }
          },
          {
            "start": 345.84,
            "duration": 3.84,
            "text": {
              "en": "more of the concrete use cases but"
            }
          },
          {
            "start": 348.24,
            "duration": 3.12,
            "text": {
              "en": "that's the world that we're starting to"
            }
          },
          {
            "start": 349.68,
            "duration": 5.359,
            "text": {
              "en": "live in. You're doing work on your"
            }
          },
          {
            "start": 351.36,
            "duration": 7.679,
            "text": {
              "en": "computer through codecs or co-work."
            }
          },
          {
            "start": 355.039,
            "duration": 5.361,
            "text": {
              "en": "And um and your agent is your interface"
            }
          },
          {
            "start": 359.039,
            "duration": 3.121,
            "text": {
              "en": "to a lot of the work that you're doing"
            }
          },
          {
            "start": 360.4,
            "duration": 3.359,
            "text": {
              "en": "and a lot of the a lot of the software"
            }
          },
          {
            "start": 362.16,
            "duration": 4.479,
            "text": {
              "en": "that you use and a lot of the stuff that"
            }
          },
          {
            "start": 363.759,
            "duration": 4.641,
            "text": {
              "en": "you do every day. And uh that's actually"
            }
          },
          {
            "start": 366.639,
            "duration": 4.161,
            "text": {
              "en": "really fun. It's really cool. There's a"
            }
          },
          {
            "start": 368.4,
            "duration": 5.28,
            "text": {
              "en": "lot of good stuff here. And so I wanted"
            }
          },
          {
            "start": 370.8,
            "duration": 4.64,
            "text": {
              "en": "to uh I wanted to bring Austin in to to"
            }
          },
          {
            "start": 373.68,
            "duration": 4.88,
            "text": {
              "en": "help do this because Austin is our head"
            }
          },
          {
            "start": 375.44,
            "duration": 5.68,
            "text": {
              "en": "of growth and I think he had his real"
            }
          },
          {
            "start": 378.56,
            "duration": 3.919,
            "text": {
              "en": "agent pill moment. You tell me Austin,"
            }
          },
          {
            "start": 381.12,
            "duration": 4,
            "text": {
              "en": "but probably like three or four months"
            }
          },
          {
            "start": 382.479,
            "duration": 5.641,
            "text": {
              "en": "ago and the agent pill moment was really"
            }
          },
          {
            "start": 385.12,
            "duration": 3,
            "text": {
              "en": "cla"
            }
          },
          {
            "start": 390.639,
            "duration": 2.881,
            "text": {
              "en": "on a on a Monday morning being like, \"Oh"
            }
          },
          {
            "start": 392.24,
            "duration": 2.88,
            "text": {
              "en": "yeah, I just was on my computer all"
            }
          },
          {
            "start": 393.52,
            "duration": 3.6,
            "text": {
              "en": "weekend. Like I I was like 12 hours a"
            }
          },
          {
            "start": 395.12,
            "duration": 4.72,
            "text": {
              "en": "day. didn't go out or anything because I"
            }
          },
          {
            "start": 397.12,
            "duration": 5.04,
            "text": {
              "en": "was using cloud code and um you started"
            }
          },
          {
            "start": 399.84,
            "duration": 3.84,
            "text": {
              "en": "to use it for all those all the kind of"
            }
          },
          {
            "start": 402.16,
            "duration": 5.68,
            "text": {
              "en": "knowledge work tasks that a that a"
            }
          },
          {
            "start": 403.68,
            "duration": 6.4,
            "text": {
              "en": "growth marketer would and over the last"
            }
          },
          {
            "start": 407.84,
            "duration": 3.359,
            "text": {
              "en": "couple weeks as we've been using 55 and"
            }
          },
          {
            "start": 410.08,
            "duration": 3.28,
            "text": {
              "en": "I've been telling you for a little bit"
            }
          },
          {
            "start": 411.199,
            "duration": 3.601,
            "text": {
              "en": "you should try codeex it seems like"
            }
          },
          {
            "start": 413.36,
            "duration": 4.08,
            "text": {
              "en": "you've you've actually just shifted"
            }
          },
          {
            "start": 414.8,
            "duration": 5.519,
            "text": {
              "en": "everything over to codeex and 55 and so"
            }
          },
          {
            "start": 417.44,
            "duration": 4.4,
            "text": {
              "en": "I think you're a great person to talk"
            }
          },
          {
            "start": 420.319,
            "duration": 5.921,
            "text": {
              "en": "about you know sort of what you're"
            }
          },
          {
            "start": 421.84,
            "duration": 7.68,
            "text": {
              "en": "seeing and how and how that is uh how"
            }
          },
          {
            "start": 426.24,
            "duration": 5.04,
            "text": {
              "en": "that is um how how this has changed how"
            }
          },
          {
            "start": 429.52,
            "duration": 4.48,
            "text": {
              "en": "these agent management interfaces have"
            }
          },
          {
            "start": 431.28,
            "duration": 4.24,
            "text": {
              "en": "changed your workflow and then why you"
            }
          },
          {
            "start": 434,
            "duration": 4.479,
            "text": {
              "en": "like codecs and then I would love to get"
            }
          },
          {
            "start": 435.52,
            "duration": 4.56,
            "text": {
              "en": "into some demos of your actual codec"
            }
          },
          {
            "start": 438.479,
            "duration": 4.16,
            "text": {
              "en": "workflow so that we can sort of see"
            }
          },
          {
            "start": 440.08,
            "duration": 5.679,
            "text": {
              "en": "things uh from your perspective."
            }
          },
          {
            "start": 442.639,
            "duration": 6.96,
            "text": {
              "en": "Yeah, that sounds great. So I um yes, my"
            }
          },
          {
            "start": 445.759,
            "duration": 7.44,
            "text": {
              "en": "like agent pill moment was spending a"
            }
          },
          {
            "start": 449.599,
            "duration": 6.72,
            "text": {
              "en": "week going deep into cloud code in the"
            }
          },
          {
            "start": 453.199,
            "duration": 5.921,
            "text": {
              "en": "CLI uh probably in like December into"
            }
          },
          {
            "start": 456.319,
            "duration": 5.361,
            "text": {
              "en": "January, hooking it up to everything I"
            }
          },
          {
            "start": 459.12,
            "duration": 5.199,
            "text": {
              "en": "do for work and for my personal life and"
            }
          },
          {
            "start": 461.68,
            "duration": 7.28,
            "text": {
              "en": "finding that I I use Warp as my like CLI"
            }
          },
          {
            "start": 464.319,
            "duration": 6.32,
            "text": {
              "en": "interface. um and finding that the"
            }
          },
          {
            "start": 468.96,
            "duration": 3.92,
            "text": {
              "en": "things it could automate, the things it"
            }
          },
          {
            "start": 470.639,
            "duration": 4.24,
            "text": {
              "en": "could handle for me, and then the way it"
            }
          },
          {
            "start": 472.88,
            "duration": 3.92,
            "text": {
              "en": "could work as a thought partner to make"
            }
          },
          {
            "start": 474.879,
            "duration": 3.841,
            "text": {
              "en": "my work better. It was like this is the"
            }
          },
          {
            "start": 476.8,
            "duration": 4.64,
            "text": {
              "en": "only way I want to do the kind of"
            }
          },
          {
            "start": 478.72,
            "duration": 6.4,
            "text": {
              "en": "knowledge work that requires um"
            }
          },
          {
            "start": 481.44,
            "duration": 6.08,
            "text": {
              "en": "strategic thinking and uh data analysis"
            }
          },
          {
            "start": 485.12,
            "duration": 4.24,
            "text": {
              "en": "and shipping marketing copy, like a"
            }
          },
          {
            "start": 487.52,
            "duration": 3.44,
            "text": {
              "en": "bunch of stuff that can get you spread"
            }
          },
          {
            "start": 489.36,
            "duration": 4.559,
            "text": {
              "en": "out across a bunch of apps and tools"
            }
          },
          {
            "start": 490.96,
            "duration": 4.799,
            "text": {
              "en": "during the day. And in maybe in"
            }
          },
          {
            "start": 493.919,
            "duration": 3.201,
            "text": {
              "en": "February, you you kept nudging me to be"
            }
          },
          {
            "start": 495.759,
            "duration": 3.12,
            "text": {
              "en": "like, \"You really should try Codeex."
            }
          },
          {
            "start": 497.12,
            "duration": 3.759,
            "text": {
              "en": "There were things you liked about it.\""
            }
          },
          {
            "start": 498.879,
            "duration": 3.281,
            "text": {
              "en": "And if someone says that at every if"
            }
          },
          {
            "start": 500.879,
            "duration": 4.561,
            "text": {
              "en": "anyone on the team says that, like, I'll"
            }
          },
          {
            "start": 502.16,
            "duration": 5.52,
            "text": {
              "en": "go try it. And I like to push myself and"
            }
          },
          {
            "start": 505.44,
            "duration": 3.84,
            "text": {
              "en": "play around with more engineeringy"
            }
          },
          {
            "start": 507.68,
            "duration": 4.16,
            "text": {
              "en": "tasks, especially to see what these"
            }
          },
          {
            "start": 509.28,
            "duration": 6.239,
            "text": {
              "en": "models are capable of. And so I tried to"
            }
          },
          {
            "start": 511.84,
            "duration": 4.639,
            "text": {
              "en": "build a personal vioded app in Codeex"
            }
          },
          {
            "start": 515.519,
            "duration": 3.281,
            "text": {
              "en": "because that was one of the things that"
            }
          },
          {
            "start": 516.479,
            "duration": 4.48,
            "text": {
              "en": "you said that it was really good for."
            }
          },
          {
            "start": 518.8,
            "duration": 4.64,
            "text": {
              "en": "And my immediate response was like I"
            }
          },
          {
            "start": 520.959,
            "duration": 4.88,
            "text": {
              "en": "think it is better at building the app,"
            }
          },
          {
            "start": 523.44,
            "duration": 4.959,
            "text": {
              "en": "but I can't tell because it's nothing"
            }
          },
          {
            "start": 525.839,
            "duration": 4.961,
            "text": {
              "en": "has ever made me feel more stupid than"
            }
          },
          {
            "start": 528.399,
            "duration": 4,
            "text": {
              "en": "codeex like two months ago. Like I"
            }
          },
          {
            "start": 530.8,
            "duration": 3.36,
            "text": {
              "en": "always I use compounded our compound"
            }
          },
          {
            "start": 532.399,
            "duration": 3.44,
            "text": {
              "en": "engineering plugin that Kieran Classen"
            }
          },
          {
            "start": 534.16,
            "duration": 3.119,
            "text": {
              "en": "made for basically everything including"
            }
          },
          {
            "start": 535.839,
            "duration": 4.481,
            "text": {
              "en": "knowledge work, but especially if I'm"
            }
          },
          {
            "start": 537.279,
            "duration": 6.161,
            "text": {
              "en": "trying to build an app or ship a PR to"
            }
          },
          {
            "start": 540.32,
            "duration": 4.959,
            "text": {
              "en": "the to the site. So I made a plan. in"
            }
          },
          {
            "start": 543.44,
            "duration": 4.399,
            "text": {
              "en": "the plan it comes up with like three"
            }
          },
          {
            "start": 545.279,
            "duration": 5.201,
            "text": {
              "en": "questions and uh for like which"
            }
          },
          {
            "start": 547.839,
            "duration": 3.841,
            "text": {
              "en": "direction we should go and uh I had no"
            }
          },
          {
            "start": 550.48,
            "duration": 2.56,
            "text": {
              "en": "idea what the hell it was talking about."
            }
          },
          {
            "start": 551.68,
            "duration": 2.32,
            "text": {
              "en": "It was like do you do one of any of"
            }
          },
          {
            "start": 553.04,
            "duration": 3.359,
            "text": {
              "en": "these three and every question? And I"
            }
          },
          {
            "start": 554,
            "duration": 4.56,
            "text": {
              "en": "was like, \"Please explain this to me um"
            }
          },
          {
            "start": 556.399,
            "duration": 3.761,
            "text": {
              "en": "in more detail.\" And his response was"
            }
          },
          {
            "start": 558.56,
            "duration": 4.56,
            "text": {
              "en": "basically like, \"Why?\" Like, \"Why don't"
            }
          },
          {
            "start": 560.16,
            "duration": 5.2,
            "text": {
              "en": "you just do what I'm recommending?\" And"
            }
          },
          {
            "start": 563.12,
            "duration": 4,
            "text": {
              "en": "I found a way to I I basically stayed in"
            }
          },
          {
            "start": 565.36,
            "duration": 4,
            "text": {
              "en": "codeex for all engineering stuff because"
            }
          },
          {
            "start": 567.12,
            "duration": 4.399,
            "text": {
              "en": "I I did like the results even if I"
            }
          },
          {
            "start": 569.36,
            "duration": 4,
            "text": {
              "en": "didn't love working in it. But I would"
            }
          },
          {
            "start": 571.519,
            "duration": 4.561,
            "text": {
              "en": "say 80% of what I was reaching for was"
            }
          },
          {
            "start": 573.36,
            "duration": 6.64,
            "text": {
              "en": "was cloud code in the CLI. And when we"
            }
          },
          {
            "start": 576.08,
            "duration": 6.4,
            "text": {
              "en": "got our hands on the new GPT model a"
            }
          },
          {
            "start": 580,
            "duration": 6.16,
            "text": {
              "en": "month ago, the the the the first thing I"
            }
          },
          {
            "start": 582.48,
            "duration": 6.56,
            "text": {
              "en": "felt was at the very least there's"
            }
          },
          {
            "start": 586.16,
            "duration": 4.56,
            "text": {
              "en": "parody between the latest Opus model and"
            }
          },
          {
            "start": 589.04,
            "duration": 4.08,
            "text": {
              "en": "the latest GPT model for the kind of"
            }
          },
          {
            "start": 590.72,
            "duration": 3.92,
            "text": {
              "en": "knowledge work I do. There's a few"
            }
          },
          {
            "start": 593.12,
            "duration": 3.839,
            "text": {
              "en": "things that Opus does better. There's a"
            }
          },
          {
            "start": 594.64,
            "duration": 4.16,
            "text": {
              "en": "few things that that Codeex does better."
            }
          },
          {
            "start": 596.959,
            "duration": 4.32,
            "text": {
              "en": "That feels a little more specific to me"
            }
          },
          {
            "start": 598.8,
            "duration": 5.599,
            "text": {
              "en": "even like I I outside of design, which I"
            }
          },
          {
            "start": 601.279,
            "duration": 4.161,
            "text": {
              "en": "still really trust Opus for. um it feels"
            }
          },
          {
            "start": 604.399,
            "duration": 2.401,
            "text": {
              "en": "a little more like, oh, there's some"
            }
          },
          {
            "start": 605.44,
            "duration": 3.839,
            "text": {
              "en": "stuff I like better than this. But the"
            }
          },
          {
            "start": 606.8,
            "duration": 5.76,
            "text": {
              "en": "real differentiator to me is that to me"
            }
          },
          {
            "start": 609.279,
            "duration": 5.761,
            "text": {
              "en": "there's no comparison for how fast and"
            }
          },
          {
            "start": 612.56,
            "duration": 5.279,
            "text": {
              "en": "powerful the codeex desktop app is as"
            }
          },
          {
            "start": 615.04,
            "duration": 4.96,
            "text": {
              "en": "just like an app compared to the claw"
            }
          },
          {
            "start": 617.839,
            "duration": 4.321,
            "text": {
              "en": "desktop app. Like I have never been able"
            }
          },
          {
            "start": 620,
            "duration": 3.12,
            "text": {
              "en": "to get uh co-work to work for me. And I"
            }
          },
          {
            "start": 622.16,
            "duration": 3.76,
            "text": {
              "en": "think it's because I've been kind of"
            }
          },
          {
            "start": 623.12,
            "duration": 5.52,
            "text": {
              "en": "ruined by the codeex app. It's so fast."
            }
          },
          {
            "start": 625.92,
            "duration": 5.76,
            "text": {
              "en": "The sub agents are so good. the way in"
            }
          },
          {
            "start": 628.64,
            "duration": 5.759,
            "text": {
              "en": "which it suggests and then um ships"
            }
          },
          {
            "start": 631.68,
            "duration": 4.8,
            "text": {
              "en": "automations for me is just like it I"
            }
          },
          {
            "start": 634.399,
            "duration": 5.041,
            "text": {
              "en": "can't imagine not using it. I wouldn't"
            }
          },
          {
            "start": 636.48,
            "duration": 4.88,
            "text": {
              "en": "be surprised if any week the cloud"
            }
          },
          {
            "start": 639.44,
            "duration": 4.24,
            "text": {
              "en": "desktop app is like just as good, right?"
            }
          },
          {
            "start": 641.36,
            "duration": 4.56,
            "text": {
              "en": "like um they could ship versions where"
            }
          },
          {
            "start": 643.68,
            "duration": 4.399,
            "text": {
              "en": "it's faster and better, but I I'm now at"
            }
          },
          {
            "start": 645.92,
            "duration": 5.039,
            "text": {
              "en": "the point where when I sign on during"
            }
          },
          {
            "start": 648.079,
            "duration": 5.601,
            "text": {
              "en": "the day, I codeex is the first thing I"
            }
          },
          {
            "start": 650.959,
            "duration": 6.081,
            "text": {
              "en": "open. It is pulling in whatever I need"
            }
          },
          {
            "start": 653.68,
            "duration": 6.24,
            "text": {
              "en": "from Gmail, Slack, Notion, Stripe, all"
            }
          },
          {
            "start": 657.04,
            "duration": 4.16,
            "text": {
              "en": "of our data sources. This morning I was"
            }
          },
          {
            "start": 659.92,
            "duration": 3.76,
            "text": {
              "en": "like, \"Oh yeah, we need to do a run of"
            }
          },
          {
            "start": 661.2,
            "duration": 4.8,
            "text": {
              "en": "show for this camp.\" I messaged Codeex."
            }
          },
          {
            "start": 663.68,
            "duration": 3.52,
            "text": {
              "en": "I'm like, \"Make the run of show.\" It"
            }
          },
          {
            "start": 666,
            "duration": 2.24,
            "text": {
              "en": "knows exactly where to look because"
            }
          },
          {
            "start": 667.2,
            "duration": 2.879,
            "text": {
              "en": "we've already had conversations about"
            }
          },
          {
            "start": 668.24,
            "duration": 4.24,
            "text": {
              "en": "what we're going to talk about today. It"
            }
          },
          {
            "start": 670.079,
            "duration": 5.361,
            "text": {
              "en": "pushed it to notion. It sent it to"
            }
          },
          {
            "start": 672.48,
            "duration": 4.16,
            "text": {
              "en": "Slack. It was perfect. It was like, \"Oh,"
            }
          },
          {
            "start": 675.44,
            "duration": 4.16,
            "text": {
              "en": "yeah. This is exactly what we should"
            }
          },
          {
            "start": 676.64,
            "duration": 5.84,
            "text": {
              "en": "do.\" And um yeah, it's where I spend"
            }
          },
          {
            "start": 679.6,
            "duration": 4.799,
            "text": {
              "en": "like 80% of my time working"
            }
          },
          {
            "start": 682.48,
            "duration": 3.76,
            "text": {
              "en": "overwhelmingly because the app itself is"
            }
          },
          {
            "start": 684.399,
            "duration": 4.88,
            "text": {
              "en": "just so good. And then the model has now"
            }
          },
          {
            "start": 686.24,
            "duration": 4.48,
            "text": {
              "en": "gotten good enough to be the daily"
            }
          },
          {
            "start": 689.279,
            "duration": 4.641,
            "text": {
              "en": "driver for me."
            }
          },
          {
            "start": 690.72,
            "duration": 5.52,
            "text": {
              "en": "Yeah. And I I feel I feel the same way."
            }
          },
          {
            "start": 693.92,
            "duration": 3.599,
            "text": {
              "en": "Um I'd love to get into and and for"
            }
          },
          {
            "start": 696.24,
            "duration": 2.88,
            "text": {
              "en": "people someone who someone asked, are"
            }
          },
          {
            "start": 697.519,
            "duration": 3.201,
            "text": {
              "en": "you we discussing the app or the CLI?"
            }
          },
          {
            "start": 699.12,
            "duration": 3.52,
            "text": {
              "en": "We're discussing the app, the desktop"
            }
          },
          {
            "start": 700.72,
            "duration": 5.6,
            "text": {
              "en": "app, and and I think you're making a"
            }
          },
          {
            "start": 702.64,
            "duration": 5.52,
            "text": {
              "en": "good point that uh both of these"
            }
          },
          {
            "start": 706.32,
            "duration": 3.759,
            "text": {
              "en": "companies, I think, sort of see the"
            }
          },
          {
            "start": 708.16,
            "duration": 4.16,
            "text": {
              "en": "endgame here and they're pushing in the"
            }
          },
          {
            "start": 710.079,
            "duration": 3.841,
            "text": {
              "en": "right direction. And for a while at"
            }
          },
          {
            "start": 712.32,
            "duration": 4.24,
            "text": {
              "en": "least, it's going to be a horse race"
            }
          },
          {
            "start": 713.92,
            "duration": 4.24,
            "text": {
              "en": "where every couple every couple weeks or"
            }
          },
          {
            "start": 716.56,
            "duration": 3.44,
            "text": {
              "en": "every couple months like one is going to"
            }
          },
          {
            "start": 718.16,
            "duration": 4.88,
            "text": {
              "en": "pull ahead and have this like sort of"
            }
          },
          {
            "start": 720,
            "duration": 6.24,
            "text": {
              "en": "amazing thing going on and then there"
            }
          },
          {
            "start": 723.04,
            "duration": 4.64,
            "text": {
              "en": "the competitor is going to uh like"
            }
          },
          {
            "start": 726.24,
            "duration": 2.719,
            "text": {
              "en": "Anthropic for example I think will"
            }
          },
          {
            "start": 727.68,
            "duration": 2.32,
            "text": {
              "en": "release something in a couple weeks or a"
            }
          },
          {
            "start": 728.959,
            "duration": 3.361,
            "text": {
              "en": "couple months. I don't have any inside"
            }
          },
          {
            "start": 730,
            "duration": 5.44,
            "text": {
              "en": "information into this but that will make"
            }
          },
          {
            "start": 732.32,
            "duration": 5.759,
            "text": {
              "en": "it at least parody if not better and"
            }
          },
          {
            "start": 735.44,
            "duration": 4.32,
            "text": {
              "en": "they're just going to keep trading. Um,"
            }
          },
          {
            "start": 738.079,
            "duration": 3.681,
            "text": {
              "en": "and at some point I think that'll slow"
            }
          },
          {
            "start": 739.76,
            "duration": 4.56,
            "text": {
              "en": "down and you'll end up with sort of"
            }
          },
          {
            "start": 741.76,
            "duration": 5.6,
            "text": {
              "en": "separate ecosystems, but for now they're"
            }
          },
          {
            "start": 744.32,
            "duration": 6.4,
            "text": {
              "en": "actually fairly easy to switch between."
            }
          },
          {
            "start": 747.36,
            "duration": 5.52,
            "text": {
              "en": "It's not it's not trivial, but it's"
            }
          },
          {
            "start": 750.72,
            "duration": 3.84,
            "text": {
              "en": "pretty easy. Like you can kind of ask"
            }
          },
          {
            "start": 752.88,
            "duration": 4.079,
            "text": {
              "en": "codeex, hey, can you go grab all my"
            }
          },
          {
            "start": 754.56,
            "duration": 4.719,
            "text": {
              "en": "cloud stuff? And it'll go do it."
            }
          },
          {
            "start": 756.959,
            "duration": 3.521,
            "text": {
              "en": "It I think it it feels that way when you"
            }
          },
          {
            "start": 759.279,
            "duration": 2.8,
            "text": {
              "en": "do it. It's funny. I'm in I'm in New"
            }
          },
          {
            "start": 760.48,
            "duration": 3.44,
            "text": {
              "en": "York right now. I usually live in LA."
            }
          },
          {
            "start": 762.079,
            "duration": 3.681,
            "text": {
              "en": "Most of my friends who are in the"
            }
          },
          {
            "start": 763.92,
            "duration": 3.919,
            "text": {
              "en": "knowledge work space have been asking me"
            }
          },
          {
            "start": 765.76,
            "duration": 4.56,
            "text": {
              "en": "about like what they should be using."
            }
          },
          {
            "start": 767.839,
            "duration": 4.881,
            "text": {
              "en": "They're all clawed code or cloud desktop"
            }
          },
          {
            "start": 770.32,
            "duration": 4.079,
            "text": {
              "en": "app build. And when I tell them that I"
            }
          },
          {
            "start": 772.72,
            "duration": 3.2,
            "text": {
              "en": "have fully transition to codeex, this"
            }
          },
          {
            "start": 774.399,
            "duration": 3.841,
            "text": {
              "en": "like look of horror shows up on their"
            }
          },
          {
            "start": 775.92,
            "duration": 4.24,
            "text": {
              "en": "face and they're like, do I? They're"
            }
          },
          {
            "start": 778.24,
            "duration": 3.2,
            "text": {
              "en": "kind of like, do I really have to? And I"
            }
          },
          {
            "start": 780.16,
            "duration": 2.799,
            "text": {
              "en": "of course tell them they don't, but I'm"
            }
          },
          {
            "start": 781.44,
            "duration": 2.639,
            "text": {
              "en": "like, you really should right now. You"
            }
          },
          {
            "start": 782.959,
            "duration": 2.88,
            "text": {
              "en": "really should. Like I think you would"
            }
          },
          {
            "start": 784.079,
            "duration": 3.521,
            "text": {
              "en": "get a big benefit from it. And I've been"
            }
          },
          {
            "start": 785.839,
            "duration": 3.44,
            "text": {
              "en": "showing them why. And it's it's"
            }
          },
          {
            "start": 787.6,
            "duration": 3.28,
            "text": {
              "en": "interesting and and to me unsurprising"
            }
          },
          {
            "start": 789.279,
            "duration": 4.081,
            "text": {
              "en": "how resistant people have been to it"
            }
          },
          {
            "start": 790.88,
            "duration": 4.399,
            "text": {
              "en": "because the when you're a knowledge"
            }
          },
          {
            "start": 793.36,
            "duration": 3.76,
            "text": {
              "en": "worker and you have all these new tools,"
            }
          },
          {
            "start": 795.279,
            "duration": 3.36,
            "text": {
              "en": "the cloud desktop app is is game"
            }
          },
          {
            "start": 797.12,
            "duration": 3.6,
            "text": {
              "en": "changing. It's amazing, right? So the"
            }
          },
          {
            "start": 798.639,
            "duration": 5.681,
            "text": {
              "en": "idea that the codeex app is maybe 30 to"
            }
          },
          {
            "start": 800.72,
            "duration": 5.44,
            "text": {
              "en": "40% better is like that's a lot of work."
            }
          },
          {
            "start": 804.32,
            "duration": 3.6,
            "text": {
              "en": "Um which we can get into kind of how I"
            }
          },
          {
            "start": 806.16,
            "duration": 4.16,
            "text": {
              "en": "migrated. I can show some of that. It"
            }
          },
          {
            "start": 807.92,
            "duration": 4.4,
            "text": {
              "en": "was very easy and the ways that I'm uh"
            }
          },
          {
            "start": 810.32,
            "duration": 3.28,
            "text": {
              "en": "starting to use it. So I'm happy to dive"
            }
          },
          {
            "start": 812.32,
            "duration": 2.16,
            "text": {
              "en": "into that and start sharing my screen"
            }
          },
          {
            "start": 813.6,
            "duration": 2.64,
            "text": {
              "en": "and show"
            }
          },
          {
            "start": 814.48,
            "duration": 3.44,
            "text": {
              "en": "why don't you share your screen? Um, I"
            }
          },
          {
            "start": 816.24,
            "duration": 3.039,
            "text": {
              "en": "think yeah, I I kind of agree with you."
            }
          },
          {
            "start": 817.92,
            "duration": 2.719,
            "text": {
              "en": "It's more of like an emotional thing of"
            }
          },
          {
            "start": 819.279,
            "duration": 3.281,
            "text": {
              "en": "like, oh, I have to learn a whole new"
            }
          },
          {
            "start": 820.639,
            "duration": 3.601,
            "text": {
              "en": "thing or whatever, but it's it's pretty"
            }
          },
          {
            "start": 822.56,
            "duration": 3.12,
            "text": {
              "en": "similar. Yeah, I would love to see some"
            }
          },
          {
            "start": 824.24,
            "duration": 4.8,
            "text": {
              "en": "of your workflows."
            }
          },
          {
            "start": 825.68,
            "duration": 4.64,
            "text": {
              "en": "Cool. So, um, this is the Codex app. I"
            }
          },
          {
            "start": 829.04,
            "duration": 2.799,
            "text": {
              "en": "was going to do like a very very quick"
            }
          },
          {
            "start": 830.32,
            "duration": 3.44,
            "text": {
              "en": "tour. I think a lot of the audience has"
            }
          },
          {
            "start": 831.839,
            "duration": 5.12,
            "text": {
              "en": "seen it, but kind of like where I go and"
            }
          },
          {
            "start": 833.76,
            "duration": 4.72,
            "text": {
              "en": "how I use it. Um, one thing I love about"
            }
          },
          {
            "start": 836.959,
            "duration": 3.601,
            "text": {
              "en": "the Codex app is like I do think it's"
            }
          },
          {
            "start": 838.48,
            "duration": 5.2,
            "text": {
              "en": "much better organized than the Cloud"
            }
          },
          {
            "start": 840.56,
            "duration": 5.519,
            "text": {
              "en": "Desktop app. my the ability to have"
            }
          },
          {
            "start": 843.68,
            "duration": 5.04,
            "text": {
              "en": "these folders with persistent consistent"
            }
          },
          {
            "start": 846.079,
            "duration": 4.88,
            "text": {
              "en": "chats inside of it that I can go check"
            }
          },
          {
            "start": 848.72,
            "duration": 3.84,
            "text": {
              "en": "out. And then especially like the big"
            }
          },
          {
            "start": 850.959,
            "duration": 3.68,
            "text": {
              "en": "differentiator is that because I do"
            }
          },
          {
            "start": 852.56,
            "duration": 3.92,
            "text": {
              "en": "think this is much better for"
            }
          },
          {
            "start": 854.639,
            "duration": 4.32,
            "text": {
              "en": "engineering for like occasionally I will"
            }
          },
          {
            "start": 856.48,
            "duration": 5.599,
            "text": {
              "en": "ship a PR for one of our products. It's"
            }
          },
          {
            "start": 858.959,
            "duration": 5.281,
            "text": {
              "en": "great to not have to switch between uh"
            }
          },
          {
            "start": 862.079,
            "duration": 4.641,
            "text": {
              "en": "the cloud code, the cloud desktop app"
            }
          },
          {
            "start": 864.24,
            "duration": 5.2,
            "text": {
              "en": "and codeex that I can be here. I can be"
            }
          },
          {
            "start": 866.72,
            "duration": 4.08,
            "text": {
              "en": "working on our improving our KPI sheet,"
            }
          },
          {
            "start": 869.44,
            "duration": 4.399,
            "text": {
              "en": "which I'll like show what I was doing"
            }
          },
          {
            "start": 870.8,
            "duration": 6.159,
            "text": {
              "en": "here. And then I can go down to plus one"
            }
          },
          {
            "start": 873.839,
            "duration": 4.481,
            "text": {
              "en": "and ship a PR for plus one. And um the"
            }
          },
          {
            "start": 876.959,
            "duration": 2.721,
            "text": {
              "en": "other thing I found because I did I"
            }
          },
          {
            "start": 878.32,
            "duration": 2.879,
            "text": {
              "en": "tried the new ver like I tried the"
            }
          },
          {
            "start": 879.68,
            "duration": 3.839,
            "text": {
              "en": "update to the cloud desktop app last"
            }
          },
          {
            "start": 881.199,
            "duration": 5.281,
            "text": {
              "en": "week when they when they shipped it and"
            }
          },
          {
            "start": 883.519,
            "duration": 5.201,
            "text": {
              "en": "the the stress test I put on it was make"
            }
          },
          {
            "start": 886.48,
            "duration": 4.96,
            "text": {
              "en": "a go to market plan for our new product"
            }
          },
          {
            "start": 888.72,
            "duration": 6.239,
            "text": {
              "en": "and ship a PR to Sparkle in different"
            }
          },
          {
            "start": 891.44,
            "duration": 5.199,
            "text": {
              "en": "chats. And it it was so clunky and slow."
            }
          },
          {
            "start": 894.959,
            "duration": 3.521,
            "text": {
              "en": "And when you do stuff like that inside"
            }
          },
          {
            "start": 896.639,
            "duration": 3.681,
            "text": {
              "en": "of codeex, it just works. Like it just"
            }
          },
          {
            "start": 898.48,
            "duration": 3.52,
            "text": {
              "en": "works really quickly and and well and"
            }
          },
          {
            "start": 900.32,
            "duration": 2.959,
            "text": {
              "en": "and that's the thing that like once you"
            }
          },
          {
            "start": 902,
            "duration": 3.76,
            "text": {
              "en": "start feeling that, it's very hard for"
            }
          },
          {
            "start": 903.279,
            "duration": 5.201,
            "text": {
              "en": "me to turn away from it. So I have these"
            }
          },
          {
            "start": 905.76,
            "duration": 4.4,
            "text": {
              "en": "different folders for um some like"
            }
          },
          {
            "start": 908.48,
            "duration": 5.2,
            "text": {
              "en": "vibecoded apps that I play around with"
            }
          },
          {
            "start": 910.16,
            "duration": 6,
            "text": {
              "en": "for fun for my personal open claw where"
            }
          },
          {
            "start": 913.68,
            "duration": 4.159,
            "text": {
              "en": "I can go and manipulate it here. And"
            }
          },
          {
            "start": 916.16,
            "duration": 4.4,
            "text": {
              "en": "then the one with all of the chats is"
            }
          },
          {
            "start": 917.839,
            "duration": 6.641,
            "text": {
              "en": "this like every growth OS. All this is"
            }
          },
          {
            "start": 920.56,
            "duration": 5.519,
            "text": {
              "en": "is a folder with a bunch of um secrets"
            }
          },
          {
            "start": 924.48,
            "duration": 3.919,
            "text": {
              "en": "and keys. So, it's connected to"
            }
          },
          {
            "start": 926.079,
            "duration": 4.801,
            "text": {
              "en": "everything we use for every and then"
            }
          },
          {
            "start": 928.399,
            "duration": 4.721,
            "text": {
              "en": "some project instructional files that"
            }
          },
          {
            "start": 930.88,
            "duration": 4.079,
            "text": {
              "en": "explain what the every business is, what"
            }
          },
          {
            "start": 933.12,
            "duration": 4.719,
            "text": {
              "en": "we care about, how we like to work"
            }
          },
          {
            "start": 934.959,
            "duration": 4.641,
            "text": {
              "en": "together. Um, it has some like reviewer"
            }
          },
          {
            "start": 937.839,
            "duration": 4.321,
            "text": {
              "en": "agents inside of it that are all"
            }
          },
          {
            "start": 939.6,
            "duration": 4.96,
            "text": {
              "en": "informed by how compound engineering"
            }
          },
          {
            "start": 942.16,
            "duration": 5.919,
            "text": {
              "en": "works. Inside of compound engineering,"
            }
          },
          {
            "start": 944.56,
            "duration": 5.6,
            "text": {
              "en": "uh, Kieran's plugin, there is a compound"
            }
          },
          {
            "start": 948.079,
            "duration": 4.641,
            "text": {
              "en": "engineering review step. once you do"
            }
          },
          {
            "start": 950.16,
            "duration": 4.479,
            "text": {
              "en": "some work um that reviews for like"
            }
          },
          {
            "start": 952.72,
            "duration": 4.479,
            "text": {
              "en": "security and a few different things that"
            }
          },
          {
            "start": 954.639,
            "duration": 5.041,
            "text": {
              "en": "are oftentimes not as helpful for like"
            }
          },
          {
            "start": 957.199,
            "duration": 4.88,
            "text": {
              "en": "I'm doing a strategic plan for a go-to"
            }
          },
          {
            "start": 959.68,
            "duration": 4.719,
            "text": {
              "en": "market initiative and so inside of here"
            }
          },
          {
            "start": 962.079,
            "duration": 5.281,
            "text": {
              "en": "there's like a fork for it for strategic"
            }
          },
          {
            "start": 964.399,
            "duration": 6,
            "text": {
              "en": "alignment with a company goals for data"
            }
          },
          {
            "start": 967.36,
            "duration": 4.96,
            "text": {
              "en": "um data accuracy and uh having that"
            }
          },
          {
            "start": 970.399,
            "duration": 5.601,
            "text": {
              "en": "inside of this folder means that as I'm"
            }
          },
          {
            "start": 972.32,
            "duration": 6.72,
            "text": {
              "en": "making plans I can get reviews uh from"
            }
          },
          {
            "start": 976,
            "duration": 4.48,
            "text": {
              "en": "the model in like a targeted way um And"
            }
          },
          {
            "start": 979.04,
            "duration": 3.12,
            "text": {
              "en": "so the first thing I wanted to show is"
            }
          },
          {
            "start": 980.48,
            "duration": 3.68,
            "text": {
              "en": "like how I was talking to our our"
            }
          },
          {
            "start": 982.16,
            "duration": 4.08,
            "text": {
              "en": "editor-in chief Kate yesterday to show"
            }
          },
          {
            "start": 984.16,
            "duration": 5.84,
            "text": {
              "en": "her like how I would recommend getting"
            }
          },
          {
            "start": 986.24,
            "duration": 6.08,
            "text": {
              "en": "started in codeex. And this is my"
            }
          },
          {
            "start": 990,
            "duration": 4.48,
            "text": {
              "en": "recommended prompt. I I'm happy to put"
            }
          },
          {
            "start": 992.32,
            "duration": 6.319,
            "text": {
              "en": "it in the chat for people. We can uh put"
            }
          },
          {
            "start": 994.48,
            "duration": 8,
            "text": {
              "en": "it in the email as well. Um and so all I"
            }
          },
          {
            "start": 998.639,
            "duration": 5.76,
            "text": {
              "en": "did was I'm putting in the prompts here."
            }
          },
          {
            "start": 1002.48,
            "duration": 3.12,
            "text": {
              "en": "I only have post and panelist access so"
            }
          },
          {
            "start": 1004.399,
            "duration": 2.88,
            "text": {
              "en": "I'll send it later or something."
            }
          },
          {
            "start": 1005.6,
            "duration": 3.679,
            "text": {
              "en": "You can't um read. Okay. Yeah, maybe"
            }
          },
          {
            "start": 1007.279,
            "duration": 4.24,
            "text": {
              "en": "read it out. We can all agree that"
            }
          },
          {
            "start": 1009.279,
            "duration": 3.841,
            "text": {
              "en": "housing is expensive. Rent or mortgage"
            }
          },
          {
            "start": 1011.519,
            "duration": 3.361,
            "text": {
              "en": "doesn't matter what you're paying. It"
            }
          },
          {
            "start": 1013.12,
            "duration": 4,
            "text": {
              "en": "stings [music] every month. But Built"
            }
          },
          {
            "start": 1014.88,
            "duration": 4.399,
            "text": {
              "en": "can make it feel a little better. Build"
            }
          },
          {
            "start": 1017.12,
            "duration": 4.959,
            "text": {
              "en": "started out by rewarding members [music]"
            }
          },
          {
            "start": 1019.279,
            "duration": 5.28,
            "text": {
              "en": "for their rent. Now, as of 2026, Built"
            }
          },
          {
            "start": 1022.079,
            "duration": 3.84,
            "text": {
              "en": "members can also earn points on mortgage"
            }
          },
          {
            "start": 1024.559,
            "duration": 3.12,
            "text": {
              "en": "payments wherever [music] they live."
            }
          },
          {
            "start": 1025.919,
            "duration": 3.361,
            "text": {
              "en": "Every housing payment earns points you"
            }
          },
          {
            "start": 1027.679,
            "duration": 3.302,
            "text": {
              "en": "can use toward flights with top travel"
            }
          },
          {
            "start": 1029.28,
            "duration": 4,
            "text": {
              "en": "partners like United and Hyatt, Lift"
            }
          },
          {
            "start": 1030.981,
            "duration": 3.739,
            "text": {
              "en": "[music] Rides, Amazon.com purchases, and"
            }
          },
          {
            "start": 1033.28,
            "duration": 2.941,
            "text": {
              "en": "so much more. This is actually pretty"
            }
          },
          {
            "start": 1034.72,
            "duration": 2.8,
            "text": {
              "en": "cool, and I have some friends that use"
            }
          },
          {
            "start": 1036.221,
            "duration": 2.818,
            "text": {
              "en": "[music] this and like it a lot."
            }
          },
          {
            "start": 1037.52,
            "duration": 3.286,
            "text": {
              "en": "Something that's underrated is that"
            }
          },
          {
            "start": 1039.039,
            "duration": 3.601,
            "text": {
              "en": "built members also get access to a"
            }
          },
          {
            "start": 1040.806,
            "duration": 3.434,
            "text": {
              "en": "[music] neighborhood concierge. They can"
            }
          },
          {
            "start": 1042.64,
            "duration": 3.36,
            "text": {
              "en": "make restaurant reservations, book"
            }
          },
          {
            "start": 1044.24,
            "duration": 2.48,
            "text": {
              "en": "fitness classes, and find new local"
            }
          },
          {
            "start": 1046,
            "duration": 3.44,
            "text": {
              "en": "spots, [music]"
            }
          },
          {
            "start": 1046.72,
            "duration": 4.4,
            "text": {
              "en": "all while still rewarding you at 45,000"
            }
          },
          {
            "start": 1049.44,
            "duration": 3.157,
            "text": {
              "en": "merchant partners. It's like having a"
            }
          },
          {
            "start": 1051.12,
            "duration": 3.2,
            "text": {
              "en": "personal assistant baked into where you"
            }
          },
          {
            "start": 1052.597,
            "duration": 3.803,
            "text": {
              "en": "[music] live. It's simple. Being a"
            }
          },
          {
            "start": 1054.32,
            "duration": 3.84,
            "text": {
              "en": "renter and now owning a home is better"
            }
          },
          {
            "start": 1056.4,
            "duration": 4.88,
            "text": {
              "en": "with built. [music] Make sure to use our"
            }
          },
          {
            "start": 1058.16,
            "duration": 4.399,
            "text": {
              "en": "URL so they know we sent you. And now"
            }
          },
          {
            "start": 1061.28,
            "duration": 3.759,
            "text": {
              "en": "back to the episode."
            }
          },
          {
            "start": 1062.559,
            "duration": 6.641,
            "text": {
              "en": "Yeah. Yeah. Um, okay. I can zoom in as"
            }
          },
          {
            "start": 1065.039,
            "duration": 8.321,
            "text": {
              "en": "well, I think. There we go. Um, so"
            }
          },
          {
            "start": 1069.2,
            "duration": 6.32,
            "text": {
              "en": "through the plug-in tool with codeex, I"
            }
          },
          {
            "start": 1073.36,
            "duration": 4.96,
            "text": {
              "en": "had went in and man and like did the"
            }
          },
          {
            "start": 1075.52,
            "duration": 6.159,
            "text": {
              "en": "manual clicks to connect all the tools I"
            }
          },
          {
            "start": 1078.32,
            "duration": 7.76,
            "text": {
              "en": "use every day like Gmail, Slack, notion,"
            }
          },
          {
            "start": 1081.679,
            "duration": 7.36,
            "text": {
              "en": "and then I went to a new chat inside of"
            }
          },
          {
            "start": 1086.08,
            "duration": 4.719,
            "text": {
              "en": "this folder that was built through cloud"
            }
          },
          {
            "start": 1089.039,
            "duration": 4,
            "text": {
              "en": "code. Cloud code built this whole every"
            }
          },
          {
            "start": 1090.799,
            "duration": 4.641,
            "text": {
              "en": "growth OS system. There's a cloud MD"
            }
          },
          {
            "start": 1093.039,
            "duration": 4.561,
            "text": {
              "en": "file in there and it's saved locally."
            }
          },
          {
            "start": 1095.44,
            "duration": 4.16,
            "text": {
              "en": "it's also um synced and then pushed to"
            }
          },
          {
            "start": 1097.6,
            "duration": 3.52,
            "text": {
              "en": "to GitHub and so I just opened that"
            }
          },
          {
            "start": 1099.6,
            "duration": 5.6,
            "text": {
              "en": "project inside of Codeex when I started"
            }
          },
          {
            "start": 1101.12,
            "duration": 6.48,
            "text": {
              "en": "working here and I uh start a compound"
            }
          },
          {
            "start": 1105.2,
            "duration": 3.839,
            "text": {
              "en": "engineering brainstorm workflow because"
            }
          },
          {
            "start": 1107.6,
            "duration": 3.199,
            "text": {
              "en": "it is again just kind of like a thing I"
            }
          },
          {
            "start": 1109.039,
            "duration": 3.841,
            "text": {
              "en": "reach for of let let's think about this"
            }
          },
          {
            "start": 1110.799,
            "duration": 4.24,
            "text": {
              "en": "thing together me and the me and the"
            }
          },
          {
            "start": 1112.88,
            "duration": 4.24,
            "text": {
              "en": "model and basically what I said is like"
            }
          },
          {
            "start": 1115.039,
            "duration": 4.561,
            "text": {
              "en": "go take a look at the things I use the"
            }
          },
          {
            "start": 1117.12,
            "duration": 5.36,
            "text": {
              "en": "most which are notion Slack and Gmail"
            }
          },
          {
            "start": 1119.6,
            "duration": 5.12,
            "text": {
              "en": "and think of some automations that would"
            }
          },
          {
            "start": 1122.48,
            "duration": 4,
            "text": {
              "en": "help me with my work I I find that when"
            }
          },
          {
            "start": 1124.72,
            "duration": 5.28,
            "text": {
              "en": "I'm trying something new, whether it's a"
            }
          },
          {
            "start": 1126.48,
            "duration": 5.92,
            "text": {
              "en": "model or an app. Um, having an agent,"
            }
          },
          {
            "start": 1130,
            "duration": 4.72,
            "text": {
              "en": "having a very smart frontier model, like"
            }
          },
          {
            "start": 1132.4,
            "duration": 3.92,
            "text": {
              "en": "tell me how to use it, tell me what it"
            }
          },
          {
            "start": 1134.72,
            "duration": 3.44,
            "text": {
              "en": "should do is like exactly where I want"
            }
          },
          {
            "start": 1136.32,
            "duration": 3.359,
            "text": {
              "en": "to start rather than thinking of it"
            }
          },
          {
            "start": 1138.16,
            "duration": 2.879,
            "text": {
              "en": "myself. And I usually start here."
            }
          },
          {
            "start": 1139.679,
            "duration": 3.921,
            "text": {
              "en": "Sometimes I will describe a very"
            }
          },
          {
            "start": 1141.039,
            "duration": 3.921,
            "text": {
              "en": "specific problem. But this is very"
            }
          },
          {
            "start": 1143.6,
            "duration": 3.52,
            "text": {
              "en": "helpful for me and I think a good"
            }
          },
          {
            "start": 1144.96,
            "duration": 5.68,
            "text": {
              "en": "generic prop for people to start with."
            }
          },
          {
            "start": 1147.12,
            "duration": 5.439,
            "text": {
              "en": "And uh, Codeex comes back. It looks at"
            }
          },
          {
            "start": 1150.64,
            "duration": 4.56,
            "text": {
              "en": "what's going on for me and for the"
            }
          },
          {
            "start": 1152.559,
            "duration": 6.081,
            "text": {
              "en": "company right now. And um I thought"
            }
          },
          {
            "start": 1155.2,
            "duration": 5.359,
            "text": {
              "en": "these were really good that like um it"
            }
          },
          {
            "start": 1158.64,
            "duration": 3.2,
            "text": {
              "en": "has this kind of follow-up radar. This"
            }
          },
          {
            "start": 1160.559,
            "duration": 3.441,
            "text": {
              "en": "is a big thing that happens with people"
            }
          },
          {
            "start": 1161.84,
            "duration": 3.839,
            "text": {
              "en": "who do knowledge work, who do"
            }
          },
          {
            "start": 1164,
            "duration": 3.44,
            "text": {
              "en": "partnerships, who do social media"
            }
          },
          {
            "start": 1165.679,
            "duration": 3.12,
            "text": {
              "en": "marketing that there's all this stuff"
            }
          },
          {
            "start": 1167.44,
            "duration": 3.44,
            "text": {
              "en": "coming at you across a bunch of"
            }
          },
          {
            "start": 1168.799,
            "duration": 5.441,
            "text": {
              "en": "different sources. Like what if it"
            }
          },
          {
            "start": 1170.88,
            "duration": 5.6,
            "text": {
              "en": "handled the triage for you? Um what if"
            }
          },
          {
            "start": 1174.24,
            "duration": 4.4,
            "text": {
              "en": "it had this kind of like command sensor"
            }
          },
          {
            "start": 1176.48,
            "duration": 3.6,
            "text": {
              "en": "when we run a a camp or an event which"
            }
          },
          {
            "start": 1178.64,
            "duration": 4.64,
            "text": {
              "en": "usually requires a bunch of moving"
            }
          },
          {
            "start": 1180.08,
            "duration": 5.2,
            "text": {
              "en": "pieces and moving parts? uh like Dan"
            }
          },
          {
            "start": 1183.28,
            "duration": 4.08,
            "text": {
              "en": "mentioned for recruiting and hiring. We"
            }
          },
          {
            "start": 1185.28,
            "duration": 3.44,
            "text": {
              "en": "don't use a tool like Ashby or"
            }
          },
          {
            "start": 1187.36,
            "duration": 4.72,
            "text": {
              "en": "something, we kind of have it all synced"
            }
          },
          {
            "start": 1188.72,
            "duration": 5.839,
            "text": {
              "en": "through notion because uh apps like this"
            }
          },
          {
            "start": 1192.08,
            "duration": 4.959,
            "text": {
              "en": "and agents can kind of like handle a lot"
            }
          },
          {
            "start": 1194.559,
            "duration": 4.161,
            "text": {
              "en": "of the pipeline and tracking work for us"
            }
          },
          {
            "start": 1197.039,
            "duration": 4.401,
            "text": {
              "en": "and you can just ask it to automate it"
            }
          },
          {
            "start": 1198.72,
            "duration": 5.52,
            "text": {
              "en": "for you. And so it it does that and it"
            }
          },
          {
            "start": 1201.44,
            "duration": 4.88,
            "text": {
              "en": "asks me like which ones look good, what"
            }
          },
          {
            "start": 1204.24,
            "duration": 3.92,
            "text": {
              "en": "do you want to tweak? For the for the"
            }
          },
          {
            "start": 1206.32,
            "duration": 4.08,
            "text": {
              "en": "sake of this demo, I didn't give it any"
            }
          },
          {
            "start": 1208.16,
            "duration": 4.8,
            "text": {
              "en": "real feedback. I was like, \"Looks good.\""
            }
          },
          {
            "start": 1210.4,
            "duration": 3.76,
            "text": {
              "en": "And um this is actually the thing I've"
            }
          },
          {
            "start": 1212.96,
            "duration": 3.44,
            "text": {
              "en": "I've always been most impressed with"
            }
          },
          {
            "start": 1214.16,
            "duration": 3.92,
            "text": {
              "en": "codeex for and and for the models is"
            }
          },
          {
            "start": 1216.4,
            "duration": 4,
            "text": {
              "en": "that it's like great, I made this"
            }
          },
          {
            "start": 1218.08,
            "duration": 4.08,
            "text": {
              "en": "automation for you. And I do find that"
            }
          },
          {
            "start": 1220.4,
            "duration": 4.24,
            "text": {
              "en": "they just work incredibly well. They"
            }
          },
          {
            "start": 1222.16,
            "duration": 5.68,
            "text": {
              "en": "require very little tweaking to be like"
            }
          },
          {
            "start": 1224.64,
            "duration": 6.32,
            "text": {
              "en": "this is a thing I would and do use every"
            }
          },
          {
            "start": 1227.84,
            "duration": 4.8,
            "text": {
              "en": "day of there's this set of instructions"
            }
          },
          {
            "start": 1230.96,
            "duration": 4.24,
            "text": {
              "en": "that it comes up with based on what it"
            }
          },
          {
            "start": 1232.64,
            "duration": 4.8,
            "text": {
              "en": "knows about me. I can change when it"
            }
          },
          {
            "start": 1235.2,
            "duration": 3.68,
            "text": {
              "en": "runs. I can give it additional insights."
            }
          },
          {
            "start": 1237.44,
            "duration": 3.359,
            "text": {
              "en": "I can connect it to other things, but"
            }
          },
          {
            "start": 1238.88,
            "duration": 3.6,
            "text": {
              "en": "mostly it just works. There's there's"
            }
          },
          {
            "start": 1240.799,
            "duration": 4.401,
            "text": {
              "en": "one that works for me that just at the"
            }
          },
          {
            "start": 1242.48,
            "duration": 5.12,
            "text": {
              "en": "end of each day now compiles all of the"
            }
          },
          {
            "start": 1245.2,
            "duration": 4.24,
            "text": {
              "en": "stuff that I haven't responded to yet."
            }
          },
          {
            "start": 1247.6,
            "duration": 3.6,
            "text": {
              "en": "Drafts the replies and we can kind of"
            }
          },
          {
            "start": 1249.44,
            "duration": 3.28,
            "text": {
              "en": "like knock it out together of what to"
            }
          },
          {
            "start": 1251.2,
            "duration": 2.88,
            "text": {
              "en": "say or like actually all I need to do is"
            }
          },
          {
            "start": 1252.72,
            "duration": 3.04,
            "text": {
              "en": "just give like a thumbs up Slack"
            }
          },
          {
            "start": 1254.08,
            "duration": 4.479,
            "text": {
              "en": "reaction to something and it'll do that"
            }
          },
          {
            "start": 1255.76,
            "duration": 4.799,
            "text": {
              "en": "for me. It's kind of like a like a dumb"
            }
          },
          {
            "start": 1258.559,
            "duration": 3.681,
            "text": {
              "en": "agent. Like I think of agents like this"
            }
          },
          {
            "start": 1260.559,
            "duration": 3.841,
            "text": {
              "en": "is like the dumb ones that just do the"
            }
          },
          {
            "start": 1262.24,
            "duration": 4.4,
            "text": {
              "en": "right thing every time and then the"
            }
          },
          {
            "start": 1264.4,
            "duration": 3.759,
            "text": {
              "en": "smart ones like an open claw or a plus"
            }
          },
          {
            "start": 1266.64,
            "duration": 3.919,
            "text": {
              "en": "one the products we have coming that's"
            }
          },
          {
            "start": 1268.159,
            "duration": 4.241,
            "text": {
              "en": "like you'll work back and forth with it"
            }
          },
          {
            "start": 1270.559,
            "duration": 5.281,
            "text": {
              "en": "and like have a have like a more of like"
            }
          },
          {
            "start": 1272.4,
            "duration": 4.88,
            "text": {
              "en": "a creative strategic partner and Codex"
            }
          },
          {
            "start": 1275.84,
            "duration": 3.52,
            "text": {
              "en": "is good at building both and I can I can"
            }
          },
          {
            "start": 1277.28,
            "duration": 4.48,
            "text": {
              "en": "show kind of like the smart agent setup"
            }
          },
          {
            "start": 1279.36,
            "duration": 4.08,
            "text": {
              "en": "but if someone is looking to be like can"
            }
          },
          {
            "start": 1281.76,
            "duration": 3.279,
            "text": {
              "en": "I see what this thing can do to help me"
            }
          },
          {
            "start": 1283.44,
            "duration": 3.92,
            "text": {
              "en": "with knowledge work I would start here"
            }
          },
          {
            "start": 1285.039,
            "duration": 4.241,
            "text": {
              "en": "in like a brainstorming automation state"
            }
          },
          {
            "start": 1287.36,
            "duration": 3.28,
            "text": {
              "en": "because it is And I think you'll also be"
            }
          },
          {
            "start": 1289.28,
            "duration": 2.8,
            "text": {
              "en": "surprised by how fast it is and you're"
            }
          },
          {
            "start": 1290.64,
            "duration": 3.2,
            "text": {
              "en": "like, \"Oh, I'm starting to get what this"
            }
          },
          {
            "start": 1292.08,
            "duration": 5.04,
            "text": {
              "en": "thing could do.\""
            }
          },
          {
            "start": 1293.84,
            "duration": 5.52,
            "text": {
              "en": "This is so sick. I Your your codeex"
            }
          },
          {
            "start": 1297.12,
            "duration": 4.32,
            "text": {
              "en": "usage is far surpassing mine in terms of"
            }
          },
          {
            "start": 1299.36,
            "duration": 5.04,
            "text": {
              "en": "interestingness. Uh [laughter]"
            }
          },
          {
            "start": 1301.44,
            "duration": 4.88,
            "text": {
              "en": "I'm getting a lot of ideas. Um I want to"
            }
          },
          {
            "start": 1304.4,
            "duration": 3.04,
            "text": {
              "en": "just actually pause here. Normally we"
            }
          },
          {
            "start": 1306.32,
            "duration": 2.56,
            "text": {
              "en": "take questions at the end, but I think"
            }
          },
          {
            "start": 1307.44,
            "duration": 3.04,
            "text": {
              "en": "it would be kind of interesting if you"
            }
          },
          {
            "start": 1308.88,
            "duration": 4.159,
            "text": {
              "en": "have a question about what Austin has"
            }
          },
          {
            "start": 1310.48,
            "duration": 5.199,
            "text": {
              "en": "just showed. it would be nice to let"
            }
          },
          {
            "start": 1313.039,
            "duration": 4.241,
            "text": {
              "en": "people come up and um just ask a"
            }
          },
          {
            "start": 1315.679,
            "duration": 4.161,
            "text": {
              "en": "question or two just to see what the"
            }
          },
          {
            "start": 1317.28,
            "duration": 4.72,
            "text": {
              "en": "vibe of the room is like. Um so please"
            }
          },
          {
            "start": 1319.84,
            "duration": 7.92,
            "text": {
              "en": "raise your hand uh if you have a"
            }
          },
          {
            "start": 1322,
            "duration": 8.72,
            "text": {
              "en": "question and we will uh call on you. Uh"
            }
          },
          {
            "start": 1327.76,
            "duration": 4.08,
            "text": {
              "en": "Margaret, welcome. Uh please uh"
            }
          },
          {
            "start": 1330.72,
            "duration": 2.24,
            "text": {
              "en": "introduce yourself and ask your"
            }
          },
          {
            "start": 1331.84,
            "duration": 3.839,
            "text": {
              "en": "question."
            }
          },
          {
            "start": 1332.96,
            "duration": 7.36,
            "text": {
              "en": "Hi, can you hear me? I'm Margaret. I'm"
            }
          },
          {
            "start": 1335.679,
            "duration": 8.321,
            "text": {
              "en": "in Plymouth. Um and my question is what"
            }
          },
          {
            "start": 1340.32,
            "duration": 6.16,
            "text": {
              "en": "is your review step look like? So it's"
            }
          },
          {
            "start": 1344,
            "duration": 5.76,
            "text": {
              "en": "um saying don't send postarch archive or"
            }
          },
          {
            "start": 1346.48,
            "duration": 5.12,
            "text": {
              "en": "modify without explicit approval. So"
            }
          },
          {
            "start": 1349.76,
            "duration": 3.919,
            "text": {
              "en": "what does that look like? Is that like"
            }
          },
          {
            "start": 1351.6,
            "duration": 4.48,
            "text": {
              "en": "do you call up say hey let's do the"
            }
          },
          {
            "start": 1353.679,
            "duration": 4.961,
            "text": {
              "en": "review flow now or is it doing push"
            }
          },
          {
            "start": 1356.08,
            "duration": 3.04,
            "text": {
              "en": "notifications to your phone or what?"
            }
          },
          {
            "start": 1358.64,
            "duration": 4.24,
            "text": {
              "en": "Thanks."
            }
          },
          {
            "start": 1359.12,
            "duration": 4.96,
            "text": {
              "en": "Yeah. So um for this what I prefer and I"
            }
          },
          {
            "start": 1362.88,
            "duration": 2.88,
            "text": {
              "en": "was actually talking to a friend at"
            }
          },
          {
            "start": 1364.08,
            "duration": 3.28,
            "text": {
              "en": "dinner last night who said they did the"
            }
          },
          {
            "start": 1365.76,
            "duration": 4.32,
            "text": {
              "en": "same thing on their own. They came up"
            }
          },
          {
            "start": 1367.36,
            "duration": 4.64,
            "text": {
              "en": "with this too is like everything I I"
            }
          },
          {
            "start": 1370.08,
            "duration": 4.88,
            "text": {
              "en": "work primarily in codeex. I do all the"
            }
          },
          {
            "start": 1372,
            "duration": 4.96,
            "text": {
              "en": "drafting and setup in codeex and then"
            }
          },
          {
            "start": 1374.96,
            "duration": 4,
            "text": {
              "en": "it's helpful for my brain to have the"
            }
          },
          {
            "start": 1376.96,
            "duration": 4.32,
            "text": {
              "en": "final review step actually live in the"
            }
          },
          {
            "start": 1378.96,
            "duration": 4,
            "text": {
              "en": "external app. So it will draft all the"
            }
          },
          {
            "start": 1381.28,
            "duration": 4,
            "text": {
              "en": "Slack messages and then I can go to"
            }
          },
          {
            "start": 1382.96,
            "duration": 5.199,
            "text": {
              "en": "Slack where Slack has that like draft"
            }
          },
          {
            "start": 1385.28,
            "duration": 5.36,
            "text": {
              "en": "reply um tab and I can go and knock them"
            }
          },
          {
            "start": 1388.159,
            "duration": 4.88,
            "text": {
              "en": "out. And I do find that it it like uh"
            }
          },
          {
            "start": 1390.64,
            "duration": 3.6,
            "text": {
              "en": "freshens up my my brain a bit to be like"
            }
          },
          {
            "start": 1393.039,
            "duration": 2.721,
            "text": {
              "en": "here's where I'll just make sure that"
            }
          },
          {
            "start": 1394.24,
            "duration": 4.16,
            "text": {
              "en": "this is what I want to send to a human"
            }
          },
          {
            "start": 1395.76,
            "duration": 5.52,
            "text": {
              "en": "being. Uh same thing for email. It like"
            }
          },
          {
            "start": 1398.4,
            "duration": 5.04,
            "text": {
              "en": "creates all of these drafts in uh in"
            }
          },
          {
            "start": 1401.28,
            "duration": 4.56,
            "text": {
              "en": "Gmail and I'll actually go open Gmail"
            }
          },
          {
            "start": 1403.44,
            "duration": 4.8,
            "text": {
              "en": "and look at them and and knock them out."
            }
          },
          {
            "start": 1405.84,
            "duration": 5.44,
            "text": {
              "en": "I I know some other people who just have"
            }
          },
          {
            "start": 1408.24,
            "duration": 4.16,
            "text": {
              "en": "it actually come up inside of codeex and"
            }
          },
          {
            "start": 1411.28,
            "duration": 3.36,
            "text": {
              "en": "they're like, \"Yeah, sure. Send it. It"
            }
          },
          {
            "start": 1412.4,
            "duration": 4.159,
            "text": {
              "en": "looks good there.\" Um I do the same"
            }
          },
          {
            "start": 1414.64,
            "duration": 4.96,
            "text": {
              "en": "thing for strategic planning. it pushes"
            }
          },
          {
            "start": 1416.559,
            "duration": 4.881,
            "text": {
              "en": "to a either proof doc uh the the like"
            }
          },
          {
            "start": 1419.6,
            "duration": 3.76,
            "text": {
              "en": "agent friendly markdown file that Dan"
            }
          },
          {
            "start": 1421.44,
            "duration": 4,
            "text": {
              "en": "made or a notion doc. I use them for"
            }
          },
          {
            "start": 1423.36,
            "duration": 4.559,
            "text": {
              "en": "some different things and I I just like"
            }
          },
          {
            "start": 1425.44,
            "duration": 6.88,
            "text": {
              "en": "for like the last pass before humans"
            }
          },
          {
            "start": 1427.919,
            "duration": 8.64,
            "text": {
              "en": "engage with it to step away from this um"
            }
          },
          {
            "start": 1432.32,
            "duration": 6.16,
            "text": {
              "en": "agentic space and have a final check in"
            }
          },
          {
            "start": 1436.559,
            "duration": 3.761,
            "text": {
              "en": "another surface. That's really the only"
            }
          },
          {
            "start": 1438.48,
            "duration": 4.16,
            "text": {
              "en": "time that I'm like leaving the app to do"
            }
          },
          {
            "start": 1440.32,
            "duration": 4.239,
            "text": {
              "en": "something."
            }
          },
          {
            "start": 1442.64,
            "duration": 4.08,
            "text": {
              "en": "That's brilliant. Thank you."
            }
          },
          {
            "start": 1444.559,
            "duration": 6.161,
            "text": {
              "en": "Sweet. All right, we'll do one more and"
            }
          },
          {
            "start": 1446.72,
            "duration": 5.36,
            "text": {
              "en": "then we'll keep going. Alex, please uh"
            }
          },
          {
            "start": 1450.72,
            "duration": 2.319,
            "text": {
              "en": "uh introduce yourself and ask your"
            }
          },
          {
            "start": 1452.08,
            "duration": 3.839,
            "text": {
              "en": "question."
            }
          },
          {
            "start": 1453.039,
            "duration": 7.041,
            "text": {
              "en": "Hi, uh my name is Alex. I'm a musician"
            }
          },
          {
            "start": 1455.919,
            "duration": 6.961,
            "text": {
              "en": "and uh I I do a lot of gigs and get uh"
            }
          },
          {
            "start": 1460.08,
            "duration": 5.04,
            "text": {
              "en": "emails from clients all the time. Uh so"
            }
          },
          {
            "start": 1462.88,
            "duration": 4.96,
            "text": {
              "en": "I have to sort my leads from, you know,"
            }
          },
          {
            "start": 1465.12,
            "duration": 5.28,
            "text": {
              "en": "my newsletters and all thatformational"
            }
          },
          {
            "start": 1467.84,
            "duration": 7.199,
            "text": {
              "en": "stuff. So, how do you make sure that you"
            }
          },
          {
            "start": 1470.4,
            "duration": 6.56,
            "text": {
              "en": "prompt um uh codecs to um keep those"
            }
          },
          {
            "start": 1475.039,
            "duration": 4.161,
            "text": {
              "en": "emails safe for me, the ones that you"
            }
          },
          {
            "start": 1476.96,
            "duration": 4.8,
            "text": {
              "en": "know that require a personalized"
            }
          },
          {
            "start": 1479.2,
            "duration": 3.839,
            "text": {
              "en": "response and and um I just want to make"
            }
          },
          {
            "start": 1481.76,
            "duration": 4.72,
            "text": {
              "en": "sure that you know I don't send"
            }
          },
          {
            "start": 1483.039,
            "duration": 4.961,
            "text": {
              "en": "something that, you know, loses me money"
            }
          },
          {
            "start": 1486.48,
            "duration": 6.4,
            "text": {
              "en": "or something."
            }
          },
          {
            "start": 1488,
            "duration": 8,
            "text": {
              "en": "Yeah. Um, so for me personally, I rely a"
            }
          },
          {
            "start": 1492.88,
            "duration": 5.52,
            "text": {
              "en": "lot on Kora, the internal like the the"
            }
          },
          {
            "start": 1496,
            "duration": 4.32,
            "text": {
              "en": "app that uh Kieran runs at every for"
            }
          },
          {
            "start": 1498.4,
            "duration": 4.08,
            "text": {
              "en": "like the AI email assistant that's a"
            }
          },
          {
            "start": 1500.32,
            "duration": 4.239,
            "text": {
              "en": "part of the every subscription. It's"
            }
          },
          {
            "start": 1502.48,
            "duration": 6.799,
            "text": {
              "en": "it's really helpful now that inside of"
            }
          },
          {
            "start": 1504.559,
            "duration": 8.161,
            "text": {
              "en": "Kora there is a um like a CLI and an API"
            }
          },
          {
            "start": 1509.279,
            "duration": 6.481,
            "text": {
              "en": "connector that I can work in codeex and"
            }
          },
          {
            "start": 1512.72,
            "duration": 6.959,
            "text": {
              "en": "tell it tell Kora which is managing my"
            }
          },
          {
            "start": 1515.76,
            "duration": 6.799,
            "text": {
              "en": "email filtering and uh my email rules"
            }
          },
          {
            "start": 1519.679,
            "duration": 4.801,
            "text": {
              "en": "what I want and what I value. Um, the"
            }
          },
          {
            "start": 1522.559,
            "duration": 4.24,
            "text": {
              "en": "way I do that is the same thing I would"
            }
          },
          {
            "start": 1524.48,
            "duration": 5.28,
            "text": {
              "en": "recommend whether you use Kora or not,"
            }
          },
          {
            "start": 1526.799,
            "duration": 4.561,
            "text": {
              "en": "which is to have the agent interview you"
            }
          },
          {
            "start": 1529.76,
            "duration": 4.32,
            "text": {
              "en": "to get an understanding of what the"
            }
          },
          {
            "start": 1531.36,
            "duration": 5.28,
            "text": {
              "en": "rules should be. I always find that I"
            }
          },
          {
            "start": 1534.08,
            "duration": 5.04,
            "text": {
              "en": "get a better result rather than saying"
            }
          },
          {
            "start": 1536.64,
            "duration": 4.96,
            "text": {
              "en": "what I think the rules should be. Um,"
            }
          },
          {
            "start": 1539.12,
            "duration": 4.64,
            "text": {
              "en": "and so I will I'll do a brain dump using"
            }
          },
          {
            "start": 1541.6,
            "duration": 3.76,
            "text": {
              "en": "Monologue, our speech to text app,"
            }
          },
          {
            "start": 1543.76,
            "duration": 3.84,
            "text": {
              "en": "saying, \"Here's the problem I'm facing."
            }
          },
          {
            "start": 1545.36,
            "duration": 4.559,
            "text": {
              "en": "My email's a mess. Let's figure out how"
            }
          },
          {
            "start": 1547.6,
            "duration": 3.84,
            "text": {
              "en": "to triage it.\" I think it would work"
            }
          },
          {
            "start": 1549.919,
            "duration": 3.921,
            "text": {
              "en": "perfectly well if you wanted to try"
            }
          },
          {
            "start": 1551.44,
            "duration": 4.32,
            "text": {
              "en": "starting it as an automation in in"
            }
          },
          {
            "start": 1553.84,
            "duration": 3.68,
            "text": {
              "en": "codeex or a rule in codeex of saying"
            }
          },
          {
            "start": 1555.76,
            "duration": 3.519,
            "text": {
              "en": "like I think these are the things I want"
            }
          },
          {
            "start": 1557.52,
            "duration": 3.44,
            "text": {
              "en": "to make sure I get I think these are the"
            }
          },
          {
            "start": 1559.279,
            "duration": 4,
            "text": {
              "en": "rules I want to set of like never send"
            }
          },
          {
            "start": 1560.96,
            "duration": 4.48,
            "text": {
              "en": "anything for me only draft I think I"
            }
          },
          {
            "start": 1563.279,
            "duration": 4.961,
            "text": {
              "en": "want to go through all emails at 3M on"
            }
          },
          {
            "start": 1565.44,
            "duration": 5.359,
            "text": {
              "en": "on weekdays but um go take a look at all"
            }
          },
          {
            "start": 1568.24,
            "duration": 4.559,
            "text": {
              "en": "my email go do a search spawn sub agents"
            }
          },
          {
            "start": 1570.799,
            "duration": 3.921,
            "text": {
              "en": "to do a search I'm always telling codeex"
            }
          },
          {
            "start": 1572.799,
            "duration": 5.201,
            "text": {
              "en": "to spawn sub aents to do different types"
            }
          },
          {
            "start": 1574.72,
            "duration": 6.24,
            "text": {
              "en": "of work um across different workflows"
            }
          },
          {
            "start": 1578,
            "duration": 4.799,
            "text": {
              "en": "and then um come back with a plan. Uh"
            }
          },
          {
            "start": 1580.96,
            "duration": 4.4,
            "text": {
              "en": "come back with a plan for like how"
            }
          },
          {
            "start": 1582.799,
            "duration": 5.681,
            "text": {
              "en": "you're going to set up my my email and"
            }
          },
          {
            "start": 1585.36,
            "duration": 5.6,
            "text": {
              "en": "then um you can read the plan and see,"
            }
          },
          {
            "start": 1588.48,
            "duration": 5.439,
            "text": {
              "en": "oh, it looks like it's actually going to"
            }
          },
          {
            "start": 1590.96,
            "duration": 4.4,
            "text": {
              "en": "um brief or summarize or autoarchchive"
            }
          },
          {
            "start": 1593.919,
            "duration": 3.76,
            "text": {
              "en": "something that might lead to making"
            }
          },
          {
            "start": 1595.36,
            "duration": 5.76,
            "text": {
              "en": "money for you. And that's where you can"
            }
          },
          {
            "start": 1597.679,
            "duration": 6.721,
            "text": {
              "en": "tweak it. And then uh the other step I"
            }
          },
          {
            "start": 1601.12,
            "duration": 6.64,
            "text": {
              "en": "take is that I set um reminders for"
            }
          },
          {
            "start": 1604.4,
            "duration": 6.48,
            "text": {
              "en": "myself um in I use to-d doists for all"
            }
          },
          {
            "start": 1607.76,
            "duration": 4.88,
            "text": {
              "en": "of my like reminder task tracking. It's"
            }
          },
          {
            "start": 1610.88,
            "duration": 4.32,
            "text": {
              "en": "also connected to codeex. So I can just"
            }
          },
          {
            "start": 1612.64,
            "duration": 4.56,
            "text": {
              "en": "message codeex or message my open claw"
            }
          },
          {
            "start": 1615.2,
            "duration": 5.04,
            "text": {
              "en": "and say like just add this reminder to"
            }
          },
          {
            "start": 1617.2,
            "duration": 5.76,
            "text": {
              "en": "my schedule to to check how the new"
            }
          },
          {
            "start": 1620.24,
            "duration": 5.76,
            "text": {
              "en": "automation is working um and like do do"
            }
          },
          {
            "start": 1622.96,
            "duration": 6.48,
            "text": {
              "en": "an audit of it so you can see like it's"
            }
          },
          {
            "start": 1626,
            "duration": 5.36,
            "text": {
              "en": "been 72 hours. Let's see if I'm see if"
            }
          },
          {
            "start": 1629.44,
            "duration": 3.2,
            "text": {
              "en": "I've missed anything. You can prompt the"
            }
          },
          {
            "start": 1631.36,
            "duration": 3.439,
            "text": {
              "en": "model to see like what have you been"
            }
          },
          {
            "start": 1632.64,
            "duration": 5.36,
            "text": {
              "en": "archiving. And I find that really"
            }
          },
          {
            "start": 1634.799,
            "duration": 6.081,
            "text": {
              "en": "helpful. But I I I'm really excited by"
            }
          },
          {
            "start": 1638,
            "duration": 4.88,
            "text": {
              "en": "all of the work our product GMs at every"
            }
          },
          {
            "start": 1640.88,
            "duration": 5.2,
            "text": {
              "en": "have been doing to make it so that I can"
            }
          },
          {
            "start": 1642.88,
            "duration": 6,
            "text": {
              "en": "just prompt codeex or cloud code or you"
            }
          },
          {
            "start": 1646.08,
            "duration": 5.28,
            "text": {
              "en": "know inside of cursor any agent to"
            }
          },
          {
            "start": 1648.88,
            "duration": 4.96,
            "text": {
              "en": "manipulate those apps how I want. It"
            }
          },
          {
            "start": 1651.36,
            "duration": 4,
            "text": {
              "en": "works really well with with uh our other"
            }
          },
          {
            "start": 1653.84,
            "duration": 5.36,
            "text": {
              "en": "tools also."
            }
          },
          {
            "start": 1655.36,
            "duration": 6.16,
            "text": {
              "en": "Thanks Alex. I will I will add to that"
            }
          },
          {
            "start": 1659.2,
            "duration": 3.839,
            "text": {
              "en": "like one of the things that we found"
            }
          },
          {
            "start": 1661.52,
            "duration": 3.68,
            "text": {
              "en": "basically because Austin started doing"
            }
          },
          {
            "start": 1663.039,
            "duration": 3.841,
            "text": {
              "en": "it I sort of was like oh that's really"
            }
          },
          {
            "start": 1665.2,
            "duration": 3.2,
            "text": {
              "en": "interesting is that Austin started we"
            }
          },
          {
            "start": 1666.88,
            "duration": 3.52,
            "text": {
              "en": "have plus ones which is our hosted"
            }
          },
          {
            "start": 1668.4,
            "duration": 5.759,
            "text": {
              "en": "openclaw and Austin started setting up"
            }
          },
          {
            "start": 1670.4,
            "duration": 6.639,
            "text": {
              "en": "his plus ones with codecs and cloud code"
            }
          },
          {
            "start": 1674.159,
            "duration": 6.161,
            "text": {
              "en": "and realized that it's just a much"
            }
          },
          {
            "start": 1677.039,
            "duration": 6,
            "text": {
              "en": "better experience so rather than for"
            }
          },
          {
            "start": 1680.32,
            "duration": 4.4,
            "text": {
              "en": "example the earlier version of plus ones"
            }
          },
          {
            "start": 1683.039,
            "duration": 3.36,
            "text": {
              "en": "we had like a whole dashboard and a"
            }
          },
          {
            "start": 1684.72,
            "duration": 3.12,
            "text": {
              "en": "whole onboarding experience"
            }
          },
          {
            "start": 1686.399,
            "duration": 2.88,
            "text": {
              "en": "where you had to kind of manually click"
            }
          },
          {
            "start": 1687.84,
            "duration": 4.24,
            "text": {
              "en": "a bunch of buttons and give it a lot of"
            }
          },
          {
            "start": 1689.279,
            "duration": 7.841,
            "text": {
              "en": "context. It's much easier if we just"
            }
          },
          {
            "start": 1692.08,
            "duration": 6.959,
            "text": {
              "en": "expose um plus ones via a CLI to uh"
            }
          },
          {
            "start": 1697.12,
            "duration": 3.84,
            "text": {
              "en": "codeex or cloud code and then you can"
            }
          },
          {
            "start": 1699.039,
            "duration": 3.281,
            "text": {
              "en": "just like talk to codeex and it will"
            }
          },
          {
            "start": 1700.96,
            "duration": 2.24,
            "text": {
              "en": "take everything it knows about you from"
            }
          },
          {
            "start": 1702.32,
            "duration": 4,
            "text": {
              "en": "your computer and your past"
            }
          },
          {
            "start": 1703.2,
            "duration": 5.04,
            "text": {
              "en": "conversations and throw it into um throw"
            }
          },
          {
            "start": 1706.32,
            "duration": 3.52,
            "text": {
              "en": "it into a plus one setup and and"
            }
          },
          {
            "start": 1708.24,
            "duration": 5.28,
            "text": {
              "en": "Austin's showing this and it's it's like"
            }
          },
          {
            "start": 1709.84,
            "duration": 5.76,
            "text": {
              "en": "a it's really powerful and it's it's"
            }
          },
          {
            "start": 1713.52,
            "duration": 4.08,
            "text": {
              "en": "part of what I'm saying about how the"
            }
          },
          {
            "start": 1715.6,
            "duration": 4.64,
            "text": {
              "en": "world is changing when you assume every"
            }
          },
          {
            "start": 1717.6,
            "duration": 4.64,
            "text": {
              "en": "user has access to an agent like this."
            }
          },
          {
            "start": 1720.24,
            "duration": 3.52,
            "text": {
              "en": "uh because we don't have to have a"
            }
          },
          {
            "start": 1722.24,
            "duration": 3.6,
            "text": {
              "en": "settings dashboard. We don't have to"
            }
          },
          {
            "start": 1723.76,
            "duration": 3.519,
            "text": {
              "en": "have an onboarding experience. Um we"
            }
          },
          {
            "start": 1725.84,
            "duration": 3.36,
            "text": {
              "en": "don't have to gather as much context"
            }
          },
          {
            "start": 1727.279,
            "duration": 3.361,
            "text": {
              "en": "manually. It can just be given to us for"
            }
          },
          {
            "start": 1729.2,
            "duration": 3.12,
            "text": {
              "en": "free by codeex. And that's really"
            }
          },
          {
            "start": 1730.64,
            "duration": 3.919,
            "text": {
              "en": "interesting."
            }
          },
          {
            "start": 1732.32,
            "duration": 3.52,
            "text": {
              "en": "Yeah. One of my favorite use cases was I"
            }
          },
          {
            "start": 1734.559,
            "duration": 3.36,
            "text": {
              "en": "got I got really inspired by this"
            }
          },
          {
            "start": 1735.84,
            "duration": 3.92,
            "text": {
              "en": "interview Clarebo did with Lenny where"
            }
          },
          {
            "start": 1737.919,
            "duration": 4.561,
            "text": {
              "en": "she said how much of a breakthrough she"
            }
          },
          {
            "start": 1739.76,
            "duration": 6.159,
            "text": {
              "en": "had when she stopped trying to just use"
            }
          },
          {
            "start": 1742.48,
            "duration": 6.4,
            "text": {
              "en": "an individual open claw as like a master"
            }
          },
          {
            "start": 1745.919,
            "duration": 6.48,
            "text": {
              "en": "supercharged open claw and had this"
            }
          },
          {
            "start": 1748.88,
            "duration": 5.679,
            "text": {
              "en": "suite of six like specified open claws."
            }
          },
          {
            "start": 1752.399,
            "duration": 4.961,
            "text": {
              "en": "I think that applies to any kind of like"
            }
          },
          {
            "start": 1754.559,
            "duration": 4.961,
            "text": {
              "en": "agent like there's the new uh chatbt"
            }
          },
          {
            "start": 1757.36,
            "duration": 3.52,
            "text": {
              "en": "like provisional agents like I I got"
            }
          },
          {
            "start": 1759.52,
            "duration": 4.399,
            "text": {
              "en": "hooked on that. I think Cla's point was"
            }
          },
          {
            "start": 1760.88,
            "duration": 5.039,
            "text": {
              "en": "really good and my path towards making"
            }
          },
          {
            "start": 1763.919,
            "duration": 4.161,
            "text": {
              "en": "this suite of agents to help with the"
            }
          },
          {
            "start": 1765.919,
            "duration": 5.76,
            "text": {
              "en": "growth function at every was just going"
            }
          },
          {
            "start": 1768.08,
            "duration": 5.52,
            "text": {
              "en": "to codeex going to this folder. Um I I"
            }
          },
          {
            "start": 1771.679,
            "duration": 3.6,
            "text": {
              "en": "actually just sent it the transcript of"
            }
          },
          {
            "start": 1773.6,
            "duration": 3.76,
            "text": {
              "en": "Claire's interview with Lenny and said"
            }
          },
          {
            "start": 1775.279,
            "duration": 3.76,
            "text": {
              "en": "like I want to do this too given"
            }
          },
          {
            "start": 1777.36,
            "duration": 4.88,
            "text": {
              "en": "everything you know about me and my"
            }
          },
          {
            "start": 1779.039,
            "duration": 5.76,
            "text": {
              "en": "work. Um make a plan to suggest six"
            }
          },
          {
            "start": 1782.24,
            "duration": 4.96,
            "text": {
              "en": "agents that we should provision into our"
            }
          },
          {
            "start": 1784.799,
            "duration": 4.48,
            "text": {
              "en": "Slack. Um, consider the fact that we"
            }
          },
          {
            "start": 1787.2,
            "duration": 3.92,
            "text": {
              "en": "might want to make some of them notion"
            }
          },
          {
            "start": 1789.279,
            "duration": 3.28,
            "text": {
              "en": "custom agents, which I find work really"
            }
          },
          {
            "start": 1791.12,
            "duration": 3.279,
            "text": {
              "en": "well, is just like do the same thing"
            }
          },
          {
            "start": 1792.559,
            "duration": 3.36,
            "text": {
              "en": "every day, every time. Some of them"
            }
          },
          {
            "start": 1794.399,
            "duration": 3.681,
            "text": {
              "en": "might need to be smarter automations,"
            }
          },
          {
            "start": 1795.919,
            "duration": 4.161,
            "text": {
              "en": "but like do that, come up with a plan."
            }
          },
          {
            "start": 1798.08,
            "duration": 4.24,
            "text": {
              "en": "The planet made was really good and like"
            }
          },
          {
            "start": 1800.08,
            "duration": 4.4,
            "text": {
              "en": "I tweaked it a bit um after seeing it,"
            }
          },
          {
            "start": 1802.32,
            "duration": 4,
            "text": {
              "en": "but there's that. And then now I have"
            }
          },
          {
            "start": 1804.48,
            "duration": 4.16,
            "text": {
              "en": "this suite of six agents in our in our"
            }
          },
          {
            "start": 1806.32,
            "duration": 4.079,
            "text": {
              "en": "Slack that that work really well for me."
            }
          },
          {
            "start": 1808.64,
            "duration": 3.519,
            "text": {
              "en": "They still break. Like I I find when"
            }
          },
          {
            "start": 1810.399,
            "duration": 3.041,
            "text": {
              "en": "you're making open calls and personal"
            }
          },
          {
            "start": 1812.159,
            "duration": 2.481,
            "text": {
              "en": "agents right now, like they're going to"
            }
          },
          {
            "start": 1813.44,
            "duration": 3.04,
            "text": {
              "en": "you should accept they're going to break"
            }
          },
          {
            "start": 1814.64,
            "duration": 3.2,
            "text": {
              "en": "a bit. But the really powerful thing is"
            }
          },
          {
            "start": 1816.48,
            "duration": 4.319,
            "text": {
              "en": "that rather than going back and forth"
            }
          },
          {
            "start": 1817.84,
            "duration": 4.959,
            "text": {
              "en": "with the agent or getting frustrated, um"
            }
          },
          {
            "start": 1820.799,
            "duration": 5.76,
            "text": {
              "en": "I just go to Codex and I'm like I I"
            }
          },
          {
            "start": 1822.799,
            "duration": 6.081,
            "text": {
              "en": "either screenshot or I can at Slack in"
            }
          },
          {
            "start": 1826.559,
            "duration": 3.761,
            "text": {
              "en": "Codeex and say like go find this"
            }
          },
          {
            "start": 1828.88,
            "duration": 3.36,
            "text": {
              "en": "conversation where this stupid thing"
            }
          },
          {
            "start": 1830.32,
            "duration": 4.16,
            "text": {
              "en": "happened and fix it. And it it does a"
            }
          },
          {
            "start": 1832.24,
            "duration": 4.08,
            "text": {
              "en": "really good job of just like changing"
            }
          },
          {
            "start": 1834.48,
            "duration": 5.04,
            "text": {
              "en": "the architecture of the agent and making"
            }
          },
          {
            "start": 1836.32,
            "duration": 5.599,
            "text": {
              "en": "a fix from there."
            }
          },
          {
            "start": 1839.52,
            "duration": 4.639,
            "text": {
              "en": "I love that. Um, yeah, it's it's just a"
            }
          },
          {
            "start": 1841.919,
            "duration": 5.12,
            "text": {
              "en": "it's such a it's such a step change in"
            }
          },
          {
            "start": 1844.159,
            "duration": 4.721,
            "text": {
              "en": "how you work and uh now now I want to"
            }
          },
          {
            "start": 1847.039,
            "duration": 2.481,
            "text": {
              "en": "paste that CLA interview too."
            }
          },
          {
            "start": 1848.88,
            "duration": 2.32,
            "text": {
              "en": "Um, [laughter]"
            }
          },
          {
            "start": 1849.52,
            "duration": 2.879,
            "text": {
              "en": "I want I want to show one I want to show"
            }
          },
          {
            "start": 1851.2,
            "duration": 2.64,
            "text": {
              "en": "one thing that I like this is like kind"
            }
          },
          {
            "start": 1852.399,
            "duration": 4.64,
            "text": {
              "en": "of actually my favorite way to use this"
            }
          },
          {
            "start": 1853.84,
            "duration": 6.24,
            "text": {
              "en": "stuff for for knowledge work. Um, it's a"
            }
          },
          {
            "start": 1857.039,
            "duration": 4.481,
            "text": {
              "en": "thing that I like wish I had for so much"
            }
          },
          {
            "start": 1860.08,
            "duration": 3.52,
            "text": {
              "en": "of my career because this is one of the"
            }
          },
          {
            "start": 1861.52,
            "duration": 4.159,
            "text": {
              "en": "most like time consuming to me like"
            }
          },
          {
            "start": 1863.6,
            "duration": 6.16,
            "text": {
              "en": "frustrating things about about knowledge"
            }
          },
          {
            "start": 1865.679,
            "duration": 6.24,
            "text": {
              "en": "work is that we are uh doing a a real go"
            }
          },
          {
            "start": 1869.76,
            "duration": 4.159,
            "text": {
              "en": "to market market public launch for plus"
            }
          },
          {
            "start": 1871.919,
            "duration": 4.48,
            "text": {
              "en": "one soon. We're very excited about it"
            }
          },
          {
            "start": 1873.919,
            "duration": 4.801,
            "text": {
              "en": "and we've been having a bunch of"
            }
          },
          {
            "start": 1876.399,
            "duration": 4.88,
            "text": {
              "en": "internal meetings and Slack"
            }
          },
          {
            "start": 1878.72,
            "duration": 4.64,
            "text": {
              "en": "conversations around like how are we"
            }
          },
          {
            "start": 1881.279,
            "duration": 5.12,
            "text": {
              "en": "taking this to market? What is the"
            }
          },
          {
            "start": 1883.36,
            "duration": 5.84,
            "text": {
              "en": "strategy? What are we going to do? Um,"
            }
          },
          {
            "start": 1886.399,
            "duration": 5.201,
            "text": {
              "en": "and we've done all of the work that like"
            }
          },
          {
            "start": 1889.2,
            "duration": 4.479,
            "text": {
              "en": "kind of like only humans can do, the"
            }
          },
          {
            "start": 1891.6,
            "duration": 4.559,
            "text": {
              "en": "like marketing case, the business case,"
            }
          },
          {
            "start": 1893.679,
            "duration": 4,
            "text": {
              "en": "the like the narratives and stuff. Not"
            }
          },
          {
            "start": 1896.159,
            "duration": 2.64,
            "text": {
              "en": "all of it is as refined as it needs to"
            }
          },
          {
            "start": 1897.679,
            "duration": 4.801,
            "text": {
              "en": "be because it still needs to be refined,"
            }
          },
          {
            "start": 1898.799,
            "duration": 7.201,
            "text": {
              "en": "but it's all sitting somewhere. And um,"
            }
          },
          {
            "start": 1902.48,
            "duration": 5.439,
            "text": {
              "en": "I had all these plans this week to make"
            }
          },
          {
            "start": 1906,
            "duration": 4.24,
            "text": {
              "en": "the go to market plan, which is like one"
            }
          },
          {
            "start": 1907.919,
            "duration": 3.6,
            "text": {
              "en": "thing I'm responsible for. And an"
            }
          },
          {
            "start": 1910.24,
            "duration": 3.279,
            "text": {
              "en": "inevitable thing that happens that"
            }
          },
          {
            "start": 1911.519,
            "duration": 3.76,
            "text": {
              "en": "happens in everyone's job is like all"
            }
          },
          {
            "start": 1913.519,
            "duration": 3.921,
            "text": {
              "en": "this stuff came up like I've got to do"
            }
          },
          {
            "start": 1915.279,
            "duration": 5.601,
            "text": {
              "en": "interviews for hiring. We found out the"
            }
          },
          {
            "start": 1917.44,
            "duration": 5.28,
            "text": {
              "en": "release date for the new JBT model. Um"
            }
          },
          {
            "start": 1920.88,
            "duration": 3.84,
            "text": {
              "en": "and so I had a day I think it was"
            }
          },
          {
            "start": 1922.72,
            "duration": 4.24,
            "text": {
              "en": "Tuesday in between meetings where I'm"
            }
          },
          {
            "start": 1924.72,
            "duration": 4.88,
            "text": {
              "en": "just kind of like I'm prompting codeex"
            }
          },
          {
            "start": 1926.96,
            "duration": 4.24,
            "text": {
              "en": "this way of hey I I I've kind of done"
            }
          },
          {
            "start": 1929.6,
            "duration": 4.48,
            "text": {
              "en": "most of the work right like in our"
            }
          },
          {
            "start": 1931.2,
            "duration": 4.319,
            "text": {
              "en": "notion every meeting is recorded in a"
            }
          },
          {
            "start": 1934.08,
            "duration": 3.36,
            "text": {
              "en": "single place and all the transcripts are"
            }
          },
          {
            "start": 1935.519,
            "duration": 4.64,
            "text": {
              "en": "there. We've can we talked about this a"
            }
          },
          {
            "start": 1937.44,
            "duration": 5.92,
            "text": {
              "en": "bunch in Slack. I have a template for a"
            }
          },
          {
            "start": 1940.159,
            "duration": 5.601,
            "text": {
              "en": "go to market plan that I really like and"
            }
          },
          {
            "start": 1943.36,
            "duration": 4.48,
            "text": {
              "en": "I can go to codeex and say like could"
            }
          },
          {
            "start": 1945.76,
            "duration": 3.279,
            "text": {
              "en": "you just make the plan like and in my"
            }
          },
          {
            "start": 1947.84,
            "duration": 3.199,
            "text": {
              "en": "head what I'm thinking is like maybe"
            }
          },
          {
            "start": 1949.039,
            "duration": 4.24,
            "text": {
              "en": "it'll get like a six out of 10 or a"
            }
          },
          {
            "start": 1951.039,
            "duration": 5.041,
            "text": {
              "en": "seven out of 10 and we can keep nudging"
            }
          },
          {
            "start": 1953.279,
            "duration": 5.12,
            "text": {
              "en": "and I can keep like going along and so"
            }
          },
          {
            "start": 1956.08,
            "duration": 3.76,
            "text": {
              "en": "it uh it does that. What I'm asking for"
            }
          },
          {
            "start": 1958.399,
            "duration": 2.88,
            "text": {
              "en": "is like why don't you start by make"
            }
          },
          {
            "start": 1959.84,
            "duration": 3.76,
            "text": {
              "en": "doing the compound engineering"
            }
          },
          {
            "start": 1961.279,
            "duration": 5.441,
            "text": {
              "en": "brainstorm step to to just ship a proof"
            }
          },
          {
            "start": 1963.6,
            "duration": 6.799,
            "text": {
              "en": "doc and I can see how close you are and"
            }
          },
          {
            "start": 1966.72,
            "duration": 5.36,
            "text": {
              "en": "um I one thing that it doesn't really do"
            }
          },
          {
            "start": 1970.399,
            "duration": 3.361,
            "text": {
              "en": "super well unless I tell it to and I"
            }
          },
          {
            "start": 1972.08,
            "duration": 3.92,
            "text": {
              "en": "want to install this as like a a"
            }
          },
          {
            "start": 1973.76,
            "duration": 4.96,
            "text": {
              "en": "workflow is it it doesn't go read our"
            }
          },
          {
            "start": 1976,
            "duration": 4.559,
            "text": {
              "en": "calendar of upcoming posts and launches"
            }
          },
          {
            "start": 1978.72,
            "duration": 3.12,
            "text": {
              "en": "and so as it was going I was like oh you"
            }
          },
          {
            "start": 1980.559,
            "duration": 2.801,
            "text": {
              "en": "always forget this this is the message"
            }
          },
          {
            "start": 1981.84,
            "duration": 2.8,
            "text": {
              "en": "I'm sending of like actually look at"
            }
          },
          {
            "start": 1983.36,
            "duration": 2.48,
            "text": {
              "en": "everything that's scheduled because I"
            }
          },
          {
            "start": 1984.64,
            "duration": 5.919,
            "text": {
              "en": "have to account for that in the go to"
            }
          },
          {
            "start": 1985.84,
            "duration": 7.6,
            "text": {
              "en": "market plan Um, and then it makes a uh"
            }
          },
          {
            "start": 1990.559,
            "duration": 4.48,
            "text": {
              "en": "makes a plan as a proof talk. I went and"
            }
          },
          {
            "start": 1993.44,
            "duration": 2.8,
            "text": {
              "en": "looked at it and I was like again I I"
            }
          },
          {
            "start": 1995.039,
            "duration": 2.561,
            "text": {
              "en": "maybe have five minutes in between"
            }
          },
          {
            "start": 1996.24,
            "duration": 3.279,
            "text": {
              "en": "meetings and I'm like this is really"
            }
          },
          {
            "start": 1997.6,
            "duration": 4.88,
            "text": {
              "en": "good. Like you kind of have every you"
            }
          },
          {
            "start": 1999.519,
            "duration": 5.52,
            "text": {
              "en": "have the architecture enough that um I"
            }
          },
          {
            "start": 2002.48,
            "duration": 6,
            "text": {
              "en": "want you to like factor in one other"
            }
          },
          {
            "start": 2005.039,
            "duration": 6.081,
            "text": {
              "en": "change and then just ship the plan to"
            }
          },
          {
            "start": 2008.48,
            "duration": 5.039,
            "text": {
              "en": "notion. and the plan it shipped to"
            }
          },
          {
            "start": 2011.12,
            "duration": 4.48,
            "text": {
              "en": "notion. I was reading it and I was like"
            }
          },
          {
            "start": 2013.519,
            "duration": 4.561,
            "text": {
              "en": "this is basically"
            }
          },
          {
            "start": 2015.6,
            "duration": 5.52,
            "text": {
              "en": "80 to 90% of the way there. And that's"
            }
          },
          {
            "start": 2018.08,
            "duration": 5.439,
            "text": {
              "en": "that's not because it I'm relying on the"
            }
          },
          {
            "start": 2021.12,
            "duration": 4.159,
            "text": {
              "en": "model to come up with our go to market"
            }
          },
          {
            "start": 2023.519,
            "duration": 5.28,
            "text": {
              "en": "strategy. It's that I'm relying on the"
            }
          },
          {
            "start": 2025.279,
            "duration": 5.28,
            "text": {
              "en": "model to um look at all of the things"
            }
          },
          {
            "start": 2028.799,
            "duration": 3.841,
            "text": {
              "en": "that we've already said and thought"
            }
          },
          {
            "start": 2030.559,
            "duration": 4.641,
            "text": {
              "en": "about the go to market strategy, piece"
            }
          },
          {
            "start": 2032.64,
            "duration": 4.639,
            "text": {
              "en": "it together, and then review it, right?"
            }
          },
          {
            "start": 2035.2,
            "duration": 4.479,
            "text": {
              "en": "Come with what will work with what's"
            }
          },
          {
            "start": 2037.279,
            "duration": 4.161,
            "text": {
              "en": "not. There's a lot of important context"
            }
          },
          {
            "start": 2039.679,
            "duration": 3.681,
            "text": {
              "en": "loading that happens here where like it"
            }
          },
          {
            "start": 2041.44,
            "duration": 4.56,
            "text": {
              "en": "knows what our target ICP is. It knows"
            }
          },
          {
            "start": 2043.36,
            "duration": 6.64,
            "text": {
              "en": "what our goals are. It knows how we"
            }
          },
          {
            "start": 2046,
            "duration": 6.079,
            "text": {
              "en": "think about narrative positioning. And"
            }
          },
          {
            "start": 2050,
            "duration": 4.159,
            "text": {
              "en": "before this was possible, the only thing"
            }
          },
          {
            "start": 2052.079,
            "duration": 5.201,
            "text": {
              "en": "I could have done was either block off a"
            }
          },
          {
            "start": 2054.159,
            "duration": 5.68,
            "text": {
              "en": "whole day to sit and do this or get done"
            }
          },
          {
            "start": 2057.28,
            "duration": 5.119,
            "text": {
              "en": "with my work for the day at like 6 or 7"
            }
          },
          {
            "start": 2059.839,
            "duration": 4.32,
            "text": {
              "en": "and then stay up all night writing this."
            }
          },
          {
            "start": 2062.399,
            "duration": 4.161,
            "text": {
              "en": "And this has been such a game changer"
            }
          },
          {
            "start": 2064.159,
            "duration": 4.401,
            "text": {
              "en": "for me. And the the other part of it"
            }
          },
          {
            "start": 2066.56,
            "duration": 5.279,
            "text": {
              "en": "that I think I found is really helpful"
            }
          },
          {
            "start": 2068.56,
            "duration": 5.2,
            "text": {
              "en": "is that I I don't make this plan for"
            }
          },
          {
            "start": 2071.839,
            "duration": 3.601,
            "text": {
              "en": "humans. I make this plan for humans and"
            }
          },
          {
            "start": 2073.76,
            "duration": 4.24,
            "text": {
              "en": "agents and primarily for humans to"
            }
          },
          {
            "start": 2075.44,
            "duration": 4.959,
            "text": {
              "en": "understand through agents. And so when I"
            }
          },
          {
            "start": 2078,
            "duration": 4.56,
            "text": {
              "en": "sent it to the team working on the go to"
            }
          },
          {
            "start": 2080.399,
            "duration": 4.641,
            "text": {
              "en": "market, they can read it and it's like"
            }
          },
          {
            "start": 2082.56,
            "duration": 3.92,
            "text": {
              "en": "digestible to humans. But the the thing"
            }
          },
          {
            "start": 2085.04,
            "duration": 3.28,
            "text": {
              "en": "that it's really helpful for is like"
            }
          },
          {
            "start": 2086.48,
            "duration": 4.24,
            "text": {
              "en": "it's the full plan sectioned off"
            }
          },
          {
            "start": 2088.32,
            "duration": 4.799,
            "text": {
              "en": "allin-one. And so Brandon, our COO,"
            }
          },
          {
            "start": 2090.72,
            "duration": 4.32,
            "text": {
              "en": "who's like deep in this product, can ask"
            }
          },
          {
            "start": 2093.119,
            "duration": 3.681,
            "text": {
              "en": "his plus one, can ask codeex, you know,"
            }
          },
          {
            "start": 2095.04,
            "duration": 3.6,
            "text": {
              "en": "it's called code, like let me know what"
            }
          },
          {
            "start": 2096.8,
            "duration": 3.92,
            "text": {
              "en": "Austin's plan is, like summarize it for"
            }
          },
          {
            "start": 2098.64,
            "duration": 3.52,
            "text": {
              "en": "me. Let me know the business case."
            }
          },
          {
            "start": 2100.72,
            "duration": 3.76,
            "text": {
              "en": "Brandon has to come up with the pricing"
            }
          },
          {
            "start": 2102.16,
            "duration": 5.679,
            "text": {
              "en": "modeling for the plan so he can work"
            }
          },
          {
            "start": 2104.48,
            "duration": 5.44,
            "text": {
              "en": "with an agent against the plan. And um"
            }
          },
          {
            "start": 2107.839,
            "duration": 4.641,
            "text": {
              "en": "as someone who spent so much time in my"
            }
          },
          {
            "start": 2109.92,
            "duration": 4.32,
            "text": {
              "en": "career thinking about like literally how"
            }
          },
          {
            "start": 2112.48,
            "duration": 3.599,
            "text": {
              "en": "the the proposal or go to market"
            }
          },
          {
            "start": 2114.24,
            "duration": 4.16,
            "text": {
              "en": "document looks like how is it going to"
            }
          },
          {
            "start": 2116.079,
            "duration": 4.721,
            "text": {
              "en": "look when I present to the CEO like this"
            }
          },
          {
            "start": 2118.4,
            "duration": 4,
            "text": {
              "en": "two-page plan for for like a for a"
            }
          },
          {
            "start": 2120.8,
            "duration": 3.279,
            "text": {
              "en": "budget I'm asking for like is it going"
            }
          },
          {
            "start": 2122.4,
            "duration": 4.16,
            "text": {
              "en": "to make sense to their eyes and like"
            }
          },
          {
            "start": 2124.079,
            "duration": 3.841,
            "text": {
              "en": "really fine-tuning stuff. Giving up on"
            }
          },
          {
            "start": 2126.56,
            "duration": 2.72,
            "text": {
              "en": "that and just saying like is the plan"
            }
          },
          {
            "start": 2127.92,
            "duration": 3.52,
            "text": {
              "en": "really good and is it going to make"
            }
          },
          {
            "start": 2129.28,
            "duration": 4.799,
            "text": {
              "en": "sense to like Dan's agent if he approves"
            }
          },
          {
            "start": 2131.44,
            "duration": 4,
            "text": {
              "en": "it. Um for to me makes me work faster."
            }
          },
          {
            "start": 2134.079,
            "duration": 2.481,
            "text": {
              "en": "It makes the work better. It means that"
            }
          },
          {
            "start": 2135.44,
            "duration": 2.88,
            "text": {
              "en": "I don't have to think about all this"
            }
          },
          {
            "start": 2136.56,
            "duration": 5.44,
            "text": {
              "en": "like kind of dumb stuff that doesn't"
            }
          },
          {
            "start": 2138.32,
            "duration": 6.24,
            "text": {
              "en": "matter. Um that like it's to me a much"
            }
          },
          {
            "start": 2142,
            "duration": 4.8,
            "text": {
              "en": "more like powerful and fun way to work."
            }
          },
          {
            "start": 2144.56,
            "duration": 4.16,
            "text": {
              "en": "I totally totally agree with that. You"
            }
          },
          {
            "start": 2146.8,
            "duration": 3.84,
            "text": {
              "en": "said so many things that are interesting"
            }
          },
          {
            "start": 2148.72,
            "duration": 4.8,
            "text": {
              "en": "there. The first one is just normalize"
            }
          },
          {
            "start": 2150.64,
            "duration": 6,
            "text": {
              "en": "sending agent documents around. Um and"
            }
          },
          {
            "start": 2153.52,
            "duration": 5.12,
            "text": {
              "en": "that's why we have proof. Uh it's just"
            }
          },
          {
            "start": 2156.64,
            "duration": 4,
            "text": {
              "en": "such an easy way to send the markdown"
            }
          },
          {
            "start": 2158.64,
            "duration": 4.88,
            "text": {
              "en": "documents that we generate to each other"
            }
          },
          {
            "start": 2160.64,
            "duration": 4.64,
            "text": {
              "en": "and and to review them together. And"
            }
          },
          {
            "start": 2163.52,
            "duration": 3.599,
            "text": {
              "en": "it's like there I think there's this"
            }
          },
          {
            "start": 2165.28,
            "duration": 3.44,
            "text": {
              "en": "whole strand of AI stuff that's like"
            }
          },
          {
            "start": 2167.119,
            "duration": 3.361,
            "text": {
              "en": "make AI write in your voice. We even do"
            }
          },
          {
            "start": 2168.72,
            "duration": 3.68,
            "text": {
              "en": "this with Spiral, but there's this other"
            }
          },
          {
            "start": 2170.48,
            "duration": 3.92,
            "text": {
              "en": "strand of just like normalize AI writing"
            }
          },
          {
            "start": 2172.4,
            "duration": 4,
            "text": {
              "en": "because I would actually prefer to read"
            }
          },
          {
            "start": 2174.4,
            "duration": 4.64,
            "text": {
              "en": "your agents writing than your writing in"
            }
          },
          {
            "start": 2176.4,
            "duration": 4.88,
            "text": {
              "en": "a lot of cases because I know that it's"
            }
          },
          {
            "start": 2179.04,
            "duration": 4.48,
            "text": {
              "en": "just easier for you to get all that that"
            }
          },
          {
            "start": 2181.28,
            "duration": 3.92,
            "text": {
              "en": "thinking together in a format I can read"
            }
          },
          {
            "start": 2183.52,
            "duration": 4.96,
            "text": {
              "en": "if you if you have your agent write it."
            }
          },
          {
            "start": 2185.2,
            "duration": 6.24,
            "text": {
              "en": "The thing I care about is do you stand"
            }
          },
          {
            "start": 2188.48,
            "duration": 4.56,
            "text": {
              "en": "by it? Have you thought about it? And if"
            }
          },
          {
            "start": 2191.44,
            "duration": 3.44,
            "text": {
              "en": "I talk to you about it, will it be clear"
            }
          },
          {
            "start": 2193.04,
            "duration": 3.44,
            "text": {
              "en": "that if I talk about a particular bullet"
            }
          },
          {
            "start": 2194.88,
            "duration": 3.92,
            "text": {
              "en": "point in it, like you've thought that"
            }
          },
          {
            "start": 2196.48,
            "duration": 3.76,
            "text": {
              "en": "through? And as long as we have the"
            }
          },
          {
            "start": 2198.8,
            "duration": 4.48,
            "text": {
              "en": "trust that that's going to be the case,"
            }
          },
          {
            "start": 2200.24,
            "duration": 4.8,
            "text": {
              "en": "then I absolutely prefer the the agent"
            }
          },
          {
            "start": 2203.28,
            "duration": 4,
            "text": {
              "en": "version."
            }
          },
          {
            "start": 2205.04,
            "duration": 4.72,
            "text": {
              "en": "In the future, humans face a new"
            }
          },
          {
            "start": 2207.28,
            "duration": 5.12,
            "text": {
              "en": "problem. What do you do when your"
            }
          },
          {
            "start": 2209.76,
            "duration": 6.24,
            "text": {
              "en": "computer is doing your work for you? One"
            }
          },
          {
            "start": 2212.4,
            "duration": 6.11,
            "text": {
              "en": "answer, take a claw walk. An idea by"
            }
          },
          {
            "start": 2216,
            "duration": 4.53,
            "text": {
              "en": "every"
            }
          },
          {
            "start": 2218.51,
            "duration": 2.02,
            "text": {
              "en": "[music]"
            }
          },
          {
            "start": 2221.04,
            "duration": 4.559,
            "text": {
              "en": "the only subscription you need to stay"
            }
          },
          {
            "start": 2222.88,
            "duration": 5.12,
            "text": {
              "en": "at the edge of AI."
            }
          },
          {
            "start": 2225.599,
            "duration": 4.161,
            "text": {
              "en": "Totally. Like uh my friend Rachel Carden"
            }
          },
          {
            "start": 2228,
            "duration": 4.48,
            "text": {
              "en": "who runs the great like Substack"
            }
          },
          {
            "start": 2229.76,
            "duration": 4.56,
            "text": {
              "en": "newsletter link bio about uh social"
            }
          },
          {
            "start": 2232.48,
            "duration": 5.599,
            "text": {
              "en": "media had had a really good piece this"
            }
          },
          {
            "start": 2234.32,
            "duration": 6.08,
            "text": {
              "en": "week about frustrations for um uh people"
            }
          },
          {
            "start": 2238.079,
            "duration": 3.681,
            "text": {
              "en": "working in social for like every like"
            }
          },
          {
            "start": 2240.4,
            "duration": 4.64,
            "text": {
              "en": "this pressure they feel that everything"
            }
          },
          {
            "start": 2241.76,
            "duration": 5.359,
            "text": {
              "en": "has to run through AI and the quality"
            }
          },
          {
            "start": 2245.04,
            "duration": 4.24,
            "text": {
              "en": "going down and one reason why is that"
            }
          },
          {
            "start": 2247.119,
            "duration": 3.841,
            "text": {
              "en": "there's that dichotomy of like what do"
            }
          },
          {
            "start": 2249.28,
            "duration": 4,
            "text": {
              "en": "you actually stand behind like are you"
            }
          },
          {
            "start": 2250.96,
            "duration": 4.08,
            "text": {
              "en": "running something through AI and you"
            }
          },
          {
            "start": 2253.28,
            "duration": 3.52,
            "text": {
              "en": "like you know maybe your manager did it"
            }
          },
          {
            "start": 2255.04,
            "duration": 4.4,
            "text": {
              "en": "and they don't even know what it what it"
            }
          },
          {
            "start": 2256.8,
            "duration": 4.72,
            "text": {
              "en": "said. And uh the thing I love about"
            }
          },
          {
            "start": 2259.44,
            "duration": 4.399,
            "text": {
              "en": "working at Every is like you you show up"
            }
          },
          {
            "start": 2261.52,
            "duration": 5.44,
            "text": {
              "en": "to a meeting, you you've like shared an"
            }
          },
          {
            "start": 2263.839,
            "duration": 4.481,
            "text": {
              "en": "AI um written document ahead of time and"
            }
          },
          {
            "start": 2266.96,
            "duration": 2.639,
            "text": {
              "en": "the expectation is that you're going to"
            }
          },
          {
            "start": 2268.32,
            "duration": 2.799,
            "text": {
              "en": "stand behind all of it. That someone"
            }
          },
          {
            "start": 2269.599,
            "duration": 4.48,
            "text": {
              "en": "will ask a question of what's in that"
            }
          },
          {
            "start": 2271.119,
            "duration": 4.641,
            "text": {
              "en": "document. And you if you say like, \"Oh,"
            }
          },
          {
            "start": 2274.079,
            "duration": 3.52,
            "text": {
              "en": "I didn't even know that was in there.\""
            }
          },
          {
            "start": 2275.76,
            "duration": 4.079,
            "text": {
              "en": "It's like you're you're you're exposed,"
            }
          },
          {
            "start": 2277.599,
            "duration": 6.561,
            "text": {
              "en": "right? But the other nice thing is that"
            }
          },
          {
            "start": 2279.839,
            "duration": 5.841,
            "text": {
              "en": "we continue to keep investing in skills"
            }
          },
          {
            "start": 2284.16,
            "duration": 3.919,
            "text": {
              "en": "and workflows and tools to kind of"
            }
          },
          {
            "start": 2285.68,
            "duration": 4.8,
            "text": {
              "en": "ensure that never happens. Like I have"
            }
          },
          {
            "start": 2288.079,
            "duration": 5.121,
            "text": {
              "en": "rules inside of this project file to be"
            }
          },
          {
            "start": 2290.48,
            "duration": 6.08,
            "text": {
              "en": "like if uh don't don't add anything that"
            }
          },
          {
            "start": 2293.2,
            "duration": 4.879,
            "text": {
              "en": "I haven't like said in another context."
            }
          },
          {
            "start": 2296.56,
            "duration": 3.44,
            "text": {
              "en": "I want your suggestion. Send your"
            }
          },
          {
            "start": 2298.079,
            "duration": 5.601,
            "text": {
              "en": "suggestions to me in the chat, but don't"
            }
          },
          {
            "start": 2300,
            "duration": 5.68,
            "text": {
              "en": "put it in a in a document. And like um"
            }
          },
          {
            "start": 2303.68,
            "duration": 3.919,
            "text": {
              "en": "depending on how big the context gets,"
            }
          },
          {
            "start": 2305.68,
            "duration": 4.48,
            "text": {
              "en": "these models can follow or not follow"
            }
          },
          {
            "start": 2307.599,
            "duration": 5.601,
            "text": {
              "en": "those rules, which is another reason why"
            }
          },
          {
            "start": 2310.16,
            "duration": 5.679,
            "text": {
              "en": "I always leave codeex for that final"
            }
          },
          {
            "start": 2313.2,
            "duration": 4,
            "text": {
              "en": "review before it goes to the like humans"
            }
          },
          {
            "start": 2315.839,
            "duration": 3.361,
            "text": {
              "en": "I work with."
            }
          },
          {
            "start": 2317.2,
            "duration": 3.6,
            "text": {
              "en": "Yeah. And I think that that that last"
            }
          },
          {
            "start": 2319.2,
            "duration": 5.6,
            "text": {
              "en": "thing that that that I want to point out"
            }
          },
          {
            "start": 2320.8,
            "duration": 7.2,
            "text": {
              "en": "that you said is like a lot of the time"
            }
          },
          {
            "start": 2324.8,
            "duration": 4.96,
            "text": {
              "en": "that you spend working is about taking"
            }
          },
          {
            "start": 2328,
            "duration": 3.52,
            "text": {
              "en": "thinking you've already done and putting"
            }
          },
          {
            "start": 2329.76,
            "duration": 4.079,
            "text": {
              "en": "it into a form that other people can"
            }
          },
          {
            "start": 2331.52,
            "duration": 5.2,
            "text": {
              "en": "read and consume."
            }
          },
          {
            "start": 2333.839,
            "duration": 4.401,
            "text": {
              "en": "And the important part is doing the"
            }
          },
          {
            "start": 2336.72,
            "duration": 3.6,
            "text": {
              "en": "thinking"
            }
          },
          {
            "start": 2338.24,
            "duration": 3.76,
            "text": {
              "en": "there. There is something obviously"
            }
          },
          {
            "start": 2340.32,
            "duration": 3.6,
            "text": {
              "en": "about like I love writing. Writing is a"
            }
          },
          {
            "start": 2342,
            "duration": 3.04,
            "text": {
              "en": "good way of thinking. Um, and sometimes"
            }
          },
          {
            "start": 2343.92,
            "duration": 2.24,
            "text": {
              "en": "you actually want to do the writing"
            }
          },
          {
            "start": 2345.04,
            "duration": 2.72,
            "text": {
              "en": "yourself because you want to think about"
            }
          },
          {
            "start": 2346.16,
            "duration": 3.439,
            "text": {
              "en": "it for certain types of things and"
            }
          },
          {
            "start": 2347.76,
            "duration": 3.44,
            "text": {
              "en": "certain types of people, but there's a"
            }
          },
          {
            "start": 2349.599,
            "duration": 4.081,
            "text": {
              "en": "lot of stuff like company strategy where"
            }
          },
          {
            "start": 2351.2,
            "duration": 4.639,
            "text": {
              "en": "a lot of the thinking happens out loud"
            }
          },
          {
            "start": 2353.68,
            "duration": 3.28,
            "text": {
              "en": "in meetings. And there's also times like"
            }
          },
          {
            "start": 2355.839,
            "duration": 3.201,
            "text": {
              "en": "for example, I'm writing something"
            }
          },
          {
            "start": 2356.96,
            "duration": 3.28,
            "text": {
              "en": "that's sort of like a it's like a"
            }
          },
          {
            "start": 2359.04,
            "duration": 2.64,
            "text": {
              "en": "retrospective on the last three and a"
            }
          },
          {
            "start": 2360.24,
            "duration": 4.48,
            "text": {
              "en": "half years of AI and like where I think"
            }
          },
          {
            "start": 2361.68,
            "duration": 4.88,
            "text": {
              "en": "we're going. And"
            }
          },
          {
            "start": 2364.72,
            "duration": 3.359,
            "text": {
              "en": "that's so hard to sit down and write,"
            }
          },
          {
            "start": 2366.56,
            "duration": 3.279,
            "text": {
              "en": "but it's much easier to just like"
            }
          },
          {
            "start": 2368.079,
            "duration": 3.28,
            "text": {
              "en": "dictate. So, I just took a monologue"
            }
          },
          {
            "start": 2369.839,
            "duration": 4.321,
            "text": {
              "en": "note where I was just like saying stuff"
            }
          },
          {
            "start": 2371.359,
            "duration": 4.24,
            "text": {
              "en": "and it I'm using the AI to help me like"
            }
          },
          {
            "start": 2374.16,
            "duration": 4.72,
            "text": {
              "en": "figure out what I'm really trying to"
            }
          },
          {
            "start": 2375.599,
            "duration": 6.561,
            "text": {
              "en": "say. And in in those cases, I think it's"
            }
          },
          {
            "start": 2378.88,
            "duration": 5.68,
            "text": {
              "en": "just so nice to record stuff, give Codex"
            }
          },
          {
            "start": 2382.16,
            "duration": 4,
            "text": {
              "en": "access to everything, and then just have"
            }
          },
          {
            "start": 2384.56,
            "duration": 3.039,
            "text": {
              "en": "it spit out a strategy doc and go"
            }
          },
          {
            "start": 2386.16,
            "duration": 4.08,
            "text": {
              "en": "through it to make sure it it's stuff"
            }
          },
          {
            "start": 2387.599,
            "duration": 4.48,
            "text": {
              "en": "you agree with. But it's um such a"
            }
          },
          {
            "start": 2390.24,
            "duration": 4.48,
            "text": {
              "en": "timesaver. And especially if you're"
            }
          },
          {
            "start": 2392.079,
            "duration": 5.52,
            "text": {
              "en": "someone who like Austin or like me, like"
            }
          },
          {
            "start": 2394.72,
            "duration": 5.44,
            "text": {
              "en": "you're in meetings a lot and so you"
            }
          },
          {
            "start": 2397.599,
            "duration": 4.721,
            "text": {
              "en": "don't necessarily have huge chunks of"
            }
          },
          {
            "start": 2400.16,
            "duration": 3.36,
            "text": {
              "en": "time in your day to like go do a big"
            }
          },
          {
            "start": 2402.32,
            "duration": 3.12,
            "text": {
              "en": "strategy document because you're just"
            }
          },
          {
            "start": 2403.52,
            "duration": 4.16,
            "text": {
              "en": "trying to stay on top of whatever is"
            }
          },
          {
            "start": 2405.44,
            "duration": 4.32,
            "text": {
              "en": "happening. It helps you do that in the"
            }
          },
          {
            "start": 2407.68,
            "duration": 4.72,
            "text": {
              "en": "cracks of your day and do a lot of that"
            }
          },
          {
            "start": 2409.76,
            "duration": 5.52,
            "text": {
              "en": "thinking. And I just I love it for that."
            }
          },
          {
            "start": 2412.4,
            "duration": 4.32,
            "text": {
              "en": "Yeah, me too. Um, I want to show one"
            }
          },
          {
            "start": 2415.28,
            "duration": 2.64,
            "text": {
              "en": "more thing before we get into more"
            }
          },
          {
            "start": 2416.72,
            "duration": 3.52,
            "text": {
              "en": "questions because like I wanted to show"
            }
          },
          {
            "start": 2417.92,
            "duration": 4.8,
            "text": {
              "en": "kind of like a a more like mix of"
            }
          },
          {
            "start": 2420.24,
            "duration": 4.08,
            "text": {
              "en": "knowledge work and engineering stuff"
            }
          },
          {
            "start": 2422.72,
            "duration": 3.2,
            "text": {
              "en": "that like would never have been possible"
            }
          },
          {
            "start": 2424.32,
            "duration": 4.56,
            "text": {
              "en": "without these kinds of tools and that I"
            }
          },
          {
            "start": 2425.92,
            "duration": 8.8,
            "text": {
              "en": "really love codeex for which is I've"
            }
          },
          {
            "start": 2428.88,
            "duration": 8.16,
            "text": {
              "en": "been rebuilding our um KPI tracker every"
            }
          },
          {
            "start": 2434.72,
            "duration": 5.92,
            "text": {
              "en": "week. Um, I'll just like show it here"
            }
          },
          {
            "start": 2437.04,
            "duration": 7.039,
            "text": {
              "en": "for a bit. So um we have so many"
            }
          },
          {
            "start": 2440.64,
            "duration": 8.88,
            "text": {
              "en": "different parts of our business at uh at"
            }
          },
          {
            "start": 2444.079,
            "duration": 9.04,
            "text": {
              "en": "Eb and uh it's very difficult to"
            }
          },
          {
            "start": 2449.52,
            "duration": 6.48,
            "text": {
              "en": "get all of those um data points in one"
            }
          },
          {
            "start": 2453.119,
            "duration": 5.281,
            "text": {
              "en": "source of truth in a traditional tool"
            }
          },
          {
            "start": 2456,
            "duration": 4.4,
            "text": {
              "en": "like even postg which I really like and"
            }
          },
          {
            "start": 2458.4,
            "duration": 4.64,
            "text": {
              "en": "a lot of our data runs through it to get"
            }
          },
          {
            "start": 2460.4,
            "duration": 5.04,
            "text": {
              "en": "one dashboard that is again both human"
            }
          },
          {
            "start": 2463.04,
            "duration": 4.24,
            "text": {
              "en": "and human and agentf facing that is up"
            }
          },
          {
            "start": 2465.44,
            "duration": 4.48,
            "text": {
              "en": "to date with all of the metrics we care"
            }
          },
          {
            "start": 2467.28,
            "duration": 5.68,
            "text": {
              "en": "out. I I haven't found a great solution"
            }
          },
          {
            "start": 2469.92,
            "duration": 6,
            "text": {
              "en": "for just like, you know, going to post"
            }
          },
          {
            "start": 2472.96,
            "duration": 5.2,
            "text": {
              "en": "and having it having it do it. So um we"
            }
          },
          {
            "start": 2475.92,
            "duration": 5.52,
            "text": {
              "en": "I've been rebuilding our KPI sheets"
            }
          },
          {
            "start": 2478.16,
            "duration": 5.84,
            "text": {
              "en": "inside of notion with the goal in mind"
            }
          },
          {
            "start": 2481.44,
            "duration": 5.04,
            "text": {
              "en": "of any anyone can point their agent to"
            }
          },
          {
            "start": 2484,
            "duration": 4.56,
            "text": {
              "en": "look at it and see how are new paid"
            }
          },
          {
            "start": 2486.48,
            "duration": 5.52,
            "text": {
              "en": "subscription trials doing how are page"
            }
          },
          {
            "start": 2488.56,
            "duration": 6.32,
            "text": {
              "en": "views doing how is uh monologue iOS MR"
            }
          },
          {
            "start": 2492,
            "duration": 5.76,
            "text": {
              "en": "doing all versus plan all of this stuff"
            }
          },
          {
            "start": 2494.88,
            "duration": 5.199,
            "text": {
              "en": "because one it helps you work as a human"
            }
          },
          {
            "start": 2497.76,
            "duration": 4.8,
            "text": {
              "en": "but it also really helps you automate"
            }
          },
          {
            "start": 2500.079,
            "duration": 4.321,
            "text": {
              "en": "agentic work so that you can say like if"
            }
          },
          {
            "start": 2502.56,
            "duration": 5.2,
            "text": {
              "en": "your agencies that we're tracking behind"
            }
          },
          {
            "start": 2504.4,
            "duration": 6.24,
            "text": {
              "en": "and on SEO for a keyword we should be"
            }
          },
          {
            "start": 2507.76,
            "duration": 4.24,
            "text": {
              "en": "winning on, they can go just like ship a"
            }
          },
          {
            "start": 2510.64,
            "duration": 3.199,
            "text": {
              "en": "bunch of landing pages for us to try to"
            }
          },
          {
            "start": 2512,
            "duration": 4.48,
            "text": {
              "en": "win more on it if the if the source of"
            }
          },
          {
            "start": 2513.839,
            "duration": 4.641,
            "text": {
              "en": "truths are good. And so I have been"
            }
          },
          {
            "start": 2516.48,
            "duration": 5.68,
            "text": {
              "en": "doing this big kind of like to me"
            }
          },
          {
            "start": 2518.48,
            "duration": 5.44,
            "text": {
              "en": "complex uh workflow problem in codeex of"
            }
          },
          {
            "start": 2522.16,
            "duration": 3.28,
            "text": {
              "en": "let's build this sheet together, let's"
            }
          },
          {
            "start": 2523.92,
            "duration": 4.399,
            "text": {
              "en": "have it live in a notion database that"
            }
          },
          {
            "start": 2525.44,
            "duration": 4.32,
            "text": {
              "en": "all of our agents can point at. And I've"
            }
          },
          {
            "start": 2528.319,
            "duration": 4.081,
            "text": {
              "en": "done a bunch of different versions of"
            }
          },
          {
            "start": 2529.76,
            "duration": 4.48,
            "text": {
              "en": "it. The first version was like can"
            }
          },
          {
            "start": 2532.4,
            "duration": 4.56,
            "text": {
              "en": "codeex oneshot this, right? like it has"
            }
          },
          {
            "start": 2534.24,
            "duration": 4.4,
            "text": {
              "en": "all the API keys, it has everything. I'm"
            }
          },
          {
            "start": 2536.96,
            "duration": 5.28,
            "text": {
              "en": "happy to give it the context on like how"
            }
          },
          {
            "start": 2538.64,
            "duration": 5.36,
            "text": {
              "en": "we measure MR and everything. And each"
            }
          },
          {
            "start": 2542.24,
            "duration": 4.24,
            "text": {
              "en": "time it was like a little off. It was"
            }
          },
          {
            "start": 2544,
            "duration": 5.2,
            "text": {
              "en": "like maybe 5 to 10% off of the"
            }
          },
          {
            "start": 2546.48,
            "duration": 6.24,
            "text": {
              "en": "formatting, the numbers, the framing."
            }
          },
          {
            "start": 2549.2,
            "duration": 4.8,
            "text": {
              "en": "And our MR MR number can't be 5% off."
            }
          },
          {
            "start": 2552.72,
            "duration": 3.2,
            "text": {
              "en": "Like we can't run a business with a"
            }
          },
          {
            "start": 2554,
            "duration": 4.48,
            "text": {
              "en": "source of truth that's even 3% off. It"
            }
          },
          {
            "start": 2555.92,
            "duration": 4.48,
            "text": {
              "en": "has to be just exactly right. And so the"
            }
          },
          {
            "start": 2558.48,
            "duration": 3.839,
            "text": {
              "en": "thing that I forced myself to do and"
            }
          },
          {
            "start": 2560.4,
            "duration": 3.36,
            "text": {
              "en": "it's weird now I'm like it feels so"
            }
          },
          {
            "start": 2562.319,
            "duration": 3.28,
            "text": {
              "en": "stupid that I have to do this but it"
            }
          },
          {
            "start": 2563.76,
            "duration": 5.52,
            "text": {
              "en": "makes sense is like I'm going column by"
            }
          },
          {
            "start": 2565.599,
            "duration": 6.48,
            "text": {
              "en": "column end to end to ensure each column"
            }
          },
          {
            "start": 2569.28,
            "duration": 5.6,
            "text": {
              "en": "is exactly right and defensible because"
            }
          },
          {
            "start": 2572.079,
            "duration": 4.24,
            "text": {
              "en": "it's the only way that we can run and"
            }
          },
          {
            "start": 2574.88,
            "duration": 2.8,
            "text": {
              "en": "grow the business reliably and"
            }
          },
          {
            "start": 2576.319,
            "duration": 3.28,
            "text": {
              "en": "especially the only way we can we can"
            }
          },
          {
            "start": 2577.68,
            "duration": 4.24,
            "text": {
              "en": "confidently unleash agents to go take"
            }
          },
          {
            "start": 2579.599,
            "duration": 5.921,
            "text": {
              "en": "actions against what's happening in that"
            }
          },
          {
            "start": 2581.92,
            "duration": 5.28,
            "text": {
              "en": "KPI sheet. And um it's it's like it's so"
            }
          },
          {
            "start": 2585.52,
            "duration": 3.28,
            "text": {
              "en": "interesting to me that I'm frustrated"
            }
          },
          {
            "start": 2587.2,
            "duration": 4.159,
            "text": {
              "en": "that I have to do this that the that the"
            }
          },
          {
            "start": 2588.8,
            "duration": 3.76,
            "text": {
              "en": "model can't do it for me. Um but it's"
            }
          },
          {
            "start": 2591.359,
            "duration": 2.72,
            "text": {
              "en": "just because of how like powerful these"
            }
          },
          {
            "start": 2592.56,
            "duration": 3.84,
            "text": {
              "en": "models are gotten that I expect it to be"
            }
          },
          {
            "start": 2594.079,
            "duration": 4.24,
            "text": {
              "en": "able to do it. But um and this is a"
            }
          },
          {
            "start": 2596.4,
            "duration": 4.719,
            "text": {
              "en": "thing where I'm like you know it's using"
            }
          },
          {
            "start": 2598.319,
            "duration": 5.601,
            "text": {
              "en": "um notion's workers tool which is this"
            }
          },
          {
            "start": 2601.119,
            "duration": 6.401,
            "text": {
              "en": "like dev tool. It's a build always on"
            }
          },
          {
            "start": 2603.92,
            "duration": 5.84,
            "text": {
              "en": "tool calls of our stripe of our social"
            }
          },
          {
            "start": 2607.52,
            "duration": 3.36,
            "text": {
              "en": "um it's like creating little scripts and"
            }
          },
          {
            "start": 2609.76,
            "duration": 2.72,
            "text": {
              "en": "stuff all stuff I don't really"
            }
          },
          {
            "start": 2610.88,
            "duration": 3.52,
            "text": {
              "en": "understand but I understand the outputs."
            }
          },
          {
            "start": 2612.48,
            "duration": 3.599,
            "text": {
              "en": "I understand that the output is a notion"
            }
          },
          {
            "start": 2614.4,
            "duration": 4.88,
            "text": {
              "en": "database that updates every six hours"
            }
          },
          {
            "start": 2616.079,
            "duration": 5.361,
            "text": {
              "en": "with all of our metrics and it's just"
            }
          },
          {
            "start": 2619.28,
            "duration": 5.76,
            "text": {
              "en": "nice that I can do that and I don't need"
            }
          },
          {
            "start": 2621.44,
            "duration": 6.8,
            "text": {
              "en": "to hire a consultant to do it or like I"
            }
          },
          {
            "start": 2625.04,
            "duration": 5.6,
            "text": {
              "en": "don't need to like um uh yeah take away"
            }
          },
          {
            "start": 2628.24,
            "duration": 4.4,
            "text": {
              "en": "from our uh like our engineers times"
            }
          },
          {
            "start": 2630.64,
            "duration": 3.679,
            "text": {
              "en": "that that work on our data like I can do"
            }
          },
          {
            "start": 2632.64,
            "duration": 4.16,
            "text": {
              "en": "this now and I can do it just by like"
            }
          },
          {
            "start": 2634.319,
            "duration": 5.28,
            "text": {
              "en": "prompting the model and understanding"
            }
          },
          {
            "start": 2636.8,
            "duration": 5.68,
            "text": {
              "en": "how the metrics are supposed to work."
            }
          },
          {
            "start": 2639.599,
            "duration": 4.641,
            "text": {
              "en": "It's amazing. Uh, I can't wait. Is the"
            }
          },
          {
            "start": 2642.48,
            "duration": 3.359,
            "text": {
              "en": "Do you think it'll be ready on Monday?"
            }
          },
          {
            "start": 2644.24,
            "duration": 1.839,
            "text": {
              "en": "It'll be ready on Monday. Yeah. [ __ ]"
            }
          },
          {
            "start": 2645.839,
            "duration": 1.52,
            "text": {
              "en": "yeah."
            }
          },
          {
            "start": 2646.079,
            "duration": 3.52,
            "text": {
              "en": "Feeling really good."
            }
          },
          {
            "start": 2647.359,
            "duration": 4.161,
            "text": {
              "en": "Because we've been I mean just having It"
            }
          },
          {
            "start": 2649.599,
            "duration": 3.121,
            "text": {
              "en": "turns out that figuring out how much"
            }
          },
          {
            "start": 2651.52,
            "duration": 3.839,
            "text": {
              "en": "money you're making and how much you've"
            }
          },
          {
            "start": 2652.72,
            "duration": 5.359,
            "text": {
              "en": "grown is truly a philosophical question,"
            }
          },
          {
            "start": 2655.359,
            "duration": 5.841,
            "text": {
              "en": "you know? Um, and you actually do need"
            }
          },
          {
            "start": 2658.079,
            "duration": 6.641,
            "text": {
              "en": "to like go in and like set that frame."
            }
          },
          {
            "start": 2661.2,
            "duration": 5.84,
            "text": {
              "en": "Um, and so we've been dealing with an"
            }
          },
          {
            "start": 2664.72,
            "duration": 4.399,
            "text": {
              "en": "outdated sheet because it's like it's"
            }
          },
          {
            "start": 2667.04,
            "duration": 4.799,
            "text": {
              "en": "pulling numbers, but is are the numbers"
            }
          },
          {
            "start": 2669.119,
            "duration": 6.081,
            "text": {
              "en": "correct? you know, even even outside of"
            }
          },
          {
            "start": 2671.839,
            "duration": 5.121,
            "text": {
              "en": "AI. Um, and and there's no one way to,"
            }
          },
          {
            "start": 2675.2,
            "duration": 3.2,
            "text": {
              "en": "for example, measure your MR, you just"
            }
          },
          {
            "start": 2676.96,
            "duration": 4.56,
            "text": {
              "en": "want to do it the same way every time."
            }
          },
          {
            "start": 2678.4,
            "duration": 5.04,
            "text": {
              "en": "So, you have to decide. And, uh, that's"
            }
          },
          {
            "start": 2681.52,
            "duration": 3.44,
            "text": {
              "en": "kind of it's kind of wild that it's like"
            }
          },
          {
            "start": 2683.44,
            "duration": 3.44,
            "text": {
              "en": "almost impossible to tell how much money"
            }
          },
          {
            "start": 2684.96,
            "duration": 4.639,
            "text": {
              "en": "you made in an objective way. You have"
            }
          },
          {
            "start": 2686.88,
            "duration": 4.8,
            "text": {
              "en": "to just like pick. But anyway, uh,"
            }
          },
          {
            "start": 2689.599,
            "duration": 3.201,
            "text": {
              "en": "that's just the way my brain works. I"
            }
          },
          {
            "start": 2691.68,
            "duration": 2.88,
            "text": {
              "en": "want to say before we get into"
            }
          },
          {
            "start": 2692.8,
            "duration": 3.92,
            "text": {
              "en": "questions, one other thing that I use"
            }
          },
          {
            "start": 2694.56,
            "duration": 4.48,
            "text": {
              "en": "this for that was it like blew my mind"
            }
          },
          {
            "start": 2696.72,
            "duration": 6.399,
            "text": {
              "en": "from a knowledge work perspective is"
            }
          },
          {
            "start": 2699.04,
            "duration": 7.76,
            "text": {
              "en": "recruiting. So, we're hiring a lot"
            }
          },
          {
            "start": 2703.119,
            "duration": 6.161,
            "text": {
              "en": "and we were looking for an L & D head of"
            }
          },
          {
            "start": 2706.8,
            "duration": 4.4,
            "text": {
              "en": "L & D, someone to help us run courses."
            }
          },
          {
            "start": 2709.28,
            "duration": 3.6,
            "text": {
              "en": "And there's this company in New York"
            }
          },
          {
            "start": 2711.2,
            "duration": 3.44,
            "text": {
              "en": "called General Assembly. And when I"
            }
          },
          {
            "start": 2712.88,
            "duration": 3.92,
            "text": {
              "en": "think about people who've run like"
            }
          },
          {
            "start": 2714.64,
            "duration": 3.679,
            "text": {
              "en": "really great courses about technology to"
            }
          },
          {
            "start": 2716.8,
            "duration": 3.44,
            "text": {
              "en": "teach people how to get hands-on with"
            }
          },
          {
            "start": 2718.319,
            "duration": 3.201,
            "text": {
              "en": "like programming or design or anything"
            }
          },
          {
            "start": 2720.24,
            "duration": 4.4,
            "text": {
              "en": "like that, like they're the company that"
            }
          },
          {
            "start": 2721.52,
            "duration": 7.36,
            "text": {
              "en": "I think of from the like 2010s in New"
            }
          },
          {
            "start": 2724.64,
            "duration": 6.64,
            "text": {
              "en": "York. And so I"
            }
          },
          {
            "start": 2728.88,
            "duration": 4.64,
            "text": {
              "en": "my theory was that if we're hiring"
            }
          },
          {
            "start": 2731.28,
            "duration": 4.079,
            "text": {
              "en": "someone to do like build our courses,"
            }
          },
          {
            "start": 2733.52,
            "duration": 4.96,
            "text": {
              "en": "they would probably have a good person"
            }
          },
          {
            "start": 2735.359,
            "duration": 6,
            "text": {
              "en": "probably would have worked at GA and"
            }
          },
          {
            "start": 2738.48,
            "duration": 4.4,
            "text": {
              "en": "Jason. Yes. Um"
            }
          },
          {
            "start": 2741.359,
            "duration": 3.441,
            "text": {
              "en": "and"
            }
          },
          {
            "start": 2742.88,
            "duration": 3.199,
            "text": {
              "en": "I think GA's quality has gone up and"
            }
          },
          {
            "start": 2744.8,
            "duration": 6.08,
            "text": {
              "en": "down, but at the beginning they were"
            }
          },
          {
            "start": 2746.079,
            "duration": 7.601,
            "text": {
              "en": "amazing. Um, and uh, so what I did was I"
            }
          },
          {
            "start": 2750.88,
            "duration": 5.36,
            "text": {
              "en": "just said to Codex, \"Hey, like can you"
            }
          },
          {
            "start": 2753.68,
            "duration": 4.72,
            "text": {
              "en": "find can you just get a list of GA"
            }
          },
          {
            "start": 2756.24,
            "duration": 4.72,
            "text": {
              "en": "alums? I'm like hiring an an L & D"
            }
          },
          {
            "start": 2758.4,
            "duration": 5.6,
            "text": {
              "en": "director and then I want you to filter"
            }
          },
          {
            "start": 2760.96,
            "duration": 6.72,
            "text": {
              "en": "and sort the list by people who have"
            }
          },
          {
            "start": 2764,
            "duration": 6.88,
            "text": {
              "en": "subsequently gotten into AI"
            }
          },
          {
            "start": 2767.68,
            "duration": 5.679,
            "text": {
              "en": "and it did it like it just gave me a"
            }
          },
          {
            "start": 2770.88,
            "duration": 4.719,
            "text": {
              "en": "list of people. The first one I clicked"
            }
          },
          {
            "start": 2773.359,
            "duration": 4.801,
            "text": {
              "en": "on, it was like I was like, \"This guy is"
            }
          },
          {
            "start": 2775.599,
            "duration": 3.921,
            "text": {
              "en": "perfect.\" And then I looked and he"
            }
          },
          {
            "start": 2778.16,
            "duration": 3.199,
            "text": {
              "en": "followed me on Twitter, so I just DM'd"
            }
          },
          {
            "start": 2779.52,
            "duration": 3.599,
            "text": {
              "en": "him. And like I don't know if we're"
            }
          },
          {
            "start": 2781.359,
            "duration": 3.521,
            "text": {
              "en": "gonna end up working with him, but like"
            }
          },
          {
            "start": 2783.119,
            "duration": 4.24,
            "text": {
              "en": "it was just one of those holy [ __ ] light"
            }
          },
          {
            "start": 2784.88,
            "duration": 4.239,
            "text": {
              "en": "bulb moments where normally what we're"
            }
          },
          {
            "start": 2787.359,
            "duration": 3.601,
            "text": {
              "en": "doing is sorting through a ton of"
            }
          },
          {
            "start": 2789.119,
            "duration": 3.441,
            "text": {
              "en": "applications and like trying to find the"
            }
          },
          {
            "start": 2790.96,
            "duration": 3.52,
            "text": {
              "en": "right person. And I we're still going to"
            }
          },
          {
            "start": 2792.56,
            "duration": 3.6,
            "text": {
              "en": "do that, but especially for any kind of"
            }
          },
          {
            "start": 2794.48,
            "duration": 3.28,
            "text": {
              "en": "like outbound effort, it can kind of"
            }
          },
          {
            "start": 2796.16,
            "duration": 3.28,
            "text": {
              "en": "find that needle in the haststack that"
            }
          },
          {
            "start": 2797.76,
            "duration": 6.079,
            "text": {
              "en": "you're looking for really really well."
            }
          },
          {
            "start": 2799.44,
            "duration": 7.84,
            "text": {
              "en": "So, I highly highly recommend um okay,"
            }
          },
          {
            "start": 2803.839,
            "duration": 5.441,
            "text": {
              "en": "we've got about 10 minutes left. Um and"
            }
          },
          {
            "start": 2807.28,
            "duration": 4,
            "text": {
              "en": "I want to take some more time for"
            }
          },
          {
            "start": 2809.28,
            "duration": 4.96,
            "text": {
              "en": "questions. So, if you got a question,"
            }
          },
          {
            "start": 2811.28,
            "duration": 4.079,
            "text": {
              "en": "please uh uh please raise your hand. One"
            }
          },
          {
            "start": 2814.24,
            "duration": 3.28,
            "text": {
              "en": "thing that we have not gotten to"
            }
          },
          {
            "start": 2815.359,
            "duration": 4.321,
            "text": {
              "en": "actually is that if you are here, you"
            }
          },
          {
            "start": 2817.52,
            "duration": 3.839,
            "text": {
              "en": "are getting codeex credits. Uh Austin,"
            }
          },
          {
            "start": 2819.68,
            "duration": 3.2,
            "text": {
              "en": "do you want to uh go through that really"
            }
          },
          {
            "start": 2821.359,
            "duration": 6.96,
            "text": {
              "en": "quick?"
            }
          },
          {
            "start": 2822.88,
            "duration": 9.36,
            "text": {
              "en": "Yes. So, uh OpenAI has given us a code."
            }
          },
          {
            "start": 2828.319,
            "duration": 6.561,
            "text": {
              "en": "I'm about to drop into the chat for 250"
            }
          },
          {
            "start": 2832.24,
            "duration": 5.68,
            "text": {
              "en": "attendees of this camp to get a free"
            }
          },
          {
            "start": 2834.88,
            "duration": 7.04,
            "text": {
              "en": "month of ChatGB to chat GBT Pro lights."
            }
          },
          {
            "start": 2837.92,
            "duration": 7.439,
            "text": {
              "en": "That's about a $100 value. Um, and you"
            }
          },
          {
            "start": 2841.92,
            "duration": 6.56,
            "text": {
              "en": "can redeem it at this link that uh we"
            }
          },
          {
            "start": 2845.359,
            "duration": 3.841,
            "text": {
              "en": "will drop in the chat right now."
            }
          },
          {
            "start": 2848.48,
            "duration": 2.08,
            "text": {
              "en": "Sick."
            }
          },
          {
            "start": 2849.2,
            "duration": 2.96,
            "text": {
              "en": "Dan Dan, I'm actually gonna I'm going to"
            }
          },
          {
            "start": 2850.56,
            "duration": 3.279,
            "text": {
              "en": "slack it to you so you can drop it in"
            }
          },
          {
            "start": 2852.16,
            "duration": 2.4,
            "text": {
              "en": "the chat because for some reason I don't"
            }
          },
          {
            "start": 2853.839,
            "duration": 3.28,
            "text": {
              "en": "have access."
            }
          },
          {
            "start": 2854.56,
            "duration": 4.559,
            "text": {
              "en": "Okay, I'll do that. Um, so yes, this is"
            }
          },
          {
            "start": 2857.119,
            "duration": 3.361,
            "text": {
              "en": "this is our gift to you as every"
            }
          },
          {
            "start": 2859.119,
            "duration": 2.881,
            "text": {
              "en": "subscribers. We try to do stuff like"
            }
          },
          {
            "start": 2860.48,
            "duration": 4.08,
            "text": {
              "en": "this all the time. We've been we've"
            }
          },
          {
            "start": 2862,
            "duration": 4.64,
            "text": {
              "en": "given out I think we've done um cursor"
            }
          },
          {
            "start": 2864.56,
            "duration": 3.279,
            "text": {
              "en": "credits. We've done we've done a lot a"
            }
          },
          {
            "start": 2866.64,
            "duration": 3.679,
            "text": {
              "en": "lot of other stuff. We have more stuff"
            }
          },
          {
            "start": 2867.839,
            "duration": 4.24,
            "text": {
              "en": "like this coming. So we just want you to"
            }
          },
          {
            "start": 2870.319,
            "duration": 4.961,
            "text": {
              "en": "be able to try these tools. Be at the"
            }
          },
          {
            "start": 2872.079,
            "duration": 6.24,
            "text": {
              "en": "edge with us. And um we just love having"
            }
          },
          {
            "start": 2875.28,
            "duration": 6.48,
            "text": {
              "en": "you as as subscribers. So here is the"
            }
          },
          {
            "start": 2878.319,
            "duration": 6.721,
            "text": {
              "en": "link. It's $100. Oh, notion. Yes, we did"
            }
          },
          {
            "start": 2881.76,
            "duration": 4.96,
            "text": {
              "en": "give out Notion. It's $100."
            }
          },
          {
            "start": 2885.04,
            "duration": 3.44,
            "text": {
              "en": "um"
            }
          },
          {
            "start": 2886.72,
            "duration": 3.119,
            "text": {
              "en": "and"
            }
          },
          {
            "start": 2888.48,
            "duration": 3.52,
            "text": {
              "en": "uh check it out. We will send it out in"
            }
          },
          {
            "start": 2889.839,
            "duration": 4.161,
            "text": {
              "en": "an email. We may actually we may not"
            }
          },
          {
            "start": 2892,
            "duration": 4.16,
            "text": {
              "en": "send it out in an email because it's"
            }
          },
          {
            "start": 2894,
            "duration": 3.76,
            "text": {
              "en": "only 200 it's limited to 250 people and"
            }
          },
          {
            "start": 2896.16,
            "duration": 3.6,
            "text": {
              "en": "that's pretty much exactly the number of"
            }
          },
          {
            "start": 2897.76,
            "duration": 5.28,
            "text": {
              "en": "people who are here. So if there's any"
            }
          },
          {
            "start": 2899.76,
            "duration": 5.839,
            "text": {
              "en": "left we will send it. Um if there is one"
            }
          },
          {
            "start": 2903.04,
            "duration": 5.559,
            "text": {
              "en": "person there's 251 people here. So"
            }
          },
          {
            "start": 2905.599,
            "duration": 3,
            "text": {
              "en": "there's"
            }
          },
          {
            "start": 2913.44,
            "duration": 6.24,
            "text": {
              "en": "if uh that person if you let us know"
            }
          },
          {
            "start": 2916.72,
            "duration": 6.399,
            "text": {
              "en": "we'll figure something out for you. Um"
            }
          },
          {
            "start": 2919.68,
            "duration": 6.439,
            "text": {
              "en": "interesting. Not available on my plan."
            }
          },
          {
            "start": 2923.119,
            "duration": 3,
            "text": {
              "en": "Um"
            }
          },
          {
            "start": 2926.88,
            "duration": 6.56,
            "text": {
              "en": "okay. Uh we will have to deal with this."
            }
          },
          {
            "start": 2930,
            "duration": 5.2,
            "text": {
              "en": "Uh let us"
            }
          },
          {
            "start": 2933.44,
            "duration": 4.24,
            "text": {
              "en": "let us figure out what to do what to do"
            }
          },
          {
            "start": 2935.2,
            "duration": 4.399,
            "text": {
              "en": "here. So"
            }
          },
          {
            "start": 2937.68,
            "duration": 4.56,
            "text": {
              "en": "correction this is only if you do not"
            }
          },
          {
            "start": 2939.599,
            "duration": 4.801,
            "text": {
              "en": "have a plan. This is for new users and"
            }
          },
          {
            "start": 2942.24,
            "duration": 4.96,
            "text": {
              "en": "we'll try to we'll try to get something"
            }
          },
          {
            "start": 2944.4,
            "duration": 5.28,
            "text": {
              "en": "for existing users and send it out as"
            }
          },
          {
            "start": 2947.2,
            "duration": 4.24,
            "text": {
              "en": "soon as we can."
            }
          },
          {
            "start": 2949.68,
            "duration": 5.2,
            "text": {
              "en": "Cool. All right, let's do some"
            }
          },
          {
            "start": 2951.44,
            "duration": 7.919,
            "text": {
              "en": "questions. Um"
            }
          },
          {
            "start": 2954.88,
            "duration": 6.959,
            "text": {
              "en": "Rich, please ask your question."
            }
          },
          {
            "start": 2959.359,
            "duration": 5.2,
            "text": {
              "en": "So I I saw at the beginning you were"
            }
          },
          {
            "start": 2961.839,
            "duration": 4.881,
            "text": {
              "en": "using compound engineering as kind of"
            }
          },
          {
            "start": 2964.559,
            "duration": 4.161,
            "text": {
              "en": "part of your workflow."
            }
          },
          {
            "start": 2966.72,
            "duration": 5.839,
            "text": {
              "en": "Are you using kind of like the"
            }
          },
          {
            "start": 2968.72,
            "duration": 6,
            "text": {
              "en": "offtheshelf plugin or is there tweaks to"
            }
          },
          {
            "start": 2972.559,
            "duration": 4.321,
            "text": {
              "en": "it and kind of where does that work and"
            }
          },
          {
            "start": 2974.72,
            "duration": 5.119,
            "text": {
              "en": "maybe not work when you're outside of"
            }
          },
          {
            "start": 2976.88,
            "duration": 5.959,
            "text": {
              "en": "the you know kind of code creation"
            }
          },
          {
            "start": 2979.839,
            "duration": 3,
            "text": {
              "en": "workflow?"
            }
          },
          {
            "start": 2983.839,
            "duration": 6,
            "text": {
              "en": "So I I find that there's no um"
            }
          },
          {
            "start": 2987.52,
            "duration": 4.64,
            "text": {
              "en": "overwhelming need to fork your own"
            }
          },
          {
            "start": 2989.839,
            "duration": 6.641,
            "text": {
              "en": "version of compound engineering. I used"
            }
          },
          {
            "start": 2992.16,
            "duration": 6.159,
            "text": {
              "en": "it for a long time um for all of my"
            }
          },
          {
            "start": 2996.48,
            "duration": 4.879,
            "text": {
              "en": "knowledge work and it was extremely"
            }
          },
          {
            "start": 2998.319,
            "duration": 4.721,
            "text": {
              "en": "powerful for me. And then um maybe about"
            }
          },
          {
            "start": 3001.359,
            "duration": 4.881,
            "text": {
              "en": "two months ago, the the main thing I"
            }
          },
          {
            "start": 3003.04,
            "duration": 6.319,
            "text": {
              "en": "noticed was reading the agents response"
            }
          },
          {
            "start": 3006.24,
            "duration": 5.76,
            "text": {
              "en": "to especially the review stage of"
            }
          },
          {
            "start": 3009.359,
            "duration": 4.881,
            "text": {
              "en": "watching the reviewers that Kieran and"
            }
          },
          {
            "start": 3012,
            "duration": 4.079,
            "text": {
              "en": "Trevan had built that are very specific"
            }
          },
          {
            "start": 3014.24,
            "duration": 4.24,
            "text": {
              "en": "to engineering."
            }
          },
          {
            "start": 3016.079,
            "duration": 5.921,
            "text": {
              "en": "It I was like, oh this like the thing"
            }
          },
          {
            "start": 3018.48,
            "duration": 4.879,
            "text": {
              "en": "you'll see the agent do is say like um"
            }
          },
          {
            "start": 3022,
            "duration": 3.28,
            "text": {
              "en": "I'm supposed to go through through this"
            }
          },
          {
            "start": 3023.359,
            "duration": 4.321,
            "text": {
              "en": "review step. It looks like it's designed"
            }
          },
          {
            "start": 3025.28,
            "duration": 5.44,
            "text": {
              "en": "for engineering. it's thinking about"
            }
          },
          {
            "start": 3027.68,
            "duration": 5.919,
            "text": {
              "en": "security and front-end design when this"
            }
          },
          {
            "start": 3030.72,
            "duration": 4.48,
            "text": {
              "en": "is a go-to market plan. The agent will"
            }
          },
          {
            "start": 3033.599,
            "duration": 2.72,
            "text": {
              "en": "then like change the path. The agent"
            }
          },
          {
            "start": 3035.2,
            "duration": 2.639,
            "text": {
              "en": "will be like, I'm going to review this"
            }
          },
          {
            "start": 3036.319,
            "duration": 5.28,
            "text": {
              "en": "for something else rather than reviewing"
            }
          },
          {
            "start": 3037.839,
            "duration": 6.641,
            "text": {
              "en": "it for security. And so the thing that I"
            }
          },
          {
            "start": 3041.599,
            "duration": 5.281,
            "text": {
              "en": "did was I went and forked a version of"
            }
          },
          {
            "start": 3044.48,
            "duration": 5.92,
            "text": {
              "en": "it that is actually um publicly"
            }
          },
          {
            "start": 3046.88,
            "duration": 6.719,
            "text": {
              "en": "available on our GitHub called compound"
            }
          },
          {
            "start": 3050.4,
            "duration": 6,
            "text": {
              "en": "knowledge which is uh built exclusively"
            }
          },
          {
            "start": 3053.599,
            "duration": 4.48,
            "text": {
              "en": "from me taking the compound engineering"
            }
          },
          {
            "start": 3056.4,
            "duration": 4.959,
            "text": {
              "en": "plugin which is also public and you can"
            }
          },
          {
            "start": 3058.079,
            "duration": 4.961,
            "text": {
              "en": "go for it and going inside of I think I"
            }
          },
          {
            "start": 3061.359,
            "duration": 4.24,
            "text": {
              "en": "started in cloud code now I update it"
            }
          },
          {
            "start": 3063.04,
            "duration": 5.44,
            "text": {
              "en": "update it in codeex and saying like I"
            }
          },
          {
            "start": 3065.599,
            "duration": 5.281,
            "text": {
              "en": "want to tweak this to general knowledge"
            }
          },
          {
            "start": 3068.48,
            "duration": 4.879,
            "text": {
              "en": "work. And this is the thing I was I was"
            }
          },
          {
            "start": 3070.88,
            "duration": 5.199,
            "text": {
              "en": "referencing around the like reviewers"
            }
          },
          {
            "start": 3073.359,
            "duration": 4.561,
            "text": {
              "en": "being much more specific to knowledge"
            }
          },
          {
            "start": 3076.079,
            "duration": 4.401,
            "text": {
              "en": "work around like strategic alignment and"
            }
          },
          {
            "start": 3077.92,
            "duration": 3.919,
            "text": {
              "en": "and data accuracy. I think more than"
            }
          },
          {
            "start": 3080.48,
            "duration": 3.68,
            "text": {
              "en": "anything, this is like a really fun way"
            }
          },
          {
            "start": 3081.839,
            "duration": 4.081,
            "text": {
              "en": "to learn um and a fun way to like kind"
            }
          },
          {
            "start": 3084.16,
            "duration": 3.36,
            "text": {
              "en": "of like push yourself on using models."
            }
          },
          {
            "start": 3085.92,
            "duration": 3.439,
            "text": {
              "en": "You're welcome just to go use this one."
            }
          },
          {
            "start": 3087.52,
            "duration": 4.72,
            "text": {
              "en": "We'll include it in the in the follow-up"
            }
          },
          {
            "start": 3089.359,
            "duration": 4.641,
            "text": {
              "en": "email to the camp. Um but I think it's a"
            }
          },
          {
            "start": 3092.24,
            "duration": 3.68,
            "text": {
              "en": "cool like I learned a ton just by doing"
            }
          },
          {
            "start": 3094,
            "duration": 4.8,
            "text": {
              "en": "this. I had never made like a plugin"
            }
          },
          {
            "start": 3095.92,
            "duration": 4.48,
            "text": {
              "en": "like this before. Um, and to make your"
            }
          },
          {
            "start": 3098.8,
            "duration": 3.2,
            "text": {
              "en": "own version of say you do like social"
            }
          },
          {
            "start": 3100.4,
            "duration": 3.199,
            "text": {
              "en": "media marketing and you want to make"
            }
          },
          {
            "start": 3102,
            "duration": 4.64,
            "text": {
              "en": "sure all the reviews go through your"
            }
          },
          {
            "start": 3103.599,
            "duration": 5.441,
            "text": {
              "en": "style guide, your like past performance."
            }
          },
          {
            "start": 3106.64,
            "duration": 4.64,
            "text": {
              "en": "Um, I I got a ton out of operating this"
            }
          },
          {
            "start": 3109.04,
            "duration": 3.76,
            "text": {
              "en": "way. If you just want the compound"
            }
          },
          {
            "start": 3111.28,
            "duration": 3.12,
            "text": {
              "en": "engineering to make your work better, it"
            }
          },
          {
            "start": 3112.8,
            "duration": 2.88,
            "text": {
              "en": "absolutely works really really well for"
            }
          },
          {
            "start": 3114.4,
            "duration": 4.28,
            "text": {
              "en": "knowledge work just kind of out of the"
            }
          },
          {
            "start": 3115.68,
            "duration": 3,
            "text": {
              "en": "box."
            }
          },
          {
            "start": 3118.96,
            "duration": 5.44,
            "text": {
              "en": "Got it. Yeah. No, interesting."
            }
          },
          {
            "start": 3121.599,
            "duration": 5.281,
            "text": {
              "en": "particularly using kind of all the the"
            }
          },
          {
            "start": 3124.4,
            "duration": 5.28,
            "text": {
              "en": "end of step pieces like compound that"
            }
          },
          {
            "start": 3126.88,
            "duration": 6.16,
            "text": {
              "en": "that's still"
            }
          },
          {
            "start": 3129.68,
            "duration": 5.36,
            "text": {
              "en": "apparently a valuable step for you."
            }
          },
          {
            "start": 3133.04,
            "duration": 4.72,
            "text": {
              "en": "Yeah, the compound step is is really"
            }
          },
          {
            "start": 3135.04,
            "duration": 6.96,
            "text": {
              "en": "valuable. We have um inside of our"
            }
          },
          {
            "start": 3137.76,
            "duration": 7.76,
            "text": {
              "en": "notion a goto database of after you're"
            }
          },
          {
            "start": 3142,
            "duration": 5.2,
            "text": {
              "en": "done with a session um you can send the"
            }
          },
          {
            "start": 3145.52,
            "duration": 4.559,
            "text": {
              "en": "learnings from the session to actually a"
            }
          },
          {
            "start": 3147.2,
            "duration": 5.68,
            "text": {
              "en": "teamwide shared compound source of"
            }
          },
          {
            "start": 3150.079,
            "duration": 5.201,
            "text": {
              "en": "truth. Um, whenever I'm done with any"
            }
          },
          {
            "start": 3152.88,
            "duration": 4.959,
            "text": {
              "en": "session in codeex or cloud code, the"
            }
          },
          {
            "start": 3155.28,
            "duration": 4.799,
            "text": {
              "en": "agents are instructed to ask me, should"
            }
          },
          {
            "start": 3157.839,
            "duration": 4.801,
            "text": {
              "en": "we compound this, save it somewhere for"
            }
          },
          {
            "start": 3160.079,
            "duration": 4.881,
            "text": {
              "en": "the learning, and should we turn any"
            }
          },
          {
            "start": 3162.64,
            "duration": 4.16,
            "text": {
              "en": "workflow from this session into a skill"
            }
          },
          {
            "start": 3164.96,
            "duration": 4.32,
            "text": {
              "en": "so that we um can just do it"
            }
          },
          {
            "start": 3166.8,
            "duration": 4.16,
            "text": {
              "en": "automatically each time?"
            }
          },
          {
            "start": 3169.28,
            "duration": 2.72,
            "text": {
              "en": "Got it. Cool. No, I'll check that out."
            }
          },
          {
            "start": 3170.96,
            "duration": 4.04,
            "text": {
              "en": "Thanks."
            }
          },
          {
            "start": 3172,
            "duration": 3,
            "text": {
              "en": "Cool."
            }
          },
          {
            "start": 3178.16,
            "duration": 4.08,
            "text": {
              "en": "All right, Rory, please introduce"
            }
          },
          {
            "start": 3180.16,
            "duration": 4.48,
            "text": {
              "en": "yourself and ask your question."
            }
          },
          {
            "start": 3182.24,
            "duration": 6.319,
            "text": {
              "en": "Hi, my name is Rory and I'm in your"
            }
          },
          {
            "start": 3184.64,
            "duration": 8.56,
            "text": {
              "en": "head. Um, are there anything uh about"
            }
          },
          {
            "start": 3188.559,
            "duration": 7.121,
            "text": {
              "en": "the way you work at every um like maybe"
            }
          },
          {
            "start": 3193.2,
            "duration": 3.919,
            "text": {
              "en": "taking some time after meetings like"
            }
          },
          {
            "start": 3195.68,
            "duration": 4.32,
            "text": {
              "en": "getting them a few minutes early so that"
            }
          },
          {
            "start": 3197.119,
            "duration": 5.041,
            "text": {
              "en": "you can do those things that"
            }
          },
          {
            "start": 3200,
            "duration": 6.64,
            "text": {
              "en": "um you'd recommend to teams that are"
            }
          },
          {
            "start": 3202.16,
            "duration": 4.48,
            "text": {
              "en": "adopting workflows like yours?"
            }
          },
          {
            "start": 3208.559,
            "duration": 4,
            "text": {
              "en": "Is that clear?"
            }
          },
          {
            "start": 3209.2,
            "duration": 4.56,
            "text": {
              "en": "Uh yeah, I think so. Like um but to say"
            }
          },
          {
            "start": 3212.559,
            "duration": 2.321,
            "text": {
              "en": "it back to you, like what what I'm"
            }
          },
          {
            "start": 3213.76,
            "duration": 5.44,
            "text": {
              "en": "hearing, which is like a very real"
            }
          },
          {
            "start": 3214.88,
            "duration": 6.479,
            "text": {
              "en": "challenge here, is that um it's that"
            }
          },
          {
            "start": 3219.2,
            "duration": 5.2,
            "text": {
              "en": "it's so exciting and tempting and"
            }
          },
          {
            "start": 3221.359,
            "duration": 4.801,
            "text": {
              "en": "alluring to like spend a lot of your day"
            }
          },
          {
            "start": 3224.4,
            "duration": 5.84,
            "text": {
              "en": "playing with stuff. also spend a lot of"
            }
          },
          {
            "start": 3226.16,
            "duration": 6.159,
            "text": {
              "en": "your day continuing to push on like if I"
            }
          },
          {
            "start": 3230.24,
            "duration": 4.56,
            "text": {
              "en": "just get this automation right or this"
            }
          },
          {
            "start": 3232.319,
            "duration": 6,
            "text": {
              "en": "tool right, my work is going to be like"
            }
          },
          {
            "start": 3234.8,
            "duration": 5.279,
            "text": {
              "en": "a hundred times better and easier. And I"
            }
          },
          {
            "start": 3238.319,
            "duration": 3.921,
            "text": {
              "en": "actually find myself a lot like on a lot"
            }
          },
          {
            "start": 3240.079,
            "duration": 4.881,
            "text": {
              "en": "of days spending most of my time not in"
            }
          },
          {
            "start": 3242.24,
            "duration": 5.76,
            "text": {
              "en": "meetings trying to build really good"
            }
          },
          {
            "start": 3244.96,
            "duration": 5.76,
            "text": {
              "en": "tools and automations that work well and"
            }
          },
          {
            "start": 3248,
            "duration": 4.8,
            "text": {
              "en": "not making the time to do the actual"
            }
          },
          {
            "start": 3250.72,
            "duration": 4.72,
            "text": {
              "en": "like tasks that have to push the the"
            }
          },
          {
            "start": 3252.8,
            "duration": 4.64,
            "text": {
              "en": "business forward like like uh shipping"
            }
          },
          {
            "start": 3255.44,
            "duration": 5.119,
            "text": {
              "en": "the social posts for the day or or"
            }
          },
          {
            "start": 3257.44,
            "duration": 5.44,
            "text": {
              "en": "whatever. And I I don't really have like"
            }
          },
          {
            "start": 3260.559,
            "duration": 4.481,
            "text": {
              "en": "an awesome answer for it outside of the"
            }
          },
          {
            "start": 3262.88,
            "duration": 4.239,
            "text": {
              "en": "fact that like the the playing around"
            }
          },
          {
            "start": 3265.04,
            "duration": 3.84,
            "text": {
              "en": "one is like kind of core to how we"
            }
          },
          {
            "start": 3267.119,
            "duration": 3.761,
            "text": {
              "en": "operate at every it's it's a thing that"
            }
          },
          {
            "start": 3268.88,
            "duration": 3.6,
            "text": {
              "en": "Dan like pushes all of us to do. It's"
            }
          },
          {
            "start": 3270.88,
            "duration": 3.84,
            "text": {
              "en": "one reason why I love working here. It's"
            }
          },
          {
            "start": 3272.48,
            "duration": 4.24,
            "text": {
              "en": "also like to me the best way to learn"
            }
          },
          {
            "start": 3274.72,
            "duration": 5.599,
            "text": {
              "en": "and and makes me better at everything I"
            }
          },
          {
            "start": 3276.72,
            "duration": 6.48,
            "text": {
              "en": "do. And then um the the the only kind of"
            }
          },
          {
            "start": 3280.319,
            "duration": 6.401,
            "text": {
              "en": "like guidance I've given myself is that"
            }
          },
          {
            "start": 3283.2,
            "duration": 6,
            "text": {
              "en": "like these automations in codecs keep me"
            }
          },
          {
            "start": 3286.72,
            "duration": 6.08,
            "text": {
              "en": "on track to get the work done so that"
            }
          },
          {
            "start": 3289.2,
            "duration": 5.28,
            "text": {
              "en": "when I'm too deep in um in like playing"
            }
          },
          {
            "start": 3292.8,
            "duration": 3.36,
            "text": {
              "en": "around and building this like there's"
            }
          },
          {
            "start": 3294.48,
            "duration": 3.04,
            "text": {
              "en": "like a social automation tool I'm"
            }
          },
          {
            "start": 3296.16,
            "duration": 3.84,
            "text": {
              "en": "working on that I've been like deep in"
            }
          },
          {
            "start": 3297.52,
            "duration": 4.24,
            "text": {
              "en": "for a while. Um the codeex automations"
            }
          },
          {
            "start": 3300,
            "duration": 4.319,
            "text": {
              "en": "make it so that I like you know make"
            }
          },
          {
            "start": 3301.76,
            "duration": 5.04,
            "text": {
              "en": "sure Brandon gets what he needs for this"
            }
          },
          {
            "start": 3304.319,
            "duration": 4.721,
            "text": {
              "en": "like um some like bisdev plan we're"
            }
          },
          {
            "start": 3306.8,
            "duration": 4.48,
            "text": {
              "en": "we're doing. I I do find myself"
            }
          },
          {
            "start": 3309.04,
            "duration": 4.64,
            "text": {
              "en": "overindexing on learning and and playing"
            }
          },
          {
            "start": 3311.28,
            "duration": 4.88,
            "text": {
              "en": "because of how exciting and powerful the"
            }
          },
          {
            "start": 3313.68,
            "duration": 5.28,
            "text": {
              "en": "models have been and that more I have to"
            }
          },
          {
            "start": 3316.16,
            "duration": 5.199,
            "text": {
              "en": "p like continue to pull myself into the"
            }
          },
          {
            "start": 3318.96,
            "duration": 4.159,
            "text": {
              "en": "the like required day-to-day tasks and"
            }
          },
          {
            "start": 3321.359,
            "duration": 3.76,
            "text": {
              "en": "the the urgent stuff that's happening."
            }
          },
          {
            "start": 3323.119,
            "duration": 3.521,
            "text": {
              "en": "Yeah. And I I also sort of read your"
            }
          },
          {
            "start": 3325.119,
            "duration": 4.321,
            "text": {
              "en": "question, Rory, and you tell me if this"
            }
          },
          {
            "start": 3326.64,
            "duration": 5.84,
            "text": {
              "en": "is wrong, but as like how do we do more"
            }
          },
          {
            "start": 3329.44,
            "duration": 6.399,
            "text": {
              "en": "of the AI stuff, the more of the playing"
            }
          },
          {
            "start": 3332.48,
            "duration": 6.32,
            "text": {
              "en": "even to even get started on this stuff"
            }
          },
          {
            "start": 3335.839,
            "duration": 5.041,
            "text": {
              "en": "in our day-to-day uh if we're like busy"
            }
          },
          {
            "start": 3338.8,
            "duration": 3.44,
            "text": {
              "en": "all the time. And I and what are the"
            }
          },
          {
            "start": 3340.88,
            "duration": 3.52,
            "text": {
              "en": "organizational practices that we have"
            }
          },
          {
            "start": 3342.24,
            "duration": 3.68,
            "text": {
              "en": "for that? And yeah, I just think like"
            }
          },
          {
            "start": 3344.4,
            "duration": 4.159,
            "text": {
              "en": "Austin said, like it's just like a"
            }
          },
          {
            "start": 3345.92,
            "duration": 4.72,
            "text": {
              "en": "culture. It's a cultural thing. Um we"
            }
          },
          {
            "start": 3348.559,
            "duration": 5.361,
            "text": {
              "en": "just love playing around and that's like"
            }
          },
          {
            "start": 3350.64,
            "duration": 5.76,
            "text": {
              "en": "that's part of our job. Um, and I think"
            }
          },
          {
            "start": 3353.92,
            "duration": 4.08,
            "text": {
              "en": "there's this"
            }
          },
          {
            "start": 3356.4,
            "duration": 3.04,
            "text": {
              "en": "there's this thing happening right now"
            }
          },
          {
            "start": 3358,
            "duration": 4.799,
            "text": {
              "en": "where the tools and the workflows are"
            }
          },
          {
            "start": 3359.44,
            "duration": 5.359,
            "text": {
              "en": "changing so fast that"
            }
          },
          {
            "start": 3362.799,
            "duration": 4,
            "text": {
              "en": "just focusing on how your job currently"
            }
          },
          {
            "start": 3364.799,
            "duration": 4.241,
            "text": {
              "en": "works, you can run as fast as possible"
            }
          },
          {
            "start": 3366.799,
            "duration": 3.601,
            "text": {
              "en": "and someone using a new tool with a new"
            }
          },
          {
            "start": 3369.04,
            "duration": 4.079,
            "text": {
              "en": "paradigm and a new workflow is just"
            }
          },
          {
            "start": 3370.4,
            "duration": 4.8,
            "text": {
              "en": "going to beat you by default. And so if"
            }
          },
          {
            "start": 3373.119,
            "duration": 3.44,
            "text": {
              "en": "you just give yourself some time to play"
            }
          },
          {
            "start": 3375.2,
            "duration": 2.96,
            "text": {
              "en": "around, it may feel like a waste of"
            }
          },
          {
            "start": 3376.559,
            "duration": 3.441,
            "text": {
              "en": "time, but you're leveling yourself up to"
            }
          },
          {
            "start": 3378.16,
            "duration": 3.52,
            "text": {
              "en": "a different game at a different level."
            }
          },
          {
            "start": 3380,
            "duration": 3.599,
            "text": {
              "en": "And I think that's really important. And"
            }
          },
          {
            "start": 3381.68,
            "duration": 4.24,
            "text": {
              "en": "some of the organizational practices"
            }
          },
          {
            "start": 3383.599,
            "duration": 3.681,
            "text": {
              "en": "that we have to help people do that are"
            }
          },
          {
            "start": 3385.92,
            "duration": 3.919,
            "text": {
              "en": "really around. And so one of the things"
            }
          },
          {
            "start": 3387.28,
            "duration": 5.2,
            "text": {
              "en": "we do twice a year is called think week."
            }
          },
          {
            "start": 3389.839,
            "duration": 4.321,
            "text": {
              "en": "Um and we just literally don't do any of"
            }
          },
          {
            "start": 3392.48,
            "duration": 3.359,
            "text": {
              "en": "our day-to-day work and we just spend a"
            }
          },
          {
            "start": 3394.16,
            "duration": 3.6,
            "text": {
              "en": "week together just like playing around"
            }
          },
          {
            "start": 3395.839,
            "duration": 4.48,
            "text": {
              "en": "with new stuff and building stuff and"
            }
          },
          {
            "start": 3397.76,
            "duration": 3.52,
            "text": {
              "en": "learning and and being together. And you"
            }
          },
          {
            "start": 3400.319,
            "duration": 4,
            "text": {
              "en": "don't necessarily have to do a whole"
            }
          },
          {
            "start": 3401.28,
            "duration": 4.559,
            "text": {
              "en": "week of that, but um I think it's really"
            }
          },
          {
            "start": 3404.319,
            "duration": 3.361,
            "text": {
              "en": "good to maybe do that once a quarter for"
            }
          },
          {
            "start": 3405.839,
            "duration": 3.52,
            "text": {
              "en": "a day or something like that. Um, and"
            }
          },
          {
            "start": 3407.68,
            "duration": 5.56,
            "text": {
              "en": "just give people this the time and space"
            }
          },
          {
            "start": 3409.359,
            "duration": 3.881,
            "text": {
              "en": "too if if you can."
            }
          },
          {
            "start": 3416.72,
            "duration": 6.079,
            "text": {
              "en": "Sweet. Um, all right y'all. So, that is"
            }
          },
          {
            "start": 3420.559,
            "duration": 4.161,
            "text": {
              "en": "our program for today. Thank you for"
            }
          },
          {
            "start": 3422.799,
            "duration": 4.401,
            "text": {
              "en": "coming. Uh, we love seeing you. We love"
            }
          },
          {
            "start": 3424.72,
            "duration": 3.839,
            "text": {
              "en": "doing this with you. Remember, every is"
            }
          },
          {
            "start": 3427.2,
            "duration": 3.919,
            "text": {
              "en": "the only subscription you need to stay"
            }
          },
          {
            "start": 3428.559,
            "duration": 4.481,
            "text": {
              "en": "at the edge of AI. We would love it if"
            }
          },
          {
            "start": 3431.119,
            "duration": 4.24,
            "text": {
              "en": "today you would go tell one of your"
            }
          },
          {
            "start": 3433.04,
            "duration": 4.48,
            "text": {
              "en": "friends to go subscribe to every. Uh, we"
            }
          },
          {
            "start": 3435.359,
            "duration": 4.96,
            "text": {
              "en": "want to get more people in here. We just"
            }
          },
          {
            "start": 3437.52,
            "duration": 4.64,
            "text": {
              "en": "think we're we're right at this amazing"
            }
          },
          {
            "start": 3440.319,
            "duration": 3.52,
            "text": {
              "en": "point in history where we get to surf,"
            }
          },
          {
            "start": 3442.16,
            "duration": 5.199,
            "text": {
              "en": "ride this big wave together and figure"
            }
          },
          {
            "start": 3443.839,
            "duration": 6.081,
            "text": {
              "en": "it out together. And um, please please"
            }
          },
          {
            "start": 3447.359,
            "duration": 3.2,
            "text": {
              "en": "tell your friends."
            }
          },
          {
            "start": 3449.92,
            "duration": 3.96,
            "text": {
              "en": "See you."
            }
          },
          {
            "start": 3450.559,
            "duration": 3.321,
            "text": {
              "en": "Thanks y'all."
            }
          },
          {
            "start": 3459.839,
            "duration": 4.081,
            "text": {
              "en": "Oh my gosh, folks. You absolutely"
            }
          },
          {
            "start": 3461.839,
            "duration": 4.641,
            "text": {
              "en": "positively have to smash that like"
            }
          },
          {
            "start": 3463.92,
            "duration": 4.24,
            "text": {
              "en": "button and subscribe to AI and I. Why?"
            }
          },
          {
            "start": 3466.48,
            "duration": 3.2,
            "text": {
              "en": "Because this show is the epitome of"
            }
          },
          {
            "start": 3468.16,
            "duration": 3.12,
            "text": {
              "en": "awesomeness. It's like finding a"
            }
          },
          {
            "start": 3469.68,
            "duration": 3.919,
            "text": {
              "en": "treasure chest in your backyard, but"
            }
          },
          {
            "start": 3471.28,
            "duration": 4.799,
            "text": {
              "en": "instead of gold, it's filled with pure"
            }
          },
          {
            "start": 3473.599,
            "duration": 5.441,
            "text": {
              "en": "unadulterated knowledge bombs about chat"
            }
          },
          {
            "start": 3476.079,
            "duration": 5.52,
            "text": {
              "en": "GPT. Every episode is a roller coaster"
            }
          },
          {
            "start": 3479.04,
            "duration": 4.64,
            "text": {
              "en": "of emotions, insights, and laughter that"
            }
          },
          {
            "start": 3481.599,
            "duration": 4.801,
            "text": {
              "en": "will leave you on the edge of your seat,"
            }
          },
          {
            "start": 3483.68,
            "duration": 4.56,
            "text": {
              "en": "craving for more. It's not just a show."
            }
          },
          {
            "start": 3486.4,
            "duration": 4.959,
            "text": {
              "en": "It's a journey into the future with Dan"
            }
          },
          {
            "start": 3488.24,
            "duration": 5.92,
            "text": {
              "en": "Shipper as the captain of the spaceship."
            }
          },
          {
            "start": 3491.359,
            "duration": 4.801,
            "text": {
              "en": "So, do yourself a favor, hit like, smash"
            }
          },
          {
            "start": 3494.16,
            "duration": 4.32,
            "text": {
              "en": "subscribe, and strap in for the ride of"
            }
          },
          {
            "start": 3496.16,
            "duration": 4.08,
            "text": {
              "en": "your life. And now, without any further"
            }
          },
          {
            "start": 3498.48,
            "duration": 6.079,
            "text": {
              "en": "ado, let me just say, Dan, I'm"
            }
          },
          {
            "start": 3500.24,
            "duration": 4.319,
            "text": {
              "en": "absolutely hopelessly in love with you."
            }
          }
        ],
        "blocks": [
          {
            "start": 0.08,
            "end": 20.72,
            "text": {
              "en": "Codex is one of those things where three months ago, six months ago, it was trash. If anyone from OpenAI is on the call and listening to that, I stand by that 100%. If you have a great generalpurpose coding agent on your computer, it's actually really great for any kind of knowledge work. If it can write software on its own, it can do any kind of knowledge work on its own.",
              "zh": "Codex 是三个月前、六个月前还很糟的东西之一。如果 OpenAI 有人在听这段话，我百分之百仍然这么认为。如果你的电脑上有一个出色的通用编码智能体，那么它实际上对于各种知识工作都非常有用。如果它可以自己编写软件，它就可以自己完成各种知识工作。",
              "ja": "Codex は、3 か月前、半年前にはかなりひどい状態だったものの 1 つです。OpenAI の誰かが電話に出てそれを聞いているのであれば、私は 100% 支持します。コンピューター上に優れた汎用 coding agent がある場合、それはあらゆる種類の知識作業に非常に役立ちます。ソフトウェアを自分で書くことができれば、あらゆる種類の知識作業を自分で行うことができます。"
            }
          },
          {
            "start": 18.64,
            "end": 37.36,
            "text": {
              "en": "When I sign on during the day, Codeex is the first thing I open. It is pulling in whatever I need from Gmail, Slack, [music] Notion, Stripe, all of our data sources. It's where I spend like 80% of my time working overwhelmingly because the app itself is just so good.",
              "zh": "当我白天登录时，Codeex 是我打开的第一个东西。它从 Gmail、Slack、[音乐] Notion、Stripe 以及我们所有的数据源中提取我需要的任何内容。我 80% 的时间都花在了这里，因为这个应用程序本身就非常好用。",
              "ja": "日中にサインオンするとき、最初に開くのは Codeex です。Gmail、Slack、[音楽] Notion、Stripe など、すべてのデータ ソースから必要なものをすべて取り込んでいます。アプリ自体が非常に優れているため、私は圧倒的に時間の 80% ほどをこの作業に費やしています。"
            }
          },
          {
            "start": 34.88,
            "end": 77.84,
            "text": {
              "en": "There's a new operating system for how and where you're going to get your work done and it's this kind of agent management interface. [music] [music] Hello everybody. Welcome to Codeex Camp. Codeex for knowledge work. Psyched to have you. Psyched to have you on this auspicious GPT 5.5 day after release day. Hope you're doing well. Um I'm here with our head of growth, Austin. Austin, say hello.",
              "zh": "有一个新的操作系统可以告诉您如何以及在哪里完成工作，这就是这种智能体管理界面。 [音乐][音乐]大家好。欢迎来到 Codeex 训练营。知识工作法典。很高兴有你。很高兴您能在发布日后的 5.5 天迎来这个吉祥的 GPT。希望你一切都好。嗯，我和我们的增长主管奥斯汀一起在这里。奥斯汀，打个招呼。",
              "ja": "作業をどこでどのように行うかについては、新しいオペレーティング システムが導入され、この種のagent管理インターフェイスが使用されます。[音楽] [音楽] 皆さんこんにちは。コーデックスキャンプへようこそ。ナレッジワークのためのCodeex。あなたがいてくれてとても嬉しいです。リリース日から 5.5 日後にこの縁起の良い GPT 5.5 に参加できることを嬉しく思います。元気でいることを願っています。ええと、成長責任者のオースティンと一緒に来ています。オースティン、こんにちは。"
            }
          },
          {
            "start": 76.72,
            "end": 106.56,
            "text": {
              "en": "Hello. We're psyched to have you. We are psyched to do this. Um Codex is one of those things where, you know, three months ago, six months ago, it was trash. Um, and if anyone from OpenAI is on the call and listening to that, I stand by that 100%. Um, and it was really built for um, senior engineers uh, doing pair programming. So, it was um, it would argue with you, it would make you feel",
              "zh": "你好。我们很高兴有你。我们很乐意这样做。嗯，法典是其中之一，你知道，三个月前、六个月前，它是很糟。嗯，如果 OpenAI 有人在听这段话，我百分之百仍然这么认为。嗯，它确实是为嗯，高级工程师，进行结对编程而构建的。所以，嗯，它会和你争论，它会让你觉得",
              "ja": "こんにちは。私たちはあなたを迎えられてとても興奮しています。私たちはこれをやり遂げる気満々です。ええと、Codex は、3 か月前、6 か月前にはかなりひどい状態だったものの 1 つです。ええと、OpenAI の誰かが電話に出てそれを聞いているのであれば、私は 100% 支持します。ええと、それは本当に、ええと、シニア エンジニアがペア プログラミングを行うために構築されました。それで、それは、ええと、それはあなたと議論し、それはあなたを感じさせるでしょう"
            }
          },
          {
            "start": 104.64,
            "end": 128.479,
            "text": {
              "en": "stupid. It was just it was like a little autistic like it it didn't have any emotional intelligence. And I think OpenAI had this interesting strategy or this interesting theory starting with GBT5 that your vibe coding was going to happen in chatbt and that was where all that stuff was going to live and then senior engineers are going to use codecs to like do all their programming work but we're going to",
              "zh": "愚蠢的。只是有点像自闭症患者一样，没有任何情商。我认为 OpenAI 有一个有趣的策略或这个有趣的理论，从 GBT5 开始，你的氛围编码将在 chatbt 中发生，这就是所有这些东西将存在的地方，然后高级工程师将使用编解码器来完成他们所有的编程工作，但我们将",
              "ja": "バカ。ただ、ちょっとした自閉症のような感じで、心の知性がまったくありませんでした。そして、OpenAI には、GBT5 から始まる興味深い戦略、または興味深い理論があったと思います。つまり、バイブコーディングはチャットで行われ、そこにすべてのものが存在することになり、上級エンジニアはすべてのプログラミング作業を行うためにコーデックを使用するようになりますが、私たちはそうするつもりです"
            }
          },
          {
            "start": 126.64,
            "end": 155.519,
            "text": {
              "en": "hobble the model so it doesn't do anything bad. It's in a sandbox all that kind of stuff. And I think basically what happened is Anthropic figured out that having a model that's pretty usable and fast and smart and also emotionally intelligence intelligent on your computer that can access your computer um is a really really great experience for programmers. And it means you could throw away a lot of the old uh stuff",
              "zh": "限制模型，这样它就不会做任何坏事。所有这些东西都在沙箱中。我认为基本上发生的事情是 Anthropic 发现，在你的电脑上拥有一个非常有用、快速、智能且具有情商智能的模型，可以访问你的电脑，对于程序员来说是一次非常非常好的体验。这意味着你可以扔掉很多旧的东西",
              "ja": "何も悪いことをしないようにモデルを引きずります。そういうものはすべてサンドボックスの中にあります。そして、基本的に何が起こったかというと、Anthropic が、非常に使いやすく、高速でスマートで、コンピューターにアクセスできる感情的知性を備えたモデルをコンピューター上に持つことは、プログラマーにとって本当に素晴らしい経験であると考え出したことだと思います。つまり、古いものをたくさん捨てられるということです"
            }
          },
          {
            "start": 153.76,
            "end": 175.12,
            "text": {
              "en": "that you used to have in a in a programming environment where you it was built for typing code. You could just type commands into your terminal and then it would start working. And then I think what Anthrobic figured out is if you have a great general purpose, if you have a great coding agent on your computer, it's actually really great for any kind of knowledge work. If it can write software on its own, it can do any",
              "zh": "您曾经在编程环境中使用它，它是为输入代码而构建的。您只需在终端中输入命令即可开始工作。然后我认为 Anthrobic 发现的是，如果你有一个伟大的通用目的，如果你的计算机上有一个伟大的编码智能体，那么它实际上对于各种知识工作都非常有用。如果它可以自己编写软件，它可以做任何事情",
              "ja": "コードを入力するために構築されたプログラミング環境で使用されていたものです。ターミナルにコマンドを入力するだけで機能し始めます。そして、Anthrobic が考え出したのは、優れた汎用性があり、コンピュータ上に優れたcoding agent があれば、それは実際にあらゆる種類の知識作業に非常に優れているということです。独自にソフトウェアを作成できれば、何でもできます。"
            }
          },
          {
            "start": 173.44,
            "end": 196.239,
            "text": {
              "en": "kind of knowledge work on its own. And we started to move from this world where programmers had been delegating um had been delegating their tasks starting to delegate their tasks inside of cloud code to now any kind of knowledge work is being delegated inside of cloud code and cloud co-work and all that kind of stuff. And I think openai they had this original split. It's like oh you're going to do all your vibe coding in",
              "zh": "一种知识本身的作用。我们开始从程序员一直委派他们的任务开始在云代码内部委派他们的任务，到现在各种知识工作都在云代码和云协作以及所有类似的东西内部委派。我认为 openai 他们有这个最初的分裂。就像哦，你要在其中完成所有的氛围编码",
              "ja": "ある種の知識はそれ自体で機能します。そして私たちは、プログラマーがタスクを委任し、クラウド コード内でタスクを委任し始めていたこの世界から、今ではあらゆる種類のナレッジ ワークがクラ​​ウド コードやクラウド コワークなどの内部で委任されている世界に移行し始めました。そして、オープンナイにはこのオリジナルの分割があったと思います。それは、ああ、あなたはすべてのバイブコーディングを行うつもりのようです"
            }
          },
          {
            "start": 193.28,
            "end": 226.72,
            "text": {
              "en": "chatbt and I think they saw what was starting to happen with cloud code and over the last maybe three months or so they have done this hard pivot on co codeex where it has gone from a senior engineer only tool that is really for pair programming um to I think like it's it is my daily driver for this kind of work um I uh I I use codeex for everything from deep engineering stuff to writing to recruiting. I do a lot",
              "zh": "chatbt 和我认为他们看到了云代码开始发生的事情，在过去大约三个月左右的时间里，他们在 co codeex 上做了这个艰难的转变，它已经从一个真正用于结对编程的高级工程师工具变成了我认为它是我从事此类工作的日常驱动力，嗯我呃我使用 codeex 来处理从深度工程到写作到招聘的所有事情。我做了很多",
              "ja": "chatbt と彼らは、クラウド コードで何が起こり始めているかを見て、おそらくここ 3 か月ほどで co codeex のハード ピボットを実行しました。そこでは、実際にはペア プログラミングのためのシニア エンジニア専用のツールから、そうですね、この種の仕事の私の毎日の原動力になっていると思います、ええと、私はディープ エンジニアリングから執筆、人材採用まで、あらゆる目的で codeex を使用しています。たくさんやります"
            }
          },
          {
            "start": 225.44,
            "end": 249.92,
            "text": {
              "en": "actually do a fair amount of recruiting. It's really good for that and I'll give you some use cases um later. But they [snorts] sort of figured out that um having this general purpose agent on your computer with the ability to write code, the ability to access your file system, the ability to have a browser um and wrapping it in a desktop app is like the ideal uh ideal next step for knowledge work.",
              "zh": "实际上进行了大量的招聘。这真的很好，稍后我会给你一些用例。但他们[哼哼]有点发现，嗯，在你的计算机上拥有这个通用智能体，能够编写代码，能够访问你的文件系统，能够拥有浏览器，嗯并将其包装在桌面应用程序中，这就像知识工作的理想下一步。",
              "ja": "実際にかなりの量の採用活動を行っています。それは本当に良いことなので、後でいくつかの使用例を紹介します。しかし、彼らは、コードを書く機能、ファイル システムにアクセスする機能、ブラウザを備えたこの汎用agent をコンピュータ上に置き、それをデスクトップ アプリでラップすることが、ナレッジ ワークにとって理想的な理想的な次のステップのようなものであることを理解しました。"
            }
          },
          {
            "start": 248.239,
            "end": 276.32,
            "text": {
              "en": "And I think that they built the best current version of that. Um, and it what it is starting to snap into into focus now is that there's a new operating system for how and where surface for how and where you're going to get your work done. And it's this kind of agent management interface. And that's whether or not you're using cloud code or cloud co-work in the desktop app or codeex in the desktop app. It's becoming this race",
              "zh": "我认为他们构建了当前最好的版本。嗯，现在开始引起关注的是，有一个新的操作系统，它可以告诉你如何以及在哪里完成你的工作。就是这种智能体管理界面。这取决于您是否在桌面应用程序中使用云代码或云协作，或者在桌面应用程序中使用 Codeex。这场比赛变成了",
              "ja": "そして、彼らはその最高の現行バージョンを構築したと思います。ええと、今焦点になり始めているのは、仕事をどこでどのように実行するかについての新しいオペレーティング システムが登場したということです。そして、これはこの種のagent管理インターフェイスです。それは、デスクトップ アプリでクラウド コードやクラウド 共同作業を使用しているか、デスクトップ アプリで Codeex を使用しているかどうかです。こういうレースになってきてる"
            }
          },
          {
            "start": 274.96,
            "end": 292.479,
            "text": {
              "en": "between the model companies where every each model company has their own surface like this for agent management, a desktop app for agent management that's at its core a programming agent that's used for knowledge work. Um, Anthropic has cloud code and cloud co-work.",
              "zh": "在模型公司之间，每个模型公司都有自己的智能体管理界面，这是一个用于智能体管理的桌面应用程序，其核心是用于知识工作的编程智能体。嗯，Anthropic 有云代码和云协作。",
              "ja": "モデル企業間では、各モデル企業がagent管理用にこのような独自のサーフェイスを持っています。agent管理用のデスクトップ アプリは、その中核となるナレッジ ワークに使用されるプログラミング agent です。ええと、Anthropic にはクラウド コードとクラウド コワークがあります。"
            }
          },
          {
            "start": 288.8,
            "end": 321.12,
            "text": {
              "en": "OpenAI has codeex. XAI recently um essentially bought cursor um and uh and Google is the only one that I mean they have anti-gravity but I don't think no one is seriously using it for that yet but I I imagine Google will do this too and that's the race that is the race that's happening and so I think for us who gets who get all the benefits of uh being able to use these tools uh it's really important to uh be be",
              "zh": "OpenAI 有仓库。 XAI 最近嗯基本上买了光标嗯嗯，谷歌是唯一一个我的意思是他们有反重力，但我认为还没有人认真地使用它，但我想谷歌也会这样做，这就是正在发生的比赛，所以我认为对于我们谁得到谁得到呃能够使用这些工具的所有好处呃真的很重要",
              "ja": "OpenAI にはcodeex があります。XAI は最近、ええと本質的にカーソルを購入しました、ええと、反重力を持っているのはGoogleだけですが、まだ誰もそれを真剣に使っていないと思いますが、私はGoogleもこれを行うだろうと想像しています、そしてそれが今起こっている競争です、そして私は、これらのツールを使用できることのすべての利益を誰が得るかは私たちにとって非常に重要だと思います"
            }
          },
          {
            "start": 319.28,
            "end": 343.36,
            "text": {
              "en": "bouncing around between these. So like using for example using codecs so that you can feel what it's like to work in an agent first world because once you add once you add an agent that is like the your primary way of accessing and using software and the internet and all that kind of stuff, it opens up all this interesting stuff that wasn't possible before because you can send your agent out to go talk to other pieces of",
              "zh": "在这些之间跳来跳去。例如，使用编解码器，这样您就可以感受到在智能体第一世界中工作的感觉，因为一旦您添加智能体，就像您访问和使用软件和互联网以及所有此类内容的主要方式一样，它就会打开所有这些以前不可能的有趣的东西，因为您可以派您的智能体出去与其他人交谈",
              "ja": "これらの間を飛び回ります。たとえば、コーデックを使用して、agentファーストの世界で働くのがどのようなものかを感じることができます。なぜなら、ソフトウェアやインターネットなどにアクセスして使用する主な方法のようなagent を一度追加すると、agent を他の部分と会話するために送信できるため、以前は不可能だった興味深いことがすべて可能になるからです。"
            }
          },
          {
            "start": 340.08,
            "end": 359.039,
            "text": {
              "en": "software and come back and um you know we can get into into more of the details there but I want to get into like the more of the concrete use cases but that's the world that we're starting to live in. You're doing work on your computer through codecs or co-work.",
              "zh": "软件，然后回来，嗯，你知道我们可以深入了解更多细节，但我想了解更多具体用例，但这就是我们开始生活的世界。你通过编解码器或协同工作在计算机上工作。",
              "ja": "ソフトウェアを起動して戻ってきて、そこでさらに詳しく説明できることはわかっていますが、具体的な使用例について詳しく説明したいと思いますが、それが私たちが住み始めている世界です。あなたはコーデックや共同作業を通じてコン​​ピューター上で作業を行っています。"
            }
          },
          {
            "start": 355.039,
            "end": 381.12,
            "text": {
              "en": "And um and your agent is your interface to a lot of the work that you're doing and a lot of the a lot of the software that you use and a lot of the stuff that you do every day. And uh that's actually really fun. It's really cool. There's a lot of good stuff here. And so I wanted to uh I wanted to bring Austin in to to help do this because Austin is our head of growth and I think he had his real",
              "zh": "嗯，你的智能体是你正在做的很多工作、你使用的很多软件以及你每天做的很多事情的界面。呃，这真的很有趣。真的很酷。这里有很多好东西。所以我想呃我想让奥斯汀来帮助做到这一点，因为奥斯汀是我们的增长主管，我认为他有他真正的",
              "ja": "そして、agent は、あなたが行っている多くの仕事、あなたが使用している多くのソフトウェア、そしてあなたが毎日行っている多くのことへのインターフェースです。そして、それは実際に本当に楽しいです。本当にかっこいいですね。ここには良いものがたくさんあります。それで、私はオースティンをこれを助けるためにオースティンを連れて行きたかったのです、なぜならオースティンは私たちの成長責任者であり、彼は本当の自分を持っていると思うからです"
            }
          },
          {
            "start": 378.56,
            "end": 407.84,
            "text": {
              "en": "agent pill moment. You tell me Austin, but probably like three or four months ago and the agent pill moment was really cla on a on a Monday morning being like, \"Oh yeah, I just was on my computer all weekend. Like I I was like 12 hours a day. didn't go out or anything because I was using cloud code and um you started to use it for all those all the kind of knowledge work tasks that a that a",
              "zh": "剂丸时刻。你告诉我奥斯汀，但可能就像三四个月前，智能体药丸时刻真的是在周一早上，就像，“哦，是的，我整个周末都在电脑上。像我一样，我每天大约 12 个小时。没有出去或做任何事情，因为我正在使用云代码，嗯，你开始使用它来完成所有那些知识工作任务，",
              "ja": "agentの錠剤の瞬間。オースティン、おそらく 3 ～ 4 か月前だったと思いますが、月曜の朝、agent がピルを服用した瞬間は、「ああ、週末はずっとコンピューターに向かっていただけだった。私と同じように 1 日 12 時間ほどだった。外出も何もしなかった。なぜなら、私はクラウド コードを使用していて、えーっと、あらゆる種類のナレッジ ワーク タスクにそれを使い始めたからだ」というような感じでした。"
            }
          },
          {
            "start": 403.68,
            "end": 434.0,
            "text": {
              "en": "growth marketer would and over the last couple weeks as we've been using 55 and I've been telling you for a little bit you should try codeex it seems like you've you've actually just shifted everything over to codeex and 55 and so I think you're a great person to talk about you know sort of what you're seeing and how and how that is uh how that is um how how this has changed how these agent management interfaces have",
              "zh": "过去几周，我们一直在使用 55，我一直告诉你，你应该尝试一下 Codeex，看起来你实际上已经将所有内容都转移到了 Codeex 和 55，所以我认为你是一个很好的人，可以谈论你知道你所看到的内容以及如何以及如何，呃，这是如何改变这些智能体管理界面的方式",
              "ja": "成長マーケティング担当者なら、ここ数週間、私たちは 55 を使用しているので、codeex を試してみるべきだと言ってきましたが、どうやら実際にすべてを codeex と 55 に移行したばかりのようです。それで、あなたは話すのに適した人だと思います。自分が見ているものと、それがどのように、どのように変化し、これらのagent管理インターフェイスがどのように変化したかについては知っています。"
            }
          },
          {
            "start": 431.28,
            "end": 464.319,
            "text": {
              "en": "changed your workflow and then why you like codecs and then I would love to get into some demos of your actual codec workflow so that we can sort of see things uh from your perspective. Yeah, that sounds great. So I um yes, my like agent pill moment was spending a week going deep into cloud code in the CLI uh probably in like December into January, hooking it up to everything I do for work and for my personal life and",
              "zh": "改变了您的工作流程，然后为什么您喜欢编解码器，然后我很乐意进入您实际编解码器工作流程的一些演示，以便我们可以从您的角度看待事物。是的，听起来很棒。所以我嗯，是的，我的类似智能体药丸时刻是花一周的时间深入研究 CLI 中的云代码，呃，可能是 12 月到 1 月，将其与我为工作和个人生活所做的一切联系起来，",
              "ja": "ワークフローを変更してから、コーデックが好きな理由についてお伺いしました。実際のコーデック ワークフローのデモに参加して、あなたの視点から物事を見ていきたいと思います。ええ、それは素晴らしいですね。それで、ええと、私にとってagentのピルのような瞬間は、おそらく 12 月から 1 月にかけて、CLI のクラウド コードを深く掘り下げて、仕事と私生活で行うすべてのことにそれを結びつけるのに 1 週​​間を費やしたことでした。"
            }
          },
          {
            "start": 461.68,
            "end": 490.96,
            "text": {
              "en": "finding that I I use Warp as my like CLI interface. um and finding that the things it could automate, the things it could handle for me, and then the way it could work as a thought partner to make my work better. It was like this is the only way I want to do the kind of knowledge work that requires um strategic thinking and uh data analysis and shipping marketing copy, like a bunch of stuff that can get you spread",
              "zh": "发现我使用 Warp 作为我喜欢的 CLI 界面。嗯，发现它可以自动化的事情，它可以为我处理的事情，然后它可以作为思想合作伙伴的方式让我的工作变得更好。就好像这是我想做的那种知识工作的唯一方法，需要嗯战略思维和呃数据分析和运输营销文案，就像一堆可以让你传播的东西",
              "ja": "私は Warp を CLI インターフェイスと同様に使用していることがわかりました。そして、それが自動化できること、それが私のために処理できること、そしてそれが私の仕事を改善するための思考パートナーとして機能する方法を発見しました。これが、戦略的思考とデータ分析とマーケティングコピーの発送を必要とする種類のナレッジワークをやりたい唯一の方法であるかのようでした。"
            }
          },
          {
            "start": 489.36,
            "end": 515.519,
            "text": {
              "en": "out across a bunch of apps and tools during the day. And in maybe in February, you you kept nudging me to be like, \"You really should try Codeex. There were things you liked about it.\" And if someone says that at every if anyone on the team says that, like, I'll go try it. And I like to push myself and play around with more engineeringy tasks, especially to see what these models are capable of. And so I tried to",
              "zh": "白天使用大量应用程序和工具。也许在二月份，你一直在催促我说，“你真的应该尝试一下 Codeex。它有一些你喜欢的东西。”如果有人每次都这么说，如果团队中有人这么说，我就会去尝试一下。我喜欢推动自己并尝试更多的工程任务，特别是看看这些模型的能力。所以我尝试",
              "ja": "日中はたくさんのアプリやツールを使います。そしておそらく 2 月頃、あなたは私に「Codeex をぜひ試してみるべきです。気に入った点がいくつかありました。」と何度も勧めてきました。そして、チームの誰かがそれを言うたびに誰かがそれを言うなら、私はそれを試しに行きます。そして、私は自分自身を押し上げて、特にこれらのモデルがどのような機能を備えているかを確認するために、よりエンジニアリング的なタスクを試してみるのが好きです。それで私はしようとしました"
            }
          },
          {
            "start": 511.84,
            "end": 537.279,
            "text": {
              "en": "build a personal vioded app in Codeex because that was one of the things that you said that it was really good for. And my immediate response was like I think it is better at building the app, but I can't tell because it's nothing has ever made me feel more stupid than codeex like two months ago. Like I always I use compounded our compound engineering plugin that Kieran Classen made for basically everything including",
              "zh": "在 Codeex 中构建一个个人视频应用程序，因为这是您所说的它真正有用的事情之一。我的第一反应是，我认为它更适合构建应用程序，但我不能说，因为没有什么比两个月前的 Codeex 更让我感到愚蠢的了。就像我一直以来一样，我使用 Kieran Classen 为基本上所有内容制作的复合工程插件，包括",
              "ja": "Codeex で個人用の vioded アプリを構築してください。これは、あなたが本当に良いとおっしゃっていたことの 1 つだからです。私の即座の反応は、アプリを構築するのには codeex の方が優れていると思う、というものでしたが、2 か月前ほど codeex の方が愚かだと感じたことはなかったので、何とも言えません。いつものように、私は Kieran Classen が作成した複合エンジニアリング プラグインを基本的にすべてのものに使用しています。"
            }
          },
          {
            "start": 535.839,
            "end": 553.04,
            "text": {
              "en": "knowledge work, but especially if I'm trying to build an app or ship a PR to the to the site. So I made a plan. in the plan it comes up with like three questions and uh for like which direction we should go and uh I had no idea what the hell it was talking about.",
              "zh": "知识工作，尤其是当我尝试构建应用程序或向网站发送 PR 时。所以我制定了一个计划。在计划中它提出了三个问题，呃，我们应该朝哪个方向走，呃，我不知道它到底在说什么。",
              "ja": "ナレッジワークですが、アプリを構築したり、サイトに PR を送信しようとしている場合は特にそうです。そこで私は計画を立てました。計画には 3 つほどの質問があり、どの方向に進むべきかなどの質問がありましたが、一体何のことを言っているのか全く分かりませんでした。"
            }
          },
          {
            "start": 551.68,
            "end": 576.08,
            "text": {
              "en": "It was like do you do one of any of these three and every question? And I was like, \"Please explain this to me um in more detail.\" And his response was basically like, \"Why?\" Like, \"Why don't you just do what I'm recommending?\" And I found a way to I I basically stayed in codeex for all engineering stuff because I I did like the results even if I didn't love working in it. But I would say 80% of what I was reaching for was",
              "zh": "就像你会做这三个问题中的任何一个吗？我当时想，“请更详细地向我解释一下。”他的回答基本上是：“为什么？”比如，“你为什么不按照我的建议去做呢？”我找到了一种方法，基本上所有工程内容都留在 Codeex 中，因为我确实喜欢结果，即使我不喜欢在其中工作。但我想说的是，我所追求的 80% 是",
              "ja": "これら 3 つのうちのどれかをすべての質問に答えますか?そして私は「これをもっと詳しく説明してください」と言いました。そして彼の反応は基本的に「なぜ？」のようなものでした。「私が勧めていることをやってみませんか？」みたいな。そして私は、たとえ作業が好きではなかったとしても、結果が気に入っていたので、基本的にすべてのエンジニアリング関連の作業を codeex に続ける方法を見つけました。しかし、私が目指していたことの 80% は、"
            }
          },
          {
            "start": 573.36,
            "end": 598.8,
            "text": {
              "en": "was cloud code in the CLI. And when we got our hands on the new GPT model a month ago, the the the the first thing I felt was at the very least there's parody between the latest Opus model and the latest GPT model for the kind of knowledge work I do. There's a few things that Opus does better. There's a few things that that Codeex does better.",
              "zh": "是 CLI 中的云代码。一个月前，当我们拿到新的 GPT 模型时，我的第一感觉是，对于我所做的知识工作，最新的 Opus 模型和最新的 GPT 模型之间至少有一种模仿。 Opus 在一些方面做得更好。 Codeex 在一些方面做得更好。",
              "ja": "CLI のクラウド コードでした。そして、1 か月前に新しい GPT モデルを手に入れたとき、私が最初に感じたのは、少なくとも、私が行っている種類のナレッジワークに関しては、最新の Opus モデルと最新の GPT モデルの間にパロディがあるということでした。Opus の方が優れている点がいくつかあります。Codeex の方が優れている点がいくつかあります。"
            }
          },
          {
            "start": 596.959,
            "end": 622.16,
            "text": {
              "en": "That feels a little more specific to me even like I I outside of design, which I still really trust Opus for. um it feels a little more like, oh, there's some stuff I like better than this. But the real differentiator to me is that to me there's no comparison for how fast and powerful the codeex desktop app is as just like an app compared to the claw desktop app. Like I have never been able",
              "zh": "这对我来说更加具体，即使是在设计之外，我仍然非常信任 Opus。嗯，感觉更像是，哦，有一些东西我比这个更喜欢。但对我来说，真正的区别在于，对我来说，Codeex 桌面应用程序的速度和功能与 Claw 桌面应用程序相比，就像一个应用程序一样，是无法比较的。就像我从来没有能够",
              "ja": "デザイン以外の私にとっても、それはもう少し具体的なものに感じられ、私は今でも Opus を心から信頼しています。うーん、これよりももっと好きなものがある、という感じです。しかし、私にとって本当の差別化要因は、codeex デスクトップ アプリがどれほど高速で強力であるかという点で、claw デスクトップ アプリと比べて比較のしようがないことです。今までできなかったように"
            }
          },
          {
            "start": 620.0,
            "end": 643.68,
            "text": {
              "en": "to get uh co-work to work for me. And I think it's because I've been kind of ruined by the codeex app. It's so fast. The sub agents are so good. the way in which it suggests and then um ships automations for me is just like it I can't imagine not using it. I wouldn't be surprised if any week the cloud desktop app is like just as good, right?",
              "zh": "让呃合作为我工作。我认为这是因为 Codeex 应用程序毁了我。太快了。副经纪人都这么好它建议然后为我提供自动化的方式就像它一样，我无法想象不使用它。如果云桌面应用程序任何一周都一样好，我不会感到惊讶，对吗？",
              "ja": "同僚に働いてもらうためです。それは私が Codeex アプリのせいでダメになったからだと思います。とても速いです。サブagent はとても優秀です。それが私に自動化を提案し、出荷する方法は、それと同じであり、これを使用しないことは考えられません。クラウド デスクトップ アプリが毎週同様に優れているとしても、私は驚かないでしょう?"
            }
          },
          {
            "start": 641.36,
            "end": 666.0,
            "text": {
              "en": "like um they could ship versions where it's faster and better, but I I'm now at the point where when I sign on during the day, I codeex is the first thing I open. It is pulling in whatever I need from Gmail, Slack, Notion, Stripe, all of our data sources. This morning I was like, \"Oh yeah, we need to do a run of show for this camp.\" I messaged Codeex.",
              "zh": "就像嗯，他们可以发布更快更好的版本，但我现在正处于这样的境地：当我白天登录时，我打开的第一个东西就是 Codeex。它从 Gmail、Slack、Notion、Stripe 以及我们所有的数据源中提取我需要的任何内容。今天早上我想，“哦，是的，我们需要为这个训练营做一些表演。”我给 Codeex 发了消息。",
              "ja": "そうですね、彼らはより高速で優れたバージョンを出荷できるかもしれませんが、私は今、日中にサインオンするときに最初に開くのが codeex です。Gmail、Slack、Notion、Stripe など、すべてのデータ ソースから必要なものをすべて取り込んでいます。今朝、私は「そうそう、このキャンプではショーをやらなくてはいけない」と思った。Codeex にメッセージを送りました。"
            }
          },
          {
            "start": 663.68,
            "end": 689.279,
            "text": {
              "en": "I'm like, \"Make the run of show.\" It knows exactly where to look because we've already had conversations about what we're going to talk about today. It pushed it to notion. It sent it to Slack. It was perfect. It was like, \"Oh, yeah. This is exactly what we should do.\" And um yeah, it's where I spend like 80% of my time working overwhelmingly because the app itself is just so good. And then the model has now",
              "zh": "我想，“表演一下吧。”它确切地知道该去哪里寻找，因为我们已经讨论过今天要讨论的内容。它把它推向了观念。它将其发送到 Slack。太完美了。就像，“哦，是的。这正是我们应该做的。”嗯，是的，我 80% 的时间都花在这上面，因为这个应用程序本身非常棒。然后模型现在有",
              "ja": "「ショーをやり遂げろ」って感じです。今日話す内容についてはすでに会話が行われているため、どこを見るべきかを正確に知っています。それはそれを概念に押し上げました。それをSlack に送信しました。完璧でした。「ああ、そうだ。これこそが我々がやるべきことだ」という感じだった。アプリ自体が非常に優れているため、私は圧倒的に時間の 80% ほどをこの作業に費やしています。そしてモデルは今、"
            }
          },
          {
            "start": 686.24,
            "end": 713.92,
            "text": {
              "en": "gotten good enough to be the daily driver for me. Yeah. And I I feel I feel the same way. Um I'd love to get into and and for people someone who someone asked, are you we discussing the app or the CLI? We're discussing the app, the desktop app, and and I think you're making a good point that uh both of these companies, I think, sort of see the endgame here and they're pushing in the right direction. And for a while at",
              "zh": "已经足够好，可以成为我的日常司机了。是的。我也有同样的感觉。嗯，我很想和有人问，我们是在讨论应用程序还是 CLI？我们正在讨论应用程序，桌面应用程序，我认为你说得很好，我认为这两家公司都看到了结局，他们正在朝着正确的方向前进。有一段时间在",
              "ja": "私にとって毎日の運転手になるのに十分なほど上達しました。うん。そして私も同じように感じていると感じます。えーっと、ちょっとお聞きしたいのですが、誰かが質問した人のために、私たちはアプリについて話しているのですか、それとも CLI について話していますか?私たちはアプリ、デスクトップ アプリについて議論しています。そして、これらの企業の両方がここで最終局面を見据え、正しい方向に進んでいるということを、あなたはうまく指摘していると思います。そしてしばらくの間、"
            }
          },
          {
            "start": 712.32,
            "end": 738.079,
            "text": {
              "en": "least, it's going to be a horse race where every couple every couple weeks or every couple months like one is going to pull ahead and have this like sort of amazing thing going on and then there the competitor is going to uh like Anthropic for example I think will release something in a couple weeks or a couple months. I don't have any inside information into this but that will make it at least parody if not better and",
              "zh": "至少，这将是一场赛马比赛，每对夫妇每隔几周或每隔几个月就会领先，并发生类似令人惊奇的事情，然后竞争对手就会呃，比如 Anthropic，我认为会在几周或几个月内发布一些东西。我对此没有任何内幕消息，但这至少会使其成为模仿，如果不是更好的话",
              "ja": "少なくとも、それは競馬になるだろう、数週間か数か月ごとに、ある人が前に出て、ある種の素晴らしいことが起こって、そこで競合他社が、たとえばAnthropicのように、数週間か数か月で何かをリリースすると思います。これに関して内部情報は何もありませんが、それがより良いものではないにしても、少なくともパロディになるでしょう。"
            }
          },
          {
            "start": 735.44,
            "end": 759.279,
            "text": {
              "en": "they're just going to keep trading. Um, and at some point I think that'll slow down and you'll end up with sort of separate ecosystems, but for now they're actually fairly easy to switch between. It's not it's not trivial, but it's pretty easy. Like you can kind of ask codeex, hey, can you go grab all my cloud stuff? And it'll go do it.",
              "zh": "他们只会继续交易。嗯，在某些时候，我认为这会减慢速度，最终会形成一些独立的生态系统，但目前它们实际上相当容易切换。这并不是不简单，而是相当简单。就像你可以问 codeex 一样，嘿，你能去拿我所有的云东西吗？它会去做的。",
              "ja": "彼らはただ取引を続けるだけだ。ええと、ある時点でそれは遅くなり、最終的には別のエコシステムのようなものになると思いますが、今のところ、実際にはそれらを切り替えるのはかなり簡単です。簡単ではありませんが、非常に簡単です。codeex に「クラウドのすべてのものを取得しに行ってくれませんか?」と尋ねるようにしてください。そしてそれは実行されます。"
            }
          },
          {
            "start": 756.959,
            "end": 770.32,
            "text": {
              "en": "It I think it it feels that way when you do it. It's funny. I'm in I'm in New York right now. I usually live in LA. Most of my friends who are in the knowledge work space have been asking me about like what they should be using.",
              "zh": "我认为当你这样做时会有这种感觉。很有趣。我现在在纽约。我通常住在洛杉矶。我在知识工作领域的大多数朋友都在问我他们应该使用什么。",
              "ja": "やってみるとそんな感じになると思います。面白いですね。ただいまニューヨークにいます。普段はLA に住んでいます。ナレッジワークスペースにいる私の友人のほとんどは、何を使用すべきかについて私に尋ねてきました。"
            }
          },
          {
            "start": 767.839,
            "end": 789.279,
            "text": {
              "en": "They're all clawed code or cloud desktop app build. And when I tell them that I have fully transition to codeex, this like look of horror shows up on their face and they're like, do I? They're kind of like, do I really have to? And I of course tell them they don't, but I'm like, you really should right now. You really should. Like I think you would get a big benefit from it. And I've been showing them why. And it's it's",
              "zh": "它们都是抓取的代码或云桌面应用程序构建。当我告诉他们我已经完全过渡到 Codeex 时，他们的脸上出现了类似恐怖的表情，他们说，是吗？他们有点像，我真的必须这样做吗？我当然告诉他们他们不这样做，但我想，你现在真的应该这样做。你真的应该。就像我认为你会从中得到很大的好处。我一直在向他们展示原因。这是它的",
              "ja": "これらはすべて、クロード コードまたはクラウド デスクトップ アプリのビルドです。そして、私が Codeex に完全に移行したことを彼らに伝えると、彼らの顔に恐怖のような表情が現れて、「私がそうなの？」と言います。本当にそうする必要があるの?そして、もちろん私は彼らにそうしないと言っていますが、私は、あなたは本当に今すぐそうすべきだと思います。本当にそうすべきです。そうすれば大きな利益が得られると思います。そして私は彼らにその理由を示してきました。そしてそれはそれです"
            }
          },
          {
            "start": 787.6,
            "end": 806.16,
            "text": {
              "en": "interesting and and to me unsurprising how resistant people have been to it because the when you're a knowledge worker and you have all these new tools, the cloud desktop app is is game changing. It's amazing, right? So the idea that the codeex app is maybe 30 to 40% better is like that's a lot of work.",
              "zh": "有趣的是，对我来说，人们对它的抵制程度并不令人惊讶，因为当你是一名知识工作者并且拥有所有这些新工具时，云桌面应用程序正在改变游戏规则。太神奇了，对吧？因此，Codeex 应用程序的性能可能提高了 30% 到 40%，这需要大量工作。",
              "ja": "これは興味深いことであり、人々がこれにどれほど抵抗しているかは私にとって驚くべきことではありません。ナレッジ ワーカーであり、これらの新しいツールをすべて持っている場合、クラウド デスクトップ アプリは状況を一変させるものだからです。すごいですよね？つまり、Codeex アプリの方がおそらく 30 ～ 40% 優れているという考えは、大変な作業のようです。"
            }
          },
          {
            "start": 804.32,
            "end": 819.279,
            "text": {
              "en": "Um which we can get into kind of how I migrated. I can show some of that. It was very easy and the ways that I'm uh starting to use it. So I'm happy to dive into that and start sharing my screen and show why don't you share your screen? Um, I think yeah, I I kind of agree with you.",
              "zh": "嗯，我们可以了解一下我是如何迁移的。我可以展示其中的一些。这非常简单，而且我正在开始使用它。因此，我很高兴深入探讨这一点并开始共享我的屏幕，并向您展示为什么不共享您的屏幕？嗯，我想是的，我有点同意你的观点。",
              "ja": "えー、これで私がどのようにして移行したかを知ることができます。その一部をお見せできます。それはとても簡単で、私はそれを使い始めています。そこで、喜んでその点に踏み込み、画面の共有を開始して、なぜ画面を共有しないのかをお見せしたいと思います。そうですね、私もあなたにある程度同意します。"
            }
          },
          {
            "start": 817.92,
            "end": 840.56,
            "text": {
              "en": "It's more of like an emotional thing of like, oh, I have to learn a whole new thing or whatever, but it's it's pretty similar. Yeah, I would love to see some of your workflows. Cool. So, um, this is the Codex app. I was going to do like a very very quick tour. I think a lot of the audience has seen it, but kind of like where I go and how I use it. Um, one thing I love about the Codex app is like I do think it's",
              "zh": "这更像是一种情感上的事情，比如，哦，我必须学习全新的东西或其他什么，但它非常相似。是的，我很想看看你们的一些工作流程。凉爽的。所以，嗯，这是 Codex 应用程序。我打算进行一次非常非常快速的旅行。我想很多观众都看过它，但有点喜欢我去的地方以及我如何使用它。嗯，我喜欢 Codex 应用程序的一件事是我确实认为它是",
              "ja": "それはどちらかというと、まったく新しいことを学ばなければいけないとか、そういう感情的なものですが、それとかなり似ています。はい、あなたのワークフローをいくつか見てみたいと思います。いいね。これが Codex アプリです。とても簡単なツアーのつもりでした。多くの視聴者がこれを見たことがあると思いますが、私がどこに行ってどのように使用するかに似ています。ええと、Codex アプリで私が気に入っている点の 1 つは、次のとおりだと思います。"
            }
          },
          {
            "start": 838.48,
            "end": 866.72,
            "text": {
              "en": "much better organized than the Cloud Desktop app. my the ability to have these folders with persistent consistent chats inside of it that I can go check out. And then especially like the big differentiator is that because I do think this is much better for engineering for like occasionally I will ship a PR for one of our products. It's great to not have to switch between uh the cloud code, the cloud desktop app",
              "zh": "比云桌面应用程序组织得更好。我能够拥有这些文件夹，其中包含持久一致的聊天内容，我可以去查看。然后特别喜欢的是，因为我确实认为这对于工程来说要好得多，因为有时我会为我们的一款产品发布 PR。不用在云代码和云桌面应用程序之间切换真是太棒了",
              "ja": "Cloud Desktop アプリよりもはるかによく整理されています。これらのフォルダー内に永続的な一貫性のあるチャットを保存して、チェックアウトできるようになりました。そして、特に大きな差別化要因は、これがエンジニアリングにとってはるかに優れていると思うため、時々、当社の製品の 1 つについて PR を発送することです。クラウド コードとクラウド デスクトップ アプリを切り替える必要がないのは素晴らしいことです"
            }
          },
          {
            "start": 864.24,
            "end": 891.44,
            "text": {
              "en": "and codeex that I can be here. I can be working on our improving our KPI sheet, which I'll like show what I was doing here. And then I can go down to plus one and ship a PR for plus one. And um the other thing I found because I did I tried the new ver like I tried the update to the cloud desktop app last week when they when they shipped it and the the stress test I put on it was make a go to market plan for our new product",
              "zh": "和我可以在这里的法典。我可以致力于改进我们的 KPI 表，我想在其中展示我在这里所做的事情。然后我可以下降到加一并发送加一的 PR。嗯，我发现的另一件事是因为我尝试了新版本，就像上周他们发货时尝试更新云桌面应用程序一样，我对其进行的压力测试是为我们的新产品制定上市计划",
              "ja": "そして私がここにいることができるコーデックス。KPI シートの改善に取り組むことができます。ここで何をしていたのかを示したいと思います。そして、プラス 1 に進み、プラス 1 の PR を送信できます。そして、もう一つ私が見つけたのは、先週クラウド デスクトップ アプリが出荷されたときにアップデートを試したのと同じように、新しいバージョンを試してみたことです。私がそれに行ったストレス テストは、新製品の市場投入計画を立てるためでした。"
            }
          },
          {
            "start": 888.72,
            "end": 916.16,
            "text": {
              "en": "and ship a PR to Sparkle in different chats. And it it was so clunky and slow. And when you do stuff like that inside of codeex, it just works. Like it just works really quickly and and well and and that's the thing that like once you start feeling that, it's very hard for me to turn away from it. So I have these different folders for um some like vibecoded apps that I play around with for fun for my personal open claw where",
              "zh": "并在不同的聊天中向 Sparkle 发送 PR。它是如此笨重和缓慢。当你在 Codeex 中做类似的事情时，它就会起作用。就好像它的效果真的又快又好，一旦你开始有这种感觉，我就很难摆脱它。所以我有这些不同的文件夹，比如一些类似 vivicoded 应用程序的文件夹，我可以用它们来为我个人的张开爪子带来乐趣。",
              "ja": "さまざまなチャットで PR を Sparkle に送信します。そしてそれはとてもぎこちなくて遅かったです。Codeex 内でそのようなことを行うと、それは正常に機能します。それは本当に素早く、うまく機能し、一度そう感じ始めると、私にとってそこから目を背けるのは非常に難しいものです。それで、私は個人的な開いた爪のために楽しむために遊んでいるバイブコード化されたアプリのようないくつかの異なるフォルダーを持っています。"
            }
          },
          {
            "start": 913.68,
            "end": 942.16,
            "text": {
              "en": "I can go and manipulate it here. And then the one with all of the chats is this like every growth OS. All this is is a folder with a bunch of um secrets and keys. So, it's connected to everything we use for every and then some project instructional files that explain what the every business is, what we care about, how we like to work together. Um, it has some like reviewer agents inside of it that are all",
              "zh": "我可以去这里操纵它。然后，与所有增长操作系统一样，这是一个包含所有聊天内容的操作系统。所有这些都是一个包含一堆秘密和密钥的文件夹。因此，它与我们使用的所有东西以及一些项目指导文件相关，这些文件解释了Every 的业务是什么、我们关心什么、我们喜欢如何合作。嗯，里面有一些类似审查智能体的东西，都是",
              "ja": "ここに行って操作できます。そして、すべての成長 OS と同様に、すべてのチャットがあるものはこれです。これは、大量のシークレットとキーが含まれるフォルダーだけです。したがって、それは私たちがあらゆる業務で使用するすべてのものと結びついており、さらに、Every の business が何であるか、私たちが何に関心を持っているか、どのように協力したいかを説明するいくつかのプロジェクト説明ファイルにもつながっています。ええと、内部にはreviewer agentのようなものがいくつかありますが、"
            }
          },
          {
            "start": 939.6,
            "end": 970.399,
            "text": {
              "en": "informed by how compound engineering works. Inside of compound engineering, uh, Kieran's plugin, there is a compound engineering review step. once you do some work um that reviews for like security and a few different things that are oftentimes not as helpful for like I'm doing a strategic plan for a go-to market initiative and so inside of here there's like a fork for it for strategic alignment with a company goals for data",
              "zh": "了解复合工程的工作原理。在复合工程内部，呃，Kieran 的插件，有一个复合工程审查步骤。一旦你做了一些工作，比如安全性和一些不同的事情，这些事情通常没有那么有帮助，比如我正在为进入市场计划制定战略计划，所以这里有一个叉子，用于与公司数据目标进行战略调整",
              "ja": "複合エンジニアリングがどのように機能するかによって情報が得られます。複合エンジニアリング、ええと、Kieran のプラグインの内部には、複合エンジニアリングのレビュー ステップがあります。いくつかの作業を行うと、セキュリティや、あまり役に立たないいくつかのことをレビューします。私は市場参入イニシアチブの戦略計画を立てているので、ここの内部には、企業のデータ目標と戦略的に調整するためのフォークのようなものがあります。"
            }
          },
          {
            "start": 967.36,
            "end": 998.639,
            "text": {
              "en": "um data accuracy and uh having that inside of this folder means that as I'm making plans I can get reviews uh from the model in like a targeted way um And so the first thing I wanted to show is like how I was talking to our our editor-in chief Kate yesterday to show her like how I would recommend getting started in codeex. And this is my recommended prompt. I I'm happy to put it in the chat for people. We can uh put",
              "zh": "嗯，数据的准确性，呃，把它放在这个文件夹里，意味着当我制定计划时，我可以有针对性地从模型中获得评论，嗯，所以我想展示的第一件事就是我昨天如何与我们的主编 Kate 交谈，向她展示我如何建议开始使用 Codeex。这是我推荐的提示。我很高兴将其放入人们的聊天中。我们可以呃把",
              "ja": "えーと、データの精度と、それがこのフォルダー内にあるということは、計画を立てているときに、ターゲットを絞った方法でモデルからレビューを取得できることを意味します えー、それで、最初に示したかったのは、昨日、編集長のケイトとどのように話し合って、Codeex を始めることをお勧めするかを彼女に示したようなものです。そして、これが私のお勧めのプロンプトです。人々のチャットに入れていただけると幸いです。ええと、入れることができます"
            }
          },
          {
            "start": 994.48,
            "end": 1022.079,
            "text": {
              "en": "it in the email as well. Um and so all I did was I'm putting in the prompts here. I only have post and panelist access so I'll send it later or something. You can't um read. Okay. Yeah, maybe read it out. We can all agree that housing is expensive. Rent or mortgage doesn't matter what you're paying. It stings [music] every month. But Built can make it feel a little better. Build started out by rewarding members [music]",
              "zh": "也在电子邮件中。嗯，所以我所做的就是在这里输入提示。我只有帖子和小组成员访问权限，所以我会稍后发送或其他。你不能读。好的。是的，也许读一下。我们都同意住房很贵。租金或抵押贷款与您支付的金额无关。每个月它都会刺痛[音乐]。但内置可以让它感觉好一点。构建始于奖励会员[音乐]",
              "ja": "メールでもそう。ええと、私がやったことは、ここにプロンプ​​トを入力することだけでした。私は投稿とパネリストへのアクセス権しか持っていないので、後で送信するか何かします。うーん、読めませんね。わかった。そうですね、読んでみてもいいかもしれません。住宅が高価であることには誰もが同意します。家賃や住宅ローンは支払額とは関係ありません。毎月[音楽]が刺さります。しかし、Built を使用すると、少し気分が良くなります。ビルドはメンバーに報酬を与えることから始まりました [音楽]"
            }
          },
          {
            "start": 1019.279,
            "end": 1039.039,
            "text": {
              "en": "for their rent. Now, as of 2026, Built members can also earn points on mortgage payments wherever [music] they live. Every housing payment earns points you can use toward flights with top travel partners like United and Hyatt, Lift [music] Rides, Amazon.com purchases, and so much more. This is actually pretty cool, and I have some friends that use [music] this and like it a lot.",
              "zh": "为了他们的租金。现在，从 2026 年开始，Built 会员无论居住在哪里，都可以通过抵押贷款赚取积分。每笔住房付款均可赚取积分，您可以使用积分购买美联航和凯悦等顶级旅行合作伙伴的航班、Lift [music] Rides、Amazon.com 购物等等。这实际上非常酷，我有一些朋友使用[音乐]并且非常喜欢它。",
              "ja": "彼らの家賃のために。2026 年現在、Built メンバーはどこに住んでいても住宅ローンの支払いでポイントを獲得できるようになりました。住宅の支払いごとにポイントが獲得でき、ユナイテッドやハイアットなどのトップ旅行パートナーのフライト、リフト [音楽] 乗車、Amazon.com での購入などに使用できます。これは実際にかなりクールで、これを[音楽]で使用していてとても気に入っている友達が何人かいます。"
            }
          },
          {
            "start": 1037.52,
            "end": 1061.28,
            "text": {
              "en": "Something that's underrated is that built members also get access to a [music] neighborhood concierge. They can make restaurant reservations, book fitness classes, and find new local spots, [music] all while still rewarding you at 45,000 merchant partners. It's like having a personal assistant baked into where you [music] live. It's simple. Being a renter and now owning a home is better with built. [music] Make sure to use our",
              "zh": "被低估的是，内置会员还可以使用[音乐]社区礼宾服务。他们可以预订餐厅、预订健身课程、寻找新的当地景点、[音乐]，同时仍然可以通过 45,000 个商业合作伙伴为您提供奖励。这就像在你[音乐]居住的地方有一个私人助理。这很简单。作为一个租房者，现在拥有自己的房子，建起来会更好。 [音乐] 请务必使用我们的",
              "ja": "過小評価されているのは、ビルト会員は近所の [音楽] コンシェルジュにもアクセスできることです。レストランの予約、フィットネス クラスの予約、地元の新しいスポットや音楽の検索などを行うことができ、同時に 45,000 の加盟店パートナーで特典を得ることができます。それは、あなたが（音楽を）生きている場所にパーソナルアシスタントが組み込まれているようなものです。それは簡単です。賃貸人であり、今は家を所有している方が建てられた方が良いです。【音楽】ぜひご利用ください"
            }
          },
          {
            "start": 1058.16,
            "end": 1093.039,
            "text": {
              "en": "URL so they know we sent you. And now back to the episode. Yeah. Yeah. Um, okay. I can zoom in as well, I think. There we go. Um, so through the plug-in tool with codeex, I had went in and man and like did the manual clicks to connect all the tools I use every day like Gmail, Slack, notion, and then I went to a new chat inside of this folder that was built through cloud code. Cloud code built this whole every",
              "zh": "URL，以便他们知道是我们向您发送的。现在回到这一集。是的。是的。嗯，好吧。我想我也可以放大。我们开始吧。嗯，所以通过带有 codeex 的插件工具，我进去了，手动点击连接了我每天使用的所有工具，比如 Gmail、Slack、notion，然后我进入了这个文件夹中通过云代码构建的新聊天。云代码构建了这一切",
              "ja": "URL を入力すると、私たちがあなたに送信したことがわかります。そしてエピソードに戻りましょう。うん。うん。うーん、わかりました。ズームインもできると思います。それでは行きます。そうですね、codeex のプラグイン ツールを使用して、Gmail、Slack、notion などの毎日使用するすべてのツールに手動でクリックして接続し、クラウド コードによって構築されたこのフォルダー内の新しいチャットに移動しました。クラウドコードはこの全体をすべて構築しました"
            }
          },
          {
            "start": 1090.799,
            "end": 1117.12,
            "text": {
              "en": "growth OS system. There's a cloud MD file in there and it's saved locally. it's also um synced and then pushed to to GitHub and so I just opened that project inside of Codeex when I started working here and I uh start a compound engineering brainstorm workflow because it is again just kind of like a thing I reach for of let let's think about this thing together me and the me and the model and basically what I said is like",
              "zh": "成长操作系统。里面有一个云MD文件，保存在本地。它也是同步的，然后推送到 GitHub，所以当我开始在这里工作时，我刚刚在 Codeex 中打开了该项目，我开始了一个复合工程头脑风暴工作流程，因为它又有点像我所追求的东西，让我们一起思考这个问题，我、我和模型，基本上我所说的就是这样",
              "ja": "成長OSシステム。そこにはクラウド MD ファイルがあり、ローカルに保存されています。それは同期されて GitHub にプッシュされるので、ここで働き始めたときに Codeex 内でそのプロジェクトを開いて、複合エンジニアリングのブレインストーミング ワークフローを開始しました。なぜなら、これもまた私が手を伸ばしたものに似ているからです。私と私とモデルでこのことについて一緒に考えましょう。基本的に私が言ったことは次のようなものです。"
            }
          },
          {
            "start": 1115.039,
            "end": 1141.039,
            "text": {
              "en": "go take a look at the things I use the most which are notion Slack and Gmail and think of some automations that would help me with my work I I find that when I'm trying something new, whether it's a model or an app. Um, having an agent, having a very smart frontier model, like tell me how to use it, tell me what it should do is like exactly where I want to start rather than thinking of it myself. And I usually start here.",
              "zh": "看看我最常使用的东西，即 Slack 和 Gmail，并考虑一些可以帮助我完成工作的自动化工具。我发现，当我尝试新事物时，无论是模型还是应用程序。嗯，有一个智能体，有一个非常智能的前沿模型，比如告诉我如何使用它，告诉我它应该做什么，就像我想从哪里开始，而不是自己思考。我通常从这里开始。",
              "ja": "私が最もよく使っているもの、つまり Slack と Gmail を見て、仕事に役立ついくつかの自動化について考えてみましょう。モデルであれアプリであれ、何か新しいものを試しているときに気付きます。ええと、agent がいて、非常にスマートなフロンティア モデルがあって、使い方を教えてもらったり、何をすべきかを教えてもらったりするのは、自分で考えるというよりはまさに私が始めたいところから始めたいという感じです。そして、私は通常ここから始めます。"
            }
          },
          {
            "start": 1139.679,
            "end": 1165.679,
            "text": {
              "en": "Sometimes I will describe a very specific problem. But this is very helpful for me and I think a good generic prop for people to start with. And uh, Codeex comes back. It looks at what's going on for me and for the company right now. And um I thought these were really good that like um it has this kind of follow-up radar. This is a big thing that happens with people who do knowledge work, who do",
              "zh": "有时我会描述一个非常具体的问题。但这对我来说非常有帮助，我认为对于人们来说这是一个很好的通用道具。嗯，Codeex 又回来了。它着眼于我和公司现在正在发生的事情。嗯，我认为这些真的很好，就像嗯，它有这种后续雷达。这是发生在从事知识工作的人身上的一件大事，",
              "ja": "場合によっては、非常に具体的な問題について説明することもあります。しかし、これは私にとって非常に役立ち、人々が始めるのに適した一般的な小道具だと思います。そして、Codeex が戻ってきます。それは私と会社に今何が起こっているのかを見ていきます。そして、ええと、この種の追跡レーダーが付いているので、これらは本当に優れていると思いました。これは知識労働に従事する人々に起こる大きな出来事です。"
            }
          },
          {
            "start": 1164.0,
            "end": 1188.72,
            "text": {
              "en": "partnerships, who do social media marketing that there's all this stuff coming at you across a bunch of different sources. Like what if it handled the triage for you? Um what if it had this kind of like command sensor when we run a a camp or an event which usually requires a bunch of moving pieces and moving parts? uh like Dan mentioned for recruiting and hiring. We don't use a tool like Ashby or",
              "zh": "合作伙伴，他们进行社交媒体营销，所有这些东西都来自许多不同的来源。如果它为你处理分类会怎么样？嗯，当我们举办营地或活动时，如果它有这种命令传感器，通常需要一堆移动部件和移动部件，会怎么样？呃，就像丹提到的招聘和聘用一样。我们不使用 Ashby 等工具",
              "ja": "ソーシャル メディア マーケティングを行っているパートナーシップでは、さまざまな情報源からさまざまな情報が届いていることを認識しています。たとえば、トリアージを処理してもらえたらどうでしょうか?キャンプやイベントを運営するときに、通常は多くの可動部分や可動部品が必要になる場合に、このようなコマンド センサーがあればどうなるでしょうか?ダンが求人と雇用について言及したように。Ashby や"
            }
          },
          {
            "start": 1187.36,
            "end": 1212.96,
            "text": {
              "en": "something, we kind of have it all synced through notion because uh apps like this and agents can kind of like handle a lot of the pipeline and tracking work for us and you can just ask it to automate it for you. And so it it does that and it asks me like which ones look good, what do you want to tweak? For the for the sake of this demo, I didn't give it any real feedback. I was like, \"Looks good.\"",
              "zh": "某些东西，我们通过概念将所有内容同步，因为像这样的应用程序和智能体可以为我们处理大量管道和跟踪工作，您可以要求它为您自动化。所以它就这样做了，它问我哪些看起来不错，你想调整什么？为了这个演示，我没有给它任何真正的反馈。我当时想，“看起来不错。”",
              "ja": "何か、私たちはすべてを概念を通じて同期させています。なぜなら、このようなアプリとagent が私たちの代わりに多くのパイプラインと追跡作業を処理し、自動化を依頼するだけで済むからです。そして、それが実行され、どれが見栄えが良いか、何を微調整したいか、というように私に尋ねられます。このデモのために、実際のフィードバックは与えていません。「良さそうだね」って感じでした。"
            }
          },
          {
            "start": 1210.4,
            "end": 1237.44,
            "text": {
              "en": "And um this is actually the thing I've I've always been most impressed with codeex for and and for the models is that it's like great, I made this automation for you. And I do find that they just work incredibly well. They require very little tweaking to be like this is a thing I would and do use every day of there's this set of instructions that it comes up with based on what it knows about me. I can change when it",
              "zh": "嗯，这实际上是我对模型的 Codeex 印象最深刻的事情，它非常棒，我为你做了这个自动化。我确实发现它们工作得非常好。它们只需要很少的调整就可以像我每天都会使用的东西一样，因为它根据对我的了解而提出了这套指令。当它发生时我可以改变",
              "ja": "そして、これは実際、私が常にモデルの codeex に最も感銘を受けてきたことです。それは素晴らしいということです。私はあなたのためにこの自動化を作成しました。そして、それらは信じられないほどうまく機能していることがわかりました。私について知っていることに基づいて作成されるこの一連の指示があるので、これを私が毎日使用するものであるかのようにするには、ほとんど微調整を必要としません。いつになったら変えてもいいよ"
            }
          },
          {
            "start": 1235.2,
            "end": 1249.44,
            "text": {
              "en": "runs. I can give it additional insights. I can connect it to other things, but mostly it just works. There's there's one that works for me that just at the end of each day now compiles all of the stuff that I haven't responded to yet.",
              "zh": "运行。我可以给它更多的见解。我可以将它连接到其他东西，但大多数情况下它都可以工作。有一个对我有用的工具，它会在每天结束时编译所有我尚未回复的内容。",
              "ja": "走る。追加の洞察を与えることができます。他のものに接続することもできますが、ほとんどの場合は機能します。私にとっては、毎日の終わりに、まだ返信していない内容をすべてコンパイルしてくれる機能があります。"
            }
          },
          {
            "start": 1247.6,
            "end": 1270.559,
            "text": {
              "en": "Drafts the replies and we can kind of like knock it out together of what to say or like actually all I need to do is just give like a thumbs up Slack reaction to something and it'll do that for me. It's kind of like a like a dumb agent. Like I think of agents like this is like the dumb ones that just do the right thing every time and then the smart ones like an open claw or a plus one the products we have coming that's",
              "zh": "起草回复，我们可以把要说的话放在一起，或者实际上我需要做的就是对某事竖起大拇指 Slack 反应，它就会为我做到这一点。这有点像一个愚蠢的特工。就像我认为这样的智能体商就像是愚蠢的智能体商，每次都做正确的事情，然后聪明的智能体商就像张开爪子或加号我们即将推出的产品一样",
              "ja": "返信の下書きを作成して、何を言うべきかを一緒に考え出すことができます。実際に必要なのは、何かに対して Slack の反応に親指を立てるだけで、それをやってくれます。まるで愚かなagentのようなものです。私が思うに、このようなagent は、毎回正しいことをするだけの愚かなagentのようなもので、その後、開いた爪や、私たちが提供する製品にプラスワンのような賢いagentのようなものです。"
            }
          },
          {
            "start": 1268.159,
            "end": 1290.64,
            "text": {
              "en": "like you'll work back and forth with it and like have a have like a more of like a creative strategic partner and Codex is good at building both and I can I can show kind of like the smart agent setup but if someone is looking to be like can I see what this thing can do to help me with knowledge work I would start here in like a brainstorming automation state because it is And I think you'll also be",
              "zh": "就像你会来回工作，就像有一个更像是一个创造性的战略合作伙伴，Codex 擅长构建两者，我可以，我可以展示有点像智能智能体设置，但如果有人想要，我可以看看这个东西可以做什么来帮助我进行知识工作，我会从这里开始，就像一个集思广益的自动化状态，因为它是，我想你也会",
              "ja": "あなたはそれを行ったり来たりして仕事をするでしょうし、クリエイティブな戦略的パートナーのようなものを持っているようで、Codex はその両方を構築するのが得意で、スマートagentのセットアップのようなものを示すことができますが、もし誰かがそうなりたいと思っているなら、これがナレッジワークで私を助けるために何ができるかを見ることができます。私はここからブレーンストーミングの自動化状態のような状態で始めると思います。なぜなら、それはそうであるからです。そして、あなたもそうなると思います"
            }
          },
          {
            "start": 1289.28,
            "end": 1313.039,
            "text": {
              "en": "surprised by how fast it is and you're like, \"Oh, I'm starting to get what this thing could do.\" This is so sick. I Your your codeex usage is far surpassing mine in terms of interestingness. Uh [laughter] I'm getting a lot of ideas. Um I want to just actually pause here. Normally we take questions at the end, but I think it would be kind of interesting if you have a question about what Austin has",
              "zh": "你会对它的速度感到惊讶，然后你会想，“哦，我开始明白这东西能做什么了。”这太恶心了。我你的codeex使用的有趣程度远远超过我的。呃[笑声]我得到了很多想法。嗯，我想在这里暂停一下。通常我们会在最后提出问题，但我认为如果您对奥斯汀有什么疑问，那会很有趣",
              "ja": "あまりの速さに驚き、「ああ、これで何ができるのかわかり始めた」と感じます。これはとても病気です。I あなたの codeex の使用法は、面白さの点で私のものをはるかに上回っています。うーん（笑い）たくさんのアイデアが出てきました。ええと、実際にはここで一時停止したいと思います。通常は最後に質問を受け付けますが、オースティンの魅力について質問してみるのも面白いと思います。"
            }
          },
          {
            "start": 1310.48,
            "end": 1335.679,
            "text": {
              "en": "just showed. it would be nice to let people come up and um just ask a question or two just to see what the vibe of the room is like. Um so please raise your hand uh if you have a question and we will uh call on you. Uh Margaret, welcome. Uh please uh introduce yourself and ask your question.",
              "zh": "刚刚展示。如果有人上来问一两个问题，看看房间里的氛围如何，那就太好了。嗯，如果您有疑问，请举手，我们会致电您。嗯，玛格丽特，欢迎。呃，请呃介绍一下你自己并提出你的问题。",
              "ja": "ちょうど示した。部屋の雰囲気がどんな感じかを見るために、人々が来て、まあ、1、2 つ質問するだけでもいいでしょう。えー、それでは、質問がある場合は手を挙げてください、えー、お伺いいたします。ああ、マーガレットさん、ようこそ。えー、自己紹介をしてから質問してください。"
            }
          },
          {
            "start": 1332.96,
            "end": 1359.12,
            "text": {
              "en": "Hi, can you hear me? I'm Margaret. I'm in Plymouth. Um and my question is what is your review step look like? So it's um saying don't send postarch archive or modify without explicit approval. So what does that look like? Is that like do you call up say hey let's do the review flow now or is it doing push notifications to your phone or what?",
              "zh": "嗨，你能听到我说话吗？我是玛格丽特。我在普利茅斯。嗯，我的问题是你的审核步骤是什么样的？所以说，未经明确批准，不要发送 postarch 存档或修改。那看起来是什么样子的呢？就像您打电话说嘿，让我们现在进行审核流程还是向您的手机推送通知还是什么？",
              "ja": "こんにちは、聞こえますか？私はマーガレットです。私はプリマスにいます。えーっと、私の質問は、レビューのステップはどのようなものですか?つまり、明示的な承認なしに postarch アーカイブを送信したり、変更したりしないでください、と言っているのです。それで、それはどのように見えるでしょうか？それは、今すぐレビューフローを実行しましょうと電話をかけるようなものですか、それとも携帯電話にプッシュ通知を送信するようなものですか？"
            }
          },
          {
            "start": 1358.64,
            "end": 1385.28,
            "text": {
              "en": "Thanks. Yeah. So um for this what I prefer and I was actually talking to a friend at dinner last night who said they did the same thing on their own. They came up with this too is like everything I I work primarily in codeex. I do all the drafting and setup in codeex and then it's helpful for my brain to have the final review step actually live in the external app. So it will draft all the Slack messages and then I can go to",
              "zh": "谢谢。是的。所以嗯，这是我更喜欢的，实际上我昨晚在晚餐时和一位朋友聊天，他说他们自己也做了同样的事情。他们也想出了这个，就像我主要在 Codeex 中工作的一切一样。我在 Codeex 中完成所有起草和设置，然后将最终审核步骤实际存在于外部应用程序中对我的大脑很有帮助。所以它会起草所有 Slack 消息，然后我可以去",
              "ja": "ありがとう。うん。それで、これは私が好むもので、実際に昨夜の夕食時に友人と話していましたが、その友人は同じことを自分たちでやったと言っていました。彼らが考え出したこれも、私が主に codeex で取り組んでいるすべてのものと似ています。私はすべてのドラフトとセットアップを codeex で行いますが、最終レビューのステップが実際に外部アプリ内で行われることは私の脳にとって役に立ちます。すべての Slack メッセージの下書きが作成され、次のページに進むことができます。"
            }
          },
          {
            "start": 1382.96,
            "end": 1408.24,
            "text": {
              "en": "Slack where Slack has that like draft reply um tab and I can go and knock them out. And I do find that it it like uh freshens up my my brain a bit to be like here's where I'll just make sure that this is what I want to send to a human being. Uh same thing for email. It like creates all of these drafts in uh in Gmail and I'll actually go open Gmail and look at them and and knock them out.",
              "zh": "Slack 中的 Slack 有类似草稿回复的选项卡，我可以去把它们淘汰。我确实发现这让我的大脑焕然一新，就像在这里我要确保这就是我想发送给人类的东西。呃，电子邮件也一样。它就像在 Gmail 中创建所有这些草稿，我实际上会打开 Gmail 并查看它们，然后将它们删除。",
              "ja": "Slack では、Slack には返信の下書きのようなタブがあり、私はそれらをノックアウトできます。そして、これが私が人間に送りたいものであることを確認する場所であると考えると、私の脳が少し新鮮になることに気づきました。ああ、メールでも同じです。これらの下書きはすべて Gmail で作成されるので、実際に Gmail を開いて確認し、削除します。"
            }
          },
          {
            "start": 1405.84,
            "end": 1436.559,
            "text": {
              "en": "I I know some other people who just have it actually come up inside of codeex and they're like, \"Yeah, sure. Send it. It looks good there.\" Um I do the same thing for strategic planning. it pushes to a either proof doc uh the the like agent friendly markdown file that Dan made or a notion doc. I use them for some different things and I I just like for like the last pass before humans engage with it to step away from this um",
              "zh": "我认识其他一些人，他们实际上将它放在了 Codeex 中，他们会说，“是的，当然。发送它。那里看起来不错。”嗯，我对战略规划也做了同样的事情。它推送到一个证明文档，例如 Dan 制作的类似智能体友好的降价文件，或者一个概念文档。我将它们用于一些不同的事情，我只是喜欢人类参与它之前的最后一步，以摆脱这个嗯",
              "ja": "実際にそれを持っている人が Codeex 内で実際に現れて、「ああ、そうだね。送ってよ。あそこは良さそうだね」と言っているのを私は知っています。ええと、戦略計画についても同じことをしています。それは、ダンが作成したagentフレンドリーなマークダウンファイルのようなプルーフドキュメント、または概念ドキュメントのいずれかにプッシュします。私はそれらをいくつかの異なる目的に使用しますが、人間がこの問題から離れるためにそれに関与する前の最後のパスのようなものが好きです。"
            }
          },
          {
            "start": 1432.32,
            "end": 1455.919,
            "text": {
              "en": "agentic space and have a final check in another surface. That's really the only time that I'm like leaving the app to do something. That's brilliant. Thank you. Sweet. All right, we'll do one more and then we'll keep going. Alex, please uh uh introduce yourself and ask your question.",
              "zh": "智能体空间并在另一个表面进行最后检查。这确实是我唯一一次想离开应用程序来做某事。太棒了。谢谢。甜的。好吧，我们再做一件，然后继续。亚历克斯，请呃呃介绍你自己并提出你的问题。",
              "ja": "agent スペースに移動し、別の面で最終チェックを行います。何かをするためにアプリを離れるのは本当にそのときだけです。それは素晴らしいですね。ありがとう。甘い。わかりました、もう 1 つ行ってから続けます。アレックス、自己紹介をしてから質問してください。"
            }
          },
          {
            "start": 1453.039,
            "end": 1486.48,
            "text": {
              "en": "Hi, uh my name is Alex. I'm a musician and uh I I do a lot of gigs and get uh emails from clients all the time. Uh so I have to sort my leads from, you know, my newsletters and all thatformational stuff. So, how do you make sure that you prompt um uh codecs to um keep those emails safe for me, the ones that you know that require a personalized response and and um I just want to make sure that you know I don't send",
              "zh": "嗨，呃，我叫亚历克斯。我是一名音乐家，呃，我做了很多演出，并且一直收到来自客户的电子邮件。嗯，所以我必须从我的时事通讯和所有信息中整理我的线索。那么，您如何确保提示嗯编解码器为我确保这些电子邮件的安全，您知道这些电子邮件需要个性化回复，并且嗯我只是想确保您知道我不会发送这些电子邮件",
              "ja": "こんにちは、えー、私の名前はアレックスです。私はミュージシャンで、たくさんのギグをして、いつもクライアントからメールを受け取ります。そうですね、ニュースレターやその他すべての準備的なものからリードを分類する必要があります。では、そのメールを安全に保管するようにコーデックに指示するにはどうすればよいですか?"
            }
          },
          {
            "start": 1483.039,
            "end": 1519.679,
            "text": {
              "en": "something that, you know, loses me money or something. Yeah. Um, so for me personally, I rely a lot on Kora, the internal like the the app that uh Kieran runs at every for like the AI email assistant that's a part of the every subscription. It's it's really helpful now that inside of Kora there is a um like a CLI and an API connector that I can work in codeex and tell it tell Kora which is managing my",
              "zh": "你知道，这会让我损失金钱或其他东西。是的。嗯，所以就我个人而言，我非常依赖 Kora，内部就像呃 Kieran 运行的应用程序一样，就像人工智能电子邮件助手一样，它是每个订阅的一部分。现在 Kora 内部有一个像 CLI 和 API 连接器一样的东西，我可以在 codeex 中工作并告诉它告诉 Kora 哪个正在管理我的，​​这真的很有帮助。",
              "ja": "それは、お金か何かを失うことになります。うん。ええと、私個人としては、Kora に大きく依存しています。Kora は、キーランがあらゆるサブスクリプションの一部である AI メール アシスタントのように、キーランが毎回実行しているアプリのような内部機能です。Kora 内に CLI や API コネクタのようなものがあり、codeex で作業して、それを Kora に伝えることができるので、とても便利です。"
            }
          },
          {
            "start": 1515.76,
            "end": 1545.36,
            "text": {
              "en": "email filtering and uh my email rules what I want and what I value. Um, the way I do that is the same thing I would recommend whether you use Kora or not, which is to have the agent interview you to get an understanding of what the rules should be. I always find that I get a better result rather than saying what I think the rules should be. Um, and so I will I'll do a brain dump using Monologue, our speech to text app,",
              "zh": "电子邮件过滤，嗯，我的电子邮件规则我想要什么和我看重什么。嗯，无论你是否使用 Kora，我建议的做法都是一样的，那就是让智能体人与你面谈，以了解规则应该是什么。我总是发现我得到的结果比说我认为规则应该是的更好。嗯，所以我会使用 Monologue（我们的语音转文本应用程序）进行大脑转储，",
              "ja": "電子メールのフィルタリングと、私の電子メールは、私が望むものと私が大切にしているものを規定します。その方法は、Kora を使用するかどうかにかかわらず、私がお勧めする方法と同じです。それは、ルールがどうあるべきかを理解するためにagent に面接してもらうことです。私はいつも、ルールがどうあるべきだと思うかを言うよりも、より良い結果が得られることに気づきました。ええと、それでは、音声テキスト変換アプリである Monologue を使用してブレイン ダンプを実行します。"
            }
          },
          {
            "start": 1543.76,
            "end": 1568.24,
            "text": {
              "en": "saying, \"Here's the problem I'm facing. My email's a mess. Let's figure out how to triage it.\" I think it would work perfectly well if you wanted to try starting it as an automation in in codeex or a rule in codeex of saying like I think these are the things I want to make sure I get I think these are the rules I want to set of like never send anything for me only draft I think I want to go through all emails at 3M on",
              "zh": "说：“这就是我面临的问题。我的电子邮件一团糟。让我们弄清楚如何对其进行分类。”我认为如果您想尝试将其作为 Codeex 中的自动化或 Codeex 中的规则启动，就像我认为这些是我想要确保我明白的事情，我认为这些是我想要设置的规则，就像从不为我发送任何内容，只发送草稿，我想我想浏览 3M 上的所有电子邮件",
              "ja": "「これが私が直面している問題です。私のメールはめちゃくちゃです。問題を優先する方法を考えましょう。」 codeex の自動化として、または codeex のルールとして「これらは私が確実に取得したいものだと思います」「これらは私が設定したいルールだと思います」などのようなことを言う場合には、完全にうまく機能すると思います。"
            }
          },
          {
            "start": 1565.44,
            "end": 1593.919,
            "text": {
              "en": "on weekdays but um go take a look at all my email go do a search spawn sub agents to do a search I'm always telling codeex to spawn sub aents to do different types of work um across different workflows and then um come back with a plan. Uh come back with a plan for like how you're going to set up my my email and then um you can read the plan and see, oh, it looks like it's actually going to",
              "zh": "在工作日，但是嗯，看看我所有的电子邮件，进行搜索，生成子智能体进行搜索，我总是告诉 Codeex 生成子智能体，以在不同的工作流程中完成不同类型的工作，然后带着计划回来。嗯，带着一个计划回来，比如你将如何设置我的电子邮件，然后嗯，你可以阅读该计划，看看，哦，看起来它实际上会",
              "ja": "平日だけど、メールを全部見て、検索してサブagent を生成して検索してください。私は常に Codeex に、さまざまなワークフローにわたってさまざまな種類の作業を実行するサブagent を生成してから、計画を持って戻ってくるように指示しています。私の電子メールをどのように設定するかなどの計画を持って戻ってきてください。そうすれば、その計画を読んで、ああ、実際にそうなるようだということがわかります。"
            }
          },
          {
            "start": 1590.96,
            "end": 1622.96,
            "text": {
              "en": "um brief or summarize or autoarchchive something that might lead to making money for you. And that's where you can tweak it. And then uh the other step I take is that I set um reminders for myself um in I use to-d doists for all of my like reminder task tracking. It's also connected to codeex. So I can just message codeex or message my open claw and say like just add this reminder to my schedule to to check how the new",
              "zh": "嗯，简短或总结或自动存档一些可能会为您赚钱的东西。这就是你可以调整它的地方。然后，呃，我采取的另一步骤是，我为自己设置了提醒，我使用 to-d doists 来跟踪所有类似的提醒任务。它还连接到 codeex。因此，我可以向 Codeex 发送消息或向我张开的爪子发送消息，然后说只需将此提醒添加到我的日程安排中，以检查新的情况如何",
              "ja": "お金を稼ぐことにつながりそうなものを簡潔にまとめたり、自動アーカイブしたりできます。そして、そこから微調整することができます。そして、私がとるもう 1 つのステップは、自分自身にリマインダーを設定することです。リマインダー タスクの追跡などのすべてに To-D Doist を使用します。codeex にも接続されています。だから、コーデックスにメッセージを送るか、開いた爪にメッセージを送って、このリマインダーをスケジュールに追加して、新しい機能がどのように機能するかを確認するように言うだけです。"
            }
          },
          {
            "start": 1620.24,
            "end": 1651.36,
            "text": {
              "en": "automation is working um and like do do an audit of it so you can see like it's been 72 hours. Let's see if I'm see if I've missed anything. You can prompt the model to see like what have you been archiving. And I find that really helpful. But I I I'm really excited by all of the work our product GMs at every have been doing to make it so that I can just prompt codeex or cloud code or you know inside of cursor any agent to",
              "zh": "自动化正在发挥作用，就像对其进行审核一样，这样您就可以看到已经过去了 72 小时。让我们看看我是否错过了什么。您可以提示模型查看您已存档的内容。我发现这真的很有帮助。但我我对我们的产品总经理所做的所有工作感到非常兴奋，这样我就可以提示 codeex 或云代码，或者你知道光标内部的任何智能体",
              "ja": "自動化が機能しているので、72 時間が経過したかどうかを確認できるように監査を行います。何か見逃していないか見てみましょう。モデルに何をアーカイブしたかを確認するよう促すことができます。そして、それは本当に役立つと思います。しかし、私は、Codeex またはクラウド コードをプロンプトで表示できるようにするために、各製品の GM が行ってきたすべての作業に本当に興奮しています。カーソルの内側でagent が次のことを行うことがわかります。"
            }
          },
          {
            "start": 1648.88,
            "end": 1677.039,
            "text": {
              "en": "manipulate those apps how I want. It works really well with with uh our other tools also. Thanks Alex. I will I will add to that like one of the things that we found basically because Austin started doing it I sort of was like oh that's really interesting is that Austin started we have plus ones which is our hosted openclaw and Austin started setting up his plus ones with codecs and cloud code",
              "zh": "按照我想要的方式操纵这些应用程序。它也与我们的其他工具配合得很好。谢谢亚历克斯。我会补充一点，就像我们发现的一件事，基本上是因为奥斯汀开始这样做，我有点像哦，这真的很有趣，奥斯汀开始我们有附加的，这是我们托管的openclaw，奥斯汀开始使用编解码器和云代码设置他的附加",
              "ja": "それらのアプリを思い通りに操作できます。他のツールとの併用でも非常にうまく機能します。ありがとうアレックス。基本的にオースティンがそれをやり始めて見つけたものの1つとして、オースティンがホストされたオープンクローであるプラスワンを開始し、オースティンがコーデックとクラウドコードを使用してプラスワンをセットアップし始めたということを感じました。"
            }
          },
          {
            "start": 1674.159,
            "end": 1702.32,
            "text": {
              "en": "and realized that it's just a much better experience so rather than for example the earlier version of plus ones we had like a whole dashboard and a whole onboarding experience where you had to kind of manually click a bunch of buttons and give it a lot of context. It's much easier if we just expose um plus ones via a CLI to uh codeex or cloud code and then you can just like talk to codeex and it will",
              "zh": "并意识到这是一种更好的体验，因此与早期版本的 plus 相比，我们拥有完整的仪表板和完整的入门体验，您必须手动单击一堆按钮并为其提供大量上下文。如果我们只是通过 CLI 将 um plus 暴露给 uh codeex 或云代码，那就容易多了，然后您就可以与 codeex 交谈，它会",
              "ja": "そして、これは、たとえば、ダッシュボード全体やオンボーディング エクスペリエンス全体のように、多数のボタンを手動でクリックしてそれに多くのコンテキストを与える必要があった、以前のバージョンの Plus One よりもはるかに優れたエクスペリエンスであることに気付きました。CLI 経由でそのプラスのものを codeex またはクラウド コードに公開すれば、はるかに簡単になります。そうすれば、codeex に話しかけるだけで実行できます。"
            }
          },
          {
            "start": 1700.96,
            "end": 1722.24,
            "text": {
              "en": "take everything it knows about you from your computer and your past conversations and throw it into um throw it into a plus one setup and and Austin's showing this and it's it's like a it's really powerful and it's it's part of what I'm saying about how the world is changing when you assume every user has access to an agent like this.",
              "zh": "它从你的电脑和你过去的对话中获取关于你的所有信息，并将其放入嗯，将其放入加一设置中，奥斯汀展示了这一点，它就像一个非常强大的东西，这就是我所说的当你假设每个用户都可以访问这样的智能体时世界将如何变化的一部分。",
              "ja": "それはあなたのコンピュータとあなたの過去の会話からあなたについて知っていることすべてを取り出してそれをプラスワンセットアップに投げ込み、そしてオースティンがこれを見せています、そしてそれは本当に強力です、そしてそれはすべてのユーザーがこのようなagent にアクセスできると仮定すると世界がどのように変化するかについて私が言いたいことの一部です。"
            }
          },
          {
            "start": 1720.24,
            "end": 1734.559,
            "text": {
              "en": "uh because we don't have to have a settings dashboard. We don't have to have an onboarding experience. Um we don't have to gather as much context manually. It can just be given to us for free by codeex. And that's really interesting.",
              "zh": "呃，因为我们不需要设置仪表板。我们不必有入职经验。嗯，我们不必手动收集尽可能多的上下文。它可以通过 codeex 免费提供给我们。这真的很有趣。",
              "ja": "ああ、設定ダッシュボードが必要ないからです。オンボーディング経験は必要ありません。ええと、手動で多くのコンテキストを収集する必要はありません。Codeex から無料で提供されるだけです。そしてそれは本当に興味深いことです。"
            }
          },
          {
            "start": 1732.32,
            "end": 1754.559,
            "text": {
              "en": "Yeah. One of my favorite use cases was I got I got really inspired by this interview Clarebo did with Lenny where she said how much of a breakthrough she had when she stopped trying to just use an individual open claw as like a master supercharged open claw and had this suite of six like specified open claws.",
              "zh": "是的。我最喜欢的用例之一是，我从 Clarebo 与 Lenny 的采访中得到了很大的启发，她说，当她不再尝试像大师级增压张开爪一样只使用单个张开爪，而是拥有这套六个像指定张开爪一样的套件时，她取得了多大的突破。",
              "ja": "うん。私のお気に入りの使用例の 1 つは、クレレボがレニーと行ったこのインタビューに本当にインスピレーションを得たものでした。そこで彼女は、個々のオープン クローをマスターのスーパーチャージされたオープン クローのように使用しようとするのをやめて、指定された 6 つのオープン クローのような 6 つのオープン クローを使用したときに、どれだけの画期的な進歩があったのかを語っていました。"
            }
          },
          {
            "start": 1752.399,
            "end": 1779.039,
            "text": {
              "en": "I think that applies to any kind of like agent like there's the new uh chatbt like provisional agents like I I got hooked on that. I think Cla's point was really good and my path towards making this suite of agents to help with the growth function at every was just going to codeex going to this folder. Um I I actually just sent it the transcript of Claire's interview with Lenny and said like I want to do this too given",
              "zh": "我认为这适用于任何类型的智能体人，就像有新的呃 chatbt 像临时智能体人，就像我一样，我对此着迷。我认为 Cla 的观点非常好，我制作这套智能体来帮助实现每次增长功能的途径就是将 codeex 转到此文件夹。嗯，我实际上刚刚向其发送了克莱尔对莱尼的采访记录，并说我也想这样做",
              "ja": "それは、私がそれに夢中になったような新しいチャットのような暫定agentのように、あらゆる種類のagent に当てはまると思います。Cla の指摘は本当に良かったと思います。あらゆる成長機能を支援するこのagent スイートを作成するための私の道は、このフォルダーに codeex を追加するだけでした。ええと、実はクレアとレニーのインタビューの記録を送って、私もこれをやりたいと言いました"
            }
          },
          {
            "start": 1777.36,
            "end": 1800.08,
            "text": {
              "en": "everything you know about me and my work. Um make a plan to suggest six agents that we should provision into our Slack. Um, consider the fact that we might want to make some of them notion custom agents, which I find work really well, is just like do the same thing every day, every time. Some of them might need to be smarter automations, but like do that, come up with a plan.",
              "zh": "你所知道的关于我和我的工作的一切。嗯，制定一个计划来建议 6 个智能体，我们应该将其配置到 Slack 中。嗯，考虑一下这样一个事实：我们可能想让其中一些概念成为自定义智能体，我发现这非常有效，就像每天每次都做同样的事情一样。其中一些可能需要更智能的自动化，但像这样做一样，请制定一个计划。",
              "ja": "私と私の仕事についてあなたが知っていることすべて。Slack にプロビジョニングする必要がある 6 つのagent を提案する計画を立ててください。ええと、一部のユーザーにカスタム agent という概念を持たせたいと思うかもしれないという事実を考えてみましょう。これは本当にうまく機能すると思いますが、これは毎日同じことを毎回行うのと同じです。それらの中には、よりスマートな自動化が必要な場合もありますが、それと同様に、計画を立ててください。"
            }
          },
          {
            "start": 1798.08,
            "end": 1817.84,
            "text": {
              "en": "The planet made was really good and like I tweaked it a bit um after seeing it, but there's that. And then now I have this suite of six agents in our in our Slack that that work really well for me. They still break. Like I I find when you're making open calls and personal agents right now, like they're going to you should accept they're going to break a bit. But the really powerful thing is",
              "zh": "制作的星球非常好，就像我在看到它后稍微调整了一下，但就是这样。现在我的 Slack 中有这套由六名智能体组成的套件，这对我来说非常有效。他们仍然破裂。就像我一样，我发现当你现在公开打电话给私人智能体人时，他们会告诉你，你应该接受他们会有点崩溃。但真正强大的是",
              "ja": "作られた惑星は本当に良かったので、それを見た後に少し調整したようなものですが、それはあります。そして今、私たちの Slack には 6 人のagentからなるスイートがあり、非常にうまく機能しています。彼らはまだ壊れています。私と同じように、今オープンコールや個人agent をしているときは、彼らが行くのと同じように、彼らが少し壊れることを受け入れる必要があることに気づきました。しかし、本当に強力なものは、"
            }
          },
          {
            "start": 1816.48,
            "end": 1841.919,
            "text": {
              "en": "that rather than going back and forth with the agent or getting frustrated, um I just go to Codex and I'm like I I either screenshot or I can at Slack in Codeex and say like go find this conversation where this stupid thing happened and fix it. And it it does a really good job of just like changing the architecture of the agent and making a fix from there.",
              "zh": "与其与智能体来回沟通或感到沮丧，嗯，我只是去 Codex，我要么截图，要么我可以在 Codeex 的 Slack 上说，去找到发生这种愚蠢事情的对话并修复它。它做得非常好，就像更改智能体的架构并从那里进行修复一样。",
              "ja": "agent とやり取りしたりイライラしたりするのではなく、Codex に行って、スクリーンショットを撮るか、Codeex の Slack で、この愚かなことが起こったこの会話を見つけて修正してくださいと言うような感じです。そして、agentのアーキテクチャを変更してそこから修正を行うという非常に優れた仕事をします。"
            }
          },
          {
            "start": 1839.52,
            "end": 1863.6,
            "text": {
              "en": "I love that. Um, yeah, it's it's just a it's such a it's such a step change in how you work and uh now now I want to paste that CLA interview too. Um, [laughter] I want I want to show one I want to show one thing that I like this is like kind of actually my favorite way to use this stuff for for knowledge work. Um, it's a thing that I like wish I had for so much of my career because this is one of the",
              "zh": "我喜欢那个。嗯，是的，就是这样，这对你的工作方式来说是一个巨大的改变，呃现在我也想粘贴 CLA 采访。嗯，[笑声]我想展示一个我想展示的一件我喜欢的东西，这实际上是我最喜欢的使用这些东西进行知识工作的方式。嗯，这是我在职业生涯的大部分时间里都希望拥有的一件事，因为这是",
              "ja": "それが大好きです。ええと、それはまさにそれです、それはそのようなものです、あなたの働き方における大きな変化です。それで、CLA のインタビューも貼り付けたいと思います。ええと、[笑い] 見せたいものを 1 つ見せたい 私が好きなものを 1 つ見せたいのですが、これは実際にこのものをナレッジワークに使用する私のお気に入りの方法のようなものです。ええと、これは私のキャリアの中でずっと持っていたかったと思う好きなものです。"
            }
          },
          {
            "start": 1861.52,
            "end": 1891.6,
            "text": {
              "en": "most like time consuming to me like frustrating things about about knowledge work is that we are uh doing a a real go to market market public launch for plus one soon. We're very excited about it and we've been having a bunch of internal meetings and Slack conversations around like how are we taking this to market? What is the strategy? What are we going to do? Um, and we've done all of the work that like",
              "zh": "对我来说，最耗时的事情就像关于知识工作的令人沮丧的事情是，我们很快就会进行一次真正的市场公开发布。我们对此感到非常兴奋，我们已经举行了一系列内部会议和 Slack 对话，比如我们如何将其推向市场？策略是什么？我们要做什么？嗯，我们已经完成了所有喜欢的工作",
              "ja": "私にとってナレッジワークに関してイライラすることと同じように時間がかかるのは、まもなくプラスワンの本格的な市場投入を予定していることです。私たちはこれに非常に興奮しており、これをどのように市場に投入するかについて社内会議や Slack での会話を数多く行ってきました。戦略とは何ですか?何をしましょうか？ええと、私たちは必要な作業をすべて完了しました"
            }
          },
          {
            "start": 1889.2,
            "end": 1915.279,
            "text": {
              "en": "kind of like only humans can do, the like marketing case, the business case, the like the narratives and stuff. Not all of it is as refined as it needs to be because it still needs to be refined, but it's all sitting somewhere. And um, I had all these plans this week to make the go to market plan, which is like one thing I'm responsible for. And an inevitable thing that happens that happens in everyone's job is like all",
              "zh": "有点像只有人类才能做的事情，比如营销案例、商业案例、叙述之类的东西。并非所有内容都像需要的那样精致，因为它仍然需要精致，但它们都位于某个地方。嗯，本周我制定了所有这些计划来制定上市计划，这就像我负责的一件事。每个人的工作中不可避免会发生的事情就像所有",
              "ja": "人間にしかできないようなこと、マーケティングの事例、ビジネスの事例、物語などのようなものです。まだ洗練する必要があるため、すべてが必要なほど洗練されているわけではありませんが、すべてどこかに眠っています。今週は、市場投入計画を立てるためにさまざまな計画を立てましたが、それが私の責任の 1 つのようです。そして、誰の仕事でも起こる避けられないことは、すべての仕事と同じです"
            }
          },
          {
            "start": 1913.519,
            "end": 1940.159,
            "text": {
              "en": "this stuff came up like I've got to do interviews for hiring. We found out the release date for the new JBT model. Um and so I had a day I think it was Tuesday in between meetings where I'm just kind of like I'm prompting codeex this way of hey I I I've kind of done most of the work right like in our notion every meeting is recorded in a single place and all the transcripts are there. We've can we talked about this a",
              "zh": "这些事情的出现就像我必须进行招聘面试一样。我们找到了新 JBT 车型的发布日期。嗯，我有一天在会议之间度过了一天，我想是周二，我有点像在以这种方式提示代码交换，嘿，我，我已经完成了大部分工作，就像我们的想法一样，每次会议都记录在一个地方，所有的记录都在那里。我们可以讨论这个问题",
              "ja": "この話は、まるで採用面接をしなければならないかのように思いつきました。JBTの新モデルの発売日が分かりました。ええと、それで私は 1 日を過ごしました。火曜日だったと思います会議の合間に、私はこのようにコーデックスを促しているような感じでした。おい、私はほとんどの作業を正しく完了しました。すべての会議は 1 か所に記録され、すべての記録はそこにあります。このことについて話してもいいですか"
            }
          },
          {
            "start": 1937.44,
            "end": 1963.6,
            "text": {
              "en": "bunch in Slack. I have a template for a go to market plan that I really like and I can go to codeex and say like could you just make the plan like and in my head what I'm thinking is like maybe it'll get like a six out of 10 or a seven out of 10 and we can keep nudging and I can keep like going along and so it uh it does that. What I'm asking for is like why don't you start by make doing the compound engineering",
              "zh": "Slack 中的一堆。我有一个我非常喜欢的进入市场计划的模板，我可以去 Codeex 说，你可以像这样制定计划吗？在我的脑海中，我的想法可能会是十分之六或十分之七，我们可以继续推动，我可以继续前进，所以它呃它做到了。我要求的是你为什么不从做复合工程开始",
              "ja": "Slack に束ねる。私は非常に気に入っている市場投入計画のテンプレートを持っているので、Codeex に行って、そのような計画を立ててくれないかと言うことができます。頭の中で、おそらく 10 点中 6 点か 10 点中 7 点くらいになるだろうと考えています。それで、私たちは微調整を続けることができ、私はそれに沿って進み続けることができ、それで、ああ、それが実現します。私が求めているのは、複合エンジニアリングを行うことから始めてみませんかということです。"
            }
          },
          {
            "start": 1961.279,
            "end": 1985.84,
            "text": {
              "en": "brainstorm step to to just ship a proof doc and I can see how close you are and um I one thing that it doesn't really do super well unless I tell it to and I want to install this as like a a workflow is it it doesn't go read our calendar of upcoming posts and launches and so as it was going I was like oh you always forget this this is the message I'm sending of like actually look at everything that's scheduled because I",
              "zh": "集思广益，只发送一份证明文档，我可以看到你有多接近，嗯，我有一件事，它并没有真正做得很好，除非我告诉它，我想像工作流程一样安装它，它不会去阅读我们即将发布的帖子和发布的日历，所以当它进行时，我就像哦，你总是忘记这是我发送的消息，就像实际查看安排的所有内容一样，因为我",
              "ja": "ブレインストーミングの手順で、証拠ドキュメントを発送するだけで、あなたがどのくらい近づいているかがわかりました。そして、私が指示しない限り、あまりうまくいかないことが1つあり、これをワークフローのようにインストールしたいのですが、今後の投稿とリリースのカレンダーを読みに行かないので、途中で私は「ああ、あなたはいつもこれを忘れています、これは私が送信しているメッセージです、実際にスケジュールされているものをすべて見てください」と思いました。"
            }
          },
          {
            "start": 1984.64,
            "end": 2013.519,
            "text": {
              "en": "have to account for that in the go to market plan Um, and then it makes a uh makes a plan as a proof talk. I went and looked at it and I was like again I I maybe have five minutes in between meetings and I'm like this is really good. Like you kind of have every you have the architecture enough that um I want you to like factor in one other change and then just ship the plan to notion. and the plan it shipped to",
              "zh": "必须在进入市场计划中考虑到这一点，然后它会制定一个计划作为证明谈话。我去看了一下，我又想，我可能在会议之间有五分钟的时间，我觉得这真的很好。就像您拥有足够的架构一样，嗯，我希望您能够考虑另一项更改，然后将计划交付到概念中。以及它运送到的计划",
              "ja": "市場開拓計画ではそれを考慮する必要があります。えーっと、それから、えー、実証実験として計画を立てます。行ってそれを見て、また会議の間に 5 分くらい時間があれば、これは本当に良いと思いました。あなたがすべてを持っているのと同じように、十分なアーキテクチャを持っているので、もう 1 つの変更を考慮に入れてから、計画を概念に移してください。およびその発送先のプラン"
            }
          },
          {
            "start": 2011.12,
            "end": 2037.279,
            "text": {
              "en": "notion. I was reading it and I was like this is basically 80 to 90% of the way there. And that's that's not because it I'm relying on the model to come up with our go to market strategy. It's that I'm relying on the model to um look at all of the things that we've already said and thought about the go to market strategy, piece it together, and then review it, right?",
              "zh": "概念。我正在读它，我想这基本上是 80% 到 90% 的内容。这并不是因为我依靠该模型来制定我们的市场策略。我依靠模型来查看我们已经说过并考虑过的所有关于进入市场策略的内容，将其拼凑在一起，然后进行审查，对吧？",
              "ja": "概念。私はそれを読んでいて、これで基本的には 80 ～ 90% の目標が達成できたと感じました。それは、私が市場開拓戦略を考える際にモデルに依存しているからではありません。それは、市場投入戦略について私たちがすでに述べたり考えたりしたすべてのことを見て、それをつなぎ合わせて、それをレビューするためにモデルに依存しているということですよね?"
            }
          },
          {
            "start": 2035.2,
            "end": 2062.399,
            "text": {
              "en": "Come with what will work with what's not. There's a lot of important context loading that happens here where like it knows what our target ICP is. It knows what our goals are. It knows how we think about narrative positioning. And before this was possible, the only thing I could have done was either block off a whole day to sit and do this or get done with my work for the day at like 6 or 7",
              "zh": "哪些可以用，哪些不能用。这里发生了很多重要的上下文加载，就像它知道我们的目标 ICP 是什么一样。它知道我们的目标是什么。它知道我们如何看待叙事定位。在这成为可能之前，我唯一能做的就是要么花一整天的时间坐下来做这件事，要么在六点或七点左右完成当天的工作",
              "ja": "機能するものと機能しないものを組み合わせてください。ここでは、ターゲット ICP が何であるかを認識するために、重要なコンテキストの読み込みが数多く行われます。それは私たちの目標が何であるかを知っています。それは私たちが物語の位置づけについてどのように考えるかを知っています。そして、これが可能になる前に、私にできる唯一のことは、一日中座ってこれを行うか、6時か7時くらいにその日の仕事を終えるかのどちらかでした"
            }
          },
          {
            "start": 2059.839,
            "end": 2086.48,
            "text": {
              "en": "and then stay up all night writing this. And this has been such a game changer for me. And the the other part of it that I think I found is really helpful is that I I don't make this plan for humans. I make this plan for humans and agents and primarily for humans to understand through agents. And so when I sent it to the team working on the go to market, they can read it and it's like digestible to humans. But the the thing",
              "zh": "然后熬夜写这篇文章。这对我来说是一个改变游戏规则的事情。我认为我发现真正有帮助的另一部分是我不是为人类制定这个计划。我为人类和智能体制定这个计划，主要是为了人类通过智能体来理解。因此，当我将其发送给负责上市的团队时，他们可以阅读它，并且它对于人类来说很容易理解。但事情的经过",
              "ja": "そして徹夜でこれを書いています。そして、これは私にとって大きな変化でした。そして、本当に役立つと私が思ったもう 1 つの部分は、私は人間のためにこの計画を立てているわけではないということです。私はこの計画を人間とagentのために作成し、主に人間がagent を通じて理解できるようにします。それで、市場開拓に取り組んでいるチームにそれを送ったところ、彼らはそれを読むことができ、人間にとっても消化可能なものであると言えます。しかし、そのことは"
            }
          },
          {
            "start": 2085.04,
            "end": 2102.16,
            "text": {
              "en": "that it's really helpful for is like it's the full plan sectioned off allin-one. And so Brandon, our COO, who's like deep in this product, can ask his plus one, can ask codeex, you know, it's called code, like let me know what Austin's plan is, like summarize it for me. Let me know the business case.",
              "zh": "它确实很有帮助，就像它是一个完整的计划。所以布兰登，我们的首席运营官，对这个产品很深入，可以问他的加一，可以问codeex，你知道，这就是代码，就像让我知道奥斯汀的计划是什么，比如为我总结一下。让我了解商业案例。",
              "ja": "これが本当に役立つのは、allin-one から分割された完全なプランのようなものです。それで、この製品に深く関わっている当社の COO であるブランドンは、自分のプラス 1 を尋ねたり、Codeex に尋ねたりできます。ご存知のように、これはコードと呼ばれています。オースティンの計画を教えてください、あるいはそれを要約してくださいなどです。ビジネスケースを教えてください。"
            }
          },
          {
            "start": 2100.72,
            "end": 2126.56,
            "text": {
              "en": "Brandon has to come up with the pricing modeling for the plan so he can work with an agent against the plan. And um as someone who spent so much time in my career thinking about like literally how the the proposal or go to market document looks like how is it going to look when I present to the CEO like this two-page plan for for like a for a budget I'm asking for like is it going to make sense to their eyes and like",
              "zh": "布兰登必须为该计划提出定价模型，以便他可以与智能体商合作反对该计划。嗯，作为一个在我的职业生涯中花了很多时间思考提案或上市文件的样子的人，当我向首席执行官提出这样的两页计划，就像我要求的预算一样，这对他们来说有意义吗？",
              "ja": "ブランドンは、プランに対してagent と協力できるように、プランの価格モデルを考え出す必要があります。そして、私のキャリアの中で非常に多くの時間を費やして、文字通り、提案書や市場投入文書がどのように見えるかについて考えてきた人として、この2ページの計画をCEO に提示したときに、私が求めている予算などのためにそれがどのように見えるか、彼らの目には意味があるかどうかなどを考えます。"
            }
          },
          {
            "start": 2124.079,
            "end": 2146.8,
            "text": {
              "en": "really fine-tuning stuff. Giving up on that and just saying like is the plan really good and is it going to make sense to like Dan's agent if he approves it. Um for to me makes me work faster. It makes the work better. It means that I don't have to think about all this like kind of dumb stuff that doesn't matter. Um that like it's to me a much more like powerful and fun way to work.",
              "zh": "确实是微调的东西。放弃这一点，只是说喜欢这个计划真的很好，如果丹的经纪人批准了，那么喜欢他还有意义吗？嗯对我来说让我工作得更快。它使工作变得更好。这意味着我不必像那些无关紧要的愚蠢事情一样思考所有这些。嗯，这对我来说更像是一种强大而有趣的工作方式。",
              "ja": "本当に微調整できるもの。それを諦めて、ただ「いいね！」と言うのは、その計画は本当に良いものですが、ダンのagent がそれを承認した場合に「いいね！」することに意味があるのでしょうか。うーん、私にとっては仕事が早くなります。それは仕事をより良くします。つまり、これらすべてを、どうでもいいばかばかしいことのように考える必要がないということです。そうですね、私にとってはそれがはるかに強力で楽しい仕事の方法のように思えます。"
            }
          },
          {
            "start": 2144.56,
            "end": 2170.48,
            "text": {
              "en": "I totally totally agree with that. You said so many things that are interesting there. The first one is just normalize sending agent documents around. Um and that's why we have proof. Uh it's just such an easy way to send the markdown documents that we generate to each other and and to review them together. And it's like there I think there's this whole strand of AI stuff that's like make AI write in your voice. We even do",
              "zh": "我完全同意这一点。你在那里说了很多有趣的话。第一个是规范发送智能体文件。嗯，这就是为什么我们有证据。呃，这是一种将我们生成的 Markdown 文档发送给彼此并一起审阅的简单方法。我认为人工智能的整个系列就像让人工智能用你的声音写字一样。我们甚至这样做",
              "ja": "私もそれには全く同感です。そこではとても興味深いことをたくさん言っていました。1 つ目は、agent文書の送信を正規化することです。ええと、だからこそ証拠があるのです。ええと、生成したマークダウン ドキュメントを相互に送信し、一緒にレビューするのはとても簡単な方法です。そして、そこには、AI にあなたの声を書かせるようなAI関連の一連の機能があると思います。私たちもそうします"
            }
          },
          {
            "start": 2168.72,
            "end": 2188.48,
            "text": {
              "en": "this with Spiral, but there's this other strand of just like normalize AI writing because I would actually prefer to read your agents writing than your writing in a lot of cases because I know that it's just easier for you to get all that that thinking together in a format I can read if you if you have your agent write it.",
              "zh": "Spiral 是这样，但还有另一条就像标准化人工智能写作一样，因为在很多情况下，我实际上更喜欢阅读你的智能体人的写作，而不是你的写作，因为我知道，如果你让你的智能体人写它，你会更容易以我可以阅读的格式将所有的想法结合在一起。",
              "ja": "これは Spiral の場合ですが、AI のライティングの正規化と同じようなもう 1 つの要素があります。実際、私は多くの場合、あなたの文章よりもagentの文章を読みたいと思っています。なぜなら、agent に書いてもらった場合に、私が読める形式ですべての考えをまとめる方が簡単だとわかっているからです。"
            }
          },
          {
            "start": 2185.2,
            "end": 2207.28,
            "text": {
              "en": "The thing I care about is do you stand by it? Have you thought about it? And if I talk to you about it, will it be clear that if I talk about a particular bullet point in it, like you've thought that through? And as long as we have the trust that that's going to be the case, then I absolutely prefer the the agent version.",
              "zh": "我关心的是你坚持吗？你想过吗？如果我和你谈论这个问题，如果我谈论其中的一个特定要点，就像你已经考虑过的那样，你会清楚吗？只要我们相信情况会如此，那么我绝对更喜欢智能体版本。",
              "ja": "私が気にしているのは、あなたはそれを支持しますか？考えてみましたか？そして、私がそれについてあなたに話したら、その中の特定の箇条書きについて話したら、あなたがそれを徹底的に考えたように、それが明らかになるでしょうか？そして、それが事実であるという信頼がある限り、私は絶対にagentバージョンを好みます。"
            }
          },
          {
            "start": 2205.04,
            "end": 2240.4,
            "text": {
              "en": "In the future, humans face a new problem. What do you do when your computer is doing your work for you? One answer, take a claw walk. An idea by every [music] the only subscription you need to stay at the edge of AI. Totally. Like uh my friend Rachel Carden who runs the great like Substack newsletter link bio about uh social media had had a really good piece this week about frustrations for um uh people",
              "zh": "未来，人类面临新的问题。当计算机为你工作时你会做什么？答案之一是爪式行走。每个[音乐]的一个想法是您保持人工智能边缘所需的唯一订阅。完全。就像呃，我的朋友 Rachel Carden 运营着有关呃社交媒体的 Substack 时事通讯链接生物，本周她发表了一篇非常好的文章，讲述了呃呃人们的挫败感",
              "ja": "将来、人類は新たな問題に直面します。コンピューターが仕事をしてくれているとき、あなたは何をしますか?答えは 1 つ、爪を立てて歩くことです。AI の最先端を行くために必要な唯一のサブスクリプションは、あらゆる [音楽] によるアイデアです。完全に。そうですね、私の友人のレイチェル・カーデンは、ソーシャル メディアに関する素晴らしい Substack ニュースレター リンクの略歴を運営していますが、今週は人々のフラストレーションについて非常に良い記事を書いていました"
            }
          },
          {
            "start": 2238.079,
            "end": 2263.839,
            "text": {
              "en": "working in social for like every like this pressure they feel that everything has to run through AI and the quality going down and one reason why is that there's that dichotomy of like what do you actually stand behind like are you running something through AI and you like you know maybe your manager did it and they don't even know what it what it said. And uh the thing I love about working at Every is like you you show up",
              "zh": "在社交媒体上工作的人都面临这样的压力，他们觉得一切都必须通过人工智能来运行，而质量会下降，原因之一是存在一种二分法，比如你实际上支持什么，就像你通过人工智能运行某些东西，你喜欢你知道也许你的经理做了这件事，但他们甚至不知道它说了什么。嗯，我喜欢在 Every 工作的一点就是你的出现",
              "ja": "ソーシャルで働く人たちは皆、このプレッシャーのようなもので、すべてを AI で実行しなければならず、品質が低下していると感じています。その理由の 1 つは、実際に何を支持しているのか、AI で何かを実行しているのか、それとも自分のマネージャーがやったのかもしれないが、マネージャーがそれが何を言ったかさえ知らない、というような二分法があることです。そして、エブリーで働いていて私が気に入っているのは、あなたが現れることのようです"
            }
          },
          {
            "start": 2261.52,
            "end": 2288.079,
            "text": {
              "en": "to a meeting, you you've like shared an AI um written document ahead of time and the expectation is that you're going to stand behind all of it. That someone will ask a question of what's in that document. And you if you say like, \"Oh, I didn't even know that was in there.\" It's like you're you're you're exposed, right? But the other nice thing is that we continue to keep investing in skills and workflows and tools to kind of",
              "zh": "在一次会议上，您希望提前分享一份 AI 书面文档，并且期望您将支持所有这些文档。有人会询问该文件中的内容。而你，如果你说，“哦，我什至不知道那儿在那里。”就好像你是你是你暴露了，对吧？但另一件好事是，我们继续不断投资于技能、工作流程和工具，以",
              "ja": "会議に参加するとき、あなたは事前に AI の文書を共有しており、あなたはそのすべてをサポートすることを期待されています。誰かがその文書の内容について質問するでしょう。そして、あなたが「ああ、それがそこにあったことさえ知りませんでした」のように言うなら、あなたはそうします。あなたはあなたが暴露されているようなものですよね？しかし、もう 1 つの素晴らしい点は、私たちがスキル、ワークフロー、ツールに投資し続けていることです。"
            }
          },
          {
            "start": 2285.68,
            "end": 2315.839,
            "text": {
              "en": "ensure that never happens. Like I have rules inside of this project file to be like if uh don't don't add anything that I haven't like said in another context. I want your suggestion. Send your suggestions to me in the chat, but don't put it in a in a document. And like um depending on how big the context gets, these models can follow or not follow those rules, which is another reason why I always leave codeex for that final",
              "zh": "确保这种情况永远不会发生。就像我在这个项目文件内有规则一样，如果呃不添加任何我不喜欢在其他上下文中所说的内容。我想要你的建议。在聊天中将您的建议发送给我，但不要将其放在文档中。就像嗯，取决于上下文有多大，这些模型可以遵循或不遵循这些规则，这也是我总是将 Codeex 留给最终的另一个原因",
              "ja": "それが決して起こらないようにします。このプロジェクト ファイル内には、別のコンテキストで言われて気に入らない内容は追加しないようにというルールがあります。あなたの提案が欲しいです。ご提案はチャットで私に送ってください。ただし、それを文書に記載しないでください。そして、コンテキストがどれだけ大きくなるかに応じて、これらのモデルはそれらのルールに従うことも、従わないこともできます。これが、私が常に最終的な codeex を残すもう 1 つの理由です。"
            }
          },
          {
            "start": 2313.2,
            "end": 2336.72,
            "text": {
              "en": "review before it goes to the like humans I work with. Yeah. And I think that that that last thing that that that I want to point out that you said is like a lot of the time that you spend working is about taking thinking you've already done and putting it into a form that other people can read and consume.",
              "zh": "在将其交给与我一起工作的人之前进行审查。是的。我想我想指出的最后一件事，就像你花在工作上的很多时间一样，就是将你已经完成的想法转化为其他人可以阅读和消费的形式。",
              "ja": "私が一緒に働いているような人たちにそれを渡す前にレビューしてください。うん。そして、最後に指摘しておきたいのは、あなたが仕事に費やす時間の多くは、自分がすでにやったことを考えて、それを他の人が読んで消費できる形に落とし込むことにある、ということだと思います。"
            }
          },
          {
            "start": 2333.839,
            "end": 2355.839,
            "text": {
              "en": "And the important part is doing the thinking there. There is something obviously about like I love writing. Writing is a good way of thinking. Um, and sometimes you actually want to do the writing yourself because you want to think about it for certain types of things and certain types of people, but there's a lot of stuff like company strategy where a lot of the thinking happens out loud",
              "zh": "重要的是在那里进行思考。显然，我喜欢写作。写作是一种很好的思考方式。嗯，有时你实际上想自己写作，因为你想针对某些类型的事情和某些类型的人进行思考，但是有很多东西，比如公司战略，其中很多想法都是大声发生的",
              "ja": "そして重要なのは、そこで考えることです。私が書くのが好きだということには明らかに何かがあります。書くことは良い考え方です。ええと、特定のタイプのものや特定のタイプの人々のために考えたいので、実際に自分で書きたいと思うこともありますが、会社の戦略など、多くの考えが声に出して行われることがたくさんあります"
            }
          },
          {
            "start": 2353.68,
            "end": 2378.88,
            "text": {
              "en": "in meetings. And there's also times like for example, I'm writing something that's sort of like a it's like a retrospective on the last three and a half years of AI and like where I think we're going. And that's so hard to sit down and write, but it's much easier to just like dictate. So, I just took a monologue note where I was just like saying stuff and it I'm using the AI to help me like figure out what I'm really trying to",
              "zh": "在会议中。有时候，例如，我正在写一些东西，就像是对过去三年半的人工智能的回顾，就像我认为我们要去的地方一样。坐下来写是很困难的，但听写就容易多了。所以，我只是记下了一段独白笔记，我就像在说一些东西，我正在使用人工智能来帮助我弄清楚我真正想要做什么",
              "ja": "会議で。また、たとえば、過去 3 年半の AI の回顧録のようなものを書いているときや、私たちがどこに向かっているのかについて書いているときもあります。座って書くのはとても難しいですが、口述するのはずっと簡単です。それで、私はただ何かを言いたいだけの独り言のメモを取りました、そしてそれは私が本当に言いたいことを理解するのを助けるためにAI を使っています"
            }
          },
          {
            "start": 2375.599,
            "end": 2403.52,
            "text": {
              "en": "say. And in in those cases, I think it's just so nice to record stuff, give Codex access to everything, and then just have it spit out a strategy doc and go through it to make sure it it's stuff you agree with. But it's um such a timesaver. And especially if you're someone who like Austin or like me, like you're in meetings a lot and so you don't necessarily have huge chunks of time in your day to like go do a big",
              "zh": "说。在这些情况下，我认为记录一些东西，让 Codex 访问所有内容，然后让它吐出一份策略文档并仔细检查它以确保它是您同意的东西真是太好了。但这真的很省时间。尤其是如果你是喜欢奥斯汀或喜欢我的人，就像你经常参加会议，所以你一天中不一定有大量时间喜欢去做一些大事",
              "ja": "言う。そういう場合には、何かを記録し、Codex にすべてへのアクセスを許可し、それから戦略ドキュメントを吐き出させて、それを調べて、それがあなたが同意する内容であることを確認するのはとても素晴らしいことだと思います。でも、それはとても時間の節約になります。そして、特にあなたがオースティンや私のような人で、会議に頻繁に出席していて、必ずしも大きなことをするのに十分な時間を確保できるわけではない場合はそうです。"
            }
          },
          {
            "start": 2402.32,
            "end": 2425.92,
            "text": {
              "en": "strategy document because you're just trying to stay on top of whatever is happening. It helps you do that in the cracks of your day and do a lot of that thinking. And I just I love it for that. Yeah, me too. Um, I want to show one more thing before we get into more questions because like I wanted to show kind of like a a more like mix of knowledge work and engineering stuff that like would never have been possible",
              "zh": "战略文件，因为您只是想掌握正在发生的一切。它可以帮助你在一天的间隙做到这一点，并进行大量的思考。我只是因为这一点而喜欢它。是的，我也是。嗯，在我们讨论更多问题之前，我想再展示一件事，因为我想展示一种更像是知识工作和工程内容的混合，这是永远不可能的",
              "ja": "何が起こっているかを常に把握しようとしているだけだからです。それは、一日の隙間時間にそれを行い、多くのことを考えるのに役立ちます。そして、私はそれが大好きです。はい、私もです。ええと、さらなる質問に入る前に、もう 1 つお見せしたいと思います。なぜなら、知識作業とエンジニアリングの、これまで不可能だった知識作業とエンジニアリングの組み合わせのようなものを示したかったからです。"
            }
          },
          {
            "start": 2424.32,
            "end": 2463.04,
            "text": {
              "en": "without these kinds of tools and that I really love codeex for which is I've been rebuilding our um KPI tracker every week. Um, I'll just like show it here for a bit. So um we have so many different parts of our business at uh at Eb and uh it's very difficult to get all of those um data points in one source of truth in a traditional tool like even postg which I really like and a lot of our data runs through it to get",
              "zh": "没有这些类型的工具，而且我真的很喜欢 Codeex，因为我每周都在重建我们的 KPI 跟踪器。嗯，我想在这里展示一下。所以，嗯，我们的业务有很多不同的部分，在 Eb 和呃，很难在传统工具（比如我非常喜欢的 postg）中获得所有这些数据点的一个事实来源，而且我们的很多数据都通过它来获取",
              "ja": "このような種類のツールは必要ありません。私は Codeex が大好きなので、毎週 KPI トラッカーを再構築しています。えー、ここで少しだけお見せしたいと思います。私たちは Eb で非常に多くの異なるビジネスを行っており、私がとても気に入っている postg のような従来のツールで 1 つの信頼できる情報源にあるすべてのデータ ポイントを取得するのは非常に困難であり、取得するために多くのデータがこのツールを経由して実行されます。"
            }
          },
          {
            "start": 2460.4,
            "end": 2492.0,
            "text": {
              "en": "one dashboard that is again both human and human and agentf facing that is up to date with all of the metrics we care out. I I haven't found a great solution for just like, you know, going to post and having it having it do it. So um we I've been rebuilding our KPI sheets inside of notion with the goal in mind of any anyone can point their agent to look at it and see how are new paid subscription trials doing how are page",
              "zh": "一个仪表板再次面向人类和人类，并且与我们关心的所有指标保持同步。我还没有找到一个很好的解决方案，就像你知道的那样，发帖并让它完成它。所以，嗯，我一直在概念内重建我们的 KPI 表，目标是任何人都可以指示他们的智能体查看它，看看新的付费订阅试验的页面表现如何",
              "ja": "1 つのダッシュボードは、人間と人間とagentの両方に面しており、私たちが気にしているすべての指標が最新の状態に保たれています。私は、投稿してそれを実行させるための優れた解決策を見つけていません。それで、私たちは、誰もがagent にそれを見て、新しい有料サブスクリプションのトライアルがどのように行われているかを確認できるようにするという目標を念頭に置いて、概念内で KPI シートを再構築しています。"
            }
          },
          {
            "start": 2488.56,
            "end": 2516.48,
            "text": {
              "en": "views doing how is uh monologue iOS MR doing all versus plan all of this stuff because one it helps you work as a human but it also really helps you automate agentic work so that you can say like if your agencies that we're tracking behind and on SEO for a keyword we should be winning on, they can go just like ship a bunch of landing pages for us to try to win more on it if the if the source of",
              "zh": "视图在做呃独白iOS MR如何做所有与计划所有这些事情，因为它可以帮助您作为一个人工作，但它也确实可以帮助您自动化智能体工作，这样您就可以说，如果我们正在跟踪您的智能体机构并在SEO上寻找我们应该获胜的关键字，他们可以像运送一堆登陆页面一样让我们尝试赢得更多，如果如果来源",
              "ja": "ビューはどうやってやっているのですか、モノローグ iOS MR はこれらすべてのことをすべて行うのに対し、計画を立てるのですか。なぜなら、人間として働くのに役立つだけでなく、agentの作業を自動化するのにも非常に役立ちます。つまり、私たちが勝てるはずのキーワードの背後と SEO を追跡している代理店が、その情報源であれば、そのキーワードでさらに勝てるようにランディング ページを大量に出荷するのと同じように行うことができます。"
            }
          },
          {
            "start": 2513.839,
            "end": 2542.24,
            "text": {
              "en": "truths are good. And so I have been doing this big kind of like to me complex uh workflow problem in codeex of let's build this sheet together, let's have it live in a notion database that all of our agents can point at. And I've done a bunch of different versions of it. The first version was like can codeex oneshot this, right? like it has all the API keys, it has everything. I'm happy to give it the context on like how",
              "zh": "真理是好的。因此，我一直在 Codeex 中做这种对我来说很复杂的工作流程问题，让我们一起构建这个工作表，让我们将它存在于我们所有智能体都可以指向的概念数据库中。我已经做了很多不同的版本。第一个版本就像 codeex oneshot 这个一样，对吗？就像它拥有所有 API 密钥一样，它拥有一切。我很高兴为它提供背景信息",
              "ja": "真実は良いことだ。そこで私は、このシートを一緒に構築しましょう、すべてのagent が参照できる概念データベース内でライブにしましょう、という大きな種類の複雑なワークフロー問題を codeex で実行してきました。そして、私はそれのさまざまなバージョンをたくさん作りました。最初のバージョンは、これを Codeex でワンショットで実行できるようなものでしたよね?すべての API キーが含まれているのと同様に、すべてが含まれています。文脈を教えていただけると幸いです"
            }
          },
          {
            "start": 2538.64,
            "end": 2565.599,
            "text": {
              "en": "we measure MR and everything. And each time it was like a little off. It was like maybe 5 to 10% off of the formatting, the numbers, the framing. And our MR MR number can't be 5% off. Like we can't run a business with a source of truth that's even 3% off. It has to be just exactly right. And so the thing that I forced myself to do and it's weird now I'm like it feels so stupid that I have to do this but it",
              "zh": "我们测量 MR 等一切。每次都好像有点不对劲。格式、数字和框架可能有 5% 到 10% 的折扣。而且我们的MR MR号码不能有5%的折扣。就像我们无法以 3% 的折扣来经营一家真实来源的企业一样。它必须完全正确。所以我强迫自己做的事情现在很奇怪我觉得我必须这样做但是它",
              "ja": "私たちはMRなどあらゆるものを測定します。そしてそのたびに、少しずつズレていくような感じでした。フォーマット、数値、フレーム構成がおそらく 5 ～ 10% オフになるような感じでした。そして、当社のMR MR番号は5％オフではありません。たとえ 3% 割引であっても、真実の情報源を使ってビジネスを運営することはできないのと同じです。それはまさに正確でなければなりません。それで、私が自分に強制したこと、そしてそれは今では奇妙です、私がこれをしなければならないことがとても愚かに感じられるようですが、それは"
            }
          },
          {
            "start": 2563.76,
            "end": 2591.359,
            "text": {
              "en": "makes sense is like I'm going column by column end to end to ensure each column is exactly right and defensible because it's the only way that we can run and grow the business reliably and especially the only way we can we can confidently unleash agents to go take actions against what's happening in that KPI sheet. And um it's it's like it's so interesting to me that I'm frustrated that I have to do this that the that the",
              "zh": "这是有道理的，就像我要从头到尾逐列检查，以确保每一列完全正确且站得住脚，因为这是我们可靠地运营和发展业务的唯一方法，尤其是我们可以自信地让智能体针对 KPI 表中发生的情况采取行动的唯一方法。嗯，这对我来说很有趣，以至于我很沮丧，因为我必须这样做",
              "ja": "これは、列ごとに端から端まで調べて、各列が正確で防御可能であることを確認するようなものです。これが、ビジネスを確実に運営し、成長させる唯一の方法であり、特に、KPI シートで起こっていることに対処するようagent を自信を持って解放できる唯一の方法だからです。そして、それは私にとってとても興味深いようで、これをしなければならないことにイライラしています、それは"
            }
          },
          {
            "start": 2588.8,
            "end": 2614.4,
            "text": {
              "en": "model can't do it for me. Um but it's just because of how like powerful these models are gotten that I expect it to be able to do it. But um and this is a thing where I'm like you know it's using um notion's workers tool which is this like dev tool. It's a build always on tool calls of our stripe of our social um it's like creating little scripts and stuff all stuff I don't really understand but I understand the outputs.",
              "zh": "模型无法为我做到这一点。嗯，但正是因为这些模型的强大程度，我希望它能够做到这一点。但是嗯，我想你知道它正在使用嗯概念的工作人员工具，就像开发工具一样。这是一个始终基于我们社交条带的工具调用的构建，就像创建小脚本和填充所有我不太理解但我理解输出的东西。",
              "ja": "モデルは私にはできません。ええと、しかし、これらのモデルがいかに強力であるかという理由だけで、私はそれができると期待しています。しかし、これはご存知のとおり、開発ツールのような概念のワーカーズツールを使用しているものです。それは常に私たちのソーシャルのストライプのツール呼び出しに基づいてビルドされており、小さなスクリプトを作成したり、私がよく理解していないものをすべて詰め込んだりするようなものですが、出力は理解できます。"
            }
          },
          {
            "start": 2612.48,
            "end": 2642.48,
            "text": {
              "en": "I understand that the output is a notion database that updates every six hours with all of our metrics and it's just nice that I can do that and I don't need to hire a consultant to do it or like I don't need to like um uh yeah take away from our uh like our engineers times that that work on our data like I can do this now and I can do it just by like prompting the model and understanding how the metrics are supposed to work.",
              "zh": "我知道输出是一个概念数据库，每六个小时更新一次我们所有的指标，我能做到这一点真是太好了，我不需要聘请顾问来做这件事，或者像我不需要像我们的工程师那样处理我们的数据，就像我现在可以做到这一点，我可以通过提示模型和理解指标应该如何工作来做到这一点。",
              "ja": "出力は、すべてのメトリクスで 6 時間ごとに更新される概念データベースであることを理解しています。それができるのは本当に素晴らしいことです。それを行うためにコンサルタントを雇う必要はありません。または、ええと、エンジニアがデータを処理する時間を奪う必要もありません。私は今これを行うことができ、モデルをプロンプトしてメトリクスがどのように機能するかを理解するだけで実行できます。"
            }
          },
          {
            "start": 2639.599,
            "end": 2664.72,
            "text": {
              "en": "It's amazing. Uh, I can't wait. Is the Do you think it'll be ready on Monday? It'll be ready on Monday. Yeah. [ __ ] yeah. Feeling really good. Because we've been I mean just having It turns out that figuring out how much money you're making and how much you've grown is truly a philosophical question, you know? Um, and you actually do need to like go in and like set that frame.",
              "zh": "太棒了。呃，我等不及了。你认为周一就能准备好吗？周一就会准备好。是的。 [ __ ] 是的。感觉真好。因为我们一直以来，我的意思是只是拥有事实证明，弄清楚你赚了多少钱以及你成长了多少确实是一个哲学问题，你知道吗？嗯，你实际上确实需要喜欢进入并设置那个框架。",
              "ja": "すごいですね。うーん、待ちきれません。月曜日には準備ができると思いますか?月曜日には準備が整います。うん。[ __ ] うん。とても良い気分です。なぜなら、私たちはただ持っているという意味です。自分がどれだけお金を稼いでいて、どれだけ成長したかを把握することは、本当に哲学的な質問であることがわかりました。ええと、実際にはそのフレームに入って設定する必要があります。"
            }
          },
          {
            "start": 2661.2,
            "end": 2681.52,
            "text": {
              "en": "Um, and so we've been dealing with an outdated sheet because it's like it's pulling numbers, but is are the numbers correct? you know, even even outside of AI. Um, and and there's no one way to, for example, measure your MR, you just want to do it the same way every time.",
              "zh": "嗯，所以我们一直在处理一张过时的表格，因为它就像在提取数字，但这些数字正确吗？你知道，即使在人工智能之外也是如此。嗯，没有一种方法可以测量您的 MR，您只想每次都以相同的方式进行。",
              "ja": "ええと、数字を引き出しているような古いシートを扱ってきましたが、その数字は正しいでしょうか? AI 以外でも。たとえば、MR を測定する方法は 1 つではなく、毎回同じ方法で測定する必要があります。"
            }
          },
          {
            "start": 2678.4,
            "end": 2706.8,
            "text": {
              "en": "So, you have to decide. And, uh, that's kind of it's kind of wild that it's like almost impossible to tell how much money you made in an objective way. You have to just like pick. But anyway, uh, that's just the way my brain works. I want to say before we get into questions, one other thing that I use this for that was it like blew my mind from a knowledge work perspective is recruiting. So, we're hiring a lot",
              "zh": "所以，你必须做出决定。而且，呃，这有点疯狂，几乎不可能客观地告诉你你赚了多少钱。你必须只是喜欢挑选。但无论如何，呃，这就是我大脑的工作方式。在我们提出问题之前，我想说的是，我用它来做的另一件事是，从知识工作的角度来看，这让我大吃一惊，那就是招聘。所以，我们正在招聘很多人",
              "ja": "それで、あなたが決める必要があります。そして、まあ、客観的な方法でどれだけのお金を稼いだかを知ることはほとんど不可能であるということは、ある意味ワイルドです。ただ好きなだけ選ぶ必要があります。とにかく、それが私の脳の仕組みです。質問に入る前に言っておきたいのですが、私がこれを使っているもう 1 つのことは、ナレッジ ワークの観点から見て衝撃を受けたのが採用活動です。ということで、大量採用中です"
            }
          },
          {
            "start": 2703.119,
            "end": 2731.28,
            "text": {
              "en": "and we were looking for an L & D head of L & D, someone to help us run courses. And there's this company in New York called General Assembly. And when I think about people who've run like really great courses about technology to teach people how to get hands-on with like programming or design or anything like that, like they're the company that I think of from the like 2010s in New York. And so I",
              "zh": "我们正在寻找 L&D 的 L&D 负责人，帮助我们运行课程。纽约有一家名为 General Assembly 的公司。当我想到那些开设了非常棒的技术课程来教人们如何实践编程或设计之类的事情时，我想到的就是 2010 年代纽约的那家公司。所以我",
              "ja": "そして私たちはL&DのL&D責任者、つまりコースの運営を手伝ってくれる人を探していました。ニューヨークにはGeneral Assembly という会社があります。そして、プログラミングやデザインなどを実際に学ぶ方法を人々に教えるために、テクノロジーに関する本当に素晴らしいコースを開催している人々のことを考えると、彼らは 2010 年代のニューヨークの会社だと思います。それで私は"
            }
          },
          {
            "start": 2728.88,
            "end": 2764.0,
            "text": {
              "en": "my theory was that if we're hiring someone to do like build our courses, they would probably have a good person probably would have worked at GA and Jason. Yes. Um and I think GA's quality has gone up and down, but at the beginning they were amazing. Um, and uh, so what I did was I just said to Codex, \"Hey, like can you find can you just get a list of GA alums? I'm like hiring an an L & D director and then I want you to filter",
              "zh": "我的理论是，如果我们雇用某人来构建我们的课程，他们可能会找到一个在 GA 和 Jason 工作的好人。是的。嗯，我认为 GA 的质量有起有落，但一开始他们很棒。嗯，呃，所以我所做的就是对 Codex 说，“嘿，你能找到一份 GA 校友名单吗？我想雇佣一名 L&D 总监，然后我想让你过滤一下",
              "ja": "私の持論は、もしコースの構築などに誰かを雇うなら、おそらくGA とJason で働いていたであろう優秀な人材がいるだろう、というものでした。はい。そうですね、GA のクオリティは上がったり下がったりしていると思いますが、最初の頃は素晴らしかったです。それで、私がやったことは、Codex にこう言ったことです。「ねえ、GA 卒業生のリストを入手できますか? 私は L&D ディレクターを雇うようなもので、その後フィルタリングしてもらいたいのです」"
            }
          },
          {
            "start": 2760.96,
            "end": 2789.119,
            "text": {
              "en": "and sort the list by people who have subsequently gotten into AI and it did it like it just gave me a list of people. The first one I clicked on, it was like I was like, \"This guy is perfect.\" And then I looked and he followed me on Twitter, so I just DM'd him. And like I don't know if we're gonna end up working with him, but like it was just one of those holy [ __ ] light bulb moments where normally what we're",
              "zh": "然后按照后来进入人工智能领域的人对列表进行排序，它就像给了我一个人员列表一样。当我点击第一个按钮时，我就觉得“这家伙太完美了。”然后我看了看，他在推特上关注了我，所以我就直接私信了他。就像我不知道我们最终是否会和他一起工作，但这只是那些神圣的[__]灯泡时刻之一，通常我们会这样",
              "ja": "その後 AI に興味を持った人々によってリストを並べ替えると、ちょうど人々のリストが得られたかのようにそれが行われました。最初にクリックしたとき、「この人は完璧だ」と感じました。それで見てみると、彼がTwitter で私をフォローしていたので、DMしてみました。そして、最終的に彼と仕事をすることになるかどうかは分からないけど、それはいつもの私たちがいる神聖な [ __ ] 電球のような瞬間の 1 つだったようだ"
            }
          },
          {
            "start": 2787.359,
            "end": 2803.839,
            "text": {
              "en": "doing is sorting through a ton of applications and like trying to find the right person. And I we're still going to do that, but especially for any kind of like outbound effort, it can kind of find that needle in the haststack that you're looking for really really well.",
              "zh": "所做的就是对大量的申请进行分类，就像试图找到合适的人一样。我们仍然会这样做，但特别是对于任何类型的出站工作，它可以在你正在寻找的井中找到那根针，非常非常好。",
              "ja": "やっていることは、大量の応募書類を分類することであり、適切な人材を見つけるのと同じことです。そして、私たちはまだそれを行うつもりですが、特にアウトバウンドのような取り組みの場合、探している針をハッシュスタックから非常にうまく見つけることができます。"
            }
          },
          {
            "start": 2799.44,
            "end": 2828.319,
            "text": {
              "en": "So, I highly highly recommend um okay, we've got about 10 minutes left. Um and I want to take some more time for questions. So, if you got a question, please uh uh please raise your hand. One thing that we have not gotten to actually is that if you are here, you are getting codeex credits. Uh Austin, do you want to uh go through that really quick?",
              "zh": "所以，我强烈推荐，嗯，好吧，我们还有大约 10 分钟时间。嗯，我想再花一些时间来提问。所以，如果你有问题，请举手。我们尚未真正了解的一件事是，如果您在这里，您将获得 Codeex 积分。呃奥斯汀，你想呃快速完成这个吗？",
              "ja": "それで、私は強くお勧めします、えー、わかりました、残り約 10 分です。えー、もう少し質問の時間をとりたいと思います。それで、質問がある方は、えー、手を挙げてください。私たちが実際に理解できていないことの 1 つは、ここに来れば Codeex クレジットを取得できるということです。えー、オースティン、それを本当に早く終わらせたいですか?"
            }
          },
          {
            "start": 2822.88,
            "end": 2849.2,
            "text": {
              "en": "Yes. So, uh OpenAI has given us a code. I'm about to drop into the chat for 250 attendees of this camp to get a free month of ChatGB to chat GBT Pro lights. That's about a $100 value. Um, and you can redeem it at this link that uh we will drop in the chat right now.",
              "zh": "是的。所以，呃 OpenAI 给了我们一个代码。我即将加入本次训练营的 250 名参加者的聊天室，以获得一个月的免费 ChatGB 来聊天 GBT Pro 灯。价值约为 100 美元。嗯，你可以通过这个链接兑换它，我们现在就会将其放入聊天中。",
              "ja": "はい。つまり、OpenAI がコードを提供してくれました。GBT Pro ライトをチャットするための ChatGB を 1 か月間無料で手に入れるために、このキャンプの 250 人の参加者向けのチャットに参加しようとしています。それは約 100 ドルの価値です。このリンクから引き換えることができます。すぐにチャットに参加させていただきます。"
            }
          },
          {
            "start": 2848.48,
            "end": 2870.319,
            "text": {
              "en": "Sick. Dan Dan, I'm actually gonna I'm going to slack it to you so you can drop it in the chat because for some reason I don't have access. Okay, I'll do that. Um, so yes, this is this is our gift to you as every subscribers. We try to do stuff like this all the time. We've been we've given out I think we've done um cursor credits. We've done we've done a lot a lot of other stuff. We have more stuff",
              "zh": "生病的。丹丹，我实际上会把它交给你，这样你就可以把它放在聊天中，因为出于某种原因我没有访问权限。好的，我会这么做的。嗯，是的，这是我们送给每一位订阅者的礼物。我们一直在尝试做这样的事情。我们已经给出了我想我们已经完成了游标积分。我们已经做了很多很多其他的事情。我们还有更多东西",
              "ja": "病気。ダンダン、実際にあなたにそれを差し上げますので、何らかの理由で私にはアクセス権がないので、チャットにドロップしてください。わかりました、そうします。そうですね、これはすべての購読者であるあなたへの私たちの贈り物です。私たちは常にこのようなことをしようとしています。私たちはカーソルクレジットを完了したと思います。他にもたくさんのことをやりました。もっとたくさんのものがあります"
            }
          },
          {
            "start": 2867.839,
            "end": 2886.72,
            "text": {
              "en": "like this coming. So we just want you to be able to try these tools. Be at the edge with us. And um we just love having you as as subscribers. So here is the link. It's $100. Oh, notion. Yes, we did give out Notion. It's $100.",
              "zh": "就像这样来的。所以我们只是希望您能够尝试这些工具。与我们一起处于边缘。嗯，我们只是喜欢您作为订阅者。这是链接。这是 100 美元。哦，观念。是的，我们确实给出了 Notion。这是 100 美元。",
              "ja": "これが来るように。したがって、これらのツールをぜひ試していただきたいと考えています。私たちと一緒に最先端にいてください。そして、私たちはあなたを購読者として迎えられることをとても嬉しく思っています。ここにリンクがあります。100ドルです。ああ、概念。はい、Notion を提供しました。100ドルです。"
            }
          },
          {
            "start": 2885.04,
            "end": 2923.119,
            "text": {
              "en": "um and uh check it out. We will send it out in an email. We may actually we may not send it out in an email because it's only 200 it's limited to 250 people and that's pretty much exactly the number of people who are here. So if there's any left we will send it. Um if there is one person there's 251 people here. So there's if uh that person if you let us know we'll figure something out for you. Um",
              "zh": "嗯，呃，检查一下。我们将通过电子邮件将其发送出去。事实上，我们可能不会通过电子邮件发送出去，因为只有 200 人，仅限 250 人，而这几乎正是在座的人数。因此，如果还有剩余，我们将发送。嗯，如果有一个人的话，这里就有 251 个人。所以，如果呃那个人，如果你让我们知道，我们会为你想办法。嗯",
              "ja": "ええと、ええと、それをチェックしてください。メールにて発送させていただきます。実際には、200 名しかなく、250 名に制限されており、ここに集まっている人の数とほぼ同じであるため、メールで送信できない可能性があります。ですので、残っていたら発送させていただきます。ええと、1人いるとしたら、ここには251人います。それで、もしその人がいたら、私たちに知らせてくれれば、私たちがあなたのために何かを考え出します。えーっと"
            }
          },
          {
            "start": 2919.68,
            "end": 2951.44,
            "text": {
              "en": "interesting. Not available on my plan. Um okay. Uh we will have to deal with this. Uh let us let us figure out what to do what to do here. So correction this is only if you do not have a plan. This is for new users and we'll try to we'll try to get something for existing users and send it out as soon as we can.",
              "zh": "有趣的。我的计划中不可用。嗯，好吧。呃，我们将不得不处理这个问题。呃，让我们弄清楚在这里要做什么。因此，仅当您没有计划时才进行修正。这是针对新用户的，我们会尽力为现有用户提供一些东西，并尽快将其发送出去。",
              "ja": "面白い。私のプランでは利用できません。うーん、大丈夫。ああ、これには対処しなければなりません。ええと、ここで何をすべきかを考えましょう。したがって、これは計画がない場合にのみ修正してください。これは新規ユーザー向けであり、既存のユーザー向けにも何かを取得し、できるだけ早く送信できるよう努めます。"
            }
          },
          {
            "start": 2949.68,
            "end": 2982.839,
            "text": {
              "en": "Cool. All right, let's do some questions. Um Rich, please ask your question. So I I saw at the beginning you were using compound engineering as kind of part of your workflow. Are you using kind of like the offtheshelf plugin or is there tweaks to it and kind of where does that work and maybe not work when you're outside of the you know kind of code creation workflow?",
              "zh": "凉爽的。好吧，我们来做一些问题。嗯，里奇，请问你的问题。所以我一开始就看到您使用复合工程作为工作流程的一部分。您是否使用类似于现成的插件，或者是否对其进行了调整，以及当您在您知道的代码创建工作流程之外时，它在哪里起作用，或者可能不起作用？",
              "ja": "いいね。わかりました、いくつか質問しましょう。ええと、リッチさん、質問してください。それで、私は最初にあなたがワークフローの一部として複合エンジニアリングを使用しているのを見ました。既製のプラグインのようなものを使用していますか、それともそれに微調整が加えられていますか。また、それがどこで機能するのか、あるいは、既知の種類のコード作成ワークフローから外れている場合には機能しない可能性がありますか?"
            }
          },
          {
            "start": 2983.839,
            "end": 3018.48,
            "text": {
              "en": "So I I find that there's no um overwhelming need to fork your own version of compound engineering. I used it for a long time um for all of my knowledge work and it was extremely powerful for me. And then um maybe about two months ago, the the main thing I noticed was reading the agents response to especially the review stage of watching the reviewers that Kieran and Trevan had built that are very specific to engineering.",
              "zh": "所以我发现没有绝对需要分叉你自己的复合工程版本。我在我所有的知识工作中使用了很长一段时间，它对我来说非常强大。然后，嗯，大约两个月前，我注意到的主要事情是阅读智能体商的反应，特别是在审查阶段，观察 Kieran 和 Trevan 建立的专门针对工程的审阅者。",
              "ja": "したがって、独自のバージョンの複合エンジニアリングをフォークする必要性はそれほど圧倒的に高いわけではないと思います。私はこれを長い間、すべてのナレッジワークに使用していましたが、私にとって非常に強力でした。そして、おそらく 2 か月ほど前、私が主に気づいたのは、特に Kieran と Trevan が構築したエンジニアリングに特化したレビュアーを観察するレビュー段階に対するagentの応答を読んだことでした。"
            }
          },
          {
            "start": 3016.079,
            "end": 3041.599,
            "text": {
              "en": "It I was like, oh this like the thing you'll see the agent do is say like um I'm supposed to go through through this review step. It looks like it's designed for engineering. it's thinking about security and front-end design when this is a go-to market plan. The agent will then like change the path. The agent will be like, I'm going to review this for something else rather than reviewing",
              "zh": "我当时想，哦，就像你会看到智能体人所做的那样，就像嗯，我应该完成这个审查步骤。看起来它是为工程设计的。当这是一个进入市场的计划时，它会考虑安全性和前端设计。然后智能体会更改路径。智能体人会说，我要审查这个是为了其他事情，而不是审查",
              "ja": "私は、ああ、agent がこのレビュー手順を実行する必要があると言うのと同じように思いました。エンジニアリング向けに設計されているようです。これが市場参入計画である場合、セキュリティとフロントエンド設計について考えています。その後、agent はパスを変更します。agent は、「これをレビューするのではなく、別の内容でレビューするつもりです」と言うでしょう。"
            }
          },
          {
            "start": 3037.839,
            "end": 3070.88,
            "text": {
              "en": "it for security. And so the thing that I did was I went and forked a version of it that is actually um publicly available on our GitHub called compound knowledge which is uh built exclusively from me taking the compound engineering plugin which is also public and you can go for it and going inside of I think I started in cloud code now I update it update it in codeex and saying like I want to tweak this to general knowledge",
              "zh": "为了安全起见。所以我所做的就是我去分叉了它的一个版本，实际上是在我们的 GitHub 上公开的，称为复合知识，这是我专门构建的，采用复合工程插件，它也是公开的，你可以去获取它并进入我想我现在是从云代码开始的，我更新了它，在 codeex 中更新它，并说我想将其调整为常识",
              "ja": "それはセキュリティのためです。そこで私がやったのは、GitHub で実際に公開されている複合ナレッジと呼ばれるそのバージョンをフォークして、これも公開されている複合エンジニアリング プラグインを使用して私が独占的に構築したもので、これを使用して内部にアクセスすることができます。クラウド コードで開始したと思います。今それを更新し、codeex で更新して、これを一般知識に微調整したいように言いました。"
            }
          },
          {
            "start": 3068.48,
            "end": 3087.52,
            "text": {
              "en": "work. And this is the thing I was I was referencing around the like reviewers being much more specific to knowledge work around like strategic alignment and and data accuracy. I think more than anything, this is like a really fun way to learn um and a fun way to like kind of like push yourself on using models.",
              "zh": "工作。这就是我在类似的审阅者周围引用的东西，这些审阅者对知识工作更加具体，例如战略调整和数据准确性。我认为最重要的是，这是一种非常有趣的学习方式，也是一种喜欢推动自己使用模型的有趣方式。",
              "ja": "仕事。そして、これは私が戦略的調整やデータの正確さなどの知識の取り組みに特化した同様のレビューアーを参考にしていたものです。何よりも、これはとても楽しい学習方法であり、モデルを使って自分自身を追い込むための楽しい方法だと思います。"
            }
          },
          {
            "start": 3085.92,
            "end": 3109.04,
            "text": {
              "en": "You're welcome just to go use this one. We'll include it in the in the follow-up email to the camp. Um but I think it's a cool like I learned a ton just by doing this. I had never made like a plugin like this before. Um, and to make your own version of say you do like social media marketing and you want to make sure all the reviews go through your style guide, your like past performance.",
              "zh": "欢迎您使用这个。我们会将其包含在发送给营地的后续电子邮件中。嗯，但我认为这很酷，因为我通过这样做学到了很多东西。我以前从未制作过这样的插件。嗯，制作你自己的版本，说你确实喜欢社交媒体营销，并且你想确保所有评论都经过你的风格指南，你喜欢过去的表现。",
              "ja": "これを使いに行くだけでも大歓迎です。キャンプへのフォローアップメールにそれを含めます。うーん、でもこれをするだけでたくさんのことを学べたみたいで素晴らしいと思います。私はこれまでこのようなプラグインを作成したことがありませんでした。ええと、あなた自身のバージョンを作成するには、あなたはソーシャル メディア マーケティングが好きで、すべてのレビューがあなたのスタイル ガイド、つまり過去のパフォーマンスに沿っていることを確認したいと考えています。"
            }
          },
          {
            "start": 3106.64,
            "end": 3124.4,
            "text": {
              "en": "Um, I I got a ton out of operating this way. If you just want the compound engineering to make your work better, it absolutely works really really well for knowledge work just kind of out of the box. Got it. Yeah. No, interesting.",
              "zh": "嗯，我通过这种方式得到了很多好处。如果你只是想让复合工程让你的工作变得更好，那么它对于知识工作来说绝对非常有效，只是开箱即用。知道了。是的。不，有趣。",
              "ja": "ああ、私はこのやり方でたくさんの利益を得ることができました。複合エンジニアリングで仕事を改善したいだけなら、すぐに使えるナレッジワークには間違いなく非常にうまく機能します。わかった。うん。いや、興味深い。"
            }
          },
          {
            "start": 3121.599,
            "end": 3157.839,
            "text": {
              "en": "particularly using kind of all the the end of step pieces like compound that that's still apparently a valuable step for you. Yeah, the compound step is is really valuable. We have um inside of our notion a goto database of after you're done with a session um you can send the learnings from the session to actually a teamwide shared compound source of truth. Um, whenever I'm done with any session in codeex or cloud code, the",
              "zh": "特别是使用诸如复合之类的所有步骤结束部分，这显然对您来说仍然是一个有价值的步骤。是的，复合步骤确实很有价值。我们的概念中有一个转到数据库，在您完成会话后，您可以将会话中的学习内容发送到实际上是整个团队共享的复合事实来源。嗯，每当我完成 Codeex 或云代码中的任何会话时，",
              "ja": "特にコンパウンドのようなステップの終わりの部分をすべて使用することは、あなたにとって依然として価値のあるステップであると思われます。そうですね、複合ステップは本当に貴重です。私たちの概念の中に、セッションの終了後にセッションからの学習を実際にチーム全体で共有される複合的な真実のソースに送信できる goto データベースがあります。ええと、codeex またはクラウド コードのセッションが終了するたびに、"
            }
          },
          {
            "start": 3155.28,
            "end": 3172.0,
            "text": {
              "en": "agents are instructed to ask me, should we compound this, save it somewhere for the learning, and should we turn any workflow from this session into a skill so that we um can just do it automatically each time? Got it. Cool. No, I'll check that out.",
              "zh": "智能体被指示问我，我们是否应该将其复合，将其保存在某个地方以供学习，以及我们是否应该将此会话中的任何工作流程转化为一项技能，以便我们每次都可以自动执行？知道了。凉爽的。不，我会检查一下。",
              "ja": "agent は私に、「これを合成して、学習用にどこかに保存すべきか、そしてこのセッションのワークフローをスキルに変換して、毎回自動的に実行できるようにすべきか」と尋ねるよう指示されています。わかった。いいね。いいえ、調べてみます。"
            }
          },
          {
            "start": 3170.96,
            "end": 3206.64,
            "text": {
              "en": "Thanks. Cool. All right, Rory, please introduce yourself and ask your question. Hi, my name is Rory and I'm in your head. Um, are there anything uh about the way you work at every um like maybe taking some time after meetings like getting them a few minutes early so that you can do those things that um you'd recommend to teams that are adopting workflows like yours?",
              "zh": "谢谢。凉爽的。好吧，罗里，请介绍一下你自己并提出你的问题。嗨，我叫罗里，我在你的脑海里。嗯，关于你在每个嗯的工作方式，比如在会议结束后花一些时间，比如提前几分钟，这样你就可以做那些你推荐给采用像你这样的工作流程的团队的事情？",
              "ja": "ありがとう。いいね。わかりました、ロリー、自己紹介をしてから質問してください。こんにちは、私の名前はロリーです。あなたの頭の中にいます。ええと、あなたのようなワークフローを採​​用しているチームに推奨したいことを実行できるように、会議の後に数分早く到着するなど、毎回の仕事のやり方について何か気をつけていることはありますか?"
            }
          },
          {
            "start": 3208.559,
            "end": 3238.319,
            "text": {
              "en": "Is that clear? Uh yeah, I think so. Like um but to say it back to you, like what what I'm hearing, which is like a very real challenge here, is that um it's that it's so exciting and tempting and alluring to like spend a lot of your day playing with stuff. also spend a lot of your day continuing to push on like if I just get this automation right or this tool right, my work is going to be like",
              "zh": "清楚了吗？嗯，是的，我想是的。就像嗯，但是要对你说一遍，就像我所听到的那样，这就像这里的一个非常现实的挑战，那就是，嗯，喜欢花很多时间玩东西是非常令人兴奋和诱人的。还要花很多时间继续前进，如果我正确地实现了这个自动化或这个工具，我的工作就会像",
              "ja": "それは明らかですか？ええと、そう思います。そうですね、でも、あなたに言い返すと、私が聞いていることのように、ここでの非常に現実的な挑戦のようなものですが、それは、一日の多くの時間を何かで遊んで過ごすのがとても刺激的で誘惑的で魅力的であるということです。また、一日の多くの時間を費やして、この自動化やこのツールを正しく使えば、私の仕事は次のようになります。"
            }
          },
          {
            "start": 3234.8,
            "end": 3265.04,
            "text": {
              "en": "a hundred times better and easier. And I actually find myself a lot like on a lot of days spending most of my time not in meetings trying to build really good tools and automations that work well and not making the time to do the actual like tasks that have to push the the business forward like like uh shipping the social posts for the day or or whatever. And I I don't really have like an awesome answer for it outside of the",
              "zh": "更好、更容易一百倍。事实上，我发现自己很多天都把大部分时间花在了会议上，试图构建真正优秀的工具和运行良好的自动化工具，而没有时间去做那些必须推动业务向前发展的实际任务，比如发布当天的社交帖子或其他什么。我真的没有一个很棒的答案",
              "ja": "100倍良くて簡単です。そして実際、私自身も、会議に参加していない時間のほとんどを、うまく機能する本当に優れたツールや自動化を構築することに費やし、その日のソーシャル投稿の発送など、ビジネスを前進させる必要がある実際のタスクを行う時間が取れない日が多いことに気づきました。そして、私はそれについて素晴らしい答えを実際には持っていません"
            }
          },
          {
            "start": 3262.88,
            "end": 3292.8,
            "text": {
              "en": "fact that like the the playing around one is like kind of core to how we operate at every it's it's a thing that Dan like pushes all of us to do. It's one reason why I love working here. It's also like to me the best way to learn and and makes me better at everything I do. And then um the the the only kind of like guidance I've given myself is that like these automations in codecs keep me on track to get the work done so that",
              "zh": "事实上，就像我们在每一件事上如何运作的核心一样，这是丹喜欢推动我们所有人去做的一件事。这是我喜欢在这里工作的原因之一。对我来说，这也是最好的学习方式，让我在做的每件事上都做得更好。然后嗯，我给自己的唯一类似的指导是，就像编解码器中的这些自动化一样，让我走上正确的轨道来完成工作，这样",
              "ja": "実際、遊びと同じように、私たちがあらゆる場面でどのように行動するかの中核のようなものであり、それはダンが私たち全員にそうするように促していることです。それが私がここで働くのが好きな理由の 1 つです。それは私にとって最良の学習方法でもあり、何をするにも上達させてくれます。そして、私が自分自身に与えた唯一のガイダンスのようなものは、コーデックの自動化のように、作業を順調に進めることができるようにすることです。"
            }
          },
          {
            "start": 3289.2,
            "end": 3316.16,
            "text": {
              "en": "when I'm too deep in um in like playing around and building this like there's like a social automation tool I'm working on that I've been like deep in for a while. Um the codeex automations make it so that I like you know make sure Brandon gets what he needs for this like um some like bisdev plan we're we're doing. I I do find myself overindexing on learning and and playing because of how exciting and powerful the",
              "zh": "当我太深入时，就像玩弄和构建这个，就像我正在开发的社交自动化工具一样，我已经深入了一段时间。嗯，codeex 自动化做到了这一点，所以我想你知道，确保布兰登得到他需要的东西，就像我们正在做的一些 bisdev 计划一样。我确实发现自己过度关注学习和玩耍，因为学习和玩耍是多么令人兴奋和强大",
              "ja": "私があまりにも深く入り込んでいるときは、遊んでこれを構築しているようなもので、私が取り組んでいるソーシャルオートメーションツールのようなもので、しばらくの間深く入っているようなものです。ええと、コーデックスの自動化により、ブランドンがこれに必要なものを確実に入手できるようにすることができます。たとえば、私たちが行っている bisdev 計画のようなものです。とてもエキサイティングで強力なゲームなので、学習や遊びに過剰に取り組んでいることに気づきました。"
            }
          },
          {
            "start": 3313.68,
            "end": 3340.88,
            "text": {
              "en": "models have been and that more I have to p like continue to pull myself into the the like required day-to-day tasks and the the urgent stuff that's happening. Yeah. And I I also sort of read your question, Rory, and you tell me if this is wrong, but as like how do we do more of the AI stuff, the more of the playing even to even get started on this stuff in our day-to-day uh if we're like busy",
              "zh": "模型已经如此，我必须继续让自己投入到所需的日常任务和正在发生的紧急事情中。是的。我也读了你的问题，罗里，你告诉我这是否是错误的，但就像我们如何做更多人工智能的东西，更多的玩，甚至在我们的日常中开始做这些东西，呃，如果我们很忙的话",
              "ja": "モデルはこれまでもそうだったし、今後も必要な日常業務や緊急の仕事に取り組み続けなければなりません。うん。そして、私もあなたの質問を読んだような気がします、ロリー、そして、これが間違っているかどうか教えてください、でも、AI関連のことをもっとやるにはどうすればよいかというように、日常生活の中で、忙しい場合は、このことに着手することさえもっと楽しくなります。"
            }
          },
          {
            "start": 3338.8,
            "end": 3366.799,
            "text": {
              "en": "all the time. And I and what are the organizational practices that we have for that? And yeah, I just think like Austin said, like it's just like a culture. It's a cultural thing. Um we just love playing around and that's like that's part of our job. Um, and I think there's this there's this thing happening right now where the tools and the workflows are changing so fast that just focusing on how your job currently",
              "zh": "一直。我以及我们为此采取的组织实践是什么？是的，我只是认为就像奥斯汀说的那样，这就像一种文化。这是一个文化问题。嗯，我们只是喜欢玩耍，这就像我们工作的一部分。嗯，我认为现在正在发生这样的事情，工具和工作流程变化如此之快，以至于您只需关注当前的工作方式",
              "ja": "いつも。そして、私とそのために私たちが行っている組織的な慣行は何ですか？オースティンが言ったように、それはまさに文化のようなものだと私は思います。それは文化的なものです。ええと、私たちはただ遊ぶのが大好きで、それが私たちの仕事の一部のようです。ええと、ツールとワークフローが急速に変化している今、このようなことが起こっているので、現在の仕事のやり方に集中するだけだと思います"
            }
          },
          {
            "start": 3364.799,
            "end": 3381.68,
            "text": {
              "en": "works, you can run as fast as possible and someone using a new tool with a new paradigm and a new workflow is just going to beat you by default. And so if you just give yourself some time to play around, it may feel like a waste of time, but you're leveling yourself up to a different game at a different level.",
              "zh": "有效，你可以尽可能快地运行，而使用具有新范式和新工作流程的新工具的人默认会击败你。因此，如果你只是给自己一些时间去玩，可能会觉得浪费时间，但你正在将自己升级到不同级别的不同游戏。",
              "ja": "機能する場合は、できるだけ速く実行できます。新しいパラダイムと新しいワークフローで新しいツールを使用する誰かが、デフォルトであなたを打ち負かすことになります。したがって、少しだけ時間をかけてプレイするのは時間の無駄のように感じるかもしれませんが、別のレベルの別のゲームに自分をレベルアップさせることになります。"
            }
          },
          {
            "start": 3380.0,
            "end": 3401.28,
            "text": {
              "en": "And I think that's really important. And some of the organizational practices that we have to help people do that are really around. And so one of the things we do twice a year is called think week. Um and we just literally don't do any of our day-to-day work and we just spend a week together just like playing around with new stuff and building stuff and learning and and being together. And you",
              "zh": "我认为这非常重要。我们必须帮助人们做到的一些组织实践确实存在。因此，我们每年做两次的事情之一被称为思考周。嗯，我们实际上不做任何日常工作，我们只是在一起度过一周，就像玩新东西、建造东西、学习、在一起一样。你呢",
              "ja": "そしてそれは本当に重要なことだと思います。そして、人々がそれを実践できるように私たちが支援しなければならない組織的な慣行のいくつかは、実際に存在しています。そこで、私たちが年に 2 回行うことの 1 つは、考える週間と呼ばれています。ええと、私たちは文字通り日々の仕事を一切せず、新しいもので遊んだり、ものを作ったり、学んだり、一緒に過ごしたりするように、ただ一週間を一緒に過ごします。あなたも"
            }
          },
          {
            "start": 3400.319,
            "end": 3431.119,
            "text": {
              "en": "don't necessarily have to do a whole week of that, but um I think it's really good to maybe do that once a quarter for a day or something like that. Um, and just give people this the time and space too if if you can. Sweet. Um, all right y'all. So, that is our program for today. Thank you for coming. Uh, we love seeing you. We love doing this with you. Remember, every is the only subscription you need to stay",
              "zh": "不一定要这样做一整周，但是嗯，我认为也许每个季度每天做一次或类似的事情真的很好。嗯，如果可以的话，也给人们时间和空间。甜的。嗯，好吧你们。这就是我们今天的计划。谢谢您的光临。呃，我们很高兴见到你。我们喜欢和你一起做这件事。请记住，每个都是您需要保留的唯一订阅",
              "ja": "必ずしもそれを 1 週間ずっと行う必要はありませんが、四半期に 1 回、1 日程度行うのが非常に良いと思います。ええと、可能であれば、人々にこれにも時間とスペースを与えてください。甘い。えー、大丈夫ですよ。ということで、今日のプログラムは以上です。お越しいただきありがとうございます。ええと、私たちはあなたに会えるのを楽しみにしています。私たちはあなたと一緒にこれを行うのが大好きです。継続する必要があるサブスクリプションは、every だけであることを忘れないでください"
            }
          },
          {
            "start": 3428.559,
            "end": 3450.559,
            "text": {
              "en": "at the edge of AI. We would love it if today you would go tell one of your friends to go subscribe to every. Uh, we want to get more people in here. We just think we're we're right at this amazing point in history where we get to surf, ride this big wave together and figure it out together. And um, please please tell your friends.",
              "zh": "处于人工智能的边缘。如果今天您能告诉您的一位朋友订阅每一本，我们会很高兴。呃，我们想让更多的人来这里。我们只是认为我们正处于历史上这个令人惊奇的时刻，我们可以一起冲浪，一起乘风破浪，一起解决问题。嗯，请告诉你的朋友。",
              "ja": "AIの最先端で。今日、お友達の一人に「すべて」を購読するように伝えていただければ幸いです。ああ、ここにもっと人を集めたいです。私たちはただ、一緒にサーフィンをし、この大きな波に乗り、一緒に解決するという歴史の驚くべき時点に今いると思っています。そして、ぜひお友達にも教えてください。"
            }
          },
          {
            "start": 3449.92,
            "end": 3483.68,
            "text": {
              "en": "See you. Thanks y'all. Oh my gosh, folks. You absolutely positively have to smash that like button and subscribe to AI and I. Why? Because this show is the epitome of awesomeness. It's like finding a treasure chest in your backyard, but instead of gold, it's filled with pure unadulterated knowledge bombs about chat GPT. Every episode is a roller coaster of emotions, insights, and laughter that",
              "zh": "再见。谢谢你们。噢，天哪，伙计们。你绝对必须按下点赞按钮并订阅《AI and I》。为什么呢？因为这部剧是精彩的缩影。这就像在你的后院找到一个宝箱，但里面装的不是黄金，而是关于聊天 GPT 的纯粹纯粹的知识炸弹。每一集都是情感、见解和笑声的过山车",
              "ja": "またね。皆さん、ありがとう。なんとまあ、みなさん。絶対に「いいね！」ボタンを押して、AI と私を購読する必要があります。なぜですか?なぜなら、このショーは素晴らしさの縮図だからです。それは裏庭で宝箱を見つけるようなものですが、そこには金ではなく、チャット GPT に関する純粋な純粋な知識爆弾が詰まっています。すべてのエピソードは、感情、洞察、そして笑いのジェットコースターです。"
            }
          },
          {
            "start": 3481.599,
            "end": 3504.559,
            "text": {
              "en": "will leave you on the edge of your seat, craving for more. It's not just a show. It's a journey into the future with Dan Shipper as the captain of the spaceship. So, do yourself a favor, hit like, smash subscribe, and strap in for the ride of your life. And now, without any further ado, let me just say, Dan, I'm absolutely hopelessly in love with you.",
              "zh": "会让你焦躁不安，渴望更多。这不仅仅是一场表演。这是丹·希珀 (Dan Shipper) 担任宇宙飞船船长的未来之旅。所以，帮自己一个忙，点赞，订阅，然后系好安全带，开始你的人生旅程。现在，事不宜迟，我只想说，丹，我绝对无可救药地爱着你。",
              "ja": "もっと食べたいと座席の端に座ってしまうでしょう。それは単なるショーではありません。それはダン・シッパーが宇宙船の船長として未来への旅です。ですから、ぜひ、「いいね！」を押し、定期購読をし、人生最高のライドに参加してください。さて、これ以上苦労することなく、ただ言わせてください、ダン、私は本当に絶望的にあなたを愛しています。"
            }
          }
        ],
        "translation": {
          "scope": "display-block",
          "source": "translate.googleapis.com",
          "languages": [
            "en",
            "zh",
            "ja"
          ],
          "note": "Translations are generated at the displayed subtitle-block level to preserve reading flow."
        }
      }
    }
  ]
};
