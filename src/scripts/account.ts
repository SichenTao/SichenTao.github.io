import { createClient, type Session, type User } from "@supabase/supabase-js";

type LocaleName = "en" | "zh" | "ja";

const ACCOUNT_COPY = {
  en: {
    pageTitle: "Account & Billing | Sichen Tao",
    pageDescription:
      "Sign in, review learning access, and manage billing for Sichen Tao learning products.",
    eyebrow: "Account platform",
    title: "Account & Billing",
    lede: "One account for learning progress, bookmarks, notes, subscription access, and future product memberships.",
    statusChecking: "Checking account service…",
    identityKicker: "Identity",
    signIn: "Sign in",
    emailAddress: "Email address",
    sendMagicLink: "Send magic link",
    orContinue: "or continue with",
    authHelp:
      "Authentication uses short-lived sessions. Payment card data stays with Stripe.",
    signedInKicker: "Signed in",
    emailLabel: "Email",
    userIdLabel: "User ID",
    manageBilling: "Manage billing",
    signOut: "Sign out",
    accessKicker: "Access",
    entitlementsTitle: "Your product entitlements",
    choosePlan: "Choose a learning plan",
    freePlan: "Free",
    freeDescription:
      "Public video, article previews, and local learning progress.",
    publicAccess: "Current public access",
    monthlyPlan: "Member monthly",
    monthlyDescription:
      "Full transcript search, synced progress, bookmarks, notes, and authorized exports.",
    annualPlan: "Member annual",
    annualDescription:
      "The same member access with annual billing configured through Stripe.",
    checkout: "Continue to Checkout",
    accountDefault: "Account",
    notAvailable: "Not available",
    notConfigured:
      "Account service is not configured for this deployment. Public content remains available.",
    signedOutStatus:
      "Signed out. Use a magic link or an identity provider to continue.",
    signedInStatus:
      "Signed in. Your account data is protected by row-level security.",
    entitlementError:
      "Signed in, but entitlements could not be loaded. Try again shortly.",
    noEntitlements:
      "No active paid entitlements. Public and free learning access remains available.",
    validUntil: "Valid until",
    noExpiry: "No expiry date",
    active: "Active",
    sendingMagic: "Sending a secure magic link…",
    magicError: "Magic link could not be sent:",
    magicSent: "Magic link sent. Check your email to continue.",
    signInError: "Sign in could not start:",
    signOutError: "Sign out failed:",
    openingBilling: "Opening the secure billing portal…",
    billingError: "Billing portal could not be opened:",
    preparingCheckout: "Preparing secure Checkout…",
    checkoutError: "Checkout could not be started:",
    missingPortalUrl: "missing portal URL",
    missingCheckoutUrl: "missing Checkout URL",
    sessionError: "Account session could not be read:",
  },
  zh: {
    pageTitle: "账户与付费 | 陶思晨",
    pageDescription: "登录、查看学习权限，并管理陶思晨学习产品的付费服务。",
    eyebrow: "账户平台",
    title: "账户与付费",
    lede: "一个账户统一管理学习进度、书签、笔记、订阅权限与未来的产品会员。",
    statusChecking: "正在检查账户服务…",
    identityKicker: "身份",
    signIn: "登录",
    emailAddress: "电子邮箱",
    sendMagicLink: "发送登录链接",
    orContinue: "或使用以下方式继续",
    authHelp: "身份验证采用短期会话；银行卡信息由 Stripe 保管。",
    signedInKicker: "已登录",
    emailLabel: "邮箱",
    userIdLabel: "用户 ID",
    manageBilling: "管理付费",
    signOut: "退出登录",
    accessKicker: "权限",
    entitlementsTitle: "你的产品权限",
    choosePlan: "选择学习方案",
    freePlan: "免费",
    freeDescription: "公开视频、文章预览与本地学习进度。",
    publicAccess: "当前公开权限",
    monthlyPlan: "月度会员",
    monthlyDescription: "全文搜索、云端进度、书签、笔记与经授权的导出。",
    annualPlan: "年度会员",
    annualDescription: "提供相同会员权限，并通过 Stripe 按年付费。",
    checkout: "继续前往结账",
    accountDefault: "账户",
    notAvailable: "暂无",
    notConfigured: "此部署尚未配置账户服务；所有公开内容仍可正常访问。",
    signedOutStatus: "当前未登录。请使用邮箱登录链接或第三方身份继续。",
    signedInStatus: "已登录；你的账户数据由行级安全策略保护。",
    entitlementError: "已登录，但暂时无法读取产品权限，请稍后重试。",
    noEntitlements: "当前没有有效的付费权限；公开与免费学习内容仍可使用。",
    validUntil: "有效期至",
    noExpiry: "长期有效",
    active: "有效",
    sendingMagic: "正在发送安全登录链接…",
    magicError: "登录链接发送失败：",
    magicSent: "登录链接已发送，请检查邮箱。",
    signInError: "无法开始登录：",
    signOutError: "退出登录失败：",
    openingBilling: "正在打开安全付费门户…",
    billingError: "无法打开付费门户：",
    preparingCheckout: "正在准备安全结账…",
    checkoutError: "无法开始结账：",
    missingPortalUrl: "未返回付费门户地址",
    missingCheckoutUrl: "未返回结账地址",
    sessionError: "无法读取账户会话：",
  },
  ja: {
    pageTitle: "アカウントと支払い | 陶思晨",
    pageDescription:
      "ログイン、学習アクセスの確認、陶思晨の学習プロダクトの支払い管理を行います。",
    eyebrow: "アカウント基盤",
    title: "アカウントと支払い",
    lede: "学習進捗、ブックマーク、ノート、購読権限、今後の会員機能を一つのアカウントで管理します。",
    statusChecking: "アカウントサービスを確認しています…",
    identityKicker: "本人確認",
    signIn: "ログイン",
    emailAddress: "メールアドレス",
    sendMagicLink: "ログインリンクを送信",
    orContinue: "または次の方法で続行",
    authHelp:
      "認証には短期セッションを使用し、カード情報は Stripe が管理します。",
    signedInKicker: "ログイン中",
    emailLabel: "メール",
    userIdLabel: "ユーザー ID",
    manageBilling: "支払いを管理",
    signOut: "ログアウト",
    accessKicker: "アクセス権",
    entitlementsTitle: "プロダクト利用権限",
    choosePlan: "学習プランを選択",
    freePlan: "無料",
    freeDescription: "公開動画、記事プレビュー、端末内の学習進捗。",
    publicAccess: "現在の公開アクセス",
    monthlyPlan: "月額会員",
    monthlyDescription:
      "全文検索、同期された進捗、ブックマーク、ノート、許可済みエクスポート。",
    annualPlan: "年額会員",
    annualDescription: "同じ会員アクセスを Stripe の年額課金で利用します。",
    checkout: "Checkout へ進む",
    accountDefault: "アカウント",
    notAvailable: "利用不可",
    notConfigured:
      "このデプロイではアカウントサービスが未設定です。公開コンテンツは引き続き利用できます。",
    signedOutStatus:
      "ログアウト中です。メールリンクまたは外部認証で続行してください。",
    signedInStatus:
      "ログインしました。アカウントデータは行レベルセキュリティで保護されています。",
    entitlementError:
      "ログイン済みですが、利用権限を取得できませんでした。しばらくしてから再試行してください。",
    noEntitlements:
      "有効な有料権限はありません。公開・無料の学習機能は引き続き利用できます。",
    validUntil: "有効期限",
    noExpiry: "期限なし",
    active: "有効",
    sendingMagic: "安全なログインリンクを送信しています…",
    magicError: "ログインリンクを送信できませんでした：",
    magicSent: "ログインリンクを送信しました。メールをご確認ください。",
    signInError: "ログインを開始できませんでした：",
    signOutError: "ログアウトに失敗しました：",
    openingBilling: "安全な支払いポータルを開いています…",
    billingError: "支払いポータルを開けませんでした：",
    preparingCheckout: "安全な Checkout を準備しています…",
    checkoutError: "Checkout を開始できませんでした：",
    missingPortalUrl: "支払いポータル URL がありません",
    missingCheckoutUrl: "Checkout URL がありません",
    sessionError: "アカウントセッションを読み取れませんでした：",
  },
} as const;

