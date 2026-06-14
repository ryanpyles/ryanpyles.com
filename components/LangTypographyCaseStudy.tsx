"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import styles from "./LangTypographyCaseStudy.module.css";

/* ─── Language configuration ────────────────────────────────────────────── */
type LangCode = "en" | "fr" | "ja" | "he" | "ar" | "zh-Hant" | "zh-Hans";

interface LangConfig {
  code: LangCode;
  nativeLabel: string;
  enLabel: string;
  dir: "ltr" | "rtl";
  vertical: boolean;
  script: string;
  fontFamily: string;
  titleFont: string;
  lineHeight: string;
  letterSpacing: string;
  fontSize: string;
}

const LANGS: LangConfig[] = [
  {
    code: "en",
    nativeLabel: "English",
    enLabel: "English",
    dir: "ltr",
    vertical: false,
    script: "Latin",
    fontFamily: "var(--font-serif)",
    titleFont: "var(--font-serif)",
    lineHeight: "1.7",
    letterSpacing: "0",
    fontSize: "var(--text-md)",
  },
  {
    code: "fr",
    nativeLabel: "Français",
    enLabel: "French",
    dir: "ltr",
    vertical: false,
    script: "Latin",
    fontFamily: "var(--font-serif)",
    titleFont: "var(--font-serif)",
    lineHeight: "1.72",
    letterSpacing: "0",
    fontSize: "var(--text-md)",
  },
  {
    code: "ja",
    nativeLabel: "日本語",
    enLabel: "Japanese",
    dir: "ltr",
    vertical: true,
    script: "Kanji / Kana",
    fontFamily: "'Yuji Syuku', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
    titleFont: "'Yuji Syuku', 'Hiragino Mincho ProN', serif",
    lineHeight: "2.1",
    letterSpacing: "0.04em",
    fontSize: "1.05rem",
  },
  {
    code: "he",
    nativeLabel: "עברית",
    enLabel: "Hebrew",
    dir: "rtl",
    vertical: false,
    script: "Hebrew",
    fontFamily: "'Frank Ruhl Libre', 'David', 'Times New Roman', serif",
    titleFont: "'Frank Ruhl Libre', 'David', serif",
    lineHeight: "1.78",
    letterSpacing: "0",
    fontSize: "var(--text-md)",
  },
  {
    code: "ar",
    nativeLabel: "العربية",
    enLabel: "Arabic",
    dir: "rtl",
    vertical: false,
    script: "Arabic",
    fontFamily: "'Aref Ruqaa Ink', 'Scheherazade New', 'Noto Naskh Arabic', serif",
    titleFont: "'Aref Ruqaa Ink', serif",
    lineHeight: "2.05",
    letterSpacing: "0",
    fontSize: "1.15rem",
  },
  {
    code: "zh-Hant",
    nativeLabel: "繁體中文",
    enLabel: "Trad. Chinese",
    dir: "ltr",
    vertical: false,
    script: "Traditional Han",
    fontFamily: "'ZCOOL XiaoWei', 'Noto Serif CJK TC', 'Heiti TC', serif",
    titleFont: "'ZCOOL XiaoWei', serif",
    lineHeight: "1.9",
    letterSpacing: "0.04em",
    fontSize: "var(--text-md)",
  },
  {
    code: "zh-Hans",
    nativeLabel: "简体中文",
    enLabel: "Simp. Chinese",
    dir: "ltr",
    vertical: false,
    script: "Simplified Han",
    fontFamily: "'Ma Shan Zheng', 'Noto Serif CJK SC', 'PingFang SC', serif",
    titleFont: "'Ma Shan Zheng', serif",
    lineHeight: "1.9",
    letterSpacing: "0.04em",
    fontSize: "var(--text-md)",
  },
];

/* ─── Translation data ───────────────────────────────────────────────────── */
interface Translation {
  title: string;
  tagline: string;
  problem: string;
  approachSummary: string;
  decisions: Array<[string, string]>; // [head, body]
  technical: string;
  outcome: string;
  metrics: string[];
  labels: {
    problem: string;
    approach: string;
    technical: string;
    outcome: string;
    back: string;
    allProjects: string;
  };
}

