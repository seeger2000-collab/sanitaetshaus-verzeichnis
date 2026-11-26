// Sprachen der Seite. Neue Sprache: Datei src/i18n/<code>.ts nach Vorbild en.ts anlegen und hier in LANGS eintragen.
// Deutsch liegt ohne Präfix unter /, jede weitere Sprache unter /<code>/ (z. B. /en/).
// Übersetzt sind bisher die Startseite und die Kategorieseiten (siehe translatedPaths); alle anderen Seiten bleiben deutsch.
import { de, type Dict } from './de';
import { en } from './en';
import { tr } from './tr';
import { otherCategories } from '../lib/data';

export const LANGS: Record<string, Dict> = { de, en, tr };
export type Lang = keyof typeof LANGS;
export const DEFAULT_LANG = 'de';
export const OTHER_LANGS = Object.keys(LANGS).filter((l) => l !== DEFAULT_LANG);

// Deutsche Pfade, die es auch in den anderen Sprachen gibt
export const translatedPaths = () => ['/', ...otherCategories.map((c) => `/${c.slug}/`)];

// Sprache aus dem Pfad (ohne Basis-Pfad), z. B. /en/physiotherapie/ -> en
export const langOf = (path: string) => { const m = path.match(/^\/([a-z]{2})(\/|$)/); return m && LANGS[m[1]] && m[1] !== DEFAULT_LANG ? m[1] : DEFAULT_LANG; };
// Deutscher Pfad zu einem Pfad in beliebiger Sprache
export const dePath = (path: string) => { const l = langOf(path); return l === DEFAULT_LANG ? path : path.slice(l.length + 1) || '/'; };
// Pfad in Sprache lang, wenn die Seite übersetzt ist, sonst der deutsche Pfad
export const lp = (lang: string, path: string) => (lang === DEFAULT_LANG || !translatedPaths().includes(path) ? path : `/${lang}${path}`);
export const isTranslated = (path: string) => translatedPaths().includes(dePath(path));
// Platzhalter {name} ersetzen
export const fmt = (s: string, vars: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
