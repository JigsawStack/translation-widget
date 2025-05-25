import { Language, languages } from "@/constants/languages"
import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Globe, Languages, Search, X, RotateCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TranslationWidget() {
    const [selectedLanguage, setSelectedLanguage] = useState<Language| null>(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isTranslating, setIsTranslating] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [focusedIndex, setFocusedIndex] = useState(-1)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    // Filter languages based on search query
    const filteredLanguages = useMemo(() => {
        if (!searchQuery.trim()) return languages

        const query = searchQuery.toLowerCase()
        return languages.filter(
            (lang) =>
                lang.name.toLowerCase().includes(query) ||
                lang.native.toLowerCase().includes(query) ||
                lang.code.toLowerCase().includes(query) ||
                lang.region.toLowerCase().includes(query),
        )
    }, [searchQuery])


    // Focus management for accessibility
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => {
                searchInputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])


    const handleLanguageSelect = async (index: number) => {
        setIsTranslating(true)
        setIsOpen(false)
        setSearchQuery("")
        setFocusedIndex(-1)

        try {
            setSelectedLanguage(filteredLanguages[index])
            console.log(filteredLanguages[index])
            const language = languages.find((lang) => lang.code === filteredLanguages[index].code)
            console.log(language)
        } catch (error) {
            console.log(error)
        } finally {
            setIsTranslating(false)
        }
    }

    const handleReset = () => {
        console.log("Translation reset")

        setSelectedLanguage(null)
        setIsOpen(false)
        setSearchQuery("")
        setFocusedIndex(-1)
    }

    const clearSearch = () => {
        setSearchQuery("")
        setFocusedIndex(-1)
        searchInputRef.current?.focus()
    }
    return (
        <motion.div
      className="fixed top-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              size="sm"
              disabled={isTranslating}
              className="h-12 px-4 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-0"
              aria-label={`Translation widget. ${selectedLanguage ? `Currently translated to ${selectedLanguage}` : "Click to translate page"}`}
            >
              <AnimatePresence mode="wait">
                {isTranslating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <Loader2 className="h-4 w-4 mr-2 animate-spin text-blue-600" />
                    <span className="text-sm font-medium">Translating...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center"
                  >
                    <motion.div animate={{ rotate: selectedLanguage ? 360 : 0 }} transition={{ duration: 0.5 }}>
                      <Globe className="h-4 w-4 mr-2 text-blue-600" />
                    </motion.div>
                    <span className="text-sm font-medium">
                      {selectedLanguage ? selectedLanguage.name : "Translate"}
                    </span>
                    {selectedLanguage && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                      >
                        <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-xs text-white">
                          {selectedLanguage.code.toUpperCase()}
                        </Badge>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
        </DropdownMenuTrigger>

        <AnimatePresence>
          {isOpen && (
            <DropdownMenuContent
              align="end"
              className="w-80 p-0 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-xl overflow-hidden"
              asChild
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <motion.div
                  className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <Languages className="h-4 w-4 mr-2 text-blue-600" />
                      <span className="text-sm font-semibold text-gray-700">Select Language</span>
                    </div>
                    <Badge variant="outline" className="text-xs cursor-pointer">
                      {filteredLanguages.length} languages
                    </Badge>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search languages..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setFocusedIndex(-1)
                      }}
                      className="pl-10 pr-10 h-9 text-sm border-gray-200 focus:border-blue-300 focus:ring-0 focus:outline-none"
                      aria-label="Search languages"
                    />
                    <AnimatePresence>
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
                          aria-label="Clear search"
                        >
                          <X className="h-4 w-4" />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                {/* Reset Option */}
                {selectedLanguage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ 
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for smoother motion
                    }}
                    className="border-b border-gray-100"
                  >
                    <button
                      onClick={handleReset}
                      className="w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0"
                      aria-label="Reset to original language"
                    >
                      <motion.div whileHover={{ rotate: -180 }} transition={{ duration: 0.3 }}>
                        <RotateCcw className="h-4 w-4 mr-3 text-gray-500" />
                      </motion.div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-gray-900">Original Language</span>
                        <span className="text-xs text-gray-500">Reset translation</span>
                      </div>
                    </button>
                  </motion.div>
                )}

                {/* Language List */}
                <ScrollArea className="h-64" ref={listRef}>
                  <div className="p-2">
                    <AnimatePresence mode="popLayout">
                      {filteredLanguages.length > 0 ? (
                        filteredLanguages.map((language, index) => (
                          <motion.button
                            key={language.code}
                            onClick={() => handleLanguageSelect(index)}
                            className={`w-[98%] flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-all duration-150 group focus:outline-none focus:ring-0 ${
                              focusedIndex === index
                                ? "bg-blue-50 border border-blue-200"
                                : "hover:bg-gray-50 focus:bg-blue-50 focus:border-blue-200 border border-transparent"
                            }`}
                            aria-label={`Translate to ${language.name} (${language.native})`}
                            role="option"
                            aria-selected={selectedLanguage === language}
                          >
                            <div className="flex flex-col items-start min-w-0 flex-1">
                              <div className="flex items-center w-full">
                                <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                                  {language.name}
                                </span>
                                <Badge variant="outline" className="ml-2 text-xs shrink-0">
                                  {language.code.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="flex items-center text-xs text-gray-500 w-full">
                                <span className="truncate">{language.native}</span>
                                <span className="mx-1">•</span>
                                <span className="shrink-0">{language.region}</span>
                              </div>
                            </div>
                            <AnimatePresence>
                              {selectedLanguage === language && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                >
                                  <Check className="h-4 w-4 text-blue-600 shrink-0" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        ))
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-col items-center justify-center py-8 text-gray-500"
                        >
                          <Search className="h-8 w-8 mb-2 opacity-50" />
                          <p className="text-sm">No languages found</p>
                          <p className="text-xs">Try a different search term</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </motion.div>
            </DropdownMenuContent>
          )}
        </AnimatePresence>
      </DropdownMenu>
    </motion.div>
    )
}