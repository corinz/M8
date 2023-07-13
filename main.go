package main

import (
	"embed"
	"flag"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"log"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {

	headless := flag.Bool("headless", false, "Run in backend only")
	flag.Parse()

	if bool(*headless) == false {
		// Create an instance of the app structure
		app := NewApp()

		// Create application with options
		err := wails.Run(&options.App{
			Title:  "m8",
			Width:  1024,
			Height: 768,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        app.startup,
			Bind: []interface{}{
				app,
			},
		})

		if err != nil {
			println("Error:", err.Error())
		}
	} else {
		log.Println("Running in headless mode")
		headlessStartup()
	}
}