const TRANSLATIONS: Record<LangCode, Translation> = {
  en: {
    title: "Multi-Language Typography Engine",
    tagline:
      "Typography that doesn't just translate text — it reconfigures the entire reading surface for each language's structural requirements.",
    problem:
      "Standard i18n implementations swap text strings and stop there. The actual problem is deeper: Arabic and Hebrew require RTL layout direction, CJK scripts require fundamentally different font stacks and line-height adjustments, and some languages have UI strings long enough to break fixed-width navigation elements. A typography engine that only handles string replacement produces a site that technically supports eleven languages but visually reads like it was designed for one.",
    approachSummary:
      "Language switching is implemented as a coordinated state update that modifies the document's dir attribute, the html element's lang, the body's font-family via a scoped CSS class, and all UI strings simultaneously — from a single context dispatch.",
    decisions: [
      [
        "localStorage persistence",
        "the selected language is stored in localStorage and read on initial hydration to prevent flash-of-wrong-direction on return visits. The SSR default is 'en' with LTR; the client immediately reconciles on mount.",
      ],
      [
        "CJK font stack",
        "Japanese and Mandarin apply a separate --font-body token resolving to system CJK fonts. Line height increases from 1.6 to 1.8 for CJK to accommodate taller character bounding boxes.",
      ],
      [
        "RTL cascade",
        "Arabic and Hebrew set dir='rtl' on the html element, which reverses flex direction across the entire layout. Directional values are written using CSS logical properties (padding-inline-start, not padding-left) throughout.",
      ],
      [
        "Dynamic dir management",
        "The LanguageSwitcher imperatively updates document.dir on selection. This is intentionally imperative rather than declarative to avoid an intermediate render with the wrong direction.",
      ],
    ],
    technical:
      "The font switching mechanism relies on data-lang attributes cascaded from the html element rather than JavaScript-injected inline styles. Each language has a CSS rule matching [data-lang='ja'] body { font-family: var(--font-cjk); line-height: 1.8; } — which means the font change happens in a single style recalculation pass rather than through multiple JS DOM mutations. The LanguageSwitcher component itself is dynamically imported with ssr:false, preventing hydration mismatches from the localStorage read.",
    outcome:
      "Eleven languages rendering correctly with appropriate typography, reading direction, and UI strings — loaded from a single shared stylesheet with no per-language CSS bundles.",
    metrics: [
      "11 languages: Latin, RTL (Arabic, Hebrew), CJK (Japanese, Mandarin), Cyrillic, Nordic",
      "Single CSS bundle with data-attribute language scoping",
      "No layout shift on language switch",
      "localStorage persistence eliminates repeat-visit FOUC",
    ],
    labels: {
      problem: "Problem",
      approach: "Approach",
      technical: "Technical Detail",
      outcome: "Outcome",
      back: "← All Projects",
      allProjects: "← All Projects",
    },
  },

  fr: {
    title: "Moteur de Typographie Multilingue",
    tagline:
      "Une typographie qui ne se contente pas de traduire le texte — elle reconfigure toute la surface de lecture selon les exigences structurelles de chaque langue.",
    problem:
      "Les implémentations i18n standard permutent les chaînes de texte et s'arrêtent là. Le vrai problème est plus profond : l'arabe et l'hébreu exigent une direction RTL, les scripts CJK nécessitent des piles de polices fondamentalement différentes et des ajustements de hauteur de ligne, et certaines langues ont des chaînes d'interface suffisamment longues pour briser les éléments de navigation à largeur fixe. Un moteur typographique qui ne gère que le remplacement de chaînes produit un site qui supporte techniquement onze langues mais se lit visuellement comme s'il avait été conçu pour une seule.",
    approachSummary:
      "Le changement de langue est implémenté comme une mise à jour d'état coordonnée qui modifie simultanément l'attribut dir du document, le lang du html, la font-family du body via une classe CSS ciblée, et toutes les chaînes d'interface — depuis un seul dispatch de contexte.",
    decisions: [
      [
        "Persistance localStorage",
        "la langue sélectionnée est stockée dans localStorage et lue lors de l'hydratation initiale pour éviter un flash de mauvaise direction lors des visites répétées. La valeur SSR par défaut est 'en' avec LTR ; le client se réconcilie immédiatement au montage.",
      ],
      [
        "Pile de polices CJK",
        "Le japonais et le mandarin appliquent un token --font-body distinct résolvant vers les polices système CJK. La hauteur de ligne passe de 1,6 à 1,8 pour les scripts CJK afin d'accommoder des boîtes englobantes de caractères plus hautes.",
      ],
      [
        "Cascade RTL",
        "L'arabe et l'hébreu définissent dir='rtl' sur l'élément html, ce qui inverse la direction flex dans toute la mise en page. Les valeurs directionnelles sont écrites avec des propriétés CSS logiques (padding-inline-start, pas padding-left).",
      ],
      [
        "Gestion dynamique de dir",
        "Le LanguageSwitcher met à jour document.dir de manière impérative lors de la sélection. C'est intentionnellement impératif plutôt que déclaratif pour éviter un rendu intermédiaire avec la mauvaise direction.",
      ],
    ],
    technical:
      "Le mécanisme de changement de police repose sur des attributs data-lang cascadés depuis l'élément html plutôt que sur des styles inline injectés par JavaScript. Chaque langue possède une règle CSS correspondant à [data-lang='fr'] body { font-family: var(--font-serif); } — ce qui signifie que le changement de police se produit en un seul passage de recalcul de style plutôt qu'à travers de multiples mutations DOM JavaScript. Le composant LanguageSwitcher lui-même est importé dynamiquement avec ssr:false, empêchant les incompatibilités d'hydratation liées à la lecture de localStorage.",
    outcome:
      "Onze langues rendues correctement avec une typographie appropriée, une direction de lecture et des chaînes d'interface — chargées depuis une seule feuille de styles partagée sans bundles CSS par langue.",
    metrics: [
      "11 langues : Latin, RTL (arabe, hébreu), CJK (japonais, mandarin), cyrillique, nordique",
      "Bundle CSS unique avec portée par attribut data",
      "Aucun décalage de mise en page lors du changement de langue",
      "Persistance localStorage élimine le FOUC en revisitation",
    ],
    labels: {
      problem: "Problème",
      approach: "Approche",
      technical: "Détail Technique",
      outcome: "Résultat",
      back: "← Tous les projets",
      allProjects: "← Tous les projets",
    },
  },

  ja: {
    title: "多言語タイポグラフィエンジン",
    tagline:
      "テキストを翻訳するだけでなく、各言語の構造的な要件に合わせて読書面全体を再構成するタイポグラフィシステム。",
    problem:
      "標準的なi18n実装はテキスト文字列を入れ替えるだけで終わる。本当の問題はより深いところにある。アラビア語とヘブライ語はRTLレイアウト方向を必要とし、CJKスクリプトは根本的に異なるフォントスタックと行間の調整を必要とする。また、一部の言語では固定幅のナビゲーション要素を壊すほど長いUI文字列を持つ。文字列の置き換えしか処理しないタイポグラフィエンジンは、技術的には十一言語に対応しているが、視覚的には一言語向けに設計されたサイトのように見える。",
    approachSummary:
      "言語の切り替えは、ドキュメントのdir属性、htmlのlang、スコープ付きCSSクラスを介したbodyのfont-family、そしてすべてのUI文字列を、単一のコンテキストディスパッチから同時に変更する協調的な状態更新として実装されている。",
    decisions: [
      [
        "localStorageの永続化",
        "選択された言語はlocalStorageに保存され、初回ハイドレーション時に読み取られ、再訪時の誤った方向のフラッシュを防ぐ。SSRのデフォルトはLTRの「en」であり、クライアントはマウント時に即座に調整する。",
      ],
      [
        "CJKフォントスタック",
        "日本語と中国語は、システムCJKフォントに解決する別の--font-bodyトークンを適用する。CJKではより高い文字のバウンディングボックスに対応するため、行の高さが1.6から1.8に増加する。",
      ],
      [
        "RTLカスケード",
        "アラビア語とヘブライ語はhtml要素にdir='rtl'を設定し、レイアウト全体のフレックス方向を逆にする。方向性を持つ値はCSSの論理プロパティ（padding-inline-start）を使用して記述される。",
      ],
      [
        "動的dir管理",
        "LanguageSwitcherは選択時にdocument.dirを命令的に更新する。これは、誤った方向での中間レンダリングを避けるために、宣言的ではなく意図的に命令的に行われる。",
      ],
    ],
    technical:
      "フォント切り替えの仕組みは、JavaScriptで注入されたインラインスタイルではなく、html要素からカスケードされたdata-lang属性に依存している。各言語には[data-lang='ja'] body { font-family: var(--font-cjk); line-height: 1.8; }に一致するCSSルールがあり、フォントの変更は複数のJS DOM操作を通じてではなく、単一のスタイル再計算パスで行われる。LanguageSwitcherコンポーネント自体はssr:falseで動的にインポートされ、localStorageの読み取りによるハイドレーションの不一致を防ぐ。",
    outcome:
      "適切なタイポグラフィ、読書方向、UI文字列を備えた十一言語が、言語別CSSバンドルなしで単一の共有スタイルシートから正しくレンダリングされる。",
    metrics: [
      "11言語：ラテン文字、RTL（アラビア語、ヘブライ語）、CJK（日本語、中国語）、キリル文字、北欧語",
      "データ属性のスコープによる単一CSSバンドル",
      "言語切り替え時のレイアウトシフトなし",
      "localStorageの永続化により再訪時のFOUCを排除",
    ],
    labels: {
      problem: "問題",
      approach: "アプローチ",
      technical: "技術的詳細",
      outcome: "成果",
      back: "← プロジェクト一覧",
      allProjects: "← プロジェクト一覧",
    },
  },

  he: {
    title: "מנוע טיפוגרפיה רב-לשוני",
    tagline:
      "טיפוגרפיה שלא רק מתרגמת טקסט — היא מגדירה מחדש את כל משטח הקריאה בהתאם לדרישות המבניות של כל שפה.",
    problem:
      "יישומי i18n סטנדרטיים מחליפים מחרוזות טקסט ולא יותר. הבעיה האמיתית עמוקה יותר: ערבית ועברית דורשות כיוון פריסה RTL, כתבי CJK דורשים ערכות גופן שונות בתכלית ועדכוני גובה שורה, וחלק מהשפות מכילות מחרוזות ממשק משתמש ארוכות מספיק כדי לשבור רכיבי ניווט ברוחב קבוע. מנוע טיפוגרפי המטפל רק בהחלפת מחרוזות מייצר אתר התומך טכנית באחת-עשרה שפות אך נקרא ויזואלית כאילו תוכנן לשפה אחת בלבד.",
    approachSummary:
      "מיתוג שפה מיושם כעדכון מצב מתואם המשנה בו-זמנית את מאפיין dir של המסמך, את lang של html, את font-family של body דרך מחלקת CSS ממוקדת, ואת כל מחרוזות ממשק המשתמש — ממשלוח הקשר יחיד.",
    decisions: [
      [
        "שמירת localStorage",
        "השפה הנבחרת נשמרת ב-localStorage ונקראת בעת ה-hydration הראשוני כדי למנוע הבהוב בכיוון שגוי בביקורים חוזרים. ברירת המחדל של SSR היא 'en' עם LTR; הלקוח מיישב מיד עם העלייה לאוויר.",
      ],
      [
        "ערכת גופנים CJK",
        "יפנית ומנדרינית מיישמות אסימון --font-body נפרד המתבסס על גופני CJK של המערכת. גובה השורה עולה מ-1.6 ל-1.8 עבור CJK כדי להתאים לתיבות תוחם תווים גבוהות יותר.",
      ],
      [
        "מפל RTL",
        "ערבית ועברית מגדירות dir='rtl' על אלמנט html, המהפך את כיוון ה-flex בכל הפריסה. ערכי כיוון נכתבים באמצעות מאפייני CSS לוגיים (padding-inline-start, לא padding-left).",
      ],
      [
        "ניהול dir דינמי",
        "ה-LanguageSwitcher מעדכן את document.dir באופן הכרחי בבחירה. זהו בכוונה אימפרטיבי ולא הצהרתי כדי למנוע רינדור ביניים עם הכיוון השגוי.",
      ],
    ],
    technical:
      "מנגנון החלפת הגופנים מסתמך על מאפייני data-lang שנשפכים מאלמנט html במקום סגנונות inline שהוזרקו על ידי JavaScript. לכל שפה יש כלל CSS המתאים ל-[data-lang='he'] body { font-family: var(--font-hebrew); } — מה שאומר ששינוי הגופן מתרחש במעבר חישוב סגנון יחיד ולא דרך מוטציות DOM מרובות של JS. הרכיב LanguageSwitcher עצמו מיובא באופן דינמי עם ssr:false, המונע אי-התאמות hydration מקריאת ה-localStorage.",
    outcome:
      "אחת-עשרה שפות מוצגות כראוי עם טיפוגרפיה מתאימה, כיוון קריאה ומחרוזות ממשק — נטענות מגיליון סגנונות משותף יחיד ללא חבילות CSS לפי שפה.",
    metrics: [
      "11 שפות: לטינית, RTL (ערבית, עברית), CJK (יפנית, מנדרינית), קירילית, נורדית",
      "חבילת CSS יחידה עם ניתוח לפי מאפיין data",
      "אין הזזת פריסה בעת החלפת שפה",
      "שמירת localStorage מבטלת FOUC בביקורים חוזרים",
    ],
    labels: {
      problem: "הבעיה",
      approach: "גישה",
      technical: "פרטים טכניים",
      outcome: "תוצאה",
      back: "← כל הפרויקטים",
      allProjects: "← כל הפרויקטים",
    },
  },

  ar: {
    title: "محرك الطباعة متعدد اللغات",
    tagline:
      "طباعة لا تترجم النص فحسب — بل تُعيد تكوين سطح القراءة بأكمله وفقاً للمتطلبات البنيوية لكل لغة.",
    problem:
      "تكتفي تطبيقات i18n القياسية باستبدال سلاسل النص وتتوقف. المشكلة الحقيقية أعمق من ذلك: تتطلب اللغتان العربية والعبرية اتجاه تخطيط RTL، وتستلزم نصوص CJK مجموعات خطوط مختلفة جذرياً وتعديلات في ارتفاع الأسطر، وتحتوي بعض اللغات على سلاسل واجهة مستخدم طويلة بما يكفي لكسر عناصر التنقل ذات العرض الثابت. يُنتج محرك طباعة يتعامل فقط مع استبدال السلاسل موقعاً يدعم تقنياً إحدى عشرة لغة لكنه يُقرأ بصرياً كأنه صُمِّم لغة واحدة.",
    approachSummary:
      "يُنفَّذ تبديل اللغة على أنه تحديث حالة منسق يعدّل في آنٍ واحد خاصية dir للمستند، وخاصية lang لعنصر html، وخاصية font-family للـ body عبر فئة CSS محددة النطاق، وجميع سلاسل واجهة المستخدم — من إرسال سياق واحد.",
    decisions: [
      [
        "استمرارية localStorage",
        "تُخزَّن اللغة المحددة في localStorage وتُقرأ عند الترطيب الأولي لمنع وميض الاتجاه الخاطئ في الزيارات المتكررة. الافتراضي في SSR هو 'en' مع LTR؛ يُوفِّق العميل على الفور عند التحميل.",
      ],
      [
        "مجموعة خطوط CJK",
        "تطبق اليابانية والصينية رمزاً --font-body منفصلاً يحل إلى خطوط CJK للنظام. يرتفع ارتفاع السطر من 1.6 إلى 1.8 لـ CJK لاستيعاب مربعات الإحاطة الأعلى للأحرف.",
      ],
      [
        "تتالي RTL",
        "تضبط العربية والعبرية dir='rtl' على عنصر html، مما يعكس اتجاه flex في جميع أنحاء التخطيط. تُكتب القيم الاتجاهية باستخدام خصائص CSS المنطقية (padding-inline-start لا padding-left).",
      ],
      [
        "إدارة dir الديناميكية",
        "يُحدِّث LanguageSwitcher document.dir بشكل أمري عند الاختيار. هذا مقصود بشكل أمري لا تصريحي لتجنب عرض وسيط بالاتجاه الخاطئ.",
      ],
    ],
    technical:
      "يعتمد آلية تبديل الخطوط على سمات data-lang المتتالية من عنصر html بدلاً من الأنماط المضمنة المُحقنة بـ JavaScript. لكل لغة قاعدة CSS مطابقة لـ [data-lang='ar'] body { font-family: var(--font-arabic); } — مما يعني أن تغيير الخط يحدث في تمريرة إعادة حساب نمط واحدة لا عبر طفرات DOM متعددة في JS. يُستورَد مكوِّن LanguageSwitcher نفسه ديناميكياً مع ssr:false، مما يمنع عدم تطابق الترطيب من قراءة localStorage.",
    outcome:
      "إحدى عشرة لغة تُعرض بشكل صحيح مع الطباعة المناسبة وإتجاه القراءة وسلاسل واجهة المستخدم — مُحمَّلة من ورقة أنماط مشتركة واحدة دون حزم CSS لكل لغة.",
    metrics: [
      "11 لغة: لاتينية، RTL (عربية، عبرية)، CJK (يابانية، صينية)، سيريلية، إسكندنافية",
      "حزمة CSS واحدة مع تحديد النطاق بسمة البيانات",
      "لا يوجد تحول في التخطيط عند تبديل اللغة",
      "استمرارية localStorage تُلغي FOUC في الزيارات المتكررة",
    ],
    labels: {
      problem: "المشكلة",
      approach: "النهج",
      technical: "التفاصيل التقنية",
      outcome: "النتيجة",
      back: "← جميع المشاريع",
      allProjects: "← جميع المشاريع",
    },
  },

  "zh-Hant": {
    title: "多語言字體排版引擎",
    tagline:
      "不僅翻譯文字的排版設計——它為每種語言的結構性需求重新配置整個閱讀介面。",
    problem:
      "標準的i18n實作只是替換文字字串就停止了。真正的問題更深層：阿拉伯語和希伯來語需要RTL佈局方向，CJK字型需要根本不同的字型組和行高調整，而某些語言的介面字串長度足以破壞固定寬度的導覽元素。只處理字串替換的排版引擎產生了一個網站，在技術上支援十一種語言，但在視覺上看起來像是為一種語言設計的。",
    approachSummary:
      "語言切換作為協調狀態更新實作，從單一上下文派發同時修改文件的dir屬性、html的lang、透過範圍CSS類別的body字型系列，以及所有介面字串。",
    decisions: [
      [
        "localStorage持久化",
        "選擇的語言儲存在localStorage中，並在初始水合時讀取，以防止回訪時出現錯誤方向的閃爍。SSR預設為帶有LTR的'en'；客戶端在掛載時立即協調。",
      ],
      [
        "CJK字型堆疊",
        "日語和普通話應用單獨的--font-body令牌，解析為系統CJK字型。CJK的行高從1.6增加到1.8，以適應更高的字元邊界框。",
      ],
      [
        "RTL級聯",
        "阿拉伯語和希伯來語在html元素上設定dir='rtl'，這會反轉整個佈局中的flex方向。方向值使用CSS邏輯屬性編寫（padding-inline-start，而非padding-left）。",
      ],
      [
        "動態dir管理",
        "LanguageSwitcher在選擇時強制更新document.dir。這是有意為之的命令式而非宣告式，以避免以錯誤方向進行中間渲染。",
      ],
    ],
    technical:
      "字型切換機制依賴從html元素級聯的data-lang屬性，而非JavaScript注入的行內樣式。每種語言都有一個與[data-lang='zh-Hant'] body { font-family: var(--font-cjk); }匹配的CSS規則——這意味著字型變更發生在單一樣式重新計算過程中，而不是通過多個JS DOM操作。LanguageSwitcher元件本身使用ssr:false動態匯入，防止localStorage讀取造成的水合不匹配。",
    outcome:
      "十一種語言以適當的字體排版、閱讀方向和介面字串正確渲染——從單一共享樣式表載入，無需按語言分離的CSS套件。",
    metrics: [
      "11種語言：拉丁語、RTL（阿拉伯語、希伯來語）、CJK（日語、普通話）、西里爾語、北歐語",
      "使用資料屬性範圍的單一CSS套件",
      "語言切換時無佈局偏移",
      "localStorage持久化消除重訪時的FOUC",
    ],
    labels: {
      problem: "問題",
      approach: "方法",
      technical: "技術細節",
      outcome: "成果",
      back: "← 所有專案",
      allProjects: "← 所有專案",
    },
  },

  "zh-Hans": {
    title: "多语言字体排版引擎",
    tagline:
      "不仅翻译文字的排版设计——它为每种语言的结构性需求重新配置整个阅读界面。",
    problem:
      "标准的i18n实现只是替换文字字符串就停止了。真正的问题更深层：阿拉伯语和希伯来语需要RTL布局方向，CJK字体需要根本不同的字体组和行高调整，而某些语言的界面字符串长度足以破坏固定宽度的导航元素。只处理字符串替换的排版引擎产生了一个网站，在技术上支持十一种语言，但在视觉上看起来像是为一种语言设计的。",
    approachSummary:
      "语言切换作为协调状态更新实现，从单一上下文派发同时修改文档的dir属性、html的lang、通过作用域CSS类的body字体系列，以及所有界面字符串。",
    decisions: [
      [
        "localStorage持久化",
        "选择的语言存储在localStorage中，并在初始水合时读取，以防止回访时出现错误方向的闪烁。SSR默认为带有LTR的'en'；客户端在挂载时立即协调。",
      ],
      [
        "CJK字体堆栈",
        "日语和普通话应用单独的--font-body令牌，解析为系统CJK字体。CJK的行高从1.6增加到1.8，以适应更高的字符边界框。",
      ],
      [
        "RTL级联",
        "阿拉伯语和希伯来语在html元素上设置dir='rtl'，这会反转整个布局中的flex方向。方向值使用CSS逻辑属性编写（padding-inline-start，而非padding-left）。",
      ],
      [
        "动态dir管理",
        "LanguageSwitcher在选择时命令式地更新document.dir。这是有意为之的命令式而非声明式，以避免以错误方向进行中间渲染。",
      ],
    ],
    technical:
      "字体切换机制依赖从html元素级联的data-lang属性，而非JavaScript注入的内联样式。每种语言都有一个与[data-lang='zh-Hans'] body { font-family: var(--font-cjk); }匹配的CSS规则——这意味着字体变更发生在单一样式重新计算过程中，而不是通过多个JS DOM操作。LanguageSwitcher组件本身使用ssr:false动态导入，防止localStorage读取造成的水合不匹配。",
    outcome:
      "十一种语言以适当的字体排版、阅读方向和界面字符串正确渲染——从单一共享样式表加载，无需按语言分离的CSS包。",
    metrics: [
      "11种语言：拉丁语、RTL（阿拉伯语、希伯来语）、CJK（日语、普通话）、西里尔语、北欧语",
      "使用数据属性作用域的单一CSS包",
      "语言切换时无布局偏移",
      "localStorage持久化消除重访时的FOUC",
    ],
    labels: {
      problem: "问题",
      approach: "方法",
      technical: "技术细节",
      outcome: "成果",
      back: "← 所有项目",
      allProjects: "← 所有项目",
    },
  },
};

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function LangTypographyCaseStudy() {
  const [lang, setLang] = useState<LangCode>("en");
  const [fading, setFading] = useState(false);
  const [, startTransition] = useTransition();

  const cfg = LANGS.find((l) => l.code === lang)!;
  const t = TRANSLATIONS[lang];

  function switchLang(next: LangCode) {
    if (next === lang) return;
    setFading(true);
    setTimeout(() => {
      startTransition(() => {
        setLang(next);
        setFading(false);
      });
    }, 200);
  }

  const articleStyle: React.CSSProperties = {
    fontFamily: cfg.fontFamily,
    lineHeight: cfg.lineHeight,
    letterSpacing: cfg.letterSpacing,
    fontSize: cfg.fontSize,
  };

  const titleStyle: React.CSSProperties = {
    fontFamily: cfg.titleFont,
  };

  return (
    <div className={styles.root}>
      {/* Back */}
      <div className={styles.back}>
        <Link href="/projects" className={styles.backLink}>
          ← All Projects
        </Link>
      </div>

      {/* Language switcher — always LTR, always English-label sub-text */}
      <div className={styles.switcherWrap}>
        <div className={styles.switcherRow}>
          {LANGS.map((l) => (
            <button
              key={l.code}
              className={[
                styles.langBtn,
                l.code === lang ? styles.langBtnActive : "",
              ].join(" ")}
              onClick={() => switchLang(l.code)}
              lang={l.code}
              aria-pressed={l.code === lang}
            >
              <span className={styles.langBtnNative}>{l.nativeLabel}</span>
              <span className={styles.langBtnEn}>{l.enLabel}</span>
            </button>
          ))}

          <div className={styles.switcherMeta}>
            <span className={styles.metaChip}>
              <span className={styles.metaChipLabel}>dir</span>
              <span className={styles.metaChipValue}>
                {cfg.vertical ? "vertical-rl" : cfg.dir}
              </span>
            </span>
            <span className={styles.metaChip}>
              <span className={styles.metaChipLabel}>script</span>
              <span className={styles.metaChipValue}>{cfg.script}</span>
            </span>
            <span className={styles.metaChip}>
              <span className={styles.metaChipLabel}>lh</span>
              <span className={styles.metaChipValue}>{cfg.lineHeight}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Article — font, direction, writing-mode all change here */}
      <article
        lang={lang}
        dir={cfg.dir}
        className={[
          styles.article,
          cfg.vertical ? styles.articleVertical : "",
          fading ? styles.articleFading : "",
        ].join(" ")}
        style={articleStyle}
      >
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.year}>2025</span>
            <ul className={styles.stack} role="list">
              {["React Context", "TypeScript", "CSS Custom Properties", "i18n"].map(
                (tag) => (
                  <li key={tag} className={styles.stackTag}>
                    {tag}
                  </li>
                )
              )}
            </ul>
          </div>
          <h1 className={styles.title} style={titleStyle}>
            {t.title}
          </h1>
          <p className={styles.tagline}>{t.tagline}</p>
        </header>

        <div className={styles.body}>
          {/* Problem */}
          <section className={styles.section}>
            <p className={[styles.sectionLabel].join(" ")}>{t.labels.problem}</p>
            <p className={styles.prose}>{t.problem}</p>
          </section>

          {/* Approach */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t.labels.approach}</p>
            <p className={styles.prose}>{t.approachSummary}</p>
            <ul className={styles.decisions}>
              {t.decisions.map(([head, body], i) => (
                <li key={i} className={styles.decision}>
                  <span className={styles.decisionHead}>{head}:</span> {body}
                </li>
              ))}
            </ul>
          </section>

          {/* Technical */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t.labels.technical}</p>
            <p className={styles.prose}>{t.technical}</p>
          </section>

          {/* Outcome */}
          <section className={styles.section}>
            <p className={styles.sectionLabel}>{t.labels.outcome}</p>
            <p className={styles.prose}>{t.outcome}</p>
            <ul className={styles.metrics}>
              {t.metrics.map((m, i) => (
                <li key={i} className={styles.metric}>
                  {m}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Footer nav */}
        <footer className={styles.footer}>
          <Link href="/projects" className={styles.footerLink}>
            {t.labels.allProjects}
          </Link>
        </footer>
      </article>

      {/* Fixed typographic annotation — shows current font name */}
      <p className={styles.typographyLabel} aria-hidden>
        {cfg.fontFamily.split(",")[0].replace(/['"]/g, "")} · {cfg.script} ·{" "}
        {cfg.vertical ? "vertical-rl" : cfg.dir.toUpperCase()}
      </p>
    </div>
  );
}
