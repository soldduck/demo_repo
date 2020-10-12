import * as ApiConstants from './apiConstants';

const search = async (request, token) => {
    let parsedBooks = [];
    await fetch((ApiConstants.BASE_API_URL + '/Biblio/Search'), {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
              'content-type': 'application/json',
              'authorization' : 'bearer ' + token
            }
        })
        .then(resp => resp.json())
        .then(response => {
          console.log(response);
          let keys = Object.keys(response);
          for (let i = 0; i < keys.length; i++) {
            parsedBooks.push({
              header : keys[i],
              //Пора пересмотреть API.
              bookData : response[keys[i]] ?? null
            });
          }
        });
    return parsedBooks;
}

export default search;