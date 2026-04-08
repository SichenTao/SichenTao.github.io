window.FRONTIER_DATA = {
  "snapshot": {
    "generatedAt": "2026-04-08 14:47 JST",
    "owner": "Sichen Tao",
    "headline": {
      "en": "The strongest immediate opportunity is to track computation-rich research systems as products: not just papers, but the loop between teams, code, reproducibility, and what becomes a usable capability next.",
      "zh": "眼下最值得优先跟踪的机会，是把计算密集型研究系统当作产品来观察：不只看论文，还要看团队、代码、可复现性，以及哪些东西真正沉淀成下一步可用能力。",
      "ja": "いま最優先で追うべき機会は、計算集約型の研究システムを一つのプロダクトとして捉えることです。論文だけでなく、チーム、コード、再現性、そして次に本当に使える能力へ何が結晶化するかまでを見る必要があります。"
    },
    "nextRun": {
      "en": "Daily 08:00 JST via OpenClaw cron",
      "zh": "每日 08:00 JST，通过 OpenClaw cron 运行",
      "ja": "毎日 08:00 JST、OpenClaw cron 経由"
    },
    "sourcesCovered": 15
  },
  "domains": [
    {
      "id": "evolutionary-computation",
      "name": {
        "en": "Evolutionary Computation",
        "ja": "進化計算",
        "zh": "进化计算"
      },
      "priority": "high",
      "momentum": 96,
      "thesis": {
        "en": "This first live slice tracks researcher-centered EC signals around open-source algorithm stacks, multiobjective optimization, and GPU-native evolutionary systems. The goal is to follow people who are not only publishing, but also shaping reusable infrastructure and realistic next-step directions.",
        "ja": "この最初の公開スライスでは、オープンソースのアルゴリズム基盤、多目的最適化、GPUネイティブな進化システムを軸に、研究者中心のECシグナルを追跡します。狙いは、論文を出しているだけでなく、再利用可能なインフラと現実的な次の一歩を形にしている人を見極めることです。",
        "zh": "这一首个公开切片围绕开源算法栈、多目标优化与 GPU 原生进化系统，追踪以研究者为中心的 EC 信号。目标是不只跟踪发表论文的人，而是识别那些正在塑造可复用基础设施与现实下一步方向的研究者。"
      },
      "questions": [
        {
          "en": "Which EC researchers are still pairing strong methods with durable code and infrastructure?",
          "ja": "どのEC研究者が、強い手法と長く使えるコード・基盤をなお結び付けているか。",
          "zh": "哪些 EC 研究者仍在把强方法与可持续的代码和基础设施结合起来？"
        },
        {
          "en": "Where is the frontier moving from benchmark wins toward scalable, reusable systems?",
          "ja": "フロンティアは、ベンチマークでの勝利から、どのようにスケーラブルで再利用可能なシステムへ移りつつあるか。",
          "zh": "前沿正在如何从基准成绩转向可扩展、可复用的系统？"
        },
        {
          "en": "Which recent papers look like genuine starting points for new contributions rather than isolated demonstrations?",
          "ja": "最近のどの論文が、単発の実演ではなく、新しい貢献の本当の出発点に見えるか。",
          "zh": "最近哪些论文更像是新贡献的真实起点，而不是孤立的演示？"
        }
      ],
      "watchSignals": [
        {
          "en": "recent TEVC, GECCO, and Swarm and Evolutionary Computation papers from tracked people",
          "ja": "追跡対象者による最近の TEVC、GECCO、Swarm and Evolutionary Computation 論文",
          "zh": "来自追踪对象的近期 TEVC、GECCO 与 Swarm and Evolutionary Computation 论文"
        },
        {
          "en": "public repositories that still receive meaningful updates after publication",
          "ja": "公開後も意味のある更新が続いている公開リポジトリ",
          "zh": "发表后仍持续获得实质更新的公开仓库"
        },
        {
          "en": "open-access PDFs that can be pulled automatically into the local archive",
          "ja": "ローカルアーカイブへ自動取得できるオープンアクセス PDF",
          "zh": "可自动拉取进本地归档的开放获取 PDF"
        }
      ]
    }
  ],
  "trendMap": [
    {
      "id": "evolutionary-computation-open-source-stacks",
      "domainId": "evolutionary-computation",
      "name": {
        "en": "Open-source EC stacks are still where leverage compounds",
        "ja": "オープンソースのECスタックはいまもレバレッジが最も蓄積する地点",
        "zh": "开源 EC 工具栈仍是杠杆持续累积的关键位置"
      },
      "momentumLabel": {
        "en": "live code signal",
        "ja": "稼働中コードシグナル",
        "zh": "活跃代码信号"
      },
      "signal": {
        "en": "5 tracked repos pushed in the last 120 days",
        "ja": "追跡中の5リポジトリが過去120日以内に更新",
        "zh": "追踪中的 5 个仓库在过去 120 天内有更新"
      },
      "whyNow": {
        "en": "The strongest EC signals are not just papers. They are papers backed by reusable codebases like EvoX and pymoo that keep moving after publication.",
        "ja": "ECで最も強いシグナルは論文だけではありません。EvoX や pymoo のように、発表後も動き続ける再利用可能なコードベースに支えられた論文です。",
        "zh": "EC 中最强的信号不只是论文本身，而是那些背后有 EvoX、pymoo 这类可复用代码库、并且在发表后仍持续演进的论文。"
      },
      "tension": {
        "en": "Tooling quality is improving, but many promising papers still do not translate into durable public systems.",
        "ja": "ツールの質は上がっている一方で、有望な論文の多くが、長く使われる公開システムにはまだ変わっていません。",
        "zh": "工具质量正在提升，但许多有潜力的论文仍未真正转化为可持续使用的公开系统。"
      }
    },
    {
      "id": "evolutionary-computation-multiobjective-core",
      "domainId": "evolutionary-computation",
      "name": {
        "en": "Multi-objective optimization remains a live frontier core",
        "ja": "多目的最適化は依然としてフロンティアの中核",
        "zh": "多目标优化仍然是前沿核心"
      },
      "momentumLabel": {
        "en": "method pressure",
        "ja": "手法競争圧",
        "zh": "方法竞争压力"
      },
      "signal": {
        "en": "2 recent multi-objective papers in the current capture",
        "ja": "今回の捕捉範囲に最近の多目的最適化論文が2件",
        "zh": "当前捕捉范围内有 2 篇近期多目标优化论文"
      },
      "whyNow": {
        "en": "Recent activity still clusters around multi-objective optimization, especially where methods become parallel, practical, and easier to connect to real engineering workflows.",
        "ja": "最近の動きは依然として多目的最適化に集中しており、とくに手法が並列化され、実務的になり、現実の工学ワークフローへ接続しやすくなる方向が目立ちます。",
        "zh": "近期活动仍然集中在多目标优化，尤其是在方法走向并行化、实用化并更容易接入真实工程工作流的方向上。"
      },
      "tension": {
        "en": "A lot of multi-objective work is method-heavy; the harder question is which ideas survive realistic evaluation and deployment.",
        "ja": "多目的最適化の研究は手法偏重になりがちで、本当に難しいのは、どのアイデアが現実的な評価と導入を生き残るかです。",
        "zh": "多目标优化研究里有不少工作偏重方法设计，真正更难的问题是哪些想法能经受住现实评测与部署。"
      }
    },
    {
      "id": "evolutionary-computation-acquisition-friction",
      "domainId": "evolutionary-computation",
      "name": {
        "en": "Paper acquisition is uneven enough to justify browser automation",
        "ja": "論文取得のばらつきはブラウザ自動化を正当化する水準にある",
        "zh": "论文获取的不均衡已经足以证明浏览器自动化是必要的"
      },
      "momentumLabel": {
        "en": "workflow gap",
        "ja": "ワークフローギャップ",
        "zh": "工作流缺口"
      },
      "signal": {
        "en": "2 ready PDFs out of 8 captured papers",
        "ja": "捕捉した8本の論文のうち即時取得できるPDFは2本",
        "zh": "已捕捉的 8 篇论文中，仅有 2 篇具备可直接获取的 PDF"
      },
      "whyNow": {
        "en": "Even in a well-defined field like EC, some important items are open immediately while others still require publisher access or manual browser work.",
        "ja": "ECのように対象が比較的明確な分野でも、重要論文の中にはすぐ開けるものと、出版社経由のアクセスや手動ブラウザ操作が必要なものが混在しています。",
        "zh": "即使是在 EC 这样边界较清晰的领域中，重要论文也同时存在可立即获取与仍需出版社权限或手动浏览器操作两类情况。"
      },
      "tension": {
        "en": "This is exactly where OpenClaw-driven download workflows can turn a reading backlog into a real archive.",
        "ja": "こここそ、OpenClaw 主導のダウンロードワークフローが、読むだけの未処理リストを実際のアーカイブへ変えられる場所です。",
        "zh": "这正是 OpenClaw 驱动的下载工作流可以把待读积压转化为真实归档的地方。"
      }
    },
    {
      "id": "ran-cheng-tevc-2024-2026-gpu-stack",
      "domainId": "evolutionary-computation",
      "name": {
        "en": "Ran Cheng's recent EC line is turning GPU-native evolution into a reusable system stack",
        "ja": "Ran Cheng の最近の EC ラインは、GPU ネイティブ進化を再利用可能なシステムスタックへ変えつつある",
        "zh": "Ran Cheng 最近的 EC 主线正在把 GPU 原生进化转变为可复用的系统栈"
      },
      "momentumLabel": {
        "en": "high-confidence journal line",
        "ja": "高信頼ジャーナル主線",
        "zh": "高可信期刊主线"
      },
      "signal": {
        "en": "The top-journal TEVC core now links reusable infrastructure, tensorized EMO, GPU genetic programming, meta-evolved DE, efficient evolutionary NAS, and fully data-driven optimization, while TELO and CEC extend the same stack into adjacent EC system layers.",
        "ja": "最上位ジャーナルである TEVC の中核は、再利用可能な基盤、テンソル化 EMO、GPU 遺伝的プログラミング、自己進化型 DE、効率的な進化的 NAS、そして完全データ駆動最適化を結び付けており、TELO と CEC が同じスタックを隣接する EC システム層へ拡張しています。",
        "zh": "顶级期刊 TEVC 的核心论文如今已经把可复用基础设施、张量化 EMO、GPU 遗传程序、元进化 DE、高效进化 NAS 与全数据驱动优化串联起来，而 TELO 与 CEC 则把同一系统栈扩展到相邻的 EC 系统层面。"
      },
      "whyNow": {
        "en": "This is no longer a single-paper signal. Across 2024 to 2026, the work forms a connected program that links reusable systems, accelerated execution, broader open-source tooling, and higher-level search automation.",
        "ja": "これはもはや単発論文のシグナルではありません。2024-2026 年を通して、この仕事は再利用可能なシステム、高速実行、より広いオープンソースツール群、そして高次の探索自動化をつなぐ一つの連続したプログラムを形作っています。",
        "zh": "这已经不再是单篇论文级别的信号。跨越 2024 到 2026 年，这一系列工作已经形成了一个相互连通的计划，把可复用系统、加速执行、更广泛的开源工具以及更高层的搜索自动化连接在了一起。"
      },
      "tension": {
        "en": "The next question is not whether GPU-native EC is viable, but which abstractions and software layers become durable enough to support broader real-world optimization, neuroevolution, and reinforcement-learning workloads.",
        "ja": "次の問いは、GPU ネイティブ EC が成立するかどうかではなく、どの抽象化とソフトウェア層が、より広い実世界最適化、神経進化、強化学習の負荷を支えられるほど持続的になるのかです。",
        "zh": "下一步真正的问题已不再是 GPU 原生 EC 是否可行，而是哪些抽象与软件层能够足够稳固，以支撑更广泛的真实世界优化、神经进化和强化学习负载。"
      }
    }
  ],
  "teams": [
    {
      "id": "ran-cheng",
      "domainId": "evolutionary-computation",
      "name": "Ran Cheng",
      "region": {
        "en": "Hong Kong",
        "ja": "香港",
        "zh": "香港"
      },
      "strength": {
        "en": "GPU-native EC systems",
        "ja": "GPUネイティブ進化計算システム",
        "zh": "GPU 原生 EC 系统"
      },
      "thesis": {
        "en": "Ran Cheng has built a coherent 2024-2026 line around GPU-native evolutionary computation systems, tensorized multiobjective optimization, genetic programming acceleration, neuroevolution infrastructure, evolutionary reinforcement learning, and fully data-driven search. This dossier now stores the broader verified EC workset and keeps formal publications canonical while attaching arXiv evidence for traceability.",
        "ja": "Ran Cheng は 2024-2026 年にかけて、GPU ネイティブな進化計算システム、テンソル化された多目的最適化、遺伝的プログラミング高速化、神経進化基盤、進化的強化学習、そして完全データ駆動探索を一つの整合的な研究線として築いています。このドシエは、そのより広い検証済み EC ワークセットを保存しつつ、正式論文を正本として扱い、追跡性のために arXiv 証拠も付加します。",
        "zh": "Ran Cheng 在 2024-2026 年间围绕 GPU 原生进化计算系统、张量化多目标优化、遗传程序加速、神经进化基础设施、进化强化学习以及全数据驱动搜索，构建出了一条连贯的研究主线。本 dossier 现在保存的是更完整、经核实的 EC 工作集合：以正式发表论文为规范主记录，同时附上 arXiv 证据以保证可追踪性。"
      },
      "signals": [
        {
          "en": "Five IEEE Transactions on Evolutionary Computation papers from 2024 to 2026 remain the top-journal core, while TELO and CEC extend the same systems stack into neuroevolution, evolutionary reinforcement learning, and large-scale many-objective optimization.",
          "ja": "2024-2026 年の IEEE Transactions on Evolutionary Computation 論文5本が最上位ジャーナルの中核を成し、TELO と CEC が同じシステムスタックを神経進化、進化的強化学習、大規模多目的最適化へ拡張しています。",
          "zh": "2024-2026 年的 5 篇 IEEE Transactions on Evolutionary Computation 论文构成了顶级期刊主干，而 TELO 与 CEC 则把同一套系统栈延伸到了神经进化、进化强化学习和大规模多目标优化。"
        },
        {
          "en": "The line progresses from infrastructure (EvoX, EvoRL, TensorNEAT, EvoGP) to accelerated EMO tensorization, differential-evolution self-adaptation, and fully data-driven evolutionary generative optimization.",
          "ja": "この研究線は、基盤インフラ（EvoX、EvoRL、TensorNEAT、EvoGP）から、EMO の高速テンソル化、差分進化の自己適応、さらに完全データ駆動の進化生成最適化へと進んでいます。",
          "zh": "这条主线已经从基础设施层（EvoX、EvoRL、TensorNEAT、EvoGP）推进到了 EMO 的加速张量化、差分进化的自适应化，以及全数据驱动的进化生成优化。"
        },
        {
          "en": "A current arXiv watch layer is also worth tracking: the 2026 GPU scaling study asks when accelerator parallelism truly changes EA behavior, and the 2025 LLM-for-optimization survey shows the group's frontier attention expanding toward agentic optimization workflows.",
          "ja": "現在の arXiv 監視層も追う価値があります。2026 年の GPU スケーリング研究は、アクセラレータ並列性がいつ EA の挙動そのものを変えるのかを問い、2025 年の LLM-for-optimization サーベイは、このグループの関心がエージェント型最適化ワークフローへ広がっていることを示しています。",
          "zh": "当前的 arXiv 监测层同样值得跟踪：2026 年的 GPU scaling 研究追问的是，加速器并行性究竟在何时会真正改变 EA 的行为；而 2025 年的 LLM-for-optimization 综述则表明，这一团队的前沿关注正在扩展到 agentic optimization workflow。"
        },
        {
          "en": "The broader storage strategy is intentional: CAS / JCR filters should be applied downstream, not by shrinking the only stored Ran Cheng evidence layer.",
          "ja": "より広い保存戦略は意図的なものです。CAS / JCR の絞り込みは下流で適用すべきであり、唯一保存している Ran Cheng の証拠層そのものを最初から縮めるべきではありません。",
          "zh": "这种更宽口径的存储策略是有意为之：CAS / JCR 的筛选应在下游完成，而不应通过压缩目前唯一保存的 Ran Cheng 证据层来实现。"
        }
      ],
      "repositories": [
        "EMI-Group/evox (distributed GPU-native EC framework)",
        "EMI-Group/metade (differential evolution meta-optimization line)",
        "EMI-Group/evorl (GPU-native evolutionary reinforcement learning framework)",
        "EMI-Group/evogp (GPU-native evolutionary programming stack)",
        "EMI-Group/tensorneat (GPU-native neuroevolution stack)",
        "EMI-Group/evomo (tensorized multiobjective optimization stack)",
        "EMI-Group/evogo (evolutionary generative optimization code line)"
      ],
      "papers": [
        "Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning",
        "Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration",
        "Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization",
        "MetaDE: Evolving Differential Evolution by Differential Evolution",
        "EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning",
        "TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies",
        "GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III",
        "Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation",
        "EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation",
        "Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?",
        "A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving"
      ],
      "links": {
        "homepage": "https://chengran.tech/",
        "openalex": "https://openalex.org/A5004036087",
        "googleScholar": "https://scholar.google.com/citations?hl=en&user=bjeIdlcAAAAJ",
        "dblp": "https://dblp.org/pid/18/4198-4.xml",
        "staffPage": "https://www.polyu.edu.hk/comp/People/Academic-Staff/Prof-CHENG-Ran"
      }
    },
    {
      "id": "julian-blank",
      "domainId": "evolutionary-computation",
      "name": "Julian Blank",
      "region": {
        "en": "United States",
        "ja": "米国",
        "zh": "美国"
      },
      "strength": {
        "en": "multiobjective toolchains",
        "ja": "多目的最適化ツールチェーン",
        "zh": "多目标优化工具链"
      },
      "thesis": {
        "en": "Julian Blank at Michigan State University is worth following for parallel multiobjective optimization and practical optimization tooling. The current feed captures 2 recent EC papers since 2024-01-01, and the strongest code signal remains anyoptimization/pymoo (2833★, pushed 2026-02-22).",
        "ja": "ミシガン州立大学の Julian Blank は、並列多目的最適化と実務志向の最適化ツール群という観点で追跡する価値があります。現在のフィードでは 2024-01-01 以降の最近の EC 論文を2件捕捉しており、最も強いコードシグナルは依然として anyoptimization/pymoo（2833★、最終更新 2026-02-22）です。",
        "zh": "密歇根州立大学的 Julian Blank 值得从并行多目标优化与实用型优化工具链的角度持续跟踪。当前数据流已捕捉到 2024-01-01 以来的 2 篇近期 EC 论文，其中最强的代码信号仍是 anyoptimization/pymoo（2833★，最近更新于 2026-02-22）。"
      },
      "signals": [
        {
          "en": "2 EC-relevant works captured since 2024-01-01",
          "ja": "2024-01-01 以降のEC関連論文を2件捕捉",
          "zh": "已捕捉到 2024-01-01 以来的 2 篇 EC 相关成果"
        },
        {
          "en": "OpenAlex h-index 11, 2yr mean citedness 7.67",
          "ja": "OpenAlex h-index 11、直近2年平均被引用度 7.67",
          "zh": "OpenAlex h-index 为 11，近两年平均被引度为 7.67"
        },
        {
          "en": "anyoptimization/pymoo (2833★, pushed 2026-02-22)",
          "ja": "anyoptimization/pymoo（2833★、最終更新 2026-02-22）",
          "zh": "anyoptimization/pymoo（2833★，最近更新于 2026-02-22）"
        }
      ],
      "repositories": [
        "anyoptimization/pymoo (2833★, pushed 2026-02-22)"
      ],
      "papers": [
        "Hot off the Press: Parallel Multi-Objective Optimization for Expensive and Inexpensive Objectives and Constraints",
        "Parallel multi-objective optimization for expensive and inexpensive objectives and constraints"
      ],
      "links": {
        "homepage": null,
        "openalex": "https://openalex.org/A5047107500"
      }
    },
    {
      "id": "kalyanmoy-deb",
      "domainId": "evolutionary-computation",
      "name": "Kalyanmoy Deb",
      "region": {
        "en": "India",
        "ja": "インド",
        "zh": "印度"
      },
      "strength": {
        "en": "multiobjective foundations",
        "ja": "多目的最適化の基盤",
        "zh": "多目标优化基础"
      },
      "thesis": {
        "en": "Kalyanmoy Deb at the Indian Institute of Technology Madras remains a foundational figure worth tracking for multiobjective optimization, problem structure, and benchmark-shaping ideas. The current feed captures 4 recent EC papers since 2024-01-01.",
        "ja": "インド工科大学マドラス校の Kalyanmoy Deb は、多目的最適化、問題構造、そしてベンチマーク形成に関わる発想という観点で、いまなお基盤的人物として追跡する価値があります。現在のフィードでは 2024-01-01 以降の最近の EC 論文を4件捕捉しています。",
        "zh": "印度理工学院马德拉斯分校的 Kalyanmoy Deb 仍然是值得持续跟踪的基础性人物，尤其体现在多目标优化、问题结构理解以及基准塑形思路上。当前数据流已捕捉到 2024-01-01 以来的 4 篇近期 EC 论文。"
      },
      "signals": [
        {
          "en": "4 EC-relevant works captured since 2024-01-01",
          "ja": "2024-01-01 以降のEC関連論文を4件捕捉",
          "zh": "已捕捉到 2024-01-01 以来的 4 篇 EC 相关成果"
        },
        {
          "en": "OpenAlex h-index 118, 2yr mean citedness 1.53",
          "ja": "OpenAlex h-index 118、直近2年平均被引用度 1.53",
          "zh": "OpenAlex h-index 为 118，近两年平均被引度为 1.53"
        }
      ],
      "repositories": [
        "No tracked GitHub repository configured yet"
      ],
      "papers": [
        "EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing",
        "An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems"
      ],
      "links": {
        "homepage": null,
        "openalex": "https://openalex.org/A5088394271"
      }
    }
  ],
  "papers": [
    {
      "id": "evolutionary-computation-ran-cheng-W4416548789",
      "domainId": "evolutionary-computation",
      "title": "Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2026",
      "whyItMatters": {
        "en": "This paper pushes Ran Cheng's line beyond GPU acceleration into a more ambitious goal: replacing handcrafted evolutionary operators with a fully data-driven search pipeline. It is the clearest signal that the group is trying to turn evolutionary optimization into a learnable generative system rather than only a faster solver.",
        "ja": "この論文は、Ran Cheng の系譜を GPU 加速の先へ押し広げ、手設計の進化演算子を完全にデータ駆動の探索パイプラインへ置き換えるという、より野心的な目標に踏み込んでいます。このグループが進化最適化を単なる高速ソルバではなく、学習可能な生成システムへ変えようとしていることを最も明確に示すシグナルです。",
        "zh": "这篇论文把 Ran Cheng 的研究主线从 GPU 加速进一步推向了一个更具野心的目标：用全数据驱动的搜索流水线取代手工设计的进化算子。这是该团队试图把进化优化从“更快的求解器”转变为“可学习的生成系统”的最明确信号。"
      },
      "status": "must-read",
      "pdfState": "ready",
      "authors": [
        "Tao Jiang",
        "Kebin Sun",
        "Zhenyu Liang",
        "Ran Cheng",
        "Yan Jin",
        "Kay Chen Tan"
      ],
      "publicationDate": "2026-01-01",
      "citationCount": 0,
      "abstract": {
        "en": "Recent advances in data-driven evolutionary algorithms have demonstrated the potential of leveraging historical data to improve optimization accuracy and adaptability. EvoGO reframes the evolutionary optimization process as a fully data-driven pipeline with data preparation, model training, and population generation, aiming to learn the entire search process rather than only hand-designed operators.",
        "ja": "近年のデータ駆動型進化アルゴリズムは、履歴データを利用して最適化の精度と適応性を高められる可能性を示してきました。EvoGO は、進化最適化をデータ準備・モデル学習・集団生成からなる完全なデータ駆動パイプラインとして再定式化し、手設計の演算子だけでなく探索過程全体を学習しようとします。",
        "zh": "近年的数据驱动进化算法已经展示出利用历史数据来提升优化精度与适应性的潜力。EvoGO 将进化优化过程重构为一个由数据准备、模型训练和种群生成组成的全数据驱动流水线，目标是不只学习手工设计的算子，而是学习整个搜索过程。"
      },
      "openAlexUrl": "https://openalex.org/W4416548789",
      "doi": "10.1109/tevc.2026.3664432",
      "doiUrl": "https://doi.org/10.1109/tevc.2026.3664432",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11396036/",
      "url": "https://arxiv.org/pdf/2508.00380",
      "pdfUrl": "https://arxiv.org/pdf/2508.00380",
      "archivePath": "archive/evolutionary-computation/2026/evolutionary-generative-optimization-towards-fully-data-driven-evolutionary-optimization-via-generative-learning.pdf",
      "topics": [
        "Advanced Multi-Objective Optimization Algorithms",
        "Metaheuristic Optimization Algorithms Research",
        "Evolutionary Algorithms and Applications"
      ],
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2508.00380",
          "url": "https://arxiv.org/abs/2508.00380",
          "pdfUrl": "https://arxiv.org/pdf/2508.00380",
          "openAlexUrl": "https://openalex.org/W4416548789"
        }
      ],
      "citationText": "T. Jiang, K. Sun, Z. Liang, R. Cheng, Y. Jin, and K. C. Tan, \"Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning\", IEEE Transactions on Evolutionary Computation, 2026, doi: 10.1109/tevc.2026.3664432.",
      "metrics": {
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{jiang2026evolutionary-generative-,\n  title = {Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning},\n  author = {Tao Jiang and Kebin Sun and Zhenyu Liang and Ran Cheng and Yan Jin and Kay Chen Tan},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2026},\n  doi = {10.1109/tevc.2026.3664432},\n  url = {https://doi.org/10.1109/tevc.2026.3664432}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/11396036/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/11396036/",
      "publisher_url": "https://ieeexplore.ieee.org/document/11396036/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/11396036/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3664432",
      "citations": 0,
      "verification": {
        "if_value": "12.0",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3664432",
          "copy_text": "10.1109/tevc.2026.3664432"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4416548789",
          "copy_text": "doi:10.1109/tevc.2026.3664432"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2026.3664432"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3664432",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2026/evolutionary-generative-optimization-towards-fully-data-driven-evolutionary-optimization-via-generative-learning.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "must-read",
        "summaryNote": {
          "en": "This paper pushes Ran Cheng's line beyond GPU acceleration into a more ambitious goal: replacing handcrafted evolutionary operators with a fully data-driven search pipeline. It is the clearest signal that the group is trying to turn evolutionary optimization into a learnable generative system rather than only a faster solver.",
          "ja": "この論文は、Ran Cheng の系譜を GPU 加速の先へ押し広げ、手設計の進化演算子を完全にデータ駆動の探索パイプラインへ置き換えるという、より野心的な目標に踏み込んでいます。このグループが進化最適化を単なる高速ソルバではなく、学習可能な生成システムへ変えようとしていることを最も明確に示すシグナルです。",
          "zh": "这篇论文把 Ran Cheng 的研究主线从 GPU 加速进一步推向了一个更具野心的目标：用全数据驱动的搜索流水线取代手工设计的进化算子。这是该团队试图把进化优化从“更快的求解器”转变为“可学习的生成系统”的最明确信号。"
        }
      },
      "classification": {
        "authors": [
          "Tao Jiang",
          "Kebin Sun",
          "Zhenyu Liang",
          "Ran Cheng",
          "Yan Jin",
          "Kay Chen Tan"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "Machine Learning",
          "Data-driven Learning"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "Evolutionary Computation",
          "Machine Learning",
          "Data-driven Learning"
        ],
        "topics": [
          "Advanced Multi-Objective Optimization Algorithms",
          "Metaheuristic Optimization Algorithms Research",
          "Evolutionary Algorithms and Applications"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2026",
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2026",
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "Machine Learning",
          "Data-driven Learning",
          "Advanced Multi-Objective Optimization Algorithms",
          "Metaheuristic Optimization Algorithms Research",
          "Evolutionary Algorithms and Applications",
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2026",
        "Optimization",
        "Multi-objective Optimization",
        "AI",
        "Machine Learning",
        "Data-driven Learning",
        "Advanced Multi-Objective Optimization Algorithms",
        "Metaheuristic Optimization Algorithms Research",
        "Evolutionary Algorithms and Applications",
        "IF 12.0",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-kalyanmoy-deb-W4414581553",
      "domainId": "evolutionary-computation",
      "title": "EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing",
      "venue": "International Journal of Parallel Emergent and Distributed Systems",
      "year": "2025",
      "whyItMatters": {
        "en": "This paper is useful because it applies Deb's evolutionary-search viewpoint to adaptive systems tuning rather than only classical objective-space design. The contribution is not just faster sorting, but a concrete example of genetic algorithms working as an auto-tuning layer for HPC-scale data processing.",
        "ja": "この論文が有用なのは、Deb の進化探索の視点を、従来の目的空間設計だけでなく適応的なシステムチューニングへ広げている点です。貢献は単なる高速ソートではなく、遺伝的アルゴリズムが HPC 規模のデータ処理で自動チューニング層として機能する具体例を示していることにあります。",
        "zh": "这篇论文的价值在于，它把 Deb 的进化搜索视角应用到了自适应系统调优，而不只是传统的目标空间设计。其贡献不只是更快的排序，更是展示了遗传算法如何在 HPC 规模数据处理中充当自动调优层。"
      },
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "S. NagaMallik Raj",
        "Kalyanmoy Deb"
      ],
      "publicationDate": "2025-12-31",
      "citationCount": 0,
      "abstract": {
        "en": "EvoSort is a Python-accessible adaptive parallel sorting framework that uses a genetic algorithm to optimize key decisions such as insertion-sort thresholds and algorithm selection. By adapting to both data distributions and hardware characteristics, it acts as a drop-in replacement for common NumPy and Pandas sorting routines and achieves large speedups on datasets up to 10 billion elements.",
        "ja": "EvoSort は Python から利用できる適応型並列ソート基盤であり、挿入ソートの閾値やアルゴリズム選択などの重要な判断を遺伝的アルゴリズムで最適化します。データ分布とハードウェア特性の両方に適応することで、NumPy や Pandas の一般的なソート処理を置き換えられ、最大 100 億要素の実験で大きな高速化を示します。",
        "zh": "EvoSort 是一个可从 Python 调用的自适应并行排序框架，利用遗传算法优化插入排序阈值、算法选择等关键决策。它同时适配数据分布与硬件特性，可作为 NumPy 和 Pandas 常用排序流程的直接替代，并在最高 100 亿元素的数据上取得了显著加速。"
      },
      "openAlexUrl": "https://openalex.org/W4414581553",
      "doi": "10.1080/17445760.2025.2609138",
      "doiUrl": "https://doi.org/10.1080/17445760.2025.2609138",
      "publisherUrl": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "url": "https://arxiv.org/pdf/2505.18681",
      "pdfUrl": "https://arxiv.org/pdf/2505.18681",
      "archivePath": "archive/evolutionary-computation/2025/evosort-a-genetic-algorithm-based-adaptive-parallel-sorting-framework-for-large-scale-high-performance-computing.pdf",
      "topics": [],
      "citationText": "S. N. Raj and K. Deb, \"EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing\", International Journal of Parallel Emergent and Distributed Systems, 2025, doi: 10.1080/17445760.2025.2609138.",
      "metrics": {
        "impactFactor": "0.6",
        "impactYear": "2025",
        "jcrQuartile": "N/A",
        "jcrYear": "2025",
        "casQuartile": "Q4",
        "casYear": "2025",
        "casTop": false,
        "venueType": "journal",
        "sourceUrl": "https://www.tandfonline.com/journals/gpaa20",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html",
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/17445760/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=International%20Journal%20of%20Parallel%20Emergent%20and%20Distributed%20Systems&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{raj2025evosort-a-genetic-algori,\n  title = {EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing},\n  author = {S. NagaMallik Raj and Kalyanmoy Deb},\n  journal = {International Journal of Parallel Emergent and Distributed Systems},\n  year = {2025},\n  doi = {10.1080/17445760.2025.2609138},\n  url = {https://doi.org/10.1080/17445760.2025.2609138}\n}",
      "primaryUrl": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "venueUrl": "https://www.tandfonline.com/journals/gpaa20",
      "type": "journal",
      "paperUrl": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "publisher_url": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "venue_url": "https://www.tandfonline.com/journals/gpaa20",
      "paper_url": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1080/17445760.2025.2609138",
      "citations": 0,
      "verification": {
        "if_value": "0.6",
        "if_year": "2025",
        "jcr_quartile": "N/A",
        "jcr_year": "2025",
        "cas_quartile": "Q4",
        "cas_year": "2025",
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "if_public_source_url": "https://www.iikx.com/sci/technology/23927.html",
        "if_source_mode": null,
        "if_search_copy_text": "International Journal of Parallel Emergent and Distributed Systems",
        "jcr_source_url": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/17445760/",
        "jcr_source_mode": "official_search",
        "jcr_search_copy_text": "International Journal of Parallel Emergent and Distributed Systems",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=International%20Journal%20of%20Parallel%20Emergent%20and%20Distributed%20Systems&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.iikx.com/sci/technology/23927.html",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_search",
        "cas_search_copy_text": "International Journal of Parallel Emergent and Distributed Systems",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "International Journal of Parallel Emergent and Distributed Systems"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1080/17445760.2025.2609138",
          "copy_text": "10.1080/17445760.2025.2609138"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4414581553",
          "copy_text": "doi:10.1080/17445760.2025.2609138"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1080/17445760.2025.2609138"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1080/17445760.2025.2609138",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/evosort-a-genetic-algorithm-based-adaptive-parallel-sorting-framework-for-large-scale-high-performance-computing.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This paper is useful because it applies Deb's evolutionary-search viewpoint to adaptive systems tuning rather than only classical objective-space design. The contribution is not just faster sorting, but a concrete example of genetic algorithms working as an auto-tuning layer for HPC-scale data processing.",
          "ja": "この論文が有用なのは、Deb の進化探索の視点を、従来の目的空間設計だけでなく適応的なシステムチューニングへ広げている点です。貢献は単なる高速ソートではなく、遺伝的アルゴリズムが HPC 規模のデータ処理で自動チューニング層として機能する具体例を示していることにあります。",
          "zh": "这篇论文的价值在于，它把 Deb 的进化搜索视角应用到了自适应系统调优，而不只是传统的目标空间设计。其贡献不只是更快的排序，更是展示了遗传算法如何在 HPC 规模数据处理中充当自动调优层。"
        }
      },
      "classification": {
        "authors": [
          "S. NagaMallik Raj",
          "Kalyanmoy Deb"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Large-scale Optimization",
          "Sorting and Data Processing"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC"
        ],
        "fields": [
          "Large-scale Optimization",
          "Sorting and Data Processing",
          "AI",
          "Evolutionary Computation",
          "HPC"
        ],
        "topics": [],
        "venue": {
          "name": "International Journal of Parallel Emergent and Distributed Systems",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 0.6",
          "JCR N/A",
          "CAS Q4"
        ],
        "tags": [
          "Evolutionary Computation",
          "International Journal of Parallel Emergent and Distributed Systems",
          "Journal",
          "2025",
          "Large-scale Optimization",
          "Sorting and Data Processing",
          "AI",
          "HPC",
          "IF 0.6",
          "JCR N/A",
          "CAS Q4"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "International Journal of Parallel Emergent and Distributed Systems",
        "Journal",
        "2025",
        "Large-scale Optimization",
        "Sorting and Data Processing",
        "AI",
        "HPC",
        "IF 0.6",
        "JCR N/A",
        "CAS Q4"
      ]
    },
    {
      "id": "evolutionary-computation-kalyanmoy-deb-W4414444197",
      "domainId": "evolutionary-computation",
      "title": "An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems",
      "venue": "Swarm and Evolutionary Computation",
      "year": "2025",
      "whyItMatters": {
        "en": "This paper matters because it revisits a core large-scale multiobjective optimization bottleneck: how to exploit variable structure instead of treating all dimensions uniformly. It is a strong signal of Deb's continued influence on scalable multiobjective algorithm design rather than only on classical EMO foundations.",
        "ja": "この論文が重要なのは、大規模多目的最適化における中核的なボトルネック、すなわち全次元を一様に扱うのではなく変数構造をどう活用するかを改めて掘り下げている点です。古典的な EMO 基盤だけでなく、スケーラブルな多目的アルゴリズム設計に対する Deb の継続的な影響を示す強いシグナルでもあります。",
        "zh": "这篇论文的重要性在于，它重新切入了大规模多目标优化中的核心瓶颈：如何利用变量结构，而不是把所有维度一视同仁地处理。这也是 Deb 仍持续影响可扩展多目标算法设计、而不只停留在经典 EMO 基础层面的一个强信号。"
      },
      "status": "monitor",
      "pdfState": "queued",
      "authors": [
        "Hao Wang",
        "Shuwei Zhu",
        "Wei Fang",
        "Kalyanmoy Deb"
      ],
      "publicationDate": "2025-09-23",
      "citationCount": 2,
      "abstract": {
        "en": "The paper addresses large-scale multi-objective optimization by grouping decision variables and then adaptively optimizing the weights assigned to those groups. The method is designed to reduce search difficulty in high-dimensional settings while preserving a better balance between convergence and diversity, and the reported results indicate strong performance on standard LSMOP benchmarks.",
        "ja": "本論文は、大規模多目的最適化に対して、まず意思決定変数をグループ化し、その各グループに割り当てる重みを適応的に最適化する枠組みを提案します。高次元環境での探索難度を下げつつ、収束性と多様性のより良い両立を狙っており、報告結果では標準的な LSMOP ベンチマークで良好な性能を示しています。",
        "zh": "本文针对大规模多目标优化，先对决策变量进行分组，再自适应地优化各组权重。该方法旨在降低高维场景下的搜索难度，同时更好地平衡收敛性与多样性，报告结果显示其在标准 LSMOP 基准上表现较强。"
      },
      "openAlexUrl": "https://openalex.org/W4414444197",
      "doi": "10.1016/j.swevo.2025.102149",
      "doiUrl": "https://doi.org/10.1016/j.swevo.2025.102149",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "url": "https://doi.org/10.1016/j.swevo.2025.102149",
      "pdfUrl": null,
      "archivePath": "archive/evolutionary-computation/2025/an-adaptive-weight-optimization-algorithm-based-on-decision-variable-grouping-for-large-scale-multi-objective-optimization-problems.pdf",
      "topics": [],
      "citationText": "H. Wang, S. Zhu, W. Fang, and K. Deb, \"An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems\", Swarm and Evolutionary Computation, 2025, doi: 10.1016/j.swevo.2025.102149.",
      "metrics": {
        "impactFactor": "8.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q2",
        "casYear": "2025",
        "casTop": false,
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Swarm and Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22106502/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Swarm and Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Swarm and Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{wang2025an-adaptive-weight-optim,\n  title = {An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems},\n  author = {Hao Wang and Shuwei Zhu and Wei Fang and Kalyanmoy Deb},\n  journal = {Swarm and Evolutionary Computation},\n  year = {2025},\n  doi = {10.1016/j.swevo.2025.102149},\n  url = {https://doi.org/10.1016/j.swevo.2025.102149}\n}",
      "primaryUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "venueUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
      "type": "journal",
      "paperUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "publisher_url": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "venue_url": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
      "paper_url": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102149",
      "citations": 2,
      "verification": {
        "if_value": "8.5",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q2",
        "cas_year": "2025",
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "Swarm and Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/22106502/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "Swarm and Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "Swarm and Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "Swarm and Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102149",
          "copy_text": "10.1016/j.swevo.2025.102149"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4414444197",
          "copy_text": "doi:10.1016/j.swevo.2025.102149"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1016/j.swevo.2025.102149"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102149",
      "downloadMode": "openclaw-browser",
      "archive": {
        "path": "archive/evolutionary-computation/2025/an-adaptive-weight-optimization-algorithm-based-on-decision-variable-grouping-for-large-scale-multi-objective-optimization-problems.pdf",
        "pdfState": "queued",
        "downloadMode": "openclaw-browser"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This paper matters because it revisits a core large-scale multiobjective optimization bottleneck: how to exploit variable structure instead of treating all dimensions uniformly. It is a strong signal of Deb's continued influence on scalable multiobjective algorithm design rather than only on classical EMO foundations.",
          "ja": "この論文が重要なのは、大規模多目的最適化における中核的なボトルネック、すなわち全次元を一様に扱うのではなく変数構造をどう活用するかを改めて掘り下げている点です。古典的な EMO 基盤だけでなく、スケーラブルな多目的アルゴリズム設計に対する Deb の継続的な影響を示す強いシグナルでもあります。",
          "zh": "这篇论文的重要性在于，它重新切入了大规模多目标优化中的核心瓶颈：如何利用变量结构，而不是把所有维度一视同仁地处理。这也是 Deb 仍持续影响可扩展多目标算法设计、而不只停留在经典 EMO 基础层面的一个强信号。"
        }
      },
      "classification": {
        "authors": [
          "Hao Wang",
          "Shuwei Zhu",
          "Wei Fang",
          "Kalyanmoy Deb"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization",
          "Large-scale Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "Large-scale Optimization",
          "AI",
          "Evolutionary Computation"
        ],
        "topics": [],
        "venue": {
          "name": "Swarm and Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 8.5",
          "JCR Q1",
          "CAS Q2"
        ],
        "tags": [
          "Evolutionary Computation",
          "Swarm and Evolutionary Computation",
          "Journal",
          "2025",
          "Optimization",
          "Multi-objective Optimization",
          "Large-scale Optimization",
          "AI",
          "IF 8.5",
          "JCR Q1",
          "CAS Q2"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "Swarm and Evolutionary Computation",
        "Journal",
        "2025",
        "Optimization",
        "Multi-objective Optimization",
        "Large-scale Optimization",
        "AI",
        "IF 8.5",
        "JCR Q1",
        "CAS Q2"
      ]
    },
    {
      "id": "evolutionary-computation-kalyanmoy-deb-W4414151930",
      "domainId": "evolutionary-computation",
      "title": "Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot",
      "venue": "Swarm and Evolutionary Computation",
      "year": "2025",
      "whyItMatters": {
        "en": "This paper is worth tracking because it pushes EC evaluation closer to realistic robotics use rather than staying inside purely synthetic benchmarks. It also reflects Deb's continued role in shaping how multiobjective algorithms should be assessed, not just how they are proposed.",
        "ja": "この論文が追跡に値するのは、EC の評価を純粋に人工的なベンチマークの中に留めず、より現実的なロボティクス利用へ近づけている点です。また、多目的アルゴリズムをどう提案するかだけでなく、どう評価すべきかという枠組みに対しても Deb が継続的に影響していることを示しています。",
        "zh": "这篇论文值得跟踪，因为它把 EC 的评估从纯粹的人造基准进一步推向了更真实的机器人应用场景。同时，它也体现出 Deb 仍在持续影响多目标算法“应如何评估”，而不只是“应如何提出”。"
      },
      "status": "monitor",
      "pdfState": "queued",
      "authors": [
        "Pushpendra Gupta",
        "Dilip Kumar Pratihar",
        "Kalyanmoy Deb"
      ],
      "publicationDate": "2025-09-10",
      "citationCount": 0,
      "abstract": {
        "en": "This study evaluates evolutionary multi-objective optimizers on gait-cycle optimization for a 25-DOF NAO humanoid robot using a dynamic-performance view instead of only final static scores. By tracking algorithm behavior throughout the search on a realistic robotics task, it connects EMO benchmarking with time-dependent decision quality and application-facing evaluation.",
        "ja": "本研究は、25 自由度の NAO ヒューマノイドロボットの歩行周期最適化において、最終的な静的スコアだけでなく動的性能の観点から進化的多目的最適化手法を評価します。現実的なロボティクスタスク上で探索過程全体の挙動を追うことで、EMO ベンチマークを時間依存の意思決定品質と応用志向の評価へ結び付けています。",
        "zh": "本研究在 25 自由度 NAO 人形机器人的步态周期优化任务上，从动态性能视角而不只是最终静态得分来评估进化多目标优化算法。通过跟踪算法在真实机器人任务中的整个搜索过程，它把 EMO 基准评测连接到了随时间变化的决策质量与面向应用的评估。"
      },
      "openAlexUrl": "https://openalex.org/W4414151930",
      "doi": "10.1016/j.swevo.2025.102144",
      "doiUrl": "https://doi.org/10.1016/j.swevo.2025.102144",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "url": "https://doi.org/10.1016/j.swevo.2025.102144",
      "pdfUrl": null,
      "archivePath": "archive/evolutionary-computation/2025/dynamic-performance-evaluation-of-evolutionary-multi-objective-optimization-algorithms-for-gait-cycle-optimization-of-a-25-dofs-nao-humanoid-robot.pdf",
      "topics": [],
      "citationText": "P. Gupta, D. K. Pratihar, and K. Deb, \"Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot\", Swarm and Evolutionary Computation, 2025, doi: 10.1016/j.swevo.2025.102144.",
      "metrics": {
        "impactFactor": "8.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q2",
        "casYear": "2025",
        "casTop": false,
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Swarm and Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22106502/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Swarm and Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Swarm and Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{gupta2025dynamic-performance-eval,\n  title = {Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot},\n  author = {Pushpendra Gupta and Dilip Kumar Pratihar and Kalyanmoy Deb},\n  journal = {Swarm and Evolutionary Computation},\n  year = {2025},\n  doi = {10.1016/j.swevo.2025.102144},\n  url = {https://doi.org/10.1016/j.swevo.2025.102144}\n}",
      "primaryUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "venueUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
      "type": "journal",
      "paperUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "publisher_url": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "venue_url": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
      "paper_url": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102144",
      "citations": 0,
      "verification": {
        "if_value": "8.5",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q2",
        "cas_year": "2025",
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "Swarm and Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/22106502/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "Swarm and Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "Swarm and Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "Swarm and Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102144",
          "copy_text": "10.1016/j.swevo.2025.102144"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4414151930",
          "copy_text": "doi:10.1016/j.swevo.2025.102144"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1016/j.swevo.2025.102144"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.swevo.2025.102144",
      "downloadMode": "openclaw-browser",
      "archive": {
        "path": "archive/evolutionary-computation/2025/dynamic-performance-evaluation-of-evolutionary-multi-objective-optimization-algorithms-for-gait-cycle-optimization-of-a-25-dofs-nao-humanoid-robot.pdf",
        "pdfState": "queued",
        "downloadMode": "openclaw-browser"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This paper is worth tracking because it pushes EC evaluation closer to realistic robotics use rather than staying inside purely synthetic benchmarks. It also reflects Deb's continued role in shaping how multiobjective algorithms should be assessed, not just how they are proposed.",
          "ja": "この論文が追跡に値するのは、EC の評価を純粋に人工的なベンチマークの中に留めず、より現実的なロボティクス利用へ近づけている点です。また、多目的アルゴリズムをどう提案するかだけでなく、どう評価すべきかという枠組みに対しても Deb が継続的に影響していることを示しています。",
          "zh": "这篇论文值得跟踪，因为它把 EC 的评估从纯粹的人造基准进一步推向了更真实的机器人应用场景。同时，它也体现出 Deb 仍在持续影响多目标算法“应如何评估”，而不只是“应如何提出”。"
        }
      },
      "classification": {
        "authors": [
          "Pushpendra Gupta",
          "Dilip Kumar Pratihar",
          "Kalyanmoy Deb"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization",
          "Robotics Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "Robotics Optimization",
          "AI",
          "Evolutionary Computation"
        ],
        "topics": [],
        "venue": {
          "name": "Swarm and Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 8.5",
          "JCR Q1",
          "CAS Q2"
        ],
        "tags": [
          "Evolutionary Computation",
          "Swarm and Evolutionary Computation",
          "Journal",
          "2025",
          "Optimization",
          "Multi-objective Optimization",
          "Robotics Optimization",
          "AI",
          "IF 8.5",
          "JCR Q1",
          "CAS Q2"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "Swarm and Evolutionary Computation",
        "Journal",
        "2025",
        "Optimization",
        "Multi-objective Optimization",
        "Robotics Optimization",
        "AI",
        "IF 8.5",
        "JCR Q1",
        "CAS Q2"
      ]
    },
    {
      "id": "evolutionary-computation-kalyanmoy-deb-W4414140555",
      "domainId": "evolutionary-computation",
      "title": "A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems",
      "venue": "Expert Systems with Applications",
      "year": "2025",
      "whyItMatters": {
        "en": "This is a useful signal because it extends the large-scale decomposition viewpoint from continuous optimization into difficult combinatorial packing problems. It shows Deb's line still influencing how variable grouping and problem structure are exploited in scalable evolutionary search.",
        "ja": "この論文が有用なシグナルであるのは、大規模分解の視点を連続最適化から難しい組合せ的なパッキング問題へ拡張している点です。変数グルーピングと問題構造をスケーラブルな進化探索でどう活用するかという論点に、Deb の系譜がなお影響していることを示しています。",
        "zh": "这是一条有价值的信号，因为它把大规模分解的视角从连续优化扩展到了困难的组合打包问题上。它说明 Deb 这一脉络仍在持续影响：如何在可扩展的进化搜索中利用变量分组与问题结构。"
      },
      "status": "monitor",
      "pdfState": "queued",
      "authors": [
        "Xiaotong Li",
        "Shuwei Zhu",
        "Wei Fang",
        "Kalyanmoy Deb"
      ],
      "publicationDate": "2025-09-10",
      "citationCount": 0,
      "abstract": {
        "en": "The paper tackles large-scale 0-1 knapsack problems with a cooperative co-evolutionary algorithm that uses a core-based grouping strategy to decompose variables more effectively. The method aims to preserve important interactions while reducing search complexity, illustrating how decomposition design can improve large-scale combinatorial optimization performance.",
        "ja": "本論文は、コアベースのグルーピング戦略を用いて変数をより効果的に分解する協調共進化アルゴリズムにより、大規模 0-1 ナップサック問題へ取り組みます。重要な相互作用を保ちながら探索複雑性を下げることを狙っており、分解設計が大規模組合せ最適化の性能向上にどう効くかを示しています。",
        "zh": "本文利用带有核心分组策略的协同协同进化算法来处理大规模 0-1 背包问题，以更有效地分解变量。该方法旨在在保留关键变量相互作用的同时降低搜索复杂度，展示了分解设计如何提升大规模组合优化性能。"
      },
      "openAlexUrl": "https://openalex.org/W4414140555",
      "doi": "10.1016/j.eswa.2025.129364",
      "doiUrl": "https://doi.org/10.1016/j.eswa.2025.129364",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "url": "https://doi.org/10.1016/j.eswa.2025.129364",
      "pdfUrl": null,
      "archivePath": "archive/evolutionary-computation/2025/a-cooperative-co-evolutionary-algorithm-with-core-based-grouping-strategy-for-large-scale-01-knapsack-problems.pdf",
      "topics": [],
      "citationText": "X. Li, S. Zhu, W. Fang, and K. Deb, \"A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems\", Expert Systems with Applications, 2025, doi: 10.1016/j.eswa.2025.129364.",
      "metrics": {
        "impactFactor": "7.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "Expert Systems with Applications",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/09574174/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "Expert Systems with Applications",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Expert%20Systems%20with%20Applications&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "Expert Systems with Applications",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{li2025a-cooperative-co-evoluti,\n  title = {A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems},\n  author = {Xiaotong Li and Shuwei Zhu and Wei Fang and Kalyanmoy Deb},\n  journal = {Expert Systems with Applications},\n  year = {2025},\n  doi = {10.1016/j.eswa.2025.129364},\n  url = {https://doi.org/10.1016/j.eswa.2025.129364}\n}",
      "primaryUrl": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "venueUrl": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
      "type": "journal",
      "paperUrl": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "publisher_url": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "venue_url": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
      "paper_url": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.eswa.2025.129364",
      "citations": 0,
      "verification": {
        "if_value": "7.5",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "if_public_source_url": "https://www.iikx.com/sci/technology/12439.html",
        "if_source_mode": "official_search",
        "if_search_copy_text": "Expert Systems with Applications",
        "jcr_source_url": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/09574174/",
        "jcr_source_mode": "official_search",
        "jcr_search_copy_text": "Expert Systems with Applications",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Expert%20Systems%20with%20Applications&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.iikx.com/sci/technology/12439.html",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_search",
        "cas_search_copy_text": "Expert Systems with Applications",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "Expert Systems with Applications"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.eswa.2025.129364",
          "copy_text": "10.1016/j.eswa.2025.129364"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4414140555",
          "copy_text": "doi:10.1016/j.eswa.2025.129364"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1016/j.eswa.2025.129364"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1016/j.eswa.2025.129364",
      "downloadMode": "openclaw-browser",
      "archive": {
        "path": "archive/evolutionary-computation/2025/a-cooperative-co-evolutionary-algorithm-with-core-based-grouping-strategy-for-large-scale-01-knapsack-problems.pdf",
        "pdfState": "queued",
        "downloadMode": "openclaw-browser"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This is a useful signal because it extends the large-scale decomposition viewpoint from continuous optimization into difficult combinatorial packing problems. It shows Deb's line still influencing how variable grouping and problem structure are exploited in scalable evolutionary search.",
          "ja": "この論文が有用なシグナルであるのは、大規模分解の視点を連続最適化から難しい組合せ的なパッキング問題へ拡張している点です。変数グルーピングと問題構造をスケーラブルな進化探索でどう活用するかという論点に、Deb の系譜がなお影響していることを示しています。",
          "zh": "这是一条有价值的信号，因为它把大规模分解的视角从连续优化扩展到了困难的组合打包问题上。它说明 Deb 这一脉络仍在持续影响：如何在可扩展的进化搜索中利用变量分组与问题结构。"
        }
      },
      "classification": {
        "authors": [
          "Xiaotong Li",
          "Shuwei Zhu",
          "Wei Fang",
          "Kalyanmoy Deb"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Large-scale Optimization",
          "Combinatorial Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation"
        ],
        "fields": [
          "Large-scale Optimization",
          "Combinatorial Optimization",
          "AI",
          "Evolutionary Computation"
        ],
        "topics": [],
        "venue": {
          "name": "Expert Systems with Applications",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 7.5",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "Expert Systems with Applications",
          "Journal",
          "2025",
          "Large-scale Optimization",
          "Combinatorial Optimization",
          "AI",
          "IF 7.5",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "Expert Systems with Applications",
        "Journal",
        "2025",
        "Large-scale Optimization",
        "Combinatorial Optimization",
        "AI",
        "IF 7.5",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4413243632",
      "domainId": "evolutionary-computation",
      "title": "EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning",
      "venue": "ACM Transactions on Evolutionary Learning and Optimization",
      "year": "2025",
      "whyItMatters": {
        "en": "EvoRL shows Ran Cheng's systems agenda moving into population-based reinforcement learning. It is important because it makes evolutionary reinforcement learning a practical large-scale experimentation surface rather than a small-scale methodological niche.",
        "ja": "EvoRL は、Ran Cheng のシステム指向が集団ベース強化学習へ進んでいることを示します。重要なのは、進化的強化学習を小規模な方法論的ニッチではなく、大規模実験が可能な現実的な研究面にしている点です。",
        "zh": "EvoRL 表明 Ran Cheng 的系统化议程正在推进到基于种群的强化学习。它的重要性在于，它把进化强化学习从一个小众的方法论角落，推进成了一个可进行大规模实验的现实研究面。"
      },
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "Bowen Zheng",
        "Ran Cheng",
        "Kay Chen Tan"
      ],
      "publicationDate": "2025-01-01",
      "citationCount": 1,
      "abstract": {
        "en": "Evolutionary reinforcement learning is often bottlenecked by the cost of maintaining large populations and repeated environment interaction. EvoRL addresses this by executing the full training pipeline on accelerators, including environment simulation and EC operators, so researchers can explore larger populations and broader algorithmic design choices.",
        "ja": "進化的強化学習は、大きな集団を維持するコストと繰り返しの環境相互作用によってしばしば制約されます。EvoRL は、環境シミュレーションと EC 演算子を含む学習パイプライン全体を加速器上で実行することでこの問題に対処し、研究者がより大きな集団と幅広いアルゴリズム設計を探れるようにします。",
        "zh": "进化强化学习往往受限于维持大规模种群以及反复环境交互的高昂成本。EvoRL 通过把包括环境模拟与 EC 算子在内的完整训练流水线搬到加速器上执行，以解决这一问题，从而让研究者能够探索更大的种群与更广的算法设计空间。"
      },
      "openAlexUrl": "https://openalex.org/W4413243632",
      "doi": "10.1145/3750053",
      "doiUrl": "https://doi.org/10.1145/3750053",
      "publisherUrl": "https://dl.acm.org/doi/10.1145/3750053",
      "url": "https://arxiv.org/pdf/2501.15129",
      "pdfUrl": "https://arxiv.org/pdf/2501.15129",
      "archivePath": "archive/evolutionary-computation/2025/evorl-a-gpu-accelerated-framework-for-evolutionary-reinforcement-learning.pdf",
      "topics": [
        "Evolutionary Algorithms and Applications",
        "Reinforcement Learning Systems",
        "GPU-native EC Systems"
      ],
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2501.15129",
          "url": "https://arxiv.org/abs/2501.15129",
          "pdfUrl": "https://arxiv.org/pdf/2501.15129",
          "openAlexUrl": "https://openalex.org/W4406880137"
        }
      ],
      "citationText": "B. Zheng, R. Cheng, and K. C. Tan, \"EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning\", ACM Transactions on Evolutionary Learning and Optimization, 2025, doi: 10.1145/3750053.",
      "metrics": {
        "impactFactor": "__not_listed__",
        "impactYear": "2025",
        "jcrQuartile": "__not_listed__",
        "jcrYear": "2025",
        "casQuartile": "__not_listed__",
        "casYear": "2025",
        "casTop": false,
        "venueType": "journal",
        "sourceUrl": "https://dl.acm.org/journal/telo",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "ifPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcrPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{zheng2025evorl-a-gpu-accelerated-,\n  title = {EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning},\n  author = {Bowen Zheng and Ran Cheng and Kay Chen Tan},\n  journal = {ACM Transactions on Evolutionary Learning and Optimization},\n  year = {2025},\n  doi = {10.1145/3750053},\n  url = {https://doi.org/10.1145/3750053}\n}",
      "primaryUrl": "https://dl.acm.org/doi/10.1145/3750053",
      "venueUrl": "https://dl.acm.org/journal/telo",
      "type": "journal",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3750053",
      "publisher_url": "https://dl.acm.org/doi/10.1145/3750053",
      "venue_url": "https://dl.acm.org/journal/telo",
      "paper_url": "https://dl.acm.org/doi/10.1145/3750053",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3750053",
      "citations": 1,
      "verification": {
        "if_value": "__not_listed__",
        "if_year": "2025",
        "jcr_quartile": "__not_listed__",
        "jcr_year": "2025",
        "cas_quartile": "__not_listed__",
        "cas_year": "2025",
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "if_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "if_source_mode": "official_search",
        "if_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcr_source_url": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcr_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcr_source_mode": "official_search",
        "jcr_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "cas_official_source_url": null,
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_search",
        "cas_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3750053",
          "copy_text": "10.1145/3750053"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4413243632",
          "copy_text": "doi:10.1145/3750053"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1145/3750053"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3750053",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/evorl-a-gpu-accelerated-framework-for-evolutionary-reinforcement-learning.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "EvoRL shows Ran Cheng's systems agenda moving into population-based reinforcement learning. It is important because it makes evolutionary reinforcement learning a practical large-scale experimentation surface rather than a small-scale methodological niche.",
          "ja": "EvoRL は、Ran Cheng のシステム指向が集団ベース強化学習へ進んでいることを示します。重要なのは、進化的強化学習を小規模な方法論的ニッチではなく、大規模実験が可能な現実的な研究面にしている点です。",
          "zh": "EvoRL 表明 Ran Cheng 的系统化议程正在推进到基于种群的强化学习。它的重要性在于，它把进化强化学习从一个小众的方法论角落，推进成了一个可进行大规模实验的现实研究面。"
        }
      },
      "classification": {
        "authors": [
          "Bowen Zheng",
          "Ran Cheng",
          "Kay Chen Tan"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "Reinforcement Learning",
          "HPC",
          "GPU Computing",
          "Machine Learning"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation",
          "Reinforcement Learning",
          "HPC",
          "GPU Computing",
          "Machine Learning"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "Reinforcement Learning Systems",
          "GPU-native EC Systems"
        ],
        "venue": {
          "name": "ACM Transactions on Evolutionary Learning and Optimization",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF __not_listed__"
        ],
        "tags": [
          "Evolutionary Computation",
          "ACM Transactions on Evolutionary Learning and Optimization",
          "Journal",
          "2025",
          "Optimization",
          "AI",
          "Reinforcement Learning",
          "HPC",
          "GPU Computing",
          "Machine Learning",
          "Evolutionary Algorithms and Applications",
          "Reinforcement Learning Systems",
          "GPU-native EC Systems",
          "IF __not_listed__"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "ACM Transactions on Evolutionary Learning and Optimization",
        "Journal",
        "2025",
        "Optimization",
        "AI",
        "Reinforcement Learning",
        "HPC",
        "GPU Computing",
        "Machine Learning",
        "Evolutionary Algorithms and Applications",
        "Reinforcement Learning Systems",
        "GPU-native EC Systems",
        "IF __not_listed__"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4411600078",
      "domainId": "evolutionary-computation",
      "title": "GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III",
      "venue": "2025 IEEE Congress on Evolutionary Computation (CEC)",
      "year": "2025",
      "whyItMatters": {
        "en": "This CEC paper is a useful bridge between the more mature TEVC tensorization line and the wider community-facing conference layer. It shows that the tensorized many-objective optimization agenda is already being operationalized beyond a single flagship journal paper.",
        "ja": "この CEC 論文は、より成熟した TEVC のテンソル化研究線と、より広いコミュニティ向け会議層をつなぐ有用な橋です。テンソル化された多目的最適化の構想が、単一のフラッグシップ論文を超えてすでに実装段階へ入っていることを示しています。",
        "zh": "这篇 CEC 论文是连接更成熟的 TEVC 张量化主线与更面向社区的会议层的一座有用桥梁。它表明，张量化多目标优化这一议程已经不再局限于单篇旗舰期刊论文，而是开始进入实际操作化阶段。"
      },
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "Hao Li",
        "Zhenyu Liang",
        "Ran Cheng"
      ],
      "publicationDate": "2025-06-01",
      "citationCount": 0,
      "abstract": {
        "en": "TensorNSGA-III keeps the exact selection and variation logic of NSGA-III while reformulating the algorithm into tensorized GPU-friendly operators. The result is large acceleration without giving up the core many-objective optimization behavior that practitioners expect from NSGA-III.",
        "ja": "TensorNSGA-III は、NSGA-III の選択と変異の論理をそのまま保ちながら、アルゴリズムを GPU に適したテンソル演算子へ再構成します。その結果、実務者が NSGA-III に期待する多目的最適化の中核的挙動を損なうことなく、大幅な高速化を実現します。",
        "zh": "TensorNSGA-III 在保留 NSGA-III 原有选择与变异逻辑的同时，将算法重构为适合 GPU 的张量化算子。其结果是在不牺牲实践者对 NSGA-III 所期待的核心多目标优化行为的前提下，实现了大幅加速。"
      },
      "openAlexUrl": "https://openalex.org/W4411600078",
      "doi": "10.1109/cec65147.2025.11043108",
      "doiUrl": "https://doi.org/10.1109/cec65147.2025.11043108",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11043108/",
      "url": "https://arxiv.org/pdf/2504.06067",
      "pdfUrl": "https://arxiv.org/pdf/2504.06067",
      "archivePath": "archive/evolutionary-computation/2025/gpu-accelerated-evolutionary-many-objective-optimization-using-tensorized-nsga-iii.pdf",
      "topics": [
        "Advanced Multi-Objective Optimization Algorithms",
        "Evolutionary Algorithms and Applications",
        "GPU-native EC Systems"
      ],
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2504.06067",
          "url": "https://arxiv.org/abs/2504.06067",
          "pdfUrl": "https://arxiv.org/pdf/2504.06067",
          "openAlexUrl": "https://openalex.org/W4416530385"
        }
      ],
      "citationText": "H. Li, Z. Liang, and R. Cheng, \"GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III\", 2025 IEEE Congress on Evolutionary Computation (CEC), 2025, doi: 10.1109/cec65147.2025.11043108.",
      "metrics": {
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": false,
        "venueType": "conference",
        "sourceUrl": "https://2025.ieeewcci.org/cec/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@inproceedings{li2025gpu-accelerated-evolutio,\n  title = {GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III},\n  author = {Hao Li and Zhenyu Liang and Ran Cheng},\n  booktitle = {2025 IEEE Congress on Evolutionary Computation (CEC)},\n  year = {2025},\n  doi = {10.1109/cec65147.2025.11043108},\n  url = {https://doi.org/10.1109/cec65147.2025.11043108}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/11043108/",
      "venueUrl": "https://2025.ieeewcci.org/cec/",
      "type": "conference",
      "paperUrl": "https://ieeexplore.ieee.org/document/11043108/",
      "publisher_url": "https://ieeexplore.ieee.org/document/11043108/",
      "venue_url": "https://2025.ieeewcci.org/cec/",
      "paper_url": "https://ieeexplore.ieee.org/document/11043108/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/cec65147.2025.11043108",
      "citations": 0,
      "verification": {
        "if_value": null,
        "if_year": null,
        "jcr_quartile": null,
        "jcr_year": null,
        "cas_quartile": null,
        "cas_year": null,
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": null,
        "if_public_source_url": null,
        "if_source_mode": null,
        "if_search_copy_text": "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "jcr_source_url": null,
        "jcr_public_source_url": null,
        "jcr_source_mode": null,
        "jcr_search_copy_text": "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "cas_official_source_url": null,
        "cas_official_platform_url": null,
        "cas_public_source_url": null,
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": null,
        "cas_search_copy_text": "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "2025 IEEE Congress on Evolutionary Computation (CEC)"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/cec65147.2025.11043108",
          "copy_text": "10.1109/cec65147.2025.11043108"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4411600078",
          "copy_text": "doi:10.1109/cec65147.2025.11043108"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/cec65147.2025.11043108"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/cec65147.2025.11043108",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/gpu-accelerated-evolutionary-many-objective-optimization-using-tensorized-nsga-iii.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This CEC paper is a useful bridge between the more mature TEVC tensorization line and the wider community-facing conference layer. It shows that the tensorized many-objective optimization agenda is already being operationalized beyond a single flagship journal paper.",
          "ja": "この CEC 論文は、より成熟した TEVC のテンソル化研究線と、より広いコミュニティ向け会議層をつなぐ有用な橋です。テンソル化された多目的最適化の構想が、単一のフラッグシップ論文を超えてすでに実装段階へ入っていることを示しています。",
          "zh": "这篇 CEC 论文是连接更成熟的 TEVC 张量化主线与更面向社区的会议层的一座有用桥梁。它表明，张量化多目标优化这一议程已经不再局限于单篇旗舰期刊论文，而是开始进入实际操作化阶段。"
        }
      },
      "classification": {
        "authors": [
          "Hao Li",
          "Zhenyu Liang",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Advanced Multi-Objective Optimization Algorithms",
          "Evolutionary Algorithms and Applications",
          "GPU-native EC Systems"
        ],
        "venue": {
          "name": "2025 IEEE Congress on Evolutionary Computation (CEC)",
          "type": "conference"
        },
        "venueType": "conference",
        "publicationYear": "2025",
        "qualityTags": [],
        "tags": [
          "Evolutionary Computation",
          "2025 IEEE Congress on Evolutionary Computation (CEC)",
          "Conference",
          "2025",
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "HPC",
          "GPU Computing",
          "Advanced Multi-Objective Optimization Algorithms",
          "Evolutionary Algorithms and Applications",
          "GPU-native EC Systems"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "Conference",
        "2025",
        "Optimization",
        "Multi-objective Optimization",
        "AI",
        "HPC",
        "GPU Computing",
        "Advanced Multi-Objective Optimization Algorithms",
        "Evolutionary Algorithms and Applications",
        "GPU-native EC Systems"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4409486142",
      "domainId": "evolutionary-computation",
      "title": "TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies",
      "venue": "ACM Transactions on Evolutionary Learning and Optimization",
      "year": "2025",
      "whyItMatters": {
        "en": "TensorNEAT matters because it extends the tensorization strategy beyond classic optimization into topology-evolving neuroevolution. That broadens Ran Cheng's stack from solver acceleration to reusable GPU-native evolutionary tooling across different representation types.",
        "ja": "TensorNEAT が重要なのは、テンソル化戦略を古典的最適化の外へ押し広げ、トポロジーが進化する神経進化へ適用している点です。これにより、Ran Cheng のスタックはソルバ高速化から、異なる表現型をまたぐ再利用可能な GPU ネイティブ進化ツール群へ広がります。",
        "zh": "TensorNEAT 的重要性在于，它把张量化策略从经典优化扩展到了拓扑也会演化的神经进化场景。这使 Ran Cheng 的技术栈从“求解器加速”进一步拓展到跨不同表示类型的可复用 GPU 原生进化工具。"
      },
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "Lishuang Wang",
        "Mengfei Zhao",
        "Enyu Liu",
        "Kebin Sun",
        "Ran Cheng"
      ],
      "publicationDate": "2025-01-01",
      "citationCount": 1,
      "abstract": {
        "en": "TensorNEAT reformulates NEAT's heterogeneous evolving topologies into uniformly shaped tensors so the whole population can be executed efficiently on accelerators. The result is not just a speedup but a reusable neuroevolution library that fits the broader GPU-native EC tooling agenda.",
        "ja": "TensorNEAT は、NEAT の異質な進化トポロジーを均一形状のテンソルへ再定式化することで、集団全体を加速器上で効率的に実行できるようにします。結果は単なる高速化ではなく、より広い GPU ネイティブ EC ツール群の方針に合致した再利用可能な神経進化ライブラリです。",
        "zh": "TensorNEAT 将 NEAT 中异质演化的拓扑重构为统一形状的张量，从而使整个种群能够在加速器上高效执行。其结果不只是速度提升，更是形成了一个符合更广泛 GPU 原生 EC 工具化方向的可复用神经进化库。"
      },
      "openAlexUrl": "https://openalex.org/W4409486142",
      "doi": "10.1145/3730406",
      "doiUrl": "https://doi.org/10.1145/3730406",
      "publisherUrl": "https://dl.acm.org/doi/10.1145/3730406",
      "url": "https://arxiv.org/pdf/2504.08339",
      "pdfUrl": "https://arxiv.org/pdf/2504.08339",
      "archivePath": "archive/evolutionary-computation/2025/tensorneat-a-gpu-accelerated-library-for-neuroevolution-of-augmenting-topologies.pdf",
      "topics": [
        "Evolutionary Algorithms and Applications",
        "Neuroevolution",
        "GPU-native EC Systems"
      ],
      "titleAliases": [
        "Tensorized NeuroEvolution of Augmenting Topologies for GPU Acceleration"
      ],
      "alternateVersions": [
        {
          "type": "conference",
          "venue": "GECCO",
          "doi": "10.1145/3638529.3654210",
          "url": "https://doi.org/10.1145/3638529.3654210",
          "publisherUrl": "https://doi.org/10.1145/3638529.3654210",
          "title": "Tensorized NeuroEvolution of Augmenting Topologies for GPU Acceleration"
        },
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2504.08339",
          "url": "https://arxiv.org/abs/2504.08339",
          "pdfUrl": "https://arxiv.org/pdf/2504.08339",
          "openAlexUrl": "https://openalex.org/W4414829271"
        }
      ],
      "citationText": "L. Wang, M. Zhao, E. Liu, K. Sun, and R. Cheng, \"TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies\", ACM Transactions on Evolutionary Learning and Optimization, 2025, doi: 10.1145/3730406.",
      "metrics": {
        "impactFactor": "__not_listed__",
        "impactYear": "2025",
        "jcrQuartile": "__not_listed__",
        "jcrYear": "2025",
        "casQuartile": "__not_listed__",
        "casYear": "2025",
        "casTop": false,
        "venueType": "journal",
        "sourceUrl": "https://dl.acm.org/journal/telo",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "ifPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcrPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{wang2025tensorneat-a-gpu-acceler,\n  title = {TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies},\n  author = {Lishuang Wang and Mengfei Zhao and Enyu Liu and Kebin Sun and Ran Cheng},\n  journal = {ACM Transactions on Evolutionary Learning and Optimization},\n  year = {2025},\n  doi = {10.1145/3730406},\n  url = {https://doi.org/10.1145/3730406}\n}",
      "primaryUrl": "https://dl.acm.org/doi/10.1145/3730406",
      "venueUrl": "https://dl.acm.org/journal/telo",
      "type": "journal",
      "paperUrl": "https://dl.acm.org/doi/10.1145/3730406",
      "publisher_url": "https://dl.acm.org/doi/10.1145/3730406",
      "venue_url": "https://dl.acm.org/journal/telo",
      "paper_url": "https://dl.acm.org/doi/10.1145/3730406",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3730406",
      "citations": 1,
      "verification": {
        "if_value": "__not_listed__",
        "if_year": "2025",
        "jcr_quartile": "__not_listed__",
        "jcr_year": "2025",
        "cas_quartile": "__not_listed__",
        "cas_year": "2025",
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "if_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "if_source_mode": "official_search",
        "if_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcr_source_url": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcr_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcr_source_mode": "official_search",
        "jcr_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "cas_official_source_url": null,
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_search",
        "cas_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "ACM Transactions on Evolutionary Learning and Optimization"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3730406",
          "copy_text": "10.1145/3730406"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4409486142",
          "copy_text": "doi:10.1145/3730406"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1145/3730406"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1145/3730406",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/tensorneat-a-gpu-accelerated-library-for-neuroevolution-of-augmenting-topologies.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "TensorNEAT matters because it extends the tensorization strategy beyond classic optimization into topology-evolving neuroevolution. That broadens Ran Cheng's stack from solver acceleration to reusable GPU-native evolutionary tooling across different representation types.",
          "ja": "TensorNEAT が重要なのは、テンソル化戦略を古典的最適化の外へ押し広げ、トポロジーが進化する神経進化へ適用している点です。これにより、Ran Cheng のスタックはソルバ高速化から、異なる表現型をまたぐ再利用可能な GPU ネイティブ進化ツール群へ広がります。",
          "zh": "TensorNEAT 的重要性在于，它把张量化策略从经典优化扩展到了拓扑也会演化的神经进化场景。这使 Ran Cheng 的技术栈从“求解器加速”进一步拓展到跨不同表示类型的可复用 GPU 原生进化工具。"
        }
      },
      "classification": {
        "authors": [
          "Lishuang Wang",
          "Mengfei Zhao",
          "Enyu Liu",
          "Kebin Sun",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "Neuroevolution",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation",
          "Neuroevolution",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "Neuroevolution",
          "GPU-native EC Systems"
        ],
        "venue": {
          "name": "ACM Transactions on Evolutionary Learning and Optimization",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF __not_listed__"
        ],
        "tags": [
          "Evolutionary Computation",
          "ACM Transactions on Evolutionary Learning and Optimization",
          "Journal",
          "2025",
          "Optimization",
          "AI",
          "Neuroevolution",
          "HPC",
          "GPU Computing",
          "Evolutionary Algorithms and Applications",
          "GPU-native EC Systems",
          "IF __not_listed__"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "ACM Transactions on Evolutionary Learning and Optimization",
        "Journal",
        "2025",
        "Optimization",
        "AI",
        "Neuroevolution",
        "HPC",
        "GPU Computing",
        "Evolutionary Algorithms and Applications",
        "GPU-native EC Systems",
        "IF __not_listed__"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W7128493809",
      "domainId": "evolutionary-computation",
      "title": "Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2026",
      "status": "must-read",
      "pdfState": "ready",
      "authors": [
        "Zhihong Wu",
        "Lishuang Wang",
        "Kebin Sun",
        "Zhuozhao Li",
        "Ran Cheng"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications",
        "Genetic Programming",
        "GPU-native EC Systems"
      ],
      "whyItMatters": {
        "en": "This paper extends Ran Cheng's acceleration line from evolutionary optimization into tree-based genetic programming. It matters because it shows the same systems agenda scaling to structurally irregular representations, not only vectorized continuous populations.",
        "ja": "この論文は、Ran Cheng の加速研究線を進化最適化から木構造ベースの遺伝的プログラミングへ拡張しています。重要なのは、同じシステム指向が、ベクトル化された連続集団だけでなく、構造的に不規則な表現にも拡張できることを示している点です。",
        "zh": "这篇论文把 Ran Cheng 的加速主线从进化优化扩展到了树结构遗传程序。它之所以重要，是因为它表明同一套系统化议程能够扩展到结构不规则的表示，而不只是向量化的连续种群。"
      },
      "publicationDate": "2026-01-01",
      "citationCount": 0,
      "doi": "10.1109/tevc.2026.3663396",
      "doiUrl": "https://doi.org/10.1109/tevc.2026.3663396",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11390710/",
      "url": "https://arxiv.org/pdf/2501.17168",
      "pdfUrl": "https://arxiv.org/pdf/2501.17168",
      "openAlexUrl": "https://openalex.org/W7128493809",
      "titleAliases": [
        "EvoGP: A GPU-accelerated Framework for Tree-based Genetic Programming"
      ],
      "abstract": {
        "en": "Tree-based Genetic Programming faces a GPU systems bottleneck because individual programs are structurally heterogeneous and difficult to batch efficiently. EvoGP addresses that bottleneck with tensorized tree representations, adaptive multi-level parallelism, and custom CUDA integration inside Python-facing runtimes.",
        "ja": "木構造ベースの遺伝的プログラミングは、個々のプログラムの構造が不均一で効率的なバッチ化が難しいため、GPU システム上のボトルネックに直面します。EvoGP は、テンソル化された木表現、適応的な多段並列性、そして Python ランタイムに統合された独自 CUDA 実装によってこの問題に対処します。",
        "zh": "树结构遗传程序由于个体程序在结构上高度异质，难以高效批处理，因此面临 GPU 系统层面的瓶颈。EvoGP 通过张量化树表示、自适应多层并行以及嵌入 Python 运行时的定制 CUDA 集成来解决这一问题。"
      },
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2501.17168",
          "url": "https://arxiv.org/abs/2501.17168",
          "pdfUrl": "https://arxiv.org/pdf/2501.17168",
          "openAlexUrl": "https://openalex.org/W4407004697"
        }
      ],
      "archivePath": "archive/evolutionary-computation/2026/enabling-population-level-parallelism-in-tree-based-genetic-programming-for-gpu-acceleration.pdf",
      "citationText": "Z. Wu, L. Wang, K. Sun, Z. Li, and R. Cheng, \"Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration\", IEEE Transactions on Evolutionary Computation, 2026, doi: 10.1109/tevc.2026.3663396.",
      "metrics": {
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{wu2026enabling-population-leve,\n  title = {Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration},\n  author = {Zhihong Wu and Lishuang Wang and Kebin Sun and Zhuozhao Li and Ran Cheng},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2026},\n  doi = {10.1109/tevc.2026.3663396},\n  url = {https://doi.org/10.1109/tevc.2026.3663396}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/11390710/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/11390710/",
      "publisher_url": "https://ieeexplore.ieee.org/document/11390710/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/11390710/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3663396",
      "citations": 0,
      "verification": {
        "if_value": "12.0",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3663396",
          "copy_text": "10.1109/tevc.2026.3663396"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W7128493809",
          "copy_text": "doi:10.1109/tevc.2026.3663396"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2026.3663396"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2026.3663396",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2026/enabling-population-level-parallelism-in-tree-based-genetic-programming-for-gpu-acceleration.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "must-read",
        "summaryNote": {
          "en": "This paper extends Ran Cheng's acceleration line from evolutionary optimization into tree-based genetic programming. It matters because it shows the same systems agenda scaling to structurally irregular representations, not only vectorized continuous populations.",
          "ja": "この論文は、Ran Cheng の加速研究線を進化最適化から木構造ベースの遺伝的プログラミングへ拡張しています。重要なのは、同じシステム指向が、ベクトル化された連続集団だけでなく、構造的に不規則な表現にも拡張できることを示している点です。",
          "zh": "这篇论文把 Ran Cheng 的加速主线从进化优化扩展到了树结构遗传程序。它之所以重要，是因为它表明同一套系统化议程能够扩展到结构不规则的表示，而不只是向量化的连续种群。"
        }
      },
      "classification": {
        "authors": [
          "Zhihong Wu",
          "Lishuang Wang",
          "Kebin Sun",
          "Zhuozhao Li",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "Genetic Programming",
          "GPU-native EC Systems"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2026",
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2026",
          "Optimization",
          "AI",
          "HPC",
          "GPU Computing",
          "Evolutionary Algorithms and Applications",
          "Genetic Programming",
          "GPU-native EC Systems",
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2026",
        "Optimization",
        "AI",
        "HPC",
        "GPU Computing",
        "Evolutionary Algorithms and Applications",
        "Genetic Programming",
        "GPU-native EC Systems",
        "IF 12.0",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4408935111",
      "domainId": "evolutionary-computation",
      "title": "Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2025",
      "status": "must-read",
      "pdfState": "ready",
      "authors": [
        "Zhenyu Liang",
        "Hao Li",
        "N. YU",
        "Kebin Sun",
        "Ran Cheng"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications",
        "Advanced Multi-Objective Optimization Algorithms"
      ],
      "whyItMatters": {
        "en": "This paper is one of the cleanest bridges between classic EMO algorithm design and modern GPU systems thinking. Instead of proposing only another EMO variant, it asks how the algorithmic structure itself should be tensorized so that many-objective optimization can fully exploit accelerator hardware.",
        "ja": "この論文は、古典的な EMO アルゴリズム設計と現代的な GPU システム思考を最も明快につなぐ橋の一つです。単に新しい EMO 変種を提案するのではなく、多目的最適化が加速器ハードウェアを十分に活かすために、アルゴリズム構造そのものをどうテンソル化すべきかを問います。",
        "zh": "这篇论文是连接经典 EMO 算法设计与现代 GPU 系统思维的最清晰桥梁之一。它并不只是再提出一个 EMO 变体，而是追问：为了让多目标优化真正吃满加速器硬件，算法结构本身应当如何张量化。"
      },
      "publicationDate": "2025-03-28",
      "citationCount": 2,
      "doi": "10.1109/tevc.2025.3555605",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3555605",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10944658/",
      "url": "https://arxiv.org/pdf/2503.20286",
      "pdfUrl": "https://arxiv.org/pdf/2503.20286",
      "openAlexUrl": "https://openalex.org/W4408935111",
      "yearSources": {
        "homepage": "2025",
        "dblpIssueYear": "2026",
        "crossrefPrint": "2026-02",
        "policy": "Use the official homepage's online-first chronology in the researcher dossier while preserving issue-year metadata for auditability."
      },
      "abstract": {
        "en": "The paper argues that evolutionary multiobjective optimization has hit a systems bottleneck: sophisticated EMO methods exist, but their data structures and operators still fail to map cleanly onto GPUs. It proposes tensorization as the key abstraction for restructuring EMO workflows so that advanced many-objective optimization can scale with modern accelerator hardware.",
        "ja": "本論文は、進化的多目的最適化がシステム上のボトルネックに突き当たっていると論じます。高度な EMO 手法は存在していても、そのデータ構造と演算子は依然として GPU にきれいに対応していません。そこで、先進的な多目的最適化を現代の加速器ハードウェア上でスケールさせるために、EMO ワークフローを再構成する鍵となる抽象としてテンソル化を提案します。",
        "zh": "本文认为，进化多目标优化已经遇到了系统层面的瓶颈：虽然复杂的 EMO 方法已经很多，但它们的数据结构与操作算子仍然无法自然映射到 GPU 上。为此，论文提出把“张量化”作为重构 EMO 工作流的关键抽象，以便让先进的多目标优化在现代加速器硬件上实现可扩展。"
      },
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2503.20286",
          "url": "https://arxiv.org/abs/2503.20286",
          "pdfUrl": "https://arxiv.org/pdf/2503.20286",
          "openAlexUrl": "https://openalex.org/W4408935111"
        }
      ],
      "archivePath": "archive/evolutionary-computation/2025/bridging-evolutionary-multiobjective-optimization-and-gpu-acceleration-via-tensorization.pdf",
      "citationText": "Z. Liang, H. Li, N. YU, K. Sun, and R. Cheng, \"Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization\", IEEE Transactions on Evolutionary Computation, 2025, doi: 10.1109/tevc.2025.3555605.",
      "metrics": {
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{liang2025bridging-evolutionary-mu,\n  title = {Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization},\n  author = {Zhenyu Liang and Hao Li and N. YU and Kebin Sun and Ran Cheng},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2025},\n  doi = {10.1109/tevc.2025.3555605},\n  url = {https://doi.org/10.1109/tevc.2025.3555605}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/10944658/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/10944658/",
      "publisher_url": "https://ieeexplore.ieee.org/document/10944658/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/10944658/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3555605",
      "citations": 2,
      "verification": {
        "if_value": "12.0",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3555605",
          "copy_text": "10.1109/tevc.2025.3555605"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4408935111",
          "copy_text": "doi:10.1109/tevc.2025.3555605"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2025.3555605"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3555605",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/bridging-evolutionary-multiobjective-optimization-and-gpu-acceleration-via-tensorization.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "must-read",
        "summaryNote": {
          "en": "This paper is one of the cleanest bridges between classic EMO algorithm design and modern GPU systems thinking. Instead of proposing only another EMO variant, it asks how the algorithmic structure itself should be tensorized so that many-objective optimization can fully exploit accelerator hardware.",
          "ja": "この論文は、古典的な EMO アルゴリズム設計と現代的な GPU システム思考を最も明快につなぐ橋の一つです。単に新しい EMO 変種を提案するのではなく、多目的最適化が加速器ハードウェアを十分に活かすために、アルゴリズム構造そのものをどうテンソル化すべきかを問います。",
          "zh": "这篇论文是连接经典 EMO 算法设计与现代 GPU 系统思维的最清晰桥梁之一。它并不只是再提出一个 EMO 变体，而是追问：为了让多目标优化真正吃满加速器硬件，算法结构本身应当如何张量化。"
        }
      },
      "classification": {
        "authors": [
          "Zhenyu Liang",
          "Hao Li",
          "N. YU",
          "Kebin Sun",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "Advanced Multi-Objective Optimization Algorithms"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2025",
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "HPC",
          "GPU Computing",
          "Evolutionary Algorithms and Applications",
          "Advanced Multi-Objective Optimization Algorithms",
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2025",
        "Optimization",
        "Multi-objective Optimization",
        "AI",
        "HPC",
        "GPU Computing",
        "Evolutionary Algorithms and Applications",
        "Advanced Multi-Objective Optimization Algorithms",
        "IF 12.0",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4407451023",
      "domainId": "evolutionary-computation",
      "title": "MetaDE: Evolving Differential Evolution by Differential Evolution",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2025",
      "status": "must-read",
      "pdfState": "ready",
      "authors": [
        "Minyang Chen",
        "C. Feng",
        "Ran Cheng"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications"
      ],
      "whyItMatters": {
        "en": "MetaDE is strategically important because it turns a long-standing practical headache in differential evolution, namely brittle hyperparameter and strategy selection, into an evolutionary problem itself. That makes it a strong example of Ran Cheng's broader move toward self-configuring evolutionary systems.",
        "ja": "MetaDE が戦略的に重要なのは、差分進化における長年の実務的な悩み、すなわち脆弱なハイパーパラメータと戦略選択を、それ自体を進化の対象へと変えている点です。これは、Ran Cheng のより大きな流れが自己構成型の進化システムへ向かっていることを示す好例です。",
        "zh": "MetaDE 的战略意义在于，它把差分进化中长期存在的实践痛点，也就是脆弱的超参数与策略选择问题，本身转化成了一个进化问题。这是 Ran Cheng 更广泛地转向“自配置进化系统”的一个很强例证。"
      },
      "publicationDate": "2025-02-13",
      "citationCount": 9,
      "doi": "10.1109/tevc.2025.3541587",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3541587",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10884874/",
      "url": "https://arxiv.org/pdf/2502.10470",
      "pdfUrl": "https://arxiv.org/pdf/2502.10470",
      "openAlexUrl": "https://openalex.org/W4407451023",
      "yearSources": {
        "homepage": "2025",
        "dblpIssueYear": "2026",
        "crossrefPrint": "2026-02",
        "policy": "Use the official homepage's online-first chronology in the researcher dossier while preserving issue-year metadata for auditability."
      },
      "abstract": {
        "en": "MetaDE treats the internal hyperparameter dilemma of differential evolution as an optimization target in its own right. Instead of relying on manual tuning or lightweight adaptive heuristics, it evolves DE's own configuration choices, pushing toward a more autonomous and self-improving optimization stack.",
        "ja": "MetaDE は、差分進化の内部にあるハイパーパラメータ問題そのものを最適化対象として扱います。手動チューニングや軽量な適応ヒューリスティクスに頼るのではなく、DE 自身の設定選択を進化させることで、より自律的で自己改善的な最適化スタックへ進もうとします。",
        "zh": "MetaDE 把差分进化内部的超参数困境本身视为一个优化目标。它不再依赖人工调参或轻量级自适应启发式，而是让 DE 自己的配置选择通过进化产生，从而推动优化栈走向更自主、可自我改进的形态。"
      },
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2502.10470",
          "url": "https://arxiv.org/abs/2502.10470",
          "pdfUrl": "https://arxiv.org/pdf/2502.10470",
          "openAlexUrl": "https://openalex.org/W4407451023"
        }
      ],
      "archivePath": "archive/evolutionary-computation/2025/metade-evolving-differential-evolution-by-differential-evolution.pdf",
      "citationText": "M. Chen, C. Feng, and R. Cheng, \"MetaDE: Evolving Differential Evolution by Differential Evolution\", IEEE Transactions on Evolutionary Computation, 2025, doi: 10.1109/tevc.2025.3541587.",
      "metrics": {
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{chen2025metade-evolving-differen,\n  title = {MetaDE: Evolving Differential Evolution by Differential Evolution},\n  author = {Minyang Chen and C. Feng and Ran Cheng},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2025},\n  doi = {10.1109/tevc.2025.3541587},\n  url = {https://doi.org/10.1109/tevc.2025.3541587}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/10884874/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/10884874/",
      "publisher_url": "https://ieeexplore.ieee.org/document/10884874/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/10884874/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3541587",
      "citations": 9,
      "verification": {
        "if_value": "12.0",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3541587",
          "copy_text": "10.1109/tevc.2025.3541587"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4407451023",
          "copy_text": "doi:10.1109/tevc.2025.3541587"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2025.3541587"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3541587",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/metade-evolving-differential-evolution-by-differential-evolution.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "must-read",
        "summaryNote": {
          "en": "MetaDE is strategically important because it turns a long-standing practical headache in differential evolution, namely brittle hyperparameter and strategy selection, into an evolutionary problem itself. That makes it a strong example of Ran Cheng's broader move toward self-configuring evolutionary systems.",
          "ja": "MetaDE が戦略的に重要なのは、差分進化における長年の実務的な悩み、すなわち脆弱なハイパーパラメータと戦略選択を、それ自体を進化の対象へと変えている点です。これは、Ran Cheng のより大きな流れが自己構成型の進化システムへ向かっていることを示す好例です。",
          "zh": "MetaDE 的战略意义在于，它把差分进化中长期存在的实践痛点，也就是脆弱的超参数与策略选择问题，本身转化成了一个进化问题。这是 Ran Cheng 更广泛地转向“自配置进化系统”的一个很强例证。"
        }
      },
      "classification": {
        "authors": [
          "Minyang Chen",
          "C. Feng",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2025",
          "Optimization",
          "AI",
          "Evolutionary Algorithms and Applications",
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2025",
        "Optimization",
        "AI",
        "Evolutionary Algorithms and Applications",
        "IF 12.0",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4414459062",
      "domainId": "evolutionary-computation",
      "title": "Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2025",
      "status": "monitor",
      "pdfState": "queued",
      "authors": [
        "Haoyu Zhang",
        "Zhihao Yu",
        "Yaochu Jin",
        "Xiufeng Liu",
        "Weiguo Sheng",
        "Ruyu Liu",
        "Xiumei Li",
        "Qiqi Liu",
        "Ran Cheng"
      ],
      "topics": [
        "Industrial Vision Systems and Defect Detection",
        "Optical measurement and interference techniques",
        "Advanced Measurement and Metrology Techniques"
      ],
      "whyItMatters": {
        "en": "This paper is less central to the GPU-native EC infrastructure thread, but it still matters because it shows the same evolutionary search mindset being pushed into a high-cost vision design problem. It is a good boundary marker for how far Ran Cheng's evolutionary systems line can transfer into application-heavy model design tasks.",
        "ja": "この論文は GPU ネイティブ EC 基盤線の中核からはやや外れますが、それでも重要なのは、同じ進化探索の発想が高コストな視覚モデル設計問題へ押し広げられている点です。Ran Cheng の進化システム研究線が、どこまで応用負荷の高いモデル設計タスクへ移植できるかを測る良い境界指標でもあります。",
        "zh": "这篇论文虽然不是 GPU 原生 EC 基础设施主线的最核心部分，但仍然重要，因为它展示了同样的进化搜索思路正在被推进到高成本的视觉设计问题中。它也是一个很好的边界标记，用来判断 Ran Cheng 的进化系统主线可以在多大程度上迁移到应用负担更重的模型设计任务。"
      },
      "publicationDate": "2025-01-01",
      "citationCount": 0,
      "doi": "10.1109/tevc.2025.3614261",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3614261",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11178251/",
      "url": "https://doi.org/10.1109/tevc.2025.3614261",
      "openAlexUrl": "https://openalex.org/W4414459062",
      "abstract": {
        "en": "The paper introduces an evolutionary NAS framework for monocular depth estimation that avoids costly per-candidate pretraining through hierarchical parameter mapping. In the context of Ran Cheng's recent work, it shows evolutionary search being applied to efficiency-critical architecture design rather than only classic black-box optimization.",
        "ja": "本論文は、単眼深度推定のための進化的 NAS 枠組みを提案し、階層的パラメータマッピングによって候補ごとの高価な事前学習を回避します。Ran Cheng の最近の研究文脈では、進化探索が古典的なブラックボックス最適化だけでなく、効率が重要なアーキテクチャ設計へも適用されていることを示しています。",
        "zh": "本文提出了一个面向单目深度估计的进化 NAS 框架，通过层次化参数映射避免了每个候选都进行高成本预训练。在 Ran Cheng 近期工作的语境下，它表明进化搜索正在被应用到效率敏感的架构设计问题中，而不只是传统的黑箱优化。"
      },
      "archivePath": "archive/evolutionary-computation/2025/efficient-evolutionary-neural-architecture-search-with-hierarchical-parameter-mapping-for-monocular-depth-estimation.pdf",
      "citationText": "H. Zhang, Z. Yu, Y. Jin, et al., \"Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation\", IEEE Transactions on Evolutionary Computation, 2025, doi: 10.1109/tevc.2025.3614261.",
      "metrics": {
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{zhang2025efficient-evolutionary-n,\n  title = {Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation},\n  author = {Haoyu Zhang and Zhihao Yu and Yaochu Jin and Xiufeng Liu and Weiguo Sheng and Ruyu Liu and Xiumei Li and Qiqi Liu and Ran Cheng},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2025},\n  doi = {10.1109/tevc.2025.3614261},\n  url = {https://doi.org/10.1109/tevc.2025.3614261}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/11178251/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/11178251/",
      "publisher_url": "https://ieeexplore.ieee.org/document/11178251/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/11178251/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3614261",
      "citations": 0,
      "verification": {
        "if_value": "12.0",
        "if_year": "2025",
        "jcr_quartile": "Q1",
        "jcr_year": "2025",
        "cas_quartile": "Q1",
        "cas_year": "2025",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3614261",
          "copy_text": "10.1109/tevc.2025.3614261"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4414459062",
          "copy_text": "doi:10.1109/tevc.2025.3614261"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2025.3614261"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2025.3614261",
      "downloadMode": "openclaw-browser",
      "archive": {
        "path": "archive/evolutionary-computation/2025/efficient-evolutionary-neural-architecture-search-with-hierarchical-parameter-mapping-for-monocular-depth-estimation.pdf",
        "pdfState": "queued",
        "downloadMode": "openclaw-browser"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This paper is less central to the GPU-native EC infrastructure thread, but it still matters because it shows the same evolutionary search mindset being pushed into a high-cost vision design problem. It is a good boundary marker for how far Ran Cheng's evolutionary systems line can transfer into application-heavy model design tasks.",
          "ja": "この論文は GPU ネイティブ EC 基盤線の中核からはやや外れますが、それでも重要なのは、同じ進化探索の発想が高コストな視覚モデル設計問題へ押し広げられている点です。Ran Cheng の進化システム研究線が、どこまで応用負荷の高いモデル設計タスクへ移植できるかを測る良い境界指標でもあります。",
          "zh": "这篇论文虽然不是 GPU 原生 EC 基础设施主线的最核心部分，但仍然重要，因为它展示了同样的进化搜索思路正在被推进到高成本的视觉设计问题中。它也是一个很好的边界标记，用来判断 Ran Cheng 的进化系统主线可以在多大程度上迁移到应用负担更重的模型设计任务。"
        }
      },
      "classification": {
        "authors": [
          "Haoyu Zhang",
          "Zhihao Yu",
          "Yaochu Jin",
          "Xiufeng Liu",
          "Weiguo Sheng",
          "Ruyu Liu",
          "Xiumei Li",
          "Qiqi Liu",
          "Ran Cheng"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "Machine Learning"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation",
          "Machine Learning"
        ],
        "topics": [
          "Industrial Vision Systems and Defect Detection",
          "Optical measurement and interference techniques",
          "Advanced Measurement and Metrology Techniques"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2025",
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2025",
          "Optimization",
          "AI",
          "Machine Learning",
          "Industrial Vision Systems and Defect Detection",
          "Optical measurement and interference techniques",
          "Advanced Measurement and Metrology Techniques",
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2025",
        "Optimization",
        "AI",
        "Machine Learning",
        "Industrial Vision Systems and Defect Detection",
        "Optical measurement and interference techniques",
        "Advanced Measurement and Metrology Techniques",
        "IF 12.0",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-W4394805110",
      "domainId": "evolutionary-computation",
      "title": "EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation",
      "venue": "IEEE Transactions on Evolutionary Computation",
      "year": "2024",
      "status": "must-read",
      "pdfState": "queued",
      "authors": [
        "Beichen Huang",
        "Ran Cheng",
        "Zhuozhao Li",
        "Yaochu Jin",
        "Kay Chen Tan"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications",
        "Metaheuristic Optimization Algorithms Research",
        "Advanced Multi-Objective Optimization Algorithms"
      ],
      "whyItMatters": {
        "en": "EvoX is the infrastructure anchor for this whole dossier. It frames scalable evolutionary computation as a systems problem, not just an algorithm benchmark problem, and gives the rest of the 2025 to 2026 TEVC line a concrete software and execution foundation.",
        "ja": "EvoX はこのドシエ全体のインフラ上の錨です。スケーラブルな進化計算を単なるアルゴリズムベンチマーク問題ではなく、システム問題として捉え直し、2025-2026 年の TEVC 系列全体に具体的なソフトウェア基盤と実行基盤を与えています。",
        "zh": "EvoX 是整个 dossier 的基础设施锚点。它把可扩展进化计算重新表述为一个系统问题，而不只是算法基准问题，并为 2025-2026 年后续 TEVC 主线提供了具体的软件与执行基础。"
      },
      "publicationDate": "2024-04-15",
      "citationCount": 26,
      "doi": "10.1109/tevc.2024.3388550",
      "doiUrl": "https://doi.org/10.1109/tevc.2024.3388550",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10499977/",
      "url": "https://arxiv.org/pdf/2301.12457",
      "pdfUrl": "https://arxiv.org/pdf/2301.12457",
      "openAlexUrl": "https://openalex.org/W4394805110",
      "abstract": {
        "en": "EvoX presents a distributed GPU-accelerated framework designed to make evolutionary computation viable for data-intensive and large-scale settings. Its importance is not only the raw speedup but the attempt to provide a durable, reusable architecture for modern EC workloads.",
        "ja": "EvoX は、データ集約的で大規模な設定でも進化計算を実用化できるように設計された、分散 GPU 加速フレームワークを提示します。その重要性は生の高速化だけでなく、現代の EC ワークロードに対して持続的かつ再利用可能なアーキテクチャを与えようとしている点にあります。",
        "zh": "EvoX 提出了一套分布式 GPU 加速框架，目标是在数据密集和大规模场景下让进化计算真正可用。它的重要性不只在于原始速度提升，更在于试图为现代 EC 工作负载提供一种持久、可复用的架构。"
      },
      "alternateVersions": [
        {
          "type": "preprint",
          "venue": "ArXiv.org",
          "doi": "10.48550/arxiv.2301.12457",
          "url": "https://arxiv.org/abs/2301.12457",
          "pdfUrl": "https://arxiv.org/pdf/2301.12457",
          "openAlexUrl": "https://openalex.org/W4318751952"
        }
      ],
      "archivePath": "archive/evolutionary-computation/2024/evox-a-distributed-gpu-accelerated-framework-for-scalable-evolutionary-computation.pdf",
      "citationText": "B. Huang, R. Cheng, Z. Li, Y. Jin, and K. C. Tan, \"EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation\", IEEE Transactions on Evolutionary Computation, 2024, doi: 10.1109/tevc.2024.3388550.",
      "metrics": {
        "impactFactor": "11.7",
        "impactYear": "2024",
        "jcrQuartile": "Q1",
        "jcrYear": "2024",
        "casQuartile": "Q1",
        "casYear": "2024",
        "casTop": true,
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2024",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{huang2024evox-a-distributed-gpu-a,\n  title = {EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation},\n  author = {Beichen Huang and Ran Cheng and Zhuozhao Li and Yaochu Jin and Kay Chen Tan},\n  journal = {IEEE Transactions on Evolutionary Computation},\n  year = {2024},\n  doi = {10.1109/tevc.2024.3388550},\n  url = {https://doi.org/10.1109/tevc.2024.3388550}\n}",
      "primaryUrl": "https://ieeexplore.ieee.org/document/10499977/",
      "venueUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "type": "journal",
      "paperUrl": "https://ieeexplore.ieee.org/document/10499977/",
      "publisher_url": "https://ieeexplore.ieee.org/document/10499977/",
      "venue_url": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "paper_url": "https://ieeexplore.ieee.org/document/10499977/",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2024.3388550",
      "citations": 26,
      "verification": {
        "if_value": "11.7",
        "if_year": "2024",
        "jcr_quartile": "Q1",
        "jcr_year": "2024",
        "cas_quartile": "Q1",
        "cas_year": "2024",
        "cas_top": true,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "if_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "if_source_mode": "official_profile_fallback",
        "if_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "jcr_source_url": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcr_public_source_url": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcr_source_mode": "official_profile_fallback",
        "jcr_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "cas_official_source_url": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2024",
        "cas_official_platform_url": "https://www.fenqubiao.com/",
        "cas_public_source_url": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": "official_archive",
        "cas_search_copy_text": "IEEE Transactions on Evolutionary Computation",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "IEEE Transactions on Evolutionary Computation"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2024.3388550",
          "copy_text": "10.1109/tevc.2024.3388550"
        },
        "openalex": {
          "mode": "direct",
          "url": "https://openalex.org/W4394805110",
          "copy_text": "doi:10.1109/tevc.2024.3388550"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.1109/tevc.2024.3388550"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.1109/tevc.2024.3388550",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2024/evox-a-distributed-gpu-accelerated-framework-for-scalable-evolutionary-computation.pdf",
        "pdfState": "queued",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "must-read",
        "summaryNote": {
          "en": "EvoX is the infrastructure anchor for this whole dossier. It frames scalable evolutionary computation as a systems problem, not just an algorithm benchmark problem, and gives the rest of the 2025 to 2026 TEVC line a concrete software and execution foundation.",
          "ja": "EvoX はこのドシエ全体のインフラ上の錨です。スケーラブルな進化計算を単なるアルゴリズムベンチマーク問題ではなく、システム問題として捉え直し、2025-2026 年の TEVC 系列全体に具体的なソフトウェア基盤と実行基盤を与えています。",
          "zh": "EvoX 是整个 dossier 的基础设施锚点。它把可扩展进化计算重新表述为一个系统问题，而不只是算法基准问题，并为 2025-2026 年后续 TEVC 主线提供了具体的软件与执行基础。"
        }
      },
      "classification": {
        "authors": [
          "Beichen Huang",
          "Ran Cheng",
          "Zhuozhao Li",
          "Yaochu Jin",
          "Kay Chen Tan"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization",
          "Multi-objective Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "Metaheuristic Optimization Algorithms Research",
          "Advanced Multi-Objective Optimization Algorithms"
        ],
        "venue": {
          "name": "IEEE Transactions on Evolutionary Computation",
          "type": "journal"
        },
        "venueType": "journal",
        "publicationYear": "2024",
        "qualityTags": [
          "IF 11.7",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ],
        "tags": [
          "Evolutionary Computation",
          "IEEE Transactions on Evolutionary Computation",
          "Journal",
          "2024",
          "Optimization",
          "Multi-objective Optimization",
          "AI",
          "HPC",
          "GPU Computing",
          "Evolutionary Algorithms and Applications",
          "Metaheuristic Optimization Algorithms Research",
          "Advanced Multi-Objective Optimization Algorithms",
          "IF 11.7",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "IEEE Transactions on Evolutionary Computation",
        "Journal",
        "2024",
        "Optimization",
        "Multi-objective Optimization",
        "AI",
        "HPC",
        "GPU Computing",
        "Evolutionary Algorithms and Applications",
        "Metaheuristic Optimization Algorithms Research",
        "Advanced Multi-Objective Optimization Algorithms",
        "IF 11.7",
        "JCR Q1",
        "CAS Q1",
        "CAS Top"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-arxiv-2601-18446",
      "domainId": "evolutionary-computation",
      "title": "Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?",
      "venue": "ArXiv.org",
      "year": "2026",
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "Xinmeng Yu",
        "Tao Jiang",
        "Ran Cheng",
        "Yaochu Jin",
        "Kay Chen Tan"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications",
        "GPU-native EC Systems",
        "Evaluation Methodology"
      ],
      "whyItMatters": {
        "en": "This preprint is strategically useful because it shifts the conversation from raw accelerator speedups to when GPU parallelism actually changes EA behavior, evaluation methodology, and algorithm design. That makes it a strong forward signal for how the group's systems agenda may mature next.",
        "ja": "このプレプリントが戦略的に有用なのは、議論を単なる加速器速度向上から、GPU 並列性がいつ EA の挙動、評価方法、アルゴリズム設計そのものを変えるのかへ移している点です。これは、このグループのシステム議題が次にどう成熟するかを示す強い先行シグナルです。",
        "zh": "这篇预印本在战略上很有价值，因为它把讨论从“加速器到底快了多少”转向了“GPU 并行性究竟在何时改变 EA 的行为、评测方法与算法设计本身”。这使它成为该团队系统化议程下一步可能如何成熟的一个强前向信号。"
      },
      "publicationDate": "2026-01-26",
      "citationCount": 0,
      "doi": "10.48550/arxiv.2601.18446",
      "doiUrl": "https://doi.org/10.48550/arxiv.2601.18446",
      "publisherUrl": "https://arxiv.org/abs/2601.18446",
      "url": "https://arxiv.org/abs/2601.18446",
      "pdfUrl": "https://arxiv.org/pdf/2601.18446",
      "abstract": {
        "en": "The paper studies how GPU parallelism changes the behavior of evolutionary algorithms beyond simple acceleration metrics. Across 16 representative EAs and 30 benchmark problems, it shows that fixed-time evaluation reveals algorithmic dynamics and scaling regimes that are hard to observe under CPU-constrained or fixed-function-evaluation settings.",
        "ja": "本論文は、単純な高速化指標を超えて、GPU 並列性が進化アルゴリズムの挙動をどう変えるかを調べています。16 種の代表的 EA と 30 のベンチマーク問題を通じて、固定時間評価が、CPU 制約下や関数評価回数固定の設定では見えにくいアルゴリズム動態とスケーリング相を明らかにすることを示します。",
        "zh": "本文研究的不是 GPU 并行性带来多少速度提升，而是它如何改变进化算法的行为本身。通过 16 类代表性 EA 与 30 个基准问题，论文表明固定时间评测能够揭示那些在 CPU 受限或固定函数评估次数设置下难以观察到的算法动力学与缩放规律。"
      },
      "sourceLineage": {
        "homepage": "Not listed on the selected-publications page as of 2026-04-08.",
        "dblp": "https://dblp.org/pid/18/4198-4.xml",
        "arxiv": "https://arxiv.org/abs/2601.18446"
      },
      "archivePath": "archive/evolutionary-computation/2026/scaling-behaviors-of-evolutionary-algorithms-on-gpus-when-does-parallelism-pay-off.pdf",
      "citationText": "X. Yu, T. Jiang, R. Cheng, Y. Jin, and K. C. Tan, \"Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?\", ArXiv.org, 2026, doi: 10.48550/arxiv.2601.18446.",
      "metrics": {
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": false,
        "venueType": "unknown",
        "sourceUrl": null,
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{yu2026scaling-behaviors-of-evo,\n  title = {Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?},\n  author = {Xinmeng Yu and Tao Jiang and Ran Cheng and Yaochu Jin and Kay Chen Tan},\n  journal = {ArXiv.org},\n  year = {2026},\n  doi = {10.48550/arxiv.2601.18446},\n  url = {https://doi.org/10.48550/arxiv.2601.18446}\n}",
      "primaryUrl": "https://arxiv.org/abs/2601.18446",
      "venueUrl": null,
      "type": "unknown",
      "paperUrl": "https://arxiv.org/abs/2601.18446",
      "publisher_url": "https://arxiv.org/abs/2601.18446",
      "venue_url": null,
      "paper_url": "https://arxiv.org/abs/2601.18446",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2601.18446",
      "citations": 0,
      "verification": {
        "if_value": null,
        "if_year": null,
        "jcr_quartile": null,
        "jcr_year": null,
        "cas_quartile": null,
        "cas_year": null,
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": null,
        "if_public_source_url": null,
        "if_source_mode": null,
        "if_search_copy_text": "ArXiv.org",
        "jcr_source_url": null,
        "jcr_public_source_url": null,
        "jcr_source_mode": null,
        "jcr_search_copy_text": "ArXiv.org",
        "cas_official_source_url": null,
        "cas_official_platform_url": null,
        "cas_public_source_url": null,
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": null,
        "cas_search_copy_text": "ArXiv.org",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "ArXiv.org"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2601.18446",
          "copy_text": "10.48550/arxiv.2601.18446"
        },
        "openalex": {
          "mode": "search",
          "url": "",
          "copy_text": "doi:10.48550/arxiv.2601.18446"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.48550/arxiv.2601.18446"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2601.18446",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2026/scaling-behaviors-of-evolutionary-algorithms-on-gpus-when-does-parallelism-pay-off.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This preprint is strategically useful because it shifts the conversation from raw accelerator speedups to when GPU parallelism actually changes EA behavior, evaluation methodology, and algorithm design. That makes it a strong forward signal for how the group's systems agenda may mature next.",
          "ja": "このプレプリントが戦略的に有用なのは、議論を単なる加速器速度向上から、GPU 並列性がいつ EA の挙動、評価方法、アルゴリズム設計そのものを変えるのかへ移している点です。これは、このグループのシステム議題が次にどう成熟するかを示す強い先行シグナルです。",
          "zh": "这篇预印本在战略上很有价值，因为它把讨论从“加速器到底快了多少”转向了“GPU 并行性究竟在何时改变 EA 的行为、评测方法与算法设计本身”。这使它成为该团队系统化议程下一步可能如何成熟的一个强前向信号。"
        }
      },
      "classification": {
        "authors": [
          "Xinmeng Yu",
          "Tao Jiang",
          "Ran Cheng",
          "Yaochu Jin",
          "Kay Chen Tan"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation",
          "HPC",
          "GPU Computing"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "GPU-native EC Systems",
          "Evaluation Methodology"
        ],
        "venue": {
          "name": "ArXiv.org",
          "type": null
        },
        "venueType": null,
        "publicationYear": "2026",
        "qualityTags": [],
        "tags": [
          "Evolutionary Computation",
          "ArXiv.org",
          "2026",
          "Optimization",
          "AI",
          "HPC",
          "GPU Computing",
          "Evolutionary Algorithms and Applications",
          "GPU-native EC Systems",
          "Evaluation Methodology"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "ArXiv.org",
        "2026",
        "Optimization",
        "AI",
        "HPC",
        "GPU Computing",
        "Evolutionary Algorithms and Applications",
        "GPU-native EC Systems",
        "Evaluation Methodology"
      ]
    },
    {
      "id": "evolutionary-computation-ran-cheng-arxiv-2509-08269",
      "domainId": "evolutionary-computation",
      "title": "A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving",
      "venue": "ArXiv.org",
      "year": "2025",
      "status": "monitor",
      "pdfState": "ready",
      "authors": [
        "Yisong Zhang",
        "Ran Cheng",
        "Guoxing Yi",
        "Kay Chen Tan"
      ],
      "topics": [
        "Evolutionary Algorithms and Applications",
        "LLMs for Optimization",
        "Survey"
      ],
      "whyItMatters": {
        "en": "This survey is worth storing because it maps an emerging bridge between LLM reasoning and evolutionary optimization workflows. Even if it is not the central GPU-systems line, it is a useful frontier marker for where the group may influence agentic optimization research next.",
        "ja": "このサーベイを保存しておく価値があるのは、LLM の推論と進化最適化ワークフローの間に立ち上がりつつある橋を整理しているからです。GPU システム主線の中心ではないとしても、このグループが次にどこでエージェント型最適化研究へ影響を及ぼしうるかを示す有用なフロンティア指標です。",
        "zh": "这篇综述值得保存，因为它梳理了 LLM 推理与进化优化工作流之间正在形成的一座桥梁。即便它不是 GPU 系统主线的核心部分，它依然是一个有用的前沿标记，用来判断该团队下一步可能在哪些方向影响 agentic optimization research。"
      },
      "publicationDate": "2025-09-10",
      "citationCount": 0,
      "doi": "10.48550/arxiv.2509.08269",
      "doiUrl": "https://doi.org/10.48550/arxiv.2509.08269",
      "publisherUrl": "https://arxiv.org/abs/2509.08269",
      "url": "https://arxiv.org/abs/2509.08269",
      "pdfUrl": "https://arxiv.org/pdf/2509.08269",
      "abstract": {
        "en": "The survey organizes the use of large language models in evolutionary optimization into modeling and solving stages, then further separates solving into stand-alone optimizers, low-level algorithmic components, and high-level managerial roles. It is a useful evidence node for tracking how evolutionary optimization may connect with self-evolving agentic systems.",
        "ja": "このサーベイは、進化最適化における大規模言語モデルの利用を、モデリング段階と解法段階に整理し、さらに解法段階を単独オプティマイザ、低レベルアルゴリズム部品、高レベル管理役割へと分けています。進化最適化が自己進化するエージェントシステムとどう接続しうるかを追ううえで、有用な証拠ノードです。",
        "zh": "这篇综述把大语言模型在进化优化中的使用划分为建模阶段与求解阶段，并进一步把求解阶段细分为独立优化器、底层算法组件和高层管理角色。它是一个很有用的证据节点，用来跟踪进化优化可能如何与可自我演化的智能体系统连接起来。"
      },
      "sourceLineage": {
        "homepage": "Not listed on the selected-publications page as of 2026-04-08.",
        "dblp": "https://dblp.org/pid/18/4198-4.xml",
        "arxiv": "https://arxiv.org/abs/2509.08269"
      },
      "archivePath": "archive/evolutionary-computation/2025/a-systematic-survey-on-large-language-models-for-evolutionary-optimization-from-modeling-to-solving.pdf",
      "citationText": "Y. Zhang, R. Cheng, G. Yi, and K. C. Tan, \"A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving\", ArXiv.org, 2025, doi: 10.48550/arxiv.2509.08269.",
      "metrics": {
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": false,
        "venueType": "unknown",
        "sourceUrl": null,
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null
      },
      "bibtexText": "@article{zhang2025a-systematic-survey-on-l,\n  title = {A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving},\n  author = {Yisong Zhang and Ran Cheng and Guoxing Yi and Kay Chen Tan},\n  journal = {ArXiv.org},\n  year = {2025},\n  doi = {10.48550/arxiv.2509.08269},\n  url = {https://doi.org/10.48550/arxiv.2509.08269}\n}",
      "primaryUrl": "https://arxiv.org/abs/2509.08269",
      "venueUrl": null,
      "type": "unknown",
      "paperUrl": "https://arxiv.org/abs/2509.08269",
      "publisher_url": "https://arxiv.org/abs/2509.08269",
      "venue_url": null,
      "paper_url": "https://arxiv.org/abs/2509.08269",
      "citation_source_url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2509.08269",
      "citations": 0,
      "verification": {
        "if_value": null,
        "if_year": null,
        "jcr_quartile": null,
        "jcr_year": null,
        "cas_quartile": null,
        "cas_year": null,
        "cas_top": false,
        "ccf_rank": null,
        "ccf_year": null,
        "if_source_url": null,
        "if_public_source_url": null,
        "if_source_mode": null,
        "if_search_copy_text": "ArXiv.org",
        "jcr_source_url": null,
        "jcr_public_source_url": null,
        "jcr_source_mode": null,
        "jcr_search_copy_text": "ArXiv.org",
        "cas_official_source_url": null,
        "cas_official_platform_url": null,
        "cas_public_source_url": null,
        "cas_supporting_source_url": null,
        "cas_source_url": null,
        "cas_source_mode": null,
        "cas_search_copy_text": "ArXiv.org",
        "ccf_source_url": null,
        "ccf_public_source_url": null,
        "ccf_source_mode": null,
        "ccf_search_copy_text": "ArXiv.org"
      },
      "citation_sources": {
        "google_scholar": {
          "mode": "search",
          "url": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2509.08269",
          "copy_text": "10.48550/arxiv.2509.08269"
        },
        "openalex": {
          "mode": "search",
          "url": "",
          "copy_text": "doi:10.48550/arxiv.2509.08269"
        },
        "semantic_scholar": {
          "mode": "search",
          "copy_text": "10.48550/arxiv.2509.08269"
        }
      },
      "citationSourceUrl": "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=10.48550/arxiv.2509.08269",
      "downloadMode": "direct-http",
      "archive": {
        "path": "archive/evolutionary-computation/2025/a-systematic-survey-on-large-language-models-for-evolutionary-optimization-from-modeling-to-solving.pdf",
        "pdfState": "ready",
        "downloadMode": "direct-http"
      },
      "curation": {
        "readingStatus": "monitor",
        "summaryNote": {
          "en": "This survey is worth storing because it maps an emerging bridge between LLM reasoning and evolutionary optimization workflows. Even if it is not the central GPU-systems line, it is a useful frontier marker for where the group may influence agentic optimization research next.",
          "ja": "このサーベイを保存しておく価値があるのは、LLM の推論と進化最適化ワークフローの間に立ち上がりつつある橋を整理しているからです。GPU システム主線の中心ではないとしても、このグループが次にどこでエージェント型最適化研究へ影響を及ぼしうるかを示す有用なフロンティア指標です。",
          "zh": "这篇综述值得保存，因为它梳理了 LLM 推理与进化优化工作流之间正在形成的一座桥梁。即便它不是 GPU 系统主线的核心部分，它依然是一个有用的前沿标记，用来判断该团队下一步可能在哪些方向影响 agentic optimization research。"
        }
      },
      "classification": {
        "authors": [
          "Yisong Zhang",
          "Ran Cheng",
          "Guoxing Yi",
          "Kay Chen Tan"
        ],
        "domains": [
          "Evolutionary Computation"
        ],
        "problemFields": [
          "Optimization"
        ],
        "methodFields": [
          "AI",
          "Evolutionary Computation"
        ],
        "fields": [
          "Optimization",
          "AI",
          "Evolutionary Computation"
        ],
        "topics": [
          "Evolutionary Algorithms and Applications",
          "LLMs for Optimization",
          "Survey"
        ],
        "venue": {
          "name": "ArXiv.org",
          "type": null
        },
        "venueType": null,
        "publicationYear": "2025",
        "qualityTags": [],
        "tags": [
          "Evolutionary Computation",
          "ArXiv.org",
          "2025",
          "Optimization",
          "AI",
          "Evolutionary Algorithms and Applications",
          "LLMs for Optimization",
          "Survey"
        ]
      },
      "tags": [
        "Evolutionary Computation",
        "ArXiv.org",
        "2025",
        "Optimization",
        "AI",
        "Evolutionary Algorithms and Applications",
        "LLMs for Optimization",
        "Survey"
      ]
    }
  ],
  "workflow": [
    {
      "stage": {
        "en": "Acquire",
        "zh": "采集",
        "ja": "取得"
      },
      "goal": {
        "en": "Search GitHub, paper feeds, lab sites, and watchlists; collect high-signal candidates instead of scraping the whole universe.",
        "zh": "检索 GitHub、论文源、实验室页面和观察名单；优先收集高信号候选，而不是机械抓取整个世界。",
        "ja": "GitHub、論文フィード、研究室サイト、ウォッチリストを調べ、全体を無差別にかき集めるのではなく高信号の候補を集めます。"
      },
      "artifacts": [
        {
          "en": "raw source hits",
          "zh": "原始来源命中",
          "ja": "生のソースヒット"
        },
        {
          "en": "normalized metadata",
          "zh": "标准化元数据",
          "ja": "正規化済みメタデータ"
        },
        {
          "en": "candidate PDF links",
          "zh": "候选 PDF 链接",
          "ja": "候補 PDF リンク"
        }
      ],
      "automation": {
        "en": "cron + browser",
        "zh": "cron + 浏览器",
        "ja": "cron + ブラウザ"
      }
    },
    {
      "stage": {
        "en": "Digest",
        "zh": "整理",
        "ja": "整理"
      },
      "goal": {
        "en": "Score items, identify duplicates, extract why-this-matters notes, and move weak items out of the active lane early.",
        "zh": "为条目打分、识别重复项、提取“为什么重要”的说明，并尽早把弱信号移出活跃通道。",
        "ja": "項目をスコア化し、重複を見つけ、「なぜ重要か」のメモを抽出し、弱い項目は早めにアクティブレーンから外します。"
      },
      "artifacts": [
        {
          "en": "scored cards",
          "zh": "已评分卡片",
          "ja": "スコア付きカード"
        },
        {
          "en": "trend evidence",
          "zh": "趋势证据",
          "ja": "トレンド証拠"
        },
        {
          "en": "team watch updates",
          "zh": "团队监测更新",
          "ja": "チーム監視の更新"
        }
      ],
      "automation": {
        "en": "Codex summaries",
        "zh": "Codex 总结",
        "ja": "Codex 要約"
      }
    },
    {
      "stage": {
        "en": "Synthesize",
        "zh": "综合",
        "ja": "統合"
      },
      "goal": {
        "en": "Turn the daily evidence stream into trends, opportunity gaps, and concrete next-step research questions.",
        "zh": "把每日证据流转化为趋势判断、机会缺口和明确的下一步研究问题。",
        "ja": "日々の証拠ストリームを、トレンド判断、機会ギャップ、具体的な次の研究課題へ変換します。"
      },
      "artifacts": [
        {
          "en": "trend map",
          "zh": "趋势图谱",
          "ja": "トレンドマップ"
        },
        {
          "en": "insight memo",
          "zh": "洞察备忘录",
          "ja": "インサイトメモ"
        },
        {
          "en": "contribution candidates",
          "zh": "潜在贡献点",
          "ja": "貢献候補"
        }
      ],
      "automation": {
        "en": "human reviewed",
        "zh": "人工复核",
        "ja": "人手レビュー"
      }
    },
    {
      "stage": {
        "en": "Act",
        "zh": "执行",
        "ja": "実行"
      },
      "goal": {
        "en": "Convert strong signals into reading queues, replication targets, idea notes, and realistic project directions.",
        "zh": "把强信号转化为阅读队列、复现实验目标、想法笔记和现实可行的项目方向。",
        "ja": "強いシグナルを、読書キュー、再現対象、アイデアノート、現実的なプロジェクト方向へ変換します。"
      },
      "artifacts": [
        {
          "en": "download queue",
          "zh": "下载队列",
          "ja": "ダウンロードキュー"
        },
        {
          "en": "agenda list",
          "zh": "议程清单",
          "ja": "アジェンダ一覧"
        },
        {
          "en": "project seeds",
          "zh": "项目种子",
          "ja": "プロジェクトの種"
        }
      ],
      "automation": {
        "en": "mixed mode",
        "zh": "混合模式",
        "ja": "混合モード"
      }
    }
  ],
  "downloadQueue": [
    {
      "id": "download-evolutionary-computation-ran-cheng-W4416548789",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4416548789",
      "title": "Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning",
      "source": "https://arxiv.org/pdf/2508.00380",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2026/evolutionary-generative-optimization-towards-fully-data-driven-evolutionary-optimization-via-generative-learning.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/tevc.2026.3664432",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11396036/",
      "pdfUrl": "https://arxiv.org/pdf/2508.00380"
    },
    {
      "id": "download-evolutionary-computation-kalyanmoy-deb-W4414581553",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-kalyanmoy-deb-W4414581553",
      "title": "EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing",
      "source": "https://arxiv.org/pdf/2505.18681",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/evosort-a-genetic-algorithm-based-adaptive-parallel-sorting-framework-for-large-scale-high-performance-computing.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1080/17445760.2025.2609138",
      "publisherUrl": "https://www.tandfonline.com/doi/full/10.1080/17445760.2025.2609138",
      "pdfUrl": "https://arxiv.org/pdf/2505.18681"
    },
    {
      "id": "download-evolutionary-computation-kalyanmoy-deb-W4414444197",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-kalyanmoy-deb-W4414444197",
      "title": "An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems",
      "source": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "status": "queued for browser pull",
      "path": "archive/evolutionary-computation/2025/an-adaptive-weight-optimization-algorithm-based-on-decision-variable-grouping-for-large-scale-multi-objective-optimization-problems.pdf",
      "downloadMode": "openclaw-browser",
      "doiUrl": "https://doi.org/10.1016/j.swevo.2025.102149",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003062",
      "pdfUrl": null
    },
    {
      "id": "download-evolutionary-computation-kalyanmoy-deb-W4414151930",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-kalyanmoy-deb-W4414151930",
      "title": "Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot",
      "source": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "status": "queued for browser pull",
      "path": "archive/evolutionary-computation/2025/dynamic-performance-evaluation-of-evolutionary-multi-objective-optimization-algorithms-for-gait-cycle-optimization-of-a-25-dofs-nao-humanoid-robot.pdf",
      "downloadMode": "openclaw-browser",
      "doiUrl": "https://doi.org/10.1016/j.swevo.2025.102144",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S2210650225003013",
      "pdfUrl": null
    },
    {
      "id": "download-evolutionary-computation-kalyanmoy-deb-W4414140555",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-kalyanmoy-deb-W4414140555",
      "title": "A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems",
      "source": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "status": "queued for browser pull",
      "path": "archive/evolutionary-computation/2025/a-cooperative-co-evolutionary-algorithm-with-core-based-grouping-strategy-for-large-scale-01-knapsack-problems.pdf",
      "downloadMode": "openclaw-browser",
      "doiUrl": "https://doi.org/10.1016/j.eswa.2025.129364",
      "publisherUrl": "https://linkinghub.elsevier.com/retrieve/pii/S0957417425029793",
      "pdfUrl": null
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4413243632",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4413243632",
      "title": "EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning",
      "source": "https://arxiv.org/pdf/2501.15129",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/evorl-a-gpu-accelerated-framework-for-evolutionary-reinforcement-learning.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1145/3750053",
      "publisherUrl": "https://dl.acm.org/doi/10.1145/3750053",
      "pdfUrl": "https://arxiv.org/pdf/2501.15129"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4411600078",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4411600078",
      "title": "GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III",
      "source": "https://arxiv.org/pdf/2504.06067",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/gpu-accelerated-evolutionary-many-objective-optimization-using-tensorized-nsga-iii.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/cec65147.2025.11043108",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11043108/",
      "pdfUrl": "https://arxiv.org/pdf/2504.06067"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4409486142",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4409486142",
      "title": "TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies",
      "source": "https://arxiv.org/pdf/2504.08339",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/tensorneat-a-gpu-accelerated-library-for-neuroevolution-of-augmenting-topologies.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1145/3730406",
      "publisherUrl": "https://dl.acm.org/doi/10.1145/3730406",
      "pdfUrl": "https://arxiv.org/pdf/2504.08339"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W7128493809",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W7128493809",
      "title": "Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration",
      "source": "https://arxiv.org/pdf/2501.17168",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2026/enabling-population-level-parallelism-in-tree-based-genetic-programming-for-gpu-acceleration.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/tevc.2026.3663396",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11390710/",
      "pdfUrl": "https://arxiv.org/pdf/2501.17168"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4408935111",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4408935111",
      "title": "Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization",
      "source": "https://arxiv.org/pdf/2503.20286",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/bridging-evolutionary-multiobjective-optimization-and-gpu-acceleration-via-tensorization.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3555605",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10944658/",
      "pdfUrl": "https://arxiv.org/pdf/2503.20286"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4407451023",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4407451023",
      "title": "MetaDE: Evolving Differential Evolution by Differential Evolution",
      "source": "https://arxiv.org/pdf/2502.10470",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/metade-evolving-differential-evolution-by-differential-evolution.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3541587",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10884874/",
      "pdfUrl": "https://arxiv.org/pdf/2502.10470"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4414459062",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4414459062",
      "title": "Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation",
      "source": "https://ieeexplore.ieee.org/document/11178251/",
      "status": "queued for browser pull",
      "path": "archive/evolutionary-computation/2025/efficient-evolutionary-neural-architecture-search-with-hierarchical-parameter-mapping-for-monocular-depth-estimation.pdf",
      "downloadMode": "openclaw-browser",
      "doiUrl": "https://doi.org/10.1109/tevc.2025.3614261",
      "publisherUrl": "https://ieeexplore.ieee.org/document/11178251/",
      "pdfUrl": null
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-W4394805110",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-W4394805110",
      "title": "EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation",
      "source": "https://arxiv.org/pdf/2301.12457",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2024/evox-a-distributed-gpu-accelerated-framework-for-scalable-evolutionary-computation.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.1109/tevc.2024.3388550",
      "publisherUrl": "https://ieeexplore.ieee.org/document/10499977/",
      "pdfUrl": "https://arxiv.org/pdf/2301.12457"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-arxiv-2601-18446",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-arxiv-2601-18446",
      "title": "Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?",
      "source": "https://arxiv.org/pdf/2601.18446",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2026/scaling-behaviors-of-evolutionary-algorithms-on-gpus-when-does-parallelism-pay-off.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.48550/arxiv.2601.18446",
      "publisherUrl": "https://arxiv.org/abs/2601.18446",
      "pdfUrl": "https://arxiv.org/pdf/2601.18446"
    },
    {
      "id": "download-evolutionary-computation-ran-cheng-arxiv-2509-08269",
      "domainId": "evolutionary-computation",
      "paperId": "evolutionary-computation-ran-cheng-arxiv-2509-08269",
      "title": "A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving",
      "source": "https://arxiv.org/pdf/2509.08269",
      "status": "ready for auto-archive",
      "path": "archive/evolutionary-computation/2025/a-systematic-survey-on-large-language-models-for-evolutionary-optimization-from-modeling-to-solving.pdf",
      "downloadMode": "direct-http",
      "doiUrl": "https://doi.org/10.48550/arxiv.2509.08269",
      "publisherUrl": "https://arxiv.org/abs/2509.08269",
      "pdfUrl": "https://arxiv.org/pdf/2509.08269"
    }
  ],
  "venues": [
    {
      "id": "ieee transactions on evolutionary computation",
      "venueName": "IEEE Transactions on Evolutionary Computation",
      "venueType": "journal",
      "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
      "availableMetricYears": [
        "2026",
        "2025",
        "2024"
      ],
      "latestMetricYear": "2026",
      "latestMetrics": {
        "venueName": "IEEE Transactions on Evolutionary Computation",
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true
      },
      "metricHistory": {
        "2024": {
          "impactFactor": "11.7",
          "impactYear": "2024",
          "jcrQuartile": "Q1",
          "jcrYear": "2024",
          "casQuartile": "Q1",
          "casYear": "2024",
          "casTop": true,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2024",
          "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5"
        },
        "2025": {
          "impactFactor": "12.0",
          "impactYear": "2025",
          "jcrQuartile": "Q1",
          "jcrYear": "2025",
          "casQuartile": "Q1",
          "casYear": "2025",
          "casTop": true,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
          "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5"
        },
        "2026": {
          "impactFactor": "12.0",
          "impactYear": "2025",
          "jcrQuartile": "Q1",
          "jcrYear": "2025",
          "casQuartile": "Q1",
          "casYear": "2025",
          "casTop": true,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
          "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5"
        }
      },
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2026",
        "2025",
        "2024"
      ],
      "trackedPaperCount": 6,
      "trackedPaperIds": [
        "evolutionary-computation-ran-cheng-W4416548789",
        "evolutionary-computation-ran-cheng-W7128493809",
        "evolutionary-computation-ran-cheng-W4408935111",
        "evolutionary-computation-ran-cheng-W4407451023",
        "evolutionary-computation-ran-cheng-W4414459062",
        "evolutionary-computation-ran-cheng-W4394805110"
      ],
      "trackedPaperTitles": [
        "Evolutionary Generative Optimization: Towards Fully Data-Driven Evolutionary Optimization via Generative Learning",
        "Enabling Population-Level Parallelism in Tree-Based Genetic Programming for GPU Acceleration",
        "Bridging Evolutionary Multiobjective Optimization and GPU Acceleration via Tensorization",
        "MetaDE: Evolving Differential Evolution by Differential Evolution",
        "Efficient Evolutionary Neural Architecture Search With Hierarchical Parameter Mapping for Monocular Depth Estimation",
        "EvoX: A Distributed GPU-Accelerated Framework for Scalable Evolutionary Computation"
      ]
    },
    {
      "id": "acm transactions on evolutionary learning and optimization",
      "venueName": "ACM Transactions on Evolutionary Learning and Optimization",
      "venueType": "journal",
      "sourceUrl": "https://dl.acm.org/journal/telo",
      "availableMetricYears": [
        "2025"
      ],
      "latestMetricYear": "2025",
      "latestMetrics": {
        "venueName": "ACM Transactions on Evolutionary Learning and Optimization",
        "venueType": "journal",
        "sourceUrl": "https://dl.acm.org/journal/telo",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "ifPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcrPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "casSourceMode": "official_search",
        "casSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "impactFactor": "__not_listed__",
        "impactYear": "2025",
        "jcrQuartile": "__not_listed__",
        "jcrYear": "2025",
        "casQuartile": "__not_listed__",
        "casYear": "2025",
        "casTop": false
      },
      "metricHistory": {
        "2025": {
          "impactFactor": "__not_listed__",
          "impactYear": "2025",
          "jcrQuartile": "__not_listed__",
          "jcrYear": "2025",
          "casQuartile": "__not_listed__",
          "casYear": "2025",
          "casTop": false
        }
      },
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2025"
      ],
      "trackedPaperCount": 2,
      "trackedPaperIds": [
        "evolutionary-computation-ran-cheng-W4413243632",
        "evolutionary-computation-ran-cheng-W4409486142"
      ],
      "trackedPaperTitles": [
        "EvoRL: A GPU-accelerated Framework for Evolutionary Reinforcement Learning",
        "TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies"
      ]
    },
    {
      "id": "arxiv org",
      "venueName": "ArXiv.org",
      "venueType": "unknown",
      "sourceUrl": null,
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {},
      "metricHistory": {},
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2026",
        "2025"
      ],
      "trackedPaperCount": 2,
      "trackedPaperIds": [
        "evolutionary-computation-ran-cheng-arxiv-2601-18446",
        "evolutionary-computation-ran-cheng-arxiv-2509-08269"
      ],
      "trackedPaperTitles": [
        "Scaling Behaviors of Evolutionary Algorithms on GPUs: When Does Parallelism Pay Off?",
        "A Systematic Survey on Large Language Models for Evolutionary Optimization: From Modeling to Solving"
      ]
    },
    {
      "id": "swarm and evolutionary computation",
      "venueName": "Swarm and Evolutionary Computation",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
      "availableMetricYears": [
        "2025"
      ],
      "latestMetricYear": "2025",
      "latestMetrics": {
        "venueName": "Swarm and Evolutionary Computation",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Swarm and Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22106502/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Swarm and Evolutionary Computation",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Swarm and Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "impactFactor": "8.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q2",
        "casYear": "2025",
        "casTop": false
      },
      "metricHistory": {
        "2025": {
          "impactFactor": "8.5",
          "impactYear": "2025",
          "jcrQuartile": "Q1",
          "jcrYear": "2025",
          "casQuartile": "Q2",
          "casYear": "2025",
          "casTop": false,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
          "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD"
        }
      },
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2025"
      ],
      "trackedPaperCount": 2,
      "trackedPaperIds": [
        "evolutionary-computation-kalyanmoy-deb-W4414444197",
        "evolutionary-computation-kalyanmoy-deb-W4414151930"
      ],
      "trackedPaperTitles": [
        "An adaptive weight optimization algorithm based on decision variable grouping for large-scale multi-objective optimization problems",
        "Dynamic performance evaluation of evolutionary multi-objective optimization algorithms for gait cycle optimization of a 25-DOFs NAO humanoid robot"
      ]
    },
    {
      "id": "2025 ieee congress on evolutionary computation cec",
      "venueName": "2025 IEEE Congress on Evolutionary Computation (CEC)",
      "venueType": "conference",
      "sourceUrl": "https://2025.ieeewcci.org/cec/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "casQuartile": null,
        "venueType": "conference",
        "sourceUrl": "https://2025.ieeewcci.org/cec/"
      },
      "metricHistory": {},
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2025"
      ],
      "trackedPaperCount": 1,
      "trackedPaperIds": [
        "evolutionary-computation-ran-cheng-W4411600078"
      ],
      "trackedPaperTitles": [
        "GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III"
      ]
    },
    {
      "id": "expert systems with applications",
      "venueName": "Expert Systems with Applications",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
      "availableMetricYears": [
        "2025"
      ],
      "latestMetricYear": "2025",
      "latestMetrics": {
        "venueName": "Expert Systems with Applications",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "Expert Systems with Applications",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/09574174/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "Expert Systems with Applications",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casSourceMode": "official_search",
        "casSearchCopyText": "Expert Systems with Applications",
        "impactFactor": "7.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Expert%20Systems%20with%20Applications&y=2025",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html"
      },
      "metricHistory": {
        "2025": {
          "impactFactor": "7.5",
          "impactYear": "2025",
          "jcrQuartile": "Q1",
          "jcrYear": "2025",
          "casQuartile": "Q1",
          "casYear": "2025",
          "casTop": true,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Expert%20Systems%20with%20Applications&y=2025",
          "casPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html"
        }
      },
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2025"
      ],
      "trackedPaperCount": 1,
      "trackedPaperIds": [
        "evolutionary-computation-kalyanmoy-deb-W4414140555"
      ],
      "trackedPaperTitles": [
        "A cooperative co-evolutionary algorithm with core-based grouping strategy for large-scale 0–1 knapsack problems"
      ]
    },
    {
      "id": "international journal of parallel emergent and distributed systems",
      "venueName": "International Journal of Parallel Emergent and Distributed Systems",
      "venueType": "journal",
      "sourceUrl": "https://www.tandfonline.com/journals/gpaa20",
      "availableMetricYears": [
        "2025"
      ],
      "latestMetricYear": "2025",
      "latestMetrics": {
        "venueName": "International Journal of Parallel Emergent and Distributed Systems",
        "venueType": "journal",
        "sourceUrl": "https://www.tandfonline.com/journals/gpaa20",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/17445760/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casSourceMode": "official_search",
        "casSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "impactFactor": "0.6",
        "impactYear": "2025",
        "jcrQuartile": "N/A",
        "jcrYear": "2025",
        "casQuartile": "Q4",
        "casYear": "2025",
        "casTop": false,
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=International%20Journal%20of%20Parallel%20Emergent%20and%20Distributed%20Systems&y=2025",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html"
      },
      "metricHistory": {
        "2025": {
          "impactFactor": "0.6",
          "impactYear": "2025",
          "jcrQuartile": "N/A",
          "jcrYear": "2025",
          "casQuartile": "Q4",
          "casYear": "2025",
          "casTop": false,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=International%20Journal%20of%20Parallel%20Emergent%20and%20Distributed%20Systems&y=2025",
          "casPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html"
        }
      },
      "domainIds": [
        "evolutionary-computation"
      ],
      "domains": [
        "Evolutionary Computation"
      ],
      "trackedPublicationYears": [
        "2025"
      ],
      "trackedPaperCount": 1,
      "trackedPaperIds": [
        "evolutionary-computation-kalyanmoy-deb-W4414581553"
      ],
      "trackedPaperTitles": [
        "EvoSort: a genetic-algorithm-based adaptive parallel sorting framework for large-scale high performance computing"
      ]
    },
    {
      "id": "applied sciences",
      "venueName": "Applied Sciences",
      "venueType": "journal",
      "sourceUrl": "https://www.mdpi.com/journal/applsci",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Applied Sciences",
        "venueType": "journal",
        "sourceUrl": "https://www.mdpi.com/journal/applsci",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SCI-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DYYORD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Applied Sciences",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SCI-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/20763417/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Applied Sciences",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DYYORD",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Applied Sciences"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "applied soft computing",
      "venueName": "Applied Soft Computing",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/applied-soft-computing",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Applied Soft Computing",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/applied-soft-computing",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SOFT%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=yp1WdD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Applied Soft Computing",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SOFT%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/appl-soft-comput/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Applied Soft Computing",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=yp1WdD",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Applied Soft Computing"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "arxiv",
      "venueName": "arXiv",
      "venueType": "preprint",
      "sourceUrl": "https://arxiv.org/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "arXiv",
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "casQuartile": null,
        "venueType": "preprint",
        "sourceUrl": "https://arxiv.org/"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "biomimetics",
      "venueName": "Biomimetics",
      "venueType": "journal",
      "sourceUrl": "https://www.mdpi.com/journal/biomimetics",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Biomimetics",
        "venueType": "journal",
        "sourceUrl": "https://www.mdpi.com/journal/biomimetics",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=BIOMIMETICS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5NgPMD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Biomimetics",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=BIOMIMETICS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/23137673/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Biomimetics",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5NgPMD",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Biomimetics"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "chi",
      "venueName": "CHI",
      "venueType": "conference",
      "sourceUrl": "https://chi2026.acm.org/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "CHI",
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "casQuartile": null,
        "venueType": "conference",
        "sourceUrl": "https://chi2026.acm.org/"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "cmc computers materials continua",
      "venueName": "CMC-Computers Materials & Continua",
      "venueType": "journal",
      "sourceUrl": "https://www.techscience.com/journal/cmc",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "CMC-Computers Materials & Continua",
        "venueType": "journal",
        "sourceUrl": "https://www.techscience.com/journal/cmc",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=CMC-COMPUT%20MATER%20CON&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=Q5yWPr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "CMC-Computers Materials & Continua",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=CMC-COMPUT%20MATER%20CON&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/15462218/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "CMC-Computers Materials & Continua",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=Q5yWPr",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "CMC-Computers Materials & Continua"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "engineering applications of artificial intelligence",
      "venueName": "Engineering Applications of Artificial Intelligence",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/engineering-applications-of-artificial-intelligence",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Engineering Applications of Artificial Intelligence",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/engineering-applications-of-artificial-intelligence",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=ENG%20APPL%20ARTIF%20INTEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pP3GOr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Engineering Applications of Artificial Intelligence",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=ENG%20APPL%20ARTIF%20INTEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/09521976/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Engineering Applications of Artificial Intelligence",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pP3GOr",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Engineering Applications of Artificial Intelligence"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "heliyon",
      "venueName": "Heliyon",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/heliyon",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Heliyon",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/heliyon",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=HELIYON&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5KwYd5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Heliyon",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=HELIYON&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/24058440/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Heliyon",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5KwYd5",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Heliyon"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee congress on evolutionary computation cec 2024",
      "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2024",
      "venueType": "journal",
      "sourceUrl": "https://2024.ieeewcci.org/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "venueType": "journal",
        "sourceUrl": "https://2024.ieeewcci.org/",
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee congress on evolutionary computation cec 2025",
      "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2025",
      "venueType": "journal",
      "sourceUrl": "https://cis.ieee.org/conferences/conference-calendar",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "venueType": "journal",
        "sourceUrl": "https://cis.ieee.org/conferences/conference-calendar",
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee congress on evolutionary computation cec 2026",
      "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2026",
      "venueType": "journal",
      "sourceUrl": "https://attend.ieee.org/wcci-2026/ieee-cec-2025/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "venueType": "journal",
        "sourceUrl": "https://attend.ieee.org/wcci-2026/ieee-cec-2025/",
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee international conference on systems man and cybernetics smc 2024",
      "venueName": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
      "venueType": "journal",
      "sourceUrl": "https://www.ieeesmc2024.org/home",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "venueType": "journal",
        "sourceUrl": "https://www.ieeesmc2024.org/home",
        "ifSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "jcrSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "casSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee transactions on systems man and cybernetics systems",
      "venueName": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
      "venueType": "journal",
      "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6221021",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6221021",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20SYST%20MAN%20CY&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5ObXEp",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20SYST%20MAN%20CY&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/21682216/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5ObXEp",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee world congress on computational intelligence wcci 2024",
      "venueName": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
      "venueType": "journal",
      "sourceUrl": "https://2024.ieeewcci.org/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "venueType": "journal",
        "sourceUrl": "https://2024.ieeewcci.org/",
        "ifSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "jcrSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "casSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "ieee world congress on computational intelligence wcci 2026",
      "venueName": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
      "venueType": "journal",
      "sourceUrl": "https://attend.ieee.org/wcci-2026/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "venueType": "journal",
        "sourceUrl": "https://attend.ieee.org/wcci-2026/",
        "ifSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "jcrSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "casSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "international conference on swarm intelligence icsi 2024",
      "venueName": "International Conference on Swarm Intelligence (ICSI) 2024",
      "venueType": "journal",
      "sourceUrl": "https://icsi2024.ustc.edu.cn/main.htm",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "International Conference on Swarm Intelligence (ICSI) 2024",
        "venueType": "journal",
        "sourceUrl": "https://icsi2024.ustc.edu.cn/main.htm",
        "ifSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024",
        "jcrSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024",
        "casSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "international journal of bio inspired computation",
      "venueName": "International Journal of Bio-Inspired Computation",
      "venueType": "journal",
      "sourceUrl": "https://www.inderscience.com/jhome.php?jcode=ijbic",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "International Journal of Bio-Inspired Computation",
        "venueType": "journal",
        "sourceUrl": "https://www.inderscience.com/jhome.php?jcode=ijbic",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20BIO-INSPIR%20COM&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5dZ1kr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "International Journal of Bio-Inspired Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20BIO-INSPIR%20COM&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/int-j-bio_inspir-com/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "International Journal of Bio-Inspired Computation",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5dZ1kr",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "International Journal of Bio-Inspired Computation"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "international journal of computational intelligence systems",
      "venueName": "International Journal of Computational Intelligence Systems",
      "venueType": "journal",
      "sourceUrl": "https://link.springer.com/journal/44196",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "International Journal of Computational Intelligence Systems",
        "venueType": "journal",
        "sourceUrl": "https://link.springer.com/journal/44196",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20COMPUT%20INT%20SYS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5x6mzr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "International Journal of Computational Intelligence Systems",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20COMPUT%20INT%20SYS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/int-j-comput-int-sys/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "International Journal of Computational Intelligence Systems",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5x6mzr",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "International Journal of Computational Intelligence Systems"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "journal of computational design and engineering",
      "venueName": "Journal of Computational Design and Engineering",
      "venueType": "journal",
      "sourceUrl": "https://academic.oup.com/jcde",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Journal of Computational Design and Engineering",
        "venueType": "journal",
        "sourceUrl": "https://academic.oup.com/jcde",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=J%20COMPUT%20DES%20ENG&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pWGm3p",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Journal of Computational Design and Engineering",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=J%20COMPUT%20DES%20ENG&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22885048/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Journal of Computational Design and Engineering",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pWGm3p",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Journal of Computational Design and Engineering"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "mathematics",
      "venueName": "Mathematics",
      "venueType": "journal",
      "sourceUrl": "https://www.mdpi.com/journal/mathematics",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Mathematics",
        "venueType": "journal",
        "sourceUrl": "https://www.mdpi.com/journal/mathematics",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=MATHEMATICS-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kPKjD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Mathematics",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=MATHEMATICS-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.iit.comillas.edu/publicacion/info_revista/en/486/Mathematics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Mathematics",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kPKjD",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Mathematics"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "neural networks",
      "venueName": "Neural Networks",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/neural-networks",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Neural Networks",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/neural-networks",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=NEURAL%20NETWORKS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.iit.comillas.edu/publicacion/info_revista/en/565/Neural_Networks",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Neural Networks",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=NEURAL%20NETWORKS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/neural-networks/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Neural Networks",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=11534",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Neural Networks"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "neurips",
      "venueName": "NeurIPS",
      "venueType": "conference",
      "sourceUrl": "https://neurips.cc/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "NeurIPS",
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "casQuartile": null,
        "venueType": "conference",
        "sourceUrl": "https://neurips.cc/"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "sc",
      "venueName": "SC",
      "venueType": "conference",
      "sourceUrl": "https://sc24.supercomputing.org/",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "SC",
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "casQuartile": null,
        "venueType": "conference",
        "sourceUrl": "https://sc24.supercomputing.org/"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "symmetry",
      "venueName": "Symmetry",
      "venueType": "journal",
      "sourceUrl": "https://www.mdpi.com/journal/symmetry",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Symmetry",
        "venueType": "journal",
        "sourceUrl": "https://www.mdpi.com/journal/symmetry",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SYMMETRY-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DXd2YD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Symmetry",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SYMMETRY-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/symmetry_basel/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Symmetry",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DXd2YD",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Symmetry"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "tpds",
      "venueName": "TPDS",
      "venueType": "journal",
      "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=71",
      "availableMetricYears": [
        "2024"
      ],
      "latestMetricYear": "2024",
      "latestMetrics": {
        "venueName": "TPDS",
        "venueType": "journal",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=71",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=1045-9219",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/13044.html",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=1045-9219",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/10459219/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casSourceMode": "official_search",
        "casSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "impactFactor": "5.3",
        "impactYear": "2024",
        "jcrQuartile": "Q1",
        "jcrYear": "2024",
        "casQuartile": "Q2",
        "casYear": "2023",
        "casTop": true,
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Parallel%20and%20Distributed%20Systems&y=2023",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/13044.html"
      },
      "metricHistory": {
        "2024": {
          "impactFactor": "5.3",
          "impactYear": "2024",
          "jcrQuartile": "Q1",
          "jcrYear": "2024",
          "casQuartile": "Q2",
          "casYear": "2023",
          "casTop": true,
          "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Parallel%20and%20Distributed%20Systems&y=2023",
          "casPublicSourceUrl": "https://www.iikx.com/sci/technology/13044.html"
        }
      },
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    },
    {
      "id": "transportation research part e logistics and transportation review",
      "venueName": "Transportation Research Part E: Logistics and Transportation Review",
      "venueType": "journal",
      "sourceUrl": "https://www.sciencedirect.com/journal/transportation-research-part-e-logistics-and-transportation-review",
      "availableMetricYears": [],
      "latestMetricYear": "",
      "latestMetrics": {
        "venueName": "Transportation Research Part E: Logistics and Transportation Review",
        "venueType": "journal",
        "sourceUrl": "https://www.sciencedirect.com/journal/transportation-research-part-e-logistics-and-transportation-review",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=TRANSPORT%20RES%20E-LOG&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=rw4R1p",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=TRANSPORT%20RES%20E-LOG&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/13665545/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=rw4R1p",
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review"
      },
      "metricHistory": {},
      "domainIds": [],
      "domains": [],
      "trackedPublicationYears": [],
      "trackedPaperCount": 0,
      "trackedPaperIds": [],
      "trackedPaperTitles": []
    }
  ],
  "venueReference": {
    "generatedAt": "2026-04-08 14:47 JST",
    "entries": [
      {
        "venue": "2025 IEEE Congress on Evolutionary Computation (CEC)",
        "venueKey": "2025 ieee congress on evolutionary computation cec",
        "venueType": "conference",
        "metricYear": null,
        "sourceUrl": "https://2025.ieeewcci.org/cec/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "ACM Transactions on Evolutionary Learning and Optimization",
        "venueKey": "acm transactions on evolutionary learning and optimization",
        "venueType": "journal",
        "metricYear": "2025",
        "sourceUrl": "https://dl.acm.org/journal/telo",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "ifPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=2688-3007",
        "jcrPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://eshukan.com/sci/scidisplayj.aspx?jid=51654&jtype=936",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "ACM Transactions on Evolutionary Learning and Optimization",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "__not_listed__",
        "impactYear": "2025",
        "jcrQuartile": "__not_listed__",
        "jcrYear": "2025",
        "casQuartile": "__not_listed__",
        "casYear": "2025",
        "casTop": false,
        "qualityTags": [
          "IF __not_listed__"
        ]
      },
      {
        "venue": "Applied Sciences",
        "venueKey": "applied sciences",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.mdpi.com/journal/applsci",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SCI-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DYYORD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Applied Sciences",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SCI-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/20763417/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Applied Sciences",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DYYORD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Applied Sciences",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Applied Soft Computing",
        "venueKey": "applied soft computing",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.sciencedirect.com/journal/applied-soft-computing",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SOFT%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=yp1WdD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Applied Soft Computing",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=APPL%20SOFT%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/appl-soft-comput/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Applied Soft Computing",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=yp1WdD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Applied Soft Computing",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "arXiv",
        "venueKey": "arxiv",
        "venueType": "preprint",
        "metricYear": null,
        "sourceUrl": "https://arxiv.org/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Biomimetics",
        "venueKey": "biomimetics",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.mdpi.com/journal/biomimetics",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=BIOMIMETICS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5NgPMD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Biomimetics",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=BIOMIMETICS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/23137673/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Biomimetics",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5NgPMD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Biomimetics",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "CHI",
        "venueKey": "chi",
        "venueType": "conference",
        "metricYear": null,
        "sourceUrl": "https://chi2026.acm.org/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "CMC-Computers Materials & Continua",
        "venueKey": "cmc computers materials continua",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.techscience.com/journal/cmc",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=CMC-COMPUT%20MATER%20CON&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=Q5yWPr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "CMC-Computers Materials & Continua",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=CMC-COMPUT%20MATER%20CON&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/15462218/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "CMC-Computers Materials & Continua",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=Q5yWPr",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "CMC-Computers Materials & Continua",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Engineering Applications of Artificial Intelligence",
        "venueKey": "engineering applications of artificial intelligence",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.sciencedirect.com/journal/engineering-applications-of-artificial-intelligence",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=ENG%20APPL%20ARTIF%20INTEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pP3GOr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Engineering Applications of Artificial Intelligence",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=ENG%20APPL%20ARTIF%20INTEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/09521976/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Engineering Applications of Artificial Intelligence",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pP3GOr",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Engineering Applications of Artificial Intelligence",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Expert Systems with Applications",
        "venueKey": "expert systems with applications",
        "venueType": "journal",
        "metricYear": "2025",
        "sourceUrl": "https://www.sciencedirect.com/journal/expert-systems-with-applications",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "Expert Systems with Applications",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=0957-4174",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/09574174/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "Expert Systems with Applications",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Expert%20Systems%20with%20Applications&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/12439.html",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "Expert Systems with Applications",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "7.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "qualityTags": [
          "IF 7.5",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      {
        "venue": "Heliyon",
        "venueKey": "heliyon",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.sciencedirect.com/journal/heliyon",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=HELIYON&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5KwYd5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Heliyon",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=HELIYON&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/24058440/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Heliyon",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5KwYd5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Heliyon",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "venueKey": "ieee congress on evolutionary computation cec 2024",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://2024.ieeewcci.org/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2024",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "venueKey": "ieee congress on evolutionary computation cec 2025",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://cis.ieee.org/conferences/conference-calendar",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2025",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "venueKey": "ieee congress on evolutionary computation cec 2026",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://attend.ieee.org/wcci-2026/ieee-cec-2025/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE Congress on Evolutionary Computation (CEC) 2026",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "venueKey": "ieee international conference on systems man and cybernetics smc 2024",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.ieeesmc2024.org/home",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE International Conference on Systems, Man, and Cybernetics (SMC) 2024",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE Transactions on Evolutionary Computation",
        "venueKey": "ieee transactions on evolutionary computation",
        "venueType": "journal",
        "metricYear": "2026",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      {
        "venue": "IEEE Transactions on Evolutionary Computation",
        "venueKey": "ieee transactions on evolutionary computation",
        "venueType": "journal",
        "metricYear": "2025",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "12.0",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q1",
        "casYear": "2025",
        "casTop": true,
        "qualityTags": [
          "IF 12.0",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      {
        "venue": "IEEE Transactions on Evolutionary Computation",
        "venueKey": "ieee transactions on evolutionary computation",
        "venueType": "journal",
        "metricYear": "2024",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=4235",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/1089778X/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Evolutionary%20Computation&y=2024",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kwBz5",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "11.7",
        "impactYear": "2024",
        "jcrQuartile": "Q1",
        "jcrYear": "2024",
        "casQuartile": "Q1",
        "casYear": "2024",
        "casTop": true,
        "qualityTags": [
          "IF 11.7",
          "JCR Q1",
          "CAS Q1",
          "CAS Top"
        ]
      },
      {
        "venue": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "venueKey": "ieee transactions on systems man and cybernetics systems",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6221021",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20SYST%20MAN%20CY&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5ObXEp",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=IEEE%20T%20SYST%20MAN%20CY&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/21682216/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5ObXEp",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "IEEE Transactions on Systems, Man and Cybernetics: Systems",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "venueKey": "ieee world congress on computational intelligence wcci 2024",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://2024.ieeewcci.org/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2024",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "venueKey": "ieee world congress on computational intelligence wcci 2026",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://attend.ieee.org/wcci-2026/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "IEEE World Congress on Computational Intelligence (WCCI) 2026",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "International Conference on Swarm Intelligence (ICSI) 2024",
        "venueKey": "international conference on swarm intelligence icsi 2024",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://icsi2024.ustc.edu.cn/main.htm",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024",
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024",
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": "International Conference on Swarm Intelligence (ICSI) 2024",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "International Journal of Bio-Inspired Computation",
        "venueKey": "international journal of bio inspired computation",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.inderscience.com/jhome.php?jcode=ijbic",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20BIO-INSPIR%20COM&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5dZ1kr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "International Journal of Bio-Inspired Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20BIO-INSPIR%20COM&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/int-j-bio_inspir-com/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "International Journal of Bio-Inspired Computation",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5dZ1kr",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "International Journal of Bio-Inspired Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "International Journal of Computational Intelligence Systems",
        "venueKey": "international journal of computational intelligence systems",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://link.springer.com/journal/44196",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20COMPUT%20INT%20SYS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5x6mzr",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "International Journal of Computational Intelligence Systems",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=INT%20J%20COMPUT%20INT%20SYS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/int-j-comput-int-sys/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "International Journal of Computational Intelligence Systems",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5x6mzr",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "International Journal of Computational Intelligence Systems",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "International Journal of Parallel Emergent and Distributed Systems",
        "venueKey": "international journal of parallel emergent and distributed systems",
        "venueType": "journal",
        "metricYear": "2025",
        "sourceUrl": "https://www.tandfonline.com/journals/gpaa20",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html",
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=1744-5760",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/17445760/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=International%20Journal%20of%20Parallel%20Emergent%20and%20Distributed%20Systems&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/23927.html",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "International Journal of Parallel Emergent and Distributed Systems",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "0.6",
        "impactYear": "2025",
        "jcrQuartile": "N/A",
        "jcrYear": "2025",
        "casQuartile": "Q4",
        "casYear": "2025",
        "casTop": false,
        "qualityTags": [
          "IF 0.6",
          "JCR N/A",
          "CAS Q4"
        ]
      },
      {
        "venue": "Journal of Computational Design and Engineering",
        "venueKey": "journal of computational design and engineering",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://academic.oup.com/jcde",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=J%20COMPUT%20DES%20ENG&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pWGm3p",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Journal of Computational Design and Engineering",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=J%20COMPUT%20DES%20ENG&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22885048/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Journal of Computational Design and Engineering",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pWGm3p",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Journal of Computational Design and Engineering",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Mathematics",
        "venueKey": "mathematics",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.mdpi.com/journal/mathematics",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=MATHEMATICS-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kPKjD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Mathematics",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=MATHEMATICS-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.iit.comillas.edu/publicacion/info_revista/en/486/Mathematics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Mathematics",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=5kPKjD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Mathematics",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Neural Networks",
        "venueKey": "neural networks",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.sciencedirect.com/journal/neural-networks",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=NEURAL%20NETWORKS&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.iit.comillas.edu/publicacion/info_revista/en/565/Neural_Networks",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Neural Networks",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=NEURAL%20NETWORKS&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/neural-networks/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Neural Networks",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=11534",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Neural Networks",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "NeurIPS",
        "venueKey": "neurips",
        "venueType": "conference",
        "metricYear": null,
        "sourceUrl": "https://neurips.cc/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "SC",
        "venueKey": "sc",
        "venueType": "conference",
        "metricYear": null,
        "sourceUrl": "https://sc24.supercomputing.org/",
        "ifSourceUrl": null,
        "ifPublicSourceUrl": null,
        "ifSourceMode": null,
        "ifSearchCopyText": null,
        "jcrSourceUrl": null,
        "jcrPublicSourceUrl": null,
        "jcrSourceMode": null,
        "jcrSearchCopyText": null,
        "casOfficialSourceUrl": null,
        "casOfficialPlatformUrl": null,
        "casPublicSourceUrl": null,
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": null,
        "casSearchCopyText": null,
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "Swarm and Evolutionary Computation",
        "venueKey": "swarm and evolutionary computation",
        "venueType": "journal",
        "metricYear": "2025",
        "sourceUrl": "https://www.sciencedirect.com/journal/swarm-and-evolutionary-computation",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Swarm and Evolutionary Computation",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SWARM%20EVOL%20COMPUT&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/22106502/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Swarm and Evolutionary Computation",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=Swarm%20and%20Evolutionary%20Computation&y=2025",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=pB4NJD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Swarm and Evolutionary Computation",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "8.5",
        "impactYear": "2025",
        "jcrQuartile": "Q1",
        "jcrYear": "2025",
        "casQuartile": "Q2",
        "casYear": "2025",
        "casTop": false,
        "qualityTags": [
          "IF 8.5",
          "JCR Q1",
          "CAS Q2"
        ]
      },
      {
        "venue": "Symmetry",
        "venueKey": "symmetry",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.mdpi.com/journal/symmetry",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SYMMETRY-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DXd2YD",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Symmetry",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=SYMMETRY-BASEL&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://jrank.net/journals/symmetry_basel/metrics",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Symmetry",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=DXd2YD",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Symmetry",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      },
      {
        "venue": "TPDS",
        "venueKey": "tpds",
        "venueType": "journal",
        "metricYear": "2024",
        "sourceUrl": "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=71",
        "ifSourceUrl": "https://mjl.clarivate.com/search-results?issn=1045-9219",
        "ifPublicSourceUrl": "https://www.iikx.com/sci/technology/13044.html",
        "ifSourceMode": "official_search",
        "ifSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "jcrSourceUrl": "https://mjl.clarivate.com/search-results?issn=1045-9219",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/10459219/",
        "jcrSourceMode": "official_search",
        "jcrSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "casOfficialSourceUrl": "https://www.fenqubiao.com/Core/JournalDetail.aspx?t=IEEE%20Transactions%20on%20Parallel%20and%20Distributed%20Systems&y=2023",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.iikx.com/sci/technology/13044.html",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_search",
        "casSearchCopyText": "IEEE Transactions on Parallel and Distributed Systems",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": "5.3",
        "impactYear": "2024",
        "jcrQuartile": "Q1",
        "jcrYear": "2024",
        "casQuartile": "Q2",
        "casYear": "2023",
        "casTop": true,
        "qualityTags": [
          "IF 5.3",
          "JCR Q1",
          "CAS Q2",
          "CAS Top"
        ]
      },
      {
        "venue": "Transportation Research Part E: Logistics and Transportation Review",
        "venueKey": "transportation research part e logistics and transportation review",
        "venueType": "journal",
        "metricYear": null,
        "sourceUrl": "https://www.sciencedirect.com/journal/transportation-research-part-e-logistics-and-transportation-review",
        "ifSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=TRANSPORT%20RES%20E-LOG&year=2024&fromPage=%2Fjcr%2Fhome",
        "ifPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=rw4R1p",
        "ifSourceMode": "official_profile_fallback",
        "ifSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review",
        "jcrSourceUrl": "https://jcr.clarivate.com/jcr-jp/journal-profile?journal=TRANSPORT%20RES%20E-LOG&year=2024&fromPage=%2Fjcr%2Fhome",
        "jcrPublicSourceUrl": "https://www.fabiao.com.cn/sci/13665545/",
        "jcrSourceMode": "official_profile_fallback",
        "jcrSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review",
        "casOfficialSourceUrl": "/assets/docs/official/cas_journal_ranking_explanation_official.pdf",
        "casOfficialPlatformUrl": "https://www.fenqubiao.com/",
        "casPublicSourceUrl": "https://www.ablesci.com/journal/detail?id=rw4R1p",
        "casSupportingSourceUrl": null,
        "casSourceUrl": null,
        "casSourceMode": "official_archive",
        "casSearchCopyText": "Transportation Research Part E: Logistics and Transportation Review",
        "ccfRank": null,
        "ccfYear": null,
        "ccfSourceUrl": null,
        "ccfPublicSourceUrl": null,
        "ccfSourceMode": null,
        "ccfSearchCopyText": null,
        "impactFactor": null,
        "impactYear": null,
        "jcrQuartile": null,
        "jcrYear": null,
        "casQuartile": null,
        "casYear": null,
        "casTop": null,
        "qualityTags": []
      }
    ]
  }
};
