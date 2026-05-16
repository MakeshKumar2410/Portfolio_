export const ALL_CMDS = [
  'help','whoami','about','skills','projects','certifications','resume','contact','internship',
  'education','achievements','social','tools','hack','neofetch','motd','id','hostname','uptime',
  'w','who','env','export','man','ls','cd','pwd','cat','head','tail','grep','find','touch','mkdir',
  'clear','history','banner','version','uname','date','ifconfig','ip','ping','traceroute','nmap',
  'curl','ssh','ps','top','df','free','last','finger','sudo','echo','python','python3','exit',
]

export const FUZZY = [
  { keys: ['tell me about','who are you','about yourself','background','bio','introduce'], cmd: 'about' },
  { keys: ['education','degree','mca','college','cgpa','study'], cmd: 'education' },
  { keys: ['internship','work experience','hackover','job'], cmd: 'internship' },
  { keys: ['show skill','my skill','expertise','proficiency','skill set'], cmd: 'skills' },
  { keys: ['show project','my project','esp','bluetooth','wifi','campus'], cmd: 'projects' },
  { keys: ['certif','credential','ccna','cyber tech'], cmd: 'certifications' },
  { keys: ['achievement','ctf','picoctf','competition','seminar'], cmd: 'achievements' },
  { keys: ['resume','cv','download'], cmd: 'resume' },
  { keys: ['contact','reach','email','linkedin','github','get in touch'], cmd: 'contact' },
  { keys: ['social','links'], cmd: 'social' },
  { keys: ['tool','arsenal','software','hardware'], cmd: 'tools' },
  { keys: ['hello','hi ','hey ','howdy'], cmd: 'whoami' },
  { keys: ['system info','specs','neofetch'], cmd: 'neofetch' },
]

