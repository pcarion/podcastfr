# process and parse json type definition files

# exit when any command fails
set -e

processJtd() {
  local jtdFile=$1
  local outDir=$2
  jtd-codegen --typescript-out=${outDir} -- ${jtdFile}
  {
    echo "import { Schema } from 'jtd';"
    echo ""
    echo "const schema: Schema = "
    cat ${jtdFile}
    echo "export default schema;"
  } > ${outDir}/schema.ts
  ./node_modules/.bin/prettier --write ${outDir}
}

processJtd ./etc/podcast.jtd.json ./src/jtd/podcast

