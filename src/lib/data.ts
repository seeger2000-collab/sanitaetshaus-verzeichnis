import shopsJson from '../data/shops.json';
import citiesJson from '../data/cities.json';
import statesJson from '../data/states.json';
import metaJson from '../data/meta.json';
import providersJson from '../data/providers.json';

export type Shop = {
  id: string; slug: string; name: string; brand: string | null;
  street: string | null; postcode: string | null; city: string; citySlug: string;
  district: string | null; state: string; stateSlug: string; lat?: number; lon?: number;
  phone: string | null; email: string | null; website: string | null;
  openingHours: string | null; wheelchair: string | null;
  features: string[]; kassen: string[]; evidence: Record<string, string>;
  websiteCheckedAt: string | null; featured: boolean;
};
export type City = { id: string; name: string; label: string; slug: string; district: string | null; state: string; stateSlug: string; count: number; counts: Record<string, number>; lat: number; lon: number };
export type Provider = {
  cat: string; id: string; name: string; street: string | null; postcode: string | null; city: string; citySlug: string; stateSlug: string; state: string;
  lat?: number; lon?: number; phone: string | null; website: string | null; openingHours: string | null; wheelchair: string | null;
  features: string[]; evidence: Record<string, string>;
};

export const shops = shopsJson as Shop[];
export const allCities = citiesJson as City[];
// Orte mit mindestens einem Sanitätshaus (für /stadt/)
export const cities = allCities.filter((c) => c.count > 0);
export const states = statesJson as { name: string; slug: string; count: number }[];
export const meta = metaJson;
export const providers = providersJson as Provider[];
export const categories = meta.categories;
export const otherCategories = categories.filter((c) => c.key !== 'sanitaetshaus');
export const categoryBySlug = Object.fromEntries(categories.map((c) => [c.slug, c]));
export const providersByCat = (cat: string) => providers.filter((p) => p.cat === cat);
export const features = meta.features;
export const featureByKey = Object.fromEntries(features.map((f) => [f.key, f]));
export const kasseLabel = Object.fromEntries(meta.kassen.map((k) => [k.key, k.label]));

export const shopsInCity = (slug: string) => shops.filter((s) => s.citySlug === slug);
export const fmtDate = (iso: string) => new Date(iso).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' });

import { km } from './geo';
export const nearbyCities = (city: City, n = 10) => cities.filter((c) => c.slug !== city.slug).map((c) => ({ ...c, km: km(city, c) })).sort((a, b) => a.km - b.km).slice(0, n);
export const abs = (site: URL | undefined, path: string) => new URL(path, site).href;

// Kürzt Meta-Beschreibungen auf ~155 Zeichen am Wortende
export const clip = (s: string, n = 155) => (s.length <= n ? s : s.slice(0, s.lastIndexOf(' ', n - 1)).replace(/[,.:;]$/, '') + ' …');
// Wählt den ersten Titel, der höchstens n Zeichen hat
export const fit = (options: string[], n = 62) => options.find((o) => o.length <= n) ?? options[options.length - 1];
