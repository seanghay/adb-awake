const { exec } = require('child_process');

function enableSettings(isEnabled = true) {
  const value = isEnabled ? 2 : 0;
  const ls = exec(`adb shell settings put global stay_on_while_plugged_in ${value}`, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      return;
    }
  
    if (stderr) {
      console.log(stderr);
    }
    console.log(stdout);
    console.log('done')
  });
  
  ls.on('exit', code => {
    if (code !== 0) {
      console.log('exit code: ' + code);
    }
  });
}

const status = process.argv[2] && process.argv[2].toLowerCase();

if (status === 'on') {
  enableSettings(true);
  return;
}

if (status === 'off') {
  enableSettings(false);
  return;
}

console.error(
  'Invalid status! It can only be "on" or "off". For example, `awake on`',
)

process.exit(1);

