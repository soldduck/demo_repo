import * as ApiConstants from './apiConstants';

const removePreOrder = async (bookId, token) => {
    let request = {
      docid: bookId
    }
    let response;
    await fetch((ApiConstants.BASE_API_URL + '/Biblio/RemovePreorder'), {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
              'content-type': 'application/json',
              'authorization' : 'bearer ' + token
            }
        })
        .then(data => data.json())
        .then(resp => response = resp);
    return response;
  }

  export default removePreOrder;