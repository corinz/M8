package main

import (
	"context"
	"embed"
	"flag"
	log "github.com/sirupsen/logrus"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"m8/internal/app"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	headless := flag.Bool("headless", false, "Run in backend only")
	flag.Parse()

	// Create an instance of the app structure
	m8 := app.NewApp()

	if bool(*headless) == false {

		// Create application with options
		err := wails.Run(&options.App{
			Title:  "m8",
			Width:  800,
			Height: 500,
			AssetServer: &assetserver.Options{
				Assets: assets,
			},
			BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
			OnStartup:        m8.Startup,
			Bind: []interface{}{
				m8,
			},
		})

		if err != nil {
			println("Error:", err.Error())
		}
	} else {
		log.Infoln("Running in headless mode")
		m8.Apollo = true
		m8.Startup(context.TODO())
	}
}
