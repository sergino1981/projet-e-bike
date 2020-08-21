

CREATE FUNCTION "getPath"()
returns long varchar
DETERMINISTIC
BEGIN
 declare dbPath long varchar;
 declare dbName long varchar;

 set dbPath = (select db_property ('file'));    
 set dbName = (select db_property('name')) + '.db';
 set dbPath = left(dbPath, length(dbPath)-length(dbName)); 
 
 return dbPath;
END;



                                                 
CREATE PROCEDURE "http_getPage" (in url char(255))
BEGIN
    call sa_set_http_header('Content-Type', 'text/html; charset=utf-8');
    call sa_set_http_header('Access-Control-Allow-Origin', '*');
    select xp_read_file(dba.getPath() || url || '.html');
END;

CREATE PROCEDURE "http_getCSS"(in url char(255))
BEGIN
  call sa_set_http_header('Content-Type', 'text/css');
  call sa_set_http_header('Access-Control-Allow-Origin', '*');
  select xp_read_file(dba.getPath() || 'css\' || url);                      
END;

CREATE PROCEDURE "http_getJS"(in url char(255))
BEGIN
  call sa_set_http_header('Content-Type', 'application/javascript');
  call sa_set_http_header('Access-Control-Allow-Origin', '*'); 
  select xp_read_file(dba.getPath() || 'js\' || url);
END;

CREATE PROCEDURE "http_getIMG"(in url char(255))
BEGIN
  call sa_set_http_header('Content-Type', 'image/png');
  call sa_set_http_header('Access-Control-Allow-Origin', '*');
  select xp_read_file(dba.getPath() || 'img\' || url);
END;



CREATE SERVICE "page" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getPage(:url);

CREATE SERVICE "js" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getJS(:url);

CREATE SERVICE "css" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getCSS(:url);

CREATE SERVICE "img" TYPE 'RAW' AUTHORIZATION OFF USER "DBA" URL ON METHODS 'GET' AS call dba.http_getIMG(:url);
