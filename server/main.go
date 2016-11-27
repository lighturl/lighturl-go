package main

import (
	"encoding/json"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"net/http"
)

func main() {
	db := ConnectDB()
	if _, err := CreateLightUrlTable(db); err != nil {
		fmt.Println(err)
	}
	router := mux.NewRouter()
	router.HandleFunc("/", Index).Methods("GET")
	router.HandleFunc("/", Store).Methods("POST")
	router.HandleFunc("/{short_url}", RedirectUrl).Methods("GET")
	handler := cors.Default().Handler(router)
	http.ListenAndServe(":8000", handler)
}


func RedirectUrl(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	db := ConnectDB()
	lurl := LightUrl{}
	lurl.ShortUrl = vars["short_url"]
	err := GetLongUrl(db, vars["short_url"], &lurl)
	if err != nil {
		fmt.Println(err)
	}
	values := make(map[string]interface{})
	values["short_url"] = lurl.ShortUrl
	values["long_url"] = lurl.LongUrl
	jsonval, _ := json.Marshal(values)
	res.Header().Set("Content-Type", "json/application")
	res.Write([]byte(jsonval))
}



func Index(res http.ResponseWriter, req *http.Request) {
	res.Write([]byte("ok"))
}

func Store(res http.ResponseWriter, req *http.Request) {
	if req.Method == "POST" {
		decoder := json.NewDecoder(req.Body)
		var lurl LightUrl
		err := decoder.Decode(&lurl)
		if err != nil {
			fmt.Println(err)
		}
		db := ConnectDB()
		insert := LightUrl{LongUrl: lurl.LongUrl, ShortUrl: HashMake(8)}
		if result, err := InsertUrl(db, insert); err != nil {
			fmt.Println(err)
		} else {
			LastId, err := result.LastInsertId()
			if err != nil {
				fmt.Println(err)
			}
			values := make(map[string]interface{})
			values["id"] = LastId
			values["long_url"] = insert.LongUrl
			values["short_url"] = insert.ShortUrl
			jsonval, _ := json.Marshal(values)
			res.Header().Set("Content-Type", "json/application")
			res.Write([]byte(jsonval))
		}
	}
}
