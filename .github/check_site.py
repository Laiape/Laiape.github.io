"""Validate this static site and optionally collect its public files for Pages."""
import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import json
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parent.parent
PAGES = [ROOT / name for name in ('index.html', 'portfolio.html', 'about.html', 'cv.html')]
PAGES += sorted((ROOT / 'projects').glob('*.html'))

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.refs = []
        self.ids = set()
        self.errors = []
        self.h1 = 0
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if 'id' in attrs:
            if attrs['id'] in self.ids: self.errors.append('Duplicate id: ' + attrs['id'])
            self.ids.add(attrs['id'])
        for name in ('src', 'href', 'poster', 'data-src', 'data-poster'):
            if attrs.get(name): self.refs.append(attrs[name])
        if attrs.get('srcset'):
            self.refs.extend(s.strip().split()[0] for s in attrs['srcset'].split(','))
        if tag == 'video':
            if 'autoplay' in attrs: self.errors.append('Autoplay video')
            if 'controls' not in attrs: self.errors.append('Video without controls')
            if attrs.get('preload') != 'none': self.errors.append('Video downloads before user action')
            if not attrs.get('poster'): self.errors.append('Video without poster')
        if tag == 'img':
            for name in ('alt', 'width', 'height'):
                if name not in attrs: self.errors.append('Image without ' + name)
        if tag == 'a' and attrs.get('target') == '_blank':
            if 'noopener' not in attrs.get('rel', ''): self.errors.append('External target without noopener')

def resolve(page, url):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc: return None, None
    path = unquote(parsed.path)
    target = (ROOT / path.lstrip('/')) if path.startswith('/') else page.parent / path
    if not path: target = page
    if path.endswith('/'): target /= 'index.html'
    target = target.resolve()
    if not target.is_relative_to(ROOT): raise ValueError('Reference escapes site: ' + url)
    return target, parsed.fragment

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--package', action='store_true')
    args = parser.parse_args()
    errors = []
    public = set(PAGES)
    parsed = {page: Page(page.read_text(encoding='utf-8-sig')) for page in PAGES}
    for page, doc in parsed.items():
        if doc.h1 != 1: errors.append(f'{page.name}: expected one h1, got {doc.h1}')
        errors += [f'{page.name}: {error}' for error in doc.errors]
        raw = page.read_text(encoding='utf-8-sig')
        for forbidden in ('77%', '9 standalone tools', '7+ production', '6b9809277', 'Coming soon', 'cv.pdf'):
            if forbidden.lower() in raw.lower(): errors.append(f'{page.name}: stale content {forbidden}')
        for url in doc.refs:
            target, fragment = resolve(page, url)
            if target is None: continue
            if not target.is_file(): errors.append(f'{page.name}: missing {url}')
            else:
                public.add(target)
                if fragment and target in parsed and fragment not in parsed[target].ids:
                    errors.append(f'{page.name}: missing anchor {url}')
    css = ROOT / 'style.css'
    for url in re.findall(r'url\([\'\"]?([^\)\'\"]+)', css.read_text(encoding='utf-8')):
        target, _ = resolve(css, url)
        if target:
            if not target.exists(): errors.append('Missing CSS resource ' + url)
            public.add(target)
    public.update([ROOT/'robots.txt', ROOT/'sitemap.xml', ROOT/'assets/og-card.jpg'])
    public.update((ROOT/'assets/fonts').glob('*OFL.txt'))
    if errors:
        print('\n'.join(errors)); return 1
    if args.package:
        dest = (ROOT / '_site').resolve()
        if dest.parent != ROOT or dest.name != '_site': raise ValueError('Unsafe output path')
        if dest.exists(): shutil.rmtree(dest)
        dest.mkdir()
        for source in sorted(public):
            relative = source.relative_to(ROOT)
            if any(part.startswith('.') for part in relative.parts): raise ValueError('Private file in public files')
            target = dest / relative
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, target)
        (dest / '.nojekyll').touch()
    print(json.dumps({'status':'pass', 'pages':len(PAGES), 'public_files':len(public), 'public_bytes':sum(p.stat().st_size for p in public), 'packaged':args.package}))
    return 0

if __name__ == '__main__': sys.exit(main())
