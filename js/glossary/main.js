window.addEventListener("load", () => {
    displayControls();
    displayWordList({ "data": { "index": 0 } });
});

var currentIndex = 0;
var currentPageSize = 20;

function displayControls() {
    var indexList = DataService.getAlphabetIndexList()
    var lettersDiv = $("#letters")
    $('#page-size')[0].value = "20"

    for (const letter of Object.keys(indexList.letters).sort()) {
        var letterA = $("<a/>")
            .text(letter.toUpperCase())
            .attr('href', "#body")
            .click({ "index": indexList.letters[letter] }, displayWordList)
        lettersDiv.append(letterA)
    }
}

function displayWordList(event) {
    var index = event.data.index
    currentIndex = index
    changeArrows(index, currentPageSize)
    var page = DataService.getWordListPage(index, currentPageSize)
    var wordList = $('#wordlist').empty()
    for (const word of page) {
        var wordHTML = HTMLTemplateService.getWordHTML(word)
        wordList.append(wordHTML)
    }
}

function changePageSize() {
    var pageSizeVal = $('#page-size')[0].value
    var wordCount = DataService.getAlphabetIndexList().total
    if (pageSizeVal === 'All') {
        currentPageSize = wordCount
        currentIndex = 0
    } else {
        currentPageSize = parseInt(pageSizeVal)
        if (currentIndex + currentPageSize > wordCount) {
            currentIndex = wordCount - currentPageSize
        }
    }

    displayWordList({ "data": { "index": currentIndex } })
}

function changeArrows(newIndex, pageSize) {

    indexList = DataService.getAlphabetIndexList()
    wordCount = indexList.total
    lastPageIndex = wordCount - pageSize < 0 ? 0 : wordCount - pageSize
    prevPageIndex = newIndex - pageSize < 0 ? 0 : newIndex - pageSize
    nextPageIndex = newIndex + pageSize > lastPageIndex ? lastPageIndex : newIndex + pageSize

    prevLetterIndex = 0
    checkLetterIndex = 0
    nextLetterIndex = 0
    for (const [letter, index] of Object.entries(indexList.letters)) {
        nextLetterIndex = index;
        if (newIndex >= prevLetterIndex && newIndex < nextLetterIndex) {
            break
        }
        prevLetterIndex = checkLetterIndex
        checkLetterIndex = index
    }

    $("#arrow-start").attr("href", "#body").unbind("click").click({ "index": 0 }, displayWordList)
    $("#arrow-prev-page").attr("href", "#body").unbind("click").click({ "index": prevPageIndex }, displayWordList)
    $("#arrow-prev-letter").attr("href", "#body").unbind("click").click({ "index": prevLetterIndex }, displayWordList)

    $("#arrow-end").attr("href", "#body").unbind("click").click({ "index": lastPageIndex }, displayWordList)
    $("#arrow-next-page").attr("href", "#body").unbind("click").click({ "index": nextPageIndex }, displayWordList)
    $("#arrow-next-letter").attr("href", "#body").unbind("click").click({ "index": nextLetterIndex }, displayWordList)

}