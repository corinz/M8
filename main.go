package main

import (
	"context"
	"flag"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"log"
	"m8/internal/connect"
)

func main() {
	configPath := flag.String("configPath", "", "Full path to Kube config file e.g. ~/.kube/config")
	configContext := flag.String("configContext", "", "Kube config context name")
	apiUrl := flag.String("apiUrl", "", "Fully-qualified Kube API URL")

	conn := connect.NewConnection(*apiUrl, *configContext, *configPath)
	ds, _ := conn.ClientSet.AppsV1().DaemonSets("kube-system").List(context.TODO(), metav1.ListOptions{})
	for _, d := range ds.Items {
		log.Println(d.Name)
	}

}
