window.FRONTIER_DIGEST_DATA = {
  "updated_at": "2026-05-04",
  "source_note": {
    "en": "Seed records for the reader shell. The daily automation can append verified digest records to this file.",
    "zh": "阅读器外壳的种子记录。之后每日自动化流程可以把核验后的摘要记录继续写入这个文件。",
    "ja": "リーダー用の初期レコードです。日次自動化は検証済みのダイジェストをこのファイルへ追加できます。"
  },
  "articles": [
    {
      "id": "2026-05-04-evogo",
      "date": "2026-05-04",
      "status": "seed",
      "topic": "AI for Optimization",
      "reading_minutes": 4,
      "source": "Academic Frontier seed",
      "title": {
        "en": "Generative models are moving from helper modules to full optimization engines",
        "zh": "生成模型正在从辅助模块走向完整优化引擎",
        "ja": "生成モデルは補助部品から最適化エンジンそのものへ移りつつある"
      },
      "dek": {
        "en": "EvoGO is useful to read as a signal: evolutionary search can be reframed around learning how to transform inferior solutions into stronger candidates.",
        "zh": "EvoGO 值得作为一个信号来读：进化搜索可以被重构为学习如何把较弱解转化为更强候选解。",
        "ja": "EvoGO は一つのシグナルとして読める。進化的探索は、劣った解をより良い候補へ変換する学習問題として再構成できる。"
      },
      "tags": ["generative optimization", "evolutionary computation", "AI for Science"],
      "links": [
        {
          "label": "Academic Frontier paper",
          "href": "/academic-frontier/paper/evolutionary-generative-optimization-towards-fully-data-driven-evolutionary-optimization-via-generative-learning.html"
        }
      ],
      "paragraphs": [
        {
          "en": "The interesting point is not simply that a generative model is inserted into an evolutionary algorithm. The stronger idea is that the reproduction step itself can become a learned mapping from weaker solutions toward stronger ones.",
          "zh": "有意思的地方不只是把生成模型插入进化算法。更强的思想是，繁殖步骤本身可以变成一个从较弱解映射到较强解的学习过程。",
          "ja": "重要なのは、生成モデルを進化アルゴリズムに挿入したことだけではない。より強い発想は、再生産ステップ自体を、弱い解から強い解への写像として学習する点にある。"
        },
        {
          "en": "For a daily reader, this belongs in the watchlist because it points to a broader design direction: optimization systems may increasingly separate representation learning, candidate generation, and expensive evaluation.",
          "zh": "对于每日阅读器来说，它应该进入观察列表，因为它指向一个更广的设计方向：优化系统会越来越明确地区分表示学习、候选生成和昂贵评估。",
          "ja": "日次リーダーでは、この研究はウォッチ対象になる。表現学習、候補生成、高コスト評価を分離する最適化システム設計の方向性を示しているためである。"
        },
        {
          "en": "The open question is robustness. A generated candidate can be fast and plausible, but publication-level evidence still depends on whether the learned search process survives new landscapes, constraints, and evaluation budgets.",
          "zh": "真正的问题是鲁棒性。生成候选可以很快也很像样，但论文级证据仍取决于这种学到的搜索过程能否跨越新的地形、约束和评估预算。",
          "ja": "残る問題はロバスト性である。生成された候補は高速で妥当に見えるかもしれないが、論文レベルの根拠には、新しい探索空間、制約、評価予算でも学習済み探索が耐えるかが必要になる。"
        }
      ]
    },
    {
      "id": "2026-05-04-evosort",
      "date": "2026-05-04",
      "status": "seed",
      "topic": "HPC Systems",
      "reading_minutes": 3,
      "source": "Academic Frontier seed",
      "title": {
        "en": "Auto-tuning is becoming a user-facing systems feature, not only a compiler trick",
        "zh": "自动调优正在从编译器技巧变成面向用户的系统功能",
        "ja": "自動チューニングはコンパイラ技術だけでなく、ユーザー向けシステム機能になりつつある"
      },
      "dek": {
        "en": "EvoSort suggests a practical direction for HPC tooling: let the system adapt algorithm choices and thresholds to data and hardware.",
        "zh": "EvoSort 暗示了 HPC 工具的实用方向：让系统根据数据和硬件自动调整算法选择与阈值。",
        "ja": "EvoSort は、データとハードウェアに応じてアルゴリズム選択としきい値を調整する HPC ツールの実用的方向を示している。"
      },
      "tags": ["auto-tuning", "parallel sorting", "HPC"],
      "links": [
        {
          "label": "Academic Frontier paper",
          "href": "/academic-frontier/paper/evosort-a-genetic-algorithm-based-adaptive-parallel-sorting-framework-for-large-scale-high-performance-computing.html"
        }
      ],
      "paragraphs": [
        {
          "en": "The signal here is engineering realism. Rather than proposing a new sorting routine that is optimal in one setting, the system searches for useful choices under concrete data distributions and hardware conditions.",
          "zh": "这里的信号是工程现实主义。它不是提出一个只在某个场景最优的新排序例程，而是在具体数据分布和硬件条件下搜索有用的选择。",
          "ja": "ここでのシグナルは工学的な現実性である。単一条件で最適なソート手法を提案するのではなく、具体的なデータ分布とハードウェア条件の下で有用な選択を探索する。"
        },
        {
          "en": "For a personal research portal, this kind of result is useful because it connects evolutionary computation with high-performance software maintenance: the optimization target is not an abstract benchmark alone, but operational performance.",
          "zh": "对个人研究门户来说，这类结果有价值，因为它把进化计算和高性能软件维护连接起来：优化目标不只是抽象基准，而是实际运行表现。",
          "ja": "個人研究ポータルにとって、この種の成果は進化計算と高性能ソフトウェア保守をつなぐ点で有用である。最適化対象は抽象的なベンチマークだけでなく、運用上の性能である。"
        }
      ]
    },
    {
      "id": "2026-05-04-llm-evolutionary-optimization",
      "date": "2026-05-03",
      "status": "seed",
      "topic": "LLM and Optimization",
      "reading_minutes": 5,
      "source": "Academic Frontier seed",
      "title": {
        "en": "LLMs are becoming interfaces for optimization, but the hard part is still problem structure",
        "zh": "大语言模型正在成为优化入口，但真正困难的仍是问题结构",
        "ja": "LLM は最適化の入口になりつつあるが、難所は依然として問題構造である"
      },
      "dek": {
        "en": "A survey on LLMs for evolutionary optimization is best read as a map of roles: modeling, operator design, search guidance, and solver orchestration.",
        "zh": "关于 LLM 用于进化优化的综述，更适合作为角色地图来读：建模、算子设计、搜索引导和求解器编排。",
        "ja": "進化的最適化における LLM のサーベイは、モデリング、オペレータ設計、探索誘導、ソルバー編成という役割地図として読むのがよい。"
      },
      "tags": ["large language models", "evolutionary optimization", "survey"],
      "links": [
        {
          "label": "Academic Frontier paper",
          "href": "/academic-frontier/paper/a-systematic-survey-on-large-language-models-for-evolutionary-optimization-from-modeling-to-solving.html"
        }
      ],
      "paragraphs": [
        {
          "en": "The useful distinction is role separation. LLMs may help describe a problem, generate candidate operators, summarize search history, or coordinate tools, but these are different functions with different failure modes.",
          "zh": "有用的区分是角色分离。LLM 可以帮助描述问题、生成候选算子、总结搜索历史或协调工具，但这些是不同功能，也有不同失败模式。",
          "ja": "有用なのは役割を分けることである。LLM は問題記述、候補オペレータ生成、探索履歴の要約、ツール調整を助けられるが、それぞれ異なる機能であり、失敗モードも異なる。"
        },
        {
          "en": "This matters for future implementation. A reader should not only say that LLMs are useful; it should preserve which part of the optimization loop they touched and what evidence supports that role.",
          "zh": "这对未来实现很重要。阅读器不应只说 LLM 有用，而应该保留它触及了优化循环的哪一部分，以及支持这个角色的证据是什么。",
          "ja": "これは今後の実装で重要になる。リーダーは LLM が有用だと述べるだけでなく、最適化ループのどの部分に関与したのか、その役割を支える根拠は何かを保持すべきである。"
        },
        {
          "en": "The long-term design should therefore store digests as structured records, not prose blobs: role, problem type, method family, evidence, caveat, and source link should be first-class fields.",
          "zh": "因此长期设计应该把摘要存成结构化记录，而不是一整块散文：角色、问题类型、方法族、证据、限制和来源链接都应该是一级字段。",
          "ja": "したがって長期設計では、ダイジェストを散文の塊ではなく構造化レコードとして保存すべきである。役割、問題タイプ、手法群、根拠、注意点、出典リンクを第一級のフィールドにする必要がある。"
        }
      ]
    },
    {
      "id": "2026-05-03-tensorized-gpu-emo",
      "date": "2026-05-03",
      "status": "seed",
      "topic": "GPU Evolutionary Computing",
      "reading_minutes": 4,
      "source": "Academic Frontier seed",
      "title": {
        "en": "Tensorized evolutionary computation makes GPU acceleration a modeling question",
        "zh": "张量化进化计算让 GPU 加速变成建模问题",
        "ja": "テンソル化された進化計算は、GPU 加速をモデリング問題に変える"
      },
      "dek": {
        "en": "GPU speedups are not only about rewriting loops; they depend on whether the algorithm can be represented in dense, parallel-friendly operations.",
        "zh": "GPU 加速不只是重写循环，而取决于算法是否能表示为密集、适合并行的操作。",
        "ja": "GPU 高速化はループを書き換えるだけではない。アルゴリズムを密で並列向きの操作として表現できるかに依存する。"
      },
      "tags": ["GPU", "tensorization", "many-objective optimization"],
      "links": [
        {
          "label": "Academic Frontier paper",
          "href": "/academic-frontier/paper/gpu-accelerated-evolutionary-many-objective-optimization-using-tensorized-nsga-iii.html"
        }
      ],
      "paragraphs": [
        {
          "en": "The core lesson is representation. If an evolutionary algorithm remains a chain of irregular per-individual operations, GPU hardware cannot help much. If it is expressed as tensor operations, the hardware becomes part of the algorithmic design.",
          "zh": "核心教训是表示方式。如果进化算法仍是一串不规则的个体级操作，GPU 很难发挥作用。如果它被表达为张量操作，硬件就会成为算法设计的一部分。",
          "ja": "中心的な教訓は表現である。進化アルゴリズムが不規則な個体単位操作の列のままであれば、GPU は大きく貢献できない。テンソル操作として表現できれば、ハードウェアはアルゴリズム設計の一部になる。"
        },
        {
          "en": "This is directly relevant to a frontier digest because it shows what a useful summary should capture: not only the result, but the computational form that made the result possible.",
          "zh": "这和前沿摘要直接相关，因为它说明有用摘要应该捕捉的不只是结果，还包括使结果成为可能的计算形式。",
          "ja": "これはフロンティア・ダイジェストに直接関係する。有用な要約は結果だけでなく、その結果を可能にした計算形式も捉えるべきだからである。"
        }
      ]
    }
  ]
};
