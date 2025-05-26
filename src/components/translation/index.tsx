import { useEffect, useState } from "react"
import TranslationWidget from "./widget"
import { DOMUtils } from "@/services/dom"
import { TranslationService } from "@/services/translation"
import { Cache } from "@/services/storage/cache"
import { getTextToTranslate } from "@/lib/utils"
import { Language } from "@/types"
import { getUserLanguage } from "@/lib/utils"
import { languages } from "@/constants/languages"
import { TranslationWidgetConfig } from "@/embed"

export default function Widget({ pageLanguage, publicKey, autoDetectLanguage }: TranslationWidgetConfig) {
    const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
    const [isTranslating, setIsTranslating] = useState<boolean>(false)
    const [batches, setBatches] = useState<Node[][]>([])

    if( !publicKey || !pageLanguage ) {
        throw new Error("Public key and pageLanguage are required")
    }

    const translationService = TranslationService.getInstance(publicKey, new Cache())

    useEffect(() => {
        if( autoDetectLanguage) {
        getUserLanguage().then((language) => {
            if( language === pageLanguage ) {
                return
            }
            // find the language in the languages array
            const languageObject = languages.find((lang) => lang.code === language)
            if (languageObject) {
                    setSelectedLanguage(languageObject)
                }
            })
        }
        const nodes = DOMUtils.getTranslatableNodes()
        setBatches(DOMUtils.createBatches(nodes, 10))
    }, [])

    const resetTranslation = () => {
        translationService.resetTranslation()
    }

    const processBatches = async (batches: Node[][], selectedLanguage: Language) => {
        try {
            setIsTranslating(true)
            
            // Collect all text nodes and their corresponding text to translate
            const textToTranslateArray: string[] = []
            const batchNodes: Node[] = []
            const nodeToIndexMap = new Map<Node, number>()

            batches.forEach((batch: Node[]) => {
                batch.forEach((node: Node) => {
                    if (node.nodeType !== Node.TEXT_NODE) return

                    const parent = node.parentElement
                    if (!parent) return
                    
                    const textToTranslate = getTextToTranslate(node as Text, parent, pageLanguage, pageLanguage)
                    if (textToTranslate) {
                        const index = textToTranslateArray.length
                        textToTranslateArray.push(textToTranslate)
                        batchNodes.push(node)
                        nodeToIndexMap.set(node, index)
                    }
                })
            })

            if (textToTranslateArray.length === 0) {
                setIsTranslating(false)
                return
            }

            const translations = await translationService.translateBatchText(textToTranslateArray, selectedLanguage.code)  

            translations.forEach((translation, index) => {
                const node = batchNodes[index]
                if (node) {
                    node.textContent = translation
                }
            })

            
            setIsTranslating(false)
        } catch (err) {
            console.error('Translation error:', err)
            setIsTranslating(false)
        }
    }

    useEffect(() => {
        if (selectedLanguage) {
            processBatches(batches, selectedLanguage)
        }
    }, [selectedLanguage, batches])

    return (
        <TranslationWidget 
            pageLanguage={pageLanguage} 
            selectedLanguage={selectedLanguage} 
            setSelectedLanguage={setSelectedLanguage} 
            isTranslating={isTranslating}
            resetTranslation={resetTranslation}
        />
    )
}