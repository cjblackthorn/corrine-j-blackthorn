import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const read = route => readFileSync(path.join('dist', route), 'utf8');
const home = read('index.html');
const contact = read('contact/index.html');
assert.ok(contact.includes('Connect and collaborate.'), 'Contact page not rendered');
assert.ok(contact.includes('rel="canonical" href="https://corrinejblackthorn.com/contact/"'), 'Contact canonical missing');
assert.ok(contact.includes('LinkedIn'), 'Missing professional contact destination');
assert.ok(!/<form(?:\s|>)/i.test(contact), 'Contact page unexpectedly captures form data');
assert.ok(!/mailto:|tel:/i.test(contact), 'Private contact information must not be published');
assert.ok(home.includes('href="/contact/"'), 'Header contact navigation missing');
assert.ok(home.includes('aria-controls="site-primary-nav"'), 'Accessible menu relationship missing');
const sitemap=read('sitemap.xml');
assert.ok(sitemap.includes('https://corrinejblackthorn.com/contact/'), 'Contact missing from sitemap');
for(const route of ['index.html','about/index.html','contact/index.html']){
  assert.ok(existsSync(path.join('dist',route)), 'Missing generated route: '+route);
}
console.log('PASS: R4 contact, privacy, navigation, sitemap and route smoke checks');
