module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/components/translationWidget.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Translation)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$translation$2d$widget$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/translation-widget/dist/index.js [app-ssr] (ecmascript)");
"use client";
;
;
function Translation() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$translation$2d$widget$2f$dist$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("pk_08d1531ce8b8514370919b231693f636c19cb94acd4af8584b25bf2154cab4636fc8a990af0060bf7d1a9b9951c2da8b4f9dcecbdf1aa5ea6ffff17d0c150724024GZYEBwvT6YB8tv5Ass", {
            showUI: true,
            pageLanguage: 'en',
            position: "top-right",
            autoDetectLanguage: false,
            theme: {
                baseColor: '',
                textColor: ''
            }
        });
    }, []);
    return null;
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),
"[project]/node_modules/translation-widget/dist/index.js [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>initializeTranslationWidget)
});
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value)=>key in obj ? __defProp(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value
    }) : obj[key] = value;
var __publicField = (obj, key, value)=>__defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
const styles = ':root{--jigts-base-color: white;--jigts-text-color: black;--jigts-bg-color: color-mix(in srgb, var(--jigts-base-color) 10%, white);--jigts-bg-hover: color-mix(in srgb, var(--jigts-text-color) 10%, white);--jigts-bg-active: color-mix(in srgb, var(--jigts-base-color) 30%, white)}*{box-sizing:border-box}.jigts-translation-widget{--jigts-base-color: var(--jigts-custom-base-color, white);--jigts-text-color: var(--jigts-custom-text-color, black);--jigts-bg-color: color-mix(in srgb, var(--jigts-base-color) 10%, white);--jigts-bg-hover: color-mix(in srgb, var(--jigts-text-color) 10%, white);--jigts-bg-active: color-mix(in srgb, var(--jigts-base-color) 30%, white);position:fixed;z-index:1000;color:var(--jigts-text-color)}.jigts-translation-widget.jigts-position-top-right{top:2rem;right:2rem}.jigts-translation-widget.jigts-position-top-left{top:2rem;left:2rem}.jigts-translation-widget.jigts-position-bottom-left{bottom:2rem;left:2rem}.jigts-translation-widget.jigts-position-bottom-right{bottom:2rem;right:2rem}.jigts-position-top-right .jigts-widget-dropdown,.jigts-position-top-left .jigts-widget-dropdown{top:calc(100% + .5rem)}.jigts-position-bottom-right .jigts-widget-dropdown,.jigts-position-bottom-left .jigts-widget-dropdown{bottom:calc(100% + .5rem)}.jigts-position-top-right .jigts-widget-dropdown,.jigts-position-bottom-right .jigts-widget-dropdown{right:0}.jigts-position-top-left .jigts-widget-dropdown,.jigts-position-bottom-left .jigts-widget-dropdown{left:0}.jigts-translation-widget{position:fixed}.jigts-translation-widget{max-width:fit-content}.jigts-trigger-content{display:flex;cursor:pointer;border-radius:6px;transition:all .2s ease}.jigts-trigger-icon{display:flex;align-items:center}.jigts-lang-code{font-weight:500;color:var(--jigts-text-color);font-size:14px}.jigts-lang-name{color:var(--jigts-text-color);font-size:14px;opacity:0;max-width:0;overflow:hidden;white-space:nowrap;transition:all .3s ease-in-out;display:inline-block}.jigts-lang-code{transition:all .3s ease-in-out}.jigts-widget-trigger:hover .jigts-lang-code{background:#e5e7eb;border-radius:50%;padding:.1rem .3rem;color:var(--jigts-text-color);font-weight:600;font-size:12px;transition:all .3s ease-in-out}.jigts-widget-trigger:hover .jigts-lang-name{opacity:1;margin-left:.5rem;max-width:150px}.jigts-widget-trigger{background:var(--jigts-bg-color);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid color-mix(in srgb,var(--jigts-base-color) 30%,white);border-radius:.75rem;padding:.3rem .6rem;cursor:pointer;display:flex;align-items:center;gap:.2rem;font-size:.9rem;font-weight:500;color:var(--jigts-text-color);box-shadow:0 10px 25px -5px #0000001a,0 10px 10px -5px #0000000a;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden;min-height:2.2rem;min-width:unset}.jigts-widget-trigger:hover{transform:scale(1.05) translateY(-2px);box-shadow:0 20px 40px -10px #00000026,0 10px 20px -5px #0000001a}.jigts-widget-trigger:active{transform:scale(.98)}.jigts-widget-trigger:before{content:"";position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(var(--jigts-base-color),.1),transparent);transition:left .6s ease}.jigts-widget-trigger:hover:before{left:100%}.jigts-widget-dropdown{position:absolute;width:20rem;background:var(--jigts-bg-color);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid color-mix(in srgb,var(--jigts-base-color) 30%,white);border-radius:.75rem;box-shadow:0 25px 50px -12px #00000040;opacity:0;visibility:hidden;transform:scale(.95) translateY(10px);transition:all .3s cubic-bezier(.4,0,.2,1);max-height:28rem;overflow:hidden;min-height:30rem;display:none;flex-direction:column;z-index:1000}.jigts-widget-dropdown.jigts-open{opacity:1;visibility:visible;transform:scale(1) translateY(0);display:flex}.jigts-widget-dropdown.jigts-closing{opacity:0;transform:translateY(10px)}.jigts-dropdown-header{padding:1rem;border-bottom:1px solid color-mix(in srgb,var(--jigts-base-color) 20%,white);background:var(--jigts-bg-hover);border-radius:.75rem .75rem 0 0;animation:headerSlideDown .4s ease .1s both}.jigts-dropdown-title{display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem}.jigts-title-left{display:flex;align-items:center;gap:.5rem}.jigts-languages-icon{width:1rem;height:1rem;color:var(--jigts-text-color)}.jigts-title-text{font-size:.875rem;font-weight:600;color:var(--jigts-text-color)}.jigts-language-count{background:var(--jigts-bg-hover);border:1px solid color-mix(in srgb,var(--jigts-base-color) 30%,white);color:var(--jigts-text-color);padding:.125rem .5rem;border-radius:.375rem;font-size:.75rem;font-weight:500}.jigts-search-container{position:relative}.jigts-search-input{width:100%;padding:.5rem .75rem .5rem 2.5rem;border:1px solid #d1d5db;border-radius:.5rem;outline:none;font-size:.875rem;color:var(--jigts-text-color);background:#fff;transition:all .2s ease}.jigts-search-icon{position:absolute;left:.75rem;top:50%;transform:translateY(-50%);width:1rem;height:1rem;color:var(--jigts-text-color);opacity:.7}.jigts-clear-search{position:absolute;right:.75rem;top:50%;transform:translateY(-50%);width:1rem;height:1rem;color:var(--jigts-text-color);cursor:pointer;opacity:0;transition:all .2s ease}.jigts-clear-search.jigts-visible{opacity:.7}.jigts-clear-search:hover{opacity:1;transform:translateY(-50%) scale(1.1)}.jigts-reset-option{padding:.75rem 1rem;border-bottom:1px solid color-mix(in srgb,var(--jigts-base-color) 20%,white);cursor:pointer;display:flex;align-items:center;gap:.75rem;transition:background-color .2s ease;animation:resetSlideIn .4s ease .15s both;background:var(--jigts-bg-color)}.jigts-reset-option:hover{background:var(--jigts-bg-hover)}.jigts-reset-icon{width:1rem;height:1rem;color:var(--jigts-text-color);transition:transform .3s ease}.jigts-reset-option:hover .jigts-reset-icon{transform:rotate(-180deg)}.jigts-reset-text{display:flex;flex-direction:column}.jigts-reset-title{font-weight:500;color:var(--jigts-text-color);font-size:.875rem}.jigts-reset-subtitle{font-size:.75rem;color:var(--jigts-text-color);opacity:.7}.jigts-language-list{flex:1;overflow-y:auto;padding:.5rem;position:relative;min-height:200px}.jigts-language-item{display:flex;align-items:center;justify-content:space-between;margin-left:.5rem;margin-right:.5rem;margin-bottom:.5rem;padding:.625rem .75rem;border-radius:.5rem;cursor:pointer;transition:all .2s ease;border:1px solid transparent;animation:languageSlideIn .4s ease both;background:var(--jigts-bg-color)}.jigts-language-item.jigts-focused{background:var(--jigts-bg-hover);border-color:color-mix(in srgb,var(--jigts-base-color) 40%,white)}.jigts-language-item.jigts-selected{background:var(--jigts-bg-active)}.jigts-language-item:hover{background:var(--jigts-bg-hover)}.jigts-language-info{display:flex;flex-direction:column;align-items:flex-start;min-width:0;flex:1}.jigts-language-main{display:flex;align-items:center;gap:.5rem;width:100%}.jigts-language-name{font-weight:500;color:var(--jigts-text-color);font-size:.875rem;transition:color .2s ease;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jigts-language-item:hover .jigts-language-name{color:var(--jigts-text-color);opacity:.8}.jigts-language-code{background:var(--jigts-bg-hover);color:var(--jigts-text-color);padding:.125rem .375rem;border-radius:.25rem;font-size:.75rem;font-weight:600;flex-shrink:0}.jigts-language-details{display:flex;align-items:center;gap:.25rem;font-size:.75rem;color:var(--jigts-text-color);opacity:.7;width:100%;margin-top:.125rem}.jigts-language-native{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.jigts-language-separator,.jigts-language-region{flex-shrink:0}.jigts-globe-icon{width:1rem;height:1rem;color:var(--jigts-text-color);transition:transform .5s ease}.jigts-widget-trigger:hover .jigts-globe-icon{transform:rotate(360deg)}.jigts-check-icon{width:1rem;height:1rem;color:var(--jigts-text-color);opacity:0;transform:scale(0);transition:all .3s cubic-bezier(.34,1.56,.64,1)}.jigts-language-item.jigts-selected .jigts-check-icon{opacity:1;transform:scale(1)}.jigts-loading-spinner{width:1rem;height:1rem;border:2px solid #e5e7eb;border-top:2px solid var(--jigts-base-color);border-radius:50%;animation:spin 1s linear infinite}.jigts-trigger-loading{display:none}.jigts-no-results{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);display:none;flex-direction:column;align-items:center;justify-content:center;color:var(--jigts-text-color);text-align:center;padding:24px;animation:fadeIn .4s ease}.jigts-no-results-icon{width:2rem;height:2rem;margin-bottom:.5rem;color:var(--jigts-text-color);opacity:.5}.jigts-no-results-title{font-size:.875rem;margin-bottom:.25rem}.jigts-no-results-subtitle{font-size:.75rem}.jigts-dropdown-footer{padding:.5rem 1rem;border-top:1px solid color-mix(in srgb,var(--jigts-base-color) 20%,white);background:var(--jigts-bg-hover);border-radius:0 0 .75rem .75rem;animation:footerSlideUp .4s ease .2s both}.jigts-footer-text{font-size:.75rem;color:var(--jigts-text-color);text-align:center;opacity:.7}.jigts-language-list::-webkit-scrollbar{width:6px}.jigts-language-list::-webkit-scrollbar-track{background:#f3f4f6;border-radius:3px}.jigts-language-list::-webkit-scrollbar-thumb{background:#d1d5db;border-radius:3px}.jigts-language-list::-webkit-scrollbar-thumb:hover{background:#9ca3af}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}@keyframes badgeSlideIn{0%{transform:scale(0) translate(10px);opacity:0}to{transform:scale(1) translate(0);opacity:1}}@keyframes headerSlideDown{0%{transform:translateY(-20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes resetSlideIn{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes languageSlideIn{0%{transform:translate(-20px);opacity:0}to{transform:translate(0);opacity:1}}@keyframes fadeIn{0%{opacity:0}to{opacity:1}}@keyframes footerSlideUp{0%{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}.jigts-language-item:nth-child(1){animation-delay:.2s}.jigts-language-item:nth-child(2){animation-delay:.22s}.jigts-language-item:nth-child(3){animation-delay:.24s}.jigts-language-item:nth-child(4){animation-delay:.26s}.jigts-language-item:nth-child(5){animation-delay:.28s}.jigts-language-item:nth-child(6){animation-delay:.3s}.jigts-language-item:nth-child(7){animation-delay:.32s}.jigts-language-item:nth-child(8){animation-delay:.34s}.jigts-language-item:nth-child(9){animation-delay:.36s}.jigts-language-item:nth-child(10){animation-delay:.38s}@media (max-width: 400px){.jigts-widget-dropdown{width:100vw;right:auto;left:50%;transform:translate(-59%) scale(.95) translateY(10px)}.jigts-widget-dropdown.jigts-open{transform:translate(-50%) scale(1) translateY(0)}}@media (prefers-contrast: high){.jigts-widget-trigger,.jigts-widget-dropdown{border:2px solid #000}}@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}';
class TranslationService {
    constructor(publicKey){
        __publicField(this, "publicKey");
        __publicField(this, "cacheMetrics", {
            hits: 0,
            misses: 0
        });
        // Todo: convert this to use sdk instead of api
        __publicField(this, "apiUrl", "https://api.jigsawstack.com/v1/ai/translate");
        this.publicKey = publicKey;
    }
    getCacheMetrics() {
        return {
            ...this.cacheMetrics
        };
    }
    async translateBatchText(texts, targetLang, maxRetries = 2, retryDelay = 100) {
        let attempt = 0;
        while(attempt < maxRetries){
            try {
                const response = await fetch(this.apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": this.publicKey
                    },
                    body: JSON.stringify({
                        text: texts,
                        target_language: targetLang
                    })
                });
                if (!response.ok) {
                    const error = new Error(`Error translating text: ${response.statusText}`);
                    error.status = response.status;
                    error.response = response;
                    throw error;
                }
                const result = await response.json();
                const translations = Array.isArray(result.translated_text) ? result.translated_text : [
                    result.translated_text
                ];
                return translations;
            } catch (error) {
                attempt++;
                if (attempt >= maxRetries) {
                    console.error("Translation error after retries:", error);
                    return texts;
                }
                await new Promise((res)=>setTimeout(res, retryDelay));
            }
        }
        return texts;
    }
}
const languages = [
    {
        code: "af",
        name: "Afrikaans",
        native: "Afrikaans",
        writing_system: "Latin"
    },
    {
        code: "am",
        name: "Amharic",
        native: "አማርኛ",
        writing_system: "Ethiopic"
    },
    {
        code: "ar",
        name: "Arabic",
        native: "العربية",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "as",
        name: "Assamese",
        native: "অসমীয়া",
        writing_system: "Bengali"
    },
    {
        code: "az",
        name: "Azerbaijani",
        native: "Azərbaycanca / آذربايجان",
        writing_system: "Latin"
    },
    {
        code: "ba",
        name: "Bashkir",
        native: "Башҡорт",
        writing_system: "Cyrillic"
    },
    {
        code: "be",
        name: "Belarusian",
        native: "Беларуская",
        writing_system: "Cyrillic"
    },
    {
        code: "bg",
        name: "Bulgarian",
        native: "Български",
        writing_system: "Cyrillic"
    },
    {
        code: "bn",
        name: "Bengali",
        native: "বাংলা",
        writing_system: "Bengali"
    },
    {
        code: "bo",
        name: "Tibetan",
        native: "བོད་ཡིག / Bod skad",
        writing_system: "Tibetan"
    },
    {
        code: "br",
        name: "Breton",
        native: "Brezhoneg",
        writing_system: "Latin"
    },
    {
        code: "bs",
        name: "Bosnian",
        native: "Bosanski",
        writing_system: "Latin"
    },
    {
        code: "ca",
        name: "Catalan",
        native: "Català",
        writing_system: "Latin"
    },
    {
        code: "ch",
        name: "Chamorro",
        native: "Chamoru",
        writing_system: "Latin"
    },
    {
        code: "co",
        name: "Corsican",
        native: "Corsu",
        writing_system: "Latin"
    },
    {
        code: "cs",
        name: "Czech",
        native: "Česky",
        writing_system: "Latin"
    },
    {
        code: "cy",
        name: "Welsh",
        native: "Cymraeg",
        writing_system: "Latin"
    },
    {
        code: "da",
        name: "Danish",
        native: "Dansk",
        writing_system: "Latin"
    },
    {
        code: "de",
        name: "German",
        native: "Deutsch",
        writing_system: "Latin"
    },
    {
        code: "dv",
        name: "Divehi",
        native: "ދިވެހިބަސް",
        rtl: 1,
        writing_system: "Thaana"
    },
    {
        code: "dz",
        name: "Dzongkha",
        native: "ཇོང་ཁ",
        writing_system: "Tibetan"
    },
    {
        code: "el",
        name: "Greek",
        native: "Ελληνικά",
        writing_system: "Greek"
    },
    {
        code: "en",
        name: "English",
        native: "English",
        writing_system: "Latin"
    },
    {
        code: "eo",
        name: "Esperanto",
        native: "Esperanto",
        writing_system: "Latin"
    },
    {
        code: "es",
        name: "Spanish",
        native: "Español",
        writing_system: "Latin"
    },
    {
        code: "et",
        name: "Estonian",
        native: "Eesti",
        writing_system: "Latin"
    },
    {
        code: "eu",
        name: "Basque",
        native: "Euskara",
        writing_system: "Latin"
    },
    {
        code: "fa",
        name: "Persian",
        native: "فارسی",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "ff",
        name: "Peul",
        native: "Fulfulde",
        writing_system: "Latin"
    },
    {
        code: "fi",
        name: "Finnish",
        native: "Suomi",
        writing_system: "Latin"
    },
    {
        code: "fj",
        name: "Fijian",
        native: "Na Vosa Vakaviti",
        writing_system: "Latin"
    },
    {
        code: "fo",
        name: "Faroese",
        native: "Føroyskt",
        writing_system: "Latin"
    },
    {
        code: "fr",
        name: "French",
        native: "Français",
        writing_system: "Latin"
    },
    {
        code: "fy",
        name: "West Frisian",
        native: "Frysk",
        writing_system: "Latin"
    },
    {
        code: "ga",
        name: "Irish",
        native: "Gaeilge",
        writing_system: "Latin"
    },
    {
        code: "gd",
        name: "Scottish Gaelic",
        native: "Gàidhlig",
        writing_system: "Latin"
    },
    {
        code: "gl",
        name: "Galician",
        native: "Galego",
        writing_system: "Latin"
    },
    {
        code: "gn",
        name: "Guarani",
        native: "Avañe'ẽ",
        writing_system: "Latin"
    },
    {
        code: "gu",
        name: "Gujarati",
        native: "ગુજરાતી",
        writing_system: "Gujarati"
    },
    {
        code: "gv",
        name: "Manx",
        native: "Gaelg",
        writing_system: "Latin"
    },
    {
        code: "ha",
        name: "Hausa",
        native: "هَوُسَ",
        rtl: 1,
        writing_system: "Latin"
    },
    {
        code: "he",
        name: "Hebrew",
        native: "עברית",
        rtl: 1,
        writing_system: "Hebrew"
    },
    {
        code: "hi",
        name: "Hindi",
        native: "हिन्दी",
        writing_system: "Devanagari"
    },
    {
        code: "hr",
        name: "Croatian",
        native: "Hrvatski",
        writing_system: "Latin"
    },
    {
        code: "ht",
        name: "Haitian",
        native: "Krèyol ayisyen",
        writing_system: "Latin"
    },
    {
        code: "hu",
        name: "Hungarian",
        native: "Magyar",
        writing_system: "Latin"
    },
    {
        code: "hy",
        name: "Armenian",
        native: "Հայերեն",
        writing_system: "Armenian"
    },
    {
        code: "id",
        name: "Indonesian",
        native: "Bahasa Indonesia",
        writing_system: "Latin"
    },
    {
        code: "ig",
        name: "Igbo",
        native: "Igbo",
        writing_system: "Latin"
    },
    {
        code: "is",
        name: "Icelandic",
        native: "Íslenska",
        writing_system: "Latin"
    },
    {
        code: "it",
        name: "Italian",
        native: "Italiano",
        writing_system: "Latin"
    },
    {
        code: "iu",
        name: "Inuktitut",
        native: "ᐃᓄᒃᑎᑐᑦ",
        writing_system: "Unified Canadian Aboriginal Syllabics"
    },
    {
        code: "ja",
        name: "Japanese",
        native: "日本語",
        writing_system: "Japanese"
    },
    {
        code: "jv",
        name: "Javanese",
        native: "Basa Jawa",
        writing_system: "Javanese"
    },
    {
        code: "ka",
        name: "Georgian",
        native: "ქართული",
        writing_system: "Georgian"
    },
    {
        code: "kg",
        name: "Kongo",
        native: "KiKongo",
        writing_system: "Latin"
    },
    {
        code: "ki",
        name: "Kikuyu",
        native: "Gĩkũyũ",
        writing_system: "Latin"
    },
    {
        code: "kj",
        name: "Kuanyama",
        native: "Kuanyama",
        writing_system: "Latin"
    },
    {
        code: "kk",
        name: "Kazakh",
        native: "Қазақша",
        writing_system: "Cyrillic"
    },
    {
        code: "kl",
        name: "Greenlandic",
        native: "Kalaallisut",
        writing_system: "Latin"
    },
    {
        code: "km",
        name: "Cambodian",
        native: "ភាសាខ្មែរ",
        writing_system: "Khmer"
    },
    {
        code: "kn",
        name: "Kannada",
        native: "ಕನ್ನಡ",
        writing_system: "Kannada"
    },
    {
        code: "ko",
        name: "Korean",
        native: "한국어",
        writing_system: "Korean"
    },
    {
        code: "kr",
        name: "Kanuri",
        native: "Kanuri",
        writing_system: "Latin"
    },
    {
        code: "ks",
        name: "Kashmiri",
        native: "कश्मीरी / كشميري",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "ku",
        name: "Kurdish",
        native: "Kurdî / كوردی",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "kv",
        name: "Komi",
        native: "Коми",
        writing_system: "Cyrillic"
    },
    {
        code: "kw",
        name: "Cornish",
        native: "Kernewek",
        writing_system: "Latin"
    },
    {
        code: "ky",
        name: "Kirghiz",
        native: "Kırgızca / Кыргызча",
        writing_system: "Cyrillic"
    },
    {
        code: "la",
        name: "Latin",
        native: "Latina",
        writing_system: "Latin"
    },
    {
        code: "lb",
        name: "Luxembourgish",
        native: "Lëtzebuergesch",
        writing_system: "Latin"
    },
    {
        code: "lg",
        name: "Ganda",
        native: "Luganda",
        writing_system: "Latin"
    },
    {
        code: "li",
        name: "Limburgian",
        native: "Limburgs",
        writing_system: "Latin"
    },
    {
        code: "ln",
        name: "Lingala",
        native: "Lingála",
        writing_system: "Latin"
    },
    {
        code: "lo",
        name: "Laotian",
        native: "ລາວ / Pha xa lao",
        writing_system: "Lao"
    },
    {
        code: "lt",
        name: "Lithuanian",
        native: "Lietuvių",
        writing_system: "Latin"
    },
    {
        code: "lu",
        name: "Luba-Katanga",
        native: "Tshiluba",
        writing_system: "Latin"
    },
    {
        code: "lv",
        name: "Latvian",
        native: "Latviešu",
        writing_system: "Latin"
    },
    {
        code: "mg",
        name: "Malagasy",
        native: "Malagasy",
        writing_system: "Latin"
    },
    {
        code: "mh",
        name: "Marshallese",
        native: "Kajin Majel / Ebon",
        writing_system: "Latin"
    },
    {
        code: "mi",
        name: "Maori",
        native: "Māori",
        writing_system: "Latin"
    },
    {
        code: "mk",
        name: "Macedonian",
        native: "Македонски",
        writing_system: "Cyrillic"
    },
    {
        code: "ml",
        name: "Malayalam",
        native: "മലയാളം",
        writing_system: "Malayalam"
    },
    {
        code: "mn",
        name: "Mongolian",
        native: "Монгол",
        writing_system: "Mongolian"
    },
    {
        code: "mo",
        name: "Moldovan",
        native: "Moldovenească",
        writing_system: "Latin"
    },
    {
        code: "mr",
        name: "Marathi",
        native: "मराठी",
        writing_system: "Devanagari"
    },
    {
        code: "ms",
        name: "Malay",
        native: "Bahasa Melayu",
        writing_system: "Latin"
    },
    {
        code: "mt",
        name: "Maltese",
        native: "bil-Malti",
        writing_system: "Latin"
    },
    {
        code: "my",
        name: "Burmese",
        native: "မြန်မာစာ",
        writing_system: "Myanmar"
    },
    {
        code: "na",
        name: "Nauruan",
        native: "Dorerin Naoero",
        writing_system: "Latin"
    },
    {
        code: "nb",
        name: "Norwegian Bokmål",
        native: "Norsk bokmål",
        writing_system: "Latin"
    },
    {
        code: "nd",
        name: "North Ndebele",
        native: "Sindebele",
        writing_system: "Latin"
    },
    {
        code: "ne",
        name: "Nepali",
        native: "नेपाली",
        writing_system: "Devanagari"
    },
    {
        code: "ng",
        name: "Ndonga",
        native: "Oshiwambo",
        writing_system: "Latin"
    },
    {
        code: "nl",
        name: "Dutch",
        native: "Nederlands",
        writing_system: "Latin"
    },
    {
        code: "nn",
        name: "Norwegian Nynorsk",
        native: "Norsk nynorsk",
        writing_system: "Latin"
    },
    {
        code: "no",
        name: "Norwegian",
        native: "Norsk",
        writing_system: "Latin"
    },
    {
        code: "nr",
        name: "South Ndebele",
        native: "isiNdebele",
        writing_system: "Latin"
    },
    {
        code: "nv",
        name: "Navajo",
        native: "Diné bizaad",
        writing_system: "Latin"
    },
    {
        code: "ny",
        name: "Chichewa",
        native: "Chi-Chewa",
        writing_system: "Latin"
    },
    {
        code: "oc",
        name: "Occitan",
        native: "Occitan",
        writing_system: "Latin"
    },
    {
        code: "oj",
        name: "Ojibwa",
        native: "ᐊᓂᔑᓈᐯᒧᐎᓐ / Anishinaabemowin",
        writing_system: "Unified Canadian Aboriginal Syllabics"
    },
    {
        code: "om",
        name: "Oromo",
        native: "Oromoo",
        writing_system: "Latin"
    },
    {
        code: "or",
        name: "Oriya",
        native: "ଓଡ଼ିଆ",
        writing_system: "Odia"
    },
    {
        code: "os",
        name: "Ossetian / Ossetic",
        native: "Иронау",
        writing_system: "Cyrillic"
    },
    {
        code: "pa",
        name: "Panjabi / Punjabi",
        native: "ਪੰਜਾਬੀ / पंजाबी / پنجابي",
        writing_system: "Gurmukhi"
    },
    {
        code: "pi",
        name: "Pali",
        native: "Pāli / पाऴि",
        writing_system: "Devanagari"
    },
    {
        code: "pl",
        name: "Polish",
        native: "Polski",
        writing_system: "Latin"
    },
    {
        code: "ps",
        name: "Pashto",
        native: "پښتو",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "pt",
        name: "Portuguese",
        native: "Português",
        writing_system: "Latin"
    },
    {
        code: "qu",
        name: "Quechua",
        native: "Runa Simi",
        writing_system: "Latin"
    },
    {
        code: "rm",
        name: "Raeto Romance",
        native: "Rumantsch",
        writing_system: "Latin"
    },
    {
        code: "rn",
        name: "Kirundi",
        native: "Kirundi",
        writing_system: "Latin"
    },
    {
        code: "ro",
        name: "Romanian",
        native: "Română",
        writing_system: "Latin"
    },
    {
        code: "ru",
        name: "Russian",
        native: "Русский",
        writing_system: "Cyrillic"
    },
    {
        code: "rw",
        name: "Rwandi",
        native: "Kinyarwandi",
        writing_system: "Latin"
    },
    {
        code: "sa",
        name: "Sanskrit",
        native: "संस्कृतम्",
        writing_system: "Devanagari"
    },
    {
        code: "sc",
        name: "Sardinian",
        native: "Sardu",
        writing_system: "Latin"
    },
    {
        code: "sd",
        name: "Sindhi",
        native: "सिनधि",
        writing_system: "Arabic"
    },
    {
        code: "se",
        name: "Northern Sami",
        native: "Sámegiella",
        writing_system: "Latin"
    },
    {
        code: "sg",
        name: "Sango",
        native: "Sängö",
        writing_system: "Latin"
    },
    {
        code: "sh",
        name: "Serbo-Croatian",
        native: "Srpskohrvatski / Српскохрватски",
        writing_system: "Latin"
    },
    {
        code: "si",
        name: "Sinhalese",
        native: "සිංහල",
        writing_system: "Sinhala"
    },
    {
        code: "sk",
        name: "Slovak",
        native: "Slovenčina",
        writing_system: "Latin"
    },
    {
        code: "sl",
        name: "Slovenian",
        native: "Slovenščina",
        writing_system: "Latin"
    },
    {
        code: "sm",
        name: "Samoan",
        native: "Gagana Samoa",
        writing_system: "Latin"
    },
    {
        code: "sn",
        name: "Shona",
        native: "chiShona",
        writing_system: "Latin"
    },
    {
        code: "so",
        name: "Somalia",
        native: "Soomaaliga",
        writing_system: "Latin"
    },
    {
        code: "sq",
        name: "Albanian",
        native: "Shqip",
        writing_system: "Latin"
    },
    {
        code: "sr",
        name: "Serbian",
        native: "Српски",
        writing_system: "Cyrillic"
    },
    {
        code: "ss",
        name: "Swati",
        native: "SiSwati",
        writing_system: "Latin"
    },
    {
        code: "st",
        name: "Southern Sotho",
        native: "Sesotho",
        writing_system: "Latin"
    },
    {
        code: "su",
        name: "Sundanese",
        native: "Basa Sunda",
        writing_system: "Sundanese"
    },
    {
        code: "sv",
        name: "Swedish",
        native: "Svenska",
        writing_system: "Latin"
    },
    {
        code: "sw",
        name: "Swahili",
        native: "Kiswahili",
        writing_system: "Latin"
    },
    {
        code: "ta",
        name: "Tamil",
        native: "தமிழ்",
        writing_system: "Tamil"
    },
    {
        code: "te",
        name: "Telugu",
        native: "తెలుగు",
        writing_system: "Telugu"
    },
    {
        code: "tg",
        name: "Tajik",
        native: "Тоҷикӣ",
        writing_system: "Cyrillic"
    },
    {
        code: "th",
        name: "Thai",
        native: "ไทย / Phasa Thai",
        writing_system: "Thai"
    },
    {
        code: "ti",
        name: "Tigrinya",
        native: "ትግርኛ",
        writing_system: "Ethiopic"
    },
    {
        code: "tk",
        name: "Turkmen",
        native: "Туркмен / تركمن",
        writing_system: "Latin"
    },
    {
        code: "tl",
        name: "Tagalog / Filipino",
        native: "Tagalog",
        writing_system: "Latin"
    },
    {
        code: "tn",
        name: "Tswana",
        native: "Setswana",
        writing_system: "Latin"
    },
    {
        code: "to",
        name: "Tonga",
        native: "Lea Faka-Tonga",
        writing_system: "Latin"
    },
    {
        code: "tr",
        name: "Turkish",
        native: "Türkçe",
        writing_system: "Latin"
    },
    {
        code: "ts",
        name: "Tsonga",
        native: "Xitsonga",
        writing_system: "Latin"
    },
    {
        code: "tt",
        name: "Tatar",
        native: "Tatarça",
        writing_system: "Cyrillic"
    },
    {
        code: "tw",
        name: "Twi",
        native: "Twi",
        writing_system: "Latin"
    },
    {
        code: "ty",
        name: "Tahitian",
        native: "Reo Mā`ohi",
        writing_system: "Latin"
    },
    {
        code: "ug",
        name: "Uyghur",
        native: "Uyƣurqə / ئۇيغۇرچە",
        writing_system: "Arabic"
    },
    {
        code: "uk",
        name: "Ukrainian",
        native: "Українська",
        writing_system: "Cyrillic"
    },
    {
        code: "ur",
        name: "Urdu",
        native: "اردو",
        rtl: 1,
        writing_system: "Arabic"
    },
    {
        code: "uz",
        name: "Uzbek",
        native: "Ўзбек",
        writing_system: "Latin"
    },
    {
        code: "ve",
        name: "Venda",
        native: "Tshivenḓa",
        writing_system: "Latin"
    },
    {
        code: "vi",
        name: "Vietnamese",
        native: "Tiếng Việt",
        writing_system: "Latin"
    },
    {
        code: "vo",
        name: "Volapük",
        native: "Volapük",
        writing_system: "Latin"
    },
    {
        code: "wo",
        name: "Wolof",
        native: "Wollof",
        writing_system: "Latin"
    },
    {
        code: "xh",
        name: "Xhosa",
        native: "isiXhosa",
        writing_system: "Latin"
    },
    {
        code: "yi",
        name: "Yiddish",
        native: "ייִדיש",
        rtl: 1,
        writing_system: "Hebrew"
    },
    {
        code: "yo",
        name: "Yoruba",
        native: "Yorùbá",
        writing_system: "Latin"
    },
    {
        code: "zh",
        name: "Chinese (Simplified)",
        native: "简体中文",
        writing_system: "Simplied Han"
    },
    {
        code: "zh-TW",
        name: "Chinese (Traditional)",
        native: "繁體中文",
        writing_system: "Traditional Han"
    },
    {
        code: "zu",
        name: "Zulu",
        native: "isiZulu",
        writing_system: "Latin"
    }
];
function generateHashForContent(nodes) {
    const content = nodes.map((node)=>{
        var _a, _b;
        if (node.nodeType === Node.TEXT_NODE) {
            const parent = node.parentElement;
            if (parent && parent.hasAttribute("data-original-text")) {
                return (_a = parent.getAttribute("data-original-text")) == null ? void 0 : _a.replace(/\s+/g, " ").trim();
            }
            return (_b = node.textContent) == null ? void 0 : _b.replace(/\s+/g, " ").trim().toLocaleLowerCase();
        }
    }).join(" ").trim();
    const hash = murmurhash3_32_gc(content.toLowerCase(), 42).toString(16);
    return hash;
}
function murmurhash3_32_gc(key, seed) {
    let remainder = key.length & 3, bytes = key.length - remainder;
    let h1 = seed, c1 = 3432918353, c2 = 461845907;
    let i = 0;
    while(i < bytes){
        let k12 = key.charCodeAt(i) & 255 | (key.charCodeAt(++i) & 255) << 8 | (key.charCodeAt(++i) & 255) << 16 | (key.charCodeAt(++i) & 255) << 24;
        ++i;
        k12 = (k12 & 65535) * c1 + (((k12 >>> 16) * c1 & 65535) << 16) & 4294967295;
        k12 = k12 << 15 | k12 >>> 17;
        k12 = (k12 & 65535) * c2 + (((k12 >>> 16) * c2 & 65535) << 16) & 4294967295;
        h1 ^= k12;
        h1 = h1 << 13 | h1 >>> 19;
        const h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
        h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
    }
    let k1 = 0;
    switch(remainder){
        //@ts-expect-error - this is a valid case
        case 3:
            k1 ^= key.charCodeAt(i + 2) << 16;
        //@ts-expect-error - this is a valid case
        case 2:
            k1 ^= key.charCodeAt(i + 1) << 8;
        case 1:
            k1 ^= key.charCodeAt(i);
            k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
            k1 = k1 << 15 | k1 >>> 17;
            k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
            h1 ^= k1;
    }
    h1 ^= key.length;
    h1 ^= h1 >>> 16;
    h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
    h1 ^= h1 >>> 13;
    h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
    h1 ^= h1 >>> 16;
    return h1 >>> 0;
}
const removeEmojis = (text)=>text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
const getUserLanguage = ()=>{
    const userLanguages = window.navigator.languages;
    const userLanguage = languages.find((lang)=>userLanguages.includes(lang.code));
    return (userLanguage == null ? void 0 : userLanguage.code) || "en";
};
class DocumentNavigator {
    /**
   * Retrieves text nodes eligible for translation from the document
   * @returns Collection of text nodes ready for translation
   */ static findTranslatableContent() {
        var _a;
        if (typeof window === "undefined") {
            return [];
        }
        const validator = {
            acceptNode (node) {
                var _a2;
                if (node.nodeType !== Node.TEXT_NODE) {
                    return NodeFilter.FILTER_REJECT;
                }
                const container = node.parentElement;
                if (!container) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (container.closest('[aria-hidden="true"]')) {
                    return NodeFilter.FILTER_REJECT;
                }
                if (container.classList.contains("sr-only")) {
                    return NodeFilter.FILTER_REJECT;
                }
                const shouldSkip = container.closest("script, style, code") !== null || container.closest("next-route-announcer") !== null || container.closest(".jigts-translation-widget") !== null || container.closest(".jigts-widget-trigger") !== null || container.closest(".jigts-widget-dropdown") !== null || container.closest(".notranslate") !== null || !((_a2 = node.textContent) == null ? void 0 : _a2.trim());
                return shouldSkip ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
            }
        };
        const navigator = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, validator);
        const results = [];
        let currentNode;
        while(currentNode = navigator.nextNode()){
            if (currentNode.nodeType === Node.TEXT_NODE) {
                let text = ((_a = currentNode.textContent) == null ? void 0 : _a.trim()) || "";
                const parentElement = currentNode.parentElement;
                if (parentElement) {
                    const originalText = parentElement.getAttribute("data-original-text");
                    if (originalText) {
                        text = originalText;
                    }
                }
                const textWithoutEmojis = removeEmojis(text);
                if (text.length === 0 || text.length === 1 || textWithoutEmojis.length === 0) {
                    continue;
                }
                results.push(currentNode);
            }
        }
        return results;
    }
    /**
   * Divides a collection into smaller groups
   * @param items Collection to divide
   * @param groupSize Maximum size of each group
   * @returns Array of item groups
   */ static divideIntoGroups(items, groupSize) {
        const groups = [];
        for(let i = 0; i < items.length; i += groupSize){
            groups.push(items.slice(i, i + groupSize));
        }
        return groups;
    }
    /**
   * Determines if a node contains translatable text
   * @param node Node to evaluate
   * @returns Whether the node contains translatable content
   */ static containsTranslatableContent(node) {
        var _a;
        if (node.nodeType !== Node.TEXT_NODE) {
            return false;
        }
        const container = node.parentElement;
        if (!container) {
            return false;
        }
        return !(container.tagName === "SCRIPT" || container.tagName === "STYLE" || container.tagName === "CODE" || container.tagName === "next-route-announcer" || container.closest(".translate-widget") || container.closest(".notranslate") || !((_a = node.textContent) == null ? void 0 : _a.trim()));
    }
    /**
   * Retrieves the containing element of a node
   * @param node Node to find container for
   * @returns Containing element or null if none exists
   */ static getContainer(node) {
        return node.parentElement;
    }
}
const BATCH_SIZE = 10;
const CACHE_PREFIX = "jss-";
const DEFAULT_CONFIG = {
    pageLanguage: "en",
    autoDetectLanguage: false,
    position: "top-right"
};
const widgetTemplate = '<!-- Widget Trigger Button -->\n<div class="jigts-widget-trigger" tabindex="0" role="button" aria-label="Open translation menu" aria-expanded="false">\n    <!-- Normal State -->\n    <div class="jigts-trigger-content">\n        <span class="jigts-trigger-icon">\n            <svg class="jigts-languages-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">\n                </path>\n            </svg>\n        </span>\n    </div>\n\n    <!-- Loading State (hidden by default) -->\n    <div class="jigts-trigger-loading" style="display: none;">\n        <div class="jigts-loading-spinner"></div>\n    </div>\n</div>\n\n<!-- Dropdown Menu -->\n<div class="jigts-widget-dropdown">\n    <!-- Header -->\n    <div class="jigts-dropdown-header">\n        <div class="jigts-dropdown-title">\n            <div class="jigts-title-left">\n                <svg class="jigts-languages-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                        d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">\n                    </path>\n                </svg>\n                <span class="jigts-title-text">Select Language</span>\n            </div>\n            <div class="jigts-language-count">{{languageCount}} languages</div>\n        </div>\n\n        <!-- Search Input -->\n        <div class="jigts-search-container">\n            <svg class="jigts-search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>\n            </svg>\n            <input type="text" class="jigts-search-input" placeholder="Search languages..." aria-label="Search languages">\n            <svg class="jigts-clear-search" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">\n                </path>\n            </svg>\n        </div>\n    </div>\n\n    <!-- Reset Option -->\n    <div class="jigts-reset-option" tabindex="0" role="button" aria-label="Reset to original language">\n        <svg class="jigts-reset-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>\n        </svg>\n        <div class="jigts-reset-text">\n            <span class="jigts-reset-title">Original Language</span>\n            <span class="jigts-reset-subtitle">Reset translation</span>\n        </div>\n    </div>\n\n    <!-- Language List -->\n    <div class="jigts-language-list">\n        {{languageOptions}}\n        <div class="jigts-no-results" style="display: none;">\n            <svg class="jigts-no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">\n                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"\n                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>\n            </svg>\n            <span>No languages found</span>\n        </div>\n    </div>\n</div>';
function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var lzString = {
    exports: {}
};
var hasRequiredLzString;
function requireLzString() {
    if (hasRequiredLzString) return lzString.exports;
    hasRequiredLzString = 1;
    (function(module) {
        var LZString2 = function() {
            var f = String.fromCharCode;
            var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
            var baseReverseDic = {};
            function getBaseValue(alphabet, character) {
                if (!baseReverseDic[alphabet]) {
                    baseReverseDic[alphabet] = {};
                    for(var i = 0; i < alphabet.length; i++){
                        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                    }
                }
                return baseReverseDic[alphabet][character];
            }
            var LZString3 = {
                compressToBase64: function(input) {
                    if (input == null) return "";
                    var res = LZString3._compress(input, 6, function(a) {
                        return keyStrBase64.charAt(a);
                    });
                    switch(res.length % 4){
                        // To produce valid Base64
                        default:
                        // When could this happen ?
                        case 0:
                            return res;
                        case 1:
                            return res + "===";
                        case 2:
                            return res + "==";
                        case 3:
                            return res + "=";
                    }
                },
                decompressFromBase64: function(input) {
                    if (input == null) return "";
                    if (input == "") return null;
                    return LZString3._decompress(input.length, 32, function(index) {
                        return getBaseValue(keyStrBase64, input.charAt(index));
                    });
                },
                compressToUTF16: function(input) {
                    if (input == null) return "";
                    return LZString3._compress(input, 15, function(a) {
                        return f(a + 32);
                    }) + " ";
                },
                decompressFromUTF16: function(compressed) {
                    if (compressed == null) return "";
                    if (compressed == "") return null;
                    return LZString3._decompress(compressed.length, 16384, function(index) {
                        return compressed.charCodeAt(index) - 32;
                    });
                },
                //compress into uint8array (UCS-2 big endian format)
                compressToUint8Array: function(uncompressed) {
                    var compressed = LZString3.compress(uncompressed);
                    var buf = new Uint8Array(compressed.length * 2);
                    for(var i = 0, TotalLen = compressed.length; i < TotalLen; i++){
                        var current_value = compressed.charCodeAt(i);
                        buf[i * 2] = current_value >>> 8;
                        buf[i * 2 + 1] = current_value % 256;
                    }
                    return buf;
                },
                //decompress from uint8array (UCS-2 big endian format)
                decompressFromUint8Array: function(compressed) {
                    if (compressed === null || compressed === void 0) {
                        return LZString3.decompress(compressed);
                    } else {
                        var buf = new Array(compressed.length / 2);
                        for(var i = 0, TotalLen = buf.length; i < TotalLen; i++){
                            buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                        }
                        var result = [];
                        buf.forEach(function(c) {
                            result.push(f(c));
                        });
                        return LZString3.decompress(result.join(""));
                    }
                },
                //compress into a string that is already URI encoded
                compressToEncodedURIComponent: function(input) {
                    if (input == null) return "";
                    return LZString3._compress(input, 6, function(a) {
                        return keyStrUriSafe.charAt(a);
                    });
                },
                //decompress from an output of compressToEncodedURIComponent
                decompressFromEncodedURIComponent: function(input) {
                    if (input == null) return "";
                    if (input == "") return null;
                    input = input.replace(/ /g, "+");
                    return LZString3._decompress(input.length, 32, function(index) {
                        return getBaseValue(keyStrUriSafe, input.charAt(index));
                    });
                },
                compress: function(uncompressed) {
                    return LZString3._compress(uncompressed, 16, function(a) {
                        return f(a);
                    });
                },
                _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
                    if (uncompressed == null) return "";
                    var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
                    for(ii = 0; ii < uncompressed.length; ii += 1){
                        context_c = uncompressed.charAt(ii);
                        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                            context_dictionary[context_c] = context_dictSize++;
                            context_dictionaryToCreate[context_c] = true;
                        }
                        context_wc = context_w + context_c;
                        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
                            context_w = context_wc;
                        } else {
                            if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                                if (context_w.charCodeAt(0) < 256) {
                                    for(i = 0; i < context_numBits; i++){
                                        context_data_val = context_data_val << 1;
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                    }
                                    value = context_w.charCodeAt(0);
                                    for(i = 0; i < 8; i++){
                                        context_data_val = context_data_val << 1 | value & 1;
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = value >> 1;
                                    }
                                } else {
                                    value = 1;
                                    for(i = 0; i < context_numBits; i++){
                                        context_data_val = context_data_val << 1 | value;
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = 0;
                                    }
                                    value = context_w.charCodeAt(0);
                                    for(i = 0; i < 16; i++){
                                        context_data_val = context_data_val << 1 | value & 1;
                                        if (context_data_position == bitsPerChar - 1) {
                                            context_data_position = 0;
                                            context_data.push(getCharFromInt(context_data_val));
                                            context_data_val = 0;
                                        } else {
                                            context_data_position++;
                                        }
                                        value = value >> 1;
                                    }
                                }
                                context_enlargeIn--;
                                if (context_enlargeIn == 0) {
                                    context_enlargeIn = Math.pow(2, context_numBits);
                                    context_numBits++;
                                }
                                delete context_dictionaryToCreate[context_w];
                            } else {
                                value = context_dictionary[context_w];
                                for(i = 0; i < context_numBits; i++){
                                    context_data_val = context_data_val << 1 | value & 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            context_dictionary[context_wc] = context_dictSize++;
                            context_w = String(context_c);
                        }
                    }
                    if (context_w !== "") {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                            if (context_w.charCodeAt(0) < 256) {
                                for(i = 0; i < context_numBits; i++){
                                    context_data_val = context_data_val << 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for(i = 0; i < 8; i++){
                                    context_data_val = context_data_val << 1 | value & 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for(i = 0; i < context_numBits; i++){
                                    context_data_val = context_data_val << 1 | value;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for(i = 0; i < 16; i++){
                                    context_data_val = context_data_val << 1 | value & 1;
                                    if (context_data_position == bitsPerChar - 1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                    }
                    value = 2;
                    for(i = 0; i < context_numBits; i++){
                        context_data_val = context_data_val << 1 | value & 1;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else {
                            context_data_position++;
                        }
                        value = value >> 1;
                    }
                    while(true){
                        context_data_val = context_data_val << 1;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data.push(getCharFromInt(context_data_val));
                            break;
                        } else context_data_position++;
                    }
                    return context_data.join("");
                },
                decompress: function(compressed) {
                    if (compressed == null) return "";
                    if (compressed == "") return null;
                    return LZString3._decompress(compressed.length, 32768, function(index) {
                        return compressed.charCodeAt(index);
                    });
                },
                _decompress: function(length, resetValue, getNextValue) {
                    var dictionary = [], enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {
                        val: getNextValue(0),
                        position: resetValue,
                        index: 1
                    };
                    for(i = 0; i < 3; i += 1){
                        dictionary[i] = i;
                    }
                    bits = 0;
                    maxpower = Math.pow(2, 2);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    switch(bits){
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2, 8);
                            power = 1;
                            while(power != maxpower){
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            c = f(bits);
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2, 16);
                            power = 1;
                            while(power != maxpower){
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb > 0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            c = f(bits);
                            break;
                        case 2:
                            return "";
                    }
                    dictionary[3] = c;
                    w = c;
                    result.push(c);
                    while(true){
                        if (data.index > length) {
                            return "";
                        }
                        bits = 0;
                        maxpower = Math.pow(2, numBits);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        switch(c = bits){
                            case 0:
                                bits = 0;
                                maxpower = Math.pow(2, 8);
                                power = 1;
                                while(power != maxpower){
                                    resb = data.val & data.position;
                                    data.position >>= 1;
                                    if (data.position == 0) {
                                        data.position = resetValue;
                                        data.val = getNextValue(data.index++);
                                    }
                                    bits |= (resb > 0 ? 1 : 0) * power;
                                    power <<= 1;
                                }
                                dictionary[dictSize++] = f(bits);
                                c = dictSize - 1;
                                enlargeIn--;
                                break;
                            case 1:
                                bits = 0;
                                maxpower = Math.pow(2, 16);
                                power = 1;
                                while(power != maxpower){
                                    resb = data.val & data.position;
                                    data.position >>= 1;
                                    if (data.position == 0) {
                                        data.position = resetValue;
                                        data.val = getNextValue(data.index++);
                                    }
                                    bits |= (resb > 0 ? 1 : 0) * power;
                                    power <<= 1;
                                }
                                dictionary[dictSize++] = f(bits);
                                c = dictSize - 1;
                                enlargeIn--;
                                break;
                            case 2:
                                return result.join("");
                        }
                        if (enlargeIn == 0) {
                            enlargeIn = Math.pow(2, numBits);
                            numBits++;
                        }
                        if (dictionary[c]) {
                            entry = dictionary[c];
                        } else {
                            if (c === dictSize) {
                                entry = w + w.charAt(0);
                            } else {
                                return null;
                            }
                        }
                        result.push(entry);
                        dictionary[dictSize++] = w + entry.charAt(0);
                        enlargeIn--;
                        w = entry;
                        if (enlargeIn == 0) {
                            enlargeIn = Math.pow(2, numBits);
                            numBits++;
                        }
                    }
                }
            };
            return LZString3;
        }();
        if (module != null) {
            module.exports = LZString2;
        } else if (typeof angular !== "undefined" && angular != null) {
            angular.module("LZString", []).factory("LZString", function() {
                return LZString2;
            });
        }
    })(lzString);
    return lzString.exports;
}
var lzStringExports = requireLzString();
const LZString = /* @__PURE__ */ getDefaultExportFromCjs(lzStringExports);
class LocalStorageWrapper {
    constructor(prefix = ""){
        __publicField(this, "prefix");
        __publicField(this, "COMPRESSION_THRESHOLD", 1e4);
        __publicField(this, "COMPRESSION_MARKER", "__COMPRESSED__");
        this.prefix = prefix;
    }
    getKey(hash, url, targetLang) {
        const urlWithoutQuery = url.split("?")[0];
        return `${hash}-${encodeURIComponent(urlWithoutQuery)}-${targetLang}`;
    }
    shouldCompress(value) {
        return value.length > this.COMPRESSION_THRESHOLD;
    }
    compress(value) {
        try {
            return LZString.compressToBase64(value);
        } catch (error) {
            console.error("Compression failed:", error);
            return value;
        }
    }
    decompress(value) {
        try {
            return LZString.decompressFromBase64(value) || value;
        } catch (error) {
            console.error("Decompression failed:", error);
            return value;
        }
    }
    getItem(key) {
        const prefixedKey = this.prefix + key;
        const item = localStorage.getItem(prefixedKey);
        if (!item) return null;
        try {
            const decompressed = item.startsWith(this.COMPRESSION_MARKER) ? this.decompress(item.slice(this.COMPRESSION_MARKER.length)) : item;
            return JSON.parse(decompressed);
        } catch (e) {
            console.error("Error parsing cached item:", e);
            return null;
        }
    }
    setItem(key, value) {
        const prefixedKey = this.prefix + key;
        const stringified = JSON.stringify(value);
        const storeValue = ()=>{
            try {
                const finalValue = this.shouldCompress(stringified) ? `${this.COMPRESSION_MARKER}${this.compress(stringified)}` : stringified;
                localStorage.setItem(prefixedKey, finalValue);
            } catch (error) {
                console.error("Error storing item:", error);
                localStorage.setItem(prefixedKey, stringified);
            }
        };
        if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(()=>storeValue());
        } else {
            setTimeout(storeValue, 0);
        }
    }
    removeItem(key) {
        const prefixedKey = this.prefix + key;
        localStorage.removeItem(prefixedKey);
    }
    clear() {
        if (this.prefix) {
            for(let key in localStorage){
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            }
        } else {
            localStorage.clear();
        }
    }
    key(index) {
        return localStorage.key(index);
    }
    get length() {
        return localStorage.length;
    }
}
const _TranslationWidget = class _TranslationWidget {
    constructor(publicKey, config = {}){
        __publicField(this, "config");
        __publicField(this, "translationService");
        __publicField(this, "currentLanguage");
        __publicField(this, "widget");
        __publicField(this, "elements");
        __publicField(this, "autoDetectLanguage");
        __publicField(this, "isTranslated", false);
        __publicField(this, "userLanguage");
        __publicField(this, "isTranslating", false);
        __publicField(this, "observer", null);
        __publicField(this, "translationScheduled", false);
        __publicField(this, "scheduleTimeout", null);
        __publicField(this, "showUI", true);
        __publicField(this, "lastTranslated", null);
        __publicField(this, "currentTranslationPromise", null);
        __publicField(this, "lastRequestedLanguage", null);
        __publicField(this, "translationRequestId", 0);
        __publicField(this, "onUrlChange", ()=>{
            this.scheduleTranslation();
        });
        const allowedPositions = [
            "top-right",
            "top-left",
            "bottom-left",
            "bottom-right"
        ];
        let safeConfig = {
            ...DEFAULT_CONFIG,
            ...config
        };
        if (safeConfig.position && !allowedPositions.includes(safeConfig.position)) {
            console.warn(`Invalid position '${safeConfig.position}' passed to TranslationWidget. Falling back to 'top-right'.`);
            safeConfig.position = "top-right";
        }
        this.config = safeConfig;
        if (!publicKey) {
            throw new Error("Public key is required to initialize the translation widget");
        }
        if (publicKey.startsWith("sk_")) {
            throw new Error("Please use public api key for security reasons. You can get one from https://jigsawstack.com");
        }
        if (!publicKey.startsWith("pk_")) {
            throw new Error("Please use proper api key. You can get one from https://jigsawstack.com");
        }
        this.translationService = new TranslationService(publicKey);
        this.autoDetectLanguage = this.config.autoDetectLanguage || false;
        this.currentLanguage = this.config.pageLanguage;
        this.userLanguage = getUserLanguage();
        this.widget = document.createElement("div");
        this.showUI = this.config.showUI ?? true;
        this.elements = {
            trigger: null,
            dropdown: null,
            searchInput: null,
            clearSearch: null,
            languageItems: null,
            loadingIndicator: null
        };
        this.initialize();
        _TranslationWidget.instance = this;
    }
    initialize() {
        var _a;
        if (!this.validateConfig()) return;
        const urlLang = this.getUrlParameter("lang");
        let initialLang = this.config.pageLanguage;
        if (urlLang) {
            const supportedLang = languages.find((lang)=>lang.code === urlLang);
            if (supportedLang) {
                initialLang = urlLang;
            }
        } else if (localStorage.getItem("jss-pref")) {
            initialLang = localStorage.getItem("jss-pref");
        } else if (this.autoDetectLanguage) {
            initialLang = this.userLanguage;
        } else if (!this.config.pageLanguage) {
            const htmlTag = document.querySelector("html");
            if (htmlTag && htmlTag.getAttribute("lang")) {
                initialLang = htmlTag.getAttribute("lang");
            } else {
                initialLang = "en";
            }
        }
        this.currentLanguage = initialLang;
        if (this.showUI) {
            this.createWidget();
            const triggerIcon = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-icon");
            if (triggerIcon && this.currentLanguage !== this.config.pageLanguage) {
                const langObj = languages.find((lang)=>lang.code === this.currentLanguage);
                const langName = langObj ? langObj.name : this.currentLanguage.toUpperCase();
                triggerIcon.innerHTML = `<span class="jigts-lang-code">${this.currentLanguage.toUpperCase()}</span><span class="jigts-lang-name">${langName}</span>`;
            }
            this.setupEventListeners();
            this.setupURLObserver();
            this.setupContentObserver();
        }
        if (this.currentLanguage !== this.config.pageLanguage) {
            this.translatePage(this.currentLanguage).catch((error)=>{
                console.error("Initial translation error:", error);
            });
        }
    }
    getUrlParameter(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }
    setupContentObserver() {
        this.observer = new MutationObserver((mutations)=>{
            mutations.forEach((mutation)=>{
                if (this.widget.contains(mutation.target)) {
                    return;
                }
                if (mutation.type === "characterData" || mutation.type === "childList" && Array.from(mutation.addedNodes).some((node)=>node.nodeType === Node.TEXT_NODE)) ;
            });
            if (this.isTranslating) return;
            this.scheduleTranslation();
        });
        this.observeBody();
    }
    observeBody() {
        var _a;
        (_a = this.observer) == null ? void 0 : _a.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        });
    }
    setupURLObserver() {
        const historyMethods = [
            "pushState",
            "replaceState"
        ];
        historyMethods.forEach((method)=>{
            const original = history[method];
            history[method] = function(state, title, url) {
                const result = original.call(this, state, title, url);
                window.dispatchEvent(new Event(method));
                return result;
            };
            window.addEventListener(method, this.onUrlChange);
        });
        window.addEventListener("popstate", this.onUrlChange);
    }
    validateConfig() {
        if (!this.translationService) {
            console.error("Translation service is required to initialize the translation widget");
            return false;
        }
        return true;
    }
    createWidget() {
        var _a;
        const currentLanguageLabel = this.getCurrentLanguageLabel();
        this.widget = document.createElement("div");
        this.widget.className = `jigts-translation-widget jigts-position-${this.config.position || "top-right"}`;
        if (this.config.theme) {
            if (this.config.theme.baseColor) {
                this.widget.style.setProperty("--jigts-custom-base-color", this.config.theme.baseColor);
            }
            if (this.config.theme.textColor) {
                this.widget.style.setProperty("--jigts-custom-text-color", this.config.theme.textColor);
            }
        }
        document.body.appendChild(this.widget);
        this.widget.innerHTML = this.createWidgetHTML(currentLanguageLabel);
        this.elements = {
            trigger: this.widget.querySelector(".jigts-widget-trigger"),
            dropdown: this.widget.querySelector(".jigts-widget-dropdown"),
            searchInput: this.widget.querySelector(".jigts-search-input"),
            clearSearch: this.widget.querySelector(".jigts-clear-search"),
            languageItems: this.widget.querySelectorAll(".jigts-language-item"),
            loadingIndicator: this.widget.querySelector(".jigts-loading-spinner")
        };
        const triggerSpan = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector("span");
        if (triggerSpan) {
            triggerSpan.classList.add("jigts-fade-in");
        }
    }
    getCurrentLanguageLabel() {
        var _a;
        return ((_a = languages.find((language)=>language.code === this.currentLanguage)) == null ? void 0 : _a.native) || "English";
    }
    createWidgetHTML(currentLanguageLabel) {
        const languageOptions = this.createLanguageOptions();
        const languageCount = languages.length;
        return widgetTemplate.replace("{{languageOptions}}", languageOptions).replace("{{currentLanguageLabel}}", currentLanguageLabel).replace("{{languageCount}}", languageCount.toString());
    }
    createLanguageOptions() {
        const currentLang = this.currentLanguage;
        const currentLanguage = languages.find((lang)=>lang.code === currentLang);
        const otherLanguages = languages.filter((lang)=>lang.code !== currentLang).sort((a, b)=>a.native.localeCompare(b.native));
        if (!currentLanguage) return "";
        const createLanguageItem = (lang, isSelected = false)=>`
            <div class="jigts-language-item ${isSelected ? "jigts-selected" : ""}" tabindex="0" role="option" aria-selected="${isSelected}" data-language-code="${lang.code}">
                <div class="jigts-language-info">
                    <div class="jigts-language-main">
                        <span class="jigts-language-name">${lang.name}</span>
                        <div class="jigts-language-code">${lang.code}</div>
                    </div>
                    <div class="jigts-language-details">
                        <span class="jigts-language-native">${lang.native}</span>
                    </div>
                </div>
                <svg class="jigts-check-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
        `;
        return `
            ${createLanguageItem(currentLanguage, true)}
            ${otherLanguages.map((lang)=>createLanguageItem(lang)).join("")}
        `;
    }
    async updateTriggerText(newText) {
        var _a;
        const triggerSpan = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector("span");
        if (!triggerSpan) return;
        triggerSpan.offsetHeight;
        triggerSpan.classList.remove("jigts-fade-in");
        triggerSpan.classList.add("jigts-fade-out");
        await new Promise((resolve)=>setTimeout(resolve, 300));
        triggerSpan.textContent = newText;
        triggerSpan.offsetHeight;
        triggerSpan.classList.remove("jigts-fade-out");
        triggerSpan.classList.add("jigts-fade-in");
    }
    getTextToTranslate(node, parent, targetLang) {
        var _a, _b;
        if (!parent.hasAttribute("data-original-text")) {
            const originalText = (_a = node.textContent) == null ? void 0 : _a.trim();
            if (originalText) {
                parent.setAttribute("data-translated-lang", targetLang);
                parent.setAttribute("data-original-text", originalText);
                if (!parent.hasAttribute("data-original-font-size")) {
                    const computedStyle = window.getComputedStyle(parent);
                    parent.setAttribute("data-original-font-size", computedStyle.fontSize);
                }
                return originalText;
            }
        } else {
            const textToTranslate = (_b = node.textContent) == null ? void 0 : _b.trim();
            if (this.currentLanguage !== "en" && targetLang !== "en") {
                parent.setAttribute("data-translated-lang", targetLang);
                return parent.getAttribute("data-original-text");
            }
            return textToTranslate || null;
        }
        return null;
    }
    calculateFontSize(text, originalFontSize, originalText) {
        const baseFontSize = 12;
        const maxFontSize = parseInt(originalFontSize);
        const textLength = text.length;
        const originalLength = originalText.length;
        if (textLength <= originalLength) {
            return originalFontSize;
        }
        const fontSize = Math.max(baseFontSize, Math.min(maxFontSize, maxFontSize * (1 - Math.log(textLength) / 10)));
        return `${fontSize}px`;
    }
    updateLoadingState(isLoading) {
        var _a, _b;
        const triggerContent = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-content");
        const triggerLoading = (_b = this.elements.trigger) == null ? void 0 : _b.querySelector(".jigts-trigger-loading");
        if (triggerContent && triggerLoading) {
            if (isLoading) {
                triggerContent.style.display = "none";
                triggerLoading.style.display = "flex";
            } else {
                triggerLoading.style.display = "none";
                triggerContent.style.display = "flex";
            }
        }
    }
    async translatePage(targetLang) {
        const requestId = ++this.translationRequestId;
        this.lastRequestedLanguage = targetLang;
        this.updateLoadingState(true);
        if (this.currentTranslationPromise) {
            await this.currentTranslationPromise;
        }
        if (targetLang === this.config.pageLanguage) {
            this.resetTranslations();
            if (requestId === this.translationRequestId) {
                this.updateLoadingState(false);
            }
            return;
        }
        this.currentTranslationPromise = this._translatePage(targetLang);
        try {
            await this.currentTranslationPromise;
        } catch (error) {
            console.error("Translation failed:", error);
            this.resetToDefaultLanguage();
        } finally{
            if (requestId === this.translationRequestId) {
                this.currentTranslationPromise = null;
                this.updateLoadingState(false);
            }
        }
    }
    resetToDefaultLanguage() {
        var _a;
        if (this.isTranslating) {
            return;
        }
        this.resetTranslations();
        this.lastRequestedLanguage = this.config.pageLanguage;
        this.currentLanguage = this.config.pageLanguage;
        const languageItems = this.widget.querySelectorAll(".jigts-language-item");
        languageItems.forEach((item)=>{
            const isSelected = item.getAttribute("data-language-code") === this.config.pageLanguage;
            item.classList.toggle("jigts-selected", isSelected);
            item.setAttribute("aria-selected", isSelected.toString());
        });
        console.log("resetToDefaultLanguage", this.config.pageLanguage);
        localStorage.setItem("jss-pref", this.config.pageLanguage);
        const triggerIcon = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-icon");
        if (triggerIcon) {
            triggerIcon.innerHTML = this.getLanguageSVG();
        }
        this.isTranslated = false;
        this.updateResetButtonVisibility();
    }
    async _translatePage(targetLang) {
        var _a;
        this.isTranslating = true;
        (_a = this.observer) == null ? void 0 : _a.disconnect();
        try {
            const nodes = DocumentNavigator.findTranslatableContent();
            const batches = DocumentNavigator.divideIntoGroups(nodes, BATCH_SIZE);
            const cache = new LocalStorageWrapper(CACHE_PREFIX);
            let hash = generateHashForContent(nodes);
            const allBatchNodes = [];
            const allBatchTexts = [];
            batches.forEach((batch)=>{
                const textsToTranslate = [];
                const batchNodes = [];
                batch.forEach((node)=>{
                    if (node.nodeType !== Node.TEXT_NODE) return;
                    const parent = node.parentElement;
                    if (!parent) return;
                    const translatedLang = parent.getAttribute("data-translated-lang");
                    if (parent.hasAttribute("data-original-text") && targetLang === translatedLang) {
                        return;
                    }
                    let textToTranslate = this.getTextToTranslate(node, parent, targetLang);
                    textToTranslate = removeEmojis(textToTranslate || "");
                    if (textToTranslate.length === 0 || textToTranslate.length === 1) {
                        return;
                    }
                    if (textToTranslate) {
                        textsToTranslate.push(textToTranslate.trim());
                        batchNodes.push(node);
                    }
                });
                allBatchNodes.push(batchNodes);
                allBatchTexts.push(textsToTranslate);
            });
            const nonEmptyBatchNodes = [];
            const nonEmptyBatchTexts = [];
            allBatchTexts.forEach((texts, i)=>{
                if (texts.length > 0) {
                    nonEmptyBatchTexts.push(texts);
                    nonEmptyBatchNodes.push(allBatchNodes[i]);
                }
            });
            const key = cache.getKey(hash, window.location.href, targetLang);
            const cachedTranslations = cache.getItem(key);
            if (cachedTranslations && cachedTranslations[0]) {
                const fullTranslations2 = cachedTranslations[0];
                if (this.lastRequestedLanguage === targetLang) {
                    nodes.forEach((node, idx)=>{
                        if (node.nodeType === Node.TEXT_NODE) {
                            const parent = node.parentElement;
                            if (parent) {
                                const originalText = parent.getAttribute("data-original-text") || "";
                                const originalFontSize = parent.getAttribute("data-original-font-size") || "16px";
                                const newFontSize = this.calculateFontSize(fullTranslations2[idx], originalFontSize, originalText);
                                parent.style.fontSize = newFontSize;
                            }
                            node.textContent = fullTranslations2[idx];
                        }
                    });
                    this.isTranslated = true;
                    this.updateResetButtonVisibility();
                }
                return;
            }
            const allTranslatedTexts = await Promise.all(nonEmptyBatchTexts.map((texts)=>this.translationService.translateBatchText(texts, targetLang)));
            if (allTranslatedTexts.length === 0) {
                if (this.lastRequestedLanguage === targetLang) {
                    this.isTranslated = true;
                    this.updateResetButtonVisibility();
                }
                return;
            }
            const allBatchesFailed = allTranslatedTexts.every((translations, batchIndex)=>{
                const originalTexts = nonEmptyBatchTexts[batchIndex];
                return translations.every((translation, index)=>translation === originalTexts[index]);
            });
            if (allBatchesFailed) {
                console.warn("All translations failed, not caching results");
                throw new Error("All translation batches failed");
            }
            const fullTranslations = [];
            nodes.forEach((node, nodeIdx)=>{
                const parent = node.parentElement;
                const batchIdx = nonEmptyBatchNodes.findIndex((batch)=>batch.includes(node));
                if (batchIdx !== -1) {
                    const textIdx = nonEmptyBatchNodes[batchIdx].indexOf(node);
                    const translatedText = allTranslatedTexts[batchIdx][textIdx];
                    fullTranslations[nodeIdx] = translatedText;
                    console.log(this.lastRequestedLanguage, targetLang);
                    if (this.lastRequestedLanguage === targetLang) {
                        if (parent) {
                            const originalText = parent.getAttribute("data-original-text") || "";
                            const originalFontSize = parent.getAttribute("data-original-font-size") || "16px";
                            const newFontSize = this.calculateFontSize(translatedText, originalFontSize, originalText);
                            parent.style.fontSize = newFontSize;
                        }
                        node.textContent = translatedText;
                    }
                } else if (parent && parent.getAttribute("data-translated-lang") === targetLang) {
                    fullTranslations[nodeIdx] = node.textContent || "";
                } else {
                    fullTranslations[nodeIdx] = node.textContent || "";
                }
            });
            cache.setItem(key, [
                fullTranslations
            ]);
            if (this.lastRequestedLanguage === targetLang) {
                this.isTranslated = true;
                this.updateResetButtonVisibility();
            }
        } finally{
            this.isTranslating = false;
            this.observeBody();
        }
    }
    updateResetButtonVisibility() {
        const resetButton = this.widget.querySelector(".jigts-reset-option");
        if (resetButton) {
            resetButton.style.display = this.isTranslated ? "flex" : "none";
        }
    }
    resetTranslations() {
        if (this.observer) {
            this.observer.disconnect();
        }
        const elements = document.querySelectorAll("[data-original-text]");
        elements.forEach((element)=>{
            const textNodes = Array.from(element.childNodes).filter((node)=>node.nodeType === Node.TEXT_NODE);
            if (textNodes.length > 0) {
                const originalText = element.getAttribute("data-original-text");
                if (originalText) {
                    textNodes[0].textContent = originalText;
                }
            }
            const originalFontSize = element.getAttribute("data-original-font-size");
            if (originalFontSize) {
                element.style.fontSize = originalFontSize;
            }
            element.removeAttribute("data-original-text");
            element.removeAttribute("data-translated-lang");
            element.removeAttribute("data-original-font-size");
        });
        this.isTranslated = false;
        this.currentLanguage = this.config.pageLanguage;
        const nodes = DocumentNavigator.findTranslatableContent();
        const hash = generateHashForContent(nodes);
        this.lastTranslated = {
            url: window.location.href,
            lang: this.config.pageLanguage,
            hash
        };
        this.updateResetButtonVisibility();
        this.observeBody();
    }
    adjustDropdownPosition() {
        const { dropdown, trigger } = this.elements;
        if (!dropdown || !trigger) return;
        const triggerRect = trigger.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        dropdown.style.top = "";
        dropdown.style.bottom = "";
        dropdown.style.left = "";
        dropdown.style.right = "";
        dropdown.style.transform = "";
        const spaceBelow = viewportHeight - triggerRect.bottom;
        const spaceAbove = triggerRect.top;
        const spaceRight = viewportWidth - triggerRect.right;
        const spaceLeft = triggerRect.left;
        if (spaceBelow < dropdownRect.height && spaceAbove > spaceBelow) {
            dropdown.style.bottom = "100%";
            dropdown.style.top = "auto";
            dropdown.style.marginBottom = "0.5rem";
            dropdown.style.marginTop = "0";
        } else {
            dropdown.style.top = "100%";
            dropdown.style.bottom = "auto";
            dropdown.style.marginTop = "0.5rem";
            dropdown.style.marginBottom = "0";
        }
        if (spaceRight < dropdownRect.width && spaceLeft > spaceRight) {
            dropdown.style.right = "0";
            dropdown.style.left = "auto";
        } else {
            dropdown.style.left = "0";
            dropdown.style.right = "auto";
        }
        const finalRect = dropdown.getBoundingClientRect();
        if (finalRect.right > viewportWidth) {
            dropdown.style.right = "0";
            dropdown.style.left = "auto";
        }
        if (finalRect.left < 0) {
            dropdown.style.left = "0";
            dropdown.style.right = "auto";
        }
    }
    setupEventListeners() {
        const { trigger, dropdown, searchInput, clearSearch, languageItems } = this.elements;
        if (!trigger || !dropdown || !searchInput || !clearSearch || !languageItems) {
            console.error("Failed to find required elements");
            return;
        }
        const resetButton = this.widget.querySelector(".jigts-reset-option");
        if (resetButton) {
            resetButton.addEventListener("click", ()=>{
                var _a;
                if (this.isTranslating) return;
                this.resetToDefaultLanguage();
                resetButton.classList.remove("jigts-active");
                this.isTranslated = false;
                this.updateResetButtonVisibility();
                const languageItems2 = this.widget.querySelectorAll(".jigts-language-item");
                languageItems2.forEach((item)=>{
                    const isSelected = item.getAttribute("data-language-code") === this.config.pageLanguage;
                    item.classList.toggle("jigts-selected", isSelected);
                    item.setAttribute("aria-selected", isSelected.toString());
                });
                const triggerIcon = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-icon");
                if (triggerIcon) {
                    triggerIcon.innerHTML = this.getLanguageSVG();
                }
                dropdown.classList.remove("jigts-open");
                trigger.setAttribute("aria-expanded", "false");
                const triggerContent = trigger.querySelector(".jigts-trigger-content");
                if (triggerContent) triggerContent.classList.remove("jigts-has-translation");
            });
        }
        this.updateResetButtonVisibility();
        trigger.addEventListener("click", ()=>{
            dropdown.classList.toggle("jigts-open");
            const isOpen = dropdown.classList.contains("jigts-open");
            trigger.setAttribute("aria-expanded", isOpen.toString());
            if (isOpen) {
                this.adjustDropdownPosition();
                searchInput.focus();
            }
        });
        window.addEventListener("resize", ()=>{
            if (dropdown.classList.contains("jigts-open")) {
                this.adjustDropdownPosition();
            }
        });
        document.addEventListener("click", (e)=>{
            if (!e.target.closest(".jigts-translation-widget")) {
                if (dropdown.classList.contains("jigts-open")) {
                    dropdown.classList.add("jigts-closing");
                    setTimeout(()=>{
                        dropdown.classList.remove("jigts-open", "jigts-closing");
                        trigger.setAttribute("aria-expanded", "false");
                    }, 300);
                }
            }
        });
        searchInput.addEventListener("input", ()=>{
            const searchTerm = searchInput.value.toLowerCase();
            const hasValue = searchTerm.length > 0;
            clearSearch.classList.toggle("jigts-visible", hasValue);
            const items = this.widget.querySelectorAll(".jigts-language-item");
            const noResults = this.widget.querySelector(".jigts-no-results");
            let visibleCount = 0;
            items.forEach((item)=>{
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const name = ((_b = (_a = item.querySelector(".jigts-language-name")) == null ? void 0 : _a.textContent) == null ? void 0 : _b.toLowerCase()) || "";
                const native = ((_d = (_c = item.querySelector(".jigts-language-native")) == null ? void 0 : _c.textContent) == null ? void 0 : _d.toLowerCase()) || "";
                const code = ((_f = (_e = item.querySelector(".jigts-language-code")) == null ? void 0 : _e.textContent) == null ? void 0 : _f.toLowerCase()) || "";
                const region = ((_h = (_g = item.querySelector(".jigts-language-region")) == null ? void 0 : _g.textContent) == null ? void 0 : _h.toLowerCase()) || "";
                const matches = name.includes(searchTerm) || native.includes(searchTerm) || code.includes(searchTerm) || region.includes(searchTerm);
                item.style.display = matches ? "" : "none";
                if (matches) visibleCount++;
            });
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? "flex" : "none";
            }
        });
        clearSearch.addEventListener("click", ()=>{
            searchInput.value = "";
            clearSearch.classList.remove("jigts-visible");
            searchInput.focus();
            const items = this.widget.querySelectorAll(".jigts-language-item");
            const noResults = this.widget.querySelector(".jigts-no-results");
            items.forEach((item)=>{
                item.style.display = "";
            });
            if (noResults) {
                noResults.style.display = "none";
            }
        });
        languageItems.forEach((item)=>{
            item.addEventListener("click", async ()=>{
                var _a, _b;
                languageItems.forEach((i)=>{
                    i.classList.remove("jigts-selected");
                    i.setAttribute("aria-selected", "false");
                });
                item.classList.add("jigts-selected");
                item.setAttribute("aria-selected", "true");
                const langName = (_a = item.querySelector(".jigts-language-name")) == null ? void 0 : _a.textContent;
                const langCode = item.getAttribute("data-language-code");
                dropdown.classList.remove("jigts-open");
                trigger.setAttribute("aria-expanded", "false");
                if (langName) {
                    await this.updateTriggerText(langName);
                }
                if (langCode) {
                    localStorage.setItem("jss-pref", langCode);
                }
                const triggerIcon = (_b = this.elements.trigger) == null ? void 0 : _b.querySelector(".jigts-trigger-icon");
                if (triggerIcon && langCode && langName) {
                    triggerIcon.innerHTML = `<span class="jigts-lang-code">${langCode.toUpperCase()}</span><span class="jigts-lang-name">${langName}</span>`;
                }
                const triggerContent = trigger.querySelector(".jigts-trigger-content");
                if (langCode && langCode !== this.currentLanguage) {
                    if (triggerContent) triggerContent.classList.add("jigts-has-translation");
                    const triggerLoading = trigger.querySelector(".jigts-trigger-loading");
                    if (triggerContent && triggerLoading) {
                        triggerContent.style.display = "none";
                        triggerLoading.style.display = "flex";
                    }
                    try {
                        await this.translatePage(langCode);
                        this.currentLanguage = langCode;
                    } catch (error) {
                        console.error("Translation error:", error);
                        alert("An error occurred during translation. Please try again.");
                    }
                } else if (triggerContent) {
                    triggerContent.classList.remove("jigts-has-translation");
                }
            });
        });
        document.addEventListener("keydown", (e)=>{
            if (!dropdown.classList.contains("jigts-open")) return;
            if (e.key === "Escape") {
                dropdown.classList.remove("jigts-open");
                trigger.setAttribute("aria-expanded", "false");
                trigger.focus();
            }
        });
    }
    scheduleTranslation() {
        if (this.translationScheduled) return;
        const currentUrl = window.location.href;
        const currentLang = this.currentLanguage;
        const nodes = DocumentNavigator.findTranslatableContent();
        const hash = generateHashForContent(nodes);
        if (this.lastTranslated && this.lastTranslated.url === currentUrl && this.lastTranslated.lang === currentLang && this.lastTranslated.hash === hash) {
            return;
        }
        this.translationScheduled = true;
        if (this.scheduleTimeout) clearTimeout(this.scheduleTimeout);
        this.scheduleTimeout = window.setTimeout(()=>{
            var _a, _b;
            this.translationScheduled = false;
            if (this.currentLanguage !== this.config.pageLanguage) {
                this.lastTranslated = {
                    url: currentUrl,
                    lang: currentLang,
                    hash
                };
                const triggerContent = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-content");
                const triggerLoading = (_b = this.elements.trigger) == null ? void 0 : _b.querySelector(".jigts-trigger-loading");
                if (triggerContent && triggerLoading) {
                    triggerContent.style.display = "none";
                    triggerLoading.style.display = "flex";
                }
                this.translatePage(this.currentLanguage).then(()=>{
                    const languageItems = this.widget.querySelectorAll(".jigts-language-item");
                    languageItems.forEach((item)=>{
                        const isSelected = item.getAttribute("data-language-code") === this.currentLanguage;
                        item.classList.toggle("jigts-selected", isSelected);
                        item.setAttribute("aria-selected", isSelected.toString());
                    });
                }).catch((error)=>{
                    console.error("Auto-translation error:", error);
                });
            }
        }, 200);
    }
    /**
   * Public method to translate the page to a specific language
   * @param langCode The language code to translate to
   * @returns Promise that resolves when translation is complete
   */ async translateTo(langCode, onComplete, onError) {
        var _a;
        const startTime = Date.now();
        if (this.isTranslating) {
            console.warn("Translation already in progress");
            onError == null ? void 0 : onError(new Error("Translation already in progress"));
            return {
                success: false,
                targetLanguage: langCode,
                translatedNodes: 0,
                error: "Translation already in progress",
                duration: 0
            };
        }
        const supportedLang = languages.find((lang)=>lang.code === langCode);
        if (!supportedLang) {
            onError == null ? void 0 : onError(new Error(`Unsupported language code: ${langCode}`));
            return {
                success: false,
                targetLanguage: langCode,
                translatedNodes: 0,
                error: `Unsupported language code: ${langCode}`,
                duration: 0
            };
        }
        if (langCode === this.currentLanguage) {
            onComplete == null ? void 0 : onComplete({
                success: true,
                targetLanguage: langCode,
                translatedNodes: 0,
                duration: 0
            });
            return {
                success: true,
                targetLanguage: langCode,
                translatedNodes: 0,
                duration: 0
            };
        }
        try {
            localStorage.setItem("jss-pref", langCode);
            await this.translatePage(langCode);
            this.currentLanguage = langCode;
            const languageItems = this.widget.querySelectorAll(".jigts-language-item");
            for (const item of languageItems){
                const isSelected = item.getAttribute("data-language-code") === langCode;
                item.classList.toggle("jigts-selected", isSelected);
                item.setAttribute("aria-selected", isSelected.toString());
            }
            const triggerContent = (_a = this.elements.trigger) == null ? void 0 : _a.querySelector(".jigts-trigger-content");
            if (triggerContent) {
                triggerContent.classList.add("jigts-has-translation");
                const triggerIcon = triggerContent.querySelector(".jigts-trigger-icon");
                if (triggerIcon && supportedLang) {
                    triggerIcon.innerHTML = `<span class="jigts-lang-code">${supportedLang.code.toUpperCase()}</span><span class="jigts-lang-name">${supportedLang.name}</span>`;
                }
            }
            const endTime = Date.now();
            const translatedNodes = document.querySelectorAll("[data-translated-lang]").length;
            onComplete == null ? void 0 : onComplete({
                success: true,
                targetLanguage: langCode,
                translatedNodes,
                duration: endTime - startTime
            });
            return {
                success: true,
                targetLanguage: langCode,
                translatedNodes,
                duration: endTime - startTime
            };
        } catch (error) {
            onError == null ? void 0 : onError(error);
            return {
                success: false,
                targetLanguage: langCode,
                translatedNodes: 0,
                error: error instanceof Error ? error.message : "Unknown error occurred",
                duration: 0
            };
        }
    }
    /**
   * Get the current instance of TranslationWidget
   * @returns The current TranslationWidget instance or null if not initialized
   */ static getInstance() {
        return _TranslationWidget.instance;
    }
    // Add this helper method to the class
    getLanguageSVG() {
        return `
            <svg class="jigts-languages-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129">
                </path>
            </svg>
        `;
    }
};
__publicField(_TranslationWidget, "instance", null);
let TranslationWidget = _TranslationWidget;
if (typeof window !== "undefined") {
    window.resetTranslation = (defaultLang, onComplete, onError)=>{
        const instance = TranslationWidget.getInstance();
        if (!instance) {
            return;
        }
        try {
            instance.resetToDefaultLanguage();
            onComplete == null ? void 0 : onComplete({
                success: true,
                targetLanguage: defaultLang
            });
        } catch (error) {
            onError == null ? void 0 : onError(error);
        }
    };
    window.translate = async (langCode, onComplete, onError)=>{
        const instance = TranslationWidget.getInstance();
        if (!instance) {
            onError == null ? void 0 : onError(new Error("Translation widget not initialized"));
            return {
                success: false,
                targetLanguage: langCode,
                translatedNodes: 0,
                error: "Translation widget not initialized",
                duration: 0
            };
        }
        const startTime = Date.now();
        try {
            const result = await instance.translateTo(langCode, onComplete, onError);
            onComplete == null ? void 0 : onComplete(result);
            return result;
        } catch (error) {
            onError == null ? void 0 : onError(error);
            return {
                success: false,
                targetLanguage: langCode,
                translatedNodes: 0,
                error: error instanceof Error ? error.message : "Unknown error occurred",
                duration: Date.now() - startTime
            };
        }
    };
}
let widgetInstance;
const initializeTranslationWidget = (publicKey, config)=>{
    if (typeof window === "undefined") {
        throw new Error("Translation widget can only be used in browser environment");
    }
    const initWidget = ()=>{
        if (!widgetInstance) {
            if (!document.querySelector("style[data-translation-widget]")) {
                const style = document.createElement("style");
                style.setAttribute("data-translation-widget", "");
                style.textContent = styles;
                document.head.appendChild(style);
            }
            widgetInstance = new TranslationWidget(publicKey, config);
        }
        return widgetInstance;
    };
    if (document.readyState === "loading") {
        window.addEventListener("DOMContentLoaded", initWidget);
        return void 0;
    } else {
        return initWidget();
    }
};
;
 //# sourceMappingURL=index.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__403fc4c3._.js.map