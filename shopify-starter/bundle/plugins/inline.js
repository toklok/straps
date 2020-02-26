export default function () {

  return {
    name: 'inline-script',
    generateBundle (options, bundle) {

      Object.keys(bundle).map(file => {

        bundle[file].code = '<script>' + bundle[file].code + '</script>'

        return bundle

      })

    }
  }

}
