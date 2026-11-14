// Languages offered for text translation at https://translate.google.com/.
const codes = `
ab ace ach aa af sq alz am ar hy as av awa ay az ban bal bm bci ba eu btx bts bbc be bem bn bew bho bik bs br bg bua yue ca ceb ch ce ny zh-CN zh-TW chk cv co crh crh-Latn hr cs da fa-AF dv din doi dov nl dyu dz en eo et ee fo fj tl fi fon fr fr-CA fy fur ff gaa gl ka de el gn gu ht cnh ha haw iw hil hi hmn hu hrx iba is ig ilo id iu-Latn iu ga it jam ja jw kac kl kn kr pam kk kha km cgg kg rw ktu trp kv gom ko kri ku ckb ky lo ltg la lv lij li ln lt lmo lg luo lb mk mad mai mak mg ms ms-Arab ml mt mam gv mi mr mh mwr mfe chm mni-Mtei min lus mn my nhe ndc-ZW nr new ne bm-Nkoo no nus oc or om os pag pap ps fa pl pt pt-PT pa pa-Arab qu kek rom ro rn ru se sm sg sa sat-Latn sat gd nso sr st crs shn sn scn szl sd si sk sl so es su sus sw ss sv ty tg ber-Latn ber ta tt te tet th bo ti tiv tpi to lua ts tn tcy tum tr tk tyv ak udm uk ur ug uz ve vec vi war cy wo xh sah yi yo yua zap zu
`.trim().split(/\s+/)

const names = new Intl.DisplayNames(['en'], { type: 'language' })
const labels: Record<string, string> = {
  alz: 'Alur', btx: 'Batak Karo', bts: 'Batak Simalungun', bbc: 'Batak Toba',
  cgg: 'Kiga', dov: 'Dombe', 'fa-AF': 'Dari', hrx: 'Hunsrik', jam: 'Jamaican Patois',
  'zh-CN': 'Chinese (Simplified)', 'zh-TW': 'Chinese (Traditional)',
  crh: 'Crimean Tatar (Cyrillic)', 'crh-Latn': 'Crimean Tatar (Latin)',
  'fr-CA': 'French (Canada)', tl: 'Filipino', 'iu-Latn': 'Inuktut (Latin)',
  iu: 'Inuktut (Syllabics)', trp: 'Kokborok', ktu: 'Kituba', ku: 'Kurdish (Kurmanji)',
  'ms-Arab': 'Malay (Jawi)', 'mni-Mtei': 'Meiteilon (Manipuri)', mwr: 'Marwadi',
  'ndc-ZW': 'Ndau', 'bm-Nkoo': 'NKo', nhe: 'Nahuatl (Eastern Huasteca)',
  new: 'Nepalbhasa (Newari)', pap: 'Papiamento', pt: 'Portuguese (Brazil)',
  'pt-PT': 'Portuguese (Portugal)', pa: 'Punjabi (Gurmukhi)',
  'pa-Arab': 'Punjabi (Shahmukhi)', kek: 'Qʼeqchiʼ', sat: 'Santali (Ol Chiki)',
  'sat-Latn': 'Santali (Latin)', 'ber-Latn': 'Tamazight', ber: 'Tamazight (Tifinagh)',
}

export function languageName(code: string) {
  if (Object.hasOwn(labels, code)) return labels[code]
  return /^[a-z]{2,3}(?:-(?:[A-Za-z]{2}|[A-Za-z]{4}))?$/.test(code)
    ? names.of(code) ?? code
    : code
}

export const googleLanguageCodes = new Set(codes)

export function readLanguageOrder(value: string) {
  if (!value.includes(',') && googleLanguageCodes.has(value)) return [value]
  return [...new Set(value.split(value.includes(',') ? ',' : '-').filter(Boolean))]
}
