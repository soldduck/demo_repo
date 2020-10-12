import * as ApiConstants from './apiConstants';

const getUserBooks = async (i, token) => {
    let books;
    await fetch((ApiConstants.BASE_API_URL + '/Biblio/ClientBooks/'+i), {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            'authorization' : 'bearer ' + token
          }
      })
      .then(resp => resp.json())
      .then(response => books = response)
      .catch(err => console.log(err));
    console.log('from getUserBooks: ');
    console.log(books);
    return books;
}

export default getUserBooks;