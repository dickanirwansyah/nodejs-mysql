/**
 * resfull service with nodejs
 * database : MySQL
 * author : Muhammad Dicka Nirwansyah
 * 
 */

var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

/** buat koneksi ke database */
var koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo'
});

/**  mari kita buat restfull nodejs nya :D \m/ */
var app = express();
var publicDir = (__dirname+'/public/');
app.use(express.static(publicDir));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/** tampilkan data persons  */
app.get('/person', (req, res, next) => {
    koneksi.query("SELECT * FROM person", function(error, result, fields){
        koneksi.on('error', function(err){
            console.log('[MYSQL - ERROR] : ',err);
        });

        /** tampilkan data */
        if(result && result.length)
        {
            res.end(JSON.stringify(result));
        }
        else
        {
            res.end(JSON.stringify({
                info: 'tidak ada di database',
                code: '200'
            }));
        }
    });
});

/** cari data person berdasarkan nama by name */
app.post('/search', (req, res, next) => {

    /** deklarasi variable body */
    var post_data = req.body;
    var name_search = post_data.search;

    var query = "SELECT * FROM person WHERE name LIKE '%"+name_search+"%'";

    koneksi.query(query, function(error, result, fields){
        koneksi.on('error', function(err){
            console.log('[MYSQL - ERROR ] : ',err);
        });
        if(result && result.length){
            res.end(JSON.stringify(result));
        }
        else{
            res.end(JSON.stringify({
                info : 'nama yang anda cari tidak ada di database',
                code: '200'
            }));
        }
    });
});

/** start server */
app.listen(3000, () => {
    console.log('Congratulations NodeJS is running on port 3000 !')
})