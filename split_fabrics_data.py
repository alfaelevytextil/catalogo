from pathlib import Path

base = Path('js/fabrics-data.js')
text = base.read_text(encoding='utf-8').splitlines()
markers = {'LISOS': None, 'TRAMAS': None, 'TEXTURIZADOS': None, 'ESTAMPADOS': None}
for i, line in enumerate(text):
    if '// ── LISOS' in line:
        markers['LISOS'] = i
    if '// ── TRAMAS' in line:
        markers['TRAMAS'] = i
    if '// ── TEXTURIZADOS' in line:
        markers['TEXTURIZADOS'] = i
    if '// ── ESTAMPADOS' in line:
        markers['ESTAMPADOS'] = i
if None in markers.values():
    raise SystemExit(f'Missing markers: {markers}')

end_index = None
for i in range(len(text) - 1, -1, -1):
    if text[i].strip() == '};':
        end_index = i
        break
if end_index is None:
    raise SystemExit('Could not find closing };')

sections = {
    'lisos': (markers['LISOS'], markers['TRAMAS']),
    'tramas': (markers['TRAMAS'], markers['TEXTURIZADOS']),
    'texturizados': (markers['TEXTURIZADOS'], markers['ESTAMPADOS']),
    'estampados': (markers['ESTAMPADOS'], end_index),
}
for name, (start, stop) in sections.items():
    content = [f'/* Auto-gerado: dados de tecidos {name.upper()} */', f'const FABRICS_{name.upper()} = {{']
    content.extend(text[start + 1:stop])
    content.append('};')
    Path(f'js/fabrics-{name}.js').write_text('\n'.join(content) + '\n', encoding='utf-8')
    print(f'Wrote js/fabrics-{name}.js')

agg = [
    '/* Auto-gerado: agregador de dados de tecidos */',
    'const FABRICS = {',
    '  ...FABRICS_LISOS,',
    '  ...FABRICS_TRAMAS,',
    '  ...FABRICS_TEXTURIZADOS,',
    '  ...FABRICS_ESTAMPADOS,',
    '};',
    '',
    '/* Adicione novos tecidos em js/fabrics-lisos.js, js/fabrics-tramas.js, js/fabrics-texturizados.js ou js/fabrics-estampados.js */',
]
Path('js/fabrics-data.js').write_text('\n'.join(agg) + '\n', encoding='utf-8')
print('Updated js/fabrics-data.js as aggregator')