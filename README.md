
Applicazione sviluppata:
    frontend : Angular
    backend : Laravel Sanctum



------ clonare repository --------

1 - clonare il repository Github:

    git clone https://github.com/Carlo1987/NewTime.git

Verrà clonata la cartella NewTime contenente l'applicazione, ovvero:
- cartella frontend : front-test
- cartella backend : api-test
- questo stesso file README.rm


2 - tramite console andare nella cartella NewTime appena clonata:

    cd NewTime



---------  Configurare il backend  ---------

1 - andare nella cartella del backend Laravel:

    cd api-test


2 - installare le dipendenze Laravel:

    composer install


3 - creare un file .env copiandolo da .env.example

    cp .env.example .env


4 - aprire il file .env e configurarlo nel modo segente:

  - aggiungere :   ALLOWED_ORIGIN=http://localhost:4200           (per esempio sotto APP_URL=http://localhost)

  - settare il database locale:

        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=test        //   o altro nome database
        DB_USERNAME=root
        DB_PASSWORD=


5 - generare application key Laravel:

    php artisan key:generate




----------  Configurare Database locale  ---------------

1 - creare database:

    CREATE DATABASE test;      //  o altro nome, l'importante è che sia lo stesso nella configurazione DB_DATABASE di Laravel (sopra)



2 - eseguire le migrazioni:

    php artisan migrate



3 - eseguire seeder UsersTableSeeder:

    php artisan db:seed --class=UsersTableSeeder




---------- Configurare il frontend  -------------

1 - andare nella cartella del frontend Angular

    cd ../front-test



2 - installare dipendenze Angular:

    npm install





----------  Avviare applicazione  --------------


1 - nella cartella backend NewTime/api-test avviare il server Laravel:

    php artisan serve

Il server sarà ora disponibile su http://127.0.0.1:8000



2 - nella cartella frontend NewTime/front-test avviare il server Angular:

    ng serve

L'app frontend sarà ora disponibile su http://localhost:4200



3 - Aprire il browser su http://localhost:4200 e l'applicazione sarà funzionante!