type CopyKey = keyof (typeof ACCOUNT_COPY)["en"];

interface PortalItem {
  href: string;
  label: string;
  active?: boolean;
  icon?: string;
}

interface HomepagePlatformApi {
  readStoredTheme?: () => string;
  portalItems?: (options: {
    locale: LocaleName;
    theme?: string;
    currentPath: string;
  }) => { items: PortalItem[] };
}

interface HomepageI18nApi {
  readStoredLocale?: () => string;
}

interface HomepageComponentsApi {
  renderStaticControlCluster?: (options: {
    currentPath: string;
    onLocaleChange: (locale: string) => void;
  }) => void;
}

const homepageWindow = window as typeof window & {
  HomepagePlatform?: HomepagePlatformApi;
  HomepageI18n?: HomepageI18nApi;
  HomepageComponents?: HomepageComponentsApi;
};

function normalizeLocale(value: string | undefined): LocaleName {
  if (value === "zh" || value === "ja") return value;
  return "en";
}

let activeLocale = normalizeLocale(
  homepageWindow.HomepageI18n?.readStoredLocale?.(),
);

function copy(): (typeof ACCOUNT_COPY)[LocaleName] {
  return ACCOUNT_COPY[activeLocale];
}

function createNavIcon(iconName = "home"): SVGSVGElement {
  const iconMap: Record<string, string> = {
    home: "home",
    portrait: "profiles",
    frontier: "research",
    "follow-builders": "publications",
    "youtube-to-ebook": "file",
    jsps: "sources",
    account: "identity",
  };
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("ui-icon");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
  use.setAttribute(
    "href",
    `/academic-homepage/assets/icons/ui-icons.svg#icon-${iconMap[iconName] || "home"}`,
  );
  svg.append(use);
  return svg;
}

