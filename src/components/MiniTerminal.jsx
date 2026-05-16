import { useEffect, useRef, useCallback, useState } from 'react'
import { ALL_CMDS, FUZZY, buildCommands } from '../terminal/engine'

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatPath(cwd) {
  if (cwd === '/home/makesh') return '~'
  if (cwd.startsWith('/home/makesh/')) return '~' + cwd.slice('/home/makesh'.length)
  return cwd
}

export default function MiniTerminal() {
  const bodyRef = useRef(null)
  const inputRef = useRef(null)
  const hist = useRef([])
  const hIdx = useRef(-1)
  const draft = useRef('')
  const cwdRef = useRef('/home/makesh')
  const cmds = useRef({})
  const [cwd, setCwdState] = useState('/home/makesh')

  const scroll = useCallback(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [])

  const blank = useCallback(() => {
    const d = document.createElement('span')
    d.className = 'to-blank'
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const raw = useCallback((html) => {
    const d = document.createElement('span')
    d.className = 'to'
    d.innerHTML = html
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const txt = useCallback((text, cls = '') => {
    const d = document.createElement('span')
    d.className = 'to' + (cls ? ` ${cls}` : '')
    d.textContent = text
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const hdr = useCallback((text) => {
    const d = document.createElement('span')
    d.className = 'to-hdr'
    d.textContent = text
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const row = useCallback((key, valHtml) => {
    const d = document.createElement('div')
    d.className = 'to-row'
    d.innerHTML = `<span class="rk">${esc(key)}</span><span class="rs">:</span><span class="rv">${valHtml}</span>`
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const bar = useCallback((label, pct) => {
    const d = document.createElement('div')
    d.className = 'to-bar'
    d.innerHTML = `<span class="bl">${esc(label)}</span><div class="bt"><div class="bf" style="width:0%"></div></div><span class="bp">${pct}%</span>`
    bodyRef.current?.appendChild(d)
    scroll()
    setTimeout(() => { d.querySelector('.bf').style.width = `${pct}%` }, 60)
  }, [scroll])

  const echoCmd = useCallback((cmd) => {
    const path = formatPath(cwdRef.current)
    const d = document.createElement('div')
    d.className = 'to-echo-line'
    d.innerHTML = `<span class="ep-user">makesh</span><span class="ep-at">@</span><span class="ep-host">kali</span><span class="ep-col">:</span><span class="ep-path">${esc(path)}</span><span class="ep-dol">$&nbsp;</span><span class="ep-cmd">${esc(cmd)}</span>`
    bodyRef.current?.appendChild(d)
    scroll()
  }, [scroll])

  const setCwd = useCallback((next) => {
    cwdRef.current = next
    setCwdState(next)
  }, [])

  useEffect(() => {
    cmds.current = buildCommands({
      blank,
      raw,
      txt,
      hdr,
      row,
      bar,
      scroll,
      getCwd: () => cwdRef.current,
      setCwd,
      getHistory: () => [...hist.current],
      clearBody: () => { if (bodyRef.current) bodyRef.current.innerHTML = '' },
    })
  }, [blank, raw, txt, hdr, row, bar, scroll, setCwd])

  const parseInput = (input) => {
    const parts = input.trim().match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || []
    return parts.map(p => p.replace(/^["']|["']$/g, ''))
  }

  const run = useCallback((rawInput) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    if (hist.current[hist.current.length - 1] !== trimmed) hist.current.push(trimmed)
    hIdx.current = -1
    draft.current = ''

    echoCmd(trimmed)
    const parts = parseInput(trimmed)
    const base = parts[0]?.toLowerCase()
    const args = parts.slice(1)
    const lower = trimmed.toLowerCase()

    if (base === 'echo') {
      blank()
      txt(parts.slice(1).join(' ') || '')
      blank()
      scroll()
      return
    }

    if (base === 'cd' && !args.length && trimmed.includes('portfolio')) {
      cmds.current.cd(['/home/makesh/portfolio'])
      scroll()
      return
    }

    if (cmds.current[base]) {
      cmds.current[base](args)
      scroll()
      return
    }

    for (const rule of FUZZY) {
      if (rule.keys.some(k => lower.includes(k))) {
        cmds.current[rule.cmd]()
        scroll()
        return
      }
    }

    raw(`<span class="to-r">bash: ${esc(base)}: command not found</span>`)
    raw('<span class="to-d">Type <span class="to-g">help</span> or <span class="to-g">man &lt;cmd&gt;</span></span>')
    blank()
    scroll()
  }, [blank, echoCmd, raw, txt, scroll])

  const tabComplete = useCallback(() => {
    const v = inputRef.current?.value.trim().toLowerCase() || ''
    if (!v) return
    const matches = ALL_CMDS.filter(c => c.startsWith(v))
    if (matches.length === 1) inputRef.current.value = matches[0]
    else if (matches.length > 1) {
      echoCmd(inputRef.current.value)
      raw(`<span class="to-d">${matches.join('  ')}</span>`)
      blank()
      scroll()
    }
  }, [blank, echoCmd, raw, scroll])

  const boot = useCallback(() => {
    if (!bodyRef.current) return
    bodyRef.current.innerHTML = ''
    const lines = [
      [100, () => raw('<span class="to-d">Linux kali 6.1.0-kali9-amd64 #1 SMP PREEMPT_DYNAMIC x86_64</span>')],
      [250, () => raw('<span class="to-g to-bold">  ___  _   __  __ _  __  ___ _  _   ___ _  _ ___ </span>')],
      [300, () => raw('<span class="to-g to-bold"> |   \\| | |  \\/  | |/ /| __| \\| | |_ _| \\| | __|</span>')],
      [350, () => raw('<span class="to-g to-bold"> | |) | |__| |\\/| | \' \\| _|| .` |  | || .` | _| </span>')],
      [400, () => raw('<span class="to-g to-bold"> |___/|____|_|  |_|_|\\_\\|___|_|\\_| |___|_|\\_|___|</span>')],
      [500, () => raw('<span class="to-d">─────────────────────────────────────────────────────</span>')],
      [650, () => raw('<span class="to-y">[INFO]</span> <span class="to-d">Initializing portfolio shell...</span>')],
      [800, () => raw('<span class="to-g">[  OK ]</span> <span class="to-d">Loaded /home/makesh/portfolio/</span>')],
      [950, () => raw('<span class="to-g">[  OK ]</span> <span class="to-d">SSH agent · GPG · network modules</span>')],
      [1100, () => {
        blank()
        raw('<span class="to-g to-bold">Last login:</span> <span class="to-d">' + new Date().toLocaleString() + ' from 192.168.1.42</span>')
        raw('<span class="to-d">Welcome makesh — type <span class="to-y">help</span>, <span class="to-y">neofetch</span>, or <span class="to-y">whoami</span></span>')
        blank()
      }],
    ]
    lines.forEach(([t, fn]) => setTimeout(() => { fn(); scroll() }, t))
    setTimeout(() => inputRef.current?.focus(), 1200)
  }, [blank, raw, scroll])

  useEffect(() => { boot() }, [boot])

  const onKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      const v = inputRef.current.value
      inputRef.current.value = ''
      run(v)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (hIdx.current === -1) draft.current = inputRef.current.value
      hIdx.current = Math.min(hIdx.current + 1, hist.current.length - 1)
      inputRef.current.value = hist.current[hist.current.length - 1 - hIdx.current] || ''
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      hIdx.current = Math.max(hIdx.current - 1, -1)
      inputRef.current.value = hIdx.current === -1 ? draft.current : hist.current[hist.current.length - 1 - hIdx.current]
    } else if (e.key === 'Tab') {
      e.preventDefault()
      tabComplete()
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      cmds.current.clear?.()
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault()
      raw('<span class="to-r">^C</span>')
      inputRef.current.value = ''
      blank()
      scroll()
    }
  }, [run, tabComplete, raw, blank, scroll])

  const ps1Path = formatPath(cwd)

  return (
    <div className="mini-term-wrap">
      <div className="mini-term-window">
        <div className="mini-term-bar">
          <div className="mini-dots">
            <span className="mdot red" /><span className="mdot yellow" /><span className="mdot green" />
          </div>
          <span className="mini-term-title">makesh@kali:{ps1Path} — bash</span>
          <button
            type="button"
            className="mini-clear-btn"
            onClick={() => { cmds.current.clear?.(); inputRef.current?.focus() }}
          >
            clear
          </button>
        </div>

        <div className="mini-term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()} />

        <div className="mini-term-input-row">
          <span className="mini-ps1">
            <span className="ps1-user">makesh</span>
            <span className="ps1-at">@</span>
            <span className="ps1-host">kali</span>
            <span className="ps1-col">:</span>
            <span className="ps1-path">{ps1Path}</span>
            <span className="ps1-dol">$</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            className="mini-term-input"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command input"
            placeholder="type a command..."
            onKeyDown={onKeyDown}
          />
          <span className="mini-blink-cur" />
        </div>
      </div>

      <div className="mini-term-hint">
        <span className="hint-cmd">help</span> · <span className="hint-cmd">neofetch</span> ·{' '}
        <span className="hint-cmd">ls -la</span> · <span className="hint-cmd">cd portfolio</span> ·{' '}
        <span className="hint-cmd">whoami</span>
        <span className="hint-sep">|</span>
        <span className="hint-key">↑↓</span> history · <span className="hint-key">Tab</span> complete ·{' '}
        <span className="hint-key">Ctrl+C</span> cancel
      </div>
    </div>
  )
}
