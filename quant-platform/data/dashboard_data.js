window.INTERNAL_QUANT_DASHBOARD_DATA = {
  "backtest_history": {
    "strategies": [
      {
        "best_total_return": 0.014995630000000038,
        "latest_final_equity": 101499.563,
        "latest_max_drawdown": -0.0004890899999999698,
        "latest_run_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_total_return": 0.014995630000000038,
        "run_count": 1,
        "strategy_name": "daily_rank_main"
      }
    ],
    "total_runs": 1
  },
  "backtest_launcher": {
    "default_profile_name": "daily_rank_main",
    "generated_at": "2026-05-01T15:17:23.993582+00:00",
    "profiles": [
      {
        "backtest_initial_cash": 100000.0,
        "backtest_transaction_cost_bps": 5.0,
        "bundle_run_command_hint": [
          "python3",
          "scripts/run_backtest.py",
          "--profile",
          "daily_rank_main",
          "--input-bundle",
          "results/summary/backtest_input_bundles/daily_rank_main.json"
        ],
        "import_csv_command_template": [
          "python3",
          "scripts/import_equity_bars_csv.py",
          "<CSV_PATH>",
          "--profile",
          "daily_rank_main",
          "--write-bundle"
        ],
        "latest_bundle": {
          "adjustment": "raw",
          "bundle_path": "results/summary/backtest_input_bundles/daily_rank_main.json",
          "curated_manifest_count": 2,
          "end": "2026-03-30T00:00:00Z",
          "feed": "local_file",
          "source_name": "local_equity_bars",
          "start": "2026-03-24T00:00:00Z",
          "strategy_id": "daily_rank_main",
          "strategy_profile_name": "daily_rank_main",
          "symbol_count": 2,
          "symbols": [
            "AAPL",
            "MSFT"
          ],
          "timeframe": "1Day"
        },
        "latest_run_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_run_id": "daily_rank_main:20260401T101620Z",
        "latest_run_path": "daily_rank_main/2026/04/01/20260401T101620Z/run_manifest.json",
        "lookback_bars": 2,
        "min_price": 1.0,
        "prepare_inputs_command_template": [
          "python3",
          "scripts/prepare_backtest_inputs.py",
          "--profile",
          "daily_rank_main",
          "--batch-size",
          "5",
          "--pause-seconds",
          "3",
          "1Day",
          "<START>",
          "<END>",
          "<SYMBOLS...>",
          "--execute"
        ],
        "profile_name": "daily_rank_main",
        "selector": "builtin:lookback_return_desc",
        "strategy_id": "daily_rank_main",
        "top_n": 2
      }
    ],
    "total_profiles": 1
  },
  "backtest_workbench": {
    "generated_at": "2026-05-01T15:17:23.993812+00:00",
    "latest_run_at": "2026-04-01T10:16:20.777363+00:00",
    "strategies": [
      {
        "best_total_return": 0.014995630000000038,
        "latest_profile_name": "daily_rank_main",
        "latest_run": {
          "comparison_to_previous": null,
          "equity_curve": [
            {
              "cash": 100000.0,
              "drawdown": 0.0,
              "equity": 100000.0,
              "gross_market_value": 0.0,
              "position_count": 0,
              "return_from_start": 0.0,
              "trade_date": "2026-03-24"
            },
            {
              "cash": 100000.0,
              "drawdown": 0.0,
              "equity": 100000.0,
              "gross_market_value": 0.0,
              "position_count": 0,
              "return_from_start": 0.0,
              "trade_date": "2026-03-25"
            },
            {
              "cash": 2133.0910000000003,
              "drawdown": -0.0004890899999999698,
              "equity": 99951.091,
              "gross_market_value": 97818.0,
              "position_count": 2,
              "return_from_start": -0.0004890899999999698,
              "trade_date": "2026-03-26"
            },
            {
              "cash": 2195.4805000000006,
              "drawdown": 0.0,
              "equity": 100630.4805,
              "gross_market_value": 98435.0,
              "position_count": 2,
              "return_from_start": 0.00630480500000008,
              "trade_date": "2026-03-27"
            },
            {
              "cash": 2119.5630000000006,
              "drawdown": 0.0,
              "equity": 101499.563,
              "gross_market_value": 99380.0,
              "position_count": 2,
              "return_from_start": 0.014995630000000038,
              "trade_date": "2026-03-30"
            }
          ],
          "orders": [
            {
              "fill_price": 105.0,
              "filled_quantity": null,
              "notional": 48930.0,
              "quantity": 466.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "buy",
              "status": "filled",
              "symbol": "AAPL",
              "trade_date": "2026-03-26",
              "transaction_cost": 24.465
            },
            {
              "fill_price": 194.0,
              "filled_quantity": null,
              "notional": 48888.0,
              "quantity": 252.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "buy",
              "status": "filled",
              "symbol": "MSFT",
              "trade_date": "2026-03-26",
              "transaction_cost": 24.444
            },
            {
              "fill_price": 107.0,
              "filled_quantity": null,
              "notional": 642.0,
              "quantity": 6.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "sell",
              "status": "filled",
              "symbol": "AAPL",
              "trade_date": "2026-03-27",
              "transaction_cost": 0.321
            },
            {
              "fill_price": 193.0,
              "filled_quantity": null,
              "notional": 579.0,
              "quantity": 3.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "buy",
              "status": "filled",
              "symbol": "MSFT",
              "trade_date": "2026-03-27",
              "transaction_cost": 0.2895
            },
            {
              "fill_price": 110.0,
              "filled_quantity": null,
              "notional": 880.0,
              "quantity": 8.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "sell",
              "status": "filled",
              "symbol": "AAPL",
              "trade_date": "2026-03-30",
              "transaction_cost": 0.44
            },
            {
              "fill_price": 191.0,
              "filled_quantity": null,
              "notional": 955.0,
              "quantity": 5.0,
              "reject_reason": null,
              "requested_quantity": null,
              "side": "buy",
              "status": "filled",
              "symbol": "MSFT",
              "trade_date": "2026-03-30",
              "transaction_cost": 0.4775
            }
          ],
          "overview": {
            "buy_count": 4,
            "day_count": 5,
            "executed_at": "2026-04-01T10:16:20.777363+00:00",
            "final_equity": 101499.563,
            "input_manifests": [
              "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__AAPL.dataset_manifest.json",
              "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__MSFT.dataset_manifest.json"
            ],
            "manifest_path": "daily_rank_main/2026/04/01/20260401T101620Z/run_manifest.json",
            "max_drawdown": -0.0004890899999999698,
            "order_count": 6,
            "run_id": "daily_rank_main:20260401T101620Z",
            "sell_count": 2,
            "strategy_profile_name": "daily_rank_main",
            "summary_path": "daily_rank_main/2026/04/01/20260401T101620Z/summary.json",
            "symbols_traded": [
              "AAPL",
              "MSFT"
            ],
            "total_return": 0.014995630000000038,
            "total_transaction_cost": 50.437,
            "total_turnover": 100874.0,
            "trade_date_end": "2026-03-30",
            "trade_date_start": "2026-03-24"
          }
        },
        "latest_run_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_trade_date_end": "2026-03-30",
        "latest_trade_date_start": "2026-03-24",
        "run_count": 1,
        "runs": [
          {
            "buy_count": 4,
            "day_count": 5,
            "executed_at": "2026-04-01T10:16:20.777363+00:00",
            "final_equity": 101499.563,
            "input_manifests": [
              "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__AAPL.dataset_manifest.json",
              "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__MSFT.dataset_manifest.json"
            ],
            "manifest_path": "daily_rank_main/2026/04/01/20260401T101620Z/run_manifest.json",
            "max_drawdown": -0.0004890899999999698,
            "order_count": 6,
            "run_id": "daily_rank_main:20260401T101620Z",
            "sell_count": 2,
            "strategy_profile_name": "daily_rank_main",
            "summary_path": "daily_rank_main/2026/04/01/20260401T101620Z/summary.json",
            "symbols_traded": [
              "AAPL",
              "MSFT"
            ],
            "total_return": 0.014995630000000038,
            "total_transaction_cost": 50.437,
            "total_turnover": 100874.0,
            "trade_date_end": "2026-03-30",
            "trade_date_start": "2026-03-24"
          }
        ],
        "strategy_name": "daily_rank_main",
        "worst_total_return": 0.014995630000000038
      }
    ],
    "total_runs": 1,
    "total_strategies": 1
  },
  "generated_from": {
    "backtest_history_summary_path": "results/summary/backtest_history_summary.json",
    "backtest_launcher_summary_path": "results/summary/backtest_launcher_summary.json",
    "backtest_workbench_summary_path": "results/summary/backtest_workbench_summary.json",
    "paper_account_summary_path": "results/summary/paper_account_summary.json",
    "paper_history_summary_path": "results/summary/paper_history_summary.json",
    "paper_incident_summary_path": "results/summary/paper_incident_summary.json",
    "paper_reconciliation_summary_path": "results/summary/paper_reconciliation_summary.json",
    "paper_risk_summary_path": "results/summary/paper_risk_summary.json",
    "platform_readiness_markdown_path": "results/summary/platform_readiness_summary.md",
    "platform_readiness_summary_path": "results/summary/platform_readiness_summary.json",
    "shadow_drift_details_path": "results/summary/shadow_drift_details.json",
    "shadow_drift_summary_path": "results/summary/shadow_drift_summary.json",
    "shadow_history_summary_path": "results/summary/shadow_history_summary.json",
    "shadow_investigation_summary_path": "results/summary/shadow_investigation_summary.json",
    "shadow_supervision_summary_path": "results/summary/shadow_supervision_summary.json",
    "shadow_sync_activity_summary_path": "results/summary/shadow_sync_activity_summary.json",
    "shadow_sync_summary_path": "results/summary/shadow_sync_summary.json",
    "strategy_feature_summary_path": "results/summary/strategy_feature_summary.json",
    "strategy_live_cutover_json_path": "results/summary/strategy_live_cutover/daily_rank_main.json",
    "strategy_live_cutover_markdown_path": "results/summary/strategy_live_cutover/daily_rank_main.md",
    "strategy_live_launch_json_path": "results/summary/strategy_live_launch/daily_rank_main.json",
    "strategy_live_launch_markdown_path": "results/summary/strategy_live_launch/daily_rank_main.md",
    "strategy_next_step_path": "results/summary/strategy_next_steps/daily_rank_main.json",
    "strategy_operator_runbook_json_path": "results/summary/strategy_operator_runbooks/daily_rank_main.json",
    "strategy_operator_runbook_markdown_path": "results/summary/strategy_operator_runbooks/daily_rank_main.md",
    "strategy_promotion_packets_root": "results/summary/strategy_promotion_packets",
    "strategy_promotion_summary_path": "results/summary/strategy_promotion_summary.json",
    "strategy_registry_summary_path": "results/summary/strategy_registry_summary.json",
    "workflow_summary_path": "results/summary/workflow_summary.json"
  },
  "paper_accounts": {
    "accounts": [
      {
        "account_id": "paper_primary",
        "buying_power": 2095.2875077000062,
        "environment": "paper",
        "gross_market_value": 97846.0,
        "last_session_id": "daily_rank_main:20260401T132530Z",
        "net_liquidation_value": 99941.2875077,
        "position_count": 2,
        "updated_at": "2026-04-01T13:25:30.043831+00:00"
      }
    ],
    "total_accounts": 1
  },
  "paper_history": {
    "strategies": [
      {
        "latest_ending_buying_power": 2095.2875077000062,
        "latest_fill_ratio": 1.0,
        "latest_fully_filled_order_count": 2,
        "latest_partially_filled_order_count": 0,
        "latest_rejected_order_count": 0,
        "latest_run_at": "2026-04-01T13:25:30.030831+00:00",
        "latest_starting_state_mode": "persisted_account_state",
        "latest_total_fees": 0.0,
        "latest_total_filled_notional": 97904.7124923,
        "run_count": 1,
        "strategy_id": "daily_rank_main"
      }
    ],
    "total_runs": 1
  },
  "paper_incidents": {
    "critical_incident_count": 0,
    "latest_reports": [
      {
        "account_id": "paper_primary",
        "checked_at": "2026-04-01T13:25:30.032771+00:00",
        "critical_incident_count": 0,
        "incident_count": 0,
        "kill_switch_active": false,
        "latest_session_id": "daily_rank_main:20260401T132530Z",
        "risk_status": "pass"
      }
    ],
    "total_incidents": 0
  },
  "paper_reconciliation": {
    "failing_report_count": 0,
    "latest_reports": [
      {
        "account_id": "paper_primary",
        "cash_difference": 0.0,
        "checked_at": "2026-04-01T13:25:30.032495+00:00",
        "issue_count": 0,
        "latest_session_id": "daily_rank_main:20260401T132530Z",
        "position_difference_count": 0,
        "status": "pass"
      }
    ],
    "total_reports": 1
  },
  "paper_risk": {
    "accounts": [
      {
        "account_id": "paper_primary",
        "issue_count": 0,
        "kill_switch_active": false,
        "kill_switch_reason": null,
        "last_session_id": "daily_rank_main:20260401T132530Z",
        "latest_drawdown_ratio": 0.0005871249229999487,
        "latest_net_liquidation_value": 99941.2875077,
        "peak_net_liquidation_value": 100000.0,
        "risk_status": "pass",
        "updated_at": "2026-04-01T13:25:30.043831+00:00"
      }
    ],
    "failing_account_count": 0,
    "kill_switch_count": 0,
    "total_accounts": 1
  },
  "platform_readiness": {
    "capabilities": [
      {
        "blockers": [],
        "detail": "The platform already has a formal versioned backtest evidence run for the target strategy.",
        "evidence_paths": [
          "daily_rank_main/2026/04/01/20260401T101620Z/summary.json",
          "daily_rank_main/2026/04/01/20260401T101620Z/run_manifest.json"
        ],
        "key": "research_backtest",
        "label": "Research And Backtest",
        "next_actions": [],
        "status": "ready_now"
      },
      {
        "blockers": [],
        "detail": "Paper-trading evidence already exists for this strategy.",
        "evidence_paths": [
          "daily_rank_main/2026/04/01/20260401T132530Z/run_manifest.json",
          "local://internal-quant-platform/results/summary/backtest_input_bundles/daily_rank_main.json"
        ],
        "key": "paper_trading",
        "label": "Supervised Paper Trading",
        "next_actions": [],
        "status": "ready_now"
      },
      {
        "blockers": [],
        "detail": "Synced shadow evidence exists and can be used as the final supervised gate before live.",
        "evidence_paths": [
          "daily_rank_main/2026/04/01/20260401T133241Z/run_manifest.json"
        ],
        "key": "shadow_supervision",
        "label": "Synced Shadow Supervision",
        "next_actions": [],
        "status": "ready_now"
      },
      {
        "blockers": [],
        "detail": "The platform satisfies the guarded internal live-trading gate for one strategy.",
        "evidence_paths": [
          "daily_rank_main/2026/04/01/20260401T132530Z/run_manifest.json",
          "daily_rank_main/2026/04/01/20260401T133241Z/run_manifest.json",
          "daily_rank_main/2026/04/01/20260401T140731Z/daily_rank_main_live_20260401T140731Z.json"
        ],
        "key": "live_trading",
        "label": "Guarded Internal Live Trading",
        "next_actions": [],
        "status": "ready_now"
      }
    ],
    "current_blocker": null,
    "current_bounded_goal": "Operate daily_rank_main as the first guarded internal live strategy.",
    "current_command_hint": [],
    "current_next_action": "Execute the guarded internal live cutover checklist.",
    "current_platform_level": "guarded_internal_live_ready",
    "generated_at": "2026-05-01T15:17:23.973159+00:00",
    "live_broker_write_path_present": true,
    "live_trading_status": "ready_now",
    "paper_trading_status": "ready_now",
    "practical_answer": "This platform can already be treated as a guarded internal live-trading platform for one strategy.",
    "profile_name": "daily_rank_main",
    "research_backtest_status": "ready_now",
    "shadow_status": "ready_now",
    "strategy_id": "daily_rank_main",
    "v1_gap_count": 0,
    "v1_missing_items": [],
    "v1_status": "complete"
  },
  "shadow_drift": {
    "accounts": [
      {
        "account_id": "shadow_primary",
        "baseline_only_count": 0,
        "buying_power_delta": 0.0,
        "environment": "shadow",
        "gross_drift_notional": 0.0,
        "largest_differences": [],
        "latest_shadow_at": "2026-04-01T13:32:41.551093+00:00",
        "latest_shadow_session_id": "daily_rank_main:20260401T133241Z",
        "latest_shadow_starting_state_mode": "synced_shadow_snapshot",
        "latest_shadow_strategy_id": "daily_rank_main",
        "quantity_difference_count": 0,
        "shadow_only_count": 0,
        "shadow_position_count": 2,
        "source_label": "internal_paper_account_state",
        "source_reference": "paper_primary",
        "status": "aligned",
        "synced_at": "2026-04-01T13:32:41.539025+00:00",
        "synced_position_count": 2
      }
    ],
    "drifted_account_count": 0,
    "missing_shadow_run_count": 0,
    "missing_sync_count": 0,
    "non_synced_run_count": 0,
    "total_accounts": 1
  },
  "shadow_history": {
    "strategies": [
      {
        "latest_ending_buying_power": 2095.2875077000062,
        "latest_fill_ratio": 0.0,
        "latest_fully_filled_order_count": 0,
        "latest_partially_filled_order_count": 0,
        "latest_rejected_order_count": 0,
        "latest_run_at": "2026-04-01T13:32:41.551093+00:00",
        "latest_starting_state_mode": "synced_shadow_snapshot",
        "latest_total_fees": 0,
        "latest_total_filled_notional": 0,
        "run_count": 1,
        "strategy_id": "daily_rank_main"
      },
      {
        "latest_ending_buying_power": 2095.2875077000062,
        "latest_fill_ratio": 0.0,
        "latest_fully_filled_order_count": 0,
        "latest_partially_filled_order_count": 0,
        "latest_rejected_order_count": 0,
        "latest_run_at": "2026-04-01T13:30:12.171091+00:00",
        "latest_starting_state_mode": "synced_shadow_snapshot",
        "latest_total_fees": 0,
        "latest_total_filled_notional": 0,
        "run_count": 1,
        "strategy_id": "paper_session"
      }
    ],
    "total_runs": 2
  },
  "shadow_investigation": {
    "accounts": [
      {
        "account_id": "shadow_primary",
        "backtest_only_input_reference_count": 0,
        "backtest_only_selected_symbol_count": 0,
        "detail_count": 0,
        "diagnosis": "aligned",
        "environment": "shadow",
        "feature_context_hint": "Shared feature snapshots match between the latest shadow and backtest contexts.",
        "feature_context_status": "feature_values_aligned",
        "feature_drift_preview": [],
        "focus_symbols": [],
        "hours_between_backtest_and_shadow": 3.272,
        "input_context_hint": "Shadow and backtest recorded the same input references, so follow-up can focus on signals, constraints, or execution behavior.",
        "input_context_status": "inputs_aligned",
        "latest_backtest_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_backtest_decision_manifest_path": "backtest/daily_rank_main/2026/04/01/20260401T101620Z/artifact_manifest.json",
        "latest_backtest_decision_snapshot_path": "backtest/daily_rank_main/2026/04/01/20260401T101620Z/decision_snapshot.json",
        "latest_backtest_feature_manifest_path": "backtest/daily_rank_main/2026/04/01/20260401T101620Z/artifact_manifest.json",
        "latest_backtest_feature_snapshot_path": "backtest/daily_rank_main/2026/04/01/20260401T101620Z/feature_snapshot.json",
        "latest_backtest_input_manifest_count": 2,
        "latest_backtest_manifest_path": "daily_rank_main/2026/04/01/20260401T101620Z/run_manifest.json",
        "latest_backtest_max_drawdown": -0.0004890899999999698,
        "latest_backtest_primary_input_manifest": "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__AAPL.dataset_manifest.json",
        "latest_backtest_run_id": "daily_rank_main:20260401T101620Z",
        "latest_backtest_summary_path": "daily_rank_main/2026/04/01/20260401T101620Z/summary.json",
        "latest_backtest_total_return": 0.014995630000000038,
        "latest_shadow_decision_manifest_path": "shadow/daily_rank_main/2026/04/01/20260401T133241Z/artifact_manifest.json",
        "latest_shadow_decision_snapshot_path": "shadow/daily_rank_main/2026/04/01/20260401T133241Z/decision_snapshot.json",
        "latest_shadow_feature_manifest_path": "shadow/daily_rank_main/2026/04/01/20260401T133241Z/artifact_manifest.json",
        "latest_shadow_feature_snapshot_path": "shadow/daily_rank_main/2026/04/01/20260401T133241Z/feature_snapshot.json",
        "latest_shadow_input_artifact_count": 2,
        "latest_shadow_manifest_path": "daily_rank_main/2026/04/01/20260401T133241Z/run_manifest.json",
        "latest_shadow_positions_path": "daily_rank_main/2026/04/01/20260401T133241Z/positions.jsonl",
        "latest_shadow_primary_input_artifact": "external/curated/local_equity_bars/equity_bars/2026/04/01/20260401T101611Z__AAPL.dataset_manifest.json",
        "latest_shadow_session_id": "daily_rank_main:20260401T133241Z",
        "latest_shadow_strategy_id": "daily_rank_main",
        "latest_shadow_summary_path": "daily_rank_main/2026/04/01/20260401T133241Z/summary.json",
        "latest_sync_activity_outcome": "synced",
        "latest_sync_activity_path": "2026/04/01/20260401T133241539025Z_shadow_primary_synced.json",
        "latest_sync_activity_reason": null,
        "latest_sync_manifest_path": "history/shadow_primary/2026/04/01/20260401T133241Z/sync_manifest.json",
        "latest_sync_snapshot_path": "history/shadow_primary/2026/04/01/20260401T133241Z/snapshot.json",
        "latest_sync_source_label": "internal_paper_account_state",
        "latest_sync_source_reference": "paper_primary",
        "likely_follow_up_hint": "No immediate escalation is needed. Keep monitoring and rerun after the next meaningful input change.",
        "likely_follow_up_lane": "monitor",
        "max_abs_feature_delta": 0.0,
        "max_abs_rank_score_delta": 0.0,
        "max_abs_target_quantity_delta": 0.0,
        "operator_hint": "Latest shadow supervision is aligned with the synced baseline.",
        "ranking_context_hint": "Shared ranked candidates have matching scores in the latest shadow and backtest decision snapshots.",
        "ranking_context_status": "rank_scores_aligned",
        "research_context_hint": "A recent backtest context is available for this strategy, so follow-up can compare research and shadow evidence directly.",
        "research_context_status": "backtest_context_available",
        "severity": "info",
        "shadow_only_input_reference_count": 0,
        "shadow_only_selected_symbol_count": 0,
        "shared_feature_symbol_count": 2,
        "shared_input_reference_count": 2,
        "shared_ranked_candidate_count": 2,
        "shared_selected_symbol_count": 2,
        "shared_target_symbol_count": 2,
        "shifted_feature_field_count": 0,
        "shifted_feature_symbol_count": 0,
        "shifted_rank_score_count": 0,
        "shifted_target_quantity_count": 0,
        "signal_context_hint": "The latest shadow and backtest decision snapshots selected the same symbols.",
        "signal_context_status": "selected_symbols_aligned",
        "target_context_hint": "Shared target positions match between the latest shadow and backtest decision snapshots.",
        "target_context_status": "target_positions_aligned",
        "top_feature_delta_field": null,
        "top_feature_delta_symbol": null,
        "top_rank_score_delta_symbol": null,
        "top_target_quantity_delta_symbol": null
      }
    ],
    "follow_up_count": 0,
    "total_accounts": 1
  },
  "shadow_supervision": {
    "accounts": [
      {
        "account_id": "shadow_primary",
        "diagnosis": "aligned",
        "environment": "shadow",
        "gross_drift_notional": 0.0,
        "hours_between_sync_and_shadow": 0.0,
        "latest_shadow_at": "2026-04-01T13:32:41.551093+00:00",
        "latest_shadow_starting_state_mode": "synced_shadow_snapshot",
        "latest_shadow_strategy_id": "daily_rank_main",
        "latest_sync_activity_at": "2026-04-01T13:32:41.539025+00:00",
        "latest_sync_activity_endpoint": null,
        "latest_sync_activity_outcome": "synced",
        "latest_sync_activity_reason": null,
        "operator_hint": "Latest shadow supervision is aligned with the synced baseline.",
        "quantity_difference_count": 0,
        "request_count_since_sync": 0,
        "severity": "info",
        "shadow_drift_status": "aligned",
        "skipped_refresh_count_since_sync": 0,
        "synced_at": "2026-04-01T13:32:41.539025+00:00",
        "top_difference_symbol": null
      }
    ],
    "aligned_count": 1,
    "critical_count": 0,
    "missing_shadow_run_count": 0,
    "missing_sync_count": 0,
    "recent_sync_drift_count": 0,
    "skipped_refresh_suspect_count": 0,
    "stale_baseline_count": 0,
    "stale_threshold_hours": 24,
    "total_accounts": 1,
    "unsynced_shadow_count": 0,
    "warn_count": 0
  },
  "shadow_sync": {
    "accounts": [
      {
        "account_id": "shadow_primary",
        "buying_power": 2095.2875077000062,
        "environment": "shadow",
        "gross_market_value": 97846.0,
        "net_liquidation_value": 99941.2875077,
        "position_count": 2,
        "source_label": "internal_paper_account_state",
        "source_reference": "paper_primary",
        "synced_at": "2026-04-01T13:32:41.539025+00:00"
      }
    ],
    "total_accounts": 1
  },
  "shadow_sync_activity": {
    "last_activity_at": "2026-04-01T13:32:41.539025+00:00",
    "live_read_count": 0,
    "recent_event_count": 0,
    "recent_events": [],
    "recent_live_read_count": 0,
    "recent_request_count": 0,
    "recent_skipped_event_count": 0,
    "recent_synced_event_count": 0,
    "recent_window_hours": 24,
    "skipped_event_count": 0,
    "synced_event_count": 2,
    "total_events": 2,
    "total_request_count": 0
  },
  "strategy_features": {
    "backtest_dataset_count": 1,
    "paper_dataset_count": 1,
    "shadow_dataset_count": 2,
    "strategies": [
      {
        "backtest_dataset_count": 1,
        "contexts_observed": [
          "backtest",
          "paper",
          "shadow"
        ],
        "latest_context_kind": "shadow",
        "latest_decided_at": "2026-04-01T13:32:41.551093+00:00",
        "latest_eligible_symbol_count": 2,
        "latest_excluded_symbol_count": 0,
        "latest_feature_fields": [
          "close_price",
          "lookback_return",
          "average_volume",
          "average_dollar_volume",
          "realized_volatility"
        ],
        "latest_manifest_path": "internal_strategy/strategy_symbol_features/2026/04/01/20260401T133241Z__daily_rank_main_shadow_2026-03-30.dataset_manifest.json",
        "latest_record_count": 2,
        "latest_selector": "builtin:lookback_return_desc",
        "latest_symbol_sample": [
          "AAPL",
          "MSFT"
        ],
        "latest_trade_date": "2026-03-30",
        "paper_dataset_count": 1,
        "shadow_dataset_count": 2,
        "strategy_id": "daily_rank_main",
        "strategy_profile_name": "daily_rank_main",
        "total_datasets": 4
      }
    ],
    "total_datasets": 4,
    "total_strategies": 1
  },
  "strategy_live_launch": {
    "checklist_status": "ready_for_first_guarded_live_session",
    "command_hints": [
      [
        "python3",
        "scripts/build_platform_readiness_report.py"
      ],
      [
        "python3",
        "scripts/build_strategy_live_cutover_report.py"
      ],
      [
        "python3",
        "scripts/rebuild_operator_views.py"
      ]
    ],
    "current_blocker": null,
    "current_next_action": "Execute the guarded internal live cutover checklist.",
    "current_platform_level": "guarded_internal_live_ready",
    "evidence_paths": [
      "local://internal-quant-platform/results/summary/platform_readiness_summary.md",
      "local://internal-quant-platform/results/summary/strategy_live_cutover/daily_rank_main.md",
      "local://internal-quant-platform/results/summary/strategy_operator_runbooks/daily_rank_main.md"
    ],
    "execution_steps": [
      "Open the reviewed cutover window and explicitly enable the guarded broker-write workflow only inside that window.",
      "Run the approved live execution workflow for the target strategy with conservative operational scope.",
      "Do not widen strategy scope, account scope, or automation scope during the first guarded live session."
    ],
    "generated_at": "2026-05-01T15:17:23.984303+00:00",
    "live_write_mode": "disabled_by_default_outside_reviewed_cutover_window",
    "postflight_steps": [
      "Rebuild operator views immediately after the guarded live session.",
      "Review readiness, cutover, reconciliation, paper risk, and shadow supervision outputs before deciding whether to continue.",
      "Return broker writes to disabled-by-default posture after the reviewed live workflow completes."
    ],
    "preflight_steps": [
      "Confirm the current readiness report still shows guarded_internal_live_ready for this strategy.",
      "Confirm the latest paper reconciliation, paper risk, and synced shadow evidence are still the intended basis for the live cutover.",
      "Confirm the explicit live approval event is already recorded and still reflects the intended cutover scope.",
      "Keep broker writes disabled by default until the reviewed live cutover window is intentionally opened."
    ],
    "stop_conditions": [
      "Stop if the readiness report is no longer guarded_internal_live_ready.",
      "Stop if the latest reconciliation or paper risk status is no longer pass.",
      "Stop if synced shadow evidence is stale, missing, or no longer the intended baseline.",
      "Stop if the live workflow would require enabling writes outside the explicitly reviewed cutover window."
    ],
    "strategy_id": "daily_rank_main",
    "strategy_profile_name": "daily_rank_main"
  },
  "strategy_promotion": {
    "follow_up_count": 1,
    "governance_misaligned_count": 0,
    "packets": [
      {
        "governance_alignment": "aligned",
        "latest_backtest_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_paper_at": "2026-04-01T13:25:30.030831+00:00",
        "latest_shadow_at": "2026-04-01T13:32:41.551093+00:00",
        "missing_evidence": [],
        "missing_evidence_count": 0,
        "observed_stage": "shadow",
        "owner": "Sichen Tao",
        "packet_path": "daily_rank_main.json",
        "primary_action": "Current evidence is consistent for the next promotion step. Prepare the formal stage update.",
        "profile_name": "daily_rank_main",
        "promotion_target_stage": "live",
        "ready_for_promotion": true,
        "registered_stage": "shadow",
        "strategy_id": "daily_rank_main"
      },
      {
        "governance_alignment": "aligned",
        "latest_backtest_at": null,
        "latest_paper_at": null,
        "latest_shadow_at": "2026-04-01T13:30:12.171091+00:00",
        "missing_evidence": [
          "missing versioned data",
          "missing reproducible backtest",
          "missing risk review",
          "missing paper results",
          "missing reconciliation checks",
          "missing operator runbook",
          "missing live approval"
        ],
        "missing_evidence_count": 7,
        "observed_stage": "shadow",
        "owner": null,
        "packet_path": "paper_session.json",
        "primary_action": "Rerun the strategy with recorded input manifests or curated artifacts so lineage is explicit.",
        "profile_name": null,
        "promotion_target_stage": "live",
        "ready_for_promotion": false,
        "registered_stage": "shadow",
        "strategy_id": "paper_session"
      }
    ],
    "ready_for_promotion_count": 1,
    "total_packets": 2
  },
  "strategy_registry": {
    "live_approval_count": 1,
    "ready_for_next_stage_count": 1,
    "strategies": [
      {
        "configured": true,
        "has_live_approval": true,
        "has_operator_runbook": true,
        "has_paper_results": true,
        "has_reconciliation_checks": true,
        "has_reproducible_backtest": true,
        "has_risk_review": true,
        "has_shadow_results": true,
        "has_synced_shadow_results": true,
        "has_versioned_data": true,
        "latest_backtest_at": "2026-04-01T10:16:20.777363+00:00",
        "latest_backtest_total_return": 0.014995630000000038,
        "latest_incident_count": 0,
        "latest_live_approval_at": "2026-04-01T14:07:31.618774+00:00",
        "latest_paper_at": "2026-04-01T13:25:30.030831+00:00",
        "latest_paper_fill_ratio": 1.0,
        "latest_paper_risk_status": "pass",
        "latest_reconciliation_status": "pass",
        "latest_shadow_at": "2026-04-01T13:32:41.551093+00:00",
        "latest_shadow_fill_ratio": 0.0,
        "latest_shadow_starting_state_mode": "synced_shadow_snapshot",
        "missing_evidence": [],
        "missing_evidence_count": 0,
        "next_stage": "live",
        "observed_stage": "shadow",
        "owner": "Sichen Tao",
        "profile_name": "daily_rank_main",
        "ready_for_next_stage": true,
        "registered_stage": "shadow",
        "strategy_id": "daily_rank_main",
        "updated_at": "2026-04-01T13:35:43.743555+00:00"
      },
      {
        "configured": false,
        "has_live_approval": false,
        "has_operator_runbook": false,
        "has_paper_results": false,
        "has_reconciliation_checks": false,
        "has_reproducible_backtest": false,
        "has_risk_review": false,
        "has_shadow_results": true,
        "has_synced_shadow_results": true,
        "has_versioned_data": false,
        "latest_backtest_at": null,
        "latest_backtest_total_return": null,
        "latest_incident_count": 0,
        "latest_live_approval_at": null,
        "latest_paper_at": null,
        "latest_paper_fill_ratio": null,
        "latest_paper_risk_status": null,
        "latest_reconciliation_status": null,
        "latest_shadow_at": "2026-04-01T13:30:12.171091+00:00",
        "latest_shadow_fill_ratio": 0.0,
        "latest_shadow_starting_state_mode": "synced_shadow_snapshot",
        "missing_evidence": [
          "missing versioned data",
          "missing reproducible backtest",
          "missing risk review",
          "missing paper results",
          "missing reconciliation checks",
          "missing operator runbook",
          "missing live approval"
        ],
        "missing_evidence_count": 7,
        "next_stage": "live",
        "observed_stage": "shadow",
        "owner": null,
        "profile_name": null,
        "ready_for_next_stage": false,
        "registered_stage": "shadow",
        "strategy_id": "paper_session",
        "updated_at": null
      }
    ],
    "total_strategies": 2
  },
  "workflow_summary": {
    "curated_cards": [
      {
        "artifact_count": 4,
        "dataset_name": "strategy_symbol_features",
        "latest_timestamp": "2026-04-01T13:32:41.551093+00:00",
        "layer": "curated",
        "source_name": "internal_strategy",
        "total_bytes": 0
      },
      {
        "artifact_count": 2,
        "dataset_name": "equity_bars",
        "latest_timestamp": "2026-04-01T10:16:11.179493+00:00",
        "layer": "curated",
        "source_name": "local_equity_bars",
        "total_bytes": 0
      }
    ],
    "raw_cards": [
      {
        "artifact_count": 2,
        "dataset_name": "equity_bars_csv",
        "latest_timestamp": "2026-04-01T10:16:11.179493+00:00",
        "layer": "raw",
        "source_name": "local_equity_bars",
        "total_bytes": 3368
      }
    ],
    "reference_data": {
      "alias_count": 0,
      "quality_fail_count": 0,
      "quality_report_count": 2,
      "quality_warn_count": 0,
      "security_count": 0,
      "seed_candidate_count": 0,
      "storage_path": null
    }
  }
};
