const data = window.INTERNAL_QUANT_DASHBOARD_DATA || {
  workflow_summary: { raw_cards: [], curated_cards: [], reference_data: {} },
  strategy_registry: { total_strategies: 0, ready_for_next_stage_count: 0, live_approval_count: 0, strategies: [] },
  strategy_features: { total_datasets: 0, total_strategies: 0, backtest_dataset_count: 0, paper_dataset_count: 0, shadow_dataset_count: 0, strategies: [] },
  strategy_promotion: { total_packets: 0, ready_for_promotion_count: 0, governance_misaligned_count: 0, follow_up_count: 0, packets: [] },
  platform_readiness: {
    generated_at: null,
    strategy_id: null,
    profile_name: null,
    v1_status: "unknown",
    current_platform_level: "unknown",
    practical_answer: "No readiness report yet.",
    current_bounded_goal: null,
    current_blocker: null,
    current_next_action: null,
    current_command_hint: [],
    research_backtest_status: "unknown",
    paper_trading_status: "unknown",
    shadow_status: "unknown",
    live_trading_status: "unknown",
    live_broker_write_path_present: false,
    v1_gap_count: 0,
    v1_missing_items: [],
    capabilities: [],
  },
  strategy_live_launch: {
    strategy_id: null,
    strategy_profile_name: null,
    generated_at: null,
    checklist_status: "unknown",
    current_platform_level: "unknown",
    current_blocker: null,
    current_next_action: null,
    live_write_mode: "disabled_by_default_outside_reviewed_cutover_window",
    preflight_steps: [],
    execution_steps: [],
    postflight_steps: [],
    stop_conditions: [],
    command_hints: [],
    evidence_paths: [],
  },
  backtest_history: { total_runs: 0, strategies: [] },
  backtest_launcher: {
    generated_at: null,
    default_profile_name: null,
    total_profiles: 0,
    profiles: [],
  },
  backtest_workbench: {
    generated_at: null,
    total_runs: 0,
    total_strategies: 0,
    latest_run_at: null,
    strategies: [],
  },
  paper_history: { total_runs: 0, strategies: [] },
  shadow_history: { total_runs: 0, strategies: [] },
  shadow_sync: { total_accounts: 0, accounts: [] },
  shadow_sync_activity: {
    total_events: 0,
    synced_event_count: 0,
    skipped_event_count: 0,
    total_request_count: 0,
    live_read_count: 0,
    recent_window_hours: 24,
    recent_event_count: 0,
    recent_synced_event_count: 0,
    recent_skipped_event_count: 0,
    recent_request_count: 0,
    recent_live_read_count: 0,
    last_activity_at: null,
    recent_events: [],
  },
  shadow_supervision: {
    total_accounts: 0,
    stale_threshold_hours: 24,
    critical_count: 0,
    warn_count: 0,
    aligned_count: 0,
    missing_sync_count: 0,
    missing_shadow_run_count: 0,
    unsynced_shadow_count: 0,
    stale_baseline_count: 0,
    skipped_refresh_suspect_count: 0,
    recent_sync_drift_count: 0,
    accounts: [],
  },
  shadow_investigation: {
    total_accounts: 0,
    follow_up_count: 0,
    accounts: [],
  },
  shadow_drift: { total_accounts: 0, drifted_account_count: 0, missing_sync_count: 0, missing_shadow_run_count: 0, non_synced_run_count: 0, accounts: [] },
  paper_accounts: { total_accounts: 0, accounts: [] },
  paper_reconciliation: { total_reports: 0, failing_report_count: 0, latest_reports: [] },
  paper_risk: { total_accounts: 0, failing_account_count: 0, kill_switch_count: 0, accounts: [] },
  paper_incidents: { total_incidents: 0, critical_incident_count: 0, latest_reports: [] },
};

const workflow = data.workflow_summary || {};
const strategyRegistry = data.strategy_registry || {};
const strategyFeatures = data.strategy_features || {};
const strategyPromotion = data.strategy_promotion || {};
const platformReadiness = data.platform_readiness || {};
const strategyLiveLaunch = data.strategy_live_launch || {};
const backtests = data.backtest_history || {};
const backtestLauncher = data.backtest_launcher || {};
const backtestWorkbench = data.backtest_workbench || {};
const paper = data.paper_history || {};
const shadow = data.shadow_history || {};
const shadowSync = data.shadow_sync || {};
const shadowSyncActivity = data.shadow_sync_activity || {};
const shadowSupervision = data.shadow_supervision || {};
const shadowInvestigation = data.shadow_investigation || {};
const shadowDrift = data.shadow_drift || {};
const paperAccounts = data.paper_accounts || {};
const paperReconciliation = data.paper_reconciliation || {};
const paperRisk = data.paper_risk || {};
const paperIncidents = data.paper_incidents || {};

renderTopCards();
renderPlatformReadinessTable();
renderStrategyLiveLaunchTable();
renderStrategyRegistryTable();
renderStrategyFeatureTable();
renderBacktestLauncher();
renderBacktestWorkbench();
renderStrategyPromotionTable();
renderStrategyTable();
renderPaperTable();
renderShadowTable();
renderShadowSyncTable();
renderShadowSyncActivityTable();
renderShadowSupervisionTable();
renderShadowInvestigationTable();
renderShadowDriftTable();
renderPaperAccountsTable();
renderPaperReconciliationTable();
renderPaperRiskTable();
renderPaperIncidentsTable();
renderWorkflowCards("raw-cards", workflow.raw_cards || []);
renderWorkflowCards("curated-cards", workflow.curated_cards || []);

