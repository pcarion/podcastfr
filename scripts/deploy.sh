curl \
  -X POST \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Authorization: token ${GH_PAT}" \
  https://api.github.com/repos/pcarion/podcastfr/dispatches \
  -d '{"event_type":"deploy"}'
