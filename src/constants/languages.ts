export interface Language {
    code: string
    name: string
    native: string
    region: string
    rtl?: number
}

export const languages: Language[] = [
    {
        code: 'af',
        name: 'Afrikaans',
        native: 'Afrikaans',
        region: 'South Africa'
    },
    {
        code: 'am',
        name: 'Amharic',
        native: 'አማርኛ',
        region: 'Ethiopia'
    },
    {
        code: 'ar',
        name: 'Arabic',
        native: 'العربية',
        rtl: 1,
        region: 'Saudi Arabia'
    },
    {
        code: 'as',
        name: 'Assamese',
        native: 'অসমীয়া',
        region: 'India'
    },
    {
        code: 'az',
        name: 'Azerbaijani',
        native: 'Azərbaycanca / آذربايجان',
        region: 'Azerbaijan'
    },
    {
        code: 'ba',
        name: 'Bashkir',
        native: 'Башҡорт',
        region: 'Russia'
    },
    {
        code: 'be',
        name: 'Belarusian',
        native: 'Беларуская',
        region: 'Belarus'
    },
    {
        code: 'bg',
        name: 'Bulgarian',
        native: 'Български',
        region: 'Bulgaria'
    },
    {
        code: 'bn',
        name: 'Bengali',
        native: 'বাংলা',
        region: 'Bangladesh'
    },
    {
        code: 'bo',
        name: 'Tibetan',
        native: 'བོད་ཡིག / Bod skad',
        region: 'Tibet'
    },
    {
        code: 'br',
        name: 'Breton',
        native: 'Brezhoneg',
        region: 'France'
    },
    {
        code: 'bs',
        name: 'Bosnian',
        native: 'Bosanski',
        region: 'Bosnia'
    },
    {
        code: 'ca',
        name: 'Catalan',
        native: 'Català',
        region: 'Spain'
    },
    {
        code: 'ch',
        name: 'Chamorro',
        native: 'Chamoru',
        region: 'Guam'
    },
    {
        code: 'co',
        name: 'Corsican',
        native: 'Corsu',
        region: 'France'
    },
    {
        code: 'cs',
        name: 'Czech',
        native: 'Česky',
        region: 'Czech Republic'
    },
    {
        code: 'cy',
        name: 'Welsh',
        native: 'Cymraeg',
        region: 'Wales'
    },
    {
        code: 'da',
        name: 'Danish',
        native: 'Dansk',
        region: 'Denmark'
    },
    {
        code: 'de',
        name: 'German',
        native: 'Deutsch',
        region: 'Germany'
    },
    {
        code: 'dv',
        name: 'Divehi',
        native: 'ދިވެހިބަސް',
        rtl: 1,
        region: 'Maldives'
    },
    {
        code: 'dz',
        name: 'Dzongkha',
        native: 'ཇོང་ཁ',
        region: 'Bhutan'
    },
    {
        code: 'el',
        name: 'Greek',
        native: 'Ελληνικά',
        region: 'Greece'
    },
    {
        code: 'en',
        name: 'English',
        native: 'English',
        region: 'United Kingdom'
    },
    {
        code: 'eo',
        name: 'Esperanto',
        native: 'Esperanto',
        region: 'International'
    },
    {
        code: 'es',
        name: 'Spanish',
        native: 'Español',
        region: 'Spain'
    },
    {
        code: 'et',
        name: 'Estonian',
        native: 'Eesti',
        region: 'Estonia'
    },
    {
        code: 'eu',
        name: 'Basque',
        native: 'Euskara',
        region: 'Spain'
    },
    {
        code: 'fa',
        name: 'Persian',
        native: 'فارسی',
        rtl: 1,
        region: 'Iran'
    },
    {
        code: 'ff',
        name: 'Peul',
        native: 'Fulfulde',
        region: 'Nigeria'
    },
    {
        code: 'fi',
        name: 'Finnish',
        native: 'Suomi',
        region: 'Finland'
    },
    {
        code: 'fj',
        name: 'Fijian',
        native: 'Na Vosa Vakaviti',
        region: 'Fiji'
    },
    {
        code: 'fo',
        name: 'Faroese',
        native: 'Føroyskt',
        region: 'Faroe Islands'
    },
    {
        code: 'fr',
        name: 'French',
        native: 'Français',
        region: 'France'
    },
    {
        code: 'fy',
        name: 'West Frisian',
        native: 'Frysk',
        region: 'Netherlands'
    },
    {
        code: 'ga',
        name: 'Irish',
        native: 'Gaeilge',
        region: 'Ireland'
    },
    {
        code: 'gd',
        name: 'Scottish Gaelic',
        native: 'Gàidhlig',
        region: 'Scotland'
    },
    {
        code: 'gl',
        name: 'Galician',
        native: 'Galego',
        region: 'Spain'
    },
    {
        code: 'gn',
        name: 'Guarani',
        native: "Avañe'ẽ",
        region: 'Paraguay'
    },
    {
        code: 'gu',
        name: 'Gujarati',
        native: 'ગુજરાતી',
        region: 'India'
    },
    {
        code: 'gv',
        name: 'Manx',
        native: 'Gaelg',
        region: 'Isle of Man'
    },
    {
        code: 'ha',
        name: 'Hausa',
        native: 'هَوُسَ',
        rtl: 1,
        region: 'Nigeria'
    },
    {
        code: 'he',
        name: 'Hebrew',
        native: 'עברית',
        rtl: 1,
        region: 'Israel'
    },
    {
        code: 'hi',
        name: 'Hindi',
        native: 'हिन्दी',
        region: 'India'
    },
    {
        code: 'hr',
        name: 'Croatian',
        native: 'Hrvatski',
        region: 'Croatia'
    },
    {
        code: 'ht',
        name: 'Haitian',
        native: 'Krèyol ayisyen',
        region: 'Haiti'
    },
    {
        code: 'hu',
        name: 'Hungarian',
        native: 'Magyar',
        region: 'Hungary'
    },
    {
        code: 'hy',
        name: 'Armenian',
        native: 'Հայերեն',
        region: 'Armenia'
    },
    {
        code: 'id',
        name: 'Indonesian',
        native: 'Bahasa Indonesia',
        region: 'Indonesia'
    },
    {
        code: 'ig',
        name: 'Igbo',
        native: 'Igbo',
        region: 'Nigeria'
    },
    {
        code: 'is',
        name: 'Icelandic',
        native: 'Íslenska',
        region: 'Iceland'
    },
    {
        code: 'it',
        name: 'Italian',
        native: 'Italiano',
        region: 'Italy'
    },
    {
        code: 'iu',
        name: 'Inuktitut',
        native: 'ᐃᓄᒃᑎᑐᑦ',
        region: 'Canada'
    },
    {
        code: 'ja',
        name: 'Japanese',
        native: '日本語',
        region: 'Japan'
    },
    {
        code: 'jv',
        name: 'Javanese',
        native: 'Basa Jawa',
        region: 'Indonesia'
    },
    {
        code: 'ka',
        name: 'Georgian',
        native: 'ქართული',
        region: 'Georgia'
    },
    {
        code: 'kg',
        name: 'Kongo',
        native: 'KiKongo',
        region: 'Congo'
    },
    {
        code: 'ki',
        name: 'Kikuyu',
        native: 'Gĩkũyũ',
        region: 'Kenya'
    },
    {
        code: 'kj',
        name: 'Kuanyama',
        native: 'Kuanyama',
        region: 'Namibia'
    },
    {
        code: 'kk',
        name: 'Kazakh',
        native: 'Қазақша',
        region: 'Kazakhstan'
    },
    {
        code: 'kl',
        name: 'Greenlandic',
        native: 'Kalaallisut',
        region: 'Greenland'
    },
    {
        code: 'km',
        name: 'Cambodian',
        native: 'ភាសាខ្មែរ',
        region: 'Cambodia'
    },
    {
        code: 'kn',
        name: 'Kannada',
        native: 'ಕನ್ನಡ',
        region: 'India'
    },
    {
        code: 'ko',
        name: 'Korean',
        native: '한국어',
        region: 'South Korea'
    },
    {
        code: 'kr',
        name: 'Kanuri',
        native: 'Kanuri',
        region: 'Nigeria'
    },
    {
        code: 'ks',
        name: 'Kashmiri',
        native: 'कश्मीरी / كشميري',
        rtl: 1,
        region: 'India'
    },
    {
        code: 'ku',
        name: 'Kurdish',
        native: 'Kurdî / كوردی',
        rtl: 1,
        region: 'Iraq'
    },
    {
        code: 'kv',
        name: 'Komi',
        native: 'Коми',
        region: 'Russia'
    },
    {
        code: 'kw',
        name: 'Cornish',
        native: 'Kernewek',
        region: 'United Kingdom'
    },
    {
        code: 'ky',
        name: 'Kirghiz',
        native: 'Kırgızca / Кыргызча',
        region: 'Kyrgyzstan'
    },
    {
        code: 'la',
        name: 'Latin',
        native: 'Latina',
        region: 'Vatican'
    },
    {
        code: 'lb',
        name: 'Luxembourgish',
        native: 'Lëtzebuergesch',
        region: 'Luxembourg'
    },
    {
        code: 'lg',
        name: 'Ganda',
        native: 'Luganda',
        region: 'Uganda'
    },
    {
        code: 'li',
        name: 'Limburgian',
        native: 'Limburgs',
        region: 'Netherlands'
    },
    {
        code: 'ln',
        name: 'Lingala',
        native: 'Lingála',
        region: 'Congo'
    },
    {
        code: 'lo',
        name: 'Laotian',
        native: 'ລາວ / Pha xa lao',
        region: 'Laos'
    },
    {
        code: 'lt',
        name: 'Lithuanian',
        native: 'Lietuvių',
        region: 'Lithuania'
    },
    {
        code: 'lu',
        name: 'Luba-Katanga',
        native: 'Tshiluba',
        region: 'Congo'
    },
    {
        code: 'lv',
        name: 'Latvian',
        native: 'Latviešu',
        region: 'Latvia'
    },
    {
        code: 'mg',
        name: 'Malagasy',
        native: 'Malagasy',
        region: 'Madagascar'
    },
    {
        code: 'mh',
        name: 'Marshallese',
        native: 'Kajin Majel / Ebon',
        region: 'Marshall Islands'
    },
    {
        code: 'mi',
        name: 'Maori',
        native: 'Māori',
        region: 'New Zealand'
    },
    {
        code: 'mk',
        name: 'Macedonian',
        native: 'Македонски',
        region: 'North Macedonia'
    },
    {
        code: 'ml',
        name: 'Malayalam',
        native: 'മലയാളം',
        region: 'India'
    },
    {
        code: 'mn',
        name: 'Mongolian',
        native: 'Монгол',
        region: 'Mongolia'
    },
    {
        code: 'mo',
        name: 'Moldovan',
        native: 'Moldovenească',
        region: 'Moldova'
    },
    {
        code: 'mr',
        name: 'Marathi',
        native: 'मराठी',
        region: 'India'
    },
    {
        code: 'ms',
        name: 'Malay',
        native: 'Bahasa Melayu',
        region: 'Malaysia'
    },
    {
        code: 'mt',
        name: 'Maltese',
        native: 'bil-Malti',
        region: 'Malta'
    },
    {
        code: 'sv',
        name: 'Swedish',
        native: 'Svenska',
        region: 'Sweden'
    },
    {
        code: 'sw',
        name: 'Swahili',
        native: 'Kiswahili',
        region: 'Tanzania'
    },
    {
        code: 'ta',
        name: 'Tamil',
        native: 'தமிழ்',
        region: 'India'
    },
    {
        code: 'te',
        name: 'Telugu',
        native: 'తెలుగు',
        region: 'India'
    },
    {
        code: 'tg',
        name: 'Tajik',
        native: 'Тоҷикӣ',
        region: 'Tajikistan'
    },
    {
        code: 'th',
        name: 'Thai',
        native: 'ไทย / Phasa Thai',
        region: 'Thailand'
    },
    {
        code: 'ti',
        name: 'Tigrinya',
        native: 'ትግርኛ',
        region: 'Eritrea'
    },
    {
        code: 'tk',
        name: 'Turkmen',
        native: 'Туркмен / تركمن',
        region: 'Turkmenistan'
    },
    {
        code: 'tl',
        name: 'Tagalog',
        native: 'Tagalog',
        region: 'Philippines'
    },
    {
        code: 'tn',
        name: 'Tswana',
        native: 'Setswana',
        region: 'Botswana'
    },
    {
        code: 'to',
        name: 'Tonga',
        native: 'Lea Faka-Tonga',
        region: 'Tonga'
    },
    {
        code: 'tr',
        name: 'Turkish',
        native: 'Türkçe',
        region: 'Turkey'
    },
    {
        code: 'ts',
        name: 'Tsonga',
        native: 'Xitsonga',
        region: 'South Africa'
    },
    {
        code: 'tt',
        name: 'Tatar',
        native: 'Tatarça',
        region: 'Russia'
    },
    {
        code: 'tw',
        name: 'Twi',
        native: 'Twi',
        region: 'Ghana'
    },
    {
        code: 'ty',
        name: 'Tahitian',
        native: 'Reo Mā`ohi',
        region: 'French Polynesia'
    },
    {
        code: 'ug',
        name: 'Uyghur',
        native: 'Uyƣurqə / ئۇيغۇرچە',
        region: 'China'
    },
    {
        code: 'uk',
        name: 'Ukrainian',
        native: 'Українська',
        region: 'Ukraine'
    },
    {
        code: 'ur',
        name: 'Urdu',
        native: 'اردو',
        rtl: 1,
        region: 'Pakistan'
    },
    {
        code: 'uz',
        name: 'Uzbek',
        native: 'Ўзбек',
        region: 'Uzbekistan'
    },
    {
        code: 've',
        name: 'Venda',
        native: 'Tshivenḓa',
        region: 'South Africa'
    },
    {
        code: 'vi',
        name: 'Vietnamese',
        native: 'Tiếng Việt',
        region: 'Vietnam'
    },
    {
        code: 'vo',
        name: 'Volapük',
        native: 'Volapük',
        region: 'International'
    },
    {
        code: 'wo',
        name: 'Wolof',
        native: 'Wollof',
        region: 'Senegal'
    },
    {
        code: 'xh',
        name: 'Xhosa',
        native: 'isiXhosa',
        region: 'South Africa'
    },
    {
        code: 'yi',
        name: 'Yiddish',
        native: 'ייִדיש',
        rtl: 1,
        region: 'Israel'
    },
    {
        code: 'yo',
        name: 'Yoruba',
        native: 'Yorùbá',
        region: 'Nigeria'
    },
    {
        code: 'zh',
        name: 'Chinese',
        native: '中文',
        region: 'China'
    },
    {
        code: 'zu',
        name: 'Zulu',
        native: 'isiZulu',
        region: 'South Africa'
    }
]