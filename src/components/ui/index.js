export default {
  install: (Vue) => {
    importUiElements(Vue)
  }
}

function importUiElements(Vue) {
  const requireComponent = require.context('./', false, /Ui[A-Z]\w+\.(vue)$/)

  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const config = componentConfig.default || componentConfig
    Vue.component(config.name, config)
  })
}
