window.addEventListener("load", () => {
    DataService.load();
});

DataService = (function() {
    var wordList
    var indexListCache

    function getAlphabetIndexList() {
        if (!indexListCache) {
            count = wordList.length
            letters = wordList.reduce(function(indexList, currentValue, index) {
                firstLetter = currentValue.word[0];
                if (!indexList[firstLetter]) {
                    indexList[firstLetter] = index;
                }
                return indexList;
            }, {})
            indexListCache = {
                "total": count,
                "letters": letters
            }
        }

        return indexListCache
    }

    function getWordListPage(startIndex, pageSize) {
        return wordList.slice(startIndex, startIndex + pageSize)
    }

    function load() {
        wordList = Object.entries(rawWordList).map(function(w) {
            [word, def] = w;
            def['word'] = word[0].toLowerCase() + word.slice(1)
            return def;
        }).sort(function(a, b) {
            return a.word.toLowerCase() > b.word.toLowerCase()
        })
    }

    return {
        getAlphabetIndexList: getAlphabetIndexList,
        getWordListPage: getWordListPage,
        load: load
    };
})();