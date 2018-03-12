
const readline = require('readline');
const {log, biglog,errorlog,colorize} = require("./out");
const cmds = require("./cmds");

//mensaje inicial

biglog('CORE QUIZ', 'green');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: colorize("quiz > " , 'blue'), 
  completer: (line) => {
    const completions = 'help h list show add delete edit test p play credits q hquit'.split(' ');
    const hits = completions.filter((c) => c.startsWith(line));
    // show all completions if none found
    return [hits.length ? hits : completions, line];
  }
});

rl.prompt();

rl.on('line', (line) => {

  let args = line.split(" ");
  let cmd = args[0].toLowerCase().trim();

  switch (cmd) {
    case ' ':
        rl.prompt();
        break;

    case 'h':
    case 'help':
        cmds.helpcmd(rl);
        break;

    case 'quit':
    case 'q' :
        cmds.quitcmd(rl);
        break;

    case 'add':
        cmds.addcmd(rl);
        break;

    case 'list':
        cmds.listcmd(rl);
        break;  

    case 'show':
        cmds.showcmd(rl,args[1]); 
        break;

    case 'test':
        cmds.testcmd(rl,args[1]);
        break;

    case'p':
    case 'play':
        cmds.playcmd(rl);
        break;

    case'delete':
        cmds.deletecmd(rl,args[1]);
        break;

    case 'edit':
        cmds.editcmd(rl,args[1]);
        break;

    case 'credits':
        cmds.creditscmd(rl);
        break;

    default:
        log(`comando desconocido '${colorize(cmd,'red')}'`);
        log(`Use ${colorize('help','green')} para ayudar usar help`);
        rl.prompt();
        break;
  }

}).on('close', () => {
  log(' BYE!', 'yellow');
  process.exit(0);
});









