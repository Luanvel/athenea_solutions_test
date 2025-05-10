# 🩺🧬 Athenea Solutions - Repte Tècnic

_Aplicació que permet gestionar usuaris mitjançant Angular (Frontend) i Nodejs + Express (Backend)_  

---

## 🔍 Requisits previs
* **DOCKER** _Cal tenir instal·lat **[Docker](https://www.docker.com/products/docker-desktop/)**_

---

## 🛠️ Instruccions per executar el projecte
* **Clona aquest repositori:** _git clone https://github.com/Luanvel/athenea_solutions_test.git_
* **Situat a la carpeta arrel del projecte:** _cd athenea_solutions_test_
* **Executa a la terminal** _docker-compose up --build_
* **Accedeix a l'aplicació**  _Es pot fer fent click al Port (frontend-1 80:80) al docker desktop o accedint al Frontend: [http://localhost:80](http://localhost:80)_

  ---

## ⚙️ Funcionalitats implementades

* _Llistat d'usuaris desde users.json_
* _Formulari per agregar nous usuaris_
* _Perfil dels usuaris amb fotos per l'api [randomuser](https://randomuser.me/)_
* _Dockeritzat de l'aplicació_
* _Buscador per filtrar usuaris de la taula per totes les seves propietats_
* _Botons d'Ordenació de columnes_
* _Paginació_
* _Descarergar la taula en Excel y PDF_
* _Servei recurrent que exporta usuaris JSON cada nit a les 00.00_
