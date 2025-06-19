# overflow
Vulnerability scanning using graphs!

## How to use
Install this tool using NPM:
```bash
npm i overflow-scanner -g
```
Then, you can simply run it with
```bash
overflow-scanner
```
and visit http://localhost:2003. That is the web interface.

On the top, you can edit the scanner graph - double click to create new nodes (**only use nodes named `overflow/*`**, other types of nodes are **not compatible**), drag and drop to create connections.

On the bottom, there are controls and logs.

## Supported integrations
- [Metasploit](https://www.metasploit.com)
- [nmap](https://nmap.org)
- [crt.sh](https://crt.sh)