function renderTopCards() {
  const ref = workflow.reference_data || {};
  const paperStrategies = paper.strategies || [];
  const latestPaperRejects = paperStrategies.reduce((sum, item) => sum + Number(item.latest_rejected_order_count || 0), 0);
  const cards = [
    ["Platform Level", platformReadiness.current_platform_level || "n/a", "Current operating level for the bounded v1 path"],
    ["Live Status", platformReadiness.live_trading_status || "n/a", "Whether guarded internal live trading is actually ready now"],
    ["Live Launch", strategyLiveLaunch.checklist_status || "n/a", "Whether the first guarded internal live-cutover checklist is actually clear to execute"],
    ["Strategies", strategyRegistry.total_strategies ?? 0, "Configured or observed strategies in the workflow registry"],
    ["Ready To Promote", strategyRegistry.ready_for_next_stage_count ?? 0, "Strategies that satisfy the next promotion gate"],
    ["Live Approved", strategyRegistry.live_approval_count ?? 0, "Strategies with recorded live-stage approval"],
    ["Promotion Follow-ups", strategyPromotion.follow_up_count ?? 0, "Strategies whose promotion packet still shows missing evidence or governance misalignment"],
    ["Feature Datasets", strategyFeatures.total_datasets ?? 0, "Curated strategy feature datasets available for research reuse and investigation"],
    ["Backtest Runs", backtests.total_runs ?? 0, "Stored strategy backtest runs"],
    ["Launcher Profiles", backtestLauncher.total_profiles ?? 0, "Configured strategy profiles ready to generate new backtest commands and reuse existing input bundles"],
    ["Workbench Strategies", backtestWorkbench.total_strategies ?? 0, "Strategies with detailed backtest workbench evidence ready for visual review"],
    ["Paper Runs", paper.total_runs ?? 0, "Stored paper OMS sessions"],
    ["Shadow Runs", shadow.total_runs ?? 0, "Stored shadow execution sessions"],
    ["Shadow Sync Accounts", shadowSync.total_accounts ?? 0, "Current synced shadow baselines available to seed shadow runs"],
    [`Shadow API Reads ${shadowSyncActivity.recent_window_hours ?? 24}h`, shadowSyncActivity.recent_request_count ?? 0, "Read-only broker requests recorded in the recent sync-activity window"],
    [`Shadow Sync Skips ${shadowSyncActivity.recent_window_hours ?? 24}h`, shadowSyncActivity.recent_skipped_event_count ?? 0, "Sync attempts intentionally skipped by freshness guards or operator policy"],
    ["Shadow Supervision Alerts", (shadowSupervision.critical_count ?? 0) + (shadowSupervision.warn_count ?? 0), "Accounts whose latest shadow supervision needs operator attention or deeper investigation"],
    ["Shadow Investigation Queue", shadowInvestigation.follow_up_count ?? 0, "Accounts whose supervision diagnosis should be followed with concrete evidence review"],
    ["Paper Accounts", paperAccounts.total_accounts ?? 0, "Persisted paper account states"],
    ["Paper Rejects", latestPaperRejects, "Latest rejected order count across paper sessions"],
    ["Recon Fails", paperReconciliation.failing_report_count ?? 0, "Internal paper reconciliation failures"],
    ["Kill Switches", paperRisk.kill_switch_count ?? 0, "Accounts currently blocked by paper risk controls"],
    ["Critical Incidents", paperIncidents.critical_incident_count ?? 0, "Critical paper operations incidents recorded"],
    ["Quality Alerts", (ref.quality_warn_count ?? 0) + (ref.quality_fail_count ?? 0), "Warn + fail quality reports"],
  ];

  document.getElementById("top-cards").innerHTML = cards
    .map(
      ([label, value, note]) => `
        <article class="metric-card">
          <p class="metric-label">${escapeHtml(label)}</p>
          <p class="metric-value">${escapeHtml(String(value))}</p>
          <p class="metric-note">${escapeHtml(note)}</p>
        </article>
      `
    )
    .join("");
}

