#create database db;
#use db;
#DROP TABLE `myTable`;

CREATE TABLE `class` (
  `id` mediumint(8) unsigned NOT NULL auto_increment,
  `phonenumber` varchar(100) default NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;

#INSERT INTO `myTable` (`firstname`,`lastname`,`phonenumber`) VALUES ("Stephen","Glenn","1-489-196-8462"),("Malachi","Riley","1-703-799-1675"),("Otto","Lyons","1-758-220-0536"),("Lamar","Carrillo","1-188-158-8035"),("Allistair","Owens","1-921-764-0476"),("Lance","Cantrell","1-684-940-0802"),("Vance","Vazquez","1-953-793-2047"),("Gage","Hernandez","1-864-135-4943"),("Chadwick","Nieves","1-266-585-8954"),("Kennedy","Benton","1-654-826-3434");
use db;
select * from class;
#select * from myTable where firstname like '%stephan%'

insert into class (`phonenumber`) VALUE ("1-914-330-1533");
#insert into class VALUE ("1-914-130-1533");


# generatedata.com
