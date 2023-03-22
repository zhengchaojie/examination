export default {
  'list-type': (h, conf, key) => {
    const list = []
    const config = conf.__config__
    if (conf['list-type'] === 'picture-card') {
      list.push(<div><a-icon type="plus" /><div class="ant-upload-text">{config.buttonText}</div></div>)
    } else {
      // list.push(<a-button size="${conf.size}"> <a-icon type="upload" /> {config.buttonText}</a-button>)
      const size = conf.size ? `size="${conf.size}"` : ''
      list.push(h(
        'a-button',
        {
          props:{
            size:conf.size,
          },
          domProps:{
            innerHTML:config.buttonText
          }
        },
        [
          [h('a-icon',{props:{type:"upload"}})]
        ]
      ))
    }
    return list
  }
}
