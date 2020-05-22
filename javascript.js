$(document).ready(function(){
    let inputSubmit = $('#input')
    let searchInput = $('#search')
    inputSubmit.click(function(){
        $('.div_results').empty()
        let str = searchInput.val();
        console.log(searchInput);
        if (str !== ''){
            searchInput[0].value = '';
            newReq(str)
        }else {
            alert('field is required')
        }
    })
    searchInput.keyup(function(e){
        if(e.keyCode === 13){
            $('.div_results').empty()
            let str = searchInput.val();
            if (str !== ''){
                searchInput[0].value = '';
                newReq(str)
            }else {
                alert('field is required')
            }
        }
    })

})
function newReq(str){
    let api_key = 'LIVDSRZULELA'
    let url = 'https://api.tenor.com/v1/search?q='+str+'&key='+api_key+'&limit=8';
    let http = new XMLHttpRequest();
    http.open('GET', url);
    http.responseType = 'json'
    http.send();
    http.onreadystatechange = function() {
        if (http.readyState === 4 && http.status === 200) {
            let resultsLength = http.response.results.length
            if(resultsLength > 0){
                getDataFromAPI(http.response.results)
            } else {
                let div_results = $('.div_results');
                let text = $(document.createElement('p'))
                let errorMsg = 'No data from the API'
                text[0].innerHTML = errorMsg
                text.appendTo(div_results)
            }
        }
    };
}
function getDataFromAPI(data){
    data.forEach(function(val) {
        let imageSrc = val.media[0].gif.url
        let div_results = $('.div_results');
        let image = $(document.createElement('img'))
        image.attr('src', imageSrc)
        image.appendTo(div_results)
        $('img').width('25%');
    });
}
