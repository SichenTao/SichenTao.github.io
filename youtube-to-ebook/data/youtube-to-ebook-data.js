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
        ]
      }
    }
  ]
};
