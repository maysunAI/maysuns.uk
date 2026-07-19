/* maySunAI — shared site logic (language switch, theme toggle) */
/* Expects window.SITE_I18N = { ja: {...}, en: {...}, zh: {...} } to be loaded first (assets/i18n.js) */

var langCodeMap = { en: 'en', zh: 'zh-CN', ja: 'ja' };
var currentLang = 'en';

function detectDefaultLang() {
  var saved = localStorage.getItem('lang');
  if (saved && window.SITE_I18N[saved]) return saved;
  var nav = (navigator.language || 'en').toLowerCase();
  if (nav.indexOf('ja') === 0) return 'ja';
  if (nav.indexOf('zh') === 0) return 'zh';
  return 'en';
}

function applyLanguage(lang) {
  if (!window.SITE_I18N[lang]) lang = 'en';
  currentLang = lang;
  document.documentElement.lang = langCodeMap[lang] || 'en';

  var dict = window.SITE_I18N[lang];

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    var key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll('[data-i18n-desc]').forEach(function (el) {
    var key = el.getAttribute('data-i18n-desc');
    if (dict[key] !== undefined) {
      el.setAttribute('content', dict[key]);
    }
  });

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  updateThemeButtonLabel();
  localStorage.setItem('lang', lang);
}

function setLanguage(lang) {
  applyLanguage(lang);
}

function updateThemeButtonLabel() {
  var html = document.documentElement;
  var btn = document.getElementById('themeBtn');
  if (!btn) return;
  var dict = window.SITE_I18N[currentLang] || window.SITE_I18N.en;
  btn.textContent = html.getAttribute('data-theme') === 'dark' ? dict.theme_light : dict.theme_dark;
}

function toggleTheme() {
  var html = document.documentElement;
  var newTheme = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButtonLabel();
}

function detectDefaultTheme() {
  var saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
}

document.documentElement.setAttribute('data-theme', detectDefaultTheme());
document.addEventListener('DOMContentLoaded', function () {
  applyLanguage(detectDefaultLang());
});
