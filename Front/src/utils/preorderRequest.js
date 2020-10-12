import * as ApiConstants from './apiConstants';

const preOrder = async (bookId, bookPointId, token) => {
    let request = {
      docid: bookId,
      bookpointid: bookPointId
    }
    let response;
    await fetch((ApiConstants.BASE_API_URL + '/Biblio/Preorder'), {
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

  export default preOrder;