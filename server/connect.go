package main

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

const (
	DbType   = "mysql"
	Username = "root"
	Password = ""
	DbName   = "light_url"
	Charset  = "utf8"
	Host     = "127.0.0.1"
	Port     = "3306"
)

func ConnectDB() *sql.DB {
	db, err := sql.Open(DbType, Username+":@tcp("+Host+":"+Port+")/"+DbName+"?charset="+Charset)
	if err != nil {
		fmt.Println(err)
	}
	return db
}
