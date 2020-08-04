const skt = require('./socket');
const find = require('find-process');
const path = require('path');
const soFetch = require('./lib/soFetch.js');

startGame = (req, res) => {
  try {
    backgroundProcess(req, res);
  } catch (error) {
    res.status(200).json({ 'solicitouAberturaDoJogo': false });
  }
}

backgroundProcess = (req, res) => {
  // console.log(req);

  res.status(200).json({ 'solicitouAberturaDoJogo': true });

  // setTimeout(function () {
  //   var serverID = 2;
  //   var serverName = "S2";
  //   skt.socket.emit('private', { to: 1, userid: serverID, username: serverName });

  // }, 5000)

  const process = require('child_process');   // The power of Node.JS
  const cmd = 'ga-server-event-driven.exe ';
  const dir = 'D:/dev/fontes/gaw/bin.win32'; //path.join(__dirname, 'D:\dev\fontes\gaw\bin.win32');
  //const config = 'config/server.d3dex2.conf';
  const config = 'config/gta_sa.conf';

  console.log(dir + '/' + cmd + ' ' + config);

  var child = process.spawn(cmd, [config], { cwd: dir, shell: true, env: process.env });

  child.on('error', function (err) {
    console.log('child.on(error): <' + err + '>');
  });

  child.stdout.on('data', function (data) {
    console.log('child.stdout.on(data): <' + data);
  });

  child.stderr.on('data', function (data) {
    if (data && data.length > 0) {
      var lines = data;
      var lines = data.toString().split('\n');
      lines.forEach(function (line) {
        if (line.length > 0 && line.indexOf("launch success, pid=") > -1) {
          let pid = line.slice(20);
          setTimeout(function () {
            console.log(req.body);
            console.log(parseInt(pid));

            find('pid', parseInt(pid)).then(function (process) {
              if (process && process.length > 0) {


                let obj = { id_servidor_game_play: req.body.id_servidor_game_play, ds_pid_process: process[0].pid, ds_ppid_process: process[0].ppid, ds_process_name: process[0].name }
                soFetch.post('/setProcessToGamePlay', obj).then(res => {
                  skt.socket.emit('private', { to: req.body.id_user, userid: req.body.id_servidor_hash, username: req.body.id_servidor, servidor: req.body });
                });
              }
              console.log(process);
            }, function (err) {
              console.log(err.stack || err);
            })
          }, 10000);
        }
      });
    }
  });

  child.on('close', function (code) {
    if (code == 0)
      console.log('child process complete.');
    else
      console.log('child process exited with code ' + code);
  });
}


module.exports = {
  backgroundProcess,
  startGame,
};
