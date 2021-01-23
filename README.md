# [https://www.podcastfr.com/](https://www.podcastfr.com/) : La liste de podcasts techniques en français.

[![Netlify Status](https://api.netlify.com/api/v1/badges/63f96c8f-2126-4f57-8dc3-4295341d40af/deploy-status)](https://app.netlify.com/sites/vigilant-hermann-fcaaec/deploys)

Note: à chaque regénération du site, l'ordre des podcasts est remaniée aléatoirement.

# Comment ajouter un nouveau podcast?
* ouvrez une [Issue](https://github.com/pcarion/podcastfr/issues) github
* dans le titre, faites un copier coller soit l'URL iTunes du podcast, soit l'URL du flux RSS
* soumettez l'issue

Cette issue va être automatiquement traitée par une github action et le résultat sera:
* un nouveau fichier yaml sera créé pour le podcast dans le répertoire `podcasts`
* l'issue sera fermée
* le site va être regénéré

Si il y a un problème avec votre soumission, l'issue sera commentée et restera ouverte.

# Comment mofifier un podcast existant?
Si vous voulez corriger ou ajouter des informations pour un podcast déjà existant:
* trouvez le fichier yaml du podcast dans le répertoire `podcasts`
* ouvrez et modifier ce fichier, en respectant le format du fichier yaml
* ne détruizez pas de propritétés dans le fichier yaml. Une entrée vide a pour valeur le caractère `'_'`
* soumettez une pull request avec vos mofifications

Cette pull request va être automatiquement traitée par une github action et le site sera regénéré avec vos modifications.

Si il y a un problème avec votre soumission, la pull request sera commentée et restera ouverte.

# Credits

- [awesome uses](https://github.com/wesbos/awesome-uses) par Wes Bos
- Les logos des différents podcast providers ont été downloadés depuis [World Vectore Logo](https://worldvectorlogo.com/)
- les icônes du drapeau français sont sur [2600 Flag Icon Set](https://www.gosquared.com/resources/flag-icons/)
- image pour la twitter card: Photo by [Марьян Блан | @marjanblan](https://unsplash.com/@marjan_blan?utm_source=unsplash) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

