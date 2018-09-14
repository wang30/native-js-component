class Dialog {
  constructor (options){
    this.options = options
    this.init()
  }
  get template(){
    const {title, content} = this.options
    return `
      <div class="my-dialog">
        <div class="my-dialog-wrapper">
          <header>${title}</header>
          <main>${content}</main>
          <footer></footer>
        </div>
      </div>
    `
  }
  get buttons() {
    let {buttons} = this.options
    buttons = buttons.map((option) => {
      const $button = $('<button></button>')
      $button.text(option.text)
      $button.on('click', option.action)
      return $button
    })
    return buttons
  }
  init() {
    const $dialog = $(this.template)
    $dialog.find('footer').append(this.buttons)
    this.$dialog = $dialog
  }
  open() {
    this.$dialog.appendTo('body')
  }
  close() {
    this.$dialog.detach()
  }
}