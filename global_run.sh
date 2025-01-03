#!/bin/bash

echo "=== Mes Applications ==="

apps=("todolist" "Quitter")

select app in "${apps[@]}"; do
    case $app in
        "todolist")
            echo "Lancement de ta liste des tâches..."
            npm run start:todolist
            ;;
        "Quitter")
            echo "On se voit plus tard !"
            exit 0
            ;;
        *)
            echo "Option invalide"
            ;;
    esac
done