function renderAccountNavigation() {
  const nav = document.querySelector<HTMLElement>("#portalTopnav");
  if (!nav) return;
  const theme = homepageWindow.HomepagePlatform?.readStoredTheme?.();
  const items = homepageWindow.HomepagePlatform?.portalItems?.({
    locale: activeLocale,
    ...(theme ? { theme } : {}),
    currentPath: window.location.pathname,
  }).items;
  if (!items?.length) return;
  const links = items.map((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    if (item.active) link.setAttribute("aria-current", "page");
    link.append(createNavIcon(item.icon));
    const label = document.createElement("span");
    label.textContent = item.label;
    link.append(label);
    return link;
  });
  nav.replaceChildren(...links);
}

function renderAccountControls() {
  homepageWindow.HomepageComponents?.renderStaticControlCluster?.({
    currentPath: window.location.pathname,
    onLocaleChange: (locale) => {
      activeLocale = normalizeLocale(locale);
      applyAccountCopy();
      renderAccountNavigation();
    },
  });
}

function setMetaContent(selector: string, value: string) {
  document
    .querySelector<HTMLMetaElement>(selector)
    ?.setAttribute("content", value);
}

function applyAccountCopy() {
  const messages = copy();
  document.documentElement.lang =
    activeLocale === "zh" ? "zh-CN" : activeLocale;
  document.body.dataset.lang = activeLocale;
  document.title = messages.pageTitle;
  setMetaContent('meta[name="description"]', messages.pageDescription);
  setMetaContent('meta[property="og:title"]', messages.pageTitle);
  setMetaContent('meta[property="og:description"]', messages.pageDescription);
  document
    .querySelectorAll<HTMLElement>("[data-account-copy]")
    .forEach((element) => {
      if (element.id === "account-status") return;
      const key = element.dataset.accountCopy as CopyKey | undefined;
      if (key && messages[key]) element.textContent = messages[key];
    });
  renderStatus();
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL?.trim();
const supabasePublishableKey =
  import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

const statusElement = document.querySelector<HTMLElement>("#account-status");
const signInCard = document.querySelector<HTMLElement>("#sign-in-card");
const profileCard = document.querySelector<HTMLElement>("#profile-card");
const entitlementCard =
  document.querySelector<HTMLElement>("#entitlement-card");
const entitlementList =
  document.querySelector<HTMLElement>("#entitlement-list");
const magicLinkForm =
  document.querySelector<HTMLFormElement>("#magic-link-form");
const emailInput = document.querySelector<HTMLInputElement>("#account-email");
const signOutButton =
  document.querySelector<HTMLButtonElement>("#sign-out-button");
const billingPortalButton = document.querySelector<HTMLButtonElement>(
  "#billing-portal-button",
);
const providerButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-provider]"),
);
const checkoutButtons = Array.from(
  document.querySelectorAll<HTMLButtonElement>("[data-plan]"),
);

