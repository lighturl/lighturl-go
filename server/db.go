package main

import (
	"database/sql"
	"fmt"
)

const (
	PrimaryKey        = "id"
	LightUrlTableName = "urls"
	ColLongUrl        = "long_url"
	ColShortUrl       = "short_url"
	ColCreatedAt      = "created_at"
)

type LightUrl struct {
	LongUrl  string `json:"long_url"`
	ShortUrl string `json:"short_url"`
}

func CreateLightUrlTable(db *sql.DB) (sql.Result, error) {
	return db.Exec(
		fmt.Sprintf("CREATE TABLE IF NOT EXISTS %s   (%s INT NOT NULL AUTO_INCREMENT PRIMARY KEY, %s varchar(255), %s varchar(255),%s TIMESTAMP)",
			LightUrlTableName,
			PrimaryKey,
			ColLongUrl,
			ColShortUrl,
			ColCreatedAt,
		),
	)
}

func InsertUrl(db *sql.DB, lu LightUrl) (sql.Result, error) {
	return db.Exec(
		fmt.Sprintf("INSERT INTO %s VALUES (NULL,?,?,NULL)", LightUrlTableName),
		lu.LongUrl,
		lu.ShortUrl,
	)
}
func GetLongUrl(db *sql.DB, shorturl string, result *LightUrl) error {
	row := db.QueryRow(
		fmt.Sprintf(
			"SELECT %s FROM %s WHERE %s=?",
			ColLongUrl,
			LightUrlTableName,
			ColShortUrl,
		),
		shorturl,
	)
	var long_url string
	if err := row.Scan(&long_url); err != nil {
		return err
	}
	result.LongUrl = long_url
	return nil
}
