# Welcome to our Clean Code project called Anki-Remastered

Pour démarrer le backend : [Readme backend](https://github.com/Clarence1208/anki-remastered/blob/main/anki-remastered-api/README.md).

Pour lancer le frontend : [Readme frontend](https://github.com/Clarence1208/anki-remastered/blob/main/anki-remastered-frontend/README.md).

## Déploiement dans Google CLOUD

### Frontend
cd anki-remastered-frontend
gcloud init (si pas déjà fait)
npm run build
`gcloud app deploy` (vérifier le nom du service !)

URL: https://frontend-dot-cloud-project-anki-remastered.ew.r.appspot.com/

### Cloud function
cd anki-remastered-cloud-function
`gcloud functions deploy anki-function-cloud --allow-unauthenticated --runtime=nodejs22 --entry-point=compareAnswers --trigger-http --region=europe-west1
`
URL:  https://europe-west1-cloud-project-anki-remastered.cloudfunctions.net/anki-function-cloud

### Backend
cd anki-remastered-backend
TODO


## Authors
- Loriane HILDERAL
- Clarence HIRSCH
