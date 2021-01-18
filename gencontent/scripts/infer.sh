cat etc/example.yaml | yq -j -P e > etc/example.json
jtd-infer etc/example.json | jq