function renderStatus() {
  if (!statusElement) return;
  const key = statusElement.dataset.statusKey as CopyKey | undefined;
  if (!key) return;
  const detail = statusElement.dataset.statusDetail;
  statusElement.textContent = `${copy()[key]}${detail ? ` ${detail}` : ""}`;
}

function setStatus(
  key: CopyKey,
  state: "idle" | "error" | "success" = "idle",
  detail = "",
) {
  if (!statusElement) return;
  statusElement.dataset.statusKey = key;
  statusElement.dataset.statusDetail = detail;
  statusElement.dataset.state = state;
  renderStatus();
}

function setControlsDisabled(disabled: boolean) {
  for (const control of [
    emailInput,
    signOutButton,
    billingPortalButton,
    ...providerButtons,
    ...checkoutButtons,
  ]) {
    if (control) control.disabled = disabled;
  }
  const submit = magicLinkForm?.querySelector<HTMLButtonElement>(
    'button[type="submit"]',
  );
  if (submit) submit.disabled = disabled;
}

function renderSignedOut() {
  if (signInCard) signInCard.hidden = false;
  if (profileCard) profileCard.hidden = true;
  if (entitlementCard) entitlementCard.hidden = true;
}

function renderProfile(user: User) {
  if (signInCard) signInCard.hidden = true;
  if (profileCard) profileCard.hidden = false;
  document.querySelector<HTMLElement>("#profile-name")!.textContent = String(
    user.user_metadata?.display_name ||
      user.user_metadata?.full_name ||
      copy().accountDefault,
  );
  document.querySelector<HTMLElement>("#profile-email")!.textContent =
    user.email || copy().notAvailable;
  document.querySelector<HTMLElement>("#profile-id")!.textContent = user.id;
}

function appendEntitlement(feature: string, validUntil: string | null) {
  if (!entitlementList) return;
  const item = document.createElement("div");
  item.className = "entitlement-item";
  const copyBlock = document.createElement("div");
  const title = document.createElement("strong");
  title.textContent = feature;
  const detail = document.createElement("span");
  detail.textContent = validUntil
    ? `${copy().validUntil} ${new Date(validUntil).toLocaleDateString(activeLocale)}`
    : copy().noExpiry;
  copyBlock.append(title, detail);
  const state = document.createElement("span");
  state.className = "entitlement-state";
  state.textContent = copy().active;
  item.append(copyBlock, state);
  entitlementList.append(item);
}

setStatus("statusChecking");
applyAccountCopy();
renderAccountNavigation();
renderAccountControls();

// The shared shell is a deferred compatibility asset. Re-run the idempotent
// control renderer once loading completes so the mobile menu wrapper and
// overflow state are present even when this module wins the initial race.
const resyncAccountShell = () => {
  renderAccountNavigation();
  renderAccountControls();
};
if (document.readyState === "complete") {
  queueMicrotask(resyncAccountShell);
} else {
  window.addEventListener("load", resyncAccountShell, { once: true });
}

