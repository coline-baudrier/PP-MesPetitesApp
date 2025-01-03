#!/bin/bash

echo "=== Mes Applications ==="
apps=($(ls -d */))
select app in "${apps[@]}" "Quitter"; do 
    case $app in
        Quitter)
            echo "On se capte plus tard !"
            exit 0
            ;;
        *)
            cd $app
            echo "Lancement de $app..."
            npm start
            cd ..
            ;;
    esac
done