function renderStrategyLiveLaunchTable() {
  const container = document.getElementById("strategy-live-launch-table");

  if (!strategyLiveLaunch.strategy_id) {
    container.innerHTML = `<p class="empty">No guarded live launch checklist yet. Build the live launch checklist and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="stack">
      <article class="workflow-card">
        <div>
          <p class="workflow-title">${escapeHtml(strategyLiveLaunch.strategy_id || "n/a")}</p>
          <p class="workflow-meta">Checklist: ${escapeHtml(strategyLiveLaunch.checklist_status || "unknown")} / level: ${escapeHtml(strategyLiveLaunch.current_platform_level || "unknown")}</p>
        </div>
        <div class="workflow-side">
          <p>${escapeHtml(strategyLiveLaunch.live_write_mode || "n/a")}</p>
          <p>${escapeHtml(strategyLiveLaunch.current_next_action || "n/a")}</p>
        </div>
      </article>
      <p><strong>Current blocker:</strong> ${escapeHtml(strategyLiveLaunch.current_blocker || "none")}</p>
      <p><strong>Next action:</strong> ${escapeHtml(strategyLiveLaunch.current_next_action || "none")}</p>
      <p><strong>Preflight:</strong> ${escapeHtml(String((strategyLiveLaunch.preflight_steps || []).length))} steps</p>
      <p><strong>Execution:</strong> ${escapeHtml(String((strategyLiveLaunch.execution_steps || []).length))} steps</p>
      <p><strong>Postflight:</strong> ${escapeHtml(String((strategyLiveLaunch.postflight_steps || []).length))} steps</p>
      <p><strong>Stop conditions:</strong> ${escapeHtml(String((strategyLiveLaunch.stop_conditions || []).length))}</p>
      <table class="table">
        <thead>
          <tr>
            <th>Phase</th>
            <th>Steps</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Preflight</td>
            <td>${escapeHtml((strategyLiveLaunch.preflight_steps || []).join(" | ") || "none")}</td>
          </tr>
          <tr>
            <td>Execution</td>
            <td>${escapeHtml((strategyLiveLaunch.execution_steps || []).join(" | ") || "none")}</td>
          </tr>
          <tr>
            <td>Postflight</td>
            <td>${escapeHtml((strategyLiveLaunch.postflight_steps || []).join(" | ") || "none")}</td>
          </tr>
          <tr>
            <td>Stop Conditions</td>
            <td>${escapeHtml((strategyLiveLaunch.stop_conditions || []).join(" | ") || "none")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderPlatformReadinessTable() {
  const container = document.getElementById("platform-readiness-table");
  const capabilities = platformReadiness.capabilities || [];

  if (!capabilities.length) {
    container.innerHTML = `<p class="empty">No platform readiness report yet. Build the readiness report and rebuild operator views.</p>`;
    return;
  }

  container.innerHTML = `
    <div class="stack">
      <article class="workflow-card">
        <div>
          <p class="workflow-title">${escapeHtml(platformReadiness.strategy_id || "n/a")}</p>
          <p class="workflow-meta">Current level: ${escapeHtml(platformReadiness.current_platform_level || "unknown")} / v1: ${escapeHtml(platformReadiness.v1_status || "unknown")}</p>
        </div>
        <div class="workflow-side">
          <p>${escapeHtml(platformReadiness.paper_trading_status || "unknown")}</p>
          <p>${escapeHtml(platformReadiness.live_trading_status || "unknown")}</p>
        </div>
      </article>
      <p>${escapeHtml(platformReadiness.practical_answer || "No practical answer yet.")}</p>
      <p><strong>Current bounded goal:</strong> ${escapeHtml(platformReadiness.current_bounded_goal || "n/a")}</p>
      <p><strong>Current blocker:</strong> ${escapeHtml(platformReadiness.current_blocker || "none")}</p>
      <p><strong>Next action:</strong> ${escapeHtml(platformReadiness.current_next_action || "none")}</p>
      <p><strong>V1 gaps:</strong> ${escapeHtml((platformReadiness.v1_missing_items || []).join(", ") || "clear")}</p>
      <table class="table">
        <thead>
          <tr>
            <th>Capability</th>
            <th>Status</th>
            <th>Detail</th>
            <th>Blockers</th>
            <th>Next Actions</th>
          </tr>
        </thead>
        <tbody>
          ${capabilities
            .map(
              (item) => `
                <tr>
                  <td>${escapeHtml(item.label)}</td>
                  <td>${escapeHtml(item.status)}</td>
                  <td>${escapeHtml(item.detail)}</td>
                  <td>${escapeHtml((item.blockers || []).join(", ") || "clear")}</td>
                  <td>${escapeHtml((item.next_actions || []).join(" | ") || "none")}</td>
                </tr>
              `
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderStrategyRegistryTable() {
  const strategies = strategyRegistry.strategies || [];
  const container = document.getElementById("strategy-registry-table");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No strategy registry summary yet. Rebuild operator views after registering a strategy or running research workflows.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Stage</th>
          <th>Observed</th>
          <th>Next</th>
          <th>Ready</th>
          <th>Missing</th>
          <th>Backtest</th>
          <th>Paper</th>
          <th>Shadow</th>
          <th>Shadow Mode</th>
          <th>Risk</th>
        </tr>
      </thead>
      <tbody>
        ${strategies
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_id)}</td>
                <td>${escapeHtml(item.registered_stage)}</td>
                <td>${escapeHtml(item.observed_stage)}</td>
                <td>${escapeHtml(item.next_stage || "none")}</td>
                <td>${escapeHtml(item.ready_for_next_stage ? "yes" : "no")}</td>
                <td>${escapeHtml(item.missing_evidence_count ? item.missing_evidence.join(", ") : "clear")}</td>
                <td>${escapeHtml(item.latest_backtest_at || "n/a")}</td>
                <td>${escapeHtml(item.latest_paper_at || "n/a")}</td>
                <td>${escapeHtml(item.latest_shadow_at || "n/a")}</td>
                <td>${escapeHtml(item.latest_shadow_starting_state_mode || "n/a")}</td>
                <td>${escapeHtml(item.latest_paper_risk_status || "n/a")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderStrategyFeatureTable() {
  const strategies = strategyFeatures.strategies || [];
  const container = document.getElementById("strategy-feature-table");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No curated strategy feature datasets yet. Run a backtest, paper, or shadow workflow and rebuild operator views.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Profile</th>
          <th>Datasets</th>
          <th>Contexts</th>
          <th>Latest</th>
          <th>Trade Date</th>
          <th>Eligible</th>
          <th>Features</th>
          <th>Sample Symbols</th>
        </tr>
      </thead>
      <tbody>
        ${strategies
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_id)}</td>
                <td>${escapeHtml(item.strategy_profile_name || "n/a")}</td>
                <td>${escapeHtml(String(item.total_datasets))}</td>
                <td>${escapeHtml((item.contexts_observed || []).join(", "))}</td>
                <td>${escapeHtml(item.latest_context_kind || "n/a")}</td>
                <td>${escapeHtml(item.latest_trade_date || "n/a")}</td>
                <td>${escapeHtml(String(item.latest_eligible_symbol_count ?? 0))}</td>
                <td>${escapeHtml((item.latest_feature_fields || []).join(", ") || "n/a")}</td>
                <td>${escapeHtml((item.latest_symbol_sample || []).join(", ") || "n/a")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderStrategyPromotionTable() {
  const packets = strategyPromotion.packets || [];
  const container = document.getElementById("strategy-promotion-table");

  if (!packets.length) {
    container.innerHTML = `<p class="empty">No strategy promotion packets yet. Build promotion packets after registry and workflow evidence exist.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Registered</th>
          <th>Observed</th>
          <th>Target</th>
          <th>Ready</th>
          <th>Alignment</th>
          <th>Missing</th>
          <th>Next Action</th>
          <th>Packet</th>
        </tr>
      </thead>
      <tbody>
        ${packets
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_id)}</td>
                <td>${escapeHtml(item.registered_stage)}</td>
                <td>${escapeHtml(item.observed_stage)}</td>
                <td>${escapeHtml(item.promotion_target_stage || "none")}</td>
                <td>${escapeHtml(item.ready_for_promotion ? "yes" : "no")}</td>
                <td>${escapeHtml(item.governance_alignment)}</td>
                <td>${escapeHtml(item.missing_evidence_count ? item.missing_evidence.join(", ") : "clear")}</td>
                <td>${escapeHtml(item.primary_action || "none")}</td>
                <td>${escapeHtml(formatPromotionPacketPath(item.packet_path))}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderStrategyTable() {
  const strategies = backtests.strategies || [];
  const container = document.getElementById("strategy-table");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No backtest history yet. Run a backtest and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Runs</th>
          <th>Latest Return</th>
          <th>Best Return</th>
          <th>Latest Drawdown</th>
          <th>Latest Run</th>
        </tr>
      </thead>
      <tbody>
        ${strategies
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_name)}</td>
                <td>${escapeHtml(String(item.run_count))}</td>
                <td>${formatPct(item.latest_total_return)}</td>
                <td>${formatPct(item.best_total_return)}</td>
                <td>${formatPct(item.latest_max_drawdown)}</td>
                <td>${escapeHtml(item.latest_run_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderBacktestLauncher() {
  const container = document.getElementById("backtest-launcher");
  const profiles = backtestLauncher.profiles || [];

  if (!profiles.length) {
    container.innerHTML = `<p class="empty">No launcher profiles yet. Add strategy profiles and rebuild console data.</p>`;
    return;
  }

  const defaultProfile = backtestLauncher.default_profile_name || profiles[0].profile_name;
  container.innerHTML = `
    <div class="stack">
      <article class="workflow-card">
        <div>
          <p class="workflow-title">Backtest Launcher</p>
          <p class="workflow-meta">Generate bounded backtest commands from registered strategy profiles and existing input bundles.</p>
        </div>
        <div class="workflow-side">
          <p>${escapeHtml(String(profiles.length))} profiles</p>
          <p>${escapeHtml(defaultProfile)}</p>
        </div>
      </article>
      <div class="launcher-grid">
        <div class="launcher-field">
          <label for="launcher-profile">Strategy Profile</label>
          <select id="launcher-profile">
            ${profiles
              .map((profile) => `<option value="${escapeHtml(profile.profile_name)}"${profile.profile_name === defaultProfile ? " selected" : ""}>${escapeHtml(profile.profile_name)} / ${escapeHtml(profile.strategy_id)}</option>`)
              .join("")}
          </select>
        </div>
        <div class="launcher-field">
          <label for="launcher-timeframe">Timeframe</label>
          <input id="launcher-timeframe" value="1Day" />
        </div>
        <div class="launcher-field">
          <label for="launcher-start">Start</label>
          <input id="launcher-start" value="" placeholder="2026-01-01T00:00:00Z" />
        </div>
        <div class="launcher-field">
          <label for="launcher-end">End</label>
          <input id="launcher-end" value="" placeholder="2026-03-31T00:00:00Z" />
        </div>
        <div class="launcher-field">
          <label for="launcher-symbols">Symbols</label>
          <input id="launcher-symbols" value="" placeholder="AAPL, MSFT, NVDA" />
        </div>
        <div class="launcher-field">
          <label for="launcher-batch-size">Batch Size</label>
          <input id="launcher-batch-size" value="5" />
        </div>
        <div class="launcher-field">
          <label for="launcher-pause-seconds">Pause Seconds</label>
          <input id="launcher-pause-seconds" value="3" />
        </div>
        <div class="launcher-field">
          <label for="launcher-csv">Local CSV</label>
          <input id="launcher-csv" value="" placeholder="/abs/path/history.csv" />
        </div>
      </div>
      <div class="kv-grid">
        <article class="kv-card">
          <strong>Latest Bundle</strong>
          <div id="launcher-bundle-summary">n/a</div>
        </article>
        <article class="kv-card">
          <strong>Latest Run</strong>
          <div id="launcher-run-summary">n/a</div>
        </article>
        <article class="kv-card">
          <strong>Selector</strong>
          <div id="launcher-selector-summary">n/a</div>
        </article>
        <article class="kv-card">
          <strong>Profile Constraints</strong>
          <div id="launcher-constraint-summary">n/a</div>
        </article>
      </div>
      <div class="stack">
        <div>
          <p><strong>Run Existing Bundle</strong></p>
          <pre class="launcher-command" id="launcher-bundle-command"></pre>
        </div>
        <div>
          <p><strong>Prepare New Inputs Then Backtest</strong></p>
          <pre class="launcher-command" id="launcher-prepare-command"></pre>
        </div>
        <div>
          <p><strong>Import Local CSV Then Backtest</strong></p>
          <pre class="launcher-command" id="launcher-csv-command"></pre>
        </div>
      </div>
      <p class="empty">This launcher is intentionally command-generating rather than directly executing. It keeps the console lightweight while still giving you a visual backtest startup surface now.</p>
    </div>
  `;

  const profileSelect = document.getElementById("launcher-profile");
  const timeframeInput = document.getElementById("launcher-timeframe");
  const startInput = document.getElementById("launcher-start");
  const endInput = document.getElementById("launcher-end");
  const symbolsInput = document.getElementById("launcher-symbols");
  const batchSizeInput = document.getElementById("launcher-batch-size");
  const pauseSecondsInput = document.getElementById("launcher-pause-seconds");
  const csvInput = document.getElementById("launcher-csv");
  const refresh = () =>
    updateBacktestLauncher(
      profileSelect.value,
      timeframeInput.value,
      startInput.value,
      endInput.value,
      symbolsInput.value,
      batchSizeInput.value,
      pauseSecondsInput.value,
      csvInput.value
    );
  [profileSelect, timeframeInput, startInput, endInput, symbolsInput, batchSizeInput, pauseSecondsInput, csvInput].forEach((element) => element.addEventListener("input", refresh));
  profileSelect.addEventListener("change", refresh);
  refresh();
}

function updateBacktestLauncher(profileName, timeframe, start, end, symbolsRaw, batchSizeRaw, pauseSecondsRaw, csvPathRaw) {
  const profiles = backtestLauncher.profiles || [];
  const profile = profiles.find((item) => item.profile_name === profileName) || profiles[0];
  if (!profile) {
    return;
  }
  const bundle = profile.latest_bundle || null;
  const safeTimeframe = timeframe || bundle?.timeframe || "1Day";
  const safeStart = start || bundle?.start || "<START>";
  const safeEnd = end || bundle?.end || "<END>";
  const safeSymbols = normalizeLauncherSymbols(symbolsRaw || (bundle?.symbols || []).join(", "));
  const batchSize = normalizePositiveInteger(batchSizeRaw, 5);
  const pauseSeconds = normalizeNonNegativeNumber(pauseSecondsRaw, 3);
  const csvPath = (csvPathRaw || "").trim() || "<CSV_PATH>";
  const defaultBundlePath = bundle?.bundle_path || `results/summary/backtest_input_bundles/${profile.strategy_id}.json`;

  document.getElementById("launcher-bundle-summary").textContent = bundle
    ? `${bundle.timeframe} | ${bundle.start} -> ${bundle.end} | ${bundle.symbol_count} symbols | ${bundle.source_name}`
    : "No prepared bundle yet";
  document.getElementById("launcher-run-summary").textContent = profile.latest_run_at
    ? `${profile.latest_run_at} (${profile.latest_run_id || "run"})`
    : "No backtest run yet";
  document.getElementById("launcher-selector-summary").textContent = `${profile.selector} | lookback ${profile.lookback_bars} | top ${profile.top_n}`;
  document.getElementById("launcher-constraint-summary").textContent = `min price ${profile.min_price} | initial cash ${formatMoney(profile.backtest_initial_cash)} | cost ${formatPct(profile.backtest_transaction_cost_bps / 10000)}`;

  const bundleCommand = profile.bundle_run_command_hint?.length
    ? profile.bundle_run_command_hint.join(" ")
    : `python3 scripts/run_backtest.py --profile ${profile.profile_name} --input-bundle ${defaultBundlePath}`;
  const prepareCommand = `python3 scripts/prepare_backtest_inputs.py --profile ${profile.profile_name} --batch-size ${batchSize} --pause-seconds ${pauseSeconds} ${safeTimeframe} ${safeStart} ${safeEnd} ${safeSymbols || "<SYMBOLS...>"} --execute\npython3 scripts/run_backtest.py --profile ${profile.profile_name} --input-bundle results/summary/backtest_input_bundles/${profile.strategy_id}.json`;
  const csvCommand = `python3 scripts/import_equity_bars_csv.py ${csvPath} --profile ${profile.profile_name} --write-bundle\npython3 scripts/run_backtest.py --profile ${profile.profile_name} --input-bundle results/summary/backtest_input_bundles/${profile.strategy_id}.json`;

  document.getElementById("launcher-bundle-command").textContent = bundleCommand;
  document.getElementById("launcher-prepare-command").textContent = prepareCommand;
  document.getElementById("launcher-csv-command").textContent = csvCommand;
}

function normalizeLauncherSymbols(value) {
  const tokens = String(value || "")
    .replaceAll(",", " ")
    .split(/\s+/)
    .map((item) => item.trim().toUpperCase())
    .filter(Boolean);
  return tokens.join(" ");
}

function normalizePositiveInteger(value, fallback) {
  const parsed = Number.parseInt(String(value || "").trim(), 10);
  if (Number.isFinite(parsed) && parsed > 0) {
    return String(parsed);
  }
  return String(fallback);
}

function normalizeNonNegativeNumber(value, fallback) {
  const parsed = Number.parseFloat(String(value || "").trim());
  if (Number.isFinite(parsed) && parsed >= 0) {
    return String(parsed);
  }
  return String(fallback);
}

function renderBacktestWorkbench() {
  const strategies = backtestWorkbench.strategies || [];
  const container = document.getElementById("backtest-workbench");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No backtest workbench summary yet. Run a backtest and rebuild operator views.</p>`;
    return;
  }

  container.innerHTML = strategies
    .map((strategy) => {
      const latest = strategy.latest_run || {};
      const overview = latest.overview || {};
      const comparison = latest.comparison_to_previous || null;
      const equityCurve = latest.equity_curve || [];
      const orders = latest.orders || [];
      const runRows = (strategy.runs || [])
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.run_id)}</td>
              <td>${escapeHtml(item.executed_at)}</td>
              <td>${escapeHtml(item.strategy_profile_name || "n/a")}</td>
              <td>${escapeHtml(formatDateRange(item.trade_date_start, item.trade_date_end))}</td>
              <td>${formatPct(item.total_return)}</td>
              <td>${formatPct(item.max_drawdown)}</td>
              <td>${formatMoney(item.final_equity)}</td>
              <td>${escapeHtml(String(item.order_count ?? 0))}</td>
              <td>${formatMoney(item.total_turnover)}</td>
            </tr>
          `
        )
        .join("");
      const orderRows = orders
        .slice(0, 12)
        .map(
          (item) => `
            <tr>
              <td>${escapeHtml(item.trade_date)}</td>
              <td>${escapeHtml(item.symbol)}</td>
              <td>${escapeHtml(item.side)}</td>
              <td>${escapeHtml(formatSignedNumber(item.quantity))}</td>
              <td>${formatMoney(item.fill_price)}</td>
              <td>${formatMoney(item.notional)}</td>
              <td>${formatMoney(item.transaction_cost)}</td>
            </tr>
          `
        )
        .join("");

      return `
        <section class="stack">
          <article class="workflow-card">
            <div>
              <p class="workflow-title">${escapeHtml(strategy.strategy_name)}</p>
              <p class="workflow-meta">Latest run ${escapeHtml(strategy.latest_run_at || "n/a")} / profile ${escapeHtml(strategy.latest_profile_name || "n/a")}</p>
            </div>
            <div class="workflow-side">
              <p>${escapeHtml(String(strategy.run_count ?? 0))} runs</p>
              <p>${formatPct(strategy.best_total_return)}</p>
            </div>
          </article>

          <div class="kv-grid">
            <article class="kv-card">
              <strong>Latest Return</strong>
              <div>${formatPct(overview.total_return)}</div>
            </article>
            <article class="kv-card">
              <strong>Final Equity</strong>
              <div>${formatMoney(overview.final_equity)}</div>
            </article>
            <article class="kv-card">
              <strong>Max Drawdown</strong>
              <div>${formatPct(overview.max_drawdown)}</div>
            </article>
            <article class="kv-card">
              <strong>Date Range</strong>
              <div>${escapeHtml(formatDateRange(overview.trade_date_start, overview.trade_date_end))}</div>
            </article>
            <article class="kv-card">
              <strong>Orders</strong>
              <div>${escapeHtml(String(overview.order_count ?? 0))} (${escapeHtml(String(overview.buy_count ?? 0))} buy / ${escapeHtml(String(overview.sell_count ?? 0))} sell)</div>
            </article>
            <article class="kv-card">
              <strong>Inputs</strong>
              <div>${escapeHtml(String((overview.input_manifests || []).length))} manifests</div>
            </article>
          </div>

          ${
            comparison
              ? `<p><strong>Compared with previous run:</strong> return ${formatSignedPct(comparison.delta_total_return)}, final equity ${formatSignedMoney(comparison.delta_final_equity)}, drawdown ${formatSignedPct(comparison.delta_max_drawdown)}, orders ${formatSignedInteger(comparison.delta_order_count)}.</p>`
              : `<p><strong>Compared with previous run:</strong> n/a</p>`
          }

          <div class="chart-grid">
            <article class="chart-card">
              <h3>Equity Curve</h3>
              <p class="chart-meta">Daily net liquidation style equity path for the latest run.</p>
              ${renderLineChartSvg(equityCurve.map((item) => item.equity), {
                stroke: "#0e6b5c",
                fill: "rgba(14, 107, 92, 0.10)",
                baseline: null,
                labelMin: formatMoney(minBy(equityCurve, "equity")),
                labelMax: formatMoney(maxBy(equityCurve, "equity")),
              })}
            </article>
            <article class="chart-card">
              <h3>Drawdown Curve</h3>
              <p class="chart-meta">Peak-to-trough loss path for the same latest run.</p>
              ${renderLineChartSvg(equityCurve.map((item) => item.drawdown), {
                stroke: "#a44a3f",
                fill: "rgba(164, 74, 63, 0.10)",
                baseline: 0,
                labelMin: formatPct(minBy(equityCurve, "drawdown")),
                labelMax: formatPct(maxBy(equityCurve, "drawdown")),
              })}
            </article>
          </div>

          <p><strong>Symbols traded:</strong> ${escapeHtml((overview.symbols_traded || []).join(", ") || "n/a")}</p>
          <p class="mono-note"><strong>Input manifests:</strong> ${escapeHtml((overview.input_manifests || []).join(" | ") || "n/a")}</p>

          <table class="table">
            <thead>
              <tr>
                <th>Run</th>
                <th>Executed</th>
                <th>Profile</th>
                <th>Range</th>
                <th>Return</th>
                <th>Drawdown</th>
                <th>Final Equity</th>
                <th>Orders</th>
                <th>Turnover</th>
              </tr>
            </thead>
            <tbody>
              ${runRows}
            </tbody>
          </table>

          <table class="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Symbol</th>
                <th>Side</th>
                <th>Qty</th>
                <th>Fill</th>
                <th>Notional</th>
                <th>Cost</th>
              </tr>
            </thead>
            <tbody>
              ${orderRows || `<tr><td colspan="7">No orders in latest run.</td></tr>`}
            </tbody>
          </table>
        </section>
      `;
    })
    .join("");
}

function renderPaperTable() {
  const strategies = paper.strategies || [];
  const container = document.getElementById("paper-table");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No paper OMS history yet. Persist a paper session and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Runs</th>
          <th>Fill Ratio</th>
          <th>Mode</th>
          <th>Rejected</th>
          <th>Fully Filled</th>
          <th>Partial</th>
          <th>Buying Power</th>
          <th>Latest Run</th>
        </tr>
      </thead>
      <tbody>
        ${strategies
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_id)}</td>
                <td>${escapeHtml(String(item.run_count))}</td>
                <td>${formatPct(item.latest_fill_ratio)}</td>
                <td>${escapeHtml(item.latest_starting_state_mode || "n/a")}</td>
                <td>${escapeHtml(String(item.latest_rejected_order_count))}</td>
                <td>${escapeHtml(String(item.latest_fully_filled_order_count))}</td>
                <td>${escapeHtml(String(item.latest_partially_filled_order_count))}</td>
                <td>${formatMoney(item.latest_ending_buying_power)}</td>
                <td>${escapeHtml(item.latest_run_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderShadowSyncTable() {
  const accounts = shadowSync.accounts || [];
  const container = document.getElementById("shadow-sync-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No synced shadow baseline yet. Use the shadow sync script and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Source</th>
          <th>Positions</th>
          <th>Buying Power</th>
          <th>Net Liq</th>
          <th>Gross MV</th>
          <th>Synced At</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.source_reference ? `${item.source_label} (${item.source_reference})` : item.source_label)}</td>
                <td>${escapeHtml(String(item.position_count))}</td>
                <td>${formatMoney(item.buying_power)}</td>
                <td>${formatMoney(item.net_liquidation_value)}</td>
                <td>${formatMoney(item.gross_market_value)}</td>
                <td>${escapeHtml(item.synced_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderShadowDriftTable() {
  const accounts = shadowDrift.accounts || [];
  const container = document.getElementById("shadow-drift-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No shadow drift view yet. Sync a shadow baseline or run a shadow session, then rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Status</th>
          <th>Strategy</th>
          <th>Shadow Mode</th>
          <th>Qty Diff</th>
          <th>Baseline Only</th>
          <th>Shadow Only</th>
          <th>Gross Drift</th>
          <th>Top Diffs</th>
          <th>BP Delta</th>
          <th>Latest Shadow</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.status)}</td>
                <td>${escapeHtml(item.latest_shadow_strategy_id || "n/a")}</td>
                <td>${escapeHtml(item.latest_shadow_starting_state_mode || "n/a")}</td>
                <td>${escapeHtml(String(item.quantity_difference_count))}</td>
                <td>${escapeHtml(String(item.baseline_only_count))}</td>
                <td>${escapeHtml(String(item.shadow_only_count))}</td>
                <td>${formatMoney(item.gross_drift_notional)}</td>
                <td>${formatShadowDiffs(item.largest_differences || [])}</td>
                <td>${item.buying_power_delta == null ? "n/a" : formatMoney(item.buying_power_delta)}</td>
                <td>${escapeHtml(item.latest_shadow_at || item.synced_at || "n/a")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderShadowSyncActivityTable() {
  const events = shadowSyncActivity.recent_events || [];
  const container = document.getElementById("shadow-sync-activity-table");

  if (!events.length) {
    container.innerHTML = `<p class="empty">No shadow sync activity recorded yet. Run a sync script or rebuild operator views after sync activity exists.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Recorded</th>
          <th>Account</th>
          <th>Outcome</th>
          <th>Source</th>
          <th>Endpoint</th>
          <th>Requests</th>
          <th>Reason</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.recorded_at)}</td>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.outcome)}</td>
                <td>${escapeHtml(item.source_reference ? `${item.source_label} (${item.source_reference})` : item.source_label)}</td>
                <td>${escapeHtml(item.endpoint || "n/a")}</td>
                <td>${escapeHtml(String(item.request_count ?? 0))}</td>
                <td>${escapeHtml(formatShadowSyncReason(item))}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderShadowSupervisionTable() {
  const accounts = shadowSupervision.accounts || [];
  const container = document.getElementById("shadow-supervision-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No shadow supervision view yet. Sync a baseline and run shadow supervision, then rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Diagnosis</th>
          <th>Severity</th>
          <th>Drift</th>
          <th>Skipped Since Sync</th>
          <th>Sync->Shadow Hours</th>
          <th>Top Diff</th>
          <th>Hint</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.diagnosis)}</td>
                <td>${escapeHtml(item.severity)}</td>
                <td>${escapeHtml(item.shadow_drift_status || "n/a")}</td>
                <td>${escapeHtml(String(item.skipped_refresh_count_since_sync ?? 0))}</td>
                <td>${item.hours_between_sync_and_shadow == null ? "n/a" : escapeHtml(String(item.hours_between_sync_and_shadow))}</td>
                <td>${escapeHtml(item.top_difference_symbol || "clear")}</td>
                <td>${escapeHtml(item.operator_hint)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderShadowInvestigationTable() {
  const accounts = shadowInvestigation.accounts || [];
  const container = document.getElementById("shadow-investigation-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No shadow investigation bundle yet. Rebuild operator views after supervision evidence exists.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Diagnosis</th>
          <th>Context</th>
          <th>Focus Symbols</th>
          <th>Shadow Session</th>
          <th>Sync Source</th>
          <th>Next Check</th>
          <th>Evidence</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.diagnosis)}</td>
                <td>${escapeHtml(formatInvestigationContext(item))}</td>
                <td>${escapeHtml(formatFocusSymbols(item.focus_symbols || []))}</td>
                <td>${escapeHtml(item.latest_shadow_session_id || "n/a")}</td>
                <td>${escapeHtml(formatSyncSource(item))}</td>
                <td>${escapeHtml(item.likely_follow_up_lane || "n/a")}</td>
                <td>${escapeHtml(formatInvestigationEvidence(item))}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function formatShadowDiffs(items) {
  if (!items.length) {
    return "clear";
  }
  return escapeHtml(
    items
      .slice(0, 3)
      .map((item) => `${item.symbol}:${formatSignedNumber(item.quantity_delta)}`)
      .join(", ")
  );
}

function formatShadowSyncReason(item) {
  if (!item.reason) {
    return "executed";
  }
  if (item.reason === "recent_shadow_sync_exists") {
    return `freshness guard from ${item.prior_source_label || "prior sync"}`;
  }
  return item.reason;
}

function formatFocusSymbols(items) {
  if (!items.length) {
    return "clear";
  }
  return items.join(", ");
}

function formatSyncSource(item) {
  if (!item.latest_sync_source_label) {
    return "n/a";
  }
  return item.latest_sync_source_reference
    ? `${item.latest_sync_source_label} (${item.latest_sync_source_reference})`
    : item.latest_sync_source_label;
}

function formatResearchContext(item) {
  if (!item.research_context_status) {
    return "n/a";
  }
  const suffix = item.latest_backtest_run_id ? ` (${item.latest_backtest_run_id})` : "";
  return `${item.research_context_status}${suffix}`;
}

function formatInputContext(item) {
  if (!item.input_context_status) {
    return "n/a";
  }
  const counts = `${Number(item.shared_input_reference_count || 0)}/${Number(item.shadow_only_input_reference_count || 0)}/${Number(item.backtest_only_input_reference_count || 0)}`;
  return `${item.input_context_status} [${counts}]`;
}

function formatSignalContext(item) {
  if (!item.signal_context_status) {
    return "n/a";
  }
  const counts = `${Number(item.shared_selected_symbol_count || 0)}/${Number(item.shadow_only_selected_symbol_count || 0)}/${Number(item.backtest_only_selected_symbol_count || 0)}`;
  return `${item.signal_context_status} [${counts}]`;
}

function formatFeatureContext(item) {
  if (!item.feature_context_status) {
    return "n/a";
  }
  const counts = `${Number(item.shared_feature_symbol_count || 0)}/${Number(item.shifted_feature_symbol_count || 0)}/${Number(item.shifted_feature_field_count || 0)}`;
  const topField = item.top_feature_delta_symbol && item.top_feature_delta_field
    ? ` ${item.top_feature_delta_symbol}.${item.top_feature_delta_field}`
    : "";
  return `${item.feature_context_status} [${counts}]${topField}`;
}

function formatRankingContext(item) {
  if (!item.ranking_context_status) {
    return "n/a";
  }
  const counts = `${Number(item.shared_ranked_candidate_count || 0)}/${Number(item.shifted_rank_score_count || 0)}`;
  return `${item.ranking_context_status} [${counts}]`;
}

function formatTargetContext(item) {
  if (!item.target_context_status) {
    return "n/a";
  }
  const counts = `${Number(item.shared_target_symbol_count || 0)}/${Number(item.shifted_target_quantity_count || 0)}`;
  return `${item.target_context_status} [${counts}]`;
}

function formatInvestigationContext(item) {
  const parts = [];
  const research = formatResearchContext(item);
  const input = formatInputContext(item);
  const feature = formatFeatureContext(item);
  const signal = formatSignalContext(item);
  const ranking = formatRankingContext(item);
  const target = formatTargetContext(item);
  if (research !== "n/a") {
    parts.push(research);
  }
  if (input !== "n/a") {
    parts.push(input);
  }
  if (feature !== "n/a") {
    parts.push(feature);
  }
  if (signal !== "n/a") {
    parts.push(signal);
  }
  if (ranking !== "n/a") {
    parts.push(ranking);
  }
  if (target !== "n/a") {
    parts.push(target);
  }
  return parts.length ? parts.join(" | ") : "n/a";
}

function formatInvestigationEvidence(item) {
  const parts = [];
  if (item.latest_backtest_decision_manifest_path) {
    parts.push(`bt-decision:${basename(item.latest_backtest_decision_manifest_path)}`);
  }
  if (item.latest_backtest_feature_manifest_path) {
    parts.push(`bt-feature:${basename(item.latest_backtest_feature_manifest_path)}`);
  }
  if (item.latest_backtest_manifest_path) {
    parts.push(`backtest:${basename(item.latest_backtest_manifest_path)}`);
  }
  if (item.latest_shadow_decision_manifest_path) {
    parts.push(`shadow-decision:${basename(item.latest_shadow_decision_manifest_path)}`);
  }
  if (item.latest_shadow_feature_manifest_path) {
    parts.push(`shadow-feature:${basename(item.latest_shadow_feature_manifest_path)}`);
  }
  if (item.latest_shadow_manifest_path) {
    parts.push(`run:${basename(item.latest_shadow_manifest_path)}`);
  }
  if (item.latest_sync_manifest_path) {
    parts.push(`sync:${basename(item.latest_sync_manifest_path)}`);
  }
  if (item.latest_sync_activity_path) {
    parts.push(`activity:${basename(item.latest_sync_activity_path)}`);
  }
  const featurePreview = formatFeatureDriftPreview(item.feature_drift_preview || []);
  if (featurePreview !== "n/a") {
    parts.push(`feature-drift:${featurePreview}`);
  }
  return parts.length ? parts.join(" | ") : "n/a";
}

function formatPromotionPacketPath(packetPath) {
  if (!packetPath) {
    return "n/a";
  }
  const root = ((data.generated_from || {}).strategy_promotion_packets_root || "").replace(/\/$/, "");
  return root ? `${root}/${packetPath}` : packetPath;
}

function formatFeatureDriftPreview(items) {
  if (!items.length) {
    return "n/a";
  }
  return items
    .slice(0, 3)
    .map((item) => `${item.symbol}.${item.field}:${formatSignedNumber(item.abs_delta)}`)
    .join(", ");
}

function basename(pathValue) {
  const parts = String(pathValue).split("/");
  return parts[parts.length - 1] || String(pathValue);
}

function renderShadowTable() {
  const strategies = shadow.strategies || [];
  const container = document.getElementById("shadow-table");

  if (!strategies.length) {
    container.innerHTML = `<p class="empty">No shadow history yet. Run a shadow session and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Strategy</th>
          <th>Runs</th>
          <th>Fill Ratio</th>
          <th>Rejected</th>
          <th>Fully Filled</th>
          <th>Partial</th>
          <th>Buying Power</th>
          <th>Latest Run</th>
        </tr>
      </thead>
      <tbody>
        ${strategies
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.strategy_id)}</td>
                <td>${escapeHtml(String(item.run_count))}</td>
                <td>${formatPct(item.latest_fill_ratio)}</td>
                <td>${escapeHtml(String(item.latest_rejected_order_count))}</td>
                <td>${escapeHtml(String(item.latest_fully_filled_order_count))}</td>
                <td>${escapeHtml(String(item.latest_partially_filled_order_count))}</td>
                <td>${formatMoney(item.latest_ending_buying_power)}</td>
                <td>${escapeHtml(item.latest_run_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPaperAccountsTable() {
  const accounts = paperAccounts.accounts || [];
  const container = document.getElementById("paper-accounts-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No paper account state yet. Run a paper session and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Positions</th>
          <th>Buying Power</th>
          <th>Net Liq</th>
          <th>Gross MV</th>
          <th>Last Session</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(String(item.position_count))}</td>
                <td>${formatMoney(item.buying_power)}</td>
                <td>${formatMoney(item.net_liquidation_value)}</td>
                <td>${formatMoney(item.gross_market_value)}</td>
                <td>${escapeHtml(item.last_session_id || item.updated_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPaperReconciliationTable() {
  const reports = paperReconciliation.latest_reports || [];
  const container = document.getElementById("paper-reconciliation-table");

  if (!reports.length) {
    container.innerHTML = `<p class="empty">No paper reconciliation reports yet. Persist a paper session and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Status</th>
          <th>Issues</th>
          <th>Cash Diff</th>
          <th>Position Diff</th>
          <th>Checked</th>
        </tr>
      </thead>
      <tbody>
        ${reports
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.status)}</td>
                <td>${escapeHtml(String(item.issue_count))}</td>
                <td>${formatMoney(item.cash_difference)}</td>
                <td>${escapeHtml(String(item.position_difference_count))}</td>
                <td>${escapeHtml(item.checked_at)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPaperRiskTable() {
  const accounts = paperRisk.accounts || [];
  const container = document.getElementById("paper-risk-table");

  if (!accounts.length) {
    container.innerHTML = `<p class="empty">No paper risk reports yet. Run a paper session and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Status</th>
          <th>Kill Switch</th>
          <th>Drawdown</th>
          <th>Peak NLV</th>
          <th>Latest NLV</th>
          <th>Issues</th>
        </tr>
      </thead>
      <tbody>
        ${accounts
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.risk_status)}</td>
                <td>${escapeHtml(item.kill_switch_active ? "active" : "off")}</td>
                <td>${formatPct(item.latest_drawdown_ratio)}</td>
                <td>${formatMoney(item.peak_net_liquidation_value)}</td>
                <td>${formatMoney(item.latest_net_liquidation_value)}</td>
                <td>${escapeHtml(String(item.issue_count))}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderPaperIncidentsTable() {
  const reports = paperIncidents.latest_reports || [];
  const container = document.getElementById("paper-incidents-table");

  if (!reports.length) {
    container.innerHTML = `<p class="empty">No paper incidents yet. Persist paper operations and rebuild console data.</p>`;
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Account</th>
          <th>Session</th>
          <th>Incidents</th>
          <th>Critical</th>
          <th>Risk Status</th>
          <th>Kill Switch</th>
        </tr>
      </thead>
      <tbody>
        ${reports
          .map(
            (item) => `
              <tr>
                <td>${escapeHtml(item.account_id)}</td>
                <td>${escapeHtml(item.latest_session_id)}</td>
                <td>${escapeHtml(String(item.incident_count))}</td>
                <td>${escapeHtml(String(item.critical_incident_count))}</td>
                <td>${escapeHtml(item.risk_status)}</td>
                <td>${escapeHtml(item.kill_switch_active ? "active" : "off")}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function renderWorkflowCards(targetId, cards) {
  const container = document.getElementById(targetId);
  if (!cards.length) {
    container.innerHTML = `<p class="empty">No workflow artifacts yet.</p>`;
    return;
  }

  container.innerHTML = cards
    .map(
      (card) => `
        <article class="workflow-card">
          <div>
            <p class="workflow-title">${escapeHtml(card.source_name)} / ${escapeHtml(card.dataset_name)}</p>
            <p class="workflow-meta">Artifacts: ${escapeHtml(String(card.artifact_count))}</p>
          </div>
          <div class="workflow-side">
            <p>${escapeHtml(card.latest_timestamp || "n/a")}</p>
            <p>${escapeHtml(String(card.total_bytes || 0))} bytes</p>
          </div>
        </article>
      `
    )
    .join("");
}

function formatPct(value) {
  const n = Number(value || 0);
  return `${(n * 100).toFixed(2)}%`;
}

function formatSignedPct(value) {
  const n = Number(value || 0);
  return `${n >= 0 ? "+" : ""}${(n * 100).toFixed(2)}%`;
}

function formatMoney(value) {
  const n = Number(value || 0);
  return n.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

function formatSignedMoney(value) {
  const n = Number(value || 0);
  const prefix = n >= 0 ? "+" : "";
  return `${prefix}${formatMoney(n)}`;
}

function formatSignedInteger(value) {
  const n = Number(value || 0);
  if (!Number.isFinite(n)) {
    return "n/a";
  }
  return `${n >= 0 ? "+" : ""}${Math.trunc(n)}`;
}

function formatDateRange(start, end) {
  if (!start && !end) {
    return "n/a";
  }
  if (start && end && start !== end) {
    return `${start} -> ${end}`;
  }
  return start || end || "n/a";
}

function minBy(items, key) {
  if (!items.length) {
    return 0;
  }
  return items.reduce((min, item) => Math.min(min, Number(item[key] || 0)), Number(items[0][key] || 0));
}

function maxBy(items, key) {
  if (!items.length) {
    return 0;
  }
  return items.reduce((max, item) => Math.max(max, Number(item[key] || 0)), Number(items[0][key] || 0));
}

function renderLineChartSvg(values, options) {
  const points = (values || []).map((value) => Number(value)).filter((value) => Number.isFinite(value));
  if (!points.length) {
    return `<p class="empty">No series yet.</p>`;
  }

  const width = 520;
  const height = 180;
  const padding = 18;
  const min = Math.min(...points, options.baseline == null ? Infinity : Number(options.baseline));
  const max = Math.max(...points, options.baseline == null ? -Infinity : Number(options.baseline));
  const span = max - min || 1;
  const stepX = points.length === 1 ? 0 : (width - padding * 2) / (points.length - 1);
  const toX = (index) => padding + index * stepX;
  const toY = (value) => height - padding - ((value - min) / span) * (height - padding * 2);
  const polyline = points.map((value, index) => `${toX(index)},${toY(value)}`).join(" ");
  const area = `${padding},${height - padding} ${polyline} ${toX(points.length - 1)},${height - padding}`;
  const baseline = options.baseline == null ? null : toY(Number(options.baseline));

  return `
    <svg class="chart-svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="line chart">
      <rect x="0" y="0" width="${width}" height="${height}" fill="transparent"></rect>
      ${baseline == null ? "" : `<line x1="${padding}" y1="${baseline}" x2="${width - padding}" y2="${baseline}" stroke="#d7d0c3" stroke-dasharray="4 4"></line>`}
      <path d="M ${area}" fill="${options.fill || "rgba(14, 107, 92, 0.10)"}"></path>
      <polyline fill="none" stroke="${options.stroke || "#0e6b5c"}" stroke-width="3" points="${polyline}"></polyline>
      <text x="${padding}" y="${padding - 4}" fill="#5b6a68" font-size="12">${escapeHtml(options.labelMax || "")}</text>
      <text x="${padding}" y="${height - 4}" fill="#5b6a68" font-size="12">${escapeHtml(options.labelMin || "")}</text>
    </svg>
  `;
}

function formatSignedNumber(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) {
    return "n/a";
  }
  if (Math.abs(numeric) >= 100) {
    return `${numeric > 0 ? "+" : ""}${numeric.toFixed(0)}`;
  }
  if (Math.abs(numeric) >= 1) {
    return `${numeric > 0 ? "+" : ""}${numeric.toFixed(2)}`;
  }
  return `${numeric > 0 ? "+" : ""}${numeric.toFixed(4)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
