const skt = require('./socket');
const path = require('path');


startGame = (req, res) => {
  // console.log('entrou');
  // console.log(req.body)
  try {
    backgroundProcess(req, res);
  } catch (error) {
    res.status(200).json({ 'abriuJogo': true });
  }
}

backgroundProcess = (req, res) => {
  console.log('backgroundProcess');

  res.status(200).json({ 'abriuJogo': true });
  setTimeout(function () {
    var serverID = 2;
    var serverName = "S2";  
    skt.socket.emit('private', { to: 1, userid: serverID, username: serverName });
  }, 5000)

  // const process = require('child_process');   // The power of Node.JS
  // const cmd = 'ga-server-event-driven.exe ';
  // const dir = path.join(__dirname, '/bin');
  // const config = 'config/server.assaultcube.win32.conf';
  // console.log(dir + '/' + cmd + ' ' + config);

  // var child = process.spawn(cmd, [config], { cwd: dir, shell: true, env: process.env });
  // child.on('error', function (err) {
  //   console.log('child.on(error): <' + err + '>');
  // });

  // child.stdout.on('data', function (data) {
  //   console.log('child.stdout.on(data): <' + data);
  // });

  // child.stderr.on('data', function (data) {
  //   if (data) {
  //     console.log('stderr: <' + data + '>');
  //     var str = data;
  //     if (str.length > 0 && str.indexOf("video encoder: initialized") > -1) {
  //       res.status(200).json({ 'abriuJogo': true });
  //     }
  //   }
  // });

  // child.on('close', function (code) {
  //   if (code == 0)
  //     console.log('child process complete.');
  //   else
  //     console.log('child process exited with code ' + code);
  // });
}


module.exports = {
  backgroundProcess,
  startGame,
};
