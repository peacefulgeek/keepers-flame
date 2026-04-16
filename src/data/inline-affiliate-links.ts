// Inline Affiliate Links — Natural embedding into article bodies
// Injects 2-4 Amazon links at natural breakpoints + bottom section

import { Product, amazonUrl, matchProducts } from './product-catalog';

const SOFT_INTROS = [
  'One option that many people like is',
  'A tool that often helps with this is',
  'Something worth considering might be',
  'For those looking for a simple solution, this works well:',
  'You could also try',
  'A popular choice for situations like this is',
  'One resource that many caregivers recommend is',
  'Something that has helped others in similar situations is',
  'For those who want something practical, one option is',
  'A small thing that can make a real difference is',
];

function pickIntro(index: number): string {
  return SOFT_INTROS[index % SOFT_INTROS.length];
}

export function generateInlineLinks(title: string, category: string, tags: string[]): {
  inlineHtml: string[];
  bottomSection: string;
} {
  const matched = matchProducts(title, category, tags);
  if (matched.length === 0) {
    return { inlineHtml: [], bottomSection: '' };
  }

  // 2-4 inline links
  const inlineCount = Math.min(Math.max(2, Math.floor(Math.random() * 3) + 2), matched.length, 4);
  const inlineProducts = matched.slice(0, inlineCount);
  const bottomProducts = matched.slice(0, 4); // May overlap, that's fine for bottom section

  const inlineHtml = inlineProducts.map((p, i) => {
    const intro = p.sentence || pickIntro(i);
    return `<p>${intro} <a href="${amazonUrl(p.asin)}" target="_blank" rel="nofollow noopener">${p.name}</a> (paid link).</p>`;
  });

  // Bottom "Healing Journey" section
  const bottomItems = bottomProducts.map(p =>
    `<li><a href="${amazonUrl(p.asin)}" target="_blank" rel="nofollow noopener">${p.name}</a> - ${p.sentence.replace(/^(One |A |Something |For |You )/, '').slice(0, 80)} (paid link)</li>`
  ).join('\n');

  const bottomSection = `
<div class="healing-journey">
<h3>Resources for Your Healing Journey</h3>
<ul>
${bottomItems}
</ul>
<p class="affiliate-note">As an Amazon Associate, I earn from qualifying purchases.</p>
</div>`;

  return { inlineHtml, bottomSection };
}
