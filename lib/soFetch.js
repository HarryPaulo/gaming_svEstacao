const enderecoRest = process.env.NODE_ENV.trim() === 'development' ? 'http://localhost:3003' : 'https://gamerx.com.br';
const enderecoSocket = process.env.NODE_ENV.trim() === 'development' ? 'ws://localhost:3003' : 'wss://gamerx.com.br';
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;

getUrlRest = () => {
  return enderecoRest;
}

getUrlSocket = () => {
  return enderecoSocket;
}

get = (path) => {
  const url = getUrlRest() + path;
//  const url = 'https://api.coinmarketcap.com/v2/ticker/1/'; url de teste

  const requestInfo = {
    method: 'GET',
    //body: JSON.stringify(req.body),
    headers: {
        "Content-type": "application/json",
        // "Authorization": "Bearer"
    }
  };

  return fetch(url, requestInfo).then(res => {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 401) {
      // tratar essa situação 
    } else {
      throw new Error('Não foi possível completar a operação');
    }
  }).catch(e => {
    console.error(e.stack);
    reject(e.stack);
    client.end();
  })
  // .then(json => {
  //     console.log(json);
  //     res2.status(200).json(json);
  // });
}

post = (path, dados) => {
  const url = getUrlRest() + path;

  const requestInfo = {
    method: 'POST',
    body: JSON.stringify(dados),
    headers: {  
        "Content-type": "application/json",
        // "Authorization": "Bearer"
    }
  };

  return fetch(url, requestInfo).then(res => {
    if (res.ok) {
      return res.json();
    }

    if (res.status === 401) {
      // tratar essa situação 
    } else {
      throw new Error('Não foi possível completar a operação');
    }
  }).catch(e => {
    console.error(e.stack);
    reject(e.stack);
    client.end();
  })
}

// postFile = (path, fileName, file) => {
//   const url = soFetch.getUrlRest() + path;

//   const requestInfo = {
//     method: 'POST',
//     body: file,
//     headers: new Headers({
//       "Authorization": 'Bearer',
//       "Content-Disposition": 'attachment;filename=' + fileName
//     })
//   };

//   return fetch(url, requestInfo)
//     .then(res => {
//       if (res.ok) {
//         return res.json();
//       }

//       if (res.status === 401) {
//         // deve voltar para o login
//       } else {
//         throw new Error('Não foi possível completar a operação');
//       }
//     }).catch(e => {
//       console.error(e.stack);
//       reject(e.stack);
//       client.end();
//     })
// }

module.exports = {
  getUrlRest, 
  getUrlSocket, 
  get, 
  post, 
  // postFile
};