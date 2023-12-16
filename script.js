let bibleData; // Variable to hold the Bible data

async function loadBibleData() {
    try {
        const response = await fetch('bible/json/ko_ko.json');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        bibleData = await response.json();
        console.log('Bible data loaded:', bibleData);
    } catch (error) {
        console.error('Error fetching Bible data:', error);
    }
}

function displayRandomPhrase() {
    if (!bibleData) {
        console.error('Bible data not loaded');
        return;
    }

    const randomBookIndex = Math.floor(Math.random() * bibleData.length);
    const randomChapterIndex = Math.floor(Math.random() * bibleData[randomBookIndex].chapters.length);
    const randomVerseIndex = Math.floor(Math.random() * bibleData[randomBookIndex].chapters[randomChapterIndex].length);
    const randomVerse = bibleData[randomBookIndex].chapters[randomChapterIndex][randomVerseIndex];

    const bookName = bibleData[randomBookIndex].name;
    const verseDisplay = document.getElementById("phraseDisplay");
    verseDisplay.textContent = `${bookName} ${randomChapterIndex + 1}:${randomVerseIndex + 1} - ${randomVerse}`;
}

const phraseBtn = document.getElementById("phraseBtn");
phraseBtn.addEventListener("click", displayRandomPhrase);

// Call the function to load the Bible data when the page loads
loadBibleData();