if (!supabaseUrl || !supabasePublishableKey) {
  setStatus("notConfigured", "error");
  setControlsDisabled(true);
  renderSignedOut();
} else {
  const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  let currentSession: Session | null = null;

  async function loadEntitlements(user: User) {
    if (!entitlementList || !entitlementCard) return;
    entitlementList.replaceChildren();
    entitlementCard.hidden = false;
    const { data, error } = await supabase
      .from("entitlements")
      .select("entitlement_key, expires_at")
      .eq("user_id", user.id)
      .is("revoked_at", null)
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
      .order("entitlement_key");

    if (error) {
      setStatus("entitlementError", "error");
      return;
    }
    if (!data?.length) {
      const empty = document.createElement("p");
      empty.className = "account-help";
      empty.textContent = copy().noEntitlements;
      entitlementList.append(empty);
      return;
    }
    for (const entitlement of data)
      appendEntitlement(entitlement.entitlement_key, entitlement.expires_at);
  }

  async function applySession(session: Session | null) {
    currentSession = session;
    if (!session?.user) {
      renderSignedOut();
      setStatus("signedOutStatus");
      return;
    }
    renderProfile(session.user);
    setStatus("signedInStatus", "success");
    await loadEntitlements(session.user);
  }

  magicLinkForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = emailInput?.value.trim();
    if (!email) return;
    setControlsDisabled(true);
    setStatus("sendingMagic");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: new URL("/account/", window.location.origin).href,
      },
    });
    setControlsDisabled(false);
    if (error) setStatus("magicError", "error", error.message);
    else setStatus("magicSent", "success");
  });

  for (const button of providerButtons) {
    button.addEventListener("click", async () => {
      const provider = button.dataset.provider;
      if (provider !== "google" && provider !== "github") return;
      setControlsDisabled(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: new URL("/account/", window.location.origin).href,
        },
      });
      if (error) {
        setControlsDisabled(false);
        setStatus("signInError", "error", error.message);
      }
    });
  }

  signOutButton?.addEventListener("click", async () => {
    setControlsDisabled(true);
    const { error } = await supabase.auth.signOut();
    setControlsDisabled(false);
    if (error) setStatus("signOutError", "error", error.message);
  });

  billingPortalButton?.addEventListener("click", async () => {
    setControlsDisabled(true);
    setStatus("openingBilling");
    const { data, error } = await supabase.functions.invoke<{
      portal_url?: string;
    }>("customer-portal", {
      body: {
        application_slug: "youtube-learner",
        return_path: "/account/",
      },
    });
    setControlsDisabled(false);
    if (error || !data?.portal_url) {
      setStatus(
        "billingError",
        "error",
        error?.message || copy().missingPortalUrl,
      );
      return;
    }
    window.location.assign(data.portal_url);
  });

  for (const button of checkoutButtons) {
    button.addEventListener("click", async () => {
      const planCode = button.dataset.plan;
      if (!planCode) return;
      if (!currentSession?.user) {
        setStatus("signedOutStatus", "error");
        emailInput?.focus();
        return;
      }
      setControlsDisabled(true);
      setStatus("preparingCheckout");
      const { data, error } = await supabase.functions.invoke<{
        checkout_url?: string;
      }>("create-checkout", {
        body: {
          application_slug: "youtube-learner",
          plan_key: planCode,
          request_id: crypto.randomUUID(),
          success_path: "/account/",
          cancel_path: "/account/",
        },
      });
      setControlsDisabled(false);
      if (error || !data?.checkout_url) {
        setStatus(
          "checkoutError",
          "error",
          error?.message || copy().missingCheckoutUrl,
        );
        return;
      }
      window.location.assign(data.checkout_url);
    });
  }

  supabase.auth.onAuthStateChange((_event, session) => {
    void applySession(session);
  });

  const { data, error } = await supabase.auth.getSession();
  if (error) setStatus("sessionError", "error", error.message);
  else await applySession(data.session);
}
