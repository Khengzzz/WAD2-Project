const searchBtn = document.getElementById('searchBtn');
const searchBox = document.getElementById('searchBox');



searchBtn.addEventListener('click', function() {
    if (searchBox.style.display === 'none' || searchBox.style.display === '') {
        searchBox.style.display = 'flex';
    } else {
        searchBox.style.display = 'none';
    }
});

document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let searchText = document.getElementById('searchInput').value;
        // Perform your search action here 
        // to do: clear search when enter key is pressed 
    }
});

