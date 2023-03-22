export default {
  prefix(h, conf, key) {
    return <template slot="prefix"><a-icon type={conf.__slot__[key]} /></template>
  },
  suffix(h, conf, key) {
    return <template slot="suffix"><a-icon type={conf.__slot__[key]} /></template>
  }
}