export const VFS = {
  '/': { type: 'dir', children: ['home', 'etc', 'var', 'usr'] },
  '/home': { type: 'dir', children: ['makesh'] },
  '/home/makesh': { type: 'dir', children: ['portfolio', 'docs', '.bashrc', '.profile', '.ssh'] },
  '/home/makesh/portfolio': { type: 'dir', children: ['about', 'skills', 'projects', 'certifications', 'internship', 'resume', 'contact', 'README.md', 'MAKESH_KUMAR_RESUME.pdf'] },
  '/home/makesh/docs': { type: 'dir', children: ['education.txt', 'achievements.txt', 'tools.txt'] },
  '/home/makesh/.bashrc': { type: 'file', content: 'export PS1="\\u@\\h:\\w\\$ "\nalias ll="ls -la"\nalias nmap-scan="nmap -sV localhost"' },
  '/home/makesh/.profile': { type: 'file', content: '# Makesh Kumar — cybersecurity portfolio profile\nexport EDITOR=nano\nexport LANG=en_US.UTF-8' },
  '/home/makesh/.ssh': { type: 'dir', children: ['known_hosts', 'id_rsa.pub'] },
  '/home/makesh/.ssh/known_hosts': { type: 'file', content: 'github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI...' },
  '/home/makesh/.ssh/id_rsa.pub': { type: 'file', content: 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG... makesh@kali-portfolio' },
  '/home/makesh/portfolio/README.md': { type: 'file', content: '# Makesh Kumar — Cybersecurity Portfolio\n\nMCA student | Penetration Testing | Network Security | CTF\n\nType `help` for interactive commands.\nEmail: makeshmk2004@gmail.com' },
  '/home/makesh/portfolio/MAKESH_KUMAR_RESUME.pdf': { type: 'file', content: '[PDF] Resume — use `resume` command or download from Resume section.' },
  '/home/makesh/docs/education.txt': { type: 'file', content: 'MCA @ Hindusthan College (CGPA 8.5)\nB.Sc DCFS @ Nehru Arts (CGPA 8.0)' },
  '/home/makesh/docs/achievements.txt': { type: 'file', content: 'picoCTF | CTF @ Selfmade Ninja | Debugging Competition | Cyber Attack Seminar' },
  '/home/makesh/docs/tools.txt': { type: 'file', content: 'Kali · Nmap · Metasploit · Wireshark · ESP8266/32 · Python · Cisco PT' },
  '/etc': { type: 'dir', children: ['hostname', 'motd', 'passwd', 'os-release'] },
  '/etc/hostname': { type: 'file', content: 'kali' },
  '/etc/motd': { type: 'file', content: 'Welcome to Makesh Kumar Portfolio Terminal — Kali GNU/Linux' },
  '/etc/passwd': { type: 'file', content: 'root:x:0:0:root:/root:/bin/bash\nmakesh:x:1000:1000:Makesh Kumar:/home/makesh:/bin/bash' },
  '/etc/os-release': { type: 'file', content: 'PRETTY_NAME="Kali GNU/Linux Rolling"\nNAME="Kali GNU/Linux"\nID=kali' },
  '/var': { type: 'dir', children: ['log'] },
  '/var/log': { type: 'dir', children: ['auth.log', 'syslog'] },
  '/var/log/auth.log': { type: 'file', content: 'Mar 16 10:00:01 kali sshd[1204]: Accepted publickey for makesh\nMar 16 10:00:02 kali sudo: makesh : TTY=pts/0 ; PWD=/home/makesh ; USER=root ; COMMAND=/usr/bin/nmap' },
  '/var/log/syslog': { type: 'file', content: 'Mar 16 10:00:00 kali kernel: portfolio-terminal: modules loaded\nMar 16 10:00:01 kali systemd: Started Portfolio Shell.' },
  '/usr': { type: 'dir', children: ['bin'] },
  '/usr/bin': { type: 'dir', children: ['nmap', 'python3', 'curl'] },
}

export const MAN_PAGES = {
  help: 'help — list all portfolio and system commands',
  whoami: 'whoami — print effective user identity and profile',
  about: 'about — full background, education, internships',
  skills: 'skills — technical skills with proficiency bars',
  projects: 'projects — list all portfolio projects',
  ls: 'ls [path] [-la] — list directory contents',
  cd: 'cd [path] — change working directory',
  cat: 'cat <file> — display file contents',
  nmap: 'nmap — simulated port scan on localhost',
  neofetch: 'neofetch — system info with ASCII art',
  clear: 'clear — clear the terminal screen',
  exit: 'exit — close terminal session (simulated)',
}

export function resolvePath(cwd, target) {
  let path = target || cwd
  if (!path.startsWith('/')) {
    path = cwd === '/' ? `/${target}` : `${cwd}/${target}`
  }
  const parts = path.split('/').filter(Boolean)
  const resolved = []
  for (const p of parts) {
    if (p === '..') resolved.pop()
    else if (p !== '.') resolved.push(p)
  }
  return '/' + resolved.join('/') || '/'
}

export function listDir(absPath) {
  const node = VFS[absPath]
  if (!node) return null
  if (node.type !== 'dir') return 'notadir'
  return node.children || []
}

export function readFile(absPath) {
  const node = VFS[absPath]
  if (!node) return null
  if (node.type !== 'file') return 'isdir'
  return node.content
}

export function buildCommands(ctx) {
  const { blank, raw, txt, hdr, row, bar, scroll, getCwd, setCwd } = ctx
  const bootTime = Date.now() - 3600000 * 4

  const cmds = {
    help() {
      hdr('━━  MAKESH KUMAR PORTFOLIO — COMMANDS  ━━'); blank()
      raw('<span class="to-y to-bold">PORTFOLIO</span>')
      row('whoami, about, education, internship', 'Profile & background')
      row('skills, projects, certifications', 'Technical showcase')
      row('achievements, resume, contact, social', 'Credentials & reach')
      row('tools, hack, neofetch', 'Extras & demos'); blank()
      raw('<span class="to-b to-bold">UNIX-LIKE</span>')
      row('ls, cd, pwd, cat, head, tail, grep', 'Filesystem navigation')
      row('id, hostname, uptime, w, who, env', 'System information')
      row('ps, top, df, free, last, finger', 'Process & resources')
      row('ifconfig, ip, ping, nmap, curl, ssh', 'Networking')
      row('uname, date, man, history, clear', 'Utilities'); blank()
      raw('<span class="to-d">↑↓ history · Tab complete · Ctrl+L clear · cd .. to go up</span>'); blank()
    },
    whoami() {
      blank(); raw('<span class="to-g to-bold">makesh_kumar</span>'); blank()
      row('Name', 'Makesh Kumar')
      row('UID/GID', '1000 / 1000')
      row('Degree', "Master's of Computer Application (MCA)")
      row('College', 'Hindusthan College of Arts and Science, Coimbatore')
      row('CGPA', '8.5 / 10.0')
      row('Focus', 'Penetration Testing · Network Security · IoT · CTF')
      row('Status', '<span class="to-g">● AVAILABLE</span> — entry-level cybersecurity roles')
      row('Home', getCwd()); blank()
    },
    id() {
      blank()
      txt('uid=1000(makesh) gid=1000(makesh) groups=1000(makesh),27(sudo),999(kali-linux)')
      blank()
    },
    hostname() { blank(); txt('kali'); blank() },
    uptime() {
      const s = Math.floor((Date.now() - bootTime) / 1000)
      const h = Math.floor(s / 3600)
      const m = Math.floor((s % 3600) / 60)
      blank()
      txt(` ${new Date().toLocaleTimeString()} up ${h}:${String(m).padStart(2, '0')},  1 user,  load average: 0.12, 0.08, 0.05`)
      blank()
    },
    w() {
      blank()
      raw('<span class="to-d">USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT</span>')
      raw('<span class="to-g">makesh   pts/0    192.168.1.42     09:14    0.00s  0.12s  0.08s portfolio-shell</span>')
      blank()
    },
    who() { blank(); txt('makesh   pts/0        2026-03-16 09:14 (192.168.1.42)'); blank() },
    env() {
      blank()
      const vars = [
        `USER=makesh`, `HOME=/home/makesh`, `PWD=${getCwd()}`, `SHELL=/bin/bash`,
        `HOSTNAME=kali`, `LANG=en_US.UTF-8`, `TERM=xterm-256color`,
        `PORTFOLIO_EMAIL=makeshmk2004@gmail.com`, `EDITOR=nano`,
      ]
      vars.forEach(v => txt(v)); blank()
    },
    export() {
      blank(); txt('declare -x USER=makesh HOME=/home/makesh PWD=' + getCwd()); blank()
    },
    motd() {
      blank()
      txt('╔══════════════════════════════════════════════════════╗')
      txt('║  Kali GNU/Linux — Makesh Kumar Portfolio Terminal   ║')
      txt('║  Type `help` · `neofetch` · `whoami` to get started ║')
      txt('╚══════════════════════════════════════════════════════╝')
      blank()
    },
    neofetch() {
      blank()
      raw('<span class="to-g">        ./+o+-       </span><span class="to-bold">makesh@kali</span>')
      raw('<span class="to-g">   yyyyy- -yyyyyy+   </span><span class="to-d">────────────────</span>')
      raw('<span class="to-g">://+//////-yyyyyyo  </span><span class="to-y">OS:</span> Kali GNU/Linux Rolling')
      raw('<span class="to-g">      .://+//////-  </span><span class="to-y">Host:</span> portfolio-terminal')
      raw('<span class="to-g">  yyyyyyy+  </span><span class="to-y">Kernel:</span> 6.1.0-kali9-amd64')
      raw('<span class="to-g"> //+//////  </span><span class="to-y">Uptime:</span> ' + Math.floor((Date.now() - bootTime) / 3600000) + ' hrs')
      raw('<span class="to-g">//////    </span><span class="to-y">Shell:</span> bash 5.2.21')
      raw('<span class="to-g">-/+oooooo+/  </span><span class="to-y">DE:</span> Portfolio UI')
      raw('<span class="to-g">       </span><span class="to-y">User:</span> Makesh Kumar')
      raw('<span class="to-g">       </span><span class="to-y">Degree:</span> MCA (Cybersecurity)')
      raw('<span class="to-g">       </span><span class="to-y">Email:</span> makeshmk2004@gmail.com')
      blank()
    },
    man(args) {
      const topic = (args[0] || 'help').toLowerCase()
      blank()
      if (MAN_PAGES[topic]) {
        txt(`NAME\n    ${topic}`)
        txt(`\nDESCRIPTION\n    ${MAN_PAGES[topic]}`)
      } else {
        raw(`<span class="to-r">No manual entry for ${topic}</span>`)
        raw('<span class="to-d">Try: man help, man ls, man whoami, man nmap</span>')
      }
      blank()
    },
    ls(args) {
      const flags = args.filter(a => a.startsWith('-')).join('')
      const pathArg = args.find(a => !a.startsWith('-')) || '.'
      const target = pathArg === '.' ? getCwd() : resolvePath(getCwd(), pathArg)
      const items = listDir(target)
      blank()
      if (items === null) { raw(`<span class="to-r">ls: cannot access '${pathArg}': No such file or directory</span>`); blank(); return }
      if (items === 'notadir') { raw(`<span class="to-r">ls: ${pathArg}: Not a directory</span>`); blank(); return }
      if (flags.includes('l')) {
        raw('<span class="to-d">total ' + items.length + '</span>')
        items.forEach(name => {
          const full = target === '/' ? `/${name}` : `${target}/${name}`
          const node = VFS[full]
          const isDir = node?.type === 'dir'
          const perm = isDir ? 'drwxr-xr-x' : '-rw-r--r--'
          const color = isDir ? 'to-b' : (name.endsWith('.md') ? 'to-g' : name.endsWith('.pdf') ? 'to-y' : 'to-d')
          raw(`<span class="to-d">${perm}  1 makesh makesh  4096 Mar 16 10:00</span> <span class="${color}">${name}${isDir ? '/' : ''}</span>`)
        })
      } else {
        const colored = items.map(name => {
          const full = target === '/' ? `/${name}` : `${target}/${name}`
          const isDir = VFS[full]?.type === 'dir'
          const cls = isDir ? 'to-b' : name.endsWith('.md') ? 'to-g' : name.endsWith('.pdf') ? 'to-y' : 'to-d'
          return `<span class="${cls}">${name}${isDir ? '/' : ''}</span>`
        })
        raw(colored.join('  '))
      }
      blank()
    },
    cd(args) {
      const target = args[0] || '/home/makesh'
      const next = resolvePath(getCwd(), target)
      if (!VFS[next]) {
        blank(); raw(`<span class="to-r">bash: cd: ${target}: No such file or directory</span>`); blank()
        return
      }
      if (VFS[next].type !== 'dir') {
        blank(); raw(`<span class="to-r">bash: cd: ${target}: Not a directory</span>`); blank()
        return
      }
      setCwd(next)
    },
    pwd() { blank(); txt(getCwd()); blank() },
    cat(args) {
      const name = (args[0] || '').toLowerCase()
      if (!name) { blank(); raw('<span class="to-r">cat: missing operand</span>'); blank(); return }
      if (name.includes('resume')) { cmds.resume(); return }
      if (name.includes('contact')) { cmds.contact(); return }
      if (name.includes('about')) { cmds.about(); return }
      const full = resolvePath(getCwd(), args[0])
      const content = readFile(full)
      blank()
      if (content === null) raw(`<span class="to-r">cat: ${args[0]}: No such file or directory</span>`)
      else if (content === 'isdir') raw(`<span class="to-r">cat: ${args[0]}: Is a directory</span>`)
      else content.split('\n').forEach(line => txt(line))
      blank()
    },
    head(args) {
      const file = args[0] || 'README.md'
      const content = readFile(resolvePath(getCwd(), file))
      blank()
      if (!content || content === 'isdir') { raw('<span class="to-r">head: cannot open file</span>'); blank(); return }
      content.split('\n').slice(0, 5).forEach(l => txt(l)); blank()
    },
    tail(args) {
      const content = readFile(resolvePath(getCwd(), args[0] || 'README.md'))
      blank()
      if (!content || content === 'isdir') { raw('<span class="to-r">tail: cannot open file</span>'); blank(); return }
      content.split('\n').slice(-5).forEach(l => txt(l)); blank()
    },
    grep(args) {
      const needle = args[0]
      if (!needle) { blank(); raw('<span class="to-r">grep: missing pattern</span>'); blank(); return }
      blank()
      Object.entries(VFS).forEach(([p, n]) => {
        if (n.type === 'file' && n.content?.toLowerCase().includes(needle.toLowerCase())) {
          raw(`<span class="to-g">${p}:</span> <span class="to-d">${n.content.split('\n')[0].slice(0, 60)}...</span>`)
        }
      })
      blank()
    },
    find(args) {
      const pattern = args[0] || ''
      blank()
      Object.keys(VFS).filter(p => !pattern || p.includes(pattern)).slice(0, 12).forEach(p => txt(p))
      blank()
    },
    ps() {
      blank()
      raw('<span class="to-d">  PID TTY          TIME CMD</span>')
      raw('<span class="to-g"> 1420 pts/0    00:00:01 bash</span>')
      raw('<span class="to-g"> 2847 pts/0    00:00:00 portfolio-shell</span>')
      raw('<span class="to-d"> 2901 pts/0    00:00:00 ps</span>')
      blank()
    },
    top() {
      blank()
      txt('top - portfolio-shell (1 task)')
      row('CPU', '4.2% user · 1.1% system')
      row('Mem', '2.1G used / 8.0G total')
      row('Active', 'portfolio-shell, particle-canvas, ai-chat')
      blank()
    },
    df() {
      blank()
      raw('<span class="to-d">Filesystem      Size  Used Avail Use% Mounted on</span>')
      raw('<span class="to-g">/dev/sda1        48G   12G   34G  26% /</span>')
      raw('<span class="to-g">tmpfs           4.0G  1.2M  4.0G   1% /tmp</span>')
      blank()
    },
    free() {
      blank()
      txt('              total        used        free')
      txt('Mem:           8.0Gi       2.1Gi       5.2Gi')
      txt('Swap:          2.0Gi          0B       2.0Gi')
      blank()
    },
    last() {
      blank()
      txt('makesh   pts/0    192.168.1.42   Sat Mar 16 09:14   still logged in')
      txt('makesh   pts/0    192.168.1.42   Fri Mar 15 22:30 - 23:48  (01:18)')
      blank()
    },
    finger() {
      blank()
      row('Login', 'makesh')
      row('Name', 'Makesh Kumar')
      row('Mail', 'makeshmk2004@gmail.com')
      row('Office', 'Hindusthan College, Coimbatore')
      row('Plan', 'Cybersecurity portfolio · seeking opportunities')
      blank()
    },
    ping(args) {
      const host = args[0] || 'localhost'
      blank()
      txt(`PING ${host} (127.0.0.1) 56(84) bytes of data.`)
      for (let i = 1; i <= 4; i++) txt(`64 bytes from ${host}: icmp_seq=${i} ttl=64 time=0.0${40 + i * 8} ms`)
      txt(`--- ${host} ping statistics ---`)
      txt('4 packets transmitted, 4 received, 0% packet loss')
      blank()
    },
    traceroute(args) {
      const host = args[0] || 'google.com'
      blank()
      txt(`traceroute to ${host} (142.250.185.78), 30 hops max`)
      txt(' 1  192.168.1.1 (192.168.1.1)  1.234 ms')
      txt(' 2  10.0.0.1 (10.0.0.1)  8.456 ms')
      txt(' 3  * * *')
      txt(' 4  destination reached')
      blank()
    },
    curl(args) {
      const url = args[0] || 'https://github.com/MakeshKumar2410'
      blank()
      raw(`<span class="to-d">HTTP/2 200 OK — fetching ${url}</span>`)
      txt('{ "user": "MakeshKumar2410", "bio": "Cybersecurity enthusiast", "repos": "portfolio-projects" }')
      blank()
    },
    ssh(args) {
      const host = args[0] || 'github.com'
      blank()
      raw(`<span class="to-y">Connecting to ${host}...</span>`)
      raw('<span class="to-g">Authenticated via public key (simulated).</span>')
      raw('<span class="to-d">Remote: GitHub — use browser for actual SSH.</span>')
      blank()
    },
    ip() { cmds.ifconfig() },
    sudo(args) {
      blank()
      if (args[0] === 'whoami') txt('root')
      else raw('<span class="to-y">[sudo] password for makesh: </span><span class="to-d">████████ (simulated)</span>')
      raw('<span class="to-g">Remember: ethical hacking only on authorized systems.</span>')
      blank()
    },
    about() {
      hdr('━━  ABOUT MAKESH KUMAR  ━━'); blank()
      raw('<span class="to-p"># Profile</span>')
      txt('Cybersecurity enthusiast — penetration testing, digital forensics, CTF.')
      txt('Organized debugging competitions; delivered cyber attack seminars.'); blank()
      raw('<span class="to-p"># Education</span>')
      row('MCA', 'Hindusthan College of Arts and Science — CGPA 8.5 (2027)')
      row('B.Sc', 'Nehru Arts and Science College — CGPA 8.0 (2025)'); blank()
      raw('<span class="to-p"># Internships</span>')
      txt('2× Hackover Security — Ethical Hacking & Cisco Packet Tracer networks'); blank()
    },
    education() {
      hdr('━━  EDUCATION  ━━'); blank()
      raw('<span class="to-y to-bold">MCA</span>'); row('College', 'Hindusthan College of Arts and Science'); row('CGPA', '8.5'); row('Year', '2027'); blank()
      raw('<span class="to-y to-bold">B.Sc DCFS</span>'); row('College', 'Nehru Arts and Science College'); row('CGPA', '8.0'); blank()
    },
    internship() {
      hdr('━━  INTERNSHIP — HACKOVER SECURITY  ━━'); blank()
      txt('[1] Ethical Hacking & Computer Networks — recon, exploitation, reporting')
      txt('[2] Cisco Packet Tracer — VLANs, routing, DHCP, DNS, VPN, ACLs'); blank()
    },
    skills() {
      hdr('━━  TECHNICAL SKILLS  ━━'); blank()
      bar('Penetration Testing', 40); bar('Vulnerability Assessment', 35)
      bar('Linux / Kali', 70); bar('Python', 65); bar('Web Security', 60)
      bar('C Programming', 70); bar('Full Stack', 60); bar('OSINT', 75); blank()
    },
    projects() {
      hdr('━━  PROJECTS  ━━'); blank()
      raw('<span class="to-y">[1] WiFi Pen Tool — ESP8266</span>  <span class="to-d">Mar 2025</span>')
      txt('Deauth, beacon flood, probe sniffing in lab environment.'); blank()
      raw('<span class="to-y">[2] Campus Area Network</span>  <span class="to-d">Nov 2025</span>')
      txt('VLANs, inter-VLAN routing, DHCP, DNS, VPN, ACLs.'); blank()
      raw('<span class="to-y">[3] Bluetooth Jammer — ESP32</span>  <span class="to-d">Jan 2026</span>')
      txt('2.4GHz interference demo with nRF24.'); blank()
    },
    certifications() {
      hdr('━━  CERTIFICATIONS  ━━'); blank()
      txt('• Cyber Tech Mastery — Selfmade Ninja Academy (2026)')
      txt('• CCNA — Hackover Security (2024)')
      txt('• Full Stack Web Dev — Error Makes Clever (2025)')
      txt('• Hardware Chip-Level — Mohan Institute (2025)'); blank()
    },
    achievements() {
      hdr('━━  ACHIEVEMENTS  ━━'); blank()
      txt('✓ picoCTF completed  ✓ CTF @ Selfmade Ninja Lab')
      txt('✓ Debugging Competition organizer @ Hindusthan College')
      txt('✓ Seminar: Introduction to Cyber Attack @ Sakthi Engineering'); blank()
    },
    resume() {
      hdr('━━  RESUME  ━━'); blank()
      row('File', 'MAKESH_KUMAR_RESUME.pdf')
      raw('<span class="to-g">Open Resume section in sidebar to download.</span>'); blank()
    },
    contact() {
      hdr('━━  CONTACT  ━━'); blank()
      row('Email', '<span class="to-g">makeshmk2004@gmail.com</span>')
      row('LinkedIn', 'linkedin.com/in/makeshkumar24')
      row('GitHub', 'github.com/MakeshKumar2410')
      row('Response', 'Within 24 hours'); blank()
    },
    social() {
      hdr('━━  SOCIAL  ━━'); blank()
      txt('GitHub   → github.com/MakeshKumar2410')
      txt('LinkedIn → linkedin.com/in/makeshkumar24')
      txt('Email    → makeshmk2004@gmail.com'); blank()
    },
    tools() {
      hdr('━━  TOOLS  ━━'); blank()
      txt('Kali · Nmap · Metasploit · Wireshark · Cisco PT · ESP8266/32 · Python'); blank()
    },
    ifconfig() {
      hdr('━━  NETWORK INTERFACES  ━━'); blank()
      raw('<span class="to-y">eth0</span>  inet <span class="to-g">192.168.1.100</span>  netmask 255.255.255.0')
      raw('<span class="to-y">wlan0</span> inet <span class="to-g">10.0.0.42</span>  (monitor mode: off)')
      raw('<span class="to-y">lo</span>    inet <span class="to-g">127.0.0.1</span>'); blank()
    },
    nmap() {
      blank()
      raw('<span class="to-d">Starting Nmap 7.94 — scan report for localhost</span>')
      raw('<span class="to-y">PORT     STATE  SERVICE</span>')
      raw('<span class="to-g">22/tcp   open   ssh</span>')
      raw('<span class="to-g">80/tcp   open   http</span>')
      raw('<span class="to-g">443/tcp  open   https</span>')
      raw('<span class="to-r">8080/tcp open   http-alt</span>'); blank()
    },
    uname(args) {
      blank()
      const a = (args[0] || '')
      if (a === '-a') txt('Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux')
      else txt('Linux')
      blank()
    },
    date() { blank(); txt(new Date().toString()); blank() },
    history() {
      blank()
      const h = (typeof ctx.getHistory === 'function' ? ctx.getHistory() : []) || []
      if (!h.length) raw('<span class="to-d">No commands in history.</span>')
      else h.forEach((c, i) => raw(`  <span class="to-d">${String(i + 1).padStart(4)}</span>  ${c}`))
      blank()
    },
    banner() {
      blank()
      raw('<span class="to-g to-bold"> __  __   _   _  _  __  ___ _  _ </span>')
      raw('<span class="to-g to-bold">|  \\/  | /_\\ | |/ // __|/ __| || |</span>')
      raw('<span class="to-g to-bold">| |\\/| |/ _ \\| \' <\\\\__ \\\\ (__| __ |</span>')
      raw('<span class="to-g to-bold">|_|  |_/_/ \\_\\_|\\_\\|___/\\___|_||_|</span>')
      raw('<span class="to-d">     Makesh Kumar — Cybersecurity Portfolio</span>'); blank()
    },
    version() {
      blank()
      row('Shell', 'Portfolio Terminal v3.0')
      row('User', 'Makesh Kumar')
      row('Node', typeof process !== 'undefined' ? 'server' : 'browser')
      blank()
    },
    hack() {
      blank(); raw('<span class="to-g">[*] Ethical recon sequence (simulated)...</span>')
      setTimeout(() => raw('<span class="to-d">[nmap -sV localhost]</span>'), 300)
      setTimeout(() => raw('<span class="to-g">22/tcp open ssh · 80/tcp open http</span>'), 700)
      setTimeout(() => { raw('<span class="to-p">Only test systems you own or have written permission.</span>'); blank(); scroll() }, 1100)
    },
    python() { blank(); raw('<span class="to-g">Python 3.11.4</span>'); txt('Proficiency: 78% — type `skills` for breakdown'); blank() },
    python3() { cmds.python() },
    exit() { blank(); raw('<span class="to-y">logout</span>'); txt('Session closed. Refresh page to reconnect.'); blank() },
    clear() { if (ctx.clearBody) ctx.clearBody() },
  }

  return cmds
}
