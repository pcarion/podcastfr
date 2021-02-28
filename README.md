# [https://www.podcastfr.com/](https://www.podcastfr.com/) : La liste de podcasts techniques en français.

[![Badges](https://img.shields.io/endpoint?url=https%3A%2F%2Fwww.podcastfr.com%2Fbadges%2FnbPodcasts.json&style=flat)](https://www.podcastfr.com)
[![Badges](https://img.shields.io/endpoint?url=https%3A%2F%2Fwww.podcastfr.com%2Fbadges%2Fepisodes.json&style=flat)](https://www.podcastfr.com)
[![Badges](https://img.shields.io/endpoint?url=https%3A%2F%2Fwww.podcastfr.com%2Fbadges%2FlastUpdate.json&style=flat)](https://www.podcastfr.com)


Note: à chaque regénération du site, les podcasts sont classés par ordre décroissant de dernière publication d'un épisode.

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
- Les logos des différents podcast providers ont été downloadés depuis [World Vector Logo](https://worldvectorlogo.com/)
- image pour la twitter card: Photo by [Марьян Блан | @marjanblan](https://unsplash.com/@marjan_blan?utm_source=unsplash) on [Unsplash](https://unsplash.com/?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText)

