const divisions = {
    phase: [
        "要求分析(要件定義)",
        "基本設計(外部設計)",
        "詳細設計(内部設計)",
        "プログラミング",
        "単体テスト",
        "結合テスト",
        "総合テスト"
    ],
    documents: [
        ["要求分析書(要件定義書)"],
        ["業務フロー", "システム構成図", "ER図", "テーブル定義書", "機能一覧表", "設計書記述様式", "基本設計書(外部設計書)"],
        ["画面遷移図", "詳細設計書(内部設計書)", "プロジェクト共通ルール"],
        [],
        ["単体テスト仕様書/報告書"],
        ["結合テスト仕様書/報告書"],
        ["総合テスト仕様書/報告書"],
    ]
}

const data = {
    main: [{
            id: 0,
            title: "OOプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "東丸早苗",
            seen: false
        },
        {
            id: 1,
            title: "XXプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "白井美津子",
            seen: false
        },
        {
            id: 2,
            title: "YYプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "佐倉モモ",
            seen: false
        },
        {
            id: 3,
            title: "ZZプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "倉敷満",
            seen: false
        },
        {
            id: 4,
            title: "AAプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "野上元和",
            seen: false
        },
        {
            id: 5,
            title: "BBプロジェクト",
            updateTime: "2021-10-17 10:19:18",
            creator: "何某何蔵",
            seen: false
        },
    ],
}
const projectRecodes = [{
    id: 0,
    records: [{
            time: '2021-10-17 10:19:18',
            message: '(1) 第3段階を達成',
            user: '何某何蔵'
        },
        {
            time: '2021-10-16 10:19:18',
            message: '(1) 第3段階を達成',
            user: '何某何蔵'
        },
        {
            time: '2021-10-15 10:19:18',
            message: '(1) 第3段階を達成',
            user: '何某何蔵'
        }
    ],
    phases: [{
            records: [{
                    time: '2021-10-17 10:19:18',
                    message: '完成して、XX商社の担当者に送信した。',
                    user: '東丸早苗'
                },
                {
                    time: '2021-10-16 10:19:18',
                    message: 'CSV連続取り込みの追加機能を追加した。XX担当からの指摘によるものである。',
                    user: '佐倉モモ'
                },
                {
                    time: '2021-10-15 10:19:18',
                    message: 'XXサーバからの自動取り込み機能を削除した。',
                    user: '中川翔真'
                }
            ],
            documents: [{
                records: [{
                        time: '2021-10-17 10:19:18',
                        message: '2ページ目の修正。システム構成図の簡易版を追加した。',
                        user: '何某何蔵'
                    },
                    {
                        time: '2021-10-16 10:19:18',
                        message: '第3章の文章の修正。「XXX」を「OOO」に修正した。',
                        user: '何某何蔵'
                    }
                ]
            }]
        },
        {
            records: [{
                    time: '2021-10-17 10:19:18',
                    message: '業務フロー.var2-1を完了した。',
                    user: '何某何蔵'
                },
                {
                    time: '2021-10-16 10:19:18',
                    message: 'システム構成図の変更。verは3-1-1とした。',
                    user: '何某何蔵'
                },
                {
                    time: '2021-10-15 10:19:18',
                    message: 'ER図の修正。ver1-1-1',
                    user: '何某何蔵'
                }
            ],
            documents: [
                [{
                        time: '2021-10-17 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    },
                    {
                        time: '2021-10-16 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    },
                    {
                        time: '2021-10-15 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    }
                ],
                [{
                        time: '2021-10-17 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    },
                    {
                        time: '2021-10-16 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    },
                    {
                        time: '2021-10-15 10:19:18',
                        message: '(1) 第3段階を達成',
                        user: '何某何蔵'
                    }
                ]
            ]
        },
        {
            records: [{
                    time: '2021-10-17 10:19:18',
                    message: '(1) 第3段階を達成',
                    user: '何某何蔵'
                },
                {
                    time: '2021-10-16 10:19:18',
                    message: '(1) 第3段階を達成',
                    user: '何某何蔵'
                },
                {
                    time: '2021-10-15 10:19:18',
                    message: '(1) 第3段階を達成',
                    user: '何某何蔵'
                }
            ],
            documents: []
        },
        {
            records: [],
            documents: []
        },
        {
            records: [],
            documents: []
        },
        {
            records: [],
            documents: []
        },
        {
            records: [],
            documents: []
        }
    ]